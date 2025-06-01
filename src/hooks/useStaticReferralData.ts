
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

// Données statiques simplifiées pour les parrainages
const STATIC_REFERRALS: StaticReferral[] = [
  { name: 'Marie L.', date: '28/05/2025', status: 'completed', reward: 75 },
  { name: 'Paul D.', date: '31/05/2025', status: 'completed', reward: 150 }
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
      currentTier: 'Bronze',
      nextTier: 'Silver',
      nextTierRequirement: 200
    };
  }, []);
};
