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
  // Octobre 2024 - 350€ total
  { name: '@CrimsonBlade', date: '05/10/2024', status: 'completed', reward: 120 },
  { name: '@SilverFox99', date: '12/10/2024', status: 'completed', reward: 80 },
  { name: '@NightWalker', date: '20/10/2024', status: 'completed', reward: 150 },
  
  // Novembre 2024 - 900€ total
  { name: '@GoldenEagle', date: '03/11/2024', status: 'completed', reward: 200 },
  { name: '@IcePhoenix', date: '10/11/2024', status: 'completed', reward: 180 },
  { name: '@StormRider', date: '18/11/2024', status: 'completed', reward: 220 },
  { name: '@MysticShadow', date: '25/11/2024', status: 'completed', reward: 300 },
  
  // Décembre 2024 - 750€ total
  { name: '@FireDragon', date: '02/12/2024', status: 'completed', reward: 160 },
  { name: '@FrostWolf', date: '09/12/2024', status: 'completed', reward: 140 },
  { name: '@LightBringer', date: '16/12/2024', status: 'completed', reward: 200 },
  { name: '@DarkKnight', date: '23/12/2024', status: 'completed', reward: 250 },
  
  // Janvier 2025 - 1200€ total
  { name: '@CosmicRay', date: '05/01/2025', status: 'completed', reward: 300 },
  { name: '@VoidMaster', date: '12/01/2025', status: 'completed', reward: 250 },
  { name: '@StarBreaker', date: '19/01/2025', status: 'completed', reward: 350 },
  { name: '@GalaxyHunter', date: '26/01/2025', status: 'completed', reward: 300 },
  
  // Février 2025 - 3500€ total
  { name: '@TitanSlayer', date: '02/02/2025', status: 'completed', reward: 400 },
  { name: '@PlasmaStorm', date: '06/02/2025', status: 'completed', reward: 350 },
  { name: '@QuantumLeap', date: '10/02/2025', status: 'completed', reward: 450 },
  { name: '@NebulaCrush', date: '14/02/2025', status: 'completed', reward: 380 },
  { name: '@SolarFlare', date: '18/02/2025', status: 'completed', reward: 420 },
  { name: '@BlackHole', date: '22/02/2025', status: 'completed', reward: 500 },
  { name: '@MeteorStrike', date: '26/02/2025', status: 'completed', reward: 500 },
  { name: '@AstroNinja', date: '28/02/2025', status: 'completed', reward: 500 },
  
  // Mars 2025 - 4850€ total
  { name: '@CyberSamurai', date: '03/03/2025', status: 'completed', reward: 550 },
  { name: '@TechnoMage', date: '07/03/2025', status: 'completed', reward: 480 },
  { name: '@DigitalGhost', date: '11/03/2025', status: 'completed', reward: 520 },
  { name: '@NeonRaven', date: '15/03/2025', status: 'completed', reward: 600 },
  { name: '@HoloWarrior', date: '19/03/2025', status: 'completed', reward: 450 },
  { name: '@ByteReaper', date: '23/03/2025', status: 'completed', reward: 580 },
  { name: '@MatrixKing', date: '27/03/2025', status: 'completed', reward: 670 },
  { name: '@CyberViper', date: '31/03/2025', status: 'completed', reward: 500 },
  
  // Avril 2025 - 4100€ total
  { name: '@AlphaWolf', date: '04/04/2025', status: 'completed', reward: 480 },
  { name: '@BetaRanger', date: '08/04/2025', status: 'completed', reward: 420 },
  { name: '@GammaForce', date: '12/04/2025', status: 'completed', reward: 550 },
  { name: '@DeltaStrike', date: '16/04/2025', status: 'completed', reward: 380 },
  { name: '@EpsilonBlade', date: '20/04/2025', status: 'completed', reward: 600 },
  { name: '@ZetaPhoenix', date: '24/04/2025', status: 'completed', reward: 520 },
  { name: '@ThetaLion', date: '28/04/2025', status: 'completed', reward: 650 },
  { name: '@OmegaTiger', date: '30/04/2025', status: 'completed', reward: 500 },
  
  // Mai 2025 - 5150€ total
  { name: '@PrimeHunter', date: '03/05/2025', status: 'completed', reward: 650 },
  { name: '@UltraViper', date: '07/05/2025', status: 'completed', reward: 580 },
  { name: '@MegaFalcon', date: '11/05/2025', status: 'completed', reward: 620 },
  { name: '@SuperNova', date: '15/05/2025', status: 'completed', reward: 700 },
  { name: '@HyperBeast', date: '19/05/2025', status: 'completed', reward: 550 },
  { name: '@TurboShark', date: '23/05/2025', status: 'completed', reward: 600 },
  { name: '@MaxPower', date: '27/05/2025', status: 'completed', reward: 750 },
  { name: '@EliteForce', date: '31/05/2025', status: 'completed', reward: 700 },
  
  // Juin 2025 - 5800€ total
  { name: '@SkyllaGaming', date: '02/06/2025', status: 'completed', reward: 650 },
  { name: '@MoonPhoenix', date: '06/06/2025', status: 'completed', reward: 700 },
  { name: '@CyberWolfX', date: '10/06/2025', status: 'completed', reward: 580 },
  { name: '@NeonDreamer', date: '14/06/2025', status: 'pending', reward: 620 },
  { name: '@PixelHunter', date: '18/06/2025', status: 'completed', reward: 750 },
  { name: '@StardustRider', date: '22/06/2025', status: 'completed', reward: 800 },
  { name: '@VoidSeeker', date: '26/06/2025', status: 'pending', reward: 600 },
  { name: '@ThunderStrike', date: '30/06/2025', status: 'completed', reward: 850 },
  { name: '@CrimsonLord', date: '30/06/2025', status: 'completed', reward: 250 }
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
      recentReferrals: STATIC_REFERRALS.filter(r => r.status === 'completed').slice(-10).reverse(), // Afficher les 10 derniers parrainages complétés
      tierProgress,
      currentTier: 'Bronze',
      nextTier: 'Argent',
      nextTierRequirement: 100000
    };
  }, []);
};