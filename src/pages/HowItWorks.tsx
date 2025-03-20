
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { Sparkles, Camera, TrendingUp, Users, Wallet, CheckCheck, HeartHandshake, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <FadeIn direction="up" className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Comment fonctionne notre plateforme d'investissement
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Investissez dans les créatrices de contenu les plus prometteuses et recevez des retours sur investissement basés sur leurs performances.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-6 rounded-xl text-lg">
                      Commencer à investir
                    </Button>
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Un processus simple en 4 étapes</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Notre plateforme rend l'investissement dans les créatrices de contenu aussi simple que possible.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <FadeIn direction="up" delay={100}>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-pink-100 dark:border-gray-700 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Parcourez les créatrices</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Explorez notre catalogue de créatrices talentueuses et consultez leurs profils, statistiques et plans d'investissement.
                  </p>
                </div>
              </FadeIn>

              {/* Step 2 */}
              <FadeIn direction="up" delay={200}>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-gray-700 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Choisissez où investir</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Sélectionnez les créatrices qui vous plaisent et choisissez le plan d'investissement qui correspond à vos objectifs financiers.
                  </p>
                </div>
              </FadeIn>

              {/* Step 3 */}
              <FadeIn direction="up" delay={300}>
                <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-violet-100 dark:border-gray-700 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Financez votre compte</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Déposez des fonds sur votre compte pour commencer à investir dans les créatrices que vous avez choisies.
                  </p>
                </div>
              </FadeIn>

              {/* Step 4 */}
              <FadeIn direction="up" delay={400}>
                <div className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">4. Récoltez les bénéfices</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Recevez des retours mensuels basés sur les performances des créatrices dans lesquelles vous avez investi.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Investment Details */}
        <section className="py-16 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-center">Comment fonctionne l'investissement ?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center">
                Notre modèle d'investissement unique vous permet de soutenir les créatrices tout en générant des retours financiers.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <FadeIn direction="left">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="text-pink-500 h-6 w-6" />
                    <span>Les plans d'investissement</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Chaque créatrice propose différents plans d'investissement avec des caractéristiques uniques :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Rendement variable</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Des taux de rendement attractifs basés sur la popularité et les revenus de la créatrice.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Investissement minimal</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Des options pour tous les budgets, avec des investissements commençant à 100€.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-violet-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Durée d'engagement</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Choisissez parmi différentes durées d'investissement, de 3 à 12 mois.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-blue-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Avantages exclusifs</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Accès à du contenu exclusif, des réductions et des avantages spéciaux selon votre niveau d'investissement.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-pink-500 h-6 w-6" />
                    <span>Comment vous gagnez de l'argent</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Notre plateforme transforme le soutien aux créatrices en opportunité d'investissement :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Revenus mensuels</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Recevez des paiements mensuels basés sur le taux de rendement du plan choisi.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Croissance de la popularité</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Lorsque la créatrice gagne en popularité, vos retours sur investissement peuvent augmenter.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-violet-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Diversification</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          Investissez dans plusieurs créatrices pour optimiser vos rendements et réduire les risques.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1 text-blue-500"><CheckCheck size={20} /></div>
                      <div>
                        <strong className="text-lg font-medium">Remboursement</strong>
                        <p className="text-gray-600 dark:text-gray-400">
                          À la fin de la période d'investissement, récupérez votre capital initial en plus des gains générés.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Benefits & Advantages */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Avantages pour tous</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Notre plateforme crée une relation gagnant-gagnant entre les créatrices et les investisseurs.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Benefits for Fans */}
              <FadeIn direction="left">
                <div className="border border-pink-200 dark:border-pink-900/40 rounded-2xl overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      <span>Pour les investisseurs</span>
                    </h3>
                    <p className="text-white/80">
                      Voici pourquoi devenir un investisseur est avantageux
                    </p>
                  </div>
                  <div className="p-6 bg-pink-50/50 dark:bg-gray-800">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Rendements attractifs</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Obtenez des rendements supérieurs aux placements traditionnels.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Contenu exclusif</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Accédez à du contenu premium et des avantages exclusifs selon votre plan.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Communication directe</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Interagissez directement avec les créatrices selon votre niveau d'investissement.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-pink-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Transparence totale</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Suivez vos investissements et rendements en temps réel via votre tableau de bord.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Benefits for Creators */}
              <FadeIn direction="right">
                <div className="border border-purple-200 dark:border-purple-900/40 rounded-2xl overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                      <Camera className="h-6 w-6" />
                      <span>Pour les créatrices</span>
                    </h3>
                    <p className="text-white/80">
                      Comment notre plateforme aide les créatrices à prospérer
                    </p>
                  </div>
                  <div className="p-6 bg-purple-50/50 dark:bg-gray-800">
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Financement stable</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Recevez un capital initial pour développer votre contenu et votre audience.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Indépendance créative</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Gardez le contrôle total de votre contenu tout en bénéficiant du soutien des investisseurs.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Base de fans engagés</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Construisez une communauté d'investisseurs qui ont un intérêt financier dans votre succès.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 text-purple-500"><CheckCheck size={20} /></div>
                        <div>
                          <strong className="font-medium">Outils professionnels</strong>
                          <p className="text-gray-600 dark:text-gray-400">
                            Accédez à des analyses, des conseils et des outils pour optimiser votre stratégie de contenu.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Découvrez les réponses aux questions les plus courantes sur notre plateforme.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FadeIn direction="up" delay={100}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400">Comment sont calculés les rendements ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Les rendements sont calculés en fonction des revenus générés par les créatrices, de leur croissance d'audience et de leur engagement. Chaque plan propose un taux de rendement fixe ou variable selon les performances.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={150}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Est-ce que mon investissement est sécurisé ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous mettons en place des garanties contractuelles avec les créatrices pour protéger vos investissements. Bien que tout investissement comporte des risques, notre plateforme travaille uniquement avec des créatrices vérifiées ayant un historique de performance stable.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={200}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-violet-600 dark:text-violet-400">Puis-je investir dans plusieurs créatrices ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Absolument ! Nous encourageons même la diversification de votre portefeuille d'investissement. Vous pouvez investir dans autant de créatrices que vous le souhaitez, dans la limite de votre solde disponible.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={250}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Comment retirer mes fonds et mes gains ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Les gains sont crédités mensuellement sur votre compte. Vous pouvez les retirer à tout moment. Pour le capital investi, il est libéré à la fin de la période d'investissement choisie. Des retraits anticipés sont possibles sous certaines conditions.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={300}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-pink-600 dark:text-pink-400">Comment devenir une créatrice sur la plateforme ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Les créatrices intéressées peuvent postuler via notre formulaire dédié. Nous évaluons chaque candidature selon plusieurs critères : qualité du contenu, taille de l'audience, engagement, régularité et potentiel de croissance.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={350}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Quels moyens de paiement acceptez-vous ?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous acceptons les cartes de crédit/débit, les virements bancaires et certaines cryptomonnaies. Tous les paiements sont sécurisés et chiffrés selon les normes les plus strictes de l'industrie.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 dark:from-pink-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Confiance et Sécurité</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Votre sécurité et votre confidentialité sont notre priorité absolue. Nous utilisons les technologies de cryptage les plus avancées pour protéger vos données personnelles et financières.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <CheckCheck className="text-green-500 h-5 w-5" />
                        <span className="text-sm font-medium">Paiements sécurisés</span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <CheckCheck className="text-green-500 h-5 w-5" />
                        <span className="text-sm font-medium">Données chiffrées</span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <CheckCheck className="text-green-500 h-5 w-5" />
                        <span className="text-sm font-medium">Vérification d'identité</span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <CheckCheck className="text-green-500 h-5 w-5" />
                        <span className="text-sm font-medium">Contrats transparents</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à investir dans les créatrices de contenu les plus prometteuses ?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Rejoignez notre plateforme aujourd'hui et découvrez une nouvelle façon de générer des rendements tout en soutenant vos créatrices préférées.
              </p>
              
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-6 rounded-xl text-lg font-semibold">
                      Créer un compte
                    </Button>
                  </Link>
                  <Link to="/creators">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg font-semibold">
                      Explorer les créatrices
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Link to="/creators">
                    <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-6 rounded-xl text-lg font-semibold">
                      Explorer les créatrices
                    </Button>
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
