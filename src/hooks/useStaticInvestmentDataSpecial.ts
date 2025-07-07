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
    amount: 5290, // Valeur actuelle avec bénéfices ajustée
    initial: 1000, // Investissement initial de 1000€ en décembre
    returnRate: 429, // Nouveau taux de retour ajusté
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
  { month: 'Août', value: 0, withdrawal: 0 },
  { month: 'Sept', value: 0, withdrawal: 0 },
  { month: 'Oct', value: 0, withdrawal: 0 },
  { month: 'Nov', value: 0, withdrawal: 0 },
  { month: 'Déc', value: 1000, withdrawal: 1700 },
  { month: 'Jan', value: 1320, withdrawal: 2900 },
  { month: 'Fév', value: 1742, withdrawal: 2700 },
  { month: 'Mars', value: 2300, withdrawal: 3250 },
  { month: 'Avr', value: 3036, withdrawal: 6000 },
  { month: 'Mai', value: 4007, withdrawal: 6850 },
  { month: 'Juin', value: 5290, withdrawal: 9100 }
];

export const useStaticInvestmentDataSpecial = (): StaticInvestmentDataSpecial => {
  return useMemo(() => {
    const totalInvested = 1000;
    const totalEarnings = 26600; // Changé à 26 600€
    const balance = 0; // Solde à 0€
    
    return {
      balance,
      totalInvested,
      totalEarnings,
      totalPercentageReturn: 1255,
      investments: STATIC_INVESTMENTS_SPECIAL,
      transactions: STATIC_TRANSACTIONS_SPECIAL,
      performanceData: STATIC_PERFORMANCE_DATA_SPECIAL
    };
  }, []);
};