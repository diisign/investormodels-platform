
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

// Mock creators data
export const creators: Creator[] = [
  {
    id: 'creator1',
    name: 'Sophia Martinez',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
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
  {
    id: 'creator2',
    name: 'Alex Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1505236273555-17add303d4fb?q=80&w=2069&auto=format&fit=crop',
    category: 'Photographie',
    returnRate: 10.8,
    investorsCount: 215,
    totalInvested: 42000,
    monthlyRevenue: 15000,
    followers: 320000,
    creationDate: '2019-11-23',
    description: "Photographe professionnel spécialisé dans les portraits et les paysages. Mes revenus proviennent de la vente de formations en ligne, de presets et de séances photo exclusives. J'ai également plusieurs partenariats avec des marques d'appareils photo.",
    plans: [
      {
        id: 'plan2-1',
        name: 'Découverte',
        returnRate: 7.5,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapports trimestriels',
          'Accès aux nouvelles collections en avant-première'
        ],
        popularity: 'high'
      },
      {
        id: 'plan2-2',
        name: 'Professionnel',
        returnRate: 10.8,
        minInvestment: 600,
        duration: 6,
        benefits: [
          'Rapports mensuels',
          'Téléchargement gratuit de presets',
          'Critique photo personnalisée'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan2-3',
        name: 'Expert',
        returnRate: 14.2,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports détaillés hebdomadaires',
          'Tous les presets gratuits',
          'Session photo privée',
          'Accès à tous les cours en ligne'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator3',
    name: 'Emma Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1602017322281-85b2e82e3dec?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.2,
    investorsCount: 372,
    totalInvested: 68000,
    monthlyRevenue: 22000,
    followers: 480000,
    creationDate: '2021-02-15',
    description: "Créatrice de contenu lifestyle axé sur la décoration d'intérieur et l'organisation. Mes revenus proviennent principalement de partenariats avec des marques de décoration, de ma ligne de produits et de mon programme de consultation en design.",
    plans: [
      {
        id: 'plan3-1',
        name: 'Basique',
        returnRate: 8.5,
        minInvestment: 200,
        duration: 3,
        benefits: [
          'Rapport mensuel sur les revenus',
          'Newsletter exclusive'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan3-2',
        name: 'Confort',
        returnRate: 11.2,
        minInvestment: 700,
        duration: 6,
        benefits: [
          'Rapports détaillés mensuels',
          'Remises sur les produits',
          'Accès aux lancements en avant-première'
        ],
        popularity: 'high'
      },
      {
        id: 'plan3-3',
        name: 'Luxe',
        returnRate: 15.5,
        minInvestment: 1500,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation de design personnalisée',
          'Produits gratuits',
          'Invitation aux événements VIP'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator4',
    name: 'Thomas Dupont',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?q=80&w=2070&auto=format&fit=crop',
    category: 'Cuisine',
    returnRate: 9.8,
    investorsCount: 192,
    totalInvested: 38000,
    monthlyRevenue: 12000,
    followers: 280000,
    creationDate: '2020-09-03',
    description: "Chef cuisinier proposant des recettes faciles à réaliser chez soi. Mes revenus sont générés par mon livre de cuisine, mes cours en ligne et mes partenariats avec des marques d'ustensiles de cuisine et d'ingrédients premium.",
    plans: [
      {
        id: 'plan4-1',
        name: 'Gourmand',
        returnRate: 7.2,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Recettes exclusives'
        ],
        popularity: 'high'
      },
      {
        id: 'plan4-2',
        name: 'Chef',
        returnRate: 9.8,
        minInvestment: 400,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Cours de cuisine en ligne gratuits',
          'Remises sur les produits partenaires'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan4-3',
        name: 'Étoilé',
        returnRate: 13.5,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Rapports détaillés mensuels',
          'Tous les cours en ligne gratuits',
          'Livre de cuisine dédicacé',
          'Session de cuisine privée par visioconférence'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator5',
    name: 'Olivia Chen',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1598927429372-a7ed4f4a9c27?q=80&w=2070&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 13.2,
    investorsCount: 286,
    totalInvested: 52000,
    monthlyRevenue: 18000,
    followers: 390000,
    creationDate: '2021-04-20',
    description: "Créatrice de contenu mode et styliste personnelle. Mes revenus proviennent de ma boutique en ligne, de mes collaborations avec des marques de luxe et de mon programme de consultation en style personnalisé.",
    plans: [
      {
        id: 'plan5-1',
        name: 'Tendance',
        returnRate: 9.5,
        minInvestment: 200,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Lookbook exclusif'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan5-2',
        name: 'Élégance',
        returnRate: 13.2,
        minInvestment: 800,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Remises sur la boutique en ligne',
          'Conseils de style personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan5-3',
        name: 'Haute Couture',
        returnRate: 16.8,
        minInvestment: 1800,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation de style complète',
          'Pièces exclusives offertes',
          'Invitation aux défilés de mode'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator6',
    name: 'Lucas Bernard',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?q=80&w=2070&auto=format&fit=crop',
    category: 'Tech',
    returnRate: 14.5,
    investorsCount: 412,
    totalInvested: 78000,
    monthlyRevenue: 25000,
    followers: 450000,
    creationDate: '2019-08-10',
    description: "Expert en technologie et développeur. Mes revenus sont générés par mes cours de programmation, mes applications mobiles et mes services de conseil pour les startups tech.",
    plans: [
      {
        id: 'plan6-1',
        name: 'Code',
        returnRate: 10.2,
        minInvestment: 250,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Accès à la communauté de développeurs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan6-2',
        name: 'Developer',
        returnRate: 14.5,
        minInvestment: 1000,
        duration: 6,
        benefits: [
          'Rapport mensuel détaillé',
          'Tous les cours en ligne gratuits',
          'Accès beta aux nouvelles applications'
        ],
        popularity: 'high'
      },
      {
        id: 'plan6-3',
        name: 'CTO',
        returnRate: 18.2,
        minInvestment: 2500,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation tech personnalisée',
          'Participation aux profits des applications',
          'Session de mentorat mensuelle'
        ],
        popularity: 'low'
      }
    ]
  }
];

// Mock user data
export const mockUser: User = {
  id: 'user1',
  email: 'user@example.com',
  name: 'Jean Dupont',
  balance: 2500,
  investments: [
    {
      id: 'inv1',
      creatorId: 'creator1',
      creatorName: 'Sophia Martinez',
      creatorImage: creators[0].imageUrl,
      planId: 'plan1-2',
      planName: 'Growth',
      amount: 500,
      returnRate: 12.5,
      startDate: '2023-12-15',
      endDate: '2024-06-15',
      status: 'active',
      earnings: 31.25
    },
    {
      id: 'inv2',
      creatorId: 'creator3',
      creatorName: 'Emma Wilson',
      creatorImage: creators[2].imageUrl,
      planId: 'plan3-2',
      planName: 'Confort',
      amount: 700,
      returnRate: 11.2,
      startDate: '2024-01-10',
      endDate: '2024-07-10',
      status: 'active',
      earnings: 39.2
    }
  ],
  transactions: [
    {
      id: 'trans1',
      type: 'deposit',
      amount: 1000,
      date: '2023-12-01',
      status: 'completed',
      description: 'Dépôt initial'
    },
    {
      id: 'trans2',
      type: 'deposit',
      amount: 2000,
      date: '2023-12-10',
      status: 'completed',
      description: 'Ajout de fonds'
    },
    {
      id: 'trans3',
      type: 'investment',
      amount: -500,
      date: '2023-12-15',
      status: 'completed',
      description: 'Investissement - Sophia Martinez (Growth)'
    },
    {
      id: 'trans4',
      type: 'investment',
      amount: -700,
      date: '2024-01-10',
      status: 'completed',
      description: 'Investissement - Emma Wilson (Confort)'
    },
    {
      id: 'trans5',
      type: 'earning',
      amount: 31.25,
      date: '2024-01-15',
      status: 'completed',
      description: 'Gains - Sophia Martinez (Growth)'
    },
    {
      id: 'trans6',
      type: 'earning',
      amount: 39.2,
      date: '2024-02-10',
      status: 'completed',
      description: 'Gains - Emma Wilson (Confort)'
    }
  ]
};

// Function to simulate authentication
export let isAuthenticated = false;
let currentUser: User | null = null;

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        isAuthenticated = true;
        currentUser = mockUser;
        resolve(mockUser);
      } else {
        reject(new Error('Identifiants incorrects'));
      }
    }, 800);
  });
};

export const register = (email: string, name: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com') {
        reject(new Error('Cet email est déjà utilisé'));
      } else {
        const newUser: User = {
          id: `user${Date.now()}`,
          email,
          name,
          balance: 0,
          investments: [],
          transactions: []
        };
        isAuthenticated = true;
        currentUser = newUser;
        resolve(newUser);
      }
    }, 800);
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      isAuthenticated = false;
      currentUser = null;
      resolve();
    }, 300);
  });
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const depositFunds = (amount: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!currentUser) {
      reject(new Error('Utilisateur non connecté'));
      return;
    }
    
    setTimeout(() => {
      const transaction: Transaction = {
        id: `trans${Date.now()}`,
        type: 'deposit',
        amount,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        description: 'Dépôt de fonds'
      };
      
      currentUser = {
        ...currentUser,
        balance: currentUser.balance + amount,
        transactions: [transaction, ...currentUser.transactions]
      };
      
      resolve(currentUser);
    }, 800);
  });
};

