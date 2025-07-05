
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
    creatorImage: '/lovable-uploads/b8d20d29-9dc0-4a07-988f-3812814c2bde.png',
    planName: 'Growth',
    amount: 3748,
    initial: 500,
    returnRate: 749.6,
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  // Retraits mensuels de septembre 2024 à juin 2025 (gains de parrainage)
  {
    id: 'trans-referral-juin-2025',
    type: 'withdrawal',
    amount: 12000,
    date: '2025-06-15',
    status: 'completed',
    description: 'Gains parrainage - Juin 2025'
  },
  {
    id: 'trans-referral-mai-2025',
    type: 'withdrawal',
    amount: 10800,
    date: '2025-05-15',
    status: 'completed',
    description: 'Gains parrainage - Mai 2025'
  },
  {
    id: 'trans-referral-avril-2025',
    type: 'withdrawal',
    amount: 8600,
    date: '2025-04-15',
    status: 'completed',
    description: 'Gains parrainage - Avril 2025'
  },
  {
    id: 'trans-referral-mars-2025',
    type: 'withdrawal',
    amount: 11200,
    date: '2025-03-15',
    status: 'completed',
    description: 'Gains parrainage - Mars 2025'
  },
  {
    id: 'trans-referral-fevrier-2025',
    type: 'withdrawal',
    amount: 9400,
    date: '2025-02-15',
    status: 'completed',
    description: 'Gains parrainage - Février 2025'
  },
  {
    id: 'trans-referral-janvier-2025',
    type: 'withdrawal',
    amount: 6900,
    date: '2025-01-15',
    status: 'completed',
    description: 'Gains parrainage - Janvier 2025'
  },
  {
    id: 'trans-referral-decembre-2024',
    type: 'withdrawal',
    amount: 8800,
    date: '2024-12-15',
    status: 'completed',
    description: 'Gains parrainage - Décembre 2024'
  },
  {
    id: 'trans-referral-novembre-2024',
    type: 'withdrawal',
    amount: 7200,
    date: '2024-11-15',
    status: 'completed',
    description: 'Gains parrainage - Novembre 2024'
  },
  {
    id: 'trans-referral-octobre-2024',
    type: 'withdrawal',
    amount: 5500,
    date: '2024-10-15',
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
  { month: 'Oct', value: 715, withdrawal: 5500 },
  { month: 'Nov', value: 930, withdrawal: 7200 },
  { month: 'Déc', value: 1145, withdrawal: 8800 },
  { month: 'Jan', value: 1637, withdrawal: 6900 },
  { month: 'Fév', value: 2129, withdrawal: 9400 },
  { month: 'Mars', value: 2621, withdrawal: 11200 },
  { month: 'Avr', value: 3100, withdrawal: 8600 },
  { month: 'Mai', value: 3500, withdrawal: 10800 },
  { month: 'Juin', value: 3748, withdrawal: 12000 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 500;
    const totalEarnings = 3248;
    const balance = 9898; // Updated balance to 9898€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 749.6,
      investments: STATIC_INVESTMENTS,
      transactions: STATIC_TRANSACTIONS,
      performanceData: STATIC_PERFORMANCE_DATA
    };
  }, []);
};
