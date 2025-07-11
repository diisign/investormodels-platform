import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { getUserInvestments } from '@/utils/investments';

export interface RealInvestment {
  id: string;
  creator_id: string;
  amount: number;
  return_rate: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RealTransaction {
  id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  payment_id: string | null;
  currency: string;
  created_at: string;
}

export interface RealInvestmentData {
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  investments: RealInvestment[];
  transactions: RealTransaction[];
}

export const useRealInvestmentData = () => {
  const { user } = useAuth();

  const { data: balance = 0 } = useQuery({
    queryKey: ['userBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, status')
        .eq('user_id', user.id)
        .eq('status', 'completed');
      
      if (error) throw error;
      
      return data?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) || 0;
    },
    enabled: !!user,
  });

  const { data: investments = [] } = useQuery({
    queryKey: ['userInvestments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return await getUserInvestments();
    },
    enabled: !!user,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['userTransactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });

  const totalInvested = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const totalEarnings = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => {
      const currentValue = Number(inv.amount) * (1 + Number(inv.return_rate) / 100);
      return sum + (currentValue - Number(inv.amount));
    }, 0);

  return {
    balance,
    totalInvested,
    totalEarnings,
    investments,
    transactions,
  };
};