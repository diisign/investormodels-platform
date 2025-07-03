import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/utils/auth';
import { getUserInvestments } from '@/utils/investments';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CircleDollarSign, TrendingUp, Users, Plus, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTransactions from '@/components/dashboard/DashboardTransactions';
import CreatorProfile from '@/components/dashboard/CreatorProfile';
import AffiliationStats from '@/components/affiliations/AffiliationStats';
import GradientButton from '@/components/ui/GradientButton';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { getCreatorProfile } from '@/utils/creatorProfiles';

const Dashboard = () => {
  const { user } = useAuth();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');
  const queryClient = useQueryClient();

  const { data: investments = [], isLoading: isInvestmentsLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: getUserInvestments,
    enabled: !!user,
  });

  const { data: transactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['userTransactions'],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;

      return data.map(transaction => {
        if (transaction.payment_method === 'investment' && transaction.payment_id) {
          return {
            ...transaction,
            creatorProfile: getCreatorProfile(transaction.payment_id)
          };
        }
        return transaction;
      });
    },
    enabled: !!user,
  });

  const { data: balance = 0 } = useQuery({
    queryKey: ['userBalance'],
    queryFn: async () => {
      if (!user?.id) return 0;
      
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, status')
        .eq('user_id', user.id)
        .eq('status', 'completed');
      
      if (error) throw error;
      
      return data.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    },
    enabled: !!user,
  });

  const calculateTotalReturn = () => {
    const currentDate = new Date('2025-04-26');
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    
    const totalReturn = investments.reduce((sum, inv) => {
      const investmentDate = new Date(inv.created_at);
      const monthsDiff = (currentDate.getFullYear() - investmentDate.getFullYear()) * 12 + 
                       (currentDate.getMonth() - investmentDate.getMonth());
      
      if (monthsDiff < 1) {
        return sum;
      }
      
      const monthlyRate = Number(inv.return_rate) / 3;
      return sum + (Number(inv.amount) * (monthlyRate / 100) * monthsDiff);
    }, 0);

    const percentageReturn = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    return { totalInvested, totalReturn, percentageReturn };
  };

  const { totalInvested, totalReturn, percentageReturn } = calculateTotalReturn();

  const generatePerformanceData = () => {
    const currentDate = new Date('2025-04-26');
    const startDate = new Date('2024-05-01');
    const data = [];
    let accumulatedGains = 0;
    
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + i);
      
      const isAprilOrLater = 
        (monthDate.getMonth() >= 3 && monthDate.getFullYear() === 2025) || 
        monthDate.getFullYear() > 2025;
      
      let value = 0;
      let monthlyGains = 0;
      
      if (isAprilOrLater) {
        value = totalInvested;
        
        investments.forEach(inv => {
          const investmentDate = new Date(inv.created_at);
          const monthsSinceInvestment = 
            (monthDate.getFullYear() - investmentDate.getFullYear()) * 12 + 
            (monthDate.getMonth() - investmentDate.getMonth());
          
          if (monthsSinceInvestment > 0) {
            const monthlyRate = Number(inv.return_rate) / 3;
            const monthlyReturn = Number(inv.amount) * (monthlyRate / 100);
            const totalReturn = monthlyReturn * monthsSinceInvestment;
            value += totalReturn;
            monthlyGains += monthlyReturn;
          }
        });
        
        accumulatedGains += monthlyGains;
      }
      
      data.push({
        month: format(monthDate, 'MMM yy', { locale: fr }),
        value: Number(value.toFixed(2)),
        monthlyGains: Number(monthlyGains.toFixed(2))
      });
    }
    
    return data;
  };

  const fullPerformanceData = generatePerformanceData();
  const performanceData = fullPerformanceData.slice(-parseInt(timeRange));

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
  };

  const handleWithdraw = () => {
    queryClient.invalidateQueries({ queryKey: ['userBalance'] });
    queryClient.invalidateQueries({ queryKey: ['userTransactions'] });
  };

  if (isInvestmentsLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 space-y-8">
            {/* Overview Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Overview</h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn direction="up" delay={100}>
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Total fund</span>
                        <span className="text-xs text-green-400 font-medium">+{percentageReturn.toFixed(1)}%</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{(totalInvested + totalReturn).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€</div>
                    </div>
                  </Card>
                </FadeIn>
                
                <FadeIn direction="up" delay={200}>
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <div className="space-y-2">
                      <span className="text-sm text-gray-400">Total Work Space</span>
                      <div className="text-2xl font-bold text-white">{investments.length}</div>
                    </div>
                  </Card>
                </FadeIn>
                
                <FadeIn direction="up" delay={300}>
                  <Card className="bg-gray-900 border-gray-800 p-6">
                    <div className="space-y-2">
                      <span className="text-sm text-gray-400">Products</span>
                      <div className="text-2xl font-bold text-white">{balance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€</div>
                    </div>
                  </Card>
                </FadeIn>
              </div>
            </div>

            {/* Transaction Overview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Transaction overview</h2>
                <div className="flex gap-4">
                  <button className="text-sm text-white bg-gray-800 px-3 py-1 rounded">Monthly</button>
                  <button className="text-sm text-gray-400">Yearly</button>
                </div>
              </div>
              
              <FadeIn direction="up" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-white">{totalReturn.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-400">Profit</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{totalInvested.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}€</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                      <span className="text-gray-400">Expenses</span>
                    </div>
                  </div>
                </div>
                
                <PerformanceChart 
                  investments={investments} 
                  performanceData={performanceData}
                  onWithdraw={handleWithdraw}
                />
              </FadeIn>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Investments */}
              <FadeIn direction="up" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Investments</h3>
                  <div className="flex gap-2">
                    <button className="text-sm text-white bg-gray-800 px-3 py-1 rounded">Today</button>
                    <button className="text-sm text-gray-400">All</button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {investments.slice(0, 4).map((investment) => (
                    <CreatorProfile
                      key={investment.id}
                      creatorId={investment.creator_id}
                      amount={investment.amount}
                      returnRate={investment.return_rate}
                      initialAmount={investment.amount}
                    />
                  ))}
                </div>
                
                {investments.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-3">
                      <CircleDollarSign className="h-12 w-12 mx-auto opacity-30" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Aucun investissement</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Vous n'avez pas encore investi dans des créateurs.
                    </p>
                    <Link to="/creators">
                      <GradientButton size="sm">
                        Découvrir des créatrices
                      </GradientButton>
                    </Link>
                  </div>
                )}
              </FadeIn>
              
              {/* Recent Activity */}
              <FadeIn direction="up" className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                  <div className="flex gap-2">
                    <button className="text-sm text-white bg-gray-800 px-3 py-1 rounded">Today</button>
                    <button className="text-sm text-gray-400">All</button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {transactions.slice(0, 4).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <CircleDollarSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {transaction.payment_method === 'investment' ? 'Investissement' : 'Dépôt'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {format(new Date(transaction.created_at), 'dd MMM', { locale: fr })}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-400">
                        +{Number(transaction.amount).toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>
                
                {transactions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">Aucune transaction récente</div>
                    <Link to="/deposit">
                      <GradientButton size="sm">
                        Effectuer un dépôt
                      </GradientButton>
                    </Link>
                  </div>
                )}
              </FadeIn>
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
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-investment-500 dark:focus:ring-investment-400 focus:border-transparent dark:bg-gray-700"
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
                    className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-investment-500 dark:focus:ring-investment-400 focus:border-transparent dark:bg-gray-700"
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
