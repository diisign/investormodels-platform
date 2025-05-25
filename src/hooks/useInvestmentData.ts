
import { useState, useEffect } from 'react';

export interface InvestmentData {
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  investments: Array<{
    id: string;
    creatorName: string;
    creatorImage: string;
    planName: string;
    amount: number;
    initial: number;
    returnRate: number;
    status: string;
  }>;
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    date: string;
    status: string;
    description: string;
  }>;
  performanceData: Array<{
    month: string;
    value: number;
    withdrawal?: number;
  }>;
}

export const useInvestmentData = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    balance: 294.50,
    totalInvested: 300,
    totalEarnings: 244.50,
    investments: [
      {
        id: '1',
        creatorName: 'Emma Wilson',
        creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg',
        planName: 'Growth',
        amount: 156.50,
        initial: 100,
        returnRate: 36.5,
        status: 'active'
      },
      {
        id: '2',
        creatorName: 'Sophia Martinez',
        creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lq/lqy/lqyww860kcjl7vlskjkvhqujrfpks1rr1708457235/373336356/avatar.jpg',
        planName: 'Growth',
        amount: 76.00,
        initial: 100,
        returnRate: 38,
        status: 'active'
      },
      {
        id: '3',
        creatorName: 'Kayla Smith',
        creatorImage: 'https://onlyfinder.com/cdn-cgi/image/width=160,quality=75/https://media.onlyfinder.com/d9/d95cc6ad-2b07-4bd3-a31a-95c00fd31bef/kaylapufff-onlyfans.webp',
        planName: 'Growth',
        amount: 72.00,
        initial: 100,
        returnRate: 36,
        status: 'active'
      }
    ],
    transactions: [
      {
        id: '1',
        type: 'deposit',
        amount: 100,
        date: '10/06/2024',
        status: 'completed',
        description: 'Dépôt initial'
      },
      {
        id: '2',
        type: 'investment',
        amount: -100,
        date: '10/06/2024',
        status: 'completed',
        description: 'Investissement - Emma Wilson'
      },
      {
        id: '3',
        type: 'deposit',
        amount: 200,
        date: '10/10/2024',
        status: 'completed',
        description: 'Dépôt'
      },
      {
        id: '4',
        type: 'investment',
        amount: -100,
        date: '10/10/2024',
        status: 'completed',
        description: 'Investissement - Sophia Martinez'
      },
      {
        id: '5',
        type: 'investment',
        amount: -100,
        date: '10/10/2024',
        status: 'completed',
        description: 'Investissement - Kayla Smith'
      },
      {
        id: '6',
        type: 'withdrawal',
        amount: 250,
        date: '23/01/2025',
        status: 'completed',
        description: 'Retrait de bénéfices'
      }
    ],
    performanceData: [
      { month: 'Fév', value: 100 },
      { month: 'Mar', value: 136.5 },
      { month: 'Avr', value: 173 },
      { month: 'Mai', value: 209.5 },
      { month: 'Jun', value: 246 },
      { month: 'Jul', value: 282.5 },
      { month: 'Aoû', value: 319 },
      { month: 'Sep', value: 355.5 },
      { month: 'Oct', value: 692 },
      { month: 'Nov', value: 802 },
      { month: 'Déc', value: 912 },
      { month: 'Jan', value: 294.5, withdrawal: 250 }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadInvestmentData = async () => {
    setIsLoading(true);
    try {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Ici nous chargerions les vraies données depuis Supabase
      // const { data: investments } = await supabase.from('investments').select('*')
      
      // Pour l'instant, nous gardons les données statiques
    } catch (error) {
      console.error('Erreur lors du chargement des données d\'investissement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvestmentData();
  }, []);

  return {
    investmentData,
    isLoading,
    refetch: loadInvestmentData
  };
};
