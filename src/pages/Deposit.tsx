
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
import { ExternalLink } from 'lucide-react';

const Deposit = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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

  const handleStripeRedirect = () => {
    // Rediriger vers le lien de paiement Stripe préexistant
    window.location.href = "https://buy.stripe.com/bIY28x2vDcyR97G5kl";
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
                      <CardTitle>Dépôt</CardTitle>
                      <CardDescription>
                        Cliquez sur le bouton ci-dessous pour effectuer un dépôt sur votre compte.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Vous allez être redirigé vers la page de paiement sécurisée de Stripe pour compléter votre transaction.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleStripeRedirect} 
                        disabled={isLoading}
                        className="w-full bg-investment-600 hover:bg-investment-700 flex items-center justify-center gap-2"
                      >
                        <span>Effectuer un dépôt</span>
                        <ExternalLink size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <UserBalance />
                  
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
