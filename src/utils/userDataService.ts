
import { supabase } from '../integrations/supabase/client';
import { Transaction } from './authTypes';

export const fetchUserData = async (userId: string) => {
  try {
    // Récupérer les transactions de l'utilisateur
    // Cast the entire supabase object to any to avoid TypeScript errors
    const { data: transactionsData, error: transactionsError } = await (supabase as any)
      .from('transactions')
      .select('*')
      .eq('user_id', userId);
    
    if (transactionsError) throw transactionsError;
    
    // Calculer le solde total
    const balance = transactionsData ? transactionsData.reduce((sum: number, transaction: any) => sum + Number(transaction.amount || 0), 0) : 0;
    
    // Pour l'instant, on utilise des tableaux vides pour les investissements
    // Dans une implémentation réelle, vous récupéreriez ces données depuis Supabase
    const investments: any[] = [];
    
    return {
      balance,
      investments,
      transactions: transactionsData as Transaction[]
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return {
      balance: 0,
      investments: [],
      transactions: []
    };
  }
};
