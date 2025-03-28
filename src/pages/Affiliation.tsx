
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { BadgeDollarSign, Users, Gift, Share2, HeartHandshake, Sparkles, PiggyBank, UserPlus, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { useScreenSize } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
      
      <main className="flex-grow">
        {/* Hero Section - Redesigned with White Theme */}
        <section className="py-16 lg:py-24 relative overflow-hidden bg-white">
          {/* White Background with Light Decorative Elements */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gray-50 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-gray-100 blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Programme d'Affiliation
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                Parrainez vos amis et gagnez ensemble avec notre programme de récompenses exclusif.
              </p>
            </div>
            
            {/* New Card Layout - Modified for mobile */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {/* Left Card */}
                <Card className="col-span-3 md:col-span-1 bg-gray-50 border-gray-200 shadow-md overflow-hidden">
                  <div className="p-4 md:p-6 flex flex-col items-center text-center h-full">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 md:mb-4">
                      <UserPlus className="h-7 w-7 md:h-8 md:w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Pour Vos Filleuls</h3>
                    <div className="mt-1 md:mt-2 mb-2 md:mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-teal-600">50€</span>
                      <span className="text-gray-600 ml-2">de bonus</span>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base flex-grow">
                      Chaque filleul reçoit un bonus de 50€ à utiliser sur la plateforme dès son premier investissement de 100€.
                    </p>
                    <div className="mt-3 md:mt-4 w-full">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-teal-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Center Card - Main Content */}
                <Card className="col-span-3 md:col-span-1 bg-white shadow-xl border-0 relative md:transform md:-translate-y-6 z-20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
                  <div className="p-4 md:p-8 flex flex-col items-center">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-3 md:mb-6">
                      <BadgeDollarSign className="h-8 w-8 md:h-10 md:w-10 text-purple-600" />
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-6 text-gray-800">
                      Programme Partenaire
                    </h2>
                    
                    <div className="space-y-3 md:space-y-6 text-center">
                      <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm md:text-base text-gray-700 font-medium">
                          Invitez vos amis à rejoindre CréatorInvest et recevez des récompenses pour chaque parrainage réussi.
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-teal-600">
                          <span className="font-semibold text-sm md:text-base">Sans limite</span>
                          <Rocket size={isMobile ? 16 : 18} className="text-purple-600" />
                          <span className="font-semibold text-sm md:text-base">de parrainages</span>
                        </div>
                      </div>
                      
                      {!isAuthenticated && (
                        <div className="pt-2 md:pt-4">
                          <Link to="/register">
                            <GradientButton 
                              gradientDirection="to-r" 
                              fullWidth 
                              size={isMobile ? "sm" : "lg"}
                              className="from-teal-500 to-blue-500 text-white"
                            >
                              Créer un compte pour parrainer
                            </GradientButton>
                          </Link>
                        </div>
                      )}
                      
                      {isAuthenticated && (
                        <Button 
                          className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm md:text-base"
                          onClick={handleShare}
                          size={isMobile ? "sm" : "default"}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Partager mon lien
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
                
                {/* Right Card */}
                <Card className="col-span-3 md:col-span-1 bg-gray-50 border-gray-200 shadow-md overflow-hidden">
                  <div className="p-4 md:p-6 flex flex-col items-center text-center h-full">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-purple-100 flex items-center justify-center mb-3 md:mb-4">
                      <PiggyBank className="h-7 w-7 md:h-8 md:w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Pour Vous</h3>
                    <div className="mt-1 md:mt-2 mb-2 md:mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-teal-600">50%</span>
                      <span className="text-gray-600 ml-2">des gains</span>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base flex-grow">
                      Recevez 50% des gains générés par vos filleuls pour toute la durée de leur investissement sur la plateforme.
                    </p>
                    <div className="mt-3 md:mt-4 w-full">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-teal-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Les avantages de notre programme d'affiliation</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Tout le monde y gagne avec notre programme de parrainage exclusif.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <FadeIn direction="left">
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <BadgeDollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Bonus généreux</h3>
                      <p className="text-gray-600 text-sm">
                        Recevez 50€ pour chaque ami qui investit 100€ ou plus.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Gift className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Avantages filleuls</h3>
                      <p className="text-gray-600 text-sm">
                        Vos amis bénéficient d'un bonus de 50€.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Suivi en temps réel</h3>
                      <p className="text-gray-600 text-sm">
                        Suivez facilement vos parrainages.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <HeartHandshake className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Soutien mutuel</h3>
                      <p className="text-gray-600 text-sm">
                        Contribuez à l'écosystème créatif.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ / CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="md:flex-1">
                      <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Commencez dès maintenant
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Notre programme d'affiliation est l'un des plus généreux du marché. En quelques minutes, vous pouvez commencer à parrainer vos amis et recevoir des bonus.
                      </p>
                      {isAuthenticated ? (
                        <Button 
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                          onClick={handleShare}
                        >
                          Partager mon lien d'affiliation
                        </Button>
                      ) : (
                        <Link to="/register">
                          <GradientButton 
                            gradientDirection="to-r" 
                            className="from-teal-600 to-blue-500"
                          >
                            Créer un compte
                          </GradientButton>
                        </Link>
                      )}
                    </div>
                    <div className="md:flex-1 w-full">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Questions fréquentes</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Quand vais-je recevoir mon bonus ?</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Le bonus de 50€ est crédité sur votre compte dès que votre filleul a effectué son premier investissement de 100€ ou plus.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Y a-t-il une limite au nombre de parrainages ?</h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Non, vous pouvez parrainer autant d'amis que vous le souhaitez et recevoir un bonus pour chacun d'eux.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Comment utiliser mes bonus d'affiliation ?</h4>
                          <p className="text-gray-600 text-sm mt-1">
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
