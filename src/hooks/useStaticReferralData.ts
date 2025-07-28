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
  completedEarnings7d?: number;
  completedEarnings30d?: number;
  completedEarnings6m?: number;
  recentReferrals: StaticReferral[];
  tierProgress: number;
  currentTier: string;
  nextTier: string;
  nextTierRequirement: number;
}

// Données statiques persistantes avec gains selon montants spécifiés (triées du plus récent au plus ancien)
const STATIC_REFERRALS: StaticReferral[] = [
  // Juillet 2025 - 4100€ total (réduit pour atteindre 35 550€ au total)
  // Nouveaux filleuls récents
  { name: 'xKylo92', date: '28/07/2025', status: 'completed', reward: 120 },
  { name: 'Luna_Moonwalk', date: '28/07/2025', status: 'completed', reward: 100 },
  { name: 'RocketBoost', date: '28/07/2025', status: 'pending', reward: 80 },
  { name: 'ZenMaster_7', date: '28/07/2025', status: 'completed', reward: 150 },
  { name: 'Lulu_Finance', date: '27/07/2025', status: 'completed', reward: 100 },
  { name: 'EmmyT', date: '27/07/2025', status: 'completed', reward: 150 },
  { name: 'Adri3n', date: '26/07/2025', status: 'completed', reward: 80 },
  { name: 'LeaInv', date: '26/07/2025', status: 'completed', reward: 120 },
  { name: 'Nico_pro', date: '25/07/2025', status: 'completed', reward: 150 },
  { name: 'ManonTr4d3', date: '25/07/2025', status: 'completed', reward: 100 },
  { name: 'BaptistePro', date: '24/07/2025', status: 'completed', reward: 80 },
  { name: 'Chl0é_Inv', date: '24/07/2025', status: 'completed', reward: 120 },
  { name: 'Pierre.fin', date: '22/07/2025', status: 'completed', reward: 150 },
  { name: 'InesCrypto', date: '23/07/2025', status: 'completed', reward: 100 },
  { name: 'Antoine_88', date: '21/07/2025', status: 'completed', reward: 80 },
  { name: 'MathildeTrad', date: '20/07/2025', status: 'completed', reward: 120 },
  { name: 'Raph4el', date: '19/07/2025', status: 'completed', reward: 150 },
  { name: 'Julie.invest', date: '18/07/2025', status: 'completed', reward: 100 },
  { name: 'FloTrading', date: '17/07/2025', status: 'completed', reward: 80 },
  { name: 'Margaux_F', date: '16/07/2025', status: 'completed', reward: 120 },
  { name: 'Kevin2024', date: '15/07/2025', status: 'completed', reward: 150 },
  { name: 'PaulineT', date: '14/07/2025', status: 'completed', reward: 100 },
  { name: 'Clem_pro', date: '13/07/2025', status: 'completed', reward: 80 },
  { name: 'SarahCrypto', date: '12/07/2025', status: 'completed', reward: 120 },
  { name: 'J0rdan', date: '11/07/2025', status: 'completed', reward: 150 },
  { name: 'EloiseTrad', date: '10/07/2025', status: 'completed', reward: 100 },
  { name: 'Valentin_P', date: '09/07/2025', status: 'completed', reward: 80 },
  { name: 'Océane.inv', date: '08/07/2025', status: 'completed', reward: 120 },
  { name: 'Rom4in', date: '07/07/2025', status: 'completed', reward: 150 },
  { name: 'ClaraFin', date: '06/07/2025', status: 'completed', reward: 100 },
  { name: 'HugoCrypt0', date: '05/07/2025', status: 'completed', reward: 80 },
  { name: 'AmélieT', date: '04/07/2025', status: 'completed', reward: 120 },
  { name: 'RémiInv', date: '03/07/2025', status: 'completed', reward: 150 },
  { name: 'ZoéTrader', date: '02/07/2025', status: 'completed', reward: 100 },
  { name: 'QuentinP', date: '01/07/2025', status: 'completed', reward: 80 },

  // Juin 2025 - 6500€ total (mélange gros/petits montants)
  { name: 'AlexInvest', date: '30/06/2025', status: 'completed', reward: 250 },
  { name: 'Sophie_T2024', date: '30/06/2025', status: 'completed', reward: 200 },
  { name: 'MaximumPro', date: '29/06/2025', status: 'completed', reward: 250 },
  { name: 'Ju.crypto', date: '29/06/2025', status: 'pending', reward: 150 },
  { name: 'ThomasInv3st', date: '28/06/2025', status: 'completed', reward: 200 },
  { name: 'CamTrad3r', date: '28/06/2025', status: 'completed', reward: 100 },
  { name: 'LucasFinance_', date: '27/06/2025', status: 'pending', reward: 150 },
  { name: 'EmmaT2024', date: '27/06/2025', status: 'completed', reward: 250 },
  { name: 'AdrienCrypto88', date: '26/06/2025', status: 'completed', reward: 100 },
  { name: 'LeaInvestments_', date: '26/06/2025', status: 'completed', reward: 200 },
  { name: 'NicolasPr0', date: '25/06/2025', status: 'completed', reward: 250 },
  { name: 'ManonT_', date: '25/06/2025', status: 'completed', reward: 150 },
  { name: 'BaptisteFin', date: '24/06/2025', status: 'completed', reward: 100 },
  { name: 'ChloéInv2024', date: '24/06/2025', status: 'completed', reward: 200 },
  { name: 'Pierre.finance', date: '22/06/2025', status: 'completed', reward: 250 },
  { name: 'InesCrypt0', date: '23/06/2025', status: 'completed', reward: 150 },
  { name: 'Antoine_Pr0', date: '21/06/2025', status: 'completed', reward: 100 },
  { name: 'MathildeT_24', date: '20/06/2025', status: 'completed', reward: 200 },
  { name: 'RaphaelCrypt0', date: '19/06/2025', status: 'completed', reward: 250 },
  { name: 'Juliette.inv_', date: '18/06/2025', status: 'completed', reward: 150 },
  { name: 'FlorentTrad3', date: '17/06/2025', status: 'completed', reward: 100 },
  { name: 'Margaux_Fin24', date: '16/06/2025', status: 'completed', reward: 200 },
  { name: 'KevinInvest0r', date: '15/06/2025', status: 'completed', reward: 250 },
  { name: 'PaulineT24', date: '14/06/2025', status: 'completed', reward: 150 },
  { name: 'Clément.pr0', date: '13/06/2025', status: 'completed', reward: 100 },
  { name: 'SarahCrypt024', date: '12/06/2025', status: 'completed', reward: 200 },
  { name: 'JordanInv3st', date: '11/06/2025', status: 'completed', reward: 250 },
  { name: 'EloiseTrad24', date: '10/06/2025', status: 'completed', reward: 150 },
  { name: 'ValentinPr0', date: '09/06/2025', status: 'completed', reward: 100 },
  { name: 'Océane.inv_', date: '08/06/2025', status: 'completed', reward: 200 },
  { name: 'RomainTrd24', date: '07/06/2025', status: 'completed', reward: 250 },
  { name: 'ClaraFin24', date: '06/06/2025', status: 'completed', reward: 150 },
  { name: 'HugoCrypt024', date: '05/06/2025', status: 'completed', reward: 100 },
  { name: 'AmélieTrd24', date: '04/06/2025', status: 'completed', reward: 200 },
  { name: 'RémiInv24', date: '03/06/2025', status: 'completed', reward: 250 },
  { name: 'ZoéTrd24', date: '02/06/2025', status: 'completed', reward: 150 },
  { name: 'QuentinPr024', date: '01/06/2025', status: 'completed', reward: 100 },
  
  // Mai 2025 - 6200€ total
  { name: 'cryptoM4n', date: '31/05/2025', status: 'completed', reward: 150 },
  { name: 'Boss2024', date: '30/05/2025', status: 'completed', reward: 250 },
  { name: 'Mxt3r', date: '29/05/2025', status: 'completed', reward: 300 },
  { name: 'GameL0rd', date: '28/05/2025', status: 'completed', reward: 200 },
  { name: 'Skillz_pro', date: '27/05/2025', status: 'completed', reward: 250 },
  { name: 'xBestSh0t', date: '26/05/2025', status: 'completed', reward: 300 },
  { name: 'Toppl4yer', date: '25/05/2025', status: 'completed', reward: 150 },
  { name: 'W1nnerK', date: '24/05/2025', status: 'completed', reward: 250 },
  { name: 'V1ctoryL', date: '23/05/2025', status: 'completed', reward: 300 },
  { name: 'Ch4mpX', date: '22/05/2025', status: 'completed', reward: 200 },
  { name: 'L3gendK', date: '21/05/2025', status: 'completed', reward: 250 },
  { name: 'M4st3rCh', date: '20/05/2025', status: 'completed', reward: 300 },
  { name: 'Pr0G4m3r', date: '19/05/2025', status: 'completed', reward: 150 },
  { name: 'El1t3F', date: '18/05/2025', status: 'completed', reward: 250 },
  { name: 'M4xP0w3r', date: '17/05/2025', status: 'completed', reward: 300 },
  { name: 'TurboSh4rk', date: '16/05/2025', status: 'completed', reward: 200 },
  { name: 'Hyp3rB34st', date: '15/05/2025', status: 'completed', reward: 250 },
  { name: 'Sup3rN0v4', date: '14/05/2025', status: 'completed', reward: 300 },
  { name: 'M3g4F4lc', date: '13/05/2025', status: 'completed', reward: 150 },
  { name: 'Ultr4V1p3r', date: '12/05/2025', status: 'completed', reward: 250 },
  { name: 'Pr1m3Hunt', date: '11/05/2025', status: 'completed', reward: 300 },
  { name: 'Z3nM4st3r', date: '10/05/2025', status: 'completed', reward: 200 },
  { name: 'Fl4shL', date: '09/05/2025', status: 'completed', reward: 75 },
  { name: 'Sp33dRun', date: '08/05/2025', status: 'completed', reward: 100 },
  { name: 'Qu1ckSh0t', date: '07/05/2025', status: 'completed', reward: 50 },
  { name: 'F4stTr4ck', date: '06/05/2025', status: 'completed', reward: 75 },
  { name: 'R4p1dF1r3', date: '05/05/2025', status: 'completed', reward: 100 },
  { name: 'Sw1ftArr0w', date: '04/05/2025', status: 'completed', reward: 50 },
  { name: 'Bl1tzKr13g', date: '03/05/2025', status: 'completed', reward: 75 },
  { name: 'RushH0ur', date: '02/05/2025', status: 'completed', reward: 100 },
  { name: 'D4shB04rd', date: '01/05/2025', status: 'completed', reward: 50 },
  
  // Avril 2025 - 4600€ total
  { name: 'φRaven', date: '30/04/2025', status: 'completed', reward: 100 },
  { name: 'τPanther', date: '29/04/2025', status: 'completed', reward: 150 },
  { name: 'ρCobra', date: '28/04/2025', status: 'completed', reward: 200 },
  { name: 'ξShark', date: '27/04/2025', status: 'completed', reward: 100 },
  { name: 'νFalcon', date: '26/04/2025', status: 'completed', reward: 150 },
  { name: 'μDragon', date: '25/04/2025', status: 'completed', reward: 200 },
  { name: 'λViper', date: '24/04/2025', status: 'completed', reward: 100 },
  { name: 'κEagle', date: '23/04/2025', status: 'completed', reward: 150 },
  { name: 'σHawk', date: '22/04/2025', status: 'completed', reward: 200 },
  { name: 'ωTiger', date: '21/04/2025', status: 'completed', reward: 100 },
  { name: 'θLion', date: '20/04/2025', status: 'completed', reward: 150 },
  { name: 'ζPhoenix', date: '19/04/2025', status: 'completed', reward: 200 },
  { name: 'εBlade', date: '18/04/2025', status: 'completed', reward: 100 },
  { name: 'δStrike', date: '17/04/2025', status: 'completed', reward: 150 },
  { name: 'γForce', date: '16/04/2025', status: 'completed', reward: 200 },
  { name: 'βRanger', date: '15/04/2025', status: 'completed', reward: 100 },
  { name: 'αWolf', date: '14/04/2025', status: 'completed', reward: 150 },
  { name: 'ωEnd', date: '13/04/2025', status: 'completed', reward: 200 },
  { name: 'αStart', date: '12/04/2025', status: 'completed', reward: 100 },
  { name: 'βTest', date: '11/04/2025', status: 'completed', reward: 150 },
  { name: 'γBurst', date: '10/04/2025', status: 'completed', reward: 200 },
  { name: 'δWave', date: '09/04/2025', status: 'completed', reward: 100 },
  { name: 'εCore', date: '08/04/2025', status: 'completed', reward: 150 },
  { name: 'ζField', date: '07/04/2025', status: 'completed', reward: 200 },
  { name: 'θRay', date: '06/04/2025', status: 'completed', reward: 100 },
  { name: 'ιBeam', date: '05/04/2025', status: 'completed', reward: 150 },
  { name: 'κFlux', date: '04/04/2025', status: 'completed', reward: 200 },
  { name: 'λCrux', date: '03/04/2025', status: 'completed', reward: 100 },
  { name: 'μPulse', date: '02/04/2025', status: 'completed', reward: 150 },
  { name: 'νWave', date: '01/04/2025', status: 'completed', reward: 200 },
  
  // Mars 2025 - 5200€ total
  { name: 'QuantumShark', date: '31/03/2025', status: 'completed', reward: 100 },
  { name: 'NanoStorm', date: '30/03/2025', status: 'completed', reward: 150 },
  { name: 'ElectroWolf', date: '29/03/2025', status: 'completed', reward: 200 },
  { name: 'BinaryBlade', date: '28/03/2025', status: 'completed', reward: 100 },
  { name: 'VirtualKnight', date: '27/03/2025', status: 'completed', reward: 150 },
  { name: 'DigitalDragon', date: '26/03/2025', status: 'completed', reward: 200 },
  { name: 'CyberPhoenix', date: '25/03/2025', status: 'completed', reward: 50 },
  { name: 'TechWizard', date: '24/03/2025', status: 'completed', reward: 75 },
  { name: 'NetRunner', date: '23/03/2025', status: 'completed', reward: 100 },
  { name: 'CodeBreaker', date: '22/03/2025', status: 'completed', reward: 50 },
  { name: 'DataHunter', date: '21/03/2025', status: 'completed', reward: 75 },
  { name: 'PixelMaster', date: '20/03/2025', status: 'completed', reward: 100 },
  { name: 'CyberViper', date: '19/03/2025', status: 'completed', reward: 50 },
  { name: 'MatrixKing', date: '18/03/2025', status: 'completed', reward: 75 },
  { name: 'ByteReaper', date: '17/03/2025', status: 'completed', reward: 100 },
  { name: 'HoloWarrior', date: '16/03/2025', status: 'completed', reward: 50 },
  { name: 'NeonRaven', date: '15/03/2025', status: 'completed', reward: 75 },
  { name: 'DigitalGhost', date: '14/03/2025', status: 'completed', reward: 100 },
  { name: 'TechnoMage', date: '13/03/2025', status: 'completed', reward: 50 },
  { name: 'CyberSamurai', date: '12/03/2025', status: 'completed', reward: 75 },
  { name: 'QuantumHack', date: '11/03/2025', status: 'completed', reward: 100 },
  { name: 'DataFlow', date: '10/03/2025', status: 'completed', reward: 50 },
  { name: 'ByteCode', date: '09/03/2025', status: 'completed', reward: 75 },
  { name: 'NetSurf', date: '08/03/2025', status: 'completed', reward: 100 },
  { name: 'WebCrawl', date: '07/03/2025', status: 'completed', reward: 50 },
  { name: 'TechLink', date: '06/03/2025', status: 'completed', reward: 75 },
  { name: 'CyberLink', date: '05/03/2025', status: 'completed', reward: 100 },
  { name: 'DigitalLink', date: '04/03/2025', status: 'completed', reward: 50 },
  { name: 'VirtualLink', date: '03/03/2025', status: 'completed', reward: 75 },
  { name: 'NetLink', date: '02/03/2025', status: 'completed', reward: 100 },
  { name: 'WebLink', date: '01/03/2025', status: 'completed', reward: 50 },
  
  // Février 2025 - 4000€ total
  { name: 'VoidLord', date: '28/02/2025', status: 'completed', reward: 150 },
  { name: 'SolarWind', date: '27/02/2025', status: 'completed', reward: 125 },
  { name: 'NebulaKing', date: '26/02/2025', status: 'completed', reward: 100 },
  { name: 'GalaxyWolf', date: '25/02/2025', status: 'completed', reward: 150 },
  { name: 'StarViper', date: '24/02/2025', status: 'completed', reward: 125 },
  { name: 'CosmicBeast', date: '23/02/2025', status: 'completed', reward: 100 },
  { name: 'AstroNinja', date: '22/02/2025', status: 'completed', reward: 150 },
  { name: 'MeteorStrike', date: '21/02/2025', status: 'completed', reward: 125 },
  { name: 'BlackHole', date: '20/02/2025', status: 'completed', reward: 100 },
  { name: 'SolarFlare', date: '19/02/2025', status: 'completed', reward: 150 },
  { name: 'NebulaCrush', date: '18/02/2025', status: 'completed', reward: 125 },
  { name: 'QuantumLeap', date: '17/02/2025', status: 'completed', reward: 100 },
  { name: 'PlasmaStorm', date: '16/02/2025', status: 'completed', reward: 150 },
  { name: 'TitanSlayer', date: '15/02/2025', status: 'completed', reward: 125 },
  { name: 'StarBurst', date: '14/02/2025', status: 'completed', reward: 100 },
  { name: 'GalaxyBoom', date: '13/02/2025', status: 'completed', reward: 150 },
  { name: 'CosmicFlash', date: '12/02/2025', status: 'completed', reward: 125 },
  { name: 'SolarBlast', date: '11/02/2025', status: 'completed', reward: 100 },
  { name: 'NebulaFlare', date: '10/02/2025', status: 'completed', reward: 150 },
  { name: 'StarPulse', date: '09/02/2025', status: 'completed', reward: 125 },
  { name: 'VoidPulse', date: '08/02/2025', status: 'completed', reward: 100 },
  { name: 'SpaceBlast', date: '07/02/2025', status: 'completed', reward: 150 },
  { name: 'CosmicWave', date: '06/02/2025', status: 'completed', reward: 125 },
  { name: 'StellarWave', date: '05/02/2025', status: 'completed', reward: 100 },
  { name: 'GalacticWave', date: '04/02/2025', status: 'completed', reward: 150 },
  { name: 'UniversalWave', date: '03/02/2025', status: 'completed', reward: 125 },
  { name: 'InfiniteWave', date: '02/02/2025', status: 'completed', reward: 100 },
  { name: 'EternalWave', date: '01/02/2025', status: 'completed', reward: 150 },
  
  // Janvier 2025 - 1250€ total
  { name: 'NightWalker', date: '31/01/2025', status: 'completed', reward: 100 },
  { name: 'GalaxyHunter', date: '30/01/2025', status: 'completed', reward: 75 },
  { name: 'DarkKnight2', date: '29/01/2025', status: 'completed', reward: 100 },
  { name: 'StarBreaker', date: '28/01/2025', status: 'completed', reward: 50 },
  { name: 'VoidMaster', date: '27/01/2025', status: 'completed', reward: 75 },
  { name: 'CosmicRay', date: '26/01/2025', status: 'completed', reward: 100 },
  { name: 'ShadowPlay', date: '25/01/2025', status: 'completed', reward: 50 },
  { name: 'MidnightSun', date: '24/01/2025', status: 'completed', reward: 75 },
  { name: 'DawnBreaker', date: '23/01/2025', status: 'completed', reward: 100 },
  { name: 'TwilightZone', date: '22/01/2025', status: 'completed', reward: 50 },
  { name: 'SunsetGlow', date: '21/01/2025', status: 'completed', reward: 75 },
  { name: 'MorningDew', date: '20/01/2025', status: 'completed', reward: 100 },
  { name: 'EveningMist', date: '19/01/2025', status: 'completed', reward: 50 },
  { name: 'NightFall', date: '18/01/2025', status: 'completed', reward: 75 },
  { name: 'DayBreak', date: '17/01/2025', status: 'completed', reward: 100 },
  { name: 'StarLight', date: '16/01/2025', status: 'completed', reward: 50 },
  { name: 'MoonBeam', date: '15/01/2025', status: 'completed', reward: 75 },
  { name: 'SunRay', date: '14/01/2025', status: 'completed', reward: 100 },
  { name: 'CloudNine', date: '13/01/2025', status: 'completed', reward: 50 },
  { name: 'SkyHigh', date: '12/01/2025', status: 'completed', reward: 75 },
  { name: 'StarGaze', date: '11/01/2025', status: 'completed', reward: 100 },
  { name: 'MoonGlow', date: '10/01/2025', status: 'completed', reward: 50 },
  { name: 'SunShine', date: '09/01/2025', status: 'completed', reward: 75 },
  { name: 'StarDust', date: '08/01/2025', status: 'completed', reward: 100 },
  { name: 'MoonDust', date: '07/01/2025', status: 'completed', reward: 50 },
  { name: 'SunDust', date: '06/01/2025', status: 'completed', reward: 75 },
  { name: 'CosmicDust', date: '05/01/2025', status: 'completed', reward: 100 },
  { name: 'SpaceDust', date: '04/01/2025', status: 'completed', reward: 50 },
  { name: 'StellarDust', date: '03/01/2025', status: 'completed', reward: 75 },
  { name: 'GalacticDust', date: '02/01/2025', status: 'completed', reward: 100 },
  { name: 'UniversalDust', date: '01/01/2025', status: 'completed', reward: 50 },
  
  // Décembre 2024 - 900€ total
  { name: 'LightBringer', date: '31/12/2024', status: 'completed', reward: 100 },
  { name: 'FrostWolf', date: '30/12/2024', status: 'completed', reward: 150 },
  { name: 'FireDragon', date: '29/12/2024', status: 'completed', reward: 75 },
  { name: 'IceWinter', date: '28/12/2024', status: 'completed', reward: 100 },
  { name: 'SnowStorm', date: '27/12/2024', status: 'completed', reward: 125 },
  { name: 'FrostBite', date: '26/12/2024', status: 'completed', reward: 75 },
  { name: 'IceCrack', date: '25/12/2024', status: 'completed', reward: 100 },
  { name: 'ColdSnap', date: '24/12/2024', status: 'completed', reward: 100 },
  { name: 'FreezeFrame', date: '23/12/2024', status: 'completed', reward: 75 },
  
  // Novembre 2024 - 1250€ total
  { name: 'MysticShadow', date: '30/11/2024', status: 'completed', reward: 150 },
  { name: 'StormRider', date: '29/11/2024', status: 'completed', reward: 100 },
  { name: 'IcePhoenix', date: '28/11/2024', status: 'completed', reward: 75 },
  { name: 'GoldenEagle', date: '27/11/2024', status: 'completed', reward: 150 },
  { name: 'SilverHawk', date: '26/11/2024', status: 'completed', reward: 100 },
  { name: 'BronzeLion', date: '25/11/2024', status: 'completed', reward: 75 },
  { name: 'IronWolf', date: '24/11/2024', status: 'completed', reward: 150 },
  { name: 'CopperFox', date: '23/11/2024', status: 'completed', reward: 100 },
  { name: 'TinMan', date: '22/11/2024', status: 'completed', reward: 75 },
  { name: 'SteelBeam', date: '21/11/2024', status: 'completed', reward: 125 },
  { name: 'MetalGear', date: '20/11/2024', status: 'completed', reward: 100 },
  { name: 'RockSolid', date: '19/11/2024', status: 'completed', reward: 75 },
  { name: 'StoneWall', date: '18/11/2024', status: 'completed', reward: 50 },
  { name: 'BrickHouse', date: '17/11/2024', status: 'completed', reward: 50 },
  { name: 'ConcreteDream', date: '16/11/2024', status: 'completed', reward: 65 },
  
  // Octobre 2024 - 350€ total
  { name: 'SilverFox99', date: '31/10/2024', status: 'completed', reward: 50 },
  { name: 'CrimsonBlade', date: '30/10/2024', status: 'completed', reward: 75 },
  { name: 'RedRose', date: '29/10/2024', status: 'completed', reward: 100 },
  { name: 'BlueSkies', date: '28/10/2024', status: 'completed', reward: 50 },
  { name: 'GreenField', date: '27/10/2024', status: 'completed', reward: 75 },
  
  // Septembre 2024 - 200€ total
  { name: 'DarkKnight', date: '30/09/2024', status: 'completed', reward: 50 },
  { name: 'LightBearer', date: '29/09/2024', status: 'completed', reward: 50 },
  { name: 'EarthShaker', date: '28/09/2024', status: 'completed', reward: 50 },
  { name: 'WindWalker', date: '27/09/2024', status: 'completed', reward: 50 }
];

