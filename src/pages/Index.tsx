
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Users, Zap } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import CreatorCard from '@/components/ui/CreatorCard';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { creators } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/auth';
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

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={false} />
      
      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[10%] -right-[10%] z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-investment-200/40 to-investment-400/20 blur-3xl"></div>
            <div className="absolute -bottom-[20%] -left-[10%] z-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-investment-200/30 to-investment-300/10 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Hero Text */}
              <FadeIn className="space-y-6" direction="up">
                <div className="inline-block rounded-full bg-investment-50 dark:bg-investment-900/20 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
                  <span className="text-[#8B5CF6]">Nouvelle façon d'investir</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Investissez dans les <span className="text-gradient" style={{ 
                    background: 'linear-gradient(102.3deg, #8B5CF6 5.9%, #A78BFA 64%, #C4B5FD 89%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}>créatrices les plus performantes.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Notre plateforme vous permet d'investir directement dans les créatrices de contenu et de partager leur succès. Diversifiez votre portefeuille avec une nouvelle classe d'actifs <span className="font-bold text-investment-600">très rentable</span>.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {isAuthenticated ? (
                    <button onClick={scrollToCreators}>
                      <GradientButton 
                        size="lg"
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
                      >
                        Commencer maintenant
                      </GradientButton>
                    </button>
                  ) : (
                    <Link to="/login">
                      <GradientButton 
                        size="lg"
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
                      >
                        Commencer maintenant
                      </GradientButton>
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-8 pt-6">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">250+</span>
                    <span className="text-sm text-gray-500">Créatrices</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">20K+</span>
                    <span className="text-sm text-gray-500">Investisseurs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">7M €</span>
                    <span className="text-sm text-gray-500">Investis</span>
                  </div>
                </div>
              </FadeIn>
              
              {/* Remplacer l'image par le graphique OnlyFans */}
              <FadeIn className="flex justify-center lg:justify-end" direction="up" delay={200}>
                <div className="relative w-full max-w-md">
                  <OnlyfansRevenueChart />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Popular Creators Section - Now positioned above Features Section */}
        <section ref={creatorsRef} className="py-20">
          <div className="container mx-auto px-4">
            <FadeIn className="flex justify-between items-end mb-12" direction="up">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Top créatrices
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Découvrez les créatrices les plus performantes de notre plateforme.
                </p>
              </div>
              <Link to="/creators" className="hidden md:flex items-center text-[#8B5CF6] hover:text-[#7c4ce6] font-medium">
                <span>Voir toutes les créatrices</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </FadeIn>
            
            <FadeIn direction="up" delay={100}>
              <div className="relative px-10 pb-10">
                <Carousel 
                  opts={{
                    align: "start",
                    loop: true
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {creators.map((creator, index) => (
                      <CarouselItem key={creator.id} className="md:basis-1/3 lg:basis-1/4">
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
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            </FadeIn>
            
            <div className="mt-12 text-center md:hidden">
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
        
        {/* Features Section - Now positioned below Top Creators section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-3xl mx-auto mb-16" direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Plateforme <span className="text-investment-600">visionnaire</span> unique au monde
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Découvrez pourquoi de plus en plus d'investisseurs nous font confiance pour diversifier leur portefeuille.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={100}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-5">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rendements attractifs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nos créatrices offrent des rendements moyens de 80% à 150% par trimestre.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={200}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Diversité des créatrices</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Plus de 250 créatrices de contenu avec statistique détaillé sur du long terme.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={300}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sécurité maximale</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Toutes les créatrices sont recrutés sous certains critère spéciaux pour vous proposez les plus performantes.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={400}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-5">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Investissement facile</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interface intuitive et processus simplifié pour investir en quelques clics, même pour les débutants.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
