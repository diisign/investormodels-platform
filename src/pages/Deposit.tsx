
import React, { useState } from 'react';
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
import UserBalance from '@/components/UserBalance';
import FadeIn from '@/components/animations/FadeIn';

const Deposit = () => {
  const { user, isAuthenticated } = useAuth();
  const [amount, setAmount] = useState<number>(50);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleDeposit = async () => {
    if (amount <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }

    if (!user) {
      toast.error("Vous devez être connecté pour effectuer un dépôt");
      return;
    }

    try {
      setIsLoading(true);

      // Appel à la fonction Edge pour créer une session de paiement Stripe
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: amount,
          userId: user.id,
          returnUrl: window.location.origin + '/dashboard'
        },
      });

      if (error) throw new Error(error.message);
      
      if (data.url) {
        // Rediriger l'utilisateur vers la page de paiement Stripe
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement non reçue");
      }
    } catch (error) {
      console.error('Erreur lors de la création du paiement:', error);
      toast.error("Impossible de créer la session de paiement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <h1 className="text-3xl font-bold mb-8 text-center">Déposez de l'argent sur votre compte</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dépôt</CardTitle>
                      <CardDescription>
                        Choisissez le montant que vous souhaitez déposer sur votre compte.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Montant (€)</Label>
                        <Input
                          id="amount"
                          type="number"
                          min="1"
                          step="1"
                          value={amount}
                          onChange={handleAmountChange}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {[20, 50, 100, 200, 500].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            onClick={() => setAmount(value)}
                            className={`${amount === value ? 'bg-investment-100 border-investment-500 dark:bg-investment-900 dark:border-investment-500' : ''}`}
                          >
                            {value} €
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleDeposit} 
                        disabled={isLoading || amount <= 0}
                        className="w-full bg-investment-600 hover:bg-investment-700"
                      >
                        {isLoading ? "Traitement en cours..." : "Procéder au paiement"}
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
