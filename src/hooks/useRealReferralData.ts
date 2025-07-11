import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';

export interface RealReferral {
  id: string;
  referee_name: string;
  referral_date: string;
  reward_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RealAffiliation {
  id: string;
  referred_id: string;
  referrer_id: string;
  status: string;
  first_investment_amount: number | null;
  first_investment_date: string | null;
  total_earnings: number | null;
  created_at: string | null;
  referred_at: string | null;
}

export interface RealReferralData {
  totalReferrals: number;
  totalEarnings: number;
  referrals: RealReferral[];
  affiliations: RealAffiliation[];
}

export const useRealReferralData = () => {
  const { user } = useAuth();

  const { data: referrals = [] } = useQuery({
    queryKey: ['userReferrals', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });

  const { data: affiliations = [] } = useQuery({
    queryKey: ['userAffiliations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('affiliations')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });

  const totalReferrals = referrals.length;
  const totalEarnings = referrals.reduce((sum, referral) => sum + Number(referral.reward_amount), 0);

  return {
    totalReferrals,
    totalEarnings,
    referrals,
    affiliations,
  };
};