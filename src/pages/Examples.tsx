
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CircleDollarSign, TrendingUp, Users, Wallet, Plus, Minus, Filter, Award, UserPlus, Gift } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import UserBalance from '@/components/UserBalance';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Generate realistic data for the example dashboard based on user investments
const generateRealisticData = () => {
  // Initial investment amount - 100€ for Emma Wilson
  const initialInvestment = 100;
  
  // Investment and withdrawal dates
  const startInvestmentDate = new Date('2024-06-10'); // June 10, 2024
  const withdrawalDate = new Date('2024-12-15'); // December 15, 2024
  const withdrawalAmount = 200;
  
  // Creator with their specific returns
  const creators = [
    { 
      name: 'Emma Wilson', 
      monthlyGain: 36.5, // 36.5€ per month
      returnRate: 36.5, // Percentage for display
      invested: 100,
      imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg' 
    }
  ];
  
  // Generate 12 months of performance data
  const performanceData = [];
  
  // Start date 12 months ago from current date
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(currentDate.getMonth() - 11); // Starting 12 months ago (0-indexed)
  
  // Track total value over time
  let totalValue = 0;
  
  // For each month
  for (let i = 0; i <= 11; i++) { // 0 to 11 = 12 months
    const currentMonthDate = new Date(startDate);
    currentMonthDate.setMonth(startDate.getMonth() + i);
    
    // Only add investment if we've reached the investment date
    if (i === 0 || currentMonthDate >= startInvestmentDate) {
      if (i === 0 && currentMonthDate >= startInvestmentDate) {
        // Add the initial investment if the first month is after or equal to investment date
        totalValue += initialInvestment;
      } else if (i > 0 && currentMonthDate.getMonth() === startInvestmentDate.getMonth() && 
                 currentMonthDate.getFullYear() === startInvestmentDate.getFullYear()) {
        // Add the initial investment on the exact month of investment
        totalValue += initialInvestment;
      }
    }
    
    // Add monthly gains if after investment date
    if (currentMonthDate > startInvestmentDate) {
      // Calculate months since investment (including partial months)
      const timeDiff = currentMonthDate.getTime() - startInvestmentDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      const monthsDiff = daysDiff / 30; // Approximating a month as 30 days
      
      if (monthsDiff >= 1) {
        // Add monthly gains for each full month that has passed
        const fullMonthsPassed = Math.floor(monthsDiff);
        creators.forEach(creator => {
          // Only add gains for the current month if it hasn't been withdrawn yet
          if (currentMonthDate < withdrawalDate || 
             (currentMonthDate.getMonth() === withdrawalDate.getMonth() && 
              currentMonthDate.getFullYear() === withdrawalDate.getFullYear())) {
            totalValue += creator.monthlyGain;
          }
        });
      }
    }
    
    // Subtract withdrawal amount if we've reached the withdrawal date
    if (currentMonthDate.getMonth() === withdrawalDate.getMonth() && 
        currentMonthDate.getFullYear() === withdrawalDate.getFullYear()) {
      totalValue -= withdrawalAmount;
    }
    
    // Format the month for display
    const monthName = currentMonthDate.toLocaleString('default', { month: 'short' });
    
    performanceData.push({
      month: monthName,
      value: Number(totalValue.toFixed(2))
    });
  }
  
  // Calculate current portfolio values for each creator
  const portfolioData = creators.map(creator => {
    const monthsSinceInvestment = Math.min(
      Math.floor(
        (new Date().getTime() - startInvestmentDate.getTime()) / 
        (30 * 24 * 60 * 60 * 1000)
      ),
      Math.floor(
        (withdrawalDate.getTime() - startInvestmentDate.getTime()) / 
        (30 * 24 * 60 * 60 * 1000)
      )
    );
    
    // Calculate current value: initial investment + (monthly gain * months) - withdrawal
    const currentValue = creator.invested + (creator.monthlyGain * monthsSinceInvestment) - withdrawalAmount;
    
    return {
      name: creator.name,
      value: Number(Math.max(0, currentValue).toFixed(2)),
      initial: creator.invested,
      imageUrl: creator.imageUrl,
      returnRate: creator.returnRate
    };
  });
  
  // Generate investments list
  const investments = portfolioData.map((item, index) => ({
    id: String(index + 1),
    creatorName: item.name,
    creatorImage: item.imageUrl,
    planName: 'Growth',
    amount: item.value,
    initial: item.initial,
    returnRate: item.returnRate,
    status: 'active'
  }));
  
  // Calculate total earnings before withdrawal
  const earningsBeforeWithdrawal = creators.reduce((sum, creator) => {
    const monthsBeforeWithdrawal = Math.floor(
      (withdrawalDate.getTime() - startInvestmentDate.getTime()) / 
      (30 * 24 * 60 * 60 * 1000)
    );
    return sum + (creator.monthlyGain * monthsBeforeWithdrawal);
  }, 0);
  
  // Generate transactions
  const transactions = [
    // Initial deposits
    {
      id: '1',
      type: 'deposit',
      amount: initialInvestment,
      date: '10/06/2024',
      status: 'completed',
      description: 'Dépôt initial'
    },
    // Initial investments
    {
      id: '2',
      type: 'investment',
      amount: -initialInvestment,
      date: '10/06/2024',
      status: 'completed',
      description: `Investissement - ${creators[0].name}`
    }
  ];
  
  // Add monthly earnings
  let transactionId = 3;
  
  // Generate dates for past months after investment date
  const startMonth = startInvestmentDate.getMonth();
  const startYear = startInvestmentDate.getFullYear();
  
  for (let i = 0; i < 6; i++) { // Adding 6 months of earnings
    const transactionDate = new Date(startYear, startMonth + i + 1, 10); // +1 to start from month after investment
    
    // Skip if before investment date
    if (transactionDate <= startInvestmentDate) continue;
    
    // Skip if after withdrawal date
    if (transactionDate > withdrawalDate) continue;
    
    // Format date as MM/DD/YYYY
    const formattedDate = `${transactionDate.getMonth() + 1}/${transactionDate.getDate()}/${transactionDate.getFullYear()}`;
    
    // Add earning for each creator
    creators.forEach(creator => {
      transactions.push({
        id: String(transactionId++),
        type: 'earning',
        amount: creator.monthlyGain,
        date: formattedDate,
        status: 'completed',
        description: `Gains mensuels - ${creator.name}`
      });
    });
  }
  
  // Add withdrawal transaction
  transactions.push({
    id: String(transactionId++),
    type: 'withdrawal',
    amount: -withdrawalAmount,
    date: '15/12/2024',
    status: 'completed',
    description: 'Retrait de bénéfices'
  });
  
  // Generate referral data
  const referralData = {
    totalReferrals: 2,
    pendingReferrals: 1,
    completedReferrals: 1,
    earnings: 15,
    recentReferrals: []
  };
  
  // Calculate final balance (current value)
  const balance = performanceData[performanceData.length - 1].value;
  
  return {
    performanceData,
    portfolioData,
    investments,
    transactions,
    referralData,
    balance,
    totalInvested: initialInvestment,
    totalEarnings: earningsBeforeWithdrawal,
    COLORS: ['#0284c7', '#0ea5e9']
  };
};

