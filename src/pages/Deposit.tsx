
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserBalance from "@/components/UserBalance";

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
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Début de la création du paiement...");
      
      // Appel à la fonction Edge Supabase
      const response = await fetch(
        "https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/create-payment",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
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
      
      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }
      
      // Vérifier que l'URL est présente
      if (!data.url) {
        throw new Error("Aucune URL de paiement n'a été reçue");
      }
      
      console.log("Redirection vers:", data.url);
      
      // Rediriger vers la page de paiement Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création du paiement");
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
                  min="1"
                  step="0.01"
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
              <p>1. Entrez le montant que vous souhaitez déposer</p>
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
