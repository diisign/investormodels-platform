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
  // Octobre 2024 - 350€ total (1x250€ + 1x100€)
  { name: '@CrimsonBlade', date: '05/10/2024', status: 'completed', reward: 250 },
  { name: '@SilverFox99', date: '12/10/2024', status: 'completed', reward: 100 },
  
  // Novembre 2024 - 900€ total (3x250€ + 1x150€)
  { name: '@GoldenEagle', date: '03/11/2024', status: 'completed', reward: 250 },
  { name: '@IcePhoenix', date: '10/11/2024', status: 'completed', reward: 250 },
  { name: '@StormRider', date: '18/11/2024', status: 'completed', reward: 250 },
  { name: '@MysticShadow', date: '25/11/2024', status: 'completed', reward: 150 },
  
  // Décembre 2024 - 750€ total (3x250€)
  { name: '@FireDragon', date: '02/12/2024', status: 'completed', reward: 250 },
  { name: '@FrostWolf', date: '09/12/2024', status: 'completed', reward: 250 },
  { name: '@LightBringer', date: '16/12/2024', status: 'completed', reward: 250 },
  
  // Janvier 2025 - 1200€ total (4x250€ + 2x100€)
  { name: '@CosmicRay', date: '05/01/2025', status: 'completed', reward: 250 },
  { name: '@VoidMaster', date: '12/01/2025', status: 'completed', reward: 250 },
  { name: '@StarBreaker', date: '19/01/2025', status: 'completed', reward: 250 },
  { name: '@GalaxyHunter', date: '26/01/2025', status: 'completed', reward: 250 },
  { name: '@DarkKnight', date: '08/01/2025', status: 'completed', reward: 100 },
  { name: '@NightWalker', date: '15/01/2025', status: 'completed', reward: 100 },
  
  // Février 2025 - 3500€ total (14x250€)
  { name: '@TitanSlayer', date: '02/02/2025', status: 'completed', reward: 250 },
  { name: '@PlasmaStorm', date: '03/02/2025', status: 'completed', reward: 250 },
  { name: '@QuantumLeap', date: '04/02/2025', status: 'completed', reward: 250 },
  { name: '@NebulaCrush', date: '05/02/2025', status: 'completed', reward: 250 },
  { name: '@SolarFlare', date: '06/02/2025', status: 'completed', reward: 250 },
  { name: '@BlackHole', date: '07/02/2025', status: 'completed', reward: 250 },
  { name: '@MeteorStrike', date: '08/02/2025', status: 'completed', reward: 250 },
  { name: '@AstroNinja', date: '09/02/2025', status: 'completed', reward: 250 },
  { name: '@CosmicBeast', date: '10/02/2025', status: 'completed', reward: 250 },
  { name: '@StarViper', date: '11/02/2025', status: 'completed', reward: 250 },
  { name: '@GalaxyWolf', date: '12/02/2025', status: 'completed', reward: 250 },
  { name: '@NebulaKing', date: '13/02/2025', status: 'completed', reward: 250 },
  { name: '@SolarWind', date: '14/02/2025', status: 'completed', reward: 250 },
  { name: '@VoidLord', date: '15/02/2025', status: 'completed', reward: 250 },
  
  // Mars 2025 - 4850€ total (19x250€ + 1x100€)
  { name: '@CyberSamurai', date: '01/03/2025', status: 'completed', reward: 250 },
  { name: '@TechnoMage', date: '02/03/2025', status: 'completed', reward: 250 },
  { name: '@DigitalGhost', date: '03/03/2025', status: 'completed', reward: 250 },
  { name: '@NeonRaven', date: '04/03/2025', status: 'completed', reward: 250 },
  { name: '@HoloWarrior', date: '05/03/2025', status: 'completed', reward: 250 },
  { name: '@ByteReaper', date: '06/03/2025', status: 'completed', reward: 250 },
  { name: '@MatrixKing', date: '07/03/2025', status: 'completed', reward: 250 },
  { name: '@CyberViper', date: '08/03/2025', status: 'completed', reward: 250 },
  { name: '@PixelMaster', date: '09/03/2025', status: 'completed', reward: 250 },
  { name: '@DataHunter', date: '10/03/2025', status: 'completed', reward: 250 },
  { name: '@CodeBreaker', date: '11/03/2025', status: 'completed', reward: 250 },
  { name: '@NetRunner', date: '12/03/2025', status: 'completed', reward: 250 },
  { name: '@TechWizard', date: '13/03/2025', status: 'completed', reward: 250 },
  { name: '@CyberPhoenix', date: '14/03/2025', status: 'completed', reward: 250 },
  { name: '@DigitalDragon', date: '15/03/2025', status: 'completed', reward: 250 },
  { name: '@VirtualKnight', date: '16/03/2025', status: 'completed', reward: 250 },
  { name: '@BinaryBlade', date: '17/03/2025', status: 'completed', reward: 250 },
  { name: '@ElectroWolf', date: '18/03/2025', status: 'completed', reward: 250 },
  { name: '@NanoStorm', date: '19/03/2025', status: 'completed', reward: 250 },
  { name: '@QuantumShark', date: '20/03/2025', status: 'completed', reward: 100 },
  
  // Avril 2025 - 4100€ total (16x250€ + 1x100€)
  { name: '@AlphaWolf', date: '01/04/2025', status: 'completed', reward: 250 },
  { name: '@BetaRanger', date: '02/04/2025', status: 'completed', reward: 250 },
  { name: '@GammaForce', date: '03/04/2025', status: 'completed', reward: 250 },
  { name: '@DeltaStrike', date: '04/04/2025', status: 'completed', reward: 250 },
  { name: '@EpsilonBlade', date: '05/04/2025', status: 'completed', reward: 250 },
  { name: '@ZetaPhoenix', date: '06/04/2025', status: 'completed', reward: 250 },
  { name: '@ThetaLion', date: '07/04/2025', status: 'completed', reward: 250 },
  { name: '@OmegaTiger', date: '08/04/2025', status: 'completed', reward: 250 },
  { name: '@SigmaHawk', date: '09/04/2025', status: 'completed', reward: 250 },
  { name: '@KappaEagle', date: '10/04/2025', status: 'completed', reward: 250 },
  { name: '@LambdaViper', date: '11/04/2025', status: 'completed', reward: 250 },
  { name: '@MuDragon', date: '12/04/2025', status: 'completed', reward: 250 },
  { name: '@NuFalcon', date: '13/04/2025', status: 'completed', reward: 250 },
  { name: '@XiShark', date: '14/04/2025', status: 'completed', reward: 250 },
  { name: '@RhoCobra', date: '15/04/2025', status: 'completed', reward: 250 },
  { name: '@TauPanther', date: '16/04/2025', status: 'completed', reward: 250 },
  { name: '@PhiRaven', date: '17/04/2025', status: 'completed', reward: 100 },
  
  // Mai 2025 - 5150€ total (20x250€ + 1x150€)
  { name: '@PrimeHunter', date: '01/05/2025', status: 'completed', reward: 250 },
  { name: '@UltraViper', date: '02/05/2025', status: 'completed', reward: 250 },
  { name: '@MegaFalcon', date: '03/05/2025', status: 'completed', reward: 250 },
  { name: '@SuperNova', date: '04/05/2025', status: 'completed', reward: 250 },
  { name: '@HyperBeast', date: '05/05/2025', status: 'completed', reward: 250 },
  { name: '@TurboShark', date: '06/05/2025', status: 'completed', reward: 250 },
  { name: '@MaxPower', date: '07/05/2025', status: 'completed', reward: 250 },
  { name: '@EliteForce', date: '08/05/2025', status: 'completed', reward: 250 },
  { name: '@ProGamer', date: '09/05/2025', status: 'completed', reward: 250 },
  { name: '@MasterChief', date: '10/05/2025', status: 'completed', reward: 250 },
  { name: '@LegendKiller', date: '11/05/2025', status: 'completed', reward: 250 },
  { name: '@ChampionX', date: '12/05/2025', status: 'completed', reward: 250 },
  { name: '@VictoryLord', date: '13/05/2025', status: 'completed', reward: 250 },
  { name: '@WinnerKing', date: '14/05/2025', status: 'completed', reward: 250 },
  { name: '@TopPlayer', date: '15/05/2025', status: 'completed', reward: 250 },
  { name: '@BestShot', date: '16/05/2025', status: 'completed', reward: 250 },
  { name: '@SkillMaster', date: '17/05/2025', status: 'completed', reward: 250 },
  { name: '@GameLord', date: '18/05/2025', status: 'completed', reward: 250 },
  { name: '@PlayKing', date: '19/05/2025', status: 'completed', reward: 250 },
  { name: '@FinalBoss', date: '20/05/2025', status: 'completed', reward: 250 },
  { name: '@PowerUp', date: '21/05/2025', status: 'completed', reward: 150 },
  
  // Juin 2025 - 5800€ total (23x250€ + 1x50€)
  { name: '@SkyllaGaming', date: '01/06/2025', status: 'completed', reward: 250 },
  { name: '@MoonPhoenix', date: '02/06/2025', status: 'completed', reward: 250 },
  { name: '@CyberWolfX', date: '03/06/2025', status: 'completed', reward: 250 },
  { name: '@NeonDreamer', date: '04/06/2025', status: 'pending', reward: 250 },
  { name: '@PixelHunter', date: '05/06/2025', status: 'completed', reward: 250 },
  { name: '@StardustRider', date: '06/06/2025', status: 'completed', reward: 250 },
  { name: '@VoidSeeker', date: '07/06/2025', status: 'pending', reward: 250 },
  { name: '@ThunderStrike', date: '08/06/2025', status: 'completed', reward: 250 },
  { name: '@CrimsonLord', date: '09/06/2025', status: 'completed', reward: 250 },
  { name: '@BlazeFury', date: '10/06/2025', status: 'completed', reward: 250 },
  { name: '@IceCold', date: '11/06/2025', status: 'completed', reward: 250 },
  { name: '@FireStorm', date: '12/06/2025', status: 'completed', reward: 250 },
  { name: '@WindSlash', date: '13/06/2025', status: 'completed', reward: 250 },
  { name: '@EarthShaker', date: '14/06/2025', status: 'completed', reward: 250 },
  { name: '@LightSpeed', date: '15/06/2025', status: 'completed', reward: 250 },
  { name: '@DarkMatter', date: '16/06/2025', status: 'completed', reward: 250 },
  { name: '@StormBreaker', date: '17/06/2025', status: 'completed', reward: 250 },
  { name: '@FlameWarden', date: '18/06/2025', status: 'completed', reward: 250 },
  { name: '@FrostGuard', date: '19/06/2025', status: 'completed', reward: 250 },
  { name: '@ShadowBane', date: '20/06/2025', status: 'completed', reward: 250 },
  { name: '@LightBearer', date: '21/06/2025', status: 'completed', reward: 250 },
  { name: '@VoidWalker', date: '22/06/2025', status: 'completed', reward: 250 },
  { name: '@TimeKeeper', date: '23/06/2025', status: 'completed', reward: 250 },
  { name: '@SpaceRider', date: '24/06/2025', status: 'completed', reward: 50 }
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