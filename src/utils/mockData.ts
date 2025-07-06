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

export const investInCreator = async (
  creatorId: string, 
  planId: string, 
  amount: number
): Promise<void> => {
  const creator = creators.find(c => c.id === creatorId);
  if (!creator) throw new Error("Creator not found");
  
  const plan = creator.plans.find(p => p.id === planId);
  if (!plan) throw new Error("Plan not found");
  
  console.log(`Investment of ${amount}€ in ${creator.name}'s ${plan.name} plan`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (amount <= 0) throw new Error("Amount must be positive");
  if (amount < plan.minInvestment) throw new Error(`Minimum investment for this plan is ${plan.minInvestment}€`);
  
  return;
};

export const mockUserData = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  balance: 2500,
  investments: [
    {
      id: 'inv2',
      creatorId: 'brookmills',
      creatorName: 'BrookMills🍒',
      creatorImage: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jm/jmc/jmceq667otzovowlp3b0rqbmvpyybjjh1733705286/104901396/avatar.jpg',
      planId: 'plan-brookmills-2',
      planName: 'Premium',
      amount: 500,
      returnRate: 749.6,
      startDate: '2024-10-06',
      endDate: '2025-01-06',
      status: 'active',
      earnings: 3748 // 500 + 3248 = 3748
    }
  ],
  transactions: [
    {
      id: 'trans4',
      type: 'deposit',
      amount: 500,
      date: '2024-10-06',
      status: 'completed',
      description: 'Dépôt pour investissement'
    },
    {
      id: 'trans5',
      type: 'investment',
      amount: 500,
      date: '2024-10-06',
      status: 'completed',
      description: 'Investissement - BrookMills🍒'
    }
  ]
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
    totalInvested: 52000,
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
    imageUrl: '/lovable-uploads/4cd2c220-569e-43a6-9e6a-b1f3d5f726dd.png',
    coverImageUrl: 'https://images.unsplash.com/photo-1602017322281-85b2e82e3dec?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.2,
    investorsCount: 372,
    totalInvested: 87000,
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
    totalInvested: 48000,
    monthlyRevenue: 12000,
    followers: 280000,
    creationDate: '2020-09-03',
    description: "Chef cuisinier proposant des recettes faciles à réaliser chez soi. Mes revenus sont générés par mon livre de cuisine, mes cours en ligne et mes partenariats avec des marques d'ustensils de cuisine et d'ingrédients premium.",
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
    totalInvested: 72000,
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
    totalInvested: 93000,
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
    totalInvested: 57000,
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
    totalInvested: 76000,
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
    totalInvested: 92000,
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
    totalInvested: 63000,
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
          'T��léchargements gratuits',
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
    name: 'Isabella Santos',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/g/gc/gcl/gclytoh6ibqn1khp1cf2i6ymelztqmgl1714404792/412109090/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?q=80&w=2070&auto=format&fit=crop',
    category: 'Lifestyle',
    returnRate: 11.8,
    investorsCount: 295,
    totalInvested: 79000,
    monthlyRevenue: 20000,
    followers: 420000,
    creationDate: '2020-07-15',
    description: "Cr��atrice de contenu lifestyle. Mes revenus proviennent de mes partenariats avec des marques internationales et de mon contenu exclusif.",
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
    totalInvested: 82000,
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
    totalInvested: 67000,
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
          'Rapports mensuels',
          'Programmes personnalisés',
          'Séances de coaching'
        ],
        popularity: 'high'
      },
      {
        id: 'plan13-3',
        name: 'Harmonie',
        returnRate: 15.0,
        minInvestment: 1200,
        duration: 12,
        benefits: [
          'Rapports hebdomadaires',
          'Plan complet personnalisé',
          'Coaching privé régulier',
          'Produits bien-être offerts'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'brookmills',
    name: 'BrookMills🍒',
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jm/jmc/jmceq667otzovowlp3b0rqbmvpyybjjh1733705286/104901396/avatar.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?q=80&w=2070&auto=format&fit=crop',
    category: 'Style',
    returnRate: 130,
    investorsCount: 326,
    totalInvested: 78000,
    monthlyRevenue: 19000,
    followers: 405000,
    creationDate: '2022-05-17',
    description: "Créatrice de contenu lifestyle et mode. Mes revenus sont générés par ma boutique en ligne, mes collaborations avec des marques de luxe et mon programme de consultation en style personnalisé.",
    plans: [
      {
        id: 'plan-brookmills-1',
        name: 'Basique',
        returnRate: 25,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Rapport mensuel sur les revenus',
          'Newsletter exclusive'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan-brookmills-2',
        name: 'Premium',
        returnRate: 130,
        minInvestment: 500,
        duration: 3,
        benefits: [
          'Rapports détaillés mensuels',
          'Remises sur les produits',
          'Accès aux lancements en avant-première'
        ],
        popularity: 'high'
      },
      {
        id: 'plan-brookmills-3',
        name: 'Exclusive',
        returnRate: 180,
        minInvestment: 1000,
        duration: 3,
        benefits: [
          'Rapports hebdomadaires',
          'Consultation de style personnalisée',
          'Produits gratuits',
          'Invitation aux événements VIP'
        ],
        popularity: 'low'
      }
    ]
  }
];
