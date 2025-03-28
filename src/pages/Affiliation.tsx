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
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow">
        <section className="py-12 lg:py-20 relative overflow-hidden bg-white">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gray-50 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-gray-100 blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
                Programme d'Affiliation
              </h1>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Parrainez vos amis et gagnez ensemble avec notre programme de récompenses exclusif.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <Card className="bg-white shadow-xl border-0 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
                  <div className="p-3 md:p-4 flex flex-col items-center">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-2 md:mb-3">
                      <BadgeDollarSign className="h-5 w-5 md:h-6 md:w-6 text-[#8B5CF6]" />
                    </div>
                    
                    <h2 className="text-sm md:text-base font-bold text-center mb-2 md:mb-3 text-gray-800">
                      Programme Partenaire
                    </h2>
                    
                    <div className="text-center mb-2">
                      <p className="text-sm text-gray-700 font-medium">
                        Invitez vos amis à rejoindre CréatorInvest.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="flex items-center gap-1 text-teal-600">
                        <span className="font-semibold text-xs md:text-sm">Sans limite</span>
                        <Rocket size={isMobile ? 12 : 14} className="text-[#8B5CF6]" />
                      </div>
                    </div>
                    
                    {!isAuthenticated && (
                      <div className="pt-2 md:pt-3 w-full">
                        <Link to="/login">
                          <GradientButton 
                            gradientDirection="to-r" 
                            fullWidth 
                            size="sm"
                            className="from-teal-400 to-blue-500 text-white text-xs py-1 h-8"
                          >
                            Me connecter
                          </GradientButton>
                        </Link>
                      </div>
                    )}
                    
                    {isAuthenticated && (
                      <div className="pt-2 md:pt-3 w-full">
                        <GradientButton 
                          onClick={handleShare}
                          size="sm"
                          gradientDirection="to-r"
                          fullWidth
                          icon={<Share2 className="h-3 w-3" />}
                          iconPosition="left"
                          className="from-teal-400 to-blue-500 text-white text-xs h-8 px-2"
                        >
                          Partager
                        </GradientButton>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-50 border-gray-200 shadow-md overflow-hidden">
                  <div className="p-3 md:p-4 flex flex-col items-center text-center h-full">
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <UserPlus className="h-4 w-4 md:h-5 md:w-5 text-[#8B5CF6]" />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1">Pour Vos Filleuls</h3>
                    <div className="mt-1 mb-1">
                      <span className="text-sm md:text-xl font-bold text-teal-600">50€</span>
                      <span className="text-gray-600 text-xs ml-1">bonus</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Chaque filleul reçoit un bonus de 50€ à utiliser sur la plateforme.
                    </p>
                  </div>
                </Card>
                
                <Card className="bg-gray-50 border-gray-200 shadow-md overflow-hidden">
                  <div className="p-3 md:p-4 flex flex-col items-center text-center h-full">
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <PiggyBank className="h-4 w-4 md:h-5 md:w-5 text-[#8B5CF6]" />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1">Pour Vous</h3>
                    <div className="mt-1 mb-1">
                      <span className="text-sm md:text-xl font-bold text-teal-600">50%</span>
                      <span className="text-gray-600 text-xs ml-1">des gains</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recevez 50% des gains générés par vos filleuls.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Les avantages de notre programme d'affiliation</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Tout le monde y gagne avec notre programme de parrainage exclusif.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <FadeIn direction="left">
                <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4 sm:p-6 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-[#8B5CF6] p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <BadgeDollarSign className="h-6 w-6" />
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-[#8B5CF6] p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Gift className="h-6 w-6" />
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-[#8B5CF6] p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <Users className="h-6 w-6" />
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
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-[#8B5CF6] p-3 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      <HeartHandshake className="h-6 w-6" />
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

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <FadeIn direction="up">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Questions fréquentes</h3>
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
