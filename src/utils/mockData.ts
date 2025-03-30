export interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  coverImageUrl: string;
  category: string;
  returnRate: number;
  investorsCount: number;
  totalInvested: number;
  monthlyRevenue: number;
  followers: number;
  creationDate: string;
  description: string;
  plans: Plan[];
}

export interface Plan {
  id: string;
  name: string;
  returnRate: number;
  minInvestment: number;
  duration: number;
  benefits: string[];
  popularity: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  investments: Investment[];
  transactions: Transaction[];
}

export interface Investment {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  planId: string;
  planName: string;
  amount: number;
  returnRate: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
  earnings: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'earning';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

// Function to invest in a creator
export const investInCreator = async (
  creatorId: string,
  planId: string,
  amount: number,
  userId: string
): Promise<void> => {
  // Find the creator and plan
  const creator = creators.find(c => c.id === creatorId);
  if (!creator) throw new Error("Creator not found");
  
  const plan = creator.plans.find(p => p.id === planId) || creator.plans[0];
  if (!plan) throw new Error("Plan not found");
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now we just return success, in a real app we would update the database
  return Promise.resolve();
};

export const creators: Creator[] = [
  {
    id: 'creator1',
    name: 'Emma *Asian #1*',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/k/ke/kei/keiep1nsav9m2m3e7l0ynbcttg9cfoez1657600220/186389633/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1616096142563-ce1506e232ce?q=80&w=2070&auto=format&fit=crop',
    category: 'Fitness',
    returnRate: 12.5,
    investorsCount: 428,
    totalInvested: 85000,
    monthlyRevenue: 28000,
    followers: 520000,
    creationDate: '2020-05-12',
    description: "Coach fitness en ligne spécialisée dans les programmes de remise en forme pour femmes. Avec plus de 500 000 abonnés, mes revenus sont stables et en constante augmentation grâce à mes programmes personnalisés et mes partenariats avec des marques de sport.",
    plans: [
      {
        id: 'plan1-1',
        name: 'Starter',
        returnRate: 8,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Rapport mensuel sur la performance',
          'Accès aux statistiques de base'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan1-2',
        name: 'Growth',
        returnRate: 12.5,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Rapport mensuel détaillé',
          'Accès à toutes les statistiques',
          'Session de coaching exclusive'
        ],
        popularity: 'high'
      },
      {
        id: 'plan1-3',
        name: 'Premium',
        returnRate: 15,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Accès à toutes les statistiques',
          'Mention dans les vidéos',
          'Appel mensuel avec le créateur'
        ],
        popularity: 'low'
      }
    ]
  },
  // ... [The rest of the creators array remains exactly the same as in the original file]
];

// Mock user data
export const mockUser: User = {
  id: 'user1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  balance: 5000,
  investments: [
    {
      id: 'inv1',
      creatorId: 'creator1',
      creatorName: 'Emma *Asian #1*',
      creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/k/ke/kei/keiep1nsav9m2m3e7l0ynbcttg9cfoez1657600220/186389633/avatar.jpg',
      planId: 'plan1-2',
      planName: 'Growth',
      amount: 500,
      returnRate: 12.5,
      startDate: '2023-06-15',
      endDate: '2023-12-15',
      status: 'active',
      earnings: 62.5
    },
    // ... [The rest of the investments array remains exactly the same as in the original file]
  ],
  transactions: [
    {
      id: 'tx1',
      type: 'deposit',
      amount: 2000,
      date: '2023-05-01',
      status: 'completed',
      description: 'Dépôt initial'
    },
    // ... [The rest of the transactions array remains exactly the same as in the original file]
  ]
};
