
import { useMemo } from 'react';

export interface StaticReferral {
  name: string;
  date: string;
  status: 'completed' | 'pending';
  reward: number;
}

export interface StaticReferralData {
  totalReferrals: number;
  pendingReferrals: number;
  completedReferrals: number;
  earnings: number;
  recentReferrals: StaticReferral[];
  tierProgress: number;
  currentTier: string;
  nextTier: string;
  nextTierRequirement: number;
}

// Données statiques persistantes pour les parrainages
const STATIC_REFERRALS: StaticReferral[] = [
  { name: 'Luc V.', date: '11/04/2025', status: 'completed', reward: 125 },
  { name: 'Salomé G.', date: '12/04/2025', status: 'completed', reward: 200 },
  { name: 'Alan P.', date: '16/04/2025', status: 'completed', reward: 75 },
  { name: 'Karine B.', date: '17/04/2025', status: 'completed', reward: 250 },
  { name: 'Charles N.', date: '18/04/2025', status: 'completed', reward: 150 },
  { name: 'Lina F.', date: '19/04/2025', status: 'completed', reward: 75 },
  { name: 'Emma D.', date: '20/04/2025', status: 'completed', reward: 100 },
  { name: 'Thomas R.', date: '21/04/2025', status: 'completed', reward: 175 },
  { name: 'Sophie L.', date: '22/04/2025', status: 'completed', reward: 125 },
  { name: 'Maxime T.', date: '23/04/2025', status: 'completed', reward: 200 },
  { name: 'Julie M.', date: '24/04/2025', status: 'completed', reward: 150 },
  { name: 'Antoine B.', date: '25/04/2025', status: 'completed', reward: 100 },
  { name: 'Camille F.', date: '26/04/2025', status: 'completed', reward: 225 },
  { name: 'Nicolas P.', date: '27/04/2025', status: 'completed', reward: 175 },
  { name: 'Laura K.', date: '28/04/2025', status: 'completed', reward: 125 },
  { name: 'Hugo S.', date: '29/04/2025', status: 'completed', reward: 150 },
  { name: 'Anaïs W.', date: '30/04/2025', status: 'completed', reward: 100 },
  { name: 'Julien C.', date: '01/05/2025', status: 'completed', reward: 200 },
  { name: 'Marie H.', date: '02/05/2025', status: 'completed', reward: 175 },
  { name: 'Paul G.', date: '03/05/2025', status: 'completed', reward: 125 },
  { name: 'Claire N.', date: '04/05/2025', status: 'completed', reward: 150 },
  { name: 'Lucas J.', date: '05/05/2025', status: 'completed', reward: 100 },
  { name: 'Océane V.', date: '06/05/2025', status: 'completed', reward: 225 },
  { name: 'Romain L.', date: '07/05/2025', status: 'completed', reward: 175 },
  { name: 'Léa M.', date: '08/05/2025', status: 'completed', reward: 125 },
  { name: 'Kevin R.', date: '09/05/2025', status: 'completed', reward: 150 },
  { name: 'Manon D.', date: '10/05/2025', status: 'completed', reward: 100 },
  { name: 'Florian B.', date: '11/05/2025', status: 'completed', reward: 200 },
  { name: 'Chloé T.', date: '12/05/2025', status: 'completed', reward: 175 },
  { name: 'Alexandre S.', date: '13/05/2025', status: 'completed', reward: 125 },
  { name: 'Inès F.', date: '14/05/2025', status: 'completed', reward: 150 },
  { name: 'Bastien K.', date: '15/05/2025', status: 'completed', reward: 100 },
  { name: 'Margaux H.', date: '16/05/2025', status: 'completed', reward: 225 },
  { name: 'Quentin P.', date: '17/05/2025', status: 'completed', reward: 175 },
  { name: 'Elise C.', date: '18/05/2025', status: 'completed', reward: 125 },
  { name: 'Mathieu W.', date: '19/05/2025', status: 'completed', reward: 150 },
  { name: 'Amélie N.', date: '20/05/2025', status: 'completed', reward: 100 },
  { name: 'Valentin G.', date: '21/05/2025', status: 'completed', reward: 200 },
  { name: 'Justine L.', date: '22/05/2025', status: 'completed', reward: 175 },
  { name: 'Corentin M.', date: '23/05/2025', status: 'completed', reward: 125 },
  { name: 'Alicia R.', date: '24/05/2025', status: 'completed', reward: 150 },
  { name: 'Morgan D.', date: '25/05/2025', status: 'pending', reward: 100 },
  { name: 'Noémie B.', date: '26/05/2025', status: 'pending', reward: 225 },
  { name: 'Axel T.', date: '27/05/2025', status: 'pending', reward: 175 }
];

export const useStaticReferralData = () => {
  return useMemo((): StaticReferralData => {
    const completed = STATIC_REFERRALS.filter(ref => ref.status === 'completed');
    const pending = STATIC_REFERRALS.filter(ref => ref.status === 'pending');
    const totalEarnings = completed.reduce((sum, ref) => sum + ref.reward, 0);

    return {
      totalReferrals: STATIC_REFERRALS.length,
      pendingReferrals: pending.length,
      completedReferrals: completed.length,
      earnings: totalEarnings,
      recentReferrals: STATIC_REFERRALS,
      tierProgress: Math.round((completed.length / 200) * 100),
      currentTier: 'Silver',
      nextTier: 'Gold',
      nextTierRequirement: 200
    };
  }, []);
};
