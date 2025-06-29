
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
  {
    id: 'trans-withdrawal-2500',
    type: 'withdrawal',
    amount: 2500,
    date: '2025-05-23',
    status: 'completed',
    description: 'Retrait de bénéfices'
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
  { month: 'Aug 24', value: 0 },
  { month: 'Sep 24', value: 0 },
  { month: 'Oct 24', value: 500 },
  { month: 'Nov 24', value: 715 },
  { month: 'Dec 24', value: 930 },
  { month: 'Jan 25', value: 1145 },
  { month: 'Feb 25', value: 1637 },
  { month: 'Mar 25', value: 2129 },
  { month: 'Apr 25', value: 2621 },
  { month: 'May 25', value: 3748 }
];

export const useStaticInvestmentData = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 500;
    const totalEarnings = 3248;
    const balance = 3748 + 6250; // Current value + referral earnings
    
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
