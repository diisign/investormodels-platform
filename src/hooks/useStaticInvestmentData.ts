
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
    amount: 12166, // Updated to match June 2025 value with 1000€ initial
    initial: 1000,
    returnRate: 1116.6, // Updated return rate based on new total
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  // Retraits spécifiques
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
    id: 'trans-investment-1000',
    type: 'investment',
    amount: -1000,
    date: '2024-12-15',
    status: 'completed',
    description: 'Investissement - Brooks Mills 🍒'
  },
  {
    id: 'trans-deposit-1000',
    type: 'deposit',
    amount: 1000,
    date: '2024-12-15',
    status: 'completed',
    description: 'Dépôt initial'
  }
];

const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Sept', value: 0, withdrawal: 0 },
  { month: 'Oct', value: 0, withdrawal: 0 },
  { month: 'Nov', value: 0, withdrawal: 0 },
  { month: 'Déc', value: 1000, withdrawal: 750 },
  { month: 'Jan', value: 1320, withdrawal: 1200 },
  { month: 'Fév', value: 1742, withdrawal: 3500 },
  { month: 'Mars', value: 2300, withdrawal: 4850 },
  { month: 'Avr', value: 3036, withdrawal: 4100 },
  { month: 'Mai', value: 4007, withdrawal: 5150 },
  { month: 'Juin', value: 5289, withdrawal: 5800 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 1000;
    const totalEarnings = 4289; // Total current value minus initial investment
    const balance = 24773; // Updated balance to 24773€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 428.9, // (4289/1000)*100
      investments: STATIC_INVESTMENTS,
      transactions: STATIC_TRANSACTIONS,
      performanceData: STATIC_PERFORMANCE_DATA
    };
  }, []);
};
