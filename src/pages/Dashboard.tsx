
import React from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import UserBalance from '@/components/UserBalance';
import UserInvestments from '@/components/UserInvestments';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, LogOut, CircleDollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const { data: investments = [], isLoading: isInvestmentsLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalReturn = investments.reduce((sum, inv) => {
    const monthlyReturn = (Number(inv.amount) * Number(inv.return_rate)) / 100;
    return sum + monthlyReturn;
  }, 0);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Votre solde</CardTitle>
          </CardHeader>
          <CardContent>
            <UserBalance />
            <button 
              onClick={() => navigate('/deposit')}
              className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Déposer des fonds
            </button>
          </CardContent>
        </Card>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total investi</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600">
              <CircleDollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{totalInvested}€</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Dans {investments.length} créatrice{investments.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendement</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{totalReturn.toFixed(2)}€</span>
            {totalInvested > 0 && (
              <span className="ml-2 text-sm text-green-500">
                +{((totalReturn / totalInvested) * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Créatrices suivies</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{investments.length}</span>
          </div>
          <button 
            onClick={() => navigate('/creators')}
            className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Découvrir plus de créatrices
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserBalance />
        <UserInvestments />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={() => navigate('/deposit')} 
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Déposer des fonds
        </Button>
        <Button 
          onClick={logout} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
