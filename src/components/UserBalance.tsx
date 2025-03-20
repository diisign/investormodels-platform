
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const UserBalance = () => {
  const { user } = useAuth();

  // Utiliser React Query pour récupérer et mettre en cache le solde
  const { data: balance = 0, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['userBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      try {
        // Récupérer toutes les transactions de l'utilisateur
        const { data, error } = await supabase
          .from('transactions')
          .select('amount, status')
          .eq('user_id', user.id)
          .eq('status', 'completed');
        
        if (error) throw error;
        
        // Calculer le solde total à partir des transactions
        const total = data && data.length > 0 
          ? data.reduce((sum, transaction) => sum + Number(transaction.amount), 0) 
          : 1000; // Valeur par défaut si aucune transaction
        
        return total;
      } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        return 1000; // Valeur par défaut en cas d'erreur
      }
    },
    enabled: !!user,
    refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
  });
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-black dark:text-white">Votre solde</CardTitle>
      </CardHeader>
      <CardContent>
        {isBalanceLoading ? (
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold text-black dark:text-white">{balance.toFixed(2)} €</div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserBalance;
