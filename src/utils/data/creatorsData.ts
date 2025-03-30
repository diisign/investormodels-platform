import { Creator } from '../types/creator';

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
    imageUrl: 'https://pbs.twimg.com/profile_images/1671944977944995840/3ex1Z_RS_400x400.jpg',
    coverImageUrl: 'https://images.unsplash.com/photo-1543699598-15954799c4d4?q=80&w=2070&auto=format&fit=crop',
    category: 'Sport',
    returnRate: 14.8,
    investorsCount: 386,
    totalInvested: 72000,
    monthlyRevenue: 24000,
    followers: 480000,
    creationDate: '2021-01-20',
    description: "Professeur de yoga et coach sportif en ligne, je propose des séances personnalisées pour tous les niveaux. Mes revenus sont en croissance constante grâce à ma chaîne YouTube et mes programmes de formation en ligne.",
    plans: [
      {
        id: 'plan2-1',
        name: 'Bronze',
        returnRate: 9,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux vidéos exclusives',
          'Conseils personnalisés par email'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan2-2',
        name: 'Argent',
        returnRate: 14.8,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à toutes les vidéos',
          'Séances de coaching en direct',
          'Suivi personnalisé'
        ],
        popularity: 'high'
      },
      {
        id: 'plan2-3',
        name: 'Or',
        returnRate: 16,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Séances privées avec le créateur',
          'Accès aux événements VIP'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator3',
    name: 'Kayla',
    imageUrl: 'https://images.unsplash.com/photo-1544005227-a8c5697586ac?q=80&w=1974&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1519389950473-47a04ca2a54e?q=80&w=2070&auto=format&fit=crop',
    category: 'Musique',
    returnRate: 11.2,
    investorsCount: 512,
    totalInvested: 98000,
    monthlyRevenue: 32000,
    followers: 640000,
    creationDate: '2019-11-01',
    description: "Musicien indépendant et producteur de musique électronique. Mes revenus proviennent de mes ventes de musique en ligne, de mes concerts et de mes cours de production musicale. Je cherche à développer ma marque et à toucher un public plus large.",
    plans: [
      {
        id: 'plan3-1',
        name: 'Basic',
        returnRate: 7,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux coulisses de la production',
          'Téléchargements exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan3-2',
        name: 'Standard',
        returnRate: 11.2,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les morceaux',
          'Remix exclusifs',
          'Sessions de questions-réponses'
        ],
        popularity: 'high'
      },
      {
        id: 'plan3-3',
        name: 'Deluxe',
        returnRate: 13,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Production personnalisée',
          'Crédit dans les chansons'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator4',
    name: 'Lala Avi ♡',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a679e?q=80&w=1974&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1588421357569-835aa9c39a06?q=80&w=2070&auto=format&fit=crop',
    category: 'Mode',
    returnRate: 9.5,
    investorsCount: 295,
    totalInvested: 60000,
    monthlyRevenue: 20000,
    followers: 400000,
    creationDate: '2022-03-01',
    description: "Blogueuse mode et influenceuse, je partage mes looks, mes conseils et mes voyages avec ma communauté. Mes revenus proviennent de mes partenariats avec des marques de vêtements, de mes ventes d'articles de mode et de mes collaborations avec des hôtels et des restaurants.",
    plans: [
      {
        id: 'plan4-1',
        name: 'Bronze',
        returnRate: 6,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux guides de style',
          'Codes promo exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan4-2',
        name: 'Argent',
        returnRate: 9.5,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les guides',
          'Séances de shopping en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan4-3',
        name: 'Or',
        returnRate: 11,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Recommandations personnalisées',
          'Accès aux défilés de mode'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator5',
    name: 'Antonella ❤',
    imageUrl: 'https://images.unsplash.com/photo-1541534741730-6a99656b2e83?q=80&w=1935&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1517245412419-999c5ff20764?q=80&w=2070&auto=format&fit=crop',
    category: 'Cuisine',
    returnRate: 10.5,
    investorsCount: 341,
    totalInvested: 68000,
    monthlyRevenue: 22000,
    followers: 440000,
    creationDate: '2021-08-15',
    description: "Chef cuisinier et créatrice de contenu culinaire, je partage mes recettes, mes astuces et mes voyages gastronomiques avec ma communauté. Mes revenus proviennent de mes ventes de livres de cuisine, de mes cours de cuisine en ligne et de mes partenariats avec des marques alimentaires.",
    plans: [
      {
        id: 'plan5-1',
        name: 'Découverte',
        returnRate: 6.5,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux recettes de base',
          'Astuces de cuisine'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan5-2',
        name: 'Gourmet',
        returnRate: 10.5,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à toutes les recettes',
          'Cours de cuisine en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan5-3',
        name: 'Prestige',
        returnRate: 12,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Menus personnalisés',
          'Accès aux événements culinaires'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator6',
    name: 'Bryce\'s Flix 🎥',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1980&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop',
    category: 'Cinéma',
    returnRate: 13.7,
    investorsCount: 463,
    totalInvested: 92000,
    monthlyRevenue: 30000,
    followers: 600000,
    creationDate: '2020-10-01',
    description: "Réalisateur et producteur de courts métrages et de vidéos en ligne. Mes revenus proviennent de mes ventes de films, de mes abonnements à ma chaîne YouTube et de mes partenariats avec des festivals de cinéma.",
    plans: [
      {
        id: 'plan6-1',
        name: 'Découverte',
        returnRate: 8,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux making-of',
          'Scènes coupées'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan6-2',
        name: 'Réalisateur',
        returnRate: 13.7,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les films',
          'Commentaires audio',
          'Sessions de questions-réponses'
        ],
        popularity: 'high'
      },
      {
        id: 'plan6-3',
        name: 'Producteur',
        returnRate: 15,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Avant-premières exclusives',
          'Crédit dans les films'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator7',
    name: 'Daisy 💞',
    imageUrl: 'https://images.unsplash.com/photo-1534528741702-a0cfae562c9c?q=80&w=1964&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1542666943-99eb5a999967?q=80&w=2070&auto=format&fit=crop',
    category: 'Voyage',
    returnRate: 11.8,
    investorsCount: 402,
    totalInvested: 80000,
    monthlyRevenue: 26000,
    followers: 520000,
    creationDate: '2021-04-01',
    description: "Blogueuse voyage et photographe, je partage mes aventures, mes conseils et mes photos avec ma communauté. Mes revenus proviennent de mes partenariats avec des agences de voyage, de mes ventes de photos et de mes collaborations avec des hôtels et des compagnies aériennes.",
    plans: [
      {
        id: 'plan7-1',
        name: 'Explorateur',
        returnRate: 7.5,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux guides de voyage',
          'Fonds d\'écran exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan7-2',
        name: 'Aventurier',
        returnRate: 11.8,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les guides',
          'Vidéos de voyage en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan7-3',
        name: 'Globe-trotteur',
        returnRate: 14,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Itinéraires personnalisés',
          'Accès aux voyages VIP'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator8',
    name: 'Bianca 🍎 *Domincan 🇩🇴*',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1935&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba6?q=80&w=2070&auto=format&fit=crop',
    category: 'Art',
    returnRate: 10.2,
    investorsCount: 324,
    totalInvested: 65000,
    monthlyRevenue: 21000,
    followers: 420000,
    creationDate: '2022-01-15',
    description: "Artiste peintre et créatrice de contenu artistique, je partage mes œuvres, mes techniques et mes inspirations avec ma communauté. Mes revenus proviennent de mes ventes de tableaux, de mes cours de peinture en ligne et de mes partenariats avec des galeries d'art.",
    plans: [
      {
        id: 'plan8-1',
        name: 'Esquisse',
        returnRate: 6.2,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux tutoriels de base',
          'Croquis exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan8-2',
        name: 'Palette',
        returnRate: 10.2,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les tutoriels',
          'Sessions de peinture en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan8-3',
        name: 'Chef-d\'œuvre',
        returnRate: 12,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Critiques personnalisées',
          'Accès aux expositions d\'art'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator9',
    name: 'Ariana Colombian 🌶',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-604a09c0c9ca?q=80&w=1927&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1541844749-a196f05e5211?q=80&w=2070&auto=format&fit=crop',
    category: 'Danse',
    returnRate: 12.3,
    investorsCount: 415,
    totalInvested: 83000,
    monthlyRevenue: 27000,
    followers: 540000,
    creationDate: '2020-07-01',
    description: "Danseuse professionnelle et créatrice de contenu de danse, je partage mes chorégraphies, mes cours et mes performances avec ma communauté. Mes revenus proviennent de mes ventes de cours de danse en ligne, de mes spectacles et de mes partenariats avec des écoles de danse.",
    plans: [
      {
        id: 'plan9-1',
        name: 'Rythme',
        returnRate: 7.8,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux pas de base',
          'Musiques exclusives'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan9-2',
        name: 'Mouvement',
        returnRate: 12.3,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à toutes les chorégraphies',
          'Sessions de danse en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan9-3',
        name: 'Performance',
        returnRate: 14,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Chorégraphies personnalisées',
          'Accès aux spectacles de danse'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator10',
    name: '🐈‍ Elizabeth',
    imageUrl: 'https://images.unsplash.com/photo-1503023345310-154ca6123c14?q=80&w=1961&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    category: 'Animaux',
    returnRate: 9.8,
    investorsCount: 312,
    totalInvested: 62000,
    monthlyRevenue: 20000,
    followers: 400000,
    creationDate: '2021-06-01',
    description: "Passionnée d'animaux et créatrice de contenu animalier, je partage mes conseils, mes astuces et mes histoires avec ma communauté. Mes revenus proviennent de mes ventes de produits pour animaux, de mes consultations en ligne et de mes partenariats avec des refuges animaliers.",
    plans: [
      {
        id: 'plan10-1',
        name: 'Découverte',
        returnRate: 6,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux guides de base',
          'Photos exclusives'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan10-2',
        name: 'Soigneur',
        returnRate: 9.8,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les guides',
          'Sessions de questions-réponses',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan10-3',
        name: 'Expert',
        returnRate: 11,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Consultations personnalisées',
          'Accès aux événements animaliers'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator11',
    name: 'Isabella Santos',
    imageUrl: 'https://images.unsplash.com/photo-1593104547489-5cfb38924743?q=80&w=1935&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1470071459604-315ec3a27ca6?q=80&w=2070&auto=format&fit=crop',
    category: 'Beauté',
    returnRate: 11.5,
    investorsCount: 390,
    totalInvested: 78000,
    monthlyRevenue: 25000,
    followers: 500000,
    creationDate: '2020-03-15',
    description: "Maquilleuse professionnelle et créatrice de contenu beauté, je partage mes tutoriels, mes conseils et mes produits préférés avec ma communauté. Mes revenus proviennent de mes ventes de produits de beauté, de mes cours de maquillage en ligne et de mes partenariats avec des marques de cosmétiques.",
    plans: [
      {
        id: 'plan11-1',
        name: 'Essentiel',
        returnRate: 7,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux tutoriels de base',
          'Codes promo exclusifs'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan11-2',
        name: 'Expert',
        returnRate: 11.5,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les tutoriels',
          'Sessions de maquillage en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan11-3',
        name: 'Guru',
        returnRate: 13,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Recommandations personnalisées',
          'Accès aux événements beauté'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator12',
    name: '🎀 Autumn ren',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1465146344425-5748c93e8118?q=80&w=2073&auto=format&fit=crop',
    category: 'Jeux vidéo',
    returnRate: 13.2,
    investorsCount: 445,
    totalInvested: 89000,
    monthlyRevenue: 29000,
    followers: 580000,
    creationDate: '2019-09-01',
    description: "Streamer et créateur de contenu de jeux vidéo, je partage mes parties, mes astuces et mes commentaires avec ma communauté. Mes revenus proviennent de mes abonnements à ma chaîne Twitch, de mes dons et de mes partenariats avec des éditeurs de jeux vidéo.",
    plans: [
      {
        id: 'plan12-1',
        name: 'Novice',
        returnRate: 8,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux streams exclusifs',
          'Emojis personnalisés'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan12-2',
        name: 'Pro',
        returnRate: 13.2,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les streams',
          'Parties privées',
          'Commentaires personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan12-3',
        name: 'Légende',
        returnRate: 15,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Participation aux événements',
          'Crédit dans les vidéos'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator13',
    name: 'Charlotte 🤍',
    imageUrl: 'https://images.unsplash.com/photo-1589573988927-a04949298c5c?q=80&w=1935&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d53bc86b69?q=80&w=2070&auto=format&fit=crop',
    category: 'Livres',
    returnRate: 10.8,
    investorsCount: 365,
    totalInvested: 73000,
    monthlyRevenue: 24000,
    followers: 480000,
    creationDate: '2021-02-01',
    description: "Auteure et créatrice de contenu littéraire, je partage mes livres, mes critiques et mes conseils d'écriture avec ma communauté. Mes revenus proviennent de mes ventes de livres, de mes ateliers d'écriture en ligne et de mes partenariats avec des maisons d'édition.",
    plans: [
      {
        id: 'plan13-1',
        name: 'Lecteur',
        returnRate: 6.8,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux extraits exclusifs',
          'Citations personnalisées'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan13-2',
        name: 'Auteur',
        returnRate: 10.8,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les livres',
          'Sessions de lecture en direct',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan13-3',
        name: 'Écrivain',
        returnRate: 12,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Critiques personnalisées',
          'Accès aux événements littéraires'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator14',
    name: 'Audrey Shanice 🔞🔥',
    imageUrl: 'https://images.unsplash.com/photo-1547425260-76bc939c2333?q=80&w=2070&auto=format&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1497034825429-c343dd07cae8?q=80&w=2074&auto=format&fit=crop',
    category: 'Technologie',
    returnRate: 12.7,
    investorsCount: 430,
    totalInvested: 86000,
    monthlyRevenue: 28000,
    followers: 560000,
    creationDate: '2020-01-15',
    description: "Blogueuse et créatrice de contenu technologique, je partage mes tests, mes tutoriels et mes actualités avec ma communauté. Mes revenus proviennent de mes partenariats avec des marques de technologie, de mes ventes de produits numériques et de mes collaborations avec des sites web spécialisés.",
    plans: [
      {
        id: 'plan14-1',
        name: 'Curieux',
        returnRate: 7.9,
        minInvestment: 100,
        duration: 3,
        benefits: [
          'Accès aux articles exclusifs',
          'Fonds d\'écran personnalisés'
        ],
        popularity: 'medium'
      },
      {
        id: 'plan14-2',
        name: 'Expert',
        returnRate: 12.7,
        minInvestment: 500,
        duration: 6,
        benefits: [
          'Accès à tous les articles',
          'Sessions de questions-réponses',
          'Conseils personnalisés'
        ],
        popularity: 'high'
      },
      {
        id: 'plan14-3',
        name: 'Innovateur',
        returnRate: 14,
        minInvestment: 1000,
        duration: 12,
        benefits: [
          'Accès illimité à tout le contenu',
          'Recommandations personnalisées',
          'Accès aux événements technologiques'
        ],
        popularity: 'low'
      }
    ]
  },
  {
    id: 'creator15',
    name: 'Brooke Mills🍒',
    imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1944&auto=format&fit=crop',
