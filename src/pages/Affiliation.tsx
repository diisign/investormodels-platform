
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { BadgeDollarSign, Users, Gift, Copy, Share2, CreditCard, HeartHandshake, Award, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Affiliation = () => {
  const { isAuthenticated, user } = useAuth();
  const [copied, setCopied] = useState(false);
  
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
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/20 to-purple-500/20 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <FadeIn direction="up" className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-accent bg-clip-text text-transparent">
                Programme d'Affiliation
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Parrainez vos amis et gagnez 50€ de crédit lorsqu'ils investissent 100€ dans une créatrice.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <GradientButton 
                      gradientDirection="to-r" 
                      fullWidth 
                      size="lg"
                      className="from-purple-600 to-purple-500"
                    >
                      Créer un compte pour parrainer
                    </GradientButton>
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Comment fonctionne le parrainage</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Notre programme d'affiliation est simple et avantageux pour tous.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Étape 1 */}
              <FadeIn direction="up" delay={100}>
                <div className="bg-gradient-to-br from-purple-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-gray-700 text-center h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">1. Partagez votre lien</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Invitez vos amis à rejoindre CréatorInvest en utilisant votre lien d'affiliation personnel.
                  </p>
                </div>
              </FadeIn>

              {/* Étape 2 */}
              <FadeIn direction="up" delay={200}>
                <div className="bg-gradient-to-br from-purple-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-gray-700 text-center h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">2. Ils investissent</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Lorsque vos amis s'inscrivent et investissent 100€ ou plus dans une créatrice, le bonus est débloqué.
                  </p>
                </div>
              </FadeIn>

              {/* Étape 3 */}
              <FadeIn direction="up" delay={300}>
                <div className="bg-gradient-to-br from-purple-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-gray-700 text-center h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">3. Recevez votre bonus</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Vous recevez automatiquement 50€ de crédit sur votre compte, utilisable pour vos propres investissements.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Partager section */}
        <section className="py-16 bg-gradient-to-br from-purple-500/5 via-purple-500/5 to-purple-500/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <FadeIn direction="up" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Partagez votre lien de parrainage</h2>
                
                {isAuthenticated ? (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Votre lien d'affiliation personnel</label>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={affiliationLink} 
                          readOnly 
                          className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-l-lg text-gray-800 dark:text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button 
                          onClick={handleCopyLink}
                          className={cn(
                            "px-4 py-3 rounded-r-lg flex items-center gap-2 transition-colors",
                            copied 
                              ? "bg-green-500 text-white" 
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          )}
                        >
                          {copied ? "Copié !" : "Copier"}
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-6 py-5 text-base"
                        onClick={handleShare}
                      >
                        <Share2 size={18} />
                        Partager mon lien
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Connectez-vous ou créez un compte pour obtenir votre lien de parrainage personnel.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/login">
                        <Button variant="outline" className="px-6 py-5 text-base">
                          Se connecter
                        </Button>
                      </Link>
                      <Link to="/register">
                        <GradientButton
                          gradientDirection="to-r"
                          className="from-purple-600 to-purple-500 px-6 py-5 text-base"
                        >
                          Créer un compte
                        </GradientButton>
                      </Link>
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn direction="left">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <BadgeDollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Bonus généreux</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Recevez 50€ pour chaque ami qui investit 100€ ou plus. Il n'y a pas de limite au nombre de personnes que vous pouvez parrainer.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Avantages pour vos filleuls</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Vos amis bénéficient également d'un bonus de 25€ lorsqu'ils s'inscrivent avec votre code et investissent 100€.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Suivi en temps réel</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Suivez facilement le statut de vos parrainages et vos bonus dans votre tableau de bord personnel.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <HeartHandshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Soutien mutuel</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        En parrainant des amis, vous participez également au soutien des créatrices de contenu et contribuez à l'écosystème.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ / CTA */}
        <section className="py-16 bg-gradient-to-br from-purple-500/5 via-purple-500/5 to-purple-500/5">
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
                          onClick={handleCopyLink}
                        >
                          Copier mon lien d'affiliation
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
