
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

// Données statiques simplifiées - 1 investissement seulement
const STATIC_INVESTMENTS: StaticInvestment[] = [
  {
    id: '1',
    creatorName: 'Brook Mills',
    creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg',
    planName: 'Growth',
    amount: 100,
    initial: 100,
    returnRate: 0,
    status: 'active'
  }
];

const STATIC_TRANSACTIONS: StaticTransaction[] = [
  {
    id: 'trans-deposit-100',
    type: 'deposit',
    amount: 100,
    date: '01/06/2025',
    status: 'completed',
    description: 'Dépôt initial'
  },
  {
    id: 'trans-investment-100',
    type: 'investment',
    amount: -100,
    date: '01/06/2025',
    status: 'completed',
    description: 'Investissement - Brook Mills'
  }
];

const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Jun 25', value: 325 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 100;
    const totalEarnings = 0;
    const balance = 325;
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 0,
      investments: STATIC_INVESTMENTS,
      transactions: STATIC_TRANSACTIONS,
      performanceData: STATIC_PERFORMANCE_DATA
    };
  }, []);
};
