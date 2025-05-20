
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserBalance from "@/components/UserBalance";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_PUBLIC_KEY } from "@/integrations/stripe/config";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer un dépôt");
      navigate("/login");
      return;
    }
    
    // Validation du montant
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount < 100) {
      toast.error("Veuillez entrer un montant valide (minimum 100€)");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Début de la création du paiement...");
      
      // Obtenir la session et le token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Session utilisateur expirée");
      }
      
      // Afficher un message informatif pour l'utilisateur
      toast.info("Préparation de votre paiement...");
      
      // Appel à la fonction Edge Supabase
      const response = await fetch(
        "https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/create-payment",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          },
          body: JSON.stringify({
            amount: depositAmount,
            userId: user.id,
            returnUrl: `${window.location.origin}/dashboard`,
          }),
        }
      );
      
      const data = await response.json();
      console.log("Réponse de l'API de paiement:", data);
      
      if (!response.ok && !data.url) {
        throw new Error(data.error || "Une erreur est survenue lors de la création du paiement");
      }
      
      // Rediriger vers la page de paiement Stripe
      const paymentUrl = data.url;
      
      console.log("Redirection vers:", paymentUrl);
      toast.success("Redirection vers la page de paiement...");
      
      // Rediriger vers la page de paiement Stripe
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);
      
      // En cas d'erreur, proposer l'URL fixe comme solution de secours
      toast.error(
        "Erreur lors de la création du paiement. Vous allez être redirigé vers notre page de paiement alternative.",
        {
          duration: 5000,
        }
      );
      
      // Attendre que l'utilisateur voie le message d'erreur puis rediriger
      setTimeout(() => {
        window.location.href = "https://buy.stripe.com/bIY28x2vDcyR97G5kl";
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Déposer des fonds</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Ajouter des fonds</CardTitle>
            <CardDescription>
              Déposez de l'argent sur votre compte pour commencer à investir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Montant (€)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  min="100"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Traitement en cours..." : "Déposer"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <UserBalance />
          <Card>
            <CardHeader>
              <CardTitle>Comment ça marche</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>1. Entrez le montant que vous souhaitez déposer (minimum 100€)</p>
              <p>2. Vous serez redirigé vers notre prestataire de paiement sécurisé</p>
              <p>3. Une fois le paiement confirmé, les fonds seront disponibles dans votre compte</p>
              <p className="text-sm text-gray-500 mt-4">
                Tous les paiements sont sécurisés et cryptés. Nous n'avons jamais accès à vos informations bancaires.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
