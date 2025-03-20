
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
        
        // Récupérer toutes les transactions de l'utilisateur
        const { data, error } = await supabase
          .from('transactions')
          .select('amount')
          .eq('user_id', user.id)
          .eq('status', 'completed');
          
        if (error) throw error;
        
        // Calculer le solde total
        const total = data.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
        setBalance(total);
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
