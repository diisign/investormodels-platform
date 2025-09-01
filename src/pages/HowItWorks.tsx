import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Coins, 
  TrendingUp, 
  Calendar, 
  PiggyBank, 
  Calculator, 
  ArrowRight, 
  CheckCircle,
  DollarSign,
  Clock,
  Users,
  Banknote
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navbar isLoggedIn={false} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              Comment ça marche ?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez notre système d'investissement par parts et dividendes, 
              une nouvelle façon d'investir dans vos créatrices préférées
            </p>
          </div>

          {/* Principe de base */}
          <Card className="mb-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Le concept des parts</CardTitle>
              <CardDescription className="text-lg">
                Au lieu d'un investissement classique, vous achetez des parts dans une créatrice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Propriété de parts
                  </h4>
                  <p className="text-muted-foreground">
                    Quand vous investissez, vous devenez propriétaire de parts dans la créatrice. 
                    Ces parts vous donnent droit à des dividendes mensuels.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Revenus passifs
                  </h4>
                  <p className="text-muted-foreground">
                    Chaque mois, vous recevez des dividendes basés sur les performances 
                    de la créatrice et le pourcentage APY annoncé.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Étapes du processus */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Le processus en 5 étapes</h2>
            
            <div className="grid md:grid-cols-5 gap-6">
              {/* Étape 1 */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <CardTitle className="text-lg">Choisir</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <PiggyBank className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez une créatrice et le montant à investir
                  </p>
                </CardContent>
              </Card>

              {/* Étape 2 */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <CardTitle className="text-lg">Acheter</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Coins className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Achetez vos parts. Votre investissement est débité de votre solde
                  </p>
                </CardContent>
              </Card>

              {/* Étape 3 */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <CardTitle className="text-lg">Attendre</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Minimum 1 mois après l'achat pour être éligible aux dividendes
                  </p>
                </CardContent>
              </Card>

              {/* Étape 4 */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <CardTitle className="text-lg">Recevoir</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Recevez vos dividendes mensuels automatiquement
                  </p>
                </CardContent>
              </Card>

              {/* Étape 5 */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <CardTitle className="text-lg">Vendre</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Banknote className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Vendez vos parts quand vous voulez pour récupérer votre capital
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Calcul des dividendes */}
          <Card className="mb-12 border-green-200 bg-gradient-to-br from-green-50 to-transparent">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Comment sont calculés les dividendes ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-4">Formule de calcul :</h4>
                  <div className="bg-green-50 p-4 rounded-lg font-mono text-center text-lg">
                    Dividende mensuel = Montant investi × (APY ÷ 100 ÷ 12)
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Exemple concret :</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Montant investi :</span>
                        <span className="font-semibold">1000€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>APY de la créatrice :</span>
                        <span className="font-semibold">24%</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Dividende mensuel :</span>
                        <span className="font-bold text-green-600">20€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dividende annuel :</span>
                        <span className="font-bold text-green-600">240€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Points importants :</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Les dividendes sont calculés sur le montant initial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ils sont versés chaque mois tant que vous possédez les parts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Aucun dividende n'est versé le premier mois</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline des dividendes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Timeline des dividendes
              </CardTitle>
              <CardDescription>
                Comprendre quand vous recevez vos dividendes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary to-green-500"></div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        J0
                      </div>
                      <div>
                        <h4 className="font-semibold">Achat des parts</h4>
                        <p className="text-muted-foreground text-sm">
                          Vous investissez 1000€ dans une créatrice avec 24% APY
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        J30
                      </div>
                      <div>
                        <h4 className="font-semibold">Période d'attente</h4>
                        <p className="text-muted-foreground text-sm">
                          Aucun dividende versé le premier mois (période de grâce)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        J60
                      </div>
                      <div>
                        <h4 className="font-semibold">Premier dividende</h4>
                        <p className="text-muted-foreground text-sm">
                          Vous recevez votre premier dividende de 20€
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        J90
                      </div>
                      <div>
                        <h4 className="font-semibold">Dividendes mensuels</h4>
                        <p className="text-muted-foreground text-sm">
                          Chaque mois suivant : 20€ de dividende
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vente des parts */}
          <Card className="mb-12 border-orange-200 bg-gradient-to-br from-orange-50 to-transparent">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-800">Vendre vos parts</CardTitle>
              <CardDescription className="text-lg">
                Récupérez votre capital quand vous le souhaitez
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Quand vous voulez</h4>
                  <p className="text-sm text-muted-foreground">
                    Aucune durée minimum, vendez vos parts à tout moment
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Banknote className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Capital garanti</h4>
                  <p className="text-sm text-muted-foreground">
                    Vous récupérez 100% de votre investissement initial
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Dividendes finaux</h4>
                  <p className="text-sm text-muted-foreground">
                    Les dividendes en attente sont automatiquement versés
                  </p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Important :</h4>
                <p className="text-sm text-orange-700">
                  Une fois vos parts vendues, vous ne recevrez plus de dividendes pour cette créatrice. 
                  Vous devrez racheter des parts si vous souhaitez recommencer à recevoir des dividendes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Avantages du système */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pourquoi ce système ?</CardTitle>
              <CardDescription>
                Les avantages de l'investissement par parts et dividendes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600 text-lg">✅ Avantages</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Revenus passifs réguliers</span>
                        <p className="text-sm text-muted-foreground">Dividendes mensuels automatiques</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Capital protégé</span>
                        <p className="text-sm text-muted-foreground">Récupération garantie à 100%</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Flexibilité totale</span>
                        <p className="text-sm text-muted-foreground">Vendez quand vous voulez</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Rendements attractifs</span>
                        <p className="text-sm text-muted-foreground">APY élevés selon les créatrices</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-600 text-lg">⚠️ Points d'attention</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Période de grâce</span>
                        <p className="text-sm text-muted-foreground">Aucun dividende le premier mois</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Performance variable</span>
                        <p className="text-sm text-muted-foreground">Les APY peuvent varier selon les créatrices</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Coins className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Investissement minimum</span>
                        <p className="text-sm text-muted-foreground">Montants minimums selon les créatrices</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to action */}
          <div className="text-center space-y-6">
            <div className="space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Prêt à commencer ?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
    </div>
  );
};

export default HowItWorks;