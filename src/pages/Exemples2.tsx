import React, { useState, useMemo } from 'react';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useStaticReferralData } from '@/hooks/useStaticReferralData';
import { useStaticInvestmentData } from '@/hooks/useStaticInvestmentData';

const Exemples2 = () => {
  const referralData = useStaticReferralData();
  const investmentData = useStaticInvestmentData();
  
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [timeRange, setTimeRange] = useState('12');
  const [referralTimeRange, setReferralTimeRange] = useState('all');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
  };

  // Filter referrals based on selected time range
  const getFilteredReferrals = () => {
    if (referralTimeRange === 'all') {
      return referralData.recentReferrals;
    }
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (referralTimeRange) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case 'sixMonths':
        filterDate.setMonth(now.getMonth() - 6);
        break;
      default:
        return referralData.recentReferrals;
    }

    return referralData.recentReferrals.filter(referral => {
      const [day, month, year] = referral.date.split('/').map(Number);
      const referralDate = new Date(year, month - 1, day);
      return referralDate >= filterDate;
    });
  };

  const filteredReferrals = useMemo(() => getFilteredReferrals(), [referralTimeRange, referralData.recentReferrals]);
  
  // Calculate statistics based on filtered referrals
  const referralStats = useMemo(() => {
    const completed = filteredReferrals.filter(ref => ref.status === 'completed').length;
    const pending = filteredReferrals.filter(ref => ref.status === 'pending').length;
    const earnings = filteredReferrals.reduce((sum, ref) => {
      return ref.status === 'completed' ? sum + ref.reward : sum;
    }, 0);
    
    return {
      total: filteredReferrals.length,
      completed,
      pending,
      earnings
    };
  }, [filteredReferrals]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">dɑshboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <FadeIn direction="up" delay={100} className="glass-card">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-black dark:text-white">Votre solde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black dark:text-white">{investmentData.balance.toFixed(2)} €</div>
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
                    <span className="text-2xl font-bold">{investmentData.totalInvested}€</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Dans {investmentData.investments.length} créatrice
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
                    <span className="text-2xl font-bold">{investmentData.totalEarnings}€</span>
                    <span className="ml-2 text-sm text-green-500">
                      +{investmentData.totalPercentageReturn}%
                    </span>
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
                    <span className="text-2xl font-bold">{investmentData.investments.length}</span>
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
                        data={investmentData.performanceData.slice(-parseInt(timeRange))}
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
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {investmentData.investments.map((investment, index) => (
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
                  
                  {investmentData.investments && investmentData.investments.length > 0 ? (
                    <div className="space-y-4">
                      {investmentData.investments.map((investment) => (
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
                  
                  {investmentData.transactions.length > 0 ? (
                    <div className="space-y-4">
                      {investmentData.transactions.map((transaction) => (
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
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-medium">Statistiques</h4>
                  <Select
                    value={referralTimeRange}
                    onValueChange={setReferralTimeRange}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="week">7 derniers jours</SelectItem>
                      <SelectItem value="month">30 derniers jours</SelectItem>
                      <SelectItem value="quarter">3 derniers mois</SelectItem>
                      <SelectItem value="sixMonths">6 derniers mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total parrainages</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-investment-100 dark:bg-investment-900/30 text-investment-600">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralStats.total}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">En attente</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralStats.pending}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Complétés</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                        <Award className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralStats.completed}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gains totaux</h4>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        <Gift className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{referralStats.earnings}€</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Parrainages récents</h4>
                      <Select
                        value={referralTimeRange}
                        onValueChange={setReferralTimeRange}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="week">7 derniers jours</SelectItem>
                          <SelectItem value="month">30 derniers jours</SelectItem>
                          <SelectItem value="quarter">3 derniers mois</SelectItem>
                          <SelectItem value="sixMonths">6 derniers mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3 max-h-72 overflow-y-auto">
                      {filteredReferrals.length > 0 ? (
                        filteredReferrals.map((referral, index) => (
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
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          Aucun parrainage pour cette période
                        </div>
                      )}
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
