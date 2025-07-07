import { useMemo } from 'react';

export interface StaticInvestmentSpecial {
  id: string;
  creatorName: string;
  creatorImage: string;
  planName: string;
  amount: number;
  initial: number;
  returnRate: number;
  status: string;
}

export interface StaticTransactionSpecial {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface StaticPerformanceDataSpecial {
  month: string;
  value: number;
  withdrawal?: number;
}

export interface StaticInvestmentDataSpecial {
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  totalPercentageReturn: number;
  investments: StaticInvestmentSpecial[];
  transactions: StaticTransactionSpecial[];
  performanceData: StaticPerformanceDataSpecial[];
}

// Données statiques persistantes
const STATIC_INVESTMENTS_SPECIAL: StaticInvestmentSpecial[] = [
  {
    id: '1',
    creatorName: 'Brooks Mills 🍒',
    creatorImage: '/lovable-uploads/e09bb6c4-2388-4ba2-bc33-10429376180d.png',
    planName: 'Growth',
    amount: 37789, // Valeur actuelle avec bénéfices
    initial: 1000, // Investissement initial de 1000€ en décembre
    returnRate: 3678.9, // Nouveau taux de retour
    status: 'active'
  }
];

const STATIC_TRANSACTIONS_SPECIAL: StaticTransactionSpecial[] = [
  // Nouveaux retraits
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
    date: '2024-12-10',
    status: 'completed',
    description: 'Investissement - Brooks Mills 🍒'
  },
  {
    id: 'trans-deposit-1000',
    type: 'deposit',
    amount: 1000,
    date: '2024-12-10',
    status: 'completed',
    description: 'Dépôt initial'
  }
];

const STATIC_PERFORMANCE_DATA_SPECIAL: StaticPerformanceDataSpecial[] = [
  { month: 'Déc', value: 1000, withdrawal: 0 },
  { month: 'Jan', value: 1580, withdrawal: 0 },
  { month: 'Fév', value: 2500, withdrawal: 3500 },
  { month: 'Mars', value: 3950, withdrawal: 3000 },
  { month: 'Avr', value: 6240, withdrawal: 3000 },
  { month: 'Mai', value: 9850, withdrawal: 6000 },
  { month: 'Juin', value: 15570, withdrawal: 6850 },
  { month: 'Juil', value: 24630, withdrawal: 10150 }
];

export const useStaticInvestmentDataSpecial = (): StaticInvestmentDataSpecial => {
  return useMemo(() => {
    const totalInvested = 1000;
    const totalEarnings = 36789; // Nouveau bénéfice
    const balance = 0; // Solde à 0€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 3678.9,
      investments: STATIC_INVESTMENTS_SPECIAL,
      transactions: STATIC_TRANSACTIONS_SPECIAL,
      performanceData: STATIC_PERFORMANCE_DATA_SPECIAL
    };
  }, []);
};