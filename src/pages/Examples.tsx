
import React from 'react';
import { 
  ArrowDownFromLine, 
  ArrowUpFromLine, 
  CircleDollarSign, 
  Users,
  BadgeDollarSign,
  Gift,
  MoveRight,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Examples = () => {
  // Sample investment data for the performance chart
  const investmentData = [
    { month: 'Jan 2024', invested: 100, return: 20 },
    { month: 'Fév 2024', invested: 0, return: 40 },
    { month: 'Mars 2024', invested: 0, return: 45 },
    { month: 'Avr 2024', invested: 0, return: 50 },
    { month: 'Mai 2024', invested: 0, return: 55 },
    { month: 'Juin 2024', invested: 100, return: 36.5 },
    { month: 'Juil 2024', invested: 0, return: 92 },
    { month: 'Août 2024', invested: 0, return: 93 },
    { month: 'Sept 2024', invested: 0, return: 95 },
    { month: 'Oct 2024', invested: 200, return: 74 },
    { month: 'Nov 2024', invested: 0, return: 110 },
    { month: 'Déc 2024', invested: 0, return: 115 },
    { month: 'Jan 2025', invested: 0, return: 120 },
    { month: 'Fév 2025', invested: 0, return: 125 },
    { month: 'Mars 2025', invested: 0, return: 130, withdrawal: 250 }
  ];

  // Sample recent transactions
  const recentTransactions = [
    {
      id: 'tx7',
      date: '23/03/2025',
      type: 'withdrawal',
      amount: 250,
      description: 'Retrait vers compte bancaire'
    },
    {
      id: 'tx6',
      date: '10/10/2024',
      type: 'investment',
      amount: 100,
      description: 'Investissement - Kayla Smith'
    },
    {
      id: 'tx5',
      date: '10/10/2024',
      type: 'investment',
      amount: 100,
      description: 'Investissement - Sophia Martinez'
    },
    {
      id: 'tx4',
      date: '10/06/2024',
      type: 'investment',
      amount: 100,
      description: 'Investissement - Emma Wilson'
    },
    {
      id: 'tx3',
      date: '15/05/2024',
      type: 'deposit',
      amount: 200,
      description: 'Dépôt via carte bancaire'
    },
    {
      id: 'tx2',
      date: '02/02/2024',
      type: 'deposit',
      amount: 150,
      description: 'Dépôt via carte bancaire'
    },
    {
      id: 'tx1',
      date: '15/01/2024',
      type: 'deposit',
      amount: 100,
      description: 'Dépôt initial'
    }
  ];

  // Sample referral data
  const referralData = {
    referralCode: 'JEAN750',
    referralLink: 'https://onlyfunds.invest/ref/JEAN750',
    totalReferrals: 5,
    activeReferrals: 3,
    pendingReferrals: 2,
    totalEarned: 250,
    bonusTiers: [
      { count: 1, reward: '50€ de bonus', achieved: true },
      { count: 3, reward: '150€ de bonus', achieved: true },
      { count: 5, reward: '250€ de bonus', achieved: true },
      { count: 10, reward: '600€ de bonus', achieved: false },
      { count: 25, reward: '2000€ de bonus', achieved: false },
      { count: 50, reward: '5000€ de bonus', achieved: false }
    ],
    referralHistory: [
      { name: 'Sophie L.', date: '12/02/2024', status: 'actif', reward: 50 },
      { name: 'Thomas M.', date: '25/02/2024', status: 'actif', reward: 50 },
      { name: 'Julie R.', date: '10/03/2024', status: 'actif', reward: 50 },
      { name: 'Marc D.', date: '15/03/2024', status: 'en attente', reward: 0 },
      { name: 'Laura B.', date: '22/03/2024', status: 'en attente', reward: 0 },
    ]
  };

  // Portfolio summary
  const portfolioSummary = {
    totalInvested: 400,
    totalPortfolioValue: 845,
    totalReturn: 445,
    roiPercentage: 111.25,
    monthlyIncome: 110.5
  };

  // Investment distribution
  const investments = [
    { creator: 'Emma Wilson', invested: 100, monthlyReturn: 36.5, roi: 2.20 },
    { creator: 'Sophia Martinez', invested: 100, monthlyReturn: 38, roi: 2.28 },
    { creator: 'Kayla Smith', invested: 100, monthlyReturn: 36, roi: 2.15 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Exemple de tableau de bord</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Valeur du portefeuille</h3>
                <div className="text-3xl font-bold">{portfolioSummary.totalPortfolioValue}€</div>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowUpFromLine className="h-4 w-4 mr-1" />
                  <span>+{portfolioSummary.roiPercentage}% ({portfolioSummary.totalReturn}€)</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Revenu mensuel</h3>
                <div className="text-3xl font-bold">{portfolioSummary.monthlyIncome}€</div>
                <div className="flex items-center text-sm text-gray-500">
                  <CircleDollarSign className="h-4 w-4 mr-1" />
                  <span>Généré par 3 créatrices</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Total investi</h3>
                <div className="text-3xl font-bold">{portfolioSummary.totalInvested}€</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>À travers 3 créatrices</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Performance</h2>
                <div className="h-72">
                  <OnlyfansRevenueChart data={investmentData} />
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Investissements</h2>
                <div className="space-y-6">
                  {investments.map((investment, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{investment.creator}</h3>
                        <span className="text-sm text-gray-500">{investment.invested}€ investis</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <div 
                          className="h-full bg-investment-600 rounded"
                          style={{ width: `${Math.min(100, investment.roi * 30)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">+{investment.monthlyReturn}€/mois</span>
                        <span className="font-medium">{investment.roi}x</span>
                      </div>
                      {index < investments.length - 1 && <hr className="dark:border-gray-800" />}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <Tabs defaultValue="all">
                  <div className="p-6 pb-3 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Transactions récentes</h2>
                    <TabsList>
                      <TabsTrigger value="all">Toutes</TabsTrigger>
                      <TabsTrigger value="deposits">Dépôts</TabsTrigger>
                      <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
                      <TabsTrigger value="investments">Investissements</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {recentTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.date}</td>
                              <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.description}</td>
                              <td className="py-4 px-6 text-sm whitespace-nowrap text-right">
                                <span className={`flex items-center justify-end ${
                                  transaction.type === 'deposit' || transaction.type === 'referral_bonus' 
                                    ? 'text-green-600 dark:text-green-500'
                                    : transaction.type === 'withdrawal' 
                                    ? 'text-red-600 dark:text-red-500'
                                    : 'text-investment-600 dark:text-investment-500'
                                }`}>
                                  {transaction.type === 'deposit' || transaction.type === 'referral_bonus' ? (
                                    <ArrowDownFromLine className="h-4 w-4 mr-1" />
                                  ) : transaction.type === 'withdrawal' ? (
                                    <ArrowUpFromLine className="h-4 w-4 mr-1" />
                                  ) : (
                                    <CircleDollarSign className="h-4 w-4 mr-1" />
                                  )}
                                  {transaction.type === 'withdrawal' ? '-' : '+'}
                                  {transaction.amount}€
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deposits" className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {recentTransactions
                            .filter(tx => tx.type === 'deposit' || tx.type === 'referral_bonus')
                            .map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.date}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.description}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap text-right">
                                  <span className="flex items-center justify-end text-green-600 dark:text-green-500">
                                    <ArrowDownFromLine className="h-4 w-4 mr-1" />
                                    +{transaction.amount}€
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="withdrawals" className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {recentTransactions
                            .filter(tx => tx.type === 'withdrawal')
                            .map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.date}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.description}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap text-right">
                                  <span className="flex items-center justify-end text-red-600 dark:text-red-500">
                                    <ArrowUpFromLine className="h-4 w-4 mr-1" />
                                    -{transaction.amount}€
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="investments" className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {recentTransactions
                            .filter(tx => tx.type === 'investment')
                            .map((transaction) => (
                              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.date}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap">{transaction.description}</td>
                                <td className="py-4 px-6 text-sm whitespace-nowrap text-right">
                                  <span className="flex items-center justify-end text-investment-600 dark:text-investment-500">
                                    <CircleDollarSign className="h-4 w-4 mr-1" />
                                    +{transaction.amount}€
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Programme de parrainage</h2>
                <div className="space-y-6">
                  <div className="bg-investment-50 dark:bg-investment-950/50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400 mr-3">
                        <BadgeDollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">Votre code de parrainage</div>
                        <div className="text-sm text-gray-500">{referralData.referralCode}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Copier le lien
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de parrainages</span>
                      <span className="font-bold">{referralData.totalReferrals}</span>
                    </div>
                    
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Parrainages actifs</span>
                      <span className="font-bold text-green-600">{referralData.activeReferrals}</span>
                    </div>
                    
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">En attente</span>
                      <span className="font-bold text-amber-600">{referralData.pendingReferrals}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Gains totaux</span>
                      <span className="font-bold text-investment-600">{referralData.totalEarned}€</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Programme de récompenses</h3>
                    <div className="space-y-3">
                      {referralData.bonusTiers.map((tier, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                            tier.achieved 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                          }`}>
                            {tier.achieved ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{tier.count}</span>
                            )}
                          </div>
                          <div className="text-sm flex-grow">
                            <span className={tier.achieved ? 'line-through text-gray-500' : ''}>
                              {tier.count} parrainage{tier.count > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className={`text-sm font-medium ${
                            tier.achieved ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {tier.reward}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Historique des parrainages</h3>
                    <div className="space-y-3">
                      {referralData.referralHistory.map((referral, index) => (
                        <div key={index} className="flex items-start justify-between text-sm">
                          <div>
                            <div className="font-medium">{referral.name}</div>
                            <div className="text-xs text-gray-500">{referral.date}</div>
                          </div>
                          <div className="text-right">
                            <div className={referral.status === 'actif' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-amber-600 dark:text-amber-400'}>
                              {referral.status}
                            </div>
                            <div className="text-xs text-gray-500">
                              {referral.status === 'actif' ? `+${referral.reward}€` : 'En attente'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full flex items-center justify-center gap-2 bg-investment-600 hover:bg-investment-700 text-white">
                      <Gift className="h-4 w-4" />
                      <span>Parrainer des amis</span>
                      <MoveRight className="h-4 w-4" />
                    </Button>
                    <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                      Minimum 50€ de bonus par parrainage validé
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Examples;
