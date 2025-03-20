
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const UserBalance = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Pour l'instant, nous utilisons un solde fixe car la table transactions n'existe pas encore
        // Nous pourrons implémenter cela correctement une fois la table créée
        setBalance(1000); // Solde fictif temporaire
        
        console.log('UserBalance: Utilisateur connecté, ID:', user.id);
      } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBalance();
  }, [user]);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Votre solde</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold">{balance.toFixed(2)} €</div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserBalance;
