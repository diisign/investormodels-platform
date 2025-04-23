import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, LogOut, CircleDollarSign, TrendingUp, Users, Wallet, Plus, Minus, Filter, Award, UserPlus, Gift, ArrowRight, ArrowUpRight } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FadeIn from '@/components/animations/FadeIn';
import GradientButton from '@/components/ui/GradientButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { creators } from '@/utils/mockData';
import { Database } from '@/integrations/supabase/types';

type Transaction = Database['public']['Tables']['transactions']['Row'];
type Investment = Database['public']['Tables']['investments']['Row'];

interface ExtendedTransaction extends Transaction {
  type: 'deposit' | 'withdrawal' | 'investment';
}

interface ExtendedInvestment extends Investment {
  creator_name: string;
  creator_image: string;
  initial_amount: number;
}

const enhanceTransaction = (transaction: Transaction): ExtendedTransaction => {
  let type: 'deposit' | 'withdrawal' | 'investment' = 'deposit';
  
  if (transaction.payment_method?.includes('investment') || 
      transaction.payment_id?.includes('invest') || 
      transaction.status === 'invested') {
    type = 'investment';
  } else if (transaction.amount < 0 || transaction.payment_method === 'withdrawal') {
    type = 'withdrawal';
  }
  
  return {
    ...transaction,
    type
  };
};

