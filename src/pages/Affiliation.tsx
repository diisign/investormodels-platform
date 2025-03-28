
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { BadgeDollarSign, Users, Gift, Share2, HeartHandshake, Sparkles } from 'lucide-react';
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
        {/* Hero Section with blue gradient background */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--affiliation-gradient-from))] to-[hsl(var(--affiliation-gradient-to))] opacity-95"></div>
          <div className="absolute -top-[10%] -right-[10%] z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-investment-200/10 to-investment-400/5 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-l from-investment-200/20 to-investment-300/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <FadeIn direction="up" className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Programme d'Affiliation
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Parrainez vos amis et gagnez 50€ de crédit lorsqu'ils investissent 100€ dans une créatrice.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <GradientButton 
                      gradientDirection="to-r" 
                      fullWidth 
                      size="lg"
                      className="from-white/90 to-white/70 text-blue-900"
                    >
                      Créer un compte pour parrainer
                    </GradientButton>
                  </Link>
                </div>
              )}
            </FadeIn>
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <BadgeDollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Avantages filleuls</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Vos amis bénéficient d'un bonus de 25€.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <HeartHandshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                      <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                        Commencez dès maintenant
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Notre programme d'affiliation est l'un des plus généreux du marché. En quelques minutes, vous pouvez commencer à parrainer vos amis et recevoir des bonus.
                      </p>
                      {isAuthenticated ? (
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={handleShare}
                        >
                          Partager mon lien d'affiliation
                        </Button>
                      ) : (
                        <Link to="/register">
                          <GradientButton 
                            gradientDirection="to-r" 
                            className="from-purple-600 to-purple-500"
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
