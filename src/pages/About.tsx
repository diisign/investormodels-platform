
import React from 'react';
import { useAuth } from '@/utils/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, Globe, Award, Clock, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isAuthenticated} onLogout={logout} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Notre mission</h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Connecter les fans et les créateurs à travers un nouveau modèle d'investissement qui permet à chacun de participer au succès de ses créateurs préférés.
            </p>
          </div>
        </div>
      </section>
      
      {/* Notre histoire */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                InvestorModels est né d'une idée simple : permettre aux fans de soutenir financièrement les créateurs qu'ils aiment tout en participant à leur réussite.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                En 2023, notre équipe de passionnés a décidé de créer une plateforme qui révolutionne la relation entre les créateurs de contenu et leur communauté, en permettant aux fans d'investir directement dans la carrière de leurs créateurs préférés.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Aujourd'hui, nous sommes fiers de connecter des milliers de créateurs à leurs fans les plus engagés, créant ainsi un écosystème où chacun peut prospérer.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="Notre équipe au travail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Nos valeurs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Passion</h3>
                  <p className="text-gray-600 dark:text-gray-400">Nous sommes passionnés par le contenu et les créateurs qui l'animent.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-400">Nous repoussons les limites pour créer des solutions originales.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Confiance</h3>
                  <p className="text-gray-600 dark:text-gray-400">Nous bâtissons des relations durables basées sur la transparence.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-investment-100 dark:bg-investment-900 p-4 rounded-full mb-4">
                    <Globe className="h-8 w-8 text-investment-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Communauté</h3>
                  <p className="text-gray-600 dark:text-gray-400">Nous créons un écosystème où chacun peut s'épanouir.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Notre équipe */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Notre équipe</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61" 
                  alt="Thomas Laurent" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Thomas Laurent</h3>
              <p className="text-investment-600 dark:text-investment-400 mb-2">Co-fondateur & CEO</p>
              <p className="text-gray-600 dark:text-gray-400">Passionné de technologie et de création de contenu</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" 
                  alt="Sophie Martin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sophie Martin</h3>
              <p className="text-investment-600 dark:text-investment-400 mb-2">Co-fondatrice & COO</p>
              <p className="text-gray-600 dark:text-gray-400">Experte en économie des plateformes</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                  alt="Alexandre Dubois" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Alexandre Dubois</h3>
              <p className="text-investment-600 dark:text-investment-400 mb-2">CTO</p>
              <p className="text-gray-600 dark:text-gray-400">Architecte logiciel et expert en blockchain</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notre avantage */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre approche unique</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                InvestorModels se distingue par sa plateforme qui permet un véritable partenariat entre les créateurs et leur communauté. Nous ne nous contentons pas de faciliter le soutien financier, nous créons un véritable écosystème d'investissement.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <Target className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Investissement direct</h3>
                    <p className="text-gray-600 dark:text-gray-400">Les fans peuvent investir directement dans le succès de leurs créateurs préférés.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <Users className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Communauté engagée</h3>
                    <p className="text-gray-600 dark:text-gray-400">Nous facilitons la création d'une communauté active autour de chaque créateur.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-investment-100 dark:bg-investment-900 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-investment-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Récompenses exclusives</h3>
                    <p className="text-gray-600 dark:text-gray-400">Les investisseurs bénéficient d'avantages et de contenus exclusifs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Notre plateforme en action" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-investment-500 to-investment-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez l'aventure</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez une nouvelle façon d'interagir avec vos créateurs favoris et de participer à leur succès.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/creators">
              <Button size="lg" className="bg-white text-investment-600 hover:bg-gray-100">
                Découvrir les créateurs
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Créer un compte
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
