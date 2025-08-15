import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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

export const useStaticInvestmentDataEmpty = (): StaticInvestmentData => {
  const { t } = useTranslation();
  
  return useMemo(() => {
    const EMPTY_PERFORMANCE_DATA: StaticPerformanceData[] = [
      { month: t('dashboard.months.aug'), value: 0 },
      { month: t('dashboard.months.sep'), value: 0 },
      { month: t('dashboard.months.oct'), value: 0 },
      { month: t('dashboard.months.nov'), value: 0 },
      { month: t('dashboard.months.dec'), value: 0 },
      { month: t('dashboard.months.jan'), value: 0 },
      { month: t('dashboard.months.feb'), value: 0 },
      { month: t('dashboard.months.mar'), value: 0 },
      { month: t('dashboard.months.apr'), value: 0 },
      { month: t('dashboard.months.may'), value: 0 },
      { month: t('dashboard.months.jun'), value: 0 }
    ];
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
  }, [t]);
};