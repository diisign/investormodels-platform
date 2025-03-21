
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { toast } from 'sonner';

const UserBalance = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Vérifie si l'utilisateur revient d'une session de paiement réussie
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    
    if (success === 'true') {
      // Invalider le cache pour forcer la mise à jour du solde
      queryClient.invalidateQueries({
        queryKey: ['userBalance'],
      });
      
      // Nettoyer l'URL
      window.history.replaceState(null, '', window.location.pathname);
      
      toast.success('Paiement effectué avec succès !', {
        description: 'Votre solde sera mis à jour sous peu.',
      });
    }
  }, [queryClient]);

  // Utiliser React Query pour récupérer et mettre en cache le solde
  const { data: balance = 0, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['userBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      try {
        console.log('Récupération du solde pour l\'utilisateur:', user.id);
        
        // Récupérer toutes les transactions de l'utilisateur
        const { data, error } = await supabase
          .from('transactions')
          .select('amount, status')
          .eq('user_id', user.id)
          .eq('status', 'completed');
        
        if (error) {
          console.error('Erreur lors de la récupération des transactions:', error);
          throw error;
        }
        
        console.log('Transactions récupérées:', data);
        
        // Calculer le solde total à partir des transactions
        const total = data && data.length > 0 
          ? data.reduce((sum, transaction) => sum + Number(transaction.amount), 0) 
          : 0; // Valeur par défaut si aucune transaction
        
        console.log('Solde calculé:', total);
        return total;
      } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        return 0; // Valeur par défaut en cas d'erreur
      }
    },
    enabled: !!user,
    refetchInterval: 5000, // Rafraîchir toutes les 5 secondes (au lieu de 10)
    staleTime: 0, // Considérer les données comme obsolètes immédiatement
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
