
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
  // Nouveau retrait ajouté
  {
    id: 'trans-withdrawal-juillet-2025-2',
    type: 'withdrawal',
    amount: -10000,
    date: '2025-07-06',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-juin-2025',
    type: 'withdrawal',
    amount: -6000,
    date: '2025-06-05',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-mars-2025',
    type: 'withdrawal',
    amount: -3000,
    date: '2025-03-03',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-investment-500',
    type: 'investment',
    amount: -500,
    date: '2024-09-10',
    status: 'completed',
    description: 'Investissement - Brooks Mills 🍒'
  },
  {
    id: 'trans-deposit-500',
    type: 'deposit',
    amount: 500,
    date: '2024-09-10',
    status: 'completed',
    description: 'Dépôt initial'
  }
];

const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Sept', value: 500, withdrawal: 0 },
  { month: 'Oct', value: 660, withdrawal: 350 },
  { month: 'Nov', value: 871, withdrawal: 900 },
  { month: 'Déc', value: 1150, withdrawal: 750 },
  { month: 'Jan', value: 1518, withdrawal: 1200 },
  { month: 'Fév', value: 2003, withdrawal: 3500 },
  { month: 'Mars', value: 2645, withdrawal: 4850 },
  { month: 'Avr', value: 3491, withdrawal: 4100 },
  { month: 'Mai', value: 4608, withdrawal: 5150 },
  { month: 'Juin', value: 6083, withdrawal: 5800 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 500;
    const totalEarnings = 32183; // Updated total earnings based on new investment values
    const balance = 24773; // Updated balance to 24773€
    
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
