
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
export const investInCreator = (
  user: User, 
  creatorId: string, 
  planId: string, 
  amount: number
): User => {
  // Find the creator and plan
  const creator = creators.find(c => c.id === creatorId);
  if (!creator) throw new Error("Creator not found");
  
  const plan = creator.plans.find(p => p.id === planId);
  if (!plan) throw new Error("Plan not found");
  
  // Check if user has enough balance
  if (user.balance < amount) throw new Error("Insufficient balance");
  
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(now.getMonth() + plan.duration);
  
  // Create new investment
  const newInvestment: Investment = {
    id: `inv${user.investments.length + 1}`,
    creatorId,
    creatorName: creator.name,
    creatorImage: creator.imageUrl,
    planId,
    planName: plan.name,
    amount,
    returnRate: plan.returnRate,
    startDate: now.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    status: 'active',
    earnings: 0
  };
  
  // Create transaction record
  const newTransaction: Transaction = {
    id: `tx${user.transactions.length + 1}`,
    type: 'investment',
    amount,
    date: now.toISOString().split('T')[0],
    status: 'completed',
    description: `Investissement dans ${creator.name} - Plan ${plan.name}`
  };
  
  // Update user data
  return {
    ...user,
    balance: user.balance - amount,
    investments: [...user.investments, newInvestment],
    transactions: [...user.transactions, newTransaction]
  };
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
  {
    id: 'creator2',
    name: 'Maria 🤸🏻‍*',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lq/lqy/lqyww860kcjl7vlskjkvhqujrfpks1rr1708457235/373336356/avatar.jpg',
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
    name: 'Kayla',
    imageUrl: 'https://onlyfinder.com/cdn-cgi/image/width=160,quality=75/https://media.onlyfinder.com/d9/d95cc6ad-2b07-4bd3-a31a-95c00fd31bef/kaylapufff-onlyfans.webp',
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
    name: 'Lala Avi ♡',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg',
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
    name: 'Antonella ❤',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/6/6f/6ff/6ffsabyn44okaxnazykunwo0x5zw1kmd1739911134/355023516/avatar.jpg',
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
    name: "Bryce's Flix 🎥",
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jm/jmc/jmceq667otzovowlp3b0rqbmvpyybjjh1733705286/104901396/avatar.jpg',
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
  },
  {
    id: 'creator7',
    name: 'Daisy 💞',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/t/tu/tue/tues2azi6vxj6yrmdec7g9vrol66frbj1731104096/445225187/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.5,
    investorsCount: 245,
    totalInvested: 42000,
    monthlyRevenue: 16000,
    followers: 320000,
    creationDate: '2021-01-15',
    description: "Créatrice de contenu lifestyle. Mes revenus proviennent principalement de mes collaborations avec des marques et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan7-1',
        name: 'Basique',
        returnRate: 8.2,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès aux statistiques de base'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan7-2',
        name: 'Premium',
        returnRate: 11.5,
        minInvestment: 600,
        duration: 6,
        benefits: [
          'Rapports détaillés',
          'Accès à tout le contenu',
          'Mentions spéciales'
        ],
        popularity: 'high'
      },
      {
        id: 'plan7-3',
        name: 'VIP',
        returnRate: 15.0,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Contenu exclusif',
          'Appel mensuel',
          'Produits gratuits'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator8',
    name: 'Bianca 🍎 *Domincan 🇩🇴*',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/w/ww/www/wwwm2nbmdojruuvvmskbb0rfiqur4w8w1738821490/424984894/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1505236273555-17add303d4fb?q=80&w=2069&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 12.8,
    investorsCount: 310,
    totalInvested: 56000,
    monthlyRevenue: 19000,
    followers: 410000,
    creationDate: '2020-11-20',
    description: "Créatrice de contenu mode. Mes revenus proviennent de ma boutique en ligne et de mes collaborations avec des marques de mode internationales.",
    plans: [
      {
        id: 'plan8-1',
        name: 'Mode',
        returnRate: 9.0,
        minInvestment: 200,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Lookbook exclusif'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan8-2',
        name: 'Styliste',
        returnRate: 12.8,
        minInvestment: 750,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Remises sur la boutique',
          'Conseils mode personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan8-3',
        name: 'Designer',
        returnRate: 16.5,
        minInvestment: 1500,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation complète',
          'Pièces exclusives',
          'Accès aux événements'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator9',
    name: 'Ariana Colombian 🌶',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/r/rn/rnj/rnj2ki36l6ih5ay5ecbbplaearzyhqpd1725115071/440793308/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1602017322281-85b2e82e3dec?q=80&w=2070&auto=format&fit=crop',
    category: 'Fitness',
    returnRate: 13.2,
    investorsCount: 385,
    totalInvested: 72000,
    monthlyRevenue: 24000,
    followers: 490000,
    creationDate: '2020-08-14',
    description: "Coach fitness spécialisée dans les programmes de remise en forme. Mes revenus proviennent de mes programmes personnalisés et de mes partenariats avec des marques de sport.",
    plans: [
      {
        id: 'plan9-1',
        name: 'Débutant',
        returnRate: 8.8,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès aux statistiques de base'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan9-2',
        name: 'Athlète',
        returnRate: 13.2,
        minInvestment: 600,
        duration: 6,
        benefits: [
          'Rapport détaillé',
          'Programme personnalisé',
          'Session coaching mensuelle'
        ],
        popularity: 'high'
      },
      {
        id: 'plan9-3',
        name: 'Champion',
        returnRate: 16.8,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Programme complet',
          'Coaching hebdomadaire',
          'Produits exclusifs'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator10',
    name: '🐈‍ Elizabeth',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/le/lec/lecj3pxbtb4ymxfen8yurh1aqum6xooq1736534589/124057483/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1598927429372-a7ed4f4a9c27?q=80&w=2070&auto=format&fit=crop',
    category: 'Photographie',
    returnRate: 10.5,
    investorsCount: 230,
    totalInvested: 45000,
    monthlyRevenue: 16000,
    followers: 340000,
    creationDate: '2021-02-22',
    description: "Photographe professionnelle spécialisée dans les portraits. Mes revenus proviennent de la vente de mes formations en ligne et de mes séances photo exclusives.",
    plans: [
      {
        id: 'plan10-1',
        name: 'Cliché',
        returnRate: 7.8,
        minInvestment: 180,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Accès aux collections'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan10-2',
        name: 'Portfolio',
        returnRate: 10.5,
        minInvestment: 550,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Téléchargements gratuits',
          'Critique photo personnelle'
        ],
        popularity: 'high'
      },
      {
        id: 'plan10-3',
        name: 'Exposition',
        returnRate: 14.8,
        minInvestment: 1100,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Tous les presets',
          'Session photo privée',
          'Cours en ligne gratuits'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator11',
    name: 'Isabella Santos 🇺🇸🇧🇷',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/g/gc/gcl/gclytoh6ibqn1khp1cf2i6ymelztqmgl1714404792/412109090/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.8,
    investorsCount: 295,
    totalInvested: 58000,
    monthlyRevenue: 20000,
    followers: 420000,
    creationDate: '2020-07-15',
    description: "Créatrice de contenu lifestyle. Mes revenus proviennent de mes partenariats avec des marques internationales et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan11-1',
        name: 'Découverte',
        returnRate: 8.4,
        minInvestment: 200,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Newsletter exclusive'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan11-2',
        name: 'Explorer',
        returnRate: 11.8,
        minInvestment: 650,
        duration: 6,
        benefits: [
          'Rapport détaillé',
          'Remises exclusives',
          'Contenu premium'
        ],
        popularity: 'high'
      },
      {
        id: 'plan11-3',
        name: 'Globetrotter',
        returnRate: 15.6,
        minInvestment: 1300,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation personnelle',
          'Produits exclusifs',
          'Appels privés'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator12',
    name: '🎀 Autumn ren',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/po/poq/poqsgzzsem9nmffr5e3dmnis3gdfkdjt1739306610/161871329/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1616096142563-ce1506e232ce?q=80&w=2070&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 12.6,
    investorsCount: 320,
    totalInvested: 62000,
    monthlyRevenue: 21000,
    followers: 405000,
    creationDate: '2020-10-08',
    description: "Créatrice de mode et styliste. Mes revenus proviennent de ma boutique en ligne, de mes collaborations avec des marques et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan12-1',
        name: 'Tendance',
        returnRate: 9.2,
        minInvestment: 180,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Lookbook saisonnier'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan12-2',
        name: 'Fashion',
        returnRate: 12.6,
        minInvestment: 680,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Remises boutique',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan12-3',
        name: 'Couture',
        returnRate: 16.2,
        minInvestment: 1400,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation complète',
          'Articles exclusifs',
          'Invitations VIP'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator13',
    name: 'Charlotte 🤍',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/c/cq/cqy/cqydatlsrhxwwop9ybh9xkh4kmtmoaj41705156342/277839437/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1505236273555-17add303d4fb?q=80&w=2069&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.4,
    investorsCount: 260,
    totalInvested: 50000,
    monthlyRevenue: 18000,
    followers: 365000,
    creationDate: '2021-03-05',
    description: "Créatrice lifestyle et coach bien-être. Mes revenus proviennent de mes programmes personnalisés et de mes collaborations avec des marques de bien-être.",
    plans: [
      {
        id: 'plan13-1',
        name: 'Bien-être',
        returnRate: 8.0,
        minInvestment: 170,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Newsletter bien-être'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan13-2',
        name: 'Équilibre',
        returnRate: 11.4,
        minInvestment: 620,
        duration: 6,
        benefits: [
          'Rapport détaillé',
          'Programme personnalisé',
          'Conseils exclusifs'
        ],
        popularity: 'high'
      },
      {
        id: 'plan13-3',
        name: 'Harmonie',
        returnRate: 15.2,
        minInvestment: 1250,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Programme complet',
          'Coaching privé',
          'Produits bien-être'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator14',
    name: 'Audrey Shanice 🔞🔥',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/t/tr/tre/treu426uagi2nu0ppnuhscgqhz1vajrb1614919839/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1602017322281-85b2e82e3dec?q=80&w=2070&auto=format&fit=crop',
    category: 'Fitness',
    returnRate: 13.0,
    investorsCount: 340,
    totalInvested: 67000,
    monthlyRevenue: 23000,
    followers: 450000,
    creationDate: '2020-06-18',
    description: "Coach fitness et nutrition. Mes revenus proviennent de mes programmes d'entraînement, de mes conseils nutritionnels et de mes partenariats avec des marques de fitness.",
    plans: [
      {
        id: 'plan14-1',
        name: 'Débutant',
        returnRate: 8.6,
        minInvestment: 160,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès aux séances de base'
        ],
        popularity: 'high'
      },
      {
        id: 'plan14-2',
        name: 'Avancé',
        returnRate: 13.0,
        minInvestment: 550,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Programme personnalisé',
          'Suivi nutritionnel'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan14-3',
        name: 'Elite',
        returnRate: 17.0,
        minInvestment: 1100,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Programme sur mesure',
          'Coaching privé',
          'Suppléments offerts'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator15',
    name: 'Brooke Mills🍒',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/h/hn/hnp/hnp6h41vafuzgo9lb93jyrg1khl7yusd1674778751/302999100/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=2074&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 14.2,
    investorsCount: 378,
    totalInvested: 73000,
    monthlyRevenue: 24500,
    followers: 470000,
    creationDate: '2020-09-25',
    description: "Créatrice de mode et styliste. Mes revenus proviennent de ma ligne de vêtements, de mes collaborations avec des marques de luxe et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan15-1',
        name: 'Tendance',
        returnRate: 9.8,
        minInvestment: 200,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès au lookbook'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan15-2',
        name: 'Styliste',
        returnRate: 14.2,
        minInvestment: 750,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Remises boutique',
          'Conseils style personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan15-3',
        name: 'Haute Couture',
        returnRate: 18.5,
        minInvestment: 1500,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Consultation complète',
          'Pièces exclusives',
          'Invitations défilés'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator16',
    name: 'Sophia Rose 💫',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/q/q0/q0o/q0o3kw7gqhvuioaplnveb6q77j4ko6ln1673237481/13754453/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=1887&auto=format&fit=crop',
    category: 'Art',
    returnRate: 11.6,
    investorsCount: 245,
    totalInvested: 48000,
    monthlyRevenue: 17000,
    followers: 380000,
    creationDate: '2021-01-18',
    description: "Artiste et créatrice de contenu. Mes revenus proviennent de la vente de mes œuvres, de mes cours d'art en ligne et de mes collaborations avec des galeries.",
    plans: [
      {
        id: 'plan16-1',
        name: 'Esquisse',
        returnRate: 8.2,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Accès galerie digitale'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan16-2',
        name: 'Toile',
        returnRate: 11.6,
        minInvestment: 600,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Cours en ligne gratuits',
          'Œuvre numérique exclusive'
        ],
        popularity: 'high'
      },
      {
        id: 'plan16-3',
        name: 'Œuvre d\'Art',
        returnRate: 15.8,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Tous les cours gratuits',
          'Œuvre physique dédicacée',
          'Visite d\'atelier virtuelle'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator17',
    name: 'Victoria 💋',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lv/lvi/lviitmbx2pppksgphr5kk2vh5tmwzo1w1704302300/6793248/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1611042553484-d61f84d22784?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 12.2,
    investorsCount: 315,
    totalInvested: 62000,
    monthlyRevenue: 20500,
    followers: 410000,
    creationDate: '2020-12-10',
    description: "Créatrice de contenu lifestyle. Mes revenus proviennent de mes collaborations avec des marques de luxe, de mon programme de coaching et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan17-1',
        name: 'Découverte',
        returnRate: 8.5,
        minInvestment: 180,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Newsletter exclusive'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan17-2',
        name: 'Expérience',
        returnRate: 12.2,
        minInvestment: 680,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Contenu premium',
          'Session coaching mensuelle'
        ],
        popularity: 'high'
      },
      {
        id: 'plan17-3',
        name: 'Prestige',
        returnRate: 16.5,
        minInvestment: 1400,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Programme personnalisé',
          'Coaching privé',
          'Produits partenaires offerts'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator18',
    name: 'Nina 💜',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/n/nl/nl7/nl7ujr6gpao7riitqgeul2kuvclb7snl1724680176/344510725/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1617333584253-8a4ebcade581?q=80&w=1920&auto=format&fit=crop',
    category: 'Danse',
    returnRate: 13.5,
    investorsCount: 296,
    totalInvested: 58000,
    monthlyRevenue: 19500,
    followers: 385000,
    creationDate: '2021-02-14',
    description: "Danseuse professionnelle et chorégraphe. Mes revenus proviennent de mes cours de danse en ligne, de mes performances et de mes collaborations avec des écoles de danse.",
    plans: [
      {
        id: 'plan18-1',
        name: 'Rythme',
        returnRate: 9.2,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès aux tutoriels de base'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan18-2',
        name: 'Mouvement',
        returnRate: 13.5,
        minInvestment: 620,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Tous les cours en ligne',
          'Séance personnalisée mensuelle'
        ],
        popularity: 'high'
      },
      {
        id: 'plan18-3',
        name: 'Performance',
        returnRate: 17.8,
        minInvestment: 1300,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Cours privés',
          'Chorégraphie personnalisée',
          'Accès aux événements exclusifs'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator19',
    name: 'Zoe 🌹',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/z/zr/zrj/zrjivxcnygnbhjjpnvalhffjejnk5emb1707238486/9376223/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop',
    category: 'Cuisine',
    returnRate: 11.8,
    investorsCount: 232,
    totalInvested: 45000,
    monthlyRevenue: 16500,
    followers: 345000,
    creationDate: '2020-11-08',
    description: "Chef culinaire et créatrice de contenu gastronomique. Mes revenus proviennent de mes livres de recettes, de mes cours de cuisine en ligne et de mes collaborations avec des marques alimentaires.",
    plans: [
      {
        id: 'plan19-1',
        name: 'Gourmet',
        returnRate: 8.4,
        minInvestment: 140,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Livre de recettes digital'
        ],
        popularity: 'high'
      },
      {
        id: 'plan19-2',
        name: 'Chef',
        returnRate: 11.8,
        minInvestment: 580,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Cours en ligne gratuits',
          'Recettes exclusives'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan19-3',
        name: 'Étoilé',
        returnRate: 16.0,
        minInvestment: 1150,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Tous les cours gratuits',
          'Livre dédicacé',
          'Session cuisine privée'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator20',
    name: 'Melanie 🍒',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/m/mv/mvl/mvlhwxzldrtpzkdcyqzgrr5i8atwqvot1711117694/403859232/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?q=80&w=2070&auto=format&fit=crop',
    category: 'Fitness',
    returnRate: 13.8,
    investorsCount: 352,
    totalInvested: 69000,
    monthlyRevenue: 23500,
    followers: 460000,
    creationDate: '2020-07-22',
    description: "Coach fitness spécialisée dans le yoga et le bien-être. Mes revenus proviennent de mes programmes d'entraînement, de ma ligne de vêtements de sport et de mes retraites yoga.",
    plans: [
      {
        id: 'plan20-1',
        name: 'Équilibre',
        returnRate: 9.6,
        minInvestment: 170,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Programme yoga débutant'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan20-2',
        name: 'Harmonie',
        returnRate: 13.8,
        minInvestment: 650,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Tous les programmes',
          'Consultation nutrition'
        ],
        popularity: 'high'
      },
      {
        id: 'plan20-3',
        name: 'Sérénité',
        returnRate: 18.2,
        minInvestment: 1300,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Programme personnalisé',
          'Sessions privées',
          'Réduction sur les retraites'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator21',
    name: 'Samantha 🌸',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/s/sn/snk/snknlldkypeays71iobp4qqamgmyx83m1730686874/345711625/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop',
    category: 'Beauté',
    returnRate: 12.0,
    investorsCount: 280,
    totalInvested: 54000,
    monthlyRevenue: 18500,
    followers: 375000,
    creationDate: '2021-03-15',
    description: "Maquilleuse professionnelle et créatrice de contenu beauté. Mes revenus proviennent de ma ligne de cosmétiques, de mes tutoriels maquillage et de mes collaborations avec des marques de beauté.",
    plans: [
      {
        id: 'plan21-1',
        name: 'Éclat',
        returnRate: 8.5,
        minInvestment: 160,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Guides beauté exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan21-2',
        name: 'Glamour',
        returnRate: 12.0,
        minInvestment: 600,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Tutoriels premium',
          'Remises boutique'
        ],
        popularity: 'high'
      },
      {
        id: 'plan21-3',
        name: 'Prestige',
        returnRate: 16.2,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation personnalisée',
          'Produits gratuits',
          'Masterclass privée'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator22',
    name: 'Jasmine 🔥',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/j4/j4s/j4szddk3kng9ryu0tu4ltlz7llofo0gs1714221649/9059542/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1517530094915-500495b15ade?q=80&w=2071&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 14.5,
    investorsCount: 325,
    totalInvested: 63000,
    monthlyRevenue: 21500,
    followers: 425000,
    creationDate: '2020-10-05',
    description: "Créatrice de mode et influenceuse. Mes revenus proviennent de ma marque de vêtements, de mes collaborations avec des marques de luxe et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan22-1',
        name: 'Style',
        returnRate: 10.2,
        minInvestment: 180,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Lookbook saisonnier'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan22-2',
        name: 'Tendance',
        returnRate: 14.5,
        minInvestment: 700,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Conseils style personnalisés',
          'Remises exclusives'
        ],
        popularity: 'high'
      },
      {
        id: 'plan22-3',
        name: 'Haute Couture',
        returnRate: 19.0,
        minInvestment: 1500,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Consultation complète',
          'Pièces limitées offertes',
          'Invitations événements mode'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator23',
    name: 'Isabel 💫',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/i/ik/ikh/ikhxjrnd5wxourm8hqcjibrk7smzblyn1718163760/145464089/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 13.2,
    investorsCount: 290,
    totalInvested: 56000,
    monthlyRevenue: 19000,
    followers: 390000,
    creationDate: '2021-01-20',
    description: "Créatrice de contenu lifestyle et voyage. Mes revenus proviennent de mes guides de voyage, de mes collaborations avec des hôtels et marques de luxe et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan23-1',
        name: 'Découverte',
        returnRate: 9.0,
        minInvestment: 170,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Guide voyage digital'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan23-2',
        name: 'Aventure',
        returnRate: 13.2,
        minInvestment: 650,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Guides exclusifs',
          'Recommandations personnalisées'
        ],
        popularity: 'high'
      },
      {
        id: 'plan23-3',
        name: 'Expérience',
        returnRate: 17.5,
        minInvestment: 1300,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation voyage',
          'Guides complets',
          'Réductions partenaires'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator24',
    name: 'Julia 🌙',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jq/jqy/jqypn1apftzib3fautwdfox0cj02c4jp1703395505/101611678/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=2070&auto=format&fit=crop',
    category: 'Photographie',
    returnRate: 11.5,
    investorsCount: 245,
    totalInvested: 48000,
    monthlyRevenue: 17000,
    followers: 360000,
    creationDate: '2020-08-12',
    description: "Photographe professionnelle spécialisée dans les portraits et paysages. Mes revenus proviennent de mes formations photo, de ma vente de presets et de mes expositions.",
    plans: [
      {
        id: 'plan24-1',
        name: 'Cliché',
        returnRate: 8.2,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès galerie privée'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan24-2',
        name: 'Objectif',
        returnRate: 11.5,
        minInvestment: 580,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Presets exclusifs',
          'Formation en ligne'
        ],
        popularity: 'high'
      },
      {
        id: 'plan24-3',
        name: 'Portfolio',
        returnRate: 15.8,
        minInvestment: 1150,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Toutes les formations',
          'Tirage photo signé',
          'Critique portfolio'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator25',
    name: 'Natalie 💕',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/n/na/naa/naao7csjw7xicftell1shcb9lsxjmdy91737645433/2301291/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=2069&auto=format&fit=crop',
    category: 'Fitness',
    returnRate: 13.6,
    investorsCount: 310,
    totalInvested: 61000,
    monthlyRevenue: 20500,
    followers: 405000,
    creationDate: '2020-06-25',
    description: "Coach fitness et nutrition. Mes revenus proviennent de mes programmes d'entrainement personnalisés, de ma ligne de compléments alimentaires et de mes challenges fitness.",
    plans: [
      {
        id: 'plan25-1',
        name: 'Énergie',
        returnRate: 9.5,
        minInvestment: 160,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Programme débutant'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan25-2',
        name: 'Vitalité',
        returnRate: 13.6,
        minInvestment: 620,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Programme complet',
          'Suivi nutritionnel'
        ],
        popularity: 'high'
      },
      {
        id: 'plan25-3',
        name: 'Performance',
        returnRate: 17.8,
        minInvestment: 1250,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Programme sur mesure',
          'Coaching privé',
          'Suppléments gratuits'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator26',
    name: 'Kim 🦋',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/k/kg/kgy/kgya8xp7dt359cjnl608o82odpc7rgbc1705207113/6554260/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?q=80&w=2070&auto=format&fit=crop',
    category: 'Musique',
    returnRate: 12.4,
    investorsCount: 270,
    totalInvested: 53000,
    monthlyRevenue: 18000,
    followers: 370000,
    creationDate: '2021-02-08',
    description: "Musicienne et productrice. Mes revenus proviennent de mes compositions, de mes cours de musique en ligne et de mes collaborations avec des artistes.",
    plans: [
      {
        id: 'plan26-1',
        name: 'Mélodie',
        returnRate: 8.8,
        minInvestment: 150,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Accès aux compositions'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan26-2',
        name: 'Harmonie',
        returnRate: 12.4,
        minInvestment: 590,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Cours en ligne',
          'Compositions exclusives'
        ],
        popularity: 'high'
      },
      {
        id: 'plan26-3',
        name: 'Symphonie',
        returnRate: 16.6,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Tous les cours',
          'Composition personnalisée',
          'Session studio virtuelle'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator27',
    name: 'Hannah 💎',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/h/hn/hnp/hnp6h41vafuzgo9lb93jyrg1khl7yusd1674778751/302999100/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1528809217021-151305b50e55?q=80&w=2069&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 13.0,
    investorsCount: 285,
    totalInvested: 55000,
    monthlyRevenue: 19000,
    followers: 385000,
    creationDate: '2020-11-15',
    description: "Créatrice de mode et styliste. Mes revenus proviennent de ma ligne de bijoux, de mes collaborations avec des marques de luxe et de mon contenu exclusif.",
    plans: [
      {
        id: 'plan27-1',
        name: 'Éclat',
        returnRate: 9.0,
        minInvestment: 170,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Lookbook saisonnier'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan27-2',
        name: 'Brillance',
        returnRate: 13.0,
        minInvestment: 650,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Conseils style',
          'Remises boutique'
        ],
        popularity: 'high'
      },
      {
        id: 'plan27-3',
        name: 'Diamant',
        returnRate: 17.2,
        minInvestment: 1300,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Consultation complète',
          'Bijou exclusif',
          'Événements VIP'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator28',
    name: 'Wendy 🌊',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/w/wt/wtt/wttm01muz3ow11csonxw9vhuzbfyfjkp1714596535/365403081/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1547619292-240a0673d2fc?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.2,
    investorsCount: 255,
    totalInvested: 50000,
    monthlyRevenue: 17500,
    followers: 365000,
    creationDate: '2021-03-02',
    description: "Créatrice de contenu lifestyle et bien-être. Mes revenus proviennent de mes programmes bien-être, de ma boutique en ligne et de mes partenariats avec des marques éco-responsables.",
    plans: [
      {
        id: 'plan28-1',
        name: 'Sérénité',
        returnRate: 7.8,
        minInvestment: 140,
        duration: 3,
        benefits: [
          'Rapport trimestriel',
          'Guide bien-être digital'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan28-2',
        name: 'Équilibre',
        returnRate: 11.2,
        minInvestment: 560,
        duration: 6,
        benefits: [
          'Rapport mensuel',
          'Programme complet',
          'Remises boutique'
        ],
        popularity: 'high'
      },
      {
        id: 'plan28-3',
        name: 'Plénitude',
        returnRate: 15.5,
        minInvestment: 1100,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Programme personnalisé',
          'Consultation privée',
          'Produits exclusifs'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator29',
    name: 'Quinn 🌈',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/q/q0/q0o/q0o3kw7gqhvuioaplnveb6q77j4ko6ln1673237481/13754453/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    category: 'Art',
    returnRate: 12.0,
    investorsCount: 265,
    totalInvested: 52000,
    monthlyRevenue: 18000,
    followers: 375000,
    creationDate: '2020-09-18',
    description: "Artiste digitale et illustratrice. Mes revenus proviennent de mes illustrations personnalisées, de mes cours d'art en ligne et de mes collaborations avec des éditeurs.",
    plans: [
      {
        id: 'plan29-1',
        name: 'Croquis',
        returnRate: 8.6,
        minInvestment: 160,
        duration: 3,
        benefits: [
          'Rapport mensuel',
          'Accès galerie privée'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan29-2',
        name: 'Illustration',
        returnRate: 12.0,
        minInvestment: 580,
        duration: 6,
        benefits: [
          'Rapport hebdomadaire',
          'Cours en ligne',
          'Illustration digitale'
        ],
        popularity: 'high'
      },
      {
        id: 'plan29-3',
        name: 'Chef-d\'œuvre',
        returnRate: 16.2,
        minInvestment: 1150,
        duration: 12,
        benefits: [
          'Rapports détaillés',
          'Tous les cours',
          'Illustration personnalisée',
          'Processus créatif exclusif'
        ],
        popularity: 'low'
      }
    ]
  }
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
    {
      id: 'inv2',
      creatorId: 'creator3',
      creatorName: 'Kayla',
      creatorImage: 'https://onlyfinder.com/cdn-cgi/image/width=160,quality=75/https://media.onlyfinder.com/d9/d95cc6ad-2b07-4bd3-a31a-95c00fd31bef/kaylapufff-onlyfans.webp',
      planId: 'plan3-2',
      planName: 'Confort',
      amount: 700,
      returnRate: 11.2,
      startDate: '2023-05-10',
      endDate: '2023-11-10',
      status: 'active',
      earnings: 78.4
    },
    {
      id: 'inv3',
      creatorId: 'creator5',
      creatorName: 'Antonella ❤',
      creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/6/6f/6ff/6ffsabyn44okaxnazykunwo0x5zw1kmd1739911134/355023516/avatar.jpg',
      planId: 'plan5-3',
      planName: 'Haute Couture',
      amount: 1800,
      returnRate: 16.8,
      startDate: '2023-07-20',
      endDate: '2024-07-20',
      status: 'active',
      earnings: 302.4
    }
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
    {
      id: 'tx2',
      type: 'investment',
      amount: 500,
      date: '2023-06-15',
      status: 'completed',
      description: 'Investissement dans Emma *Asian #1* - Plan Growth'
    },
    {
      id: 'tx3',
      type: 'investment',
      amount: 700,
      date: '2023-05-10',
      status: 'completed',
      description: 'Investissement dans Kayla - Plan Confort'
    },
    {
      id: 'tx4',
      type: 'earning',
      amount: 62.5,
      date: '2023-07-15',
      status: 'completed',
      description: 'Gains mensuels - Emma *Asian #1*'
    },
    {
      id: 'tx5',
      type: 'earning',
      amount: 78.4,
      date: '2023-06-10',
      status: 'completed',
      description: 'Gains mensuels - Kayla'
    },
    {
      id: 'tx6',
      type: 'deposit',
      amount: 5000,
      date: '2023-07-05',
      status: 'completed',
      description: 'Dépôt supplémentaire'
    },
    {
      id: 'tx7',
      type: 'investment',
      amount: 1800,
      date: '2023-07-20',
      status: 'completed',
      description: 'Investissement dans Antonella ❤ - Plan Haute Couture'
    },
    {
      id: 'tx8',
      type: 'earning',
      amount: 302.4,
      date: '2023-08-20',
      status: 'completed',
      description: 'Gains mensuels - Antonella ❤'
    }
  ]
};
