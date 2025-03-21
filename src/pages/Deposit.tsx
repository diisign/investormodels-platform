
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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [stripeAmount, setStripeAmount] = useState('2');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const canceled = params.get('canceled');
    
    if (success === 'true') {
      setPaymentSuccess(true);
      setPaymentError(null);
      queryClient.invalidateQueries({
        queryKey: ['userBalance'],
      });
      window.history.replaceState(null, '', '/deposit');
      
      toast.success('Paiement effectué avec succès !', {
        description: 'Votre solde a été mis à jour.',
        duration: 5000,
      });
    } else if (canceled === 'true') {
      setPaymentError("Le paiement a été annulé.");
      window.history.replaceState(null, '', '/deposit');
      
      toast.error('Paiement annulé', {
        description: 'Aucun montant n\'a été débité de votre compte.',
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
    setPaymentError(null);
    
    try {
      console.log("Invoking create-payment function with:", { 
        userId: user.id, 
        amount,
        returnUrl: window.location.origin + '/deposit'
      });
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          userId: user.id,
          amount: amount,
          returnUrl: window.location.origin + '/deposit'
        }
      });
      
      if (error) {
        console.error("Function invocation error:", error);
        throw new Error(error.message || "Erreur lors de l'appel à la fonction de paiement");
      }
      
      console.log("Payment function response:", data);
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement manquante dans la réponse");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      setPaymentError(errorMessage);
      toast.error("Erreur lors de la création du paiement", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
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
              
              {paymentError && (
                <Alert className="mb-8 max-w-4xl mx-auto bg-red-50 text-red-800 border-red-200">
                  <AlertDescription>
                    {paymentError}
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
                        {STRIPE_PUBLIC_KEY && STRIPE_PUBLIC_KEY.startsWith('pk_live') && 
                          <span className="ml-1 text-green-600">(Production)</span>
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
