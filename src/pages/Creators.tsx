import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import CreatorCard from '@/components/ui/CreatorCard';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { creators } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import { getCreatorProfile, creatorProfiles, getMarketCap, getLastVariation } from '@/utils/creatorProfiles';

type SortOption = 'random' | 'popularity' | 'return' | 'alphabetical' | 'performance' | 'marketcap';

// Create an interface for consolidated creator data
interface ConsolidatedCreator {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  investorsCount: number;
  totalInvested: number;
  monthlyRevenue: number;
  returnRate: number;
}
const Creators = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [sortBy, setSortBy] = useState<SortOption>('random'); // Default to 'random'
  const [showDropdown, setShowDropdown] = useState(false);
  const [allCreators, setAllCreators] = useState<ConsolidatedCreator[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  useEffect(() => {
    // Combine creators from mockData and creatorProfiles
    const combinedCreators: ConsolidatedCreator[] = [];

    // Add creators from mockData
    creators.forEach(creator => {
      const profile = getCreatorProfile(creator.id);
      combinedCreators.push({
        id: creator.id,
        name: profile.name,
        // Utiliser le nom du profil pour assurer la cohérence
        imageUrl: creator.imageUrl || profile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${creator.id}`,
        category: creator.category,
        investorsCount: creator.investorsCount,
        totalInvested: getMarketCap(creator.id, creators),
        monthlyRevenue: profile.monthlyRevenue,
        // Utiliser le revenu du profil pour assurer la cohérence
        returnRate: profile.returnRate
      });
    });

    // Add additional creators from creatorProfiles that aren't already in combinedCreators
    Object.values(creatorProfiles).forEach(profile => {
      if (!combinedCreators.some(c => c.id === profile.id)) {
        // Calculer le "total investi" de façon cohérente
        const totalInvested = getMarketCap(profile.id);

        // For creators that only exist in creatorProfiles, create placeholder data
        combinedCreators.push({
          id: profile.id,
          name: profile.name,
          imageUrl: profile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${profile.id}`,
          category: determineCategory(profile.id),
          // Helper function to assign random category
          investorsCount: Math.floor(profile.followers / 15),
          totalInvested: totalInvested,
          monthlyRevenue: profile.monthlyRevenue,
          returnRate: profile.returnRate
        });
      }
    });
    setAllCreators(combinedCreators);
    
    // Créer un ordre aléatoire fixe pour le tri 'random' qui ne change pas à l'actualisation
    if (shuffledOrder.length === 0) {
      const shuffled = [...combinedCreators].sort(() => Math.random() - 0.5).map(c => c.id);
      setShuffledOrder(shuffled);
    }
  }, [shuffledOrder.length]);

  // Helper function to deterministically assign a category based on creator ID
  const determineCategory = (id: string): string => {
    const categories = ['Fitness', 'Lifestyle', 'Mode', 'Photographie', 'Cuisine', 'Tech'];
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return categories[sum % categories.length];
  };
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowDropdown(false);
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'random': return 'Aléatoire';
      case 'performance': return 'Top Performance';
      case 'marketcap': return 'Top Market Cap';
      case 'popularity': return 'Popularité';
      case 'return': return 'Rendement';
      case 'alphabetical': return 'Alphabétique';
      default: return 'Aléatoire';
    }
  };

  const filteredCreators = allCreators.sort((a, b) => {
    switch (sortBy) {
      case 'random':
        // Utiliser l'ordre aléatoire fixe
        const indexA = shuffledOrder.indexOf(a.id);
        const indexB = shuffledOrder.indexOf(b.id);
        return indexA - indexB;
      case 'popularity':
        return b.investorsCount - a.investorsCount;
      case 'return':
        return b.returnRate - a.returnRate;
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'performance':
        const variationA = getLastVariation(a.id);
        const variationB = getLastVariation(b.id);
        return variationB - variationA; // Du plus positif au plus négatif
      case 'marketcap':
        return b.totalInvested - a.totalInvested; // Du plus gros au plus petit
      default:
        // Utiliser l'ordre aléatoire fixe par défaut
        const defaultIndexA = shuffledOrder.indexOf(a.id);
        const defaultIndexB = shuffledOrder.indexOf(b.id);
        return defaultIndexA - defaultIndexB;
    }
  });
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="w-full px-6">
            <FadeIn direction="up" className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-yellow-300">Découvrez nos créatrices</h1>
              
            </FadeIn>
            
            <FadeIn direction="up" delay={150} className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredCreators.length} {filteredCreators.length > 1 ? 'créatrices' : 'créatrice'}
                </p>
                
                {/* Dropdown pour le filtre */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleSortChange('random')}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${sortBy === 'random' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''}`}
                        >
                          Aléatoire
                        </button>
                        <button
                          onClick={() => handleSortChange('performance')}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${sortBy === 'performance' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''}`}
                        >
                          Top Performance
                        </button>
                        <button
                          onClick={() => handleSortChange('marketcap')}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${sortBy === 'marketcap' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''}`}
                        >
                          Top Market Cap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
              {filteredCreators.map((creator, index) => <FadeIn key={creator.id} direction="up" delay={100 + index % 8 * 50}>
                  <CreatorCard id={creator.id} name={creator.name} imageUrl={creator.imageUrl} category={creator.category} investorsCount={creator.investorsCount} totalInvested={creator.totalInvested} monthlyRevenue={creator.monthlyRevenue} size="normal" />
                </FadeIn>)}
            </div>
            
            {filteredCreators.length === 0 && <FadeIn direction="up" className="text-center py-16">
                <div className="text-gray-400 mb-3">
                  <Search className="h-12 w-12 mx-auto opacity-30" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucune créatrice trouvée</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Aucune créatrice n'est disponible pour le moment.
                </p>
              </FadeIn>}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Creators;