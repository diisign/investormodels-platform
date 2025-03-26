
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';

interface HeroSectionProps {
  scrollToCreators: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToCreators }) => {
  const { isAuthenticated } = useAuth();

  return (
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
              Investissez dans les <span className="creatrices-highlight">créatrices</span> <span className="createur-performant-gradient">les plus performantes.</span>
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
          
          {/* Chart section */}
          <FadeIn className="flex justify-center lg:justify-end" direction="up" delay={200}>
            <div className="relative w-full max-w-md">
              <OnlyfansRevenueChart />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