export const investInCreator = (creatorId: string, planId: string, amount: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!currentUser) {
      reject(new Error('Utilisateur non connecté'));
      return;
    }
    
    setTimeout(() => {
      const creator = creators.find(c => c.id === creatorId);
      if (!creator) {
        reject(new Error('Créateur non trouvé'));
        return;
      }
      
      const plan = creator.plans.find(p => p.id === planId);
      if (!plan) {
        reject(new Error('Plan non trouvé'));
        return;
      }
      
      if (currentUser.balance < amount) {
        reject(new Error('Solde insuffisant'));
        return;
      }
      
      if (amount < plan.minInvestment) {
        reject(new Error(`L'investissement minimum est de ${plan.minInvestment}€`));
        return;
      }
      
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(today.getMonth() + plan.duration);
      
      const investment: Investment = {
        id: `inv${Date.now()}`,
        creatorId,
        creatorName: creator.name,
        creatorImage: creator.imageUrl,
        planId,
        planName: plan.name,
        amount,
        returnRate: plan.returnRate,
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status: 'active',
        earnings: 0
      };
      
      const transaction: Transaction = {
        id: `trans${Date.now()}`,
        type: 'investment',
        amount: -amount,
        date: today.toISOString().split('T')[0],
        status: 'completed',
        description: `Investissement - ${creator.name} (${plan.name})`
      };
      
      currentUser = {
        ...currentUser,
        balance: currentUser.balance - amount,
        investments: [investment, ...currentUser.investments],
        transactions: [transaction, ...currentUser.transactions]
      };
      
      resolve(currentUser);
    }, 800);
  });
};
