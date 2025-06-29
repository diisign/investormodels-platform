
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Referral {
  id: string;
  referee_name: string;
  reward_amount: number;
  status: 'pending' | 'completed';
  referral_date: string;
  created_at: string;
}

interface ReferralStats {
  id: string;
  total_referrals: number;
  pending_referrals: number;
  completed_referrals: number;
  total_earnings: number;
  tier_progress: number;
  current_tier: string;
  next_tier: string;
  next_tier_requirement: number;
  last_auto_referral_date: string | null;
}

export const useReferralData = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const initializeUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Vérifier si l'utilisateur a déjà des stats
      const { data: existingStats } = await supabase
        .from('referral_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!existingStats) {
        // Créer les stats initiales avec quelques données d'exemple
        const { error: statsError } = await supabase
          .from('referral_stats')
          .insert({
            user_id: user.id,
            total_referrals: 8,
            pending_referrals: 3,
            completed_referrals: 5,
            total_earnings: 250,
            tier_progress: 68,
            current_tier: 'Silver',
            next_tier: 'Gold',
            next_tier_requirement: 10
          });

        if (statsError) {
          console.error('Error creating initial stats:', statsError);
          return;
        }

        // Créer quelques parrainages d'exemple
        const sampleReferrals = [
          { referee_name: 'Marie L.', reward_amount: 50, status: 'completed', referral_date: '2025-02-15' },
          { referee_name: 'Thomas B.', reward_amount: 50, status: 'completed', referral_date: '2025-02-28' },
          { referee_name: 'Claire D.', reward_amount: 50, status: 'completed', referral_date: '2025-03-05' },
          { referee_name: 'François M.', reward_amount: 50, status: 'completed', referral_date: '2025-03-12' },
          { referee_name: 'Sophie R.', reward_amount: 50, status: 'completed', referral_date: '2025-03-18' },
          { referee_name: 'Julien K.', reward_amount: 50, status: 'pending', referral_date: '2025-03-22' },
          { referee_name: 'Amélie P.', reward_amount: 50, status: 'pending', referral_date: '2025-03-25' },
          { referee_name: 'Lucas T.', reward_amount: 50, status: 'pending', referral_date: '2025-03-28' }
        ];

        for (const referral of sampleReferrals) {
          await supabase
            .from('referrals')
            .insert({
              user_id: user.id,
              ...referral
            });
        }

        toast({
          title: "Données de parrainage initialisées",
          description: "Vos données de parrainage ont été créées avec succès."
        });
      }
    } catch (error) {
      console.error('Error initializing user stats:', error);
    }
  };

  const fetchReferralData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Récupérer les parrainages
      const { data: referralsData, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (referralsError) {
        console.error('Error fetching referrals:', referralsError);
        return;
      }

      // Récupérer les statistiques
      const { data: statsData, error: statsError } = await supabase
        .from('referral_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError) {
        console.error('Error fetching stats:', statsError);
        return;
      }

      setReferrals(referralsData || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerDailyReferrals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Appeler la edge function pour ajouter les parrainages quotidiens
      const { data, error } = await supabase.functions.invoke('daily-referrals', {
        body: { user_id: user.id }
      });

      if (error) {
        console.error('Error triggering daily referrals:', error);
        return;
      }

      // Recharger les données après ajout
      await fetchReferralData();
      
      toast({
        title: "Nouveaux parrainages ajoutés",
        description: "6 nouveaux parrainages ont été ajoutés automatiquement."
      });
    } catch (error) {
      console.error('Error triggering daily referrals:', error);
    }
  };

  useEffect(() => {
    initializeUserStats().then(() => {
      fetchReferralData();
    });
  }, []);

  return {
    referrals,
    stats,
    isLoading,
    fetchReferralData,
    triggerDailyReferrals
  };
};
