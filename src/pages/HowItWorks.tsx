import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, TrendingUp, Calendar, PiggyBank, Calculator, ArrowRight, CheckCircle, DollarSign, Clock, Users, Banknote } from 'lucide-react';
const HowItWorks = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navbar isLoggedIn={false} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              Comment ça marche ?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez notre système d'investissement par parts et dividendes, 
              une nouvelle façon d'investir dans vos créatrices préférées
            </p>
          </div>

          {/* Principe de base */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Le concept des parts</h2>
            <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Au lieu d'un investissement classique, vous achetez des parts dans une créatrice
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h4 className="text-base md:text-lg font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Propriété de parts
                </h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Quand vous investissez, vous devenez propriétaire de parts dans la créatrice. 
                  Ces parts vous donnent droit à des dividendes mensuels.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-base md:text-lg font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Revenus passifs
                </h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Chaque mois, vous recevez des dividendes basés sur les performances 
                  de la créatrice et le pourcentage mensuel annoncé.
                </p>
              </div>
            </div>
          </div>

          {/* Étapes du processus */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Le processus en 5 étapes</h2>
            
            <div className="space-y-8">
              {/* Première ligne : Choisir et Acheter */}
              <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    1
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">Choisir</h3>
                  <PiggyBank className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Sélectionnez une créatrice et le montant à investir
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    2
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">Acheter</h3>
                  <Coins className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Achetez vos parts. Votre investissement est débité de votre solde
                  </p>
                </div>
              </div>

              {/* Deuxième ligne : Attendre et Recevoir */}
              <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    3
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">Attendre</h3>
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Minimum 1 mois après l'achat pour être éligible aux dividendes
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    4
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">Recevoir</h3>
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Recevez vos dividendes mensuels automatiquement
                  </p>
                </div>
              </div>

              {/* Troisième ligne : Vendre centré */}
              <div className="flex justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold">
                    5
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">Vendre</h3>
                  <Banknote className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-3" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Vendez vos parts quand vous voulez pour récupérer votre capital
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calcul des dividendes */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Comment sont calculés les dividendes ?</h2>
            </div>
            
            <div className="space-y-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-green-800 mb-4">Formule de calcul :</h4>
                
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-800">Exemple concret :</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>Montant investi :</span>
                      <span className="font-semibold">1000€</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Taux mensuel de la créatrice :</span>
                      <span className="font-semibold">18%</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 text-lg">
                      <span>Dividende mensuel :</span>
                      <span className="font-bold text-green-600">180€</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Dividende annuel (estimé) :</span>
                      <span className="font-bold text-green-600">2160€</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-800">Points importants :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Les dividendes sont calculés sur le montant initial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Ils sont versés chaque mois tant que vous possédez les parts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Aucun dividende n'est versé le premier mois</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline des dividendes */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-4">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                Timeline des dividendes
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Comprendre quand vous recevez vos dividendes
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary to-green-500"></div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J0
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Achat des parts</h4>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Vous investissez 1000€ dans une créatrice avec 18% mensuel
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J30
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Période d'attente</h4>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Aucun dividende versé le premier mois (période de grâce)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J60
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Premier dividende</h4>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Vous recevez votre premier dividende de 180€
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J90
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Dividendes mensuels</h4>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Chaque mois suivant : 180€ de dividende
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vente des parts */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-orange-800 mb-4">Vendre vos parts</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Récupérez votre capital quand vous le souhaitez
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">Quand vous voulez</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Aucune durée minimum, vendez vos parts à tout moment
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Banknote className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">Capital garanti</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Vous récupérez 100% de votre investissement initial
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">Dividendes finaux</h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  Les dividendes en attente sont automatiquement versés
                </p>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 max-w-3xl mx-auto">
              <h4 className="font-semibold text-orange-800 mb-2 text-lg">Important :</h4>
              <p className="text-orange-700">
                Une fois vos parts vendues, vous ne recevrez plus de dividendes pour cette créatrice. 
                Vous devrez racheter des parts si vous souhaitez recommencer à recevoir des dividendes.
              </p>
            </div>
          </div>

          {/* Avantages du système */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pourquoi ce système ?</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Les avantages de l'investissement par parts et dividendes
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-6">
                <h4 className="font-semibold text-green-600 text-2xl">✅ Avantages</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Revenus passifs réguliers</span>
                      <p className="text-muted-foreground">Dividendes mensuels automatiques</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Capital protégé</span>
                      <p className="text-muted-foreground">Récupération garantie à 100%</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Flexibilité totale</span>
                      <p className="text-muted-foreground">Vendez quand vous voulez</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Rendements attractifs</span>
                      <p className="text-muted-foreground">Taux mensuels élevés selon les créatrices</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-orange-600 text-2xl">⚠️ Points d'attention</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Période de grâce</span>
                      <p className="text-muted-foreground">Aucun dividende le premier mois</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Performance variable</span>
                      <p className="text-muted-foreground">Les taux peuvent varier selon les créatrices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Coins className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-lg">Investissement minimum</span>
                      <p className="text-muted-foreground">Montants minimums selon les créatrices</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center space-y-6">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Prêt à commencer ?</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez nos créatrices et commencez à générer des revenus passifs dès aujourd'hui
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/creators">
                <Button size="lg" className="flex items-center gap-2">
                  Voir les créatrices
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  Créer un compte
                  <Users className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default HowItWorks;