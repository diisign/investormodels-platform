
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
    status: 'active',
    duration_months: 3
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

export const useStaticInvestmentData = (): StaticInvestmentData => {
  const { t } = useTranslation();
  
  return useMemo(() => {
    const STATIC_PERFORMANCE_DATA: StaticPerformanceData[] = [
      { month: t('dashboard.months.aug'), value: 0 },
      { month: t('dashboard.months.sep'), value: 500, withdrawal: 0 },
      { month: t('dashboard.months.oct'), value: 660, withdrawal: 350 },
      { month: t('dashboard.months.nov'), value: 871, withdrawal: 900 },
      { month: t('dashboard.months.dec'), value: 1150, withdrawal: 750 },
      { month: t('dashboard.months.jan'), value: 1518, withdrawal: 1200 },
      { month: t('dashboard.months.feb'), value: 2003, withdrawal: 3500 },
      { month: t('dashboard.months.mar'), value: 2645, withdrawal: 4850 },
      { month: t('dashboard.months.apr'), value: 3491, withdrawal: 4100 },
      { month: t('dashboard.months.may'), value: 4608, withdrawal: 5150 },
      { month: t('dashboard.months.jun'), value: 6083, withdrawal: 5800 }
    ];

    const totalInvested = 500;
    const totalEarnings = 32183; // Updated total earnings based on new investment values
    const balance = 13183; // Updated balance to 13183€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 1116.6, // Updated percentage return
      investments: STATIC_INVESTMENTS,
      transactions: STATIC_TRANSACTIONS,
      performanceData: STATIC_PERFORMANCE_DATA
    };
  }, [t]);
};
