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
  // Août 2024 - semaine 1 (01-07/08) - environ 8000€
  { name: 'Marie L.', date: '01/08/2024', status: 'completed', reward: 800 },
  { name: 'Paul D.', date: '02/08/2024', status: 'completed', reward: 750 },
  { name: 'Emma R.', date: '03/08/2024', status: 'completed', reward: 900 },
  { name: 'Lucas M.', date: '04/08/2024', status: 'completed', reward: 850 },
  { name: 'Sophie B.', date: '05/08/2024', status: 'completed', reward: 700 },
  { name: 'Thomas G.', date: '06/08/2024', status: 'completed', reward: 650 },
  { name: 'Julie H.', date: '07/08/2024', status: 'completed', reward: 950 },
  { name: 'Antoine K.', date: '07/08/2024', status: 'completed', reward: 800 },
  { name: 'Camille F.', date: '07/08/2024', status: 'completed', reward: 750 },
  { name: 'Nicolas P.', date: '07/08/2024', status: 'completed', reward: 850 },
  
  // Août 2024 - semaine 2 (08-14/08)
  { name: 'Laura N.', date: '08/08/2024', status: 'completed', reward: 900 },
  { name: 'Hugo S.', date: '09/08/2024', status: 'completed', reward: 850 },
  { name: 'Anaïs W.', date: '10/08/2024', status: 'completed', reward: 700 },
  { name: 'Julien C.', date: '11/08/2024', status: 'completed', reward: 650 },
  { name: 'Marie H.', date: '12/08/2024', status: 'completed', reward: 750 },
  { name: 'Paul G.', date: '13/08/2024', status: 'completed', reward: 800 },
  { name: 'Claire N.', date: '14/08/2024', status: 'completed', reward: 900 },
  { name: 'Lucas J.', date: '14/08/2024', status: 'completed', reward: 750 },
  { name: 'Océane V.', date: '15/08/2024', status: 'completed', reward: 850 },
  { name: 'Romain L.', date: '16/08/2024', status: 'completed', reward: 700 },
  
  // Septembre 2024 - environ 8000€ (4 semaines)
  { name: 'Léa M.', date: '01/09/2024', status: 'completed', reward: 900 },
  { name: 'Kevin R.', date: '02/09/2024', status: 'completed', reward: 850 },
  { name: 'Manon D.', date: '03/09/2024', status: 'completed', reward: 700 },
  { name: 'Florian B.', date: '04/09/2024', status: 'completed', reward: 750 },
  { name: 'Chloé T.', date: '05/09/2024', status: 'completed', reward: 800 },
  { name: 'Alexandre S.', date: '06/09/2024', status: 'completed', reward: 650 },
  { name: 'Inès F.', date: '07/09/2024', status: 'completed', reward: 900 },
  { name: 'Bastien K.', date: '08/09/2024', status: 'completed', reward: 750 },
  { name: 'Margaux H.', date: '09/09/2024', status: 'completed', reward: 850 },
  { name: 'Quentin P.', date: '10/09/2024', status: 'completed', reward: 700 },
  { name: 'Elise C.', date: '11/09/2024', status: 'completed', reward: 800 },
  { name: 'Mathieu W.', date: '12/09/2024', status: 'completed', reward: 650 },
  { name: 'Amélie N.', date: '13/09/2024', status: 'completed', reward: 900 },
  { name: 'Valentin G.', date: '14/09/2024', status: 'completed', reward: 750 },
  { name: 'Justine L.', date: '15/09/2024', status: 'completed', reward: 850 },
  { name: 'Corentin M.', date: '16/09/2024', status: 'completed', reward: 700 },
  { name: 'Alicia R.', date: '17/09/2024', status: 'completed', reward: 800 },
  { name: 'Morgan D.', date: '18/09/2024', status: 'completed', reward: 650 },
  { name: 'Noémie B.', date: '19/09/2024', status: 'completed', reward: 900 },
  { name: 'Axel T.', date: '20/09/2024', status: 'completed', reward: 750 },
  
  // Octobre 2024 - 350€ total
  { name: 'Céline M.', date: '01/10/2024', status: 'completed', reward: 350 },
  
  // Novembre 2024 - 900€ total
  { name: 'Dylan R.', date: '01/11/2024', status: 'completed', reward: 450 },
  { name: 'Sarah K.', date: '15/11/2024', status: 'completed', reward: 450 },
  
  // Décembre 2024 - 750€ total
  { name: 'Théo L.', date: '05/12/2024', status: 'completed', reward: 250 },
  { name: 'Lisa P.', date: '15/12/2024', status: 'completed', reward: 300 },
  { name: 'Gabriel F.', date: '25/12/2024', status: 'completed', reward: 200 },
  
  // Janvier 2025 - 1200€ total
  { name: 'Jade B.', date: '03/01/2025', status: 'completed', reward: 400 },
  { name: 'Victor S.', date: '12/01/2025', status: 'completed', reward: 350 },
  { name: 'Emma T.', date: '20/01/2025', status: 'completed', reward: 450 },
  
  // Février 2025 - 3500€ total
  { name: 'Lucas D.', date: '02/02/2025', status: 'completed', reward: 800 },
  { name: 'Marie L.', date: '08/02/2025', status: 'completed', reward: 650 },
  { name: 'Paul D.', date: '15/02/2025', status: 'completed', reward: 750 },
  { name: 'Emma R.', date: '20/02/2025', status: 'completed', reward: 600 },
  { name: 'Lucas M.', date: '25/02/2025', status: 'completed', reward: 700 },
  
  // Mars 2025 - 4850€ total
  { name: 'Sophie B.', date: '03/03/2025', status: 'completed', reward: 950 },
  { name: 'Thomas G.', date: '08/03/2025', status: 'completed', reward: 800 },
  { name: 'Julie H.', date: '12/03/2025', status: 'completed', reward: 900 },
  { name: 'Antoine K.', date: '18/03/2025', status: 'completed', reward: 850 },
  { name: 'Camille F.', date: '22/03/2025', status: 'completed', reward: 750 },
  { name: 'Nicolas P.', date: '28/03/2025', status: 'completed', reward: 600 },
  
  // Avril 2025 - 4100€ total
  { name: 'Laura N.', date: '02/04/2025', status: 'completed', reward: 700 },
  { name: 'Hugo S.', date: '07/04/2025', status: 'completed', reward: 650 },
  { name: 'Anaïs W.', date: '12/04/2025', status: 'completed', reward: 800 },
  { name: 'Julien C.', date: '18/04/2025', status: 'completed', reward: 750 },
  { name: 'Marie H.', date: '23/04/2025', status: 'completed', reward: 600 },
  { name: 'Paul G.', date: '28/04/2025', status: 'completed', reward: 600 },
  
  // Mai 2025 - 5150€ total
  { name: 'Claire N.', date: '03/05/2025', status: 'completed', reward: 850 },
  { name: 'Lucas J.', date: '08/05/2025', status: 'completed', reward: 900 },
  { name: 'Océane V.', date: '13/05/2025', status: 'completed', reward: 800 },
  { name: 'Romain L.', date: '18/05/2025', status: 'completed', reward: 750 },
  { name: 'Léa M.', date: '23/05/2025', status: 'completed', reward: 950 },
  { name: 'Kevin R.', date: '28/05/2025', status: 'completed', reward: 900 },
  
  // Juin 2025 - 5800€ total
  { name: 'Manon D.', date: '02/06/2025', status: 'completed', reward: 1000 },
  { name: 'Florian B.', date: '07/06/2025', status: 'completed', reward: 950 },
  { name: 'Chloé T.', date: '12/06/2025', status: 'completed', reward: 900 },
  { name: 'Alexandre S.', date: '17/06/2025', status: 'completed', reward: 850 },
  { name: 'Inès F.', date: '22/06/2025', status: 'completed', reward: 1000 },
  { name: 'Bastien K.', date: '27/06/2025', status: 'completed', reward: 1100 }
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