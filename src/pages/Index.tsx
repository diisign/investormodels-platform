import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Users, Zap, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import CreatorCard from '@/components/ui/CreatorCard';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { creators } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/auth';
import { useIsMobile, useScreenSize } from '@/hooks/use-mobile';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';
import { getCreatorProfile, creatorProfiles, calculateTotalInvested } from '@/utils/creatorProfiles';
import TopAffiliates from '@/components/affiliations/TopAffiliates';

const trustpilotReviews = [
  { 
    id: 1, 
    name: "Sophie M.", 
    rating: 5, 
    comment: "Une plateforme révolutionnaire ! J'ai diversifié mon portefeuille avec des rendements impressionnants.", 
    style: "font-normal"
  },
  { 
    id: 2, 
    name: "Thomas L.", 
    rating: 5, 
    comment: "Interface intuitive et support client exceptionnel. Mes investissements ont augmenté de 120% en trois mois!!! INCROYABLE", 
    style: "font-bold"
  },
  { 
    id: 3, 
    name: "Emma R.", 
    rating: 4, 
    comment: "Excellente plateforme pour investir dans un secteur innovant. Très satisfaite des résultats.", 
    style: "italic"
  },
  { 
    id: 4, 
    name: "Lucas D.", 
    rating: 5, 
    comment: "Jamais je n'aurais pensé obtenir de tels rendements. Merci pour cette opportunité unique.", 
    style: "font-light"
  },
  { 
    id: 5, 
    name: "Julien M.", 
    rating: 5, 
    comment: "J'ADORE!!! TOP TOP TOP! Des revenus ÉNORMES après seulement quelques mois! À découvrir ABSOLUMENT!", 
    style: "uppercase text-sm"
  },
  { 
    id: 6, 
    name: "Marie-Claire R.", 
    rating: 4, 
    comment: "Après quelques hésitations, j'ai franchi le pas... et je ne regrette pas du tout mon choix. Des rendements solides et réguliers.", 
    style: "font-serif"
  },
  { 
    id: 7, 
    name: "Alexandre P.", 
    rating: 5, 
    comment: "Plus que doublé ma mise en 3 mois seulement, je recommande fortement!!!", 
    style: "tracking-tight"
  },
  { 
    id: 8, 
    name: "Nathalie T.", 
    rating: 4, 
    comment: "Service client réactif, plateforme sécurisée et rendements au rendez-vous. Que demander de plus?", 
    style: "tracking-wide"
  },
  { 
    id: 9, 
    name: "Pierre B.", 
    rating: 5, 
    comment: "Un investissement intelligent qui a dépassé toutes mes attentes. Rentabilité remarquable en un temps record.", 
    style: "font-medium"
  },
  { 
    id: 10, 
    name: "Clara M.", 
    rating: 5, 
    comment: "J'ai été impressionnée par la transparence et la performance. Un véritable coup de cœur pour cette plateforme innovante!", 
    style: "italic"
  }
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  const creatorsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { width } = useScreenSize();

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const allCreators = [...creators];
  
  Object.values(creatorProfiles).forEach(profile => {
    if (!profile.hidden && !allCreators.some(c => c.id === profile.id)) {
      const totalInvested = calculateTotalInvested(profile.monthlyRevenue);
      
      allCreators.push({
        id: profile.id,
        name: profile.name,
        imageUrl: profile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${profile.id}`,
        coverImageUrl: 'https://images.unsplash.com/photo-1616096142563-ce1506e232ce?q=80&w=2070&auto=format&fit=crop',
        category: "Lifestyle",
        returnRate: profile.returnRate,
        investorsCount: Math.floor(profile.followers / 15),
        totalInvested: totalInvested,
        monthlyRevenue: profile.monthlyRevenue,
        followers: profile.followers,
        creationDate: new Date().toISOString().split('T')[0],
        description: "",
        plans: []
      });
    }
  });
  
  const topCreators = [...allCreators]
    .map(creator => {
      const profile = getCreatorProfile(creator.id);
      return { 
        ...creator, 
        returnRate: profile.returnRate,
        totalInvested: creator.totalInvested
      };
    })
    .sort((a, b) => b.returnRate - a.returnRate)
    .slice(0, 10);

  const slidesPerView = width < 640 ? 3 : width < 768 ? 3 : width < 1024 ? 3 : 4;

  // Function to handle navigation to affiliation page and scroll to top
  const handleAffiliationClick = (e: React.MouseEvent) => {
    // We'll use window.scrollTo after navigation to ensure scrolling to top
    sessionStorage.setItem('scrollToTop', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow pt-16 md:pt-20">
        <section className="relative overflow-hidden pb-12 md:pb-20 pt-16 md:pt-24 lg:pt-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[10%] -right-[10%] z-0 h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-gradient-to-tr from-investment-200/40 to-investment-400/20 blur-3xl"></div>
            <div className="absolute -bottom-[20%] -left-[10%] z-0 h-[300px] md:h-[600px] w-[300px] md:w-[600px] rounded-full bg-gradient-to-bl from-investment-200/30 to-investment-300/10 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn className="space-y-4 md:space-y-6" direction="up">
                <div className="inline-block rounded-full bg-investment-50 dark:bg-investment-900/20 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 mb-3 md:mb-4">
                  <span className="text-[#8B5CF6]">Nouvelle façon d'investir</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Investissez dans les <span className="text-[#8B5CF6]">créatrices OnlyFans.</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                  Notre plateforme vous permet d'investir directement dans les créatrices de contenu et de partager leurs revenus. Diversifiez votre portefeuille avec une nouvelle classe d'actifs <span className="font-bold text-investment-600">très rentable</span>.
                </p>
                
                <div className="pt-2">
                  {isAuthenticated ? (
                    <button onClick={scrollToCreators}>
                      <GradientButton 
                        size={isMobile ? "default" : "lg"}
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
                        gradientDirection="to-r"
                        className="from-teal-400 to-blue-500 text-white"
                      >
                        Commencer maintenant
                      </GradientButton>
                    </button>
                  ) : (
                    <Link to="/login">
                      <GradientButton 
                        size={isMobile ? "default" : "lg"}
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
                        gradientDirection="to-r"
                        className="from-teal-400 to-blue-500 text-white"
                      >
                        Commencer maintenant
                      </GradientButton>
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4 md:pt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">250+</span>
                    <span className="text-sm text-gray-500">Créatrices</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">20K+</span>
                    <span className="text-sm text-gray-500">Investisseurs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">7M €</span>
                    <span className="text-sm text-gray-500">Investis</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        <section ref={creatorsRef} className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <FadeIn className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12" direction="up">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-[#8B5CF6]">
                  Top créatrices
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Découvrez les créatrices avec les rendements prévus les plus élevés.
                </p>
              </div>
              <Link to="/creators" className="hidden md:flex items-center text-[#8B5CF6] hover:text-[#7c4ce6] font-medium mt-4 md:mt-0">
                <span>Voir toutes les créatrices</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={100}>
              <div className="relative px-8 md:px-12 pb-6 md:pb-10">
                <Carousel 
                  opts={{
                    align: "center",
                    loop: true
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {topCreators.map((creator, index) => {
                      const creatorProfile = getCreatorProfile(creator.id);
                      
                      return (
                        <CarouselItem key={creator.id} className={`pl-2 md:pl-4 basis-1/${slidesPerView}`}>
                          <div className="p-1">
                            <CreatorCard
                              id={creator.id}
                              name={creator.name || creatorProfile.name}
                              imageUrl={creator.imageUrl}
                              category={creator.category}
                              investorsCount={creator.investorsCount}
                              totalInvested={creator.totalInvested}
                              monthlyRevenue={creatorProfile.monthlyRevenue}
                              rank={index + 1}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="-left-2 md:-left-6 h-9 w-9 rounded-full" />
                  <CarouselNext className="-right-2 md:-right-6 h-9 w-9 rounded-full" />
                </Carousel>
              </div>
            </FadeIn>
            
            <div className="mt-8 md:mt-12 text-center md:hidden">
              <Link to="/creators">
                <GradientButton 
                  variant="outline" 
                  className="text-[#8B5CF6] border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                >
                  Voir toutes les créatrices
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Top Affiliés Section - Nouvelle section */}
        <section className="py-10 md:py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FadeIn className="max-w-3xl mx-auto mb-8" direction="up">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Nos <span className="text-investment-600">Meilleurs Parrains</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center">
                Ils ont recommandé notre plateforme et ont généré des revenus exceptionnels. Pourquoi pas vous ?
              </p>
            </FadeIn>
            
            <div className="max-w-3xl mx-auto">
              <TopAffiliates />
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/affiliation" onClick={handleAffiliationClick}>
                <GradientButton 
                  size="default"
                  variant="outline"
                  className="text-investment-600 border-investment-600 hover:bg-investment-50"
                >
                  Rejoindre le programme d'affiliation
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FadeIn className="max-w-3xl mx-auto mb-10" direction="up">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                Un Marché en <span className="text-investment-600">Pleine Expansion</span>
              </h2>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center">
                  OnlyFans connaît une croissance explosive depuis sa création, avec des revenus qui ont été multipliés par plus de 10 en seulement 4 ans.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-investment-600 mb-1">4.5M+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Créateurs actifs</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-investment-600 mb-1">1.6B$</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CA en 2024</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-investment-600 mb-1">+150%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Croissance annuelle</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn className="w-fit mx-auto" direction="up" delay={100}>
              <OnlyfansRevenueChart />
            </FadeIn>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-3xl mx-auto mb-10 md:mb-12" direction="up">
              <div className="flex items-center justify-center gap-1 mb-4">
                <div className="bg-[#00b67a] text-white px-2 py-1 rounded">
                  <span className="font-bold">Trustpilot</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={cn(
                        "h-5 w-5 fill-current", 
                        star <= 4 ? "text-[#00b67a]" : "", 
                        star === 5 ? "text-[#00b67a] fill-[#00b67a]/70" : ""
                      )} 
                    />
                  ))}
                </div>
                <span className="font-bold text-[#00b67a]">4.7/5</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Ce que disent <span className="text-investment-600">nos utilisateurs</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                Rejoignez plus de 20 000 investisseurs satisfaits qui ont déjà fait confiance à notre plateforme.
              </p>
            </FadeIn>
            
            <div className="relative px-4 md:px-10 pb-12">
              <Carousel 
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {trustpilotReviews.map((review) => (
                    <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <FadeIn 
                        className="bg-white dark:bg-gray-800 h-full rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" 
                        direction="up"
                      >
                        <div className="flex items-center mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={cn(
                                "h-4 w-4 fill-current", 
                                star <= review.rating ? "text-[#00b67a]" : "text-gray-300 dark:text-gray-600"
                              )} 
                            />
                          ))}
                        </div>
                        <p className={cn("text-gray-700 dark:text-gray-300 mb-4", review.style)}>"{review.comment}"</p>
                        <div className="text-sm font-medium mt-auto">{review.name}</div>
                      </FadeIn>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2 md:-left-6 h-9 w-9 rounded-full" />
                <CarouselNext className="-right-2 md:-right-6 h-9 w-9 rounded-full" />
              </Carousel>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-3xl mx-auto mb-10 md:mb-16" direction="up">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Plateforme <span className="text-investment-600">visionnaire</span> unique au monde
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                Découvrez pourquoi de plus en plus d'investisseurs nous font confiance pour diversifier leur portefeuille.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={100}>
                <div className="h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-3 md:mb-5">
                  <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-3">Rendements attractifs</h3>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-300">
                  Nos créatrices offrent des rendements moyens de 80% à 150% par trimestre.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={200}>
                <div className="h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-3 md:mb-5">
                  <Users className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-3">Diversité des créatrices</h3>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-300">
                  Plus de 250 créatrices de contenu avec statistique détaillé sur du long terme.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={300}>
                <div className="h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-3 md:mb-5">
                  <ShieldCheck className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-3">Sécurité maximale</h3>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-300">
                  Toutes les créatrices sont recrutés sous certains critère spéciaux pour vous proposez les plus performantes.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={400}>
                <div className="h-9 w-9 md:h-12 md:w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-3 md:mb-5">
                  <Zap className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-3">Investissement facile</h3>
                <p className="text-xs md:text-base text-gray-600 dark:text-gray-300">
                  Interface intuitive et processus simplifié pour investir en quelques clics, même pour les débutants.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
