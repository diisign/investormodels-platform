
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
    creatorName: 'Brook Mills',
    creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg',
    planName: 'Growth',
    amount: 3748,
    initial: 500,
    returnRate: 749.6,
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  // Retraits mensuels d'août 2024 à mai 2025
  {
    id: 'trans-withdrawal-mai-2025',
    type: 'withdrawal',
    amount: 5100,
    date: '2025-05-15',
    status: 'completed',
    description: 'Retrait mensuel - Mai 2025'
  },
  {
    id: 'trans-withdrawal-avril-2025',
    type: 'withdrawal',
    amount: 4950,
    date: '2025-04-15',
    status: 'completed',
    description: 'Retrait mensuel - Avril 2025'
  },
  {
    id: 'trans-withdrawal-mars-2025',
    type: 'withdrawal',
    amount: 5200,
    date: '2025-03-15',
    status: 'completed',
    description: 'Retrait mensuel - Mars 2025'
  },
  {
    id: 'trans-withdrawal-fevrier-2025',
    type: 'withdrawal',
    amount: 4850,
    date: '2025-02-15',
    status: 'completed',
    description: 'Retrait mensuel - Février 2025'
  },
  {
    id: 'trans-withdrawal-janvier-2025',
    type: 'withdrawal',
    amount: 5050,
    date: '2025-01-15',
    status: 'completed',
    description: 'Retrait mensuel - Janvier 2025'
  },
  {
    id: 'trans-withdrawal-decembre-2024',
    type: 'withdrawal',
    amount: 4900,
    date: '2024-12-15',
    status: 'completed',
    description: 'Retrait mensuel - Décembre 2024'
  },
  {
    id: 'trans-withdrawal-novembre-2024',
    type: 'withdrawal',
    amount: 5150,
    date: '2024-11-15',
    status: 'completed',
    description: 'Retrait mensuel - Novembre 2024'
  },
  {
    id: 'trans-withdrawal-octobre-2024',
    type: 'withdrawal',
    amount: 4800,
    date: '2024-10-15',
    status: 'completed',
    description: 'Retrait mensuel - Octobre 2024'
  },
  {
    id: 'trans-withdrawal-septembre-2024',
    type: 'withdrawal',
    amount: 5000,
    date: '2024-09-15',
    status: 'completed',
    description: 'Retrait mensuel - Septembre 2024'
  },
  {
    id: 'trans-withdrawal-aout-2024',
    type: 'withdrawal',
    amount: 4950,
    date: '2024-08-15',
    status: 'completed',
    description: 'Retrait mensuel - Août 2024'
  },
  {
    id: 'trans-investment-500',
    type: 'investment',
    amount: -500,
    date: '2024-10-06',
    status: 'completed',
    description: 'Investissement - Brook Mills'
  },
  {
    id: 'trans-deposit-500',
    type: 'deposit',
    amount: 500,
    date: '2024-10-06',
    status: 'completed',
    description: 'Dépôt initial'
  }
];

const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Août', value: 0 },
  { month: 'Sept', value: 0 },
  { month: 'Oct', value: 500 },
  { month: 'Nov', value: 715 },
  { month: 'Déc', value: 930 },
  { month: 'Jan', value: 1145 },
  { month: 'Fév', value: 1637 },
  { month: 'Mars', value: 2129 },
  { month: 'Avr', value: 2621 },
  { month: 'Mai', value: 3748 }
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
