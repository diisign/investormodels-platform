import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CircleDollarSign, TrendingUp, Users, Wallet, Plus, Minus, Filter, Award, UserPlus, Gift } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import UserBalance from '@/components/UserBalance';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';
import { creators, mockUserData } from '@/utils/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const generateRealisticData = () => {
  // BrookMills investment from October 6, 2024
  const brookMillsInvestment = {
    date: new Date('2024-10-06'),
    amount: 500,
    monthlyGain: 215, // Monthly gain based on 130% return rate over 3 months (43.3% per month)
    returnRate: 749.6,
    withdrawalDate: new Date('2025-01-06')
  };
  
  const startDate = new Date('2024-08-01'); // Start 2 months before investment
  const currentDate = new Date('2025-05-11'); // Current date
  
  const performanceData = [];
  const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
    (currentDate.getMonth() - startDate.getMonth());
  
  let totalValue = 0; // Start with zero
  
  for (let i = 0; i <= monthsDiff; i++) {
    const currentMonthDate = new Date(startDate);
    currentMonthDate.setMonth(startDate.getMonth() + i);
    const monthName = currentMonthDate.toLocaleString('default', { month: 'short' });
    const year = currentMonthDate.getFullYear();
    const monthLabel = `${monthName} ${year.toString().slice(2)}`;
    
    // Initial investment on October 6, 2024
    if (currentMonthDate.getFullYear() === brookMillsInvestment.date.getFullYear() && 
        currentMonthDate.getMonth() === brookMillsInvestment.date.getMonth()) {
      totalValue += brookMillsInvestment.amount;
    }
    
    // Monthly gains from October to December (3 months at 43.3% per month)
    if (
      (currentMonthDate.getFullYear() === 2024 && currentMonthDate.getMonth() >= 10) || // Oct-Dec 2024
      (currentMonthDate.getFullYear() === 2025 && currentMonthDate.getMonth() === 0)   // Jan 2025
    ) {
      if (currentMonthDate.getFullYear() > brookMillsInvestment.date.getFullYear() || 
          currentMonthDate.getMonth() > brookMillsInvestment.date.getMonth()) {
        totalValue += brookMillsInvestment.monthlyGain;
      }
    }
    
    // January 6, 2025: Now have 1145€ total (500 + 215*3 = 500 + 645 = 1145)
    if (currentMonthDate.getFullYear() === 2025 && currentMonthDate.getMonth() === 0) {
      // No specific action needed, just continue tracking the value
    }
    
    // New monthly gains from January to April (months 4-7 at 43.3% of 1145 = 492€ per month)
    if (currentMonthDate.getFullYear() === 2025 && currentMonthDate.getMonth() >= 1 && currentMonthDate.getMonth() <= 3) {
      if (i > 0 && (
          currentMonthDate.getFullYear() > 2025 || 
          (currentMonthDate.getFullYear() === 2025 && currentMonthDate.getMonth() >= 1)
      )) {
        totalValue += 492; // Monthly gain from January to April
      }
    }
    
    // April 2025: Now have 2621€ total (1145 + 492*3 = 1145 + 1476 = 2621)
    // New monthly gains from April onwards (43.3% of 2621 = 1127€ per month)
    if (currentMonthDate.getFullYear() === 2025 && currentMonthDate.getMonth() >= 4) {
      totalValue += 1127; // Monthly gain from May onwards
    }
    
    performanceData.push({
      month: monthLabel,
      value: Number(totalValue.toFixed(2)),
      withdrawal: undefined
    });
  }
  
  // Get the current investments from mockUserData
  const portfolioData = mockUserData.investments.map(inv => ({
    name: inv.creatorName,
    value: inv.amount,
    imageUrl: inv.creatorImage,
    returnRate: inv.returnRate
  }));

  // Calculate total invested amount
  const totalInvested = mockUserData.investments.reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate total earnings - updated to 3248
  const totalEarnings = 3248;

  // Calculate average percentage return across all investments - updated to 749.6%
  const totalPercentageReturn = 749.6;

  // Use the transactions from mockUserData
  const transactions = mockUserData.transactions;
  
  const referralData = {
    totalReferrals: 9,
    pendingReferrals: 3,
    completedReferrals: 6,
    earnings: 875,
    recentReferrals: [
      { name: 'Luc V.', date: '11/04/2025', status: 'completed', reward: 125 },
      { name: 'Salomé G.', date: '12/04/2025', status: 'completed', reward: 200 },
      { name: 'Alan P.', date: '16/04/2025', status: 'completed', reward: 75 },
      { name: 'Karine B.', date: '17/04/2025', status: 'completed', reward: 250 },
      { name: 'Charles N.', date: '18/04/2025', status: 'completed', reward: 150 },
      { name: 'Lina F.', date: '19/04/2025', status: 'completed', reward: 75 },
      { name: 'Inès D.', date: '20/04/2025', status: 'pending', reward: 180 },
      { name: 'Hugo P.', date: '20/04/2025', status: 'pending', reward: 260 },
      { name: 'Nicolas S.', date: '20/04/2025', status: 'pending', reward: 120 },
    ],
    tierProgress: Math.round((6 / 9) * 100),
    currentTier: 'Starter',
    nextTier: 'Bronze',
    nextTierRequirement: 9
  };

  const updatedReferralEarnings = referralData.earnings;
  const totalEarningsValue = totalEarnings;
  
  const balanceWithoutReferral = Number(totalValue.toFixed(2));
  const balance = balanceWithoutReferral + updatedReferralEarnings;

  return {
    performanceData,
    portfolioData,
    investments: mockUserData.investments,
    transactions,
    referralData,
    balance,
    totalInvested,
    totalEarnings: totalEarnings,
    monthlyChartData: performanceData.map(item => ({
      month: item.month,
      value: item.value
    })),
    totalPercentageReturn
  };
};

