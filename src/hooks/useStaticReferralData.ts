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

// Données statiques persistantes avec gains selon montants spécifiés
const STATIC_REFERRALS: StaticReferral[] = [
  // Juin 2025 - 8 derniers parrainages récents
  { name: '@SkyllaGaming', date: '27/06/2025', status: 'completed', reward: 200 },
  { name: '@MoonPhoenix', date: '22/06/2025', status: 'completed', reward: 150 },
  { name: '@CyberWolfX', date: '17/06/2025', status: 'completed', reward: 180 },
  { name: '@NeonDreamer', date: '12/06/2025', status: 'completed', reward: 120 },
  { name: '@PixelHunter', date: '07/06/2025', status: 'completed', reward: 250 },
  { name: '@StardustRider', date: '02/06/2025', status: 'completed', reward: 90 },
  { name: '@VoidSeeker', date: '28/05/2025', status: 'completed', reward: 160 },
  { name: '@ThunderStrike', date: '23/05/2025', status: 'completed', reward: 110 }
];

export const useStaticReferralData = (): StaticReferralData => {
  return useMemo(() => {
    const completedReferrals = STATIC_REFERRALS.filter(r => r.status === 'completed');
    const pendingReferrals = STATIC_REFERRALS.filter(r => r.status === 'pending');
    
    const totalEarnings = completedReferrals.reduce((sum, ref) => sum + ref.reward, 0);
    
    // Calculer les gains des 10 derniers mois pour l'objectif
    const recentEarnings = completedReferrals
      .filter(ref => new Date(ref.date.split('/').reverse().join('-')) >= new Date('2023-08-01'))
      .reduce((sum, ref) => sum + ref.reward, 0);

    const tierProgress = Math.min((recentEarnings / 100000) * 100, 100);
    
    return {
      totalReferrals: STATIC_REFERRALS.length,
      pendingReferrals: pendingReferrals.length,
      completedReferrals: completedReferrals.length,
      earnings: totalEarnings,
      recentReferrals: STATIC_REFERRALS.filter(r => r.status === 'completed').slice(-8).reverse(), // Afficher les 8 derniers parrainages complétés
      tierProgress,
      currentTier: 'Bronze',
      nextTier: 'Argent',
      nextTierRequirement: 100000
    };
  }, []);
};