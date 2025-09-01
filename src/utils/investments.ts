
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { getCreatorProfile } from './creatorProfiles';

export const createInvestment = async (
  creatorId: string,
  amount: number,
  returnRate: number,
  durationMonths: number = 3
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be logged in to invest");
  }

  // First, create the investment record
  const { data: investment, error: investmentError } = await supabase
    .from('investments')
    .insert({
      creator_id: creatorId,
      amount: amount,
      return_rate: returnRate,
      user_id: user.id,
      duration_months: durationMonths
    })
    .select()
    .single();

  if (investmentError) {
    console.error('Error creating investment:', investmentError);
    throw investmentError;
  }

  // Get creator info for the transaction description
  const creator = getCreatorProfile(creatorId);
  const creatorName = creator?.name || 'Créatrice';

  // Then, create a transaction record for this investment (negative amount)
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      amount: -amount, // Negative amount to subtract from balance
      status: 'completed',
      payment_method: 'investment',
      payment_id: creatorId, // Store creator ID in payment_id
      currency: 'EUR' // Required currency field
    })
    .select()
    .single();

  if (transactionError) {
    console.error('Error creating transaction for investment:', transactionError);
    toast.error("Erreur lors de la mise à jour du solde");
  }

  // Process referral bonuses if applicable
  try {
    console.log('Processing referral bonuses for investment:', investment.id);
    const { data: bonusResult, error: bonusError } = await supabase.functions.invoke('process-referral-bonus', {
      body: {
        investmentId: investment.id,
        userId: user.id,
        amount: amount
      }
    });

    if (bonusError) {
      console.error('Error processing referral bonuses:', bonusError);
    } else if (bonusResult) {
      console.log('Referral bonuses processed:', bonusResult);
      
      // Show success messages for bonuses
      if (bonusResult.filleulBonus > 0) {
        toast.success(`Bonus de parrainage : +${bonusResult.filleulBonus}€ ajouté à votre solde !`);
      }
      
      if (bonusResult.parrainCommission > 0) {
        toast.success(`Commission de parrainage générée : ${bonusResult.parrainCommission}€`);
      }
    }
  } catch (error) {
    console.error('Error calling referral bonus function:', error);
  }

  // Invalidate any cache for the user balance
  return investment;
};

export const getUserInvestments = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }); // Most recent first

  if (error) {
    console.error('Error fetching investments:', error);
    throw error;
  }
  
  console.log('Raw investments from database:', data);
  
  // Log creator profiles to help debug
  if (data && data.length > 0) {
    data.forEach(investment => {
      const creator = getCreatorProfile(investment.creator_id);
      console.log(`Creator for ${investment.creator_id}:`, creator);
    });
  }

  return data.map(investment => ({
    ...investment,
    initial: investment.amount // Pour maintenir la compatibilité, nous utilisons amount comme valeur initiale par défaut
  }));
};
