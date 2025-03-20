
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Define a Transaction type to use with type assertions
type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
};

const UserBalance = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Si le solde est déjà disponible dans l'objet utilisateur, l'utiliser
        if (user.balance !== undefined) {
          setBalance(user.balance);
          setIsLoading(false);
          return;
        }
        
        // Sinon, calculer le solde total à partir des transactions
        // Cast the entire supabase object to any to avoid TypeScript errors
        const { data, error } = await (supabase as any)
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed');
          
        if (error) throw error;
        
        // Calculer le solde total
        const total = data ? data.reduce((sum: number, transaction: any) => sum + Number(transaction.amount || 0), 0) : 0;
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
