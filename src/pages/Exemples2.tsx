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
import { creators } from '@/utils/mockData';

const generateRealisticData = () => {
  // Configuration spécifique de l'investissement
  const creator = {
    id: 'creator_maria',
    name: 'Maria 🤸🏻‍*', 
    imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/l/lq/lqy/lqyww860kcjl7vlskjkvhqujrfpks1rr1708457235/373336356/avatar.jpg'
  };
  
  const firstInvestment = { 
    date: new Date('2024-10-03'), 
    amount: 800, 
    monthlyGain: 344,
    returnRate: 43,
    withdrawalDate: new Date('2025-01-23'),
    withdrawalAmount: 1832
  };
  
  const secondInvestment = {
    date: new Date('2025-01-25'),
    amount: 1000,
    monthlyGain: 430,
    returnRate: 43
  };
  
  const startDate = new Date('2024-10-03');
  const currentDate = new Date('2025-04-20');
  
  const performanceData = [];
  const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
    (currentDate.getMonth() - startDate.getMonth());
  
  let totalValue = firstInvestment.amount;
  
  for (let i = 0; i <= monthsDiff; i++) {
    const currentMonthDate = new Date(startDate);
    currentMonthDate.setMonth(startDate.getMonth() + i);
    const monthName = currentMonthDate.toLocaleString('default', { month: 'short' });
    const year = currentMonthDate.getFullYear();
    const monthLabel = `${monthName} ${year.toString().slice(2)}`;
    
    if (i > 0 && currentMonthDate < firstInvestment.withdrawalDate) {
      totalValue += firstInvestment.monthlyGain;
    }
    
    if (currentMonthDate.getMonth() === firstInvestment.withdrawalDate.getMonth() && 
        currentMonthDate.getFullYear() === firstInvestment.withdrawalDate.getFullYear()) {
      totalValue = secondInvestment.amount; // Reset to second investment amount after withdrawal
    }
    
    if (currentMonthDate > secondInvestment.date) {
      totalValue += secondInvestment.monthlyGain;
    }
    
    performanceData.push({
      month: monthLabel,
      value: Number(totalValue.toFixed(2)),
      withdrawal: currentMonthDate.getMonth() === firstInvestment.withdrawalDate.getMonth() ? 
                 firstInvestment.withdrawalAmount - secondInvestment.amount : undefined
    });
  }
  
  const portfolioData = [{
    name: creator.name,
    value: performanceData[performanceData.length - 1].value,
    initial: secondInvestment.amount,
    imageUrl: creator.imageUrl,
    returnRate: secondInvestment.returnRate
  }];
  
  const investmentsList = [{
    id: '1',
    creatorName: creator.name,
    creatorImage: creator.imageUrl,
    planName: 'Professionnel',
    amount: portfolioData[0].value,
    initial: secondInvestment.amount,
    returnRate: secondInvestment.returnRate,
    totalReturn: 43,
    status: 'completed'
  }];
  
  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: firstInvestment.amount,
      date: '03/10/2024',
      status: 'completed',
      description: 'Dépôt initial'
    },
    {
      id: '2',
      type: 'investment',
      amount: -firstInvestment.amount,
      date: '03/10/2024',
      status: 'completed',
      description: `Investissement - ${creator.name}`
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: firstInvestment.withdrawalAmount - secondInvestment.amount, // Only the withdrawn amount (832€)
      date: '23/01/2025',
      status: 'completed',
      description: 'Retrait partiel'
    },
    {
      id: '4',
      type: 'investment',
      amount: -secondInvestment.amount,
      date: '25/01/2025',
      status: 'completed',
      description: `Réinvestissement - ${creator.name}`
    }
  ];
  
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
  
  return {
    performanceData,
    portfolioData,
    investments: investmentsList,
    transactions,
    referralData,
    balance: Number(totalValue.toFixed(2)),
    totalInvested: secondInvestment.amount,
    totalEarnings: Number((totalValue - secondInvestment.amount).toFixed(2)),
    monthlyChartData: performanceData.map(item => ({
      month: item.month,
      value: item.value
    })),
    totalPercentageReturn: 43
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
                    <div className="text-2xl font-bold text-black dark:text-white">{data.balance} €</div>
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
                    <span className="text-2xl font-bold">{data.totalEarnings.toFixed(2)}€</span>
                    <span className="ml-2 text-sm text-green-500">+{data.totalPercentageReturn}%</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Retrait total le 06 avril 2025
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
                              value: "Retrait total: 1554.13€", 
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
                              Initial: {investment.initial}€
                            </span>
                            <span className="text-xs font-medium text-green-500 flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {investment.totalReturn}%
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
                                Initial: {investment.initial}€
                              </span>
                              <span className="text-xs font-medium text-green-500 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {investment.totalReturn}%
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
                            <span className="text-sm font-semibold text-green-500">+{referral.reward}€</span>
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

export default Exemples2;
