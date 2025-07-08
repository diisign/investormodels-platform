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

// Données complètement vides pour le programme de parrainage de test
const EMPTY_REFERRALS: StaticReferral[] = [];

export const useStaticReferralDataEmpty = (): StaticReferralData => {
  return useMemo(() => {
    return {
      totalReferrals: 0,
      pendingReferrals: 0,
      completedReferrals: 0,
      earnings: 0,
      recentReferrals: EMPTY_REFERRALS,
      tierProgress: 0,
      currentTier: 'Bronze',
      nextTier: 'Silver',
      nextTierRequirement: 5
    };
  }, []);
};

// Function to filter referrals by period (kept for compatibility)
export const filterReferralsByPeriod = (referrals: StaticReferral[], period: string): StaticReferral[] => {
  return []; // Always return empty for this hook
};