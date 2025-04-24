
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export const createInvestment = async (
  creatorId: string,
  amount: number,
  returnRate: number
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
      user_id: user.id
    })
    .select()
    .single();

  if (investmentError) {
    console.error('Error creating investment:', investmentError);
    throw investmentError;
  }

  // Then, create a transaction record for this investment (negative amount)
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      amount: -amount, // Negative amount to subtract from balance
      status: 'completed',
      payment_method: 'investment',
      payment_id: creatorId, // Store creator ID in payment_id
      description: `Investment in creator ${creatorId}`
    })
    .select()
    .single();

  if (transactionError) {
    console.error('Error creating transaction for investment:', transactionError);
    toast.error("Erreur lors de la mise à jour du solde");
  }

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

  return data;
};
