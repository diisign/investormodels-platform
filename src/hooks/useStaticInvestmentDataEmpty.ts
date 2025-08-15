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
  duration_months: number;
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

// Données complètement vides pour le dashboard de test
const EMPTY_INVESTMENTS: StaticInvestment[] = [];

const EMPTY_TRANSACTIONS: StaticTransaction[] = [];

const EMPTY_PERFORMANCE_DATA: StaticPerformanceData[] = [
  { month: 'Août', value: 0 },
  { month: 'Sept', value: 0 },
  { month: 'Oct', value: 0 },
  { month: 'Nov', value: 0 },
  { month: 'Déc', value: 0 },
  { month: 'Jan', value: 0 },
  { month: 'Fév', value: 0 },
  { month: 'Mars', value: 0 },
  { month: 'Avr', value: 0 },
  { month: 'Mai', value: 0 },
  { month: 'Juin', value: 0 }
];

export const useStaticInvestmentDataEmpty = (): StaticInvestmentData => {
  return useMemo(() => {
    const totalInvested = 0;
    const totalEarnings = 0;
    const balance = 0;
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 0,
      investments: EMPTY_INVESTMENTS,
      transactions: EMPTY_TRANSACTIONS,
      performanceData: EMPTY_PERFORMANCE_DATA
    };
  }, []);
};