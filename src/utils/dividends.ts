import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Investment, Dividend } from '@/types/investments';
import { getCreatorYield } from './yieldData';
import { addMonths, format, startOfMonth } from 'date-fns';

// Calculer le dividende mensuel pour un investissement
export const calculateMonthlyDividend = (amount: number, yieldRate: number): number => {
  // Convertir le yield annuel en dividende mensuel
  return amount * (yieldRate / 100 / 12);
};

// Vérifier si un investissement est éligible aux dividendes (1 mois minimum)
export const isEligibleForDividend = (investment: Investment): boolean => {
  const investmentDate = new Date(investment.created_at);
  const currentDate = new Date();
  const oneMonthAfter = addMonths(investmentDate, 1);
  
  return investment.shares_owned && currentDate >= oneMonthAfter;
};

// Obtenir la prochaine date de dividende pour un investissement
export const getNextDividendDate = (investment: Investment): Date | null => {
  if (!investment.shares_owned) return null;
  
  const investmentDate = new Date(investment.created_at);
  const lastDividendDate = investment.last_dividend_date 
    ? new Date(investment.last_dividend_date) 
    : investmentDate;
  
  // Le prochain dividende est le premier jour du mois suivant
  return startOfMonth(addMonths(lastDividendDate, 1));
};

// Calculer les dividendes en attente pour un investissement
export const getPendingDividends = async (investment: Investment): Promise<{ amount: number; months: number }> => {
  if (!isEligibleForDividend(investment)) {
    return { amount: 0, months: 0 };
  }

  const creatorYield = getCreatorYield(investment.creator_id);
  const monthlyDividend = calculateMonthlyDividend(investment.amount, creatorYield);
  
  const investmentDate = new Date(investment.created_at);
  const lastDividendDate = investment.last_dividend_date 
    ? new Date(investment.last_dividend_date) 
    : investmentDate;
  
  const currentDate = new Date();
  const monthsSinceLastDividend = Math.floor(
    (currentDate.getTime() - addMonths(lastDividendDate, 1).getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  
  const pendingMonths = Math.max(0, monthsSinceLastDividend);
  
  return {
    amount: monthlyDividend * pendingMonths,
    months: pendingMonths
  };
};

// Distribuer les dividendes pour un investissement
export const distributeDividends = async (investmentId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error("Vous devez être connecté pour recevoir vos dividendes");
    return false;
  }

  // Récupérer l'investissement
  const { data: investment, error: investmentError } = await supabase
    .from('investments')
    .select('*')
    .eq('id', investmentId)
    .eq('user_id', user.id)
    .single();

  if (investmentError || !investment) {
    console.error('Erreur lors de la récupération de l\'investissement:', investmentError);
    return false;
  }

  const pending = await getPendingDividends({
    ...investment,
    initial: investment.amount
  });
  
  if (pending.amount <= 0) {
    toast.info("Aucun dividende en attente pour cet investissement");
    return false;
  }

  const creatorYield = getCreatorYield(investment.creator_id);
  const currentDate = new Date();
  
  // Créer l'enregistrement de dividende
  const { error: dividendError } = await supabase
    .from('dividends')
    .insert({
      investment_id: investmentId,
      user_id: user.id,
      amount: pending.amount,
      dividend_date: format(currentDate, 'yyyy-MM-dd'),
      yield_rate: creatorYield
    });

  if (dividendError) {
    console.error('Erreur lors de l\'enregistrement du dividende:', dividendError);
    toast.error("Erreur lors de l'enregistrement du dividende");
    return false;
  }

  // Créer une transaction pour créditer le dividende
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      amount: pending.amount,
      status: 'completed',
      payment_method: 'dividend',
      payment_id: investmentId,
      currency: 'EUR'
    });

  if (transactionError) {
    console.error('Erreur lors de la transaction de dividende:', transactionError);
    toast.error("Erreur lors du crédit du dividende");
    return false;
  }

  // Mettre à jour la date du dernier dividende
  const { error: updateError } = await supabase
    .from('investments')
    .update({ last_dividend_date: currentDate.toISOString() })
    .eq('id', investmentId);

  if (updateError) {
    console.error('Erreur lors de la mise à jour de l\'investissement:', updateError);
  }

  toast.success(`Dividende de ${pending.amount.toFixed(2)}€ reçu !`);
  return true;
};

// Vendre des parts (arrêter de recevoir des dividendes)
export const sellShares = async (investmentId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error("Vous devez être connecté pour vendre vos parts");
    return false;
  }

  // D'abord distribuer les dividendes en attente
  await distributeDividends(investmentId);

  // Marquer les parts comme vendues
  const { error: updateError } = await supabase
    .from('investments')
    .update({ 
      shares_owned: false, 
      sold_at: new Date().toISOString(),
      status: 'sold'
    })
    .eq('id', investmentId)
    .eq('user_id', user.id);

  if (updateError) {
    console.error('Erreur lors de la vente des parts:', updateError);
    toast.error("Erreur lors de la vente des parts");
    return false;
  }

  // Récupérer l'investissement pour le montant
  const { data: investment, error: investmentError } = await supabase
    .from('investments')
    .select('amount')
    .eq('id', investmentId)
    .single();

  if (investment && !investmentError) {
    // Créer une transaction pour rembourser le capital
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: investment.amount, // Montant positif pour rembourser
        status: 'completed',
        payment_method: 'shares_sale',
        payment_id: investmentId,
        currency: 'EUR'
      });

    if (transactionError) {
      console.error('Erreur lors de la transaction de vente:', transactionError);
    }
  }

  toast.success("Parts vendues avec succès ! Votre capital vous a été remboursé.");
  return true;
};

// Obtenir tous les dividendes d'un utilisateur
export const getUserDividends = async (): Promise<Dividend[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('dividends')
    .select('*')
    .eq('user_id', user.id)
    .order('dividend_date', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des dividendes:', error);
    throw error;
  }

  return data || [];
};