const Examples = () => {
  const data = generateRealisticData();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={true} onLogout={() => {}} />
      
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <FadeIn direction="up">
                <h1 className="text-3xl font-bold mb-2">Exemple de tableau de bord</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Ceci est un exemple de tableau de bord avec des données basées sur un investissement de 100€ sur Emma Wilson.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                  <p className="font-medium">Note importante</p>
                  <p>Ceci est un exemple illustratif basé sur un investissement de 100€ sur Emma Wilson (+36,5€/mois), démarré le 10 juin 2024, avec un retrait de 200€ effectué le 15 décembre 2024.</p>
                </div>
              </FadeIn>
            </div>
            
            {/* Stats Cards */}
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
                    <span className="ml-2 text-sm text-green-500">+{(data.totalInvested > 0 ? (data.totalEarnings / data.totalInvested) * 100 : 0).toFixed(1)}%</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Avant le retrait du 15 décembre
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
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Performance Chart */}
              <FadeIn direction="up" className="glass-card lg:col-span-2">
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
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          domain={['dataMin - 10', 'dataMax + 10']}
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
                </div>
              </FadeIn>
              
              {/* Right Column - Portfolio Distribution */}
              <FadeIn direction="up" delay={100} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Répartition du portefeuille</h3>
                  </div>
                  <div className="h-64 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {data.portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={data.COLORS[index % data.COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}€`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {data.portfolioData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full mr-2"
                            style={{ backgroundColor: data.COLORS[index % data.COLORS.length] }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">{item.value}€</span>
                          <span className="text-xs text-green-500 ml-2">+{item.returnRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            
            {/* Investments and Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Investments */}
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
                              <span className="text-sm font-semibold">{investment.amount}€</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Initial: {investment.initial}€
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
              
              {/* Recent Transactions */}
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
                      {data.transactions.slice(0, 5).map((transaction) => (
                        <div 
                          key={transaction.id}
                          className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                            transaction.type === 'deposit' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                            transaction.type === 'withdrawal' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                            transaction.type === 'investment' ? "bg-investment-100 text-investment-600 dark:bg-investment-900/30 dark:text-investment-400" :
                            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          )}>
                            {transaction.type === 'deposit' && <Plus className="h-5 w-5" />}
                            {transaction.type === 'withdrawal' && <Minus className="h-5 w-5" />}
                            {transaction.type === 'investment' && <ArrowUpRight className="h-5 w-5" />}
                            {transaction.type === 'earning' && <TrendingUp className="h-5 w-5" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">{transaction.description}</h4>
                              <span className={cn(
                                "text-sm font-semibold",
                                transaction.amount > 0 ? "text-green-500" : "text-red-500"
                              )}>
                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}€
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
            
            {/* Referral Card - Moved to bottom */}
            <FadeIn direction="up" delay={500} className="glass-card mt-8">
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
                
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-3">
                    <UserPlus className="h-12 w-12 mx-auto opacity-30" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Invitez vos amis</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Invitez vos amis et gagnez des commissions sur leurs investissements.
                  </p>
                  <GradientButton
                    size="sm"
                    className="from-teal-400 to-blue-500 text-white"
                  >
                    <Link to="/affiliation">
                      Inviter des amis
                    </Link>
                  </GradientButton>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      {/* Deposit Modal */}
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

export default Examples;
