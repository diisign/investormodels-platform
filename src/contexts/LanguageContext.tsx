import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navbar
    'nav.about': 'Qui sommes-nous?',
    'nav.creators': 'Créatrices',
    'nav.affiliation': 'Affiliation',
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Mon profil',
    'nav.deposit': 'Déposer des fonds',
    'nav.withdraw': 'Retirer des fonds',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.register': 'Inscription',

    // Index page
    'index.hero.title': 'Investissez dans les créatrices OnlyFans',
    'index.hero.cta': 'Commencer maintenant',
    'index.stats.creators': 'Créatrices',
    'index.stats.investors': 'Investisseurs',
    'index.stats.dividends': 'Dividendes',
    'index.trending.title': 'Top Tendances',
    'index.trending.viewAll': 'Voir toutes les créatrices',
    'index.affiliates.title': 'Nos Meilleurs Parrains',
    'index.affiliates.subtitle': 'Ils ont recommandé notre plateforme et ont généré des revenus exceptionnels. Pourquoi pas vous ?',
    'index.affiliates.cta': 'Rejoindre le programme d\'affiliation',
    'index.market.title': 'Un Marché en Pleine Explosion',
    'index.market.subtitle': 'OnlyFans connaît une croissance explosive depuis sa création en 2017 son Chiffre d\'affaire a été multiplié par 300.',
    'index.reviews.title': 'Ce que disent nos utilisateurs',
    'index.reviews.subtitle': 'Rejoignez plus de 20 000 investisseurs satisfaits qui ont déjà fait confiance à notre plateforme.',

    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.performance': 'Performance',
    'dashboard.months12': '12 derniers mois',
    'dashboard.months6': '6 derniers mois',
    'dashboard.months3': '3 derniers mois',
    'dashboard.loading': 'Chargement...',
    'dashboard.deposit.title': 'Déposer des fonds',
    'dashboard.deposit.amount': 'Montant (€)',
    'dashboard.deposit.paymentMethod': 'Méthode de paiement',
    'dashboard.deposit.selectMethod': 'Sélectionner une méthode',
    'dashboard.deposit.creditCard': 'Carte bancaire',
    'dashboard.deposit.bankTransfer': 'Virement bancaire',
    'dashboard.deposit.cancel': 'Annuler',
    'dashboard.deposit.submit': 'Déposer',

    // Creators page
    'creators.title': 'Découvrez nos créatrices',
    'creators.count.singular': 'créatrice',
    'creators.count.plural': 'créatrices',
    'creators.noResults.title': 'Aucune créatrice trouvée',
    'creators.noResults.subtitle': 'Aucune créatrice n\'est disponible pour le moment.',

    // Sorting options
    'sort.random': 'Aléatoire',
    'sort.performance': 'Top Performance',
    'sort.marketcap': 'Top Market Cap',
    'sort.popularity': 'Popularité',
    'sort.return': 'Rendement',
    'sort.alphabetical': 'Alphabétique',

    // General
    'language.fr': 'FR',
    'language.en': 'EN',
  },
  en: {
    // Navbar
    'nav.about': 'About Us',
    'nav.creators': 'Creators',
    'nav.affiliation': 'Affiliation',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'My Profile',
    'nav.deposit': 'Deposit Funds',
    'nav.withdraw': 'Withdraw Funds',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',

    // Index page
    'index.hero.title': 'Invest in OnlyFans Creators',
    'index.hero.cta': 'Start Now',
    'index.stats.creators': 'Creators',
    'index.stats.investors': 'Investors',
    'index.stats.dividends': 'Dividends',
    'index.trending.title': 'Top Trending',
    'index.trending.viewAll': 'View All Creators',
    'index.affiliates.title': 'Our Top Affiliates',
    'index.affiliates.subtitle': 'They recommended our platform and generated exceptional revenues. Why not you?',
    'index.affiliates.cta': 'Join the Affiliate Program',
    'index.market.title': 'A Market in Full Expansion',
    'index.market.subtitle': 'OnlyFans has experienced explosive growth since its creation in 2017, with revenue multiplied by 300.',
    'index.reviews.title': 'What Our Users Say',
    'index.reviews.subtitle': 'Join over 20,000 satisfied investors who have already trusted our platform.',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.performance': 'Performance',
    'dashboard.months12': 'Last 12 months',
    'dashboard.months6': 'Last 6 months',
    'dashboard.months3': 'Last 3 months',
    'dashboard.loading': 'Loading...',
    'dashboard.deposit.title': 'Deposit Funds',
    'dashboard.deposit.amount': 'Amount (€)',
    'dashboard.deposit.paymentMethod': 'Payment Method',
    'dashboard.deposit.selectMethod': 'Select a method',
    'dashboard.deposit.creditCard': 'Credit Card',
    'dashboard.deposit.bankTransfer': 'Bank Transfer',
    'dashboard.deposit.cancel': 'Cancel',
    'dashboard.deposit.submit': 'Deposit',

    // Creators page
    'creators.title': 'Discover Our Creators',
    'creators.count.singular': 'creator',
    'creators.count.plural': 'creators',
    'creators.noResults.title': 'No Creators Found',
    'creators.noResults.subtitle': 'No creators are available at the moment.',

    // Sorting options
    'sort.random': 'Random',
    'sort.performance': 'Top Performance',
    'sort.marketcap': 'Top Market Cap',
    'sort.popularity': 'Popularity',
    'sort.return': 'Returns',
    'sort.alphabetical': 'Alphabetical',

    // General
    'language.fr': 'FR',
    'language.en': 'EN',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};