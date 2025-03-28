
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { BadgeDollarSign, Users, Gift, Share2, HeartHandshake, Sparkles, Coins, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { useScreenSize } from '@/hooks/use-mobile';

const Affiliation = () => {
  const { isAuthenticated, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const { isMobile } = useScreenSize();
  
  // Générer un code de parrainage basé sur l'ID utilisateur ou un code temporaire si non connecté
  const affiliationCode = isAuthenticated && user 
    ? `${user.id.substring(0, 8)}` 
    : 'DEMO2024';
  
  const affiliationLink = `${window.location.origin}/register?ref=${affiliationCode}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliationLink);
    setCopied(true);
    toast.success("Lien d'affiliation copié !");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoignez CréatorInvest',
          text: 'Recevez 50€ en crédit lorsque vous investissez 100€ avec mon lien de parrainage !',
          url: affiliationLink
        });
        toast.success("Merci d'avoir partagé !");
      } catch (error) {
        console.error("Erreur lors du partage:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section with white background */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                Programme d'Affiliation
              </h1>
            </div>
            
            <div className="flex justify-center mb-12">
              <div className="relative max-w-4xl w-full">
                {/* Left floating element */}
                <div className="absolute -left-10 md:-left-24 top-1/2 -translate-y-1/2 animate-float-slow z-20">
                  <div className="bg-blue-100 p-4 rounded-lg shadow-lg border border-blue-200">
                    <Coins className="h-12 w-12 text-blue-500" />
                    <p className="text-blue-900 font-medium mt-2">Bonus 50€</p>
                  </div>
                </div>
                
                {/* Right floating element */}
                <div className="absolute -right-10 md:-right-24 top-1/2 -translate-y-1/2 animate-float z-20">
                  <div className="bg-blue-100 p-4 rounded-lg shadow-lg border border-blue-200">
                    <BarChart3 className="h-10 w-10 text-blue-500" />
                    <p className="text-blue-900 font-medium mt-2">Suivi en temps réel</p>
                  </div>
                </div>
                
                {/* Central card */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 z-10 relative">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center">
                      <BadgeDollarSign className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-6 max-w-sm mx-auto text-center">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-900 font-medium mb-1">
                        Ils reçoivent 50€ lors de son premier investissement
                      </p>
                      <p className="text-blue-700 text-sm">
                        (100€ minimum)
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-900 font-medium mb-1">
                        Recevez 50% des gains du parrainage
                      </p>
                      <p className="text-blue-700 text-sm">
                        Sans limite de parrainages
                      </p>
                    </div>
                    
                    {!isAuthenticated && (
                      <div className="mt-6 pt-4">
                        <Link to="/register">
                          <GradientButton 
                            gradientDirection="to-r" 
                            fullWidth 
                            size="lg"
                            className="from-blue-600 to-blue-400 text-white"
                          >
                            Créer un compte pour parrainer
                          </GradientButton>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {isAuthenticated && (
              <FadeIn direction="up" className="text-center mt-8">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager mon lien d'affiliation
                </Button>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Les avantages de notre programme d'affiliation</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Tout le monde y gagne avec notre programme de parrainage exclusif.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <FadeIn direction="left">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <BadgeDollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Bonus généreux</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Recevez 50€ pour chaque ami qui investit 100€ ou plus.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Avantages filleuls</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Vos amis bénéficient d'un bonus de 50€.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Suivi en temps réel</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Suivez facilement vos parrainages.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <HeartHandshake className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Soutien mutuel</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Contribuez à l'écosystème créatif.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ / CTA - Changed background to white */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="md:flex-1">
                      <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
                      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                        Commencez dès maintenant
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Notre programme d'affiliation est l'un des plus généreux du marché. En quelques minutes, vous pouvez commencer à parrainer vos amis et recevoir des bonus.
                      </p>
                      {isAuthenticated ? (
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handleShare}
                        >
                          Partager mon lien d'affiliation
                        </Button>
                      ) : (
                        <Link to="/register">
                          <GradientButton 
                            gradientDirection="to-r" 
                            className="from-blue-600 to-blue-500"
                          >
                            Créer un compte
                          </GradientButton>
                        </Link>
                      )}
                    </div>
                    <div className="md:flex-1 w-full">
                      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Questions fréquentes</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-black dark:text-white">Quand vais-je recevoir mon bonus ?</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Le bonus de 50€ est crédité sur votre compte dès que votre filleul a effectué son premier investissement de 100€ ou plus.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-black dark:text-white">Y a-t-il une limite au nombre de parrainages ?</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Non, vous pouvez parrainer autant d'amis que vous le souhaitez et recevoir un bonus pour chacun d'eux.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-black dark:text-white">Comment utiliser mes bonus d'affiliation ?</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Les bonus sont automatiquement ajoutés à votre solde et peuvent être utilisés pour tous vos investissements sur la plateforme.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Affiliation;
