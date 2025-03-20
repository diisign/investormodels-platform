import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CircleDollarSign, TrendingUp, Users, Wallet, Plus, Minus, Filter } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { mockUser } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import UserBalance from '@/components/UserBalance';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  
  // Updated chart data with all values set to 0
  const performanceData = [
    { month: 'Jan', value: 0 },
    { month: 'Fév', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Avr', value: 0 },
    { month: 'Mai', value: 0 },
    { month: 'Juin', value: 0 },
    { month: 'Juil', value: 0 },
    { month: 'Août', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Déc', value: 0 },
  ];
  
  const portfolioData = [
    { name: 'Sophia Martinez', value: 500 },
    { name: 'Emma Wilson', value: 700 },
    { name: 'Non investi', value: user?.balance || 0 },
  ];
  
  const COLORS = ['#0284c7', '#0ea5e9', '#e5e7eb'];
  
  const recentTransactionsData = user?.transactions.slice(0, 5) || [];
  
  const totalInvested = user?.investments.reduce((total, inv) => total + inv.amount, 0) || 0;
  const totalEarnings = user?.investments.reduce((total, inv) => total + inv.earnings, 0) || 0;
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDepositModal(false);
    // In a real app, this would trigger an API call to deposit funds
    // For now, just show a toast message
    alert(`Dépôt simulé de ${depositAmount}€ effectué avec succès!`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={true} onLogout={logout} />
      
      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <FadeIn direction="up">
                <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Bienvenue, {user?.name || 'Investisseur'}. Voici l'état actuel de vos investissements.
                </p>
              </FadeIn>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <FadeIn direction="up" delay={100} className="glass-card">
                <UserBalance />
                <button 
                  onClick={() => setShowDepositModal(true)}
                  className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium p-6 pt-0"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Déposer des fonds
                </button>
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
                    <span className="text-2xl font-bold">{totalInvested}€</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Dans {user?.investments.length || 0} créateurs
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
                    <span className="text-2xl font-bold">{totalEarnings}€</span>
                    <span className="ml-2 text-sm text-green-500">+{(totalInvested > 0 ? (totalEarnings / totalInvested) * 100 : 0).toFixed(1)}%</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Depuis le début
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
                    <span className="text-2xl font-bold">{user?.investments.length || 0}</span>
                  </div>
                  <Link to="/creators" className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium">
                    <Plus className="h-4 w-4 mr-1" />
                    Découvrir plus de créateurs
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
                      <option>Cette année</option>
                      <option>6 derniers mois</option>
                      <option>30 derniers jours</option>
                    </select>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
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
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}€`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {portfolioData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}€</span>
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
                  
                  {user?.investments && user.investments.length > 0 ? (
                    <div className="space-y-4">
                      {user.investments.map((investment) => (
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
                                Plan {investment.planName}
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
                        <GradientButton size="sm">
                          Découvrir des créateurs
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
                  
                  {recentTransactionsData.length > 0 ? (
                    <div className="space-y-4">
                      {recentTransactionsData.map((transaction) => (
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

export default Dashboard;
