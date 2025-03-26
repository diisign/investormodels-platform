
import React, { useState } from 'react';
import { Search, Filter, ArrowDownAZ, TrendingUp, Users } from 'lucide-react';
import CreatorCard from '@/components/ui/CreatorCard';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { creators } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';

type SortOption = 'popularity' | 'return' | 'alphabetical';

// Generate deterministic expected return rate based on creator ID (must match CreatorCard and CreatorDetails)
const getExpectedReturnRate = (creatorId: string): number => {
  const lastChar = creatorId.charAt(creatorId.length - 1);
  const charCode = lastChar.charCodeAt(0);
  return 80 + (charCode % 51);
};

// Get a deterministic monthly revenue value between 30,000 and 100,000 (must match CreatorCard)
const getMonthlyRevenue = (creatorId: string): number => {
  const firstChar = creatorId.charAt(0);
  const secondChar = creatorId.charAt(1) || 'a';
  const seedValue = (firstChar.charCodeAt(0) + secondChar.charCodeAt(0)) % 100;
  const baseValue = 30000 + (seedValue * 700);
  return baseValue + (seedValue % 987);
};

const Creators = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Filter and sort creators
  const filteredCreators = creators
    .filter(creator => {
      // Apply search filter
      const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           creator.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'popularity':
          return b.investorsCount - a.investorsCount;
        case 'return':
          return getExpectedReturnRate(b.id) - getExpectedReturnRate(a.id);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Découvrez nos créatrices</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                Parcourez notre sélection de créatrices talentueuses et investissez dans celles qui vous inspirent. Diversifiez votre portefeuille tout en soutenant le contenu que vous aimez.
              </p>
            </FadeIn>
            
            {/* Search and Filters Bar */}
            <FadeIn direction="up" delay={100} className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher une créatrice..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="input-field pl-10 w-full"
                    />
                  </div>
                  
                  {/* Sort and Filter Buttons */}
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={toggleFilters}
                      >
                        <Filter className="h-5 w-5 mr-2" />
                        <span>Filtres</span>
                      </button>
                      
                      {/* Filter Dropdown */}
                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 z-10 animate-scale-in origin-top-right">
                          <div className="p-4">
                            <h4 className="font-semibold mb-3">Trier par</h4>
                            <div className="space-y-2">
                              <button 
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-lg flex items-center",
                                  sortBy === 'popularity' 
                                    ? "bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                                onClick={() => handleSortChange('popularity')}
                              >
                                <Users className="h-4 w-4 mr-2" />
                                <span>Popularité</span>
                              </button>
                              <button 
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-lg flex items-center",
                                  sortBy === 'return' 
                                    ? "bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                                onClick={() => handleSortChange('return')}
                              >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                <span>Rendement</span>
                              </button>
                              <button 
                                className={cn(
                                  "w-full text-left px-3 py-2 rounded-lg flex items-center",
                                  sortBy === 'alphabetical' 
                                    ? "bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                                onClick={() => handleSortChange('alphabetical')}
                              >
                                <ArrowDownAZ className="h-4 w-4 mr-2" />
                                <span>Alphabétique</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Active Filters */}
                {(searchTerm || sortBy !== 'popularity') && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sortBy !== 'popularity' && (
                      <div className="bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400 text-sm rounded-full px-3 py-1 flex items-center">
                        <span>Tri: {
                          sortBy === 'return' ? 'Rendement' :
                          sortBy === 'alphabetical' ? 'Alphabétique' : 'Popularité'
                        }</span>
                        <button 
                          className="ml-2 hover:text-investment-800"
                          onClick={() => handleSortChange('popularity')}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    {searchTerm && (
                      <div className="bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400 text-sm rounded-full px-3 py-1 flex items-center">
                        <span>Recherche: {searchTerm}</span>
                        <button 
                          className="ml-2 hover:text-investment-800"
                          onClick={() => setSearchTerm('')}
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    <button 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
                      onClick={() => {
                        setSearchTerm('');
                        setSortBy('popularity');
                      }}
                    >
                      Réinitialiser tous les filtres
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>
            
            {/* Results Info */}
            <FadeIn direction="up" delay={150} className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredCreators.length} {filteredCreators.length > 1 ? 'créatrices' : 'créatrice'} {searchTerm && `correspondant à "${searchTerm}"`}
                </p>
              </div>
            </FadeIn>
            
            {/* Creators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.map((creator, index) => {
                // Get the consistent monthly revenue for this creator
                const monthlyRevenue = getMonthlyRevenue(creator.id);
                
                return (
                  <FadeIn key={creator.id} direction="up" delay={100 + (index % 8) * 50}>
                    <CreatorCard
                      id={creator.id}
                      name={creator.name}
                      imageUrl={creator.imageUrl}
                      category={creator.category}
                      investorsCount={creator.investorsCount}
                      totalInvested={creator.totalInvested}
                      monthlyRevenue={monthlyRevenue}
                    />
                  </FadeIn>
                );
              })}
            </div>
            
            {/* No Results */}
            {filteredCreators.length === 0 && (
              <FadeIn direction="up" className="text-center py-16">
                <div className="text-gray-400 mb-3">
                  <Search className="h-12 w-12 mx-auto opacity-30" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Nous n'avons trouvé aucune créatrice correspondant à votre recherche. Essayez avec d'autres termes ou filtres.
                </p>
              </FadeIn>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Creators;