const enhanceInvestment = (investment: Investment): ExtendedInvestment => {
  const creator = creators.find(c => c.id === investment.creator_id) || {
    name: "Créatrice",
    imageUrl: "https://via.placeholder.com/40"
  };
  
  return {
    ...investment,
    creator_name: creator.name,
    creator_image: creator.imageUrl,
    initial_amount: investment.amount
  };
};

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');

  const { data: rawTransactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['userTransactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const userTransactions: ExtendedTransaction[] = rawTransactions.map(enhanceTransaction);

  const { data: rawInvestments = [], isLoading: isInvestmentsLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const investments: ExtendedInvestment[] = rawInvestments.map(enhanceInvestment);

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalReturn = investments.reduce((sum, inv) => {
    const monthlyReturn = (Number(inv.amount) * Number(inv.return_rate)) / 100;
    return sum + monthlyReturn;
  }, 0);

  const generateLastTwelveMonths = () => {
    const months = [];
    let date = new Date(2024, 5);
    for (let i = 0; i < 12; i++) {
      months.unshift(new Date(date).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }));
      date.setMonth(date.getMonth() + 1);
    }
    return months;
  };

  const generatePerformanceData = () => {
    const months = generateLastTwelveMonths();
    return months.map(month => {
      const monthTransactions = userTransactions.filter(t => 
        new Date(t.created_at).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }) === month
      );
      
      return {
        month,
        value: monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
        withdrawal: monthTransactions.find(t => t.type === 'withdrawal')?.amount
      };
    });
  };

  const performanceData = generatePerformanceData();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
    navigate('/deposit');
  };

  const referralData = {
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    earnings: 0,
    recentReferrals: [],
    tierProgress: 0,
    currentTier: 'Starter',
    nextTier: 'Bronze',
    nextTierRequirement: 5
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
                    <div className="text-2xl font-bold">
                      {userTransactions.reduce((sum, t) => sum + Number(t.amount), 0).toFixed(2)}€
                    </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <FadeIn direction="up" className="glass-card lg:col-span-3">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Performance</h3>
                    <select 
                      className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="12">12 derniers mois</option>
                      <option value="6">6 derniers mois</option>
                      <option value="3">3 derniers mois</option>
                    </select>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 5, left: 15, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false}
                          padding={{ left: 10, right: 10 }}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          domain={[0, 'dataMax + 100']}
                          tickCount={5}
                          tickFormatter={(value) => Math.round(value).toString()}
                          width={40}
                        />
                        <Tooltip formatter={(value) => `${value}€`} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0ea5e9"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {investments.map((investment) => (
                      <div 
                        key={investment.id}
                        className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={investment.creator_image || 'https://via.placeholder.com/40'} 
                            alt={investment.creator_name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm">{investment.creator_name}</h4>
                            <span className="text-sm font-semibold">{Number(investment.amount).toFixed(2)}€</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Initial: {Number(investment.initial_amount || investment.amount).toFixed(2)}€
                            </span>
                            <span className="text-xs font-medium text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {investment.return_rate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  {investments.length > 0 ? (
                    <div className="space-y-4">
                      {investments.map((investment) => (
                        <div 
                          key={investment.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={investment.creator_image || 'https://via.placeholder.com/40'} 
                              alt={investment.creator_name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">{investment.creator_name}</h4>
                              <span className="text-sm font-semibold">{Number(investment.amount).toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Initial: {Number(investment.initial_amount || investment.amount).toFixed(2)}€
                              </span>
                              <span className="text-xs font-medium text-green-500 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {investment.return_rate}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-3">
                        <CircleDollarSign className="h-12 w-12 mx-auto opacity-30" />
                      </div>
                      <h4 className="text-lg font-medium mb-2">Aucun investissement</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Vous n'avez pas encore investi dans des créateurs.
                      </p>
                      <GradientButton 
                        onClick={() => navigate('/creators')}
                        size="sm"
                        className="from-teal-400 to-blue-500 text-white"
                      >
                        Découvrir des créatrices
                      </GradientButton>
                    </div>
                  )}
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={100} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Transactions récentes</h3>
                    <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      <span>Filtrer</span>
                    </button>
                  </div>
                  
                  {userTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {userTransactions.map((transaction) => (
                        <div 
                          key={transaction.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                            transaction.type === 'deposit' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                            transaction.type === 'withdrawal' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                            "bg-investment-100 text-investment-600 dark:bg-investment-900/30 dark:text-investment-400"
                          )}>
                            {transaction.type === 'deposit' && <Plus className="h-5 w-5" />}
                            {transaction.type === 'withdrawal' && <Minus className="h-5 w-5" />}
                            {transaction.type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">
                                {transaction.type === 'deposit' ? 'Dépôt' : 
                                 transaction.type === 'withdrawal' ? 'Retrait' : 
                                 'Investissement'}
                                {transaction.type === 'investment' && (
                                  <span className="ml-2 text-gray-500">
                                    - {creators.find(c => c.id === transaction.payment_id)?.name || 'Créatrice'}
                                  </span>
                                )}
                              </h4>
                              <span className={cn(
                                "text-sm font-semibold",
                                transaction.type === 'deposit' ? "text-blue-500" : 
                                transaction.type === 'withdrawal' ? "text-red-500" : 
                                "text-investment-500"
                              )}>
                                {transaction.type === 'withdrawal' ? '-' : '+'}
                                {Math.abs(Number(transaction.amount)).toFixed(2)}€
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                              </span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                transaction.status === 'completed' ? "bg-green-100 text-green-800" : 
                                "bg-yellow-100 text-yellow-800"
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
            
            <FadeIn direction="up" delay={200} className="glass-card mt-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Programme de parrainage</h3>
                  <button
                    onClick={() => navigate('/affiliation')}
                    className="text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
                  >
                    <span>Voir tout</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total parrainages</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-investment-100 dark:bg-investment-900/30 text-investment-600">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralData.totalReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">En attente</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralData.pendingReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Complétés</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralData.completedReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gains totaux</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <Gift className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralData.earnings}€</div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="font-semibold mb-3">Niveau du programme</h4>
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">{referralData.currentTier}</span>
                    <span className="text-sm font-medium">{referralData.nextTier}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700">
                    <div 
                      className="bg-investment-600 h-2 rounded-full" 
                      style={{ width: `${referralData.tierProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">
                      {referralData.completedReferrals}/{referralData.nextTierRequirement}
                    </span> parrainages nécessaires pour débloquer le niveau {referralData.nextTier}
                  </div>
                </div>
              </div>
            </FadeIn>
            
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
      
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <FadeIn className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Déposer des fonds</h2>
            <form onSubmit={handleDeposit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Montant (€)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min="10"
                      step="10"
                      className="input-field pl-10"
                      placeholder="100"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Méthode de paiement
                  </label>
                  <select 
                    id="payment-method" 
                    className="input-field"
                    required
                  >
                    <option value="">Sélectionner une méthode</option>
                    <option value="credit-card">Carte bancaire</option>
                    <option value="bank-transfer">Virement bancaire</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Annuler
                  </button>
                  <GradientButton type="submit">
                    Déposer
                  </GradientButton>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
