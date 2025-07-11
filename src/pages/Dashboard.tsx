import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/utils/auth';
import { getUserInvestments } from '@/utils/investments';
import { Investment } from '@/types/investments';
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

  const { data: investments = [], isLoading: isInvestmentsLoading } = useQuery<Investment[]>({
    queryKey: ['userInvestments'],
    queryFn: getUserInvestments,
    enabled: !!user,
    staleTime: 0, // Always refetch data
    gcTime: 0, // Don't cache data (gcTime replaced cacheTime in v5)
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
    staleTime: 0,
    gcTime: 0,
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
    staleTime: 0,
    gcTime: 0,
  });

  const calculateTotalReturn = () => {
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    
    // Calculer les gains réels basés sur les investissements
    const totalReturn = investments.reduce((sum, inv) => {
      const investmentDate = new Date(inv.created_at);
      const monthsSinceInvestment = Math.floor((Date.now() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const monthlyRate = Number(inv.return_rate) / 3; // Taux trimestriel converti en mensuel
      const gains = Number(inv.amount) * (monthlyRate / 100) * monthsSinceInvestment;
      return sum + gains;
    }, 0);
    
    const percentageReturn = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    return { totalInvested, totalReturn, percentageReturn };
  };

  const { totalInvested, totalReturn, percentageReturn } = calculateTotalReturn();

  const generatePerformanceData = () => {
    const currentDate = new Date();
    // Commencer à partir de juillet 2024 jusqu'à juillet 2025 (13 mois pour inclure juillet courant)
    const startDate = new Date(2024, 6, 1); // juillet 2024 (mois 6 = juillet)
    const data = [];
    
    // Générer 13 mois à partir de juillet 2024 pour inclure juillet 2025
    for (let i = 0; i < 13; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + i);
      
      let investmentValue = 0;
      let monthlyGains = 0;
      let referralGains = 0;
      
      // Calculer les investissements et gains pour ce mois spécifique
      investments.forEach(inv => {
        const investmentDate = new Date(inv.created_at);
        const investmentMonth = new Date(investmentDate.getFullYear(), investmentDate.getMonth(), 1);
        
        // Si l'investissement a été fait ce mois-ci ou avant
        if (investmentMonth <= monthDate) {
          // Ajouter le montant de l'investissement
          investmentValue += Number(inv.amount);
          
          // Calculer les gains seulement pour les mois après l'investissement
          const monthsSinceInvestment = 
            (monthDate.getFullYear() - investmentDate.getFullYear()) * 12 + 
            (monthDate.getMonth() - investmentDate.getMonth());
          
          if (monthsSinceInvestment > 0) {
            const monthlyRate = Number(inv.return_rate) / 3; // Taux trimestriel converti en mensuel
            const totalGainsForThisInvestment = Number(inv.amount) * (monthlyRate / 100) * monthsSinceInvestment;
            investmentValue += totalGainsForThisInvestment;
            monthlyGains += Number(inv.amount) * (monthlyRate / 100);
          }
        }
      });
      
      // Simulate referral gains (pour l'instant 0€ comme indiqué dans l'image)
      referralGains = 0;
      
      data.push({
        month: format(monthDate, 'MMM yy', { locale: fr }),
        investmentValue: Number(investmentValue.toFixed(2)),
        referralGains: Number(referralGains.toFixed(2)),
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
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

            <DashboardStats 
              totalInvested={totalInvested}
              totalReturn={totalReturn}
              investmentsCount={investments.length}
              balance={balance}
              onDepositClick={() => setShowDepositModal(true)}
            />

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
                  
                  <PerformanceChart 
                    investments={investments} 
                    performanceData={performanceData}
                    onWithdraw={handleWithdraw}
                  />
                </div>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <FadeIn direction="up" className="glass-card">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">Mes investissements</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <CreatorProfile
                        key={investment.id}
                        creatorId={investment.creator_id}
                        amount={investment.amount}
                        returnRate={investment.return_rate}
                        initialAmount={investment.amount}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
              
              <DashboardTransactions transactions={transactions} />
            </div>

            <div className="mt-8">
              <AffiliationStats />
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
