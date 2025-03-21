
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import UserBalance from '@/components/UserBalance';
import FadeIn from '@/components/animations/FadeIn';
import { useQueryClient } from '@tanstack/react-query';
import { ExternalLink, RefreshCw, Loader2 } from 'lucide-react';
import { STRIPE_PUBLIC_KEY } from '@/integrations/stripe/config';

const Deposit = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [testAmount, setTestAmount] = useState('2');
  const [stripeAmount, setStripeAmount] = useState('2');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Vérifier si l'utilisateur revient d'une session de paiement
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    
    if (success === 'true') {
      setPaymentSuccess(true);
      
      // Invalider le cache pour forcer la mise à jour du solde
      queryClient.invalidateQueries({
        queryKey: ['userBalance'],
      });
      
      // Nettoyer l'URL
      window.history.replaceState(null, '', '/deposit');
      
      toast.success('Paiement effectué avec succès !', {
        description: 'Votre solde a été mis à jour.',
        duration: 5000,
      });
    }
  }, [queryClient]);

  const handleStripePayment = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer un dépôt");
      return;
    }
    
    const amount = parseFloat(stripeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Appeler la fonction Supabase Edge pour créer une session de paiement
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          userId: user.id,
          amount: amount,
          returnUrl: window.location.origin + '/deposit'
        }
      });
      
      if (error) {
        console.error("Erreur lors de la création du paiement:", error);
        toast.error("Erreur lors de la création du paiement", {
          description: error.message,
        });
        return;
      }
      
      // Rediriger vers l'URL de paiement Stripe
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Erreur lors de la redirection vers Stripe");
      }
      
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      toast.error("Erreur lors du paiement");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTestDeposit = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer un dépôt de test");
      return;
    }
    
    setIsTestLoading(true);
    
    try {
      // Appeler la fonction Supabase Edge pour créer une transaction de test
      const { data, error } = await supabase.functions.invoke('create-test-transaction', {
        body: { 
          userId: user.id,
          amount: parseFloat(testAmount) || 2.00
        }
      });
      
      if (error) {
        console.error("Erreur lors du dépôt de test:", error);
        toast.error("Erreur lors du dépôt de test", {
          description: error.message,
        });
        return;
      }
      
      // Invalider le cache pour forcer la mise à jour du solde
      queryClient.invalidateQueries({
        queryKey: ['userBalance'],
      });
      
      toast.success('Dépôt de test effectué avec succès !', {
        description: `${testAmount}€ ont été ajoutés à votre solde.`,
      });
      
      console.log("Transaction de test créée:", data);
    } catch (error) {
      console.error("Erreur lors du dépôt de test:", error);
      toast.error("Erreur lors du dépôt de test");
    } finally {
      setIsTestLoading(false);
    }
  };
  
  const handleRefreshBalance = () => {
    queryClient.invalidateQueries({
      queryKey: ['userBalance'],
    });
    toast.info("Actualisation du solde en cours...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <h1 className="text-3xl font-bold mb-8 text-center">Déposez de l'argent sur votre compte</h1>
              
              {paymentSuccess && (
                <Alert className="mb-8 max-w-4xl mx-auto bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>
                    Paiement effectué avec succès ! Votre solde a été mis à jour.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dépôt via Stripe</CardTitle>
                      <CardDescription>
                        Ajoutez de l'argent à votre compte en utilisant Stripe pour un paiement sécurisé.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="stripe-amount">Montant (€)</Label>
                          <Input
                            id="stripe-amount"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="2.00"
                            value={stripeAmount}
                            onChange={(e) => setStripeAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Vous allez être redirigé vers la page de paiement sécurisée de Stripe pour compléter votre transaction.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleStripePayment}
                        disabled={isLoading}
                        className="w-full bg-investment-600 hover:bg-investment-700 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Traitement en cours...</span>
                          </>
                        ) : (
                          <>
                            <span>Effectuer un dépôt</span>
                            <ExternalLink size={16} />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="mt-6 border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-gray-600 dark:text-gray-300">Dépôt de test</CardTitle>
                      <CardDescription>
                        Créez une transaction de test pour simuler un dépôt (pour le développement uniquement)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor="test-amount">Montant (€)</Label>
                          <Input
                            id="test-amount"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="2.00"
                            value={testAmount}
                            onChange={(e) => setTestAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button 
                            onClick={handleTestDeposit}
                            disabled={isTestLoading} 
                            variant="outline"
                            className="h-10"
                          >
                            {isTestLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Traitement...
                              </>
                            ) : 'Créer un dépôt de test'}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Note: Cette fonction est uniquement pour le développement et les tests.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <UserBalance />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleRefreshBalance}
                      className="ml-2"
                      title="Actualiser le solde"
                    >
                      <RefreshCw size={16} />
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Méthodes de paiement acceptées</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex gap-2 items-center">
                        <svg className="h-8 w-auto" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                          <rect fill="#0A2540" width="32" height="32" rx="5" />
                          <path d="M15 7C10.5817 7 7 10.5817 7 15C7 19.4183 10.5817 23 15 23C19.4183 23 23 19.4183 23 15C23 10.5817 19.4183 7 15 7Z" fill="#635BFF" />
                          <path d="M15 19C17.2091 19 19 17.2091 19 15C19 12.7909 17.2091 11 15 11C12.7909 11 11 12.7909 11 15C11 17.2091 12.7909 19 15 19Z" fill="white" />
                        </svg>
                        <span>Stripe</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Paiement sécurisé par carte bancaire via Stripe. Aucune information de carte n'est stockée sur nos serveurs.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Powered by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline">Stripe</a> 
                        {STRIPE_PUBLIC_KEY && STRIPE_PUBLIC_KEY.startsWith('pk_test') && 
                          <span className="ml-1 text-amber-600">(Mode Test)</span>
                        }
                        {STRIPE_PUBLIC_KEY && STRIPE_PUBLIC_KEY.startsWith('pk_live') && 
                          <span className="ml-1 text-green-600">(Mode Production)</span>
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deposit;
