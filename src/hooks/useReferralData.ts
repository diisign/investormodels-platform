
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ReferralData {
  totalReferrals: number;
  pendingReferrals: number;
  completedReferrals: number;
  earnings: number;
  recentReferrals: Array<{
    name: string;
    date: string;
    status: 'completed' | 'pending';
    reward: number;
  }>;
  tierProgress: number;
  currentTier: string;
  nextTier: string;
  nextTierRequirement: number;
}

export const useReferralData = () => {
  const [referralData, setReferralData] = useState<ReferralData>({
    totalReferrals: 8,
    pendingReferrals: 3,
    completedReferrals: 5,
    earnings: 250,
    recentReferrals: [
      { name: 'Marie L.', date: '15/02/2025', status: 'completed', reward: 50 },
      { name: 'Thomas B.', date: '28/02/2025', status: 'completed', reward: 50 },
      { name: 'Claire D.', date: '05/03/2025', status: 'completed', reward: 50 },
      { name: 'François M.', date: '12/03/2025', status: 'completed', reward: 50 },
      { name: 'Sophie R.', date: '18/03/2025', status: 'completed', reward: 50 },
      { name: 'Julien K.', date: '22/03/2025', status: 'pending', reward: 50 },
      { name: 'Amélie P.', date: '25/03/2025', status: 'pending', reward: 50 },
      { name: 'Lucas T.', date: '28/03/2025', status: 'pending', reward: 50 }
    ],
    tierProgress: 68,
    currentTier: 'Silver',
    nextTier: 'Gold',
    nextTierRequirement: 10
  });

  const [isLoading, setIsLoading] = useState(false);

  // Pour le moment, nous gardons les données statiques
  // Quand l'authentification sera implémentée, nous pourrons charger les vraies données
  const loadReferralData = async () => {
    setIsLoading(true);
    try {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ici nous chargerions les vraies données depuis Supabase
      // const { data: referrals } = await supabase.from('affiliations').select('*')
      
      // Pour l'instant, nous gardons les données statiques
    } catch (error) {
      console.error('Erreur lors du chargement des données de parrainage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReferralData();
  }, []);

  return {
    referralData,
    isLoading,
    refetch: loadReferralData
  };
};
