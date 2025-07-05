
import { useMemo } from 'react';

export interface StaticInvestment {
  id: string;
  creatorName: string;
  creatorImage: string;
  planName: string;
  amount: number;
  initial: number;
  returnRate: number;
  status: string;
}

export interface StaticTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface StaticPerformanceData {
  month: string;
  value: number;
  withdrawal?: number;
}

export interface StaticInvestmentData {
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  totalPercentageReturn: number;
  investments: StaticInvestment[];
  transactions: StaticTransaction[];
  performanceData: StaticPerformanceData[];
}

// Données statiques persistantes
const STATIC_INVESTMENTS: StaticInvestment[] = [
  {
    id: '1',
    creatorName: 'Brooks Mills 🍒',
    creatorImage: '/lovable-uploads/e09bb6c4-2388-4ba2-bc33-10429376180d.png',
    planName: 'Growth',
    amount: 6083, // Updated to match June 2025 value
    initial: 500,
    returnRate: 1116.6, // Updated return rate based on new total
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  // Retraits mensuels de septembre 2024 à juin 2025 (gains de parrainage)
  {
    id: 'trans-referral-juin-2025',
    type: 'withdrawal',
    amount: 5750,
    date: '2025-06-01',
    status: 'completed',
    description: 'Gains parrainage - Juin 2025'
  },
  {
    id: 'trans-referral-mai-2025',
    type: 'withdrawal',
    amount: 4650,
    date: '2025-05-01',
    status: 'completed',
    description: 'Gains parrainage - Mai 2025'
  },
  {
    id: 'trans-referral-avril-2025',
    type: 'withdrawal',
    amount: 5250,
    date: '2025-04-01',
    status: 'completed',
    description: 'Gains parrainage - Avril 2025'
  },
  {
    id: 'trans-referral-mars-2025',
    type: 'withdrawal',
    amount: 4750,
    date: '2025-03-01',
    status: 'completed',
    description: 'Gains parrainage - Mars 2025'
  },
  {
    id: 'trans-referral-fevrier-2025',
    type: 'withdrawal',
    amount: 5350,
    date: '2025-02-01',
    status: 'completed',
    description: 'Gains parrainage - Février 2025'
  },
  {
    id: 'trans-referral-janvier-2025',
    type: 'withdrawal',
    amount: 4950,
    date: '2025-01-01',
    status: 'completed',
    description: 'Gains parrainage - Janvier 2025'
  },
  {
    id: 'trans-referral-decembre-2024',
    type: 'withdrawal',
    amount: 5600,
    date: '2024-12-01',
    status: 'completed',
    description: 'Gains parrainage - Décembre 2024'
  },
  {
    id: 'trans-referral-novembre-2024',
    type: 'withdrawal',
    amount: 4850,
    date: '2024-11-01',
    status: 'completed',
    description: 'Gains parrainage - Novembre 2024'
  },
  {
    id: 'trans-referral-octobre-2024',
    type: 'withdrawal',
    amount: 5150,
    date: '2024-10-01',
    status: 'completed',
    description: 'Gains parrainage - Octobre 2024'
  },
  {
    id: 'trans-investment-500',
    type: 'investment',
    amount: -500,
    date: '2024-09-15',
    status: 'completed',
    description: 'Investissement - Brooks Mills 🍒'
  },
  {
    id: 'trans-deposit-500',
    type: 'deposit',
    amount: 500,
    date: '2024-09-15',
    status: 'completed',
    description: 'Dépôt initial'
  }
];

const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Sept', value: 500, withdrawal: 0 },
  { month: 'Oct', value: 660, withdrawal: 5150 },
  { month: 'Nov', value: 871, withdrawal: 4850 },
  { month: 'Déc', value: 1150, withdrawal: 5600 },
  { month: 'Jan', value: 1518, withdrawal: 4950 },
  { month: 'Fév', value: 2003, withdrawal: 5350 },
  { month: 'Mars', value: 2645, withdrawal: 4750 },
  { month: 'Avr', value: 3491, withdrawal: 5250 },
  { month: 'Mai', value: 4608, withdrawal: 4650 },
  { month: 'Juin', value: 6083, withdrawal: 5750 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 500;
    const totalEarnings = 5583; // Updated total earnings based on new investment values
    const balance = 9898; // Updated balance to 9898€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 1116.6, // Updated percentage return
      investments: STATIC_INVESTMENTS,
      transactions: STATIC_TRANSACTIONS,
      performanceData: STATIC_PERFORMANCE_DATA
    };
  }, []);
};
