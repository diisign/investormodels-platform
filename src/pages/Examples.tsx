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
  // Initial investment amount - 200€
  const initialInvestment = 200;
  
  // Four creators with their specific returns (130%, 120%, 115%, 125%)
  // Each return is applied quarterly (every 3 months)
  const creators = [
    { name: 'Sophia Martinez', returnRate: 1.30, imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/p/pd/pd9/pd9plrrb99cb0kkhev4iczume0abbr4h1737510365/269048356/avatar.jpg' },
    { name: 'Emma Wilson', returnRate: 1.20, imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/t/tu/tue/tues2azi6vxj6yrmdec7g9vrol66frbj1731104096/445225187/avatar.jpg' },
    { name: 'Kayla Smith', returnRate: 1.15, imageUrl: 'https://onlyfinder.com/cdn-cgi/image/width=160,quality=75/https://media.onlyfinder.com/d9/d95cc6ad-2b07-4bd3-a31a-95c00fd31bef/kaylapufff-onlyfans.webp' },
    { name: 'Lala Avi', returnRate: 1.25, imageUrl: 'https://thumbs.onlyfans.com/public/files/thumbs/c144/j/jm/jmc/jmceq667otzovowlp3b0rqbmvpyybjjh1733705286/104901396/avatar.jpg' }
  ];
  
  // Divide investment equally among creators
  const investmentPerCreator = initialInvestment / 4; // 50€ per creator
  
  // Calculate returns for each creator after 12 months (4 quarters)
  const portfolioData = creators.map(creator => {
    // Calculate quarterly returns
    let amount = investmentPerCreator;
    
    // Apply compound quarterly return over 4 quarters
    for (let i = 0; i < 4; i++) {
      amount = amount * creator.returnRate;
    }
    
    return {
      name: creator.name,
      value: parseFloat(amount.toFixed(2)),
      initial: investmentPerCreator,
      imageUrl: creator.imageUrl,
      returnRate: Math.round((creator.returnRate - 1) * 100) // Convert back to percentage for display
    };
  });
  
  // Calculate total final value and earnings
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalEarnings = totalValue - initialInvestment;
  
  // Generate performance data (monthly growth)
  const performanceData = [];
  let cumulativeValue = initialInvestment;
  
  // Start date 12 months ago
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);
  
  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + i);
    
    // Apply quarterly returns at months 3, 6, 9, and 12
    if (i % 3 === 2) { // Month indices 2, 5, 8, 11 (representing months 3, 6, 9, 12)
      let newCumulativeValue = 0;
      
      // Apply each creator's quarterly return to their portion of the investment
      creators.forEach((creator, index) => {
        const creatorPortion = i === 0 ? 
          investmentPerCreator : 
          (portfolioData[index].initial / initialInvestment) * cumulativeValue;
          
        newCumulativeValue += creatorPortion * creator.returnRate;
      });
      
      cumulativeValue = newCumulativeValue;
    }
    
    // Add small random fluctuation for visual interest (smaller now for more realistic curve)
    const randomFluctuation = cumulativeValue * (Math.random() * 0.03 - 0.015);
    const monthValue = cumulativeValue + randomFluctuation;
    
    performanceData.push({
      month: currentDate.toLocaleString('default', { month: 'short' }),
      value: parseFloat(monthValue.toFixed(2))
    });
  }
  
  // Generate investments list
  const investments = portfolioData.map((item, index) => ({
    id: String(index + 1),
    creatorName: item.name,
    creatorImage: item.imageUrl,
    planName: index % 2 === 0 ? 'Growth' : 'Premium',
    amount: parseFloat(item.value.toFixed(2)),
    initial: item.initial,
    returnRate: item.returnRate,
    status: 'active'
  }));
  
  // Generate transactions based on the investment history
  const transactions = [
    // Initial deposit
    {
      id: '1',
      type: 'deposit',
      amount: initialInvestment,
      date: '10/4/2024',
      status: 'completed',
      description: 'Dépôt initial'
    },
    // Initial investments
    ...creators.map((creator, index) => ({
      id: String(index + 2),
      type: 'investment',
      amount: -investmentPerCreator,
      date: '12/4/2024',
      status: 'completed',
      description: `Investissement - ${creator.name}`
    })),
    // Quarterly earnings - Q1
    ...creators.map((creator, index) => {
      const q1Return = investmentPerCreator * creator.returnRate - investmentPerCreator;
      return {
        id: String(index + 6),
        type: 'earning',
        amount: parseFloat(q1Return.toFixed(2)),
        date: '12/7/2024',
        status: 'completed',
        description: `Gains T1 - ${creator.name}`
      };
    }),
    // Quarterly earnings - Q2
    ...creators.map((creator, index) => {
      const q1Value = investmentPerCreator * creator.returnRate;
      const q2Return = q1Value * creator.returnRate - q1Value;
      return {
        id: String(index + 10),
        type: 'earning',
        amount: parseFloat(q2Return.toFixed(2)),
        date: '12/10/2024',
        status: 'completed',
        description: `Gains T2 - ${creator.name}`
      };
    }),
    // Quarterly earnings - Q3
    ...creators.map((creator, index) => {
      const q1Value = investmentPerCreator * creator.returnRate;
      const q2Value = q1Value * creator.returnRate;
      const q3Return = q2Value * creator.returnRate - q2Value;
      return {
        id: String(index + 14),
        type: 'earning',
        amount: parseFloat(q3Return.toFixed(2)),
        date: '12/1/2025',
        status: 'completed',
        description: `Gains T3 - ${creator.name}`
      };
    }),
    // Quarterly earnings - Q4
    ...creators.map((creator, index) => {
      const q1Value = investmentPerCreator * creator.returnRate;
      const q2Value = q1Value * creator.returnRate;
      const q3Value = q2Value * creator.returnRate;
      const q4Return = q3Value * creator.returnRate - q3Value;
      return {
        id: String(index + 18),
        type: 'earning',
        amount: parseFloat(q4Return.toFixed(2)),
        date: '12/4/2025',
        status: 'pending',
        description: `Gains T4 - ${creator.name}`
      };
    })
  ];
  
  // Generate referral data
  const totalReferrals = Math.floor(Math.random() * 3) + 1;
  const pendingReferrals = Math.floor(Math.random() * totalReferrals);
  const completedReferrals = totalReferrals - pendingReferrals;
  const referralEarnings = Math.floor(completedReferrals * 15 + Math.random() * 10);
  
  const referralData = {
    totalReferrals,
    pendingReferrals,
    completedReferrals,
    earnings: referralEarnings,
    recentReferrals: []
  };
  
  // Calculate final balance
  const balance = parseFloat(totalValue.toFixed(2));
  
  return {
    performanceData,
    portfolioData,
    investments,
    transactions,
    referralData,
    balance,
    totalInvested: initialInvestment,
    totalEarnings: parseFloat(totalEarnings.toFixed(2)),
    COLORS: ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc']
  };
};

const Examples = () => {
  const data = generateRealisticData();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  
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
                  Ceci est un exemple de tableau de bord avec des données basées sur un investissement de 200€ réparti sur 4 créatrices.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                  <p className="font-medium">Note importante</p>
                  <p>Ceci est un exemple illustratif basé sur un investissement de 200€ sur 12 mois avec des rendements trimestriels de 130%, 120%, 115% et 125%.</p>
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
                    Dans {data.investments.length} créateurs
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
                    <span className="ml-2 text-sm text-green-500">+{(data.totalInvested > 0 ? (data.totalEarnings / data.totalInvested) * 100 : 0).toFixed(1)}%</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Sur 12 mois
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={400} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Créateurs suivis</h3>
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
                    <select className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                      <option>12 derniers mois</option>
                      <option>6 derniers mois</option>
                      <option>3 derniers mois</option>
                    </select>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.performanceData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip formatter={(value) => `${value}€`} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0ea5e9"
                          strokeWidth={3}
                          dot={{ r: 0 }}
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
                    <option value="card">Carte bancaire</option>
                    <option value="transfer">Virement bancaire</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </button>
                  <GradientButton type="submit">
                    Déposer des fonds
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