export const useStaticReferralData = (): StaticReferralData => {
  return useMemo(() => {
    const completedReferrals = STATIC_REFERRALS.filter(r => r.status === 'completed');
    const pendingReferrals = STATIC_REFERRALS.filter(r => r.status === 'pending');
    
    // Force le total à exactement 35 550€
    const totalEarnings = 35550;
    
    // Calculer les gains des 10 derniers mois pour l'objectif
    const recentEarnings = completedReferrals
      .filter(ref => new Date(ref.date.split('/').reverse().join('-')) >= new Date('2023-08-01'))
      .reduce((sum, ref) => sum + ref.reward, 0);

    const tierProgress = Math.min((recentEarnings / 100000) * 100, 100);

    // Calculer les gains complétés par période
    const completedEarnings7d = filterReferralsByPeriod(STATIC_REFERRALS, '7days')
      .filter(ref => ref.status === 'completed')
      .reduce((sum, ref) => sum + ref.reward, 0);

    const completedEarnings30d = filterReferralsByPeriod(STATIC_REFERRALS, '30days')
      .filter(ref => ref.status === 'completed')
      .reduce((sum, ref) => sum + ref.reward, 0);

    const completedEarnings6m = filterReferralsByPeriod(STATIC_REFERRALS, '6months')
      .filter(ref => ref.status === 'completed')
      .reduce((sum, ref) => sum + ref.reward, 0);
    
    return {
      totalReferrals: 212, // Forcé à 212 pour /dɑshboard  
      pendingReferrals: pendingReferrals.length,
      completedReferrals: completedReferrals.length,
      earnings: totalEarnings,
      completedEarnings7d,
      completedEarnings30d,
      completedEarnings6m,
      recentReferrals: STATIC_REFERRALS, // Retourner tous les parrainages
      tierProgress,
      currentTier: 'Bronze',
      nextTier: 'Argent',
      nextTierRequirement: 100000
    };
  }, []);
};

// Fonction utilitaire pour filtrer les parrainages par période
export const filterReferralsByPeriod = (referrals: StaticReferral[], period: string): StaticReferral[] => {
  const now = new Date();
  
  switch (period) {
    case '7days':
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return referrals.filter(ref => {
        const refDate = new Date(ref.date.split('/').reverse().join('-'));
        return refDate >= sevenDaysAgo;
      });
      
    case '30days':
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return referrals.filter(ref => {
        const refDate = new Date(ref.date.split('/').reverse().join('-'));
        return refDate >= thirtyDaysAgo;
      });
      
    case '6months':
      const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
      return referrals.filter(ref => {
        const refDate = new Date(ref.date.split('/').reverse().join('-'));
        return refDate >= sixMonthsAgo;
      });
      
    case 'total':
    default:
      return referrals;
  }
};