const Exemples2 = () => {
  const data = generateRealisticData();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
  };

  const withdrawalPoint = data.performanceData.findIndex(item => item.withdrawal);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <FadeIn direction="up" delay={100} className="glass-card">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-black dark:text-white">Votre solde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black dark:text-white">{data.balance.toFixed(2)} €</div>
                    <button 
                      onClick={() => setShowDepositModal(true)}
                      className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Déposer des fonds
                    </button>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn direction="up" delay={200} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total investi</h3>
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600">
                      <CircleDollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{data.totalInvested}€</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Dans {data.investments.length} créatrice
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={300} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendement</h3>
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{data.totalEarnings}€</span>
                    <span className="ml-2 text-sm text-green-500">
                      +{data.totalPercentageReturn}%
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {/* Retrait total le 06 avril 2025 --> removed as requested */}
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={400} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Créatrices suivies</h3>
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{data.investments.length}</span>
                  </div>
                  <Link to="/creators" className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium">
                    <Plus className="h-4 w-4 mr-1" />
                    Découvrir plus de créatrices
                  </Link>
                </div>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                        data={data.performanceData.slice(-parseInt(timeRange))}
                        margin={{ top: 5, right: 5, left: 15, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false}
                          padding={{ left: 10, right: 10 }}
                          tick={{ fontSize: 10 }}
                          interval={0}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          domain={['dataMin - 10', 'dataMax + 10']}
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
                        {withdrawalPoint >= 0 && (
                          <ReferenceLine 
                            x={data.performanceData[withdrawalPoint].month}
                            stroke="#22c55e" 
                            strokeDasharray="3 3"
                            strokeWidth={2}
                            label={{ 
                              value: `Retrait total: ${data.performanceData[withdrawalPoint].withdrawal}€`, 
                              position: 'top', 
                              fill: "#22c55e",
                              fontSize: 12
                            }} 
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {data.investments.map((investment, index) => (
                      <div 
                        key={investment.id}
                        className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={investment.creatorImage} 
                            alt={investment.creatorName} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm">{investment.creatorName}</h4>
                            <span className="text-sm font-semibold">{investment.amount.toFixed(2)}€</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Initial: {investment.amount}€
                            </span>
                            <span className="text-xs font-medium text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {investment.returnRate}%
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
                    <Link to="/investments" className="text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium">
                      <span>Voir tout</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  {data.investments && data.investments.length > 0 ? (
                    <div className="space-y-4">
                      {data.investments.map((investment) => (
                        <div 
                          key={investment.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={investment.creatorImage} 
                              alt={investment.creatorName} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">{investment.creatorName}</h4>
                              <span className="text-sm font-semibold">{investment.amount.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Initial: {investment.amount}€
                              </span>
                              <span className="text-xs font-medium text-green-500 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {investment.returnRate}%
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
                      <Link to="/creators">
                        <GradientButton 
                          size="sm"
                          gradientDirection="to-r"
                          className="from-teal-400 to-blue-500 text-white"
                        >
                          Découvrir des créatrices
                        </GradientButton>
                      </Link>
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
                  
                  {data.transactions.length > 0 ? (
                    <div className="space-y-4">
                      {data.transactions.map((transaction) => (
                        <div 
                          key={transaction.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                            transaction.type === 'deposit' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                            transaction.type === 'withdrawal' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                            "bg-investment-100 text-investment-600 dark:bg-investment-900/30 dark:text-investment-400"
                          )}>
                            {transaction.type === 'deposit' && <Plus className="h-5 w-5" />}
                            {transaction.type === 'withdrawal' && <Minus className="h-5 w-5" />}
                            {transaction.type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">{transaction.description}</h4>
                              <span className={cn(
                                "text-sm font-semibold",
                                transaction.type === 'deposit' ? "text-blue-500" : 
                                transaction.type === 'withdrawal' ? "text-green-500" : 
                                "text-red-500"
                              )}>
                                {transaction.type === 'deposit' ? '+' : ''}
                                {transaction.amount}€
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {transaction.date}
                              </span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                transaction.status === 'completed' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              )}>
                                {transaction.status === 'completed' ? 'Terminé' :
                                 transaction.status === 'pending' ? 'En attente' : 'Échoué'}
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
                  <Link to="/affiliation" className="text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium">
                    <span>Voir tout</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total parrainages</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-investment-100 dark:bg-investment-900/30 text-investment-600">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{data.referralData.totalReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">En attente</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{data.referralData.pendingReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Complétés</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{data.referralData.completedReferrals}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gains totaux</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <Gift className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{data.referralData.earnings}€</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <h4 className="font-semibold mb-3">Parrainages récents</h4>
                    <div className="space-y-3 max-h-72 overflow-y-auto">
                      {data.referralData.recentReferrals.map((referral, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                          <div>
                            <div className="font-medium text-sm">{referral.name}</div>
                            <div className="text-xs text-gray-500">{referral.date}</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-green-500">{referral.status === "completed" ? `+${referral.reward}€` : `+${referral.reward}€`}</span>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full mt-1",
                              referral.status === 'completed' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            )}>
                              {referral.status === 'completed' ? 'Complété' : 'En attente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <h4 className="font-semibold mb-3">Niveau du programme</h4>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium">{data.referralData.currentTier}</span>
                      <span className="text-sm font-medium">{data.referralData.nextTier}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 dark:bg-gray-700">
                      <div 
                        className="bg-investment-600 h-2 rounded-full" 
                        style={{ width: `${data.referralData.tierProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">
                        {data.referralData.completedReferrals}/{data.referralData.nextTierRequirement}
                      </span> parrainages nécessaires pour débloquer le niveau {data.referralData.nextTier}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <FadeIn className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Déposer des fonds</h3>
            <form onSubmit={handleDeposit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium mb-1">Montant (€)</label>
                <input 
                  type="number" 
                  id="amount"
                  min="100"
                  step="10"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-investment-500 focus:border-investment-500"
                  placeholder="100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Montant minimum: 100€</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                  onClick={() => setShowDepositModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-investment-600 text-white rounded-md text-sm font-medium hover:bg-investment-700"
                >
                  Déposer
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Exemples2;
