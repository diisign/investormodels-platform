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
  const [sortBy, setSortBy] = useState<SortOption>('performance'); // Default to 'performance'
  const [showDropdown, setShowDropdown] = useState(false);
  const [allCreators, setAllCreators] = useState<ConsolidatedCreator[]>([]);
  const [sortedCreators, setSortedCreators] = useState<ConsolidatedCreator[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  useEffect(() => {
    // Combine creators from mockData and creatorProfiles
    const combinedCreators: ConsolidatedCreator[] = [];

    // Add creators from mockData
    creators.forEach(creator => {
      const profile = getCreatorProfile(creator.id);
      if (profile) {
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
          returnRate: profile.returnRate || 0
        });
      }
    });

    // Add additional creators from creatorProfiles that aren't already in combinedCreators
    Object.values(creatorProfiles).forEach(profile => {
      if (profile && !combinedCreators.some(c => c.id === profile.id)) {
        // Calculer le "total investi" de façon cohérente
        const totalInvested = getMarketCap(profile.id);

        // For creators that only exist in creatorProfiles, create placeholder data
        combinedCreators.push({
          id: profile.id,
          name: profile.name,
          imageUrl: profile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${profile.id}`,
          category: determineCategory(profile.id),
          // Helper function to assign random category
          investorsCount: Math.floor((profile.followers || 1000) / 15),
          totalInvested: totalInvested,
          monthlyRevenue: profile.monthlyRevenue,
          returnRate: profile.returnRate || 0
        });
      }
    });
    setAllCreators(combinedCreators);

    // Créer un ordre aléatoire fixe qui persiste même en naviguant entre les pages
    let shuffled: string[];
    const savedOrder = localStorage.getItem('creators-shuffle-order-v2');
    if (savedOrder && shuffledOrder.length === 0) {
      // Utiliser l'ordre sauvegardé
      shuffled = JSON.parse(savedOrder);
      setShuffledOrder(shuffled);
    } else if (shuffledOrder.length === 0) {
      // Créer un nouvel ordre aléatoire et le sauvegarder
      shuffled = [...combinedCreators].sort(() => Math.random() - 0.5).map(c => c.id);
      setShuffledOrder(shuffled);
      localStorage.setItem('creators-shuffle-order-v2', JSON.stringify(shuffled));
    } else {
      shuffled = shuffledOrder;
    }

    // Définir l'ordre initial (mix aléatoire avec plus de variations positives en haut)
    if (sortedCreators.length === 0) {
      // Vérifier s'il y a un ordre sauvegardé
      const savedSortedOrder = localStorage.getItem('creators-sorted-order-v3');
      if (savedSortedOrder) {
        try {
          const savedIds = JSON.parse(savedSortedOrder);
          const restoredOrder = savedIds.map((id: string) => combinedCreators.find(c => c.id === id)).filter(Boolean);

          // Ajouter les nouveaux créateurs qui ne sont pas dans l'ordre sauvegardé
          const newCreators = combinedCreators.filter(c => !savedIds.includes(c.id));
          setSortedCreators([...restoredOrder, ...newCreators]);
          return;
        } catch (e) {
          // Si erreur de parsing, recalculer l'ordre
          console.warn('Erreur lors du chargement de l\'ordre sauvegardé');
        }
      }

      // Calculer un nouvel ordre
      const positiveVariations = combinedCreators.filter(c => getLastVariation(c.id) > 0);
      const smallNegativeVariations = combinedCreators.filter(c => {
        const variation = getLastVariation(c.id);
        return variation <= 0 && variation >= -5; // Seulement les petites variations négatives
      });
      const largeNegativeVariations = combinedCreators.filter(c => {
        const variation = getLastVariation(c.id);
        return variation < -5; // Grosses variations négatives à placer plus bas
      });

      // Mélanger les créatrices avec variations positives
      const shuffledPositive = [...positiveVariations].sort(() => Math.random() - 0.5);
      // Mélanger les créatrices avec petites variations négatives
      const shuffledSmallNegative = [...smallNegativeVariations].sort(() => Math.random() - 0.5);
      // Mélanger les créatrices avec grosses variations négatives
      const shuffledLargeNegative = [...largeNegativeVariations].sort(() => Math.random() - 0.5);

      // Créer un mix: 85% de positives en haut, 15% de petites négatives, grosses négatives à la fin
      const initialSorted = [];
      let positiveIndex = 0;
      let smallNegativeIndex = 0;

      // Première partie: mix positives et petites négatives
      const topCount = Math.min(20, combinedCreators.length); // Les 20 premiers ou moins
      for (let i = 0; i < topCount; i++) {
        // 85% de chances de prendre une positive si disponible
        const shouldTakePositive = Math.random() < 0.85 && positiveIndex < shuffledPositive.length || smallNegativeIndex >= shuffledSmallNegative.length;
        if (shouldTakePositive && positiveIndex < shuffledPositive.length) {
          initialSorted.push(shuffledPositive[positiveIndex]);
          positiveIndex++;
        } else if (smallNegativeIndex < shuffledSmallNegative.length) {
          initialSorted.push(shuffledSmallNegative[smallNegativeIndex]);
          smallNegativeIndex++;
        }
      }

      // Ajouter le reste des positives
      while (positiveIndex < shuffledPositive.length) {
        initialSorted.push(shuffledPositive[positiveIndex]);
        positiveIndex++;
      }

      // Ajouter le reste des petites négatives
      while (smallNegativeIndex < shuffledSmallNegative.length) {
        initialSorted.push(shuffledSmallNegative[smallNegativeIndex]);
        smallNegativeIndex++;
      }

      // Ajouter les grosses variations négatives à la fin
      initialSorted.push(...shuffledLargeNegative);

      // Sauvegarder l'ordre calculé
      const sortedIds = initialSorted.map(c => c.id);
      localStorage.setItem('creators-sorted-order-v3', JSON.stringify(sortedIds));
      setSortedCreators(initialSorted);
    }
  }, [shuffledOrder.length, sortedCreators.length]);

  // Helper function to assign specific categories based on creator profiles
  const determineCategory = (id: string): string => {
    // Specific category assignments based on creator profiles and descriptions
    const categoryMap: Record<string, string> = {
      // Fitness - Sport, danse, bien-être physique
      "brooks-mills-🍒": "Fitness",
      // Lifestyle et fitness
      "creator3": "Fitness",
      // Danseuse professionnelle et chorégraphe
      "creator2": "Fitness",
      // Maria avec emoji gymnastique

      // Glamour - Mode, haute couture, mannequinat, luxe
      "aishah": "Glamour",
      // Modèle internationale, mode haute couture
      "creator25": "Glamour",
      // Natalie - Mannequin et actrice, marques de luxe
      "brookmills": "Glamour",
      // Luna - Top model internationale et célébrité
      "creator1": "Glamour",
      // Emma - Influenceuse mode asiatique
      "creator17": "Glamour",
      // Victoria avec emoji rouge à lèvres
      "creator26": "Glamour",
      // Kim
      "creator19": "Glamour",
      // Zoe avec emoji rose

      // Lifestyle - Beauté, cuisine, bien-être, quotidien
      "creator22": "Lifestyle",
      // Jasmine - Experte beauté et maquilleuse
      "creator20": "Lifestyle",
      // Melanie - Chef pâtissière et contenu culinaire
      "creator10": "Lifestyle",
      // Elizabeth - Vétérinaire bien-être animal
      "creator21": "Lifestyle",
      // Samantha
      "creator24": "Lifestyle",
      // Julia
      "creator13": "Lifestyle",
      // Charlotte
      "creator29": "Lifestyle",
      // Quinn
      "creator28": "Lifestyle",
      // Wendy

      // Cosplay - Contenu créatif, jeux de rôle, personnages
      "creator6": "Cosplay",
      // Bryce's Flix - contenu vidéo/film
      "creator11": "Cosplay",
      // Isabella Santos
      "creator12": "Cosplay",
      // Autumn ren avec emoji nœud
      "creator14": "Cosplay",
      // Audrey Shanice
      "creator16": "Cosplay",
      // Sophia Rose
      "creator4": "Cosplay",
      // Lala Avi
      "creator5": "Cosplay",
      // Antonella
      "creator8": "Cosplay",
      // Bianca
      "creator9": "Cosplay",
      // Ariana Colombian
      "creator7": "Cosplay",
      // Daisy
      "creator18": "Cosplay",
      // Nina
      "creator27": "Cosplay",
      // Hannah
      "creator23": "Cosplay" // Isabel
    };

    // If we have a specific category for this creator, return it
    if (categoryMap[id]) {
      return categoryMap[id];
    }

    // Fallback: use deterministic assignment for any other creators
    const categories = ['Glamour', 'Cosplay', 'Fitness', 'Lifestyle'];
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return categories[sum % categories.length];
  };
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowDropdown(false);

    // Appliquer le tri immédiatement et le stocker
    const sorted = [...allCreators].sort((a, b) => {
      switch (option) {
        case 'random':
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
          return variationB - variationA;
        case 'marketcap':
          return b.totalInvested - a.totalInvested;
        default:
          const defaultIndexA = shuffledOrder.indexOf(a.id);
          const defaultIndexB = shuffledOrder.indexOf(b.id);
          return defaultIndexA - defaultIndexB;
      }
    });
    setSortedCreators(sorted);
  };
  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'random':
        return 'Aléatoire';
      case 'performance':
        return 'Top Performance';
      case 'marketcap':
        return 'Top Market Cap';
      case 'popularity':
        return 'Popularité';
      case 'return':
        return 'Rendement';
      case 'alphabetical':
        return 'Alphabétique';
      default:
        return 'Aléatoire';
    }
  };

  // Utiliser sortedCreators au lieu de calculer le tri à chaque render
  const filteredCreators = sortedCreators.length > 0 ? sortedCreators : allCreators;
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="w-full px-6">
            <FadeIn direction="up" className="mb-8">
              <h1 className="mb-2 text-yellow-400 text-2xl font-bold text-center">Découvrez nos créatrices</h1>
              
            </FadeIn>
            
            <FadeIn direction="up" delay={150} className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredCreators.length} {filteredCreators.length > 1 ? 'créatrices' : 'créatrice'}
                </p>
                
                {/* Dropdown pour le filtre */}
                
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