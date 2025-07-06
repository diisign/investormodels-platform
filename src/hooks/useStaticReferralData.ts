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

// Données statiques persistantes avec gains selon montants spécifiés (triées du plus récent au plus ancien)
const STATIC_REFERRALS: StaticReferral[] = [
  // Juin 2025 - 5800€ total (mélange gros/petits montants)
  { name: 'SkyllaGaming', date: '30/06/2025', status: 'completed', reward: 250 },
  { name: 'MoonPhoenix', date: '30/06/2025', status: 'completed', reward: 200 },
  { name: 'CyberWolfX', date: '29/06/2025', status: 'completed', reward: 250 },
  { name: 'NeonDreamer', date: '29/06/2025', status: 'pending', reward: 150 },
  { name: 'PixelHunter', date: '28/06/2025', status: 'completed', reward: 200 },
  { name: 'StardustRider', date: '28/06/2025', status: 'completed', reward: 100 },
  { name: 'VoidSeeker', date: '27/06/2025', status: 'pending', reward: 150 },
  { name: 'ThunderStrike', date: '27/06/2025', status: 'completed', reward: 250 },
  { name: 'CrimsonLord', date: '26/06/2025', status: 'completed', reward: 100 },
  { name: 'BlazeFury', date: '26/06/2025', status: 'completed', reward: 200 },
  { name: 'IceCold', date: '25/06/2025', status: 'completed', reward: 250 },
  { name: 'FireStorm', date: '25/06/2025', status: 'completed', reward: 150 },
  { name: 'WindSlash', date: '24/06/2025', status: 'completed', reward: 100 },
  { name: 'EarthShaker2', date: '24/06/2025', status: 'completed', reward: 200 },
  { name: 'UniverseKing', date: '22/06/2025', status: 'completed', reward: 250 },
  { name: 'GalacticLord', date: '23/06/2025', status: 'completed', reward: 150 },
  { name: 'PlanetHunter', date: '21/06/2025', status: 'completed', reward: 100 },
  { name: 'StarCrusher', date: '20/06/2025', status: 'completed', reward: 200 },
  { name: 'InterGalaxy', date: '19/06/2025', status: 'completed', reward: 250 },
  { name: 'AstralDragon', date: '18/06/2025', status: 'completed', reward: 150 },
  { name: 'StellarHawk', date: '17/06/2025', status: 'completed', reward: 100 },
  { name: 'LunarWolf', date: '16/06/2025', status: 'completed', reward: 200 },
  { name: 'SolarKnight', date: '15/06/2025', status: 'completed', reward: 250 },
  { name: 'CosmicWarrior', date: '14/06/2025', status: 'completed', reward: 150 },
  { name: 'NebulaFighter', date: '13/06/2025', status: 'completed', reward: 100 },
  { name: 'GalaxyGuard', date: '12/06/2025', status: 'completed', reward: 200 },
  { name: 'StarWarrior', date: '11/06/2025', status: 'completed', reward: 250 },
  { name: 'SpaceRider', date: '10/06/2025', status: 'completed', reward: 150 },
  { name: 'TimeKeeper', date: '09/06/2025', status: 'completed', reward: 100 },
  { name: 'VoidWalker', date: '08/06/2025', status: 'completed', reward: 200 },
  { name: 'LightBearer2', date: '07/06/2025', status: 'completed', reward: 250 },
  { name: 'ShadowBane', date: '06/06/2025', status: 'completed', reward: 150 },
  { name: 'FrostGuard', date: '05/06/2025', status: 'completed', reward: 100 },
  { name: 'FlameWarden', date: '04/06/2025', status: 'completed', reward: 200 },
  { name: 'StormBreaker', date: '03/06/2025', status: 'completed', reward: 250 },
  { name: 'DarkMatter', date: '02/06/2025', status: 'completed', reward: 150 },
  { name: 'LightSpeed', date: '01/06/2025', status: 'completed', reward: 100 },
  
  // Mai 2025 - 5400€ total
  { name: 'PowerUp', date: '31/05/2025', status: 'completed', reward: 100 },
  { name: 'FinalBoss', date: '30/05/2025', status: 'completed', reward: 200 },
  { name: 'PlayKing', date: '29/05/2025', status: 'completed', reward: 250 },
  { name: 'GameLord', date: '28/05/2025', status: 'completed', reward: 150 },
  { name: 'SkillMaster', date: '27/05/2025', status: 'completed', reward: 200 },
  { name: 'BestShot', date: '26/05/2025', status: 'completed', reward: 250 },
  { name: 'TopPlayer', date: '25/05/2025', status: 'completed', reward: 100 },
  { name: 'WinnerKing', date: '24/05/2025', status: 'completed', reward: 200 },
  { name: 'VictoryLord', date: '23/05/2025', status: 'completed', reward: 250 },
  { name: 'ChampionX', date: '22/05/2025', status: 'completed', reward: 150 },
  { name: 'LegendKiller', date: '21/05/2025', status: 'completed', reward: 200 },
  { name: 'MasterChief', date: '20/05/2025', status: 'completed', reward: 250 },
  { name: 'ProGamer', date: '19/05/2025', status: 'completed', reward: 100 },
  { name: 'EliteForce', date: '18/05/2025', status: 'completed', reward: 200 },
  { name: 'MaxPower', date: '17/05/2025', status: 'completed', reward: 250 },
  { name: 'TurboShark', date: '16/05/2025', status: 'completed', reward: 150 },
  { name: 'HyperBeast', date: '15/05/2025', status: 'completed', reward: 200 },
  { name: 'SuperNova', date: '14/05/2025', status: 'completed', reward: 250 },
  { name: 'MegaFalcon', date: '13/05/2025', status: 'completed', reward: 100 },
  { name: 'UltraViper', date: '12/05/2025', status: 'completed', reward: 200 },
  { name: 'PrimeHunter', date: '11/05/2025', status: 'completed', reward: 250 },
  { name: 'ZenMaster', date: '10/05/2025', status: 'completed', reward: 150 },
  { name: 'FlashLight', date: '09/05/2025', status: 'completed', reward: 75 },
  { name: 'SpeedRun', date: '08/05/2025', status: 'completed', reward: 100 },
  { name: 'QuickShot', date: '07/05/2025', status: 'completed', reward: 50 },
  { name: 'FastTrack', date: '06/05/2025', status: 'completed', reward: 75 },
  { name: 'RapidFire', date: '05/05/2025', status: 'completed', reward: 100 },
  { name: 'SwiftArrow', date: '04/05/2025', status: 'completed', reward: 50 },
  { name: 'BlitzKrieg', date: '03/05/2025', status: 'completed', reward: 75 },
  { name: 'RushHour', date: '02/05/2025', status: 'completed', reward: 100 },
  { name: 'DashBoard', date: '01/05/2025', status: 'completed', reward: 50 },
  
  // Avril 2025 - 4100€ total
  { name: 'PhiRaven', date: '30/04/2025', status: 'completed', reward: 50 },
  { name: 'TauPanther', date: '29/04/2025', status: 'completed', reward: 75 },
  { name: 'RhoCobra', date: '28/04/2025', status: 'completed', reward: 100 },
  { name: 'XiShark', date: '27/04/2025', status: 'completed', reward: 50 },
  { name: 'NuFalcon', date: '26/04/2025', status: 'completed', reward: 75 },
  { name: 'MuDragon', date: '25/04/2025', status: 'completed', reward: 100 },
  { name: 'LambdaViper', date: '24/04/2025', status: 'completed', reward: 50 },
  { name: 'KappaEagle', date: '23/04/2025', status: 'completed', reward: 75 },
  { name: 'SigmaHawk', date: '22/04/2025', status: 'completed', reward: 100 },
  { name: 'OmegaTiger', date: '21/04/2025', status: 'completed', reward: 50 },
  { name: 'ThetaLion', date: '20/04/2025', status: 'completed', reward: 75 },
  { name: 'ZetaPhoenix', date: '19/04/2025', status: 'completed', reward: 100 },
  { name: 'EpsilonBlade', date: '18/04/2025', status: 'completed', reward: 50 },
  { name: 'DeltaStrike', date: '17/04/2025', status: 'completed', reward: 75 },
  { name: 'GammaForce', date: '16/04/2025', status: 'completed', reward: 100 },
  { name: 'BetaRanger', date: '15/04/2025', status: 'completed', reward: 50 },
  { name: 'AlphaWolf', date: '14/04/2025', status: 'completed', reward: 75 },
  { name: 'OmegaEnd', date: '13/04/2025', status: 'completed', reward: 100 },
  { name: 'AlphaStart', date: '12/04/2025', status: 'completed', reward: 50 },
  { name: 'BetaTest', date: '11/04/2025', status: 'completed', reward: 75 },
  { name: 'GammaBurst', date: '10/04/2025', status: 'completed', reward: 100 },
  { name: 'DeltaWave', date: '09/04/2025', status: 'completed', reward: 50 },
  { name: 'EpsilonCore', date: '08/04/2025', status: 'completed', reward: 75 },
  { name: 'ZetaField', date: '07/04/2025', status: 'completed', reward: 100 },
  { name: 'ThetaRay', date: '06/04/2025', status: 'completed', reward: 50 },
  { name: 'IotaBeam', date: '05/04/2025', status: 'completed', reward: 75 },
  { name: 'KappaFlux', date: '04/04/2025', status: 'completed', reward: 100 },
  { name: 'LambdaCrux', date: '03/04/2025', status: 'completed', reward: 50 },
  { name: 'MuPulse', date: '02/04/2025', status: 'completed', reward: 75 },
  { name: 'NuWave', date: '01/04/2025', status: 'completed', reward: 100 },
  
  // Mars 2025 - 4850€ total
  { name: 'QuantumShark', date: '31/03/2025', status: 'completed', reward: 50 },
  { name: 'NanoStorm', date: '30/03/2025', status: 'completed', reward: 75 },
  { name: 'ElectroWolf', date: '29/03/2025', status: 'completed', reward: 100 },
  { name: 'BinaryBlade', date: '28/03/2025', status: 'completed', reward: 50 },
  { name: 'VirtualKnight', date: '27/03/2025', status: 'completed', reward: 75 },
  { name: 'DigitalDragon', date: '26/03/2025', status: 'completed', reward: 100 },
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
  
  // Février 2025 - 3500€ total
  { name: 'VoidLord', date: '28/02/2025', status: 'completed', reward: 100 },
  { name: 'SolarWind', date: '27/02/2025', status: 'completed', reward: 75 },
  { name: 'NebulaKing', date: '26/02/2025', status: 'completed', reward: 50 },
  { name: 'GalaxyWolf', date: '25/02/2025', status: 'completed', reward: 100 },
  { name: 'StarViper', date: '24/02/2025', status: 'completed', reward: 75 },
  { name: 'CosmicBeast', date: '23/02/2025', status: 'completed', reward: 50 },
  { name: 'AstroNinja', date: '22/02/2025', status: 'completed', reward: 100 },
  { name: 'MeteorStrike', date: '21/02/2025', status: 'completed', reward: 75 },
  { name: 'BlackHole', date: '20/02/2025', status: 'completed', reward: 50 },
  { name: 'SolarFlare', date: '19/02/2025', status: 'completed', reward: 100 },
  { name: 'NebulaCrush', date: '18/02/2025', status: 'completed', reward: 75 },
  { name: 'QuantumLeap', date: '17/02/2025', status: 'completed', reward: 50 },
  { name: 'PlasmaStorm', date: '16/02/2025', status: 'completed', reward: 100 },
  { name: 'TitanSlayer', date: '15/02/2025', status: 'completed', reward: 75 },
  { name: 'StarBurst', date: '14/02/2025', status: 'completed', reward: 50 },
  { name: 'GalaxyBoom', date: '13/02/2025', status: 'completed', reward: 100 },
  { name: 'CosmicFlash', date: '12/02/2025', status: 'completed', reward: 75 },
  { name: 'SolarBlast', date: '11/02/2025', status: 'completed', reward: 50 },
  { name: 'NebulaFlare', date: '10/02/2025', status: 'completed', reward: 100 },
  { name: 'StarPulse', date: '09/02/2025', status: 'completed', reward: 75 },
  { name: 'VoidPulse', date: '08/02/2025', status: 'completed', reward: 50 },
  { name: 'SpaceBlast', date: '07/02/2025', status: 'completed', reward: 100 },
  { name: 'CosmicWave', date: '06/02/2025', status: 'completed', reward: 75 },
  { name: 'StellarWave', date: '05/02/2025', status: 'completed', reward: 50 },
  { name: 'GalacticWave', date: '04/02/2025', status: 'completed', reward: 100 },
  { name: 'UniversalWave', date: '03/02/2025', status: 'completed', reward: 75 },
  { name: 'InfiniteWave', date: '02/02/2025', status: 'completed', reward: 50 },
  { name: 'EternalWave', date: '01/02/2025', status: 'completed', reward: 100 },
  
  // Janvier 2025 - 1200€ total
  { name: 'NightWalker', date: '31/01/2025', status: 'completed', reward: 50 },
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
  
  // Décembre 2024 - 750€ total
  { name: 'LightBringer', date: '31/12/2024', status: 'completed', reward: 75 },
  { name: 'FrostWolf', date: '30/12/2024', status: 'completed', reward: 100 },
  { name: 'FireDragon', date: '29/12/2024', status: 'completed', reward: 50 },
  { name: 'IceWinter', date: '28/12/2024', status: 'completed', reward: 75 },
  { name: 'SnowStorm', date: '27/12/2024', status: 'completed', reward: 100 },
  { name: 'FrostBite', date: '26/12/2024', status: 'completed', reward: 50 },
  { name: 'IceCrack', date: '25/12/2024', status: 'completed', reward: 75 },
  { name: 'ColdSnap', date: '24/12/2024', status: 'completed', reward: 100 },
  { name: 'FreezeFrame', date: '23/12/2024', status: 'completed', reward: 50 },
  { name: 'ChillOut', date: '22/12/2024', status: 'completed', reward: 75 },
  { name: 'CoolDown', date: '21/12/2024', status: 'completed', reward: 100 },
  
  // Novembre 2024 - 900€ total
  { name: 'MysticShadow', date: '30/11/2024', status: 'completed', reward: 100 },
  { name: 'StormRider', date: '29/11/2024', status: 'completed', reward: 75 },
  { name: 'IcePhoenix', date: '28/11/2024', status: 'completed', reward: 50 },
  { name: 'GoldenEagle', date: '27/11/2024', status: 'completed', reward: 100 },
  { name: 'SilverHawk', date: '26/11/2024', status: 'completed', reward: 75 },
  { name: 'BronzeLion', date: '25/11/2024', status: 'completed', reward: 50 },
  { name: 'IronWolf', date: '24/11/2024', status: 'completed', reward: 100 },
  { name: 'CopperFox', date: '23/11/2024', status: 'completed', reward: 75 },
  { name: 'TinMan', date: '22/11/2024', status: 'completed', reward: 50 },
  { name: 'SteelBeam', date: '21/11/2024', status: 'completed', reward: 100 },
  { name: 'MetalGear', date: '20/11/2024', status: 'completed', reward: 75 },
  { name: 'RockSolid', date: '19/11/2024', status: 'completed', reward: 50 },
  { name: 'StoneWall', date: '18/11/2024', status: 'completed', reward: 100 },
  { name: 'BrickHouse', date: '17/11/2024', status: 'completed', reward: 75 },
  { name: 'ConcreteDream', date: '16/11/2024', status: 'completed', reward: 50 },
  
  // Octobre 2024 - 350€ total
  { name: 'SilverFox99', date: '31/10/2024', status: 'completed', reward: 50 },
  { name: 'CrimsonBlade', date: '30/10/2024', status: 'completed', reward: 75 },
  { name: 'RedRose', date: '29/10/2024', status: 'completed', reward: 100 },
  { name: 'BlueSkies', date: '28/10/2024', status: 'completed', reward: 50 },
  { name: 'GreenField', date: '27/10/2024', status: 'completed', reward: 75 },
  
  // Septembre 2024
  { name: 'DarkKnight', date: '30/09/2024', status: 'completed', reward: 50 },
  { name: 'LightBearer', date: '29/09/2024', status: 'completed', reward: 75 },
  { name: 'EarthShaker', date: '28/09/2024', status: 'completed', reward: 100 },
  { name: 'WindWalker', date: '27/09/2024', status: 'completed', reward: 50 },
  { name: 'FireMage', date: '26/09/2024', status: 'completed', reward: 75 },
  { name: 'IceWarden', date: '25/09/2024', status: 'completed', reward: 100 },
  { name: 'ShadowHunter', date: '24/09/2024', status: 'completed', reward: 50 },
  { name: 'PhoenixRider', date: '23/09/2024', status: 'completed', reward: 75 },
  { name: 'StormChaser', date: '22/09/2024', status: 'completed', reward: 100 },
  { name: 'DragonSlayer', date: '21/09/2024', status: 'completed', reward: 50 }
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