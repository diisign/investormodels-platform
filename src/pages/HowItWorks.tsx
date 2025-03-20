
import React from 'react';
import { useAuth } from '@/utils/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CreditCard, 
  TrendingUp, 
  Gift, 
  Users, 
  Shield, 
  ArrowRight,
  BarChart3,
  Ticket
} from 'lucide-react';

const HowItWorks = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isAuthenticated} onLogout={logout} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Comment ça marche ?</h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Investissez dans vos créateurs préférés et partagez leur succès. Découvrez comment notre plateforme relie les fans et les créateurs en quelques étapes simples.
            </p>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Un processus simple</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-investment-500 text-white flex items-center justify-center text-2xl font-bold rounded-br-lg">
                1
              </div>
              <CardContent className="pt-12 px-6 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trouvez des créateurs</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explorez notre catalogue de créateurs de contenu talentueux dans divers domaines et découvrez ceux qui correspondent à vos centres d'intérêt.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-investment-500 text-white flex items-center justify-center text-2xl font-bold rounded-br-lg">
                2
              </div>
              <CardContent className="pt-12 px-6 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <CreditCard className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Investissez</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choisissez le montant que vous souhaitez investir dans un créateur. Démarrez avec aussi peu que 10€ et diversifiez vos investissements.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-investment-500 text-white flex items-center justify-center text-2xl font-bold rounded-br-lg">
                3
              </div>
              <CardContent className="pt-12 px-6 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Suivez les performances</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Surveillez la croissance et les performances de vos créateurs via votre tableau de bord. Voyez comment votre investissement se développe au fil du temps.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Link to="/creators">
              <Button size="lg" className="bg-investment-600 hover:bg-investment-700 text-white flex items-center gap-2">
                Découvrir les créateurs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Comment ça fonctionne */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Comment fonctionne l'investissement ?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Notre modèle unique permet aux fans d'investir directement dans les créateurs qu'ils soutiennent, 
                créant ainsi une relation mutuellement bénéfique où le succès du créateur devient aussi celui de sa communauté.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <BarChart3 className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Revenus partagés</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Un pourcentage des revenus générés par le créateur est distribué aux investisseurs en fonction de leur participation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <Ticket className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Avantages exclusifs</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Les investisseurs accèdent à du contenu exclusif, des événements privés et des interactions privilégiées avec le créateur.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <Shield className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sécurité garantie</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Toutes les transactions sont sécurisées et les contrats sont transparents pour garantir la confiance entre les parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d" 
                alt="Graphique illustrant le retour sur investissement" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Avantages */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Avantages pour tous</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-investment-600" />
                Pour les fans
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Retour sur investissement</span> - Partagez le succès financier de vos créateurs préférés.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Contenu exclusif</span> - Accédez à du contenu et des avantages réservés aux investisseurs.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Interaction privilégiée</span> - Établissez une relation plus directe avec les créateurs.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Portefeuille diversifié</span> - Investissez dans plusieurs créateurs pour équilibrer votre portefeuille.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Gift className="h-6 w-6 text-investment-600" />
                Pour les créateurs
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Financement direct</span> - Obtenez des fonds sans passer par des intermédiaires traditionnels.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Communauté engagée</span> - Construisez une base de fans investis dans votre réussite à long terme.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Liberté créative</span> - Concentrez-vous sur la création sans compromettre votre vision artistique.
                  </p>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-investment-100 dark:bg-investment-900 p-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-investment-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Croissance accélérée</span> - Utilisez les investissements pour développer votre audience et améliorer votre contenu.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Quel est le montant minimum d'investissement ?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vous pouvez commencer à investir avec seulement 10€. Cela vous permet de tester la plateforme avec un risque minimal.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Comment sont calculés les retours sur investissement ?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Les retours sont calculés proportionnellement à votre investissement et basés sur un pourcentage des revenus générés par le créateur.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Puis-je retirer mon investissement ?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Oui, mais selon des conditions spécifiques définies dans le contrat d'investissement. Généralement, une période de blocage initiale s'applique.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Comment devenir un créateur sur la plateforme ?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Les créateurs peuvent postuler via notre processus de validation. Nous examinons votre contenu, votre audience et votre potentiel de croissance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-investment-500 to-investment-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à investir dans l'avenir de la création ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'investisseurs qui soutiennent leurs créateurs favoris et participent à leur succès.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-investment-600 hover:bg-gray-100">
                Créer un compte
              </Button>
            </Link>
            
            <Link to="/creators">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explorer les créateurs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;

