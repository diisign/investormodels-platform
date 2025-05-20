
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

  const { data, error } = await supabase
    .from('investments')
    .insert({
      creator_id: creatorId,
      amount: amount,
      return_rate: returnRate,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating investment:', error);
    throw error;
  }

  return data;
};

export const getUserInvestments = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching investments:', error);
    throw error;
  }

  return data;
};
