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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';
import { getCreatorProfile, creatorProfiles, calculateTotalInvested, getLastVariation } from '@/utils/creatorProfiles';
import TopAffiliates from '@/components/affiliations/TopAffiliates';
const trustpilotReviews = [{
  id: 1,
  name: "Sophie M.",
  rating: 5,
  comment: "Une plateforme révolutionnaire ! J'ai diversifié mon portefeuille avec des rendements impressionnants.",
  style: "font-normal"
}, {
  id: 2,
  name: "Thomas L.",
  rating: 5,
  comment: "Interface intuitive et support client exceptionnel. Mes investissements ont augmenté de 120% en trois mois!!! INCROYABLE",
  style: "font-bold"
}, {
  id: 3,
  name: "Emma R.",
  rating: 4,
  comment: "Excellente plateforme pour investir dans un secteur innovant. Très satisfaite des résultats.",
  style: "italic"
}, {
  id: 4,
  name: "Lucas D.",
  rating: 5,
  comment: "Jamais je n'aurais pensé obtenir de tels rendements. Merci pour cette opportunité unique.",
  style: "font-light"
}, {
  id: 5,
  name: "Julien M.",
  rating: 5,
  comment: "J'ADORE!!! TOP TOP TOP! Des revenus ÉNORMES après seulement quelques mois! À découvrir ABSOLUMENT!",
  style: "uppercase text-sm"
}, {
  id: 6,
  name: "Marie-Claire R.",
  rating: 4,
  comment: "Après quelques hésitations, j'ai franchi le pas... et je ne regrette pas du tout mon choix. Des rendements solides et réguliers.",
  style: "font-serif"
}, {
  id: 7,
  name: "Alexandre P.",
  rating: 5,
  comment: "Plus que doublé ma mise en 3 mois seulement, je recommande fortement!!!",
  style: "tracking-tight"
}, {
  id: 8,
  name: "Nathalie T.",
  rating: 4,
  comment: "Service client réactif, plateforme sécurisée et rendements au rendez-vous. Que demander de plus?",
  style: "tracking-wide"
}, {
  id: 9,
  name: "Pierre B.",
  rating: 5,
  comment: "Un investissement intelligent qui a dépassé toutes mes attentes. Rentabilité remarquable en un temps record.",
  style: "font-medium"
}, {
  id: 10,
  name: "Clara M.",
  rating: 5,
  comment: "J'ai été impressionnée par la transparence et la performance. Un véritable coup de cœur pour cette plateforme innovante!",
  style: "italic"
}];
const Index = () => {
  const {
    isAuthenticated
  } = useAuth();
  const creatorsRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef(Autoplay({
    delay: 5000,
    stopOnInteraction: true
  }));
  const isMobile = useIsMobile();
  const {
    width
  } = useScreenSize();
  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
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
  const topCreators = [...allCreators].map(creator => {
    const profile = getCreatorProfile(creator.id);
    const lastVariation = getLastVariation(creator.id);
    return {
      ...creator,
      returnRate: profile.returnRate,
      totalInvested: creator.totalInvested,
      lastVariation: lastVariation
    };
  }).filter(creator => creator.lastVariation > 0) // Filtrer seulement les variations positives
  .sort((a, b) => b.lastVariation - a.lastVariation) // Trier par variation décroissante
  .slice(0, 15);
  const slidesPerView = width < 640 ? 3 : width < 768 ? 3 : width < 1024 ? 3 : 4;

  // Function to handle navigation to affiliation page and scroll to top
  const handleAffiliationClick = (e: React.MouseEvent) => {
    // We'll use window.scrollTo after navigation to ensure scrolling to top
    sessionStorage.setItem('scrollToTop', 'true');
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow pt-16 md:pt-20">
        <section className="relative overflow-hidden pb-12 md:pb-20 pt-2 md:pt-4">
          <div className="absolute inset-0 overflow-hidden rounded bg-[purple-gradient-to] bg-transparent">
            
            
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Hero Images Carousel */}
            <FadeIn className="mb-6 md:mb-8" direction="up">
              <Carousel plugins={[autoplayRef.current]} opts={{
              align: "center",
              loop: true
            }} className="w-full max-w-4xl mx-auto">
                <CarouselContent className="ml-0">
                  <CarouselItem className="pl-0 basis-full">
                    <div className="w-full">
                      <img src="/lovable-uploads/2514697c-dfb3-4052-84c4-b137945dcc4c.png" alt="Sophie Rain - La Reine du Charme" className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-3xl shadow-lg" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="pl-0 basis-full">
                    <div className="w-full">
                      <img src="/lovable-uploads/deb40c28-305a-4ea7-9f10-3e994738d6cb.png" alt="7 Millions € de dividendes versés" className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-3xl shadow-lg" />
                    </div>
                  </CarouselItem>
                  <CarouselItem className="pl-0 basis-full">
                    <div className="w-full">
                      <img src="/lovable-uploads/d3dac32c-6d5b-475d-b1c9-bcd46bcae1e3.png" alt="Money Talk - J'ai investi 40 000€ sur Splitz" className="w-full h-64 md:h-96 lg:h-[500px] object-contain rounded-3xl shadow-lg bg-gray-900" />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </FadeIn>

            <div className="max-w-3xl mx-auto text-center mt-12 md:mt-16">
              <FadeIn className="space-y-4 md:space-y-6" direction="up">
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-zinc-950 xl:text-2xl">
                  Investissez dans les <span className="text-3xl text-yellow-300">créatrices OnlyFans.</span>
                </h1>
                
                
                <div className="pt-2 bg-transparent">
                  {isAuthenticated ? <button onClick={scrollToCreators}>
                      <GradientButton size={isMobile ? "default" : "lg"} icon={<ArrowRight className="h-5 w-5" />} iconPosition="right" gradientDirection="to-r" className="from-yellow-300 to-black text-white">
                        Commencer maintenant
                      </GradientButton>
                    </button> : <Link to="/login">
                      <GradientButton size={isMobile ? "default" : "lg"} icon={<ArrowRight className="h-5 w-5" />} iconPosition="right" gradientDirection="to-r" className="from-yellow-300 to-black text-white">
                        Commencer maintenant
                      </GradientButton>
                    </Link>}
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4 md:pt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-gray-950">50+</span>
                    <span className="text-sm text-gray-500">Créatrices</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-zinc-950">20K+</span>
                    <span className="text-sm text-gray-500">Investisseurs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-zinc-950">7M €</span>
                    <span className="text-sm text-gray-500">Investis</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        <section ref={creatorsRef} className="bg-transparent md:py-[40px] py-[25px]">
          <div className="container mx-auto px-4">
            <FadeIn className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12" direction="up">
              <div>
                <h2 className="md:text-3xl font-bold mb-3 md:mb-4 lg:text-3xl mx-0 px-0 py-0 my-0 text-center text-yellow-300 text-3xl">
                  Top créatrices
                </h2>
                
              </div>
              <Link to="/creators" className="hidden md:flex items-center text-[#8B5CF6] hover:text-[#7c4ce6] font-medium mt-4 md:mt-0">
                <span className="text-zinc-950">Voir toutes les créatrices</span>
                <ArrowRight className="h-4 w-4 ml-1 mx-[5px] bg-transparent" />
              </Link>
            </FadeIn>
          </div>
          
          <FadeIn direction="up" delay={100}>
            <div className="w-full pb-6 md:pb-10">
              <Carousel opts={{
              align: "start",
              loop: true
            }} className="w-full">
                <CarouselContent className="ml-0">
                  {topCreators.map((creator, index) => {
                  const creatorProfile = getCreatorProfile(creator.id);
                  return <CarouselItem key={creator.id} className={`pl-2 basis-1/${slidesPerView}`}>
                        <div className="p-1">
                          <CreatorCard id={creator.id} name={creator.name || creatorProfile.name} imageUrl={creator.imageUrl} category={creator.category} investorsCount={creator.investorsCount} totalInvested={creator.totalInvested} monthlyRevenue={creatorProfile.monthlyRevenue} rank={index + 1} />
                        </div>
                      </CarouselItem>;
                })}
                </CarouselContent>
                <CarouselPrevious className="left-2 h-9 w-9 rounded-full" />
                <CarouselNext className="right-2 h-9 w-9 rounded-full" />
              </Carousel>
            </div>
          </FadeIn>
          
          <div className="container mx-auto px-4">
            <div className="mt-8 md:mt-12 text-center md:hidden mx-[17px] py-0 px-0 my-0 bg-transparent">
              <Link to="/creators">
                <GradientButton gradientDirection="to-r" className="from-yellow-300 to-black text-white">
                  Voir toutes les créatrices
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Top Affiliés Section - Nouvelle section */}
        <section className="py-10 md:py-16 bg-transparent">
          <div className="container mx-auto px-4">
            <FadeIn className="max-w-3xl mx-auto mb-8" direction="up">
              <h2 className="md:text-3xl font-bold mb-3 text-center text-2xl">
                Nos <span className="text-yellow-300">Meilleurs Parrains</span>
              </h2>
              <p className="text-base md:text-lg text-center text-gray-950">
                Ils ont recommandé notre plateforme et ont généré des revenus exceptionnels. Pourquoi pas vous ?
              </p>
            </FadeIn>
            
            <div className="max-w-3xl mx-auto">
              <TopAffiliates />
            </div>
            
            <div className="mt-8 text-center bg-transparent">
              <Link to="/affiliation" onClick={handleAffiliationClick}>
                <GradientButton gradientDirection="to-r" className="from-yellow-300 to-black text-white">
                  Rejoindre le programme d'affiliation
                  <ArrowRight className="h-4 w-4 ml-1" />
                </GradientButton>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="max-w-3xl mx-auto mb-10 text-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                Un Marché en <span className="text-yellow-300">Pleine Explosion</span>
              </h2>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-center text-gray-950">OnlyFans connaît une croissance explosive depuis sa création en 2017 son Chiffre d'affaire a été multiplié par 300.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  
                  
                  
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
                <div className="text-white px-2 py-1 rounded bg-black">
                  <span className="font-bold">Trustpilot</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className={cn("h-5 w-5 fill-current", star <= 4 ? "text-yellow-300" : "", star === 5 ? "text-yellow-300 fill-yellow-300/70" : "")} />)}
                </div>
                <span className="text-base font-bold text-inherit">4.7/5</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Ce que disent <span className="text-yellow-300">nos utilisateurs</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                Rejoignez plus de 20 000 investisseurs satisfaits qui ont déjà fait confiance à notre plateforme.
              </p>
            </FadeIn>
            
            <div className="relative px-4 md:px-10 pb-12">
              <Carousel opts={{
              align: "center",
              loop: true
            }} className="w-full">
                <CarouselContent>
                  {trustpilotReviews.map(review => <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <FadeIn className="bg-white dark:bg-gray-800 h-full rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up">
                        <div className="flex items-center mb-4 bg-transparent">
                          {[1, 2, 3, 4, 5].map(star => <Star key={star} className={cn("h-4 w-4 fill-current", star <= review.rating ? "text-yellow-300" : "text-gray-300 dark:text-gray-600")} />)}
                        </div>
                        <p className={cn("text-gray-700 dark:text-gray-300 mb-4", review.style)}>"{review.comment}"</p>
                        <div className="text-sm font-medium mt-auto">{review.name}</div>
                      </FadeIn>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="-left-2 md:-left-6 h-9 w-9 rounded-full" />
                <CarouselNext className="-right-2 md:-right-6 h-9 w-9 rounded-full" />
              </Carousel>
            </div>
          </div>
        </section>
        
        
      </main>
      
      <Footer />
    </div>;
};
export default Index;