import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Users, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
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

const Index = () => {
  const { isAuthenticated } = useAuth();
  const creatorsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { width } = useScreenSize();

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const slidesPerView = width < 640 ? 2 : width < 768 ? 2 : width < 1024 ? 3 : 4;

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <FadeIn className="space-y-4 md:space-y-6" direction="up">
                <div className="inline-block rounded-full bg-investment-50 dark:bg-investment-900/20 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 mb-3 md:mb-4">
                  <span className="text-[#8B5CF6]">Nouvelle façon d'investir</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Investissez dans les <span className="text-[#8B5CF6]">créatrices les plus performantes.</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Notre plateforme vous permet d'investir directement dans les créatrices de contenu et de partager leur succès. Diversifiez votre portefeuille avec une nouvelle classe d'actifs <span className="font-bold text-investment-600">très rentable</span>.
                </p>
                
                <div className="pt-2">
                  {isAuthenticated ? (
                    <button onClick={scrollToCreators}>
                      <GradientButton 
                        size={isMobile ? "default" : "lg"}
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
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
                      >
                        Commencer maintenant
                      </GradientButton>
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-4 md:pt-6">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">250+</span>
                    <span className="text-sm text-gray-500">Créatrices</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">20K+</span>
                    <span className="text-sm text-gray-500">Investisseurs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-investment-600">7M €</span>
                    <span className="text-sm text-gray-500">Investis</span>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn className="flex justify-center lg:justify-end mt-8 lg:mt-0" direction="up" delay={200}>
                <div className="w-full max-w-md lg:max-w-lg mx-auto">
                  <OnlyfansRevenueChart />
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
                  Découvrez les créatrices les plus performantes de notre plateforme.
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
                    {creators.map((creator, index) => (
                      <CarouselItem key={creator.id} className={`pl-2 md:pl-4 basis-1/${slidesPerView}`}>
                        <div className="p-1">
                          <CreatorCard
                            id={creator.id}
                            name={creator.name}
                            imageUrl={creator.imageUrl}
                            category={creator.category}
                            investorsCount={creator.investorsCount}
                            totalInvested={creator.totalInvested}
                          />
                        </div>
                      </CarouselItem>
                    ))}
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
