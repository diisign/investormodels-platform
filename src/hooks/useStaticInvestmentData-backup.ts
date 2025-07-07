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
    amount: 5289, // Updated to show 5289€
    initial: 1000,
    returnRate: 428.9, // Updated to show +428.9%
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  // Retraits spécifiques
  {
    id: 'trans-withdrawal-juillet-2025',
    type: 'withdrawal',
    amount: -10150,
    date: '2025-07-03',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-juin-2025',
    type: 'withdrawal',
    amount: -6850,
    date: '2025-06-05',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-mai-2025',
    type: 'withdrawal',
    amount: -6000,
    date: '2025-05-04',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-avril-2025',
    type: 'withdrawal',
    amount: -3000,
    date: '2025-04-05',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-mars-2025',
    type: 'withdrawal',
    amount: -3000,
    date: '2025-03-05',
    status: 'completed',
    description: 'Retrait'
  },
  {
    id: 'trans-withdrawal-fevrier-2025',
    type: 'withdrawal',
    amount: -3500,
    date: '2025-02-03',
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
  { month: 'Déc', value: 1000, withdrawal: 1700 },
  { month: 'Jan', value: 1320, withdrawal: 2900 },
  { month: 'Fév', value: 1742, withdrawal: 2700 },
  { month: 'Mars', value: 2300, withdrawal: 3250 },
  { month: 'Avr', value: 3036, withdrawal: 6000 },
  { month: 'Mai', value: 4007, withdrawal: 6850 },
  { month: 'Juin', value: 5289, withdrawal: 9100 }
];

export const useStaticInvestmentDataBackup = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 1000;
    const totalEarnings = 36789; // Total current value minus initial investment
    const balance = 0; // Updated balance to 0€
    
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