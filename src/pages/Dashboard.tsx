
import React, { useState } from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import UserBalance from '@/components/UserBalance';
import UserInvestments from '@/components/UserInvestments';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, LogOut, CircleDollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FadeIn from '@/components/animations/FadeIn';
import GradientButton from '@/components/ui/GradientButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');

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

  const { data: transactions = [] } = useQuery({
    queryKey: ['userTransactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

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

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
    navigate('/deposit');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FadeIn direction="up" delay={100} className="glass-card">
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
              </FadeIn>

              <FadeIn direction="up" delay={200} className="glass-card">
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
              </FadeIn>

              <FadeIn direction="up" delay={300} className="glass-card">
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
              </FadeIn>

              <FadeIn direction="up" delay={400} className="glass-card">
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
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <FadeIn direction="up" className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Mes investissements</h3>
                    <button
                      onClick={() => navigate('/investments')}
                      className="text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
                    >
                      Voir tout
                    </button>
                  </div>
                  <UserInvestments />
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={100} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Transactions récentes</h3>
                    <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Filtrer
                    </button>
                  </div>

                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div 
                          key={transaction.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                            transaction.status === 'completed' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                          )}>
                            <Wallet className="h-5 w-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">
                                {transaction.payment_method === 'card' ? 'Paiement par carte' : 'Virement bancaire'}
                              </h4>
                              <span className={cn(
                                "text-sm font-semibold",
                                transaction.status === 'completed' ? "text-green-500" : "text-yellow-500"
                              )}>
                                {transaction.amount}€
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                              </span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                transaction.status === 'completed' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              )}>
                                {transaction.status === 'completed' ? 'Terminé' : 'En cours'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-3">
                        <Wallet className="h-12 w-12 mx-auto opacity-30" />
                      </div>
                      <h4 className="text-lg font-medium mb-2">Aucune transaction</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Vous n'avez pas encore effectué de transactions.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
