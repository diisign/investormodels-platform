
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Users, Zap } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import CreatorCard from '@/components/ui/CreatorCard';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { creators } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const Home = () => {
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
                <div className="inline-block rounded-full bg-investment-50 dark:bg-investment-900/20 px-3 py-1 text-sm font-medium text-investment-800 dark:text-investment-300 mb-4">
                  Nouvelle façon d'investir
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Investissez dans les <span className="text-gradient">créateurs</span> qui façonnent l'avenir
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Notre plateforme vous permet d'investir directement dans les créateurs de contenu et de partager leur succès. Diversifiez votre portefeuille avec une nouvelle classe d'actifs.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/register">
                    <GradientButton 
                      size="lg"
                      icon={<ArrowRight className="h-5 w-5" />}
                      iconPosition="right"
                    >
                      Commencer maintenant
                    </GradientButton>
                  </Link>
                  <Link to="/how-it-works">
                    <GradientButton 
                      variant="outline" 
                      size="lg"
                    >
                      Comment ça marche
                    </GradientButton>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-8 pt-6">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">250+</span>
                    <span className="text-sm text-gray-500">Créateurs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">12K+</span>
                    <span className="text-sm text-gray-500">Investisseurs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-investment-600">5M €</span>
                    <span className="text-sm text-gray-500">Investis</span>
                  </div>
                </div>
              </FadeIn>
              
              {/* Hero Image */}
              <FadeIn className="flex justify-center lg:justify-end" direction="up" delay={200}>
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-investment-500 to-investment-600 rounded-2xl blur opacity-30 animate-pulse-light"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=2021&auto=format&fit=crop" 
                      alt="Creators investing platform" 
                      className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="flex flex-col text-white">
                        <span className="text-sm opacity-80">Investissement populaire</span>
                        <span className="text-xl font-semibold">Emma Wilson</span>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-sm bg-green-500/20 text-green-400 rounded-full px-2 py-0.5">+11.2% ROI</span>
                          <span className="text-sm">372 investisseurs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-3xl mx-auto mb-16" direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Avantages uniques de notre plateforme
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Découvrez pourquoi de plus en plus d'investisseurs nous font confiance pour diversifier leur portefeuille.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={100}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 mb-5">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rendements attractifs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nos créateurs offrent des rendements moyens de 8% à 15% par an, surpassant les placements traditionnels.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={200}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Diversité de créateurs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Plus de 250 créateurs de contenu dans différentes catégories pour diversifier votre portefeuille.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={300}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sécurité maximale</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tous les investissements sont sécurisés par des contrats transparents et un système de surveillance avancé.
                </p>
              </FadeIn>
              
              <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={400}>
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 mb-5">
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
        
        {/* Popular Creators Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeIn className="flex justify-between items-end mb-12" direction="up">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Créateurs populaires
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Découvrez les créateurs les plus populaires sur notre plateforme.
                </p>
              </div>
              <Link to="/creators" className="hidden md:flex items-center text-investment-600 hover:text-investment-700 font-medium">
                <span>Voir tous les créateurs</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </FadeIn>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {creators.slice(0, 3).map((creator, index) => (
                <FadeIn key={creator.id} direction="up" delay={100 * index}>
                  <CreatorCard
                    id={creator.id}
                    name={creator.name}
                    imageUrl={creator.imageUrl}
                    category={creator.category}
                    returnRate={creator.returnRate}
                    investorsCount={creator.investorsCount}
                    totalInvested={creator.totalInvested}
                  />
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link to="/creators">
                <GradientButton variant="outline">
                  Voir tous les créateurs
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-3xl mx-auto mb-16" direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comment ça marche
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Investir dans vos créateurs préférés n'a jamais été aussi simple.
              </p>
            </FadeIn>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 ml-[-1px] md:ml-0 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                
                {/* Steps */}
                <div className="space-y-12 md:space-y-24 relative">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <FadeIn className="md:w-1/2 md:text-right order-2 md:order-1" direction="right">
                      <h3 className="text-xl font-semibold mb-2">Créez votre compte</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Inscrivez-vous gratuitement en quelques secondes et complétez votre profil d'investisseur.
                      </p>
                    </FadeIn>
                    
                    <div className="flex items-center order-1 md:order-2 relative z-10">
                      <div className="h-8 w-8 rounded-full bg-investment-500 text-white flex items-center justify-center font-bold shadow-md">
                        1
                      </div>
                      <div className="md:hidden h-0.5 w-8 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block order-3"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="md:w-1/2 hidden md:block order-1"></div>
                    
                    <div className="flex items-center order-1 md:order-2 relative z-10">
                      <div className="h-8 w-8 rounded-full bg-investment-500 text-white flex items-center justify-center font-bold shadow-md">
                        2
                      </div>
                      <div className="md:hidden h-0.5 w-8 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <FadeIn className="md:w-1/2 order-2 md:order-3" direction="left">
                      <h3 className="text-xl font-semibold mb-2">Déposez des fonds</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ajoutez facilement de l'argent à votre compte via de multiples méthodes de paiement sécurisées.
                      </p>
                    </FadeIn>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <FadeIn className="md:w-1/2 md:text-right order-2 md:order-1" direction="right">
                      <h3 className="text-xl font-semibold mb-2">Choisissez vos créateurs</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Parcourez notre catalogue de créateurs, analysez leurs performances et sélectionnez ceux qui vous inspirent.
                      </p>
                    </FadeIn>
                    
                    <div className="flex items-center order-1 md:order-2 relative z-10">
                      <div className="h-8 w-8 rounded-full bg-investment-500 text-white flex items-center justify-center font-bold shadow-md">
                        3
                      </div>
                      <div className="md:hidden h-0.5 w-8 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block order-3"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="md:w-1/2 hidden md:block order-1"></div>
                    
                    <div className="flex items-center order-1 md:order-2 relative z-10">
                      <div className="h-8 w-8 rounded-full bg-investment-500 text-white flex items-center justify-center font-bold shadow-md">
                        4
                      </div>
                      <div className="md:hidden h-0.5 w-8 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <FadeIn className="md:w-1/2 order-2 md:order-3" direction="left">
                      <h3 className="text-xl font-semibold mb-2">Suivez vos investissements</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Surveillez les performances de vos investissements en temps réel et recevez des rapports détaillés sur vos rendements.
                      </p>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link to="/how-it-works">
                <GradientButton>
                  En savoir plus
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-investment-600 to-investment-400"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
              
              <div className="relative z-10 px-6 py-16 md:px-12 md:py-24 text-center">
                <FadeIn direction="up">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Prêt à investir dans l'avenir des créateurs ?
                  </h2>
                  <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                    Rejoignez des milliers d'investisseurs qui soutiennent déjà les créateurs de contenu tout en générant des rendements attractifs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/register">
                      <GradientButton 
                        variant="secondary"
                        size="lg"
                        icon={<ArrowRight className="h-5 w-5" />}
                        iconPosition="right"
                      >
                        Créer un compte
                      </GradientButton>
                    </Link>
                    <Link to="/creators">
                      <GradientButton 
                        variant="outline"
                        size="lg"
                        className="!bg-transparent !text-white !border-white hover:!bg-white/20"
                      >
                        Découvrir les créateurs
                      </GradientButton>
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
