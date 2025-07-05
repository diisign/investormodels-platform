import React, { useState } from 'react';
import { useStaticReferralData } from '@/hooks/useStaticReferralData';
import { useStaticInvestmentData } from '@/hooks/useStaticInvestmentData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTransactions from '@/components/dashboard/DashboardTransactions';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import InvestmentsList from '@/components/dashboard/InvestmentsList';
import AffiliationStats from '@/components/affiliations/AffiliationStats';
import FadeIn from '@/components/animations/FadeIn';
import GradientButton from '@/components/ui/GradientButton';
import { CircleDollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dɑshboard = () => {
  const referralData = useStaticReferralData();
  const investmentData = useStaticInvestmentData();
  
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
  };

  const handleWithdraw = () => {
    // Simulated withdraw for test data
    console.log('Withdraw action triggered (test mode)');
  };

  // Transform static data to match expected formats
  const transformedInvestments = investmentData.investments.map(inv => ({
    id: inv.id,
    creator_id: inv.creatorName.toLowerCase().replace(' ', '-'),
    amount: inv.amount,
    return_rate: inv.returnRate,
    created_at: new Date().toISOString(),
    status: 'active',
    user_id: 'test-user'
  }));

  const transformedTransactions = investmentData.transactions.map(trans => ({
    id: trans.id,
    amount: trans.amount,
    created_at: new Date().toISOString(),
    status: 'completed',
    payment_method: trans.type === 'investment' ? 'investment' : trans.type,
    payment_id: trans.type === 'investment' ? trans.id : null,
    creatorProfile: undefined,
    description: trans.description
  }));

  // Generate performance data
  const generatePerformanceData = () => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      data.push({
        month: format(date, 'MMM yy', { locale: fr }),
        investmentValue: investmentData.totalInvested + (investmentData.totalEarnings * (i + 1) / 12),
        referralGains: 50 * (i + 1) / 12,
        monthlyGains: investmentData.totalEarnings / 12
      });
    }
    return data;
  };

  const performanceData = generatePerformanceData().slice(-parseInt(timeRange));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-1">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Mode Test</span>
              </div>
            </div>

            <DashboardStats 
              totalInvested={investmentData.totalInvested}
              totalReturn={investmentData.totalEarnings}
              investmentsCount={investmentData.investments.length}
              balance={investmentData.balance}
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
                    investments={transformedInvestments} 
                    performanceData={performanceData}
                    onWithdraw={handleWithdraw}
                  />
                </div>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <InvestmentsList investments={transformedInvestments} />
              <DashboardTransactions transactions={transformedTransactions} />
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
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Mode Test:</strong> Aucun paiement réel ne sera effectué.
                  </p>
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
                    Déposer (Test)
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

export default Dɑshboard;