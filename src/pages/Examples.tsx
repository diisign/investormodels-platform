
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CircleDollarSign, TrendingUp, Users, Wallet, Plus, Minus, Filter, Award, UserPlus, Gift } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';

const Examples = () => {
  // Initial investment
  const initialInvestment = 500;
  const multiplier = 2.3; // x2.30 return
  
  // Creator data
  const creator = {
    name: "Sophia Luxe",
    subscribers: "149K",
    content: "247",
    earned: "950K",
    rating: "4.9",
    imageUrl: "https://thumbs.onlyfans.com/public/files/thumbs/c144/m/mv/mvl/mvlhwxzldrtpzkdcyqzgrr5i8atwqvot1711117694/403859232/avatar.jpg"
  };
  
  // Withdrawal date - April 15, 2025
  const withdrawalDate = new Date('2025-04-15');
  const today = new Date();
  const daysUntilWithdrawal = Math.ceil((withdrawalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate realistic investment data
  const generateRealisticData = () => {
    const investmentDate = new Date('2025-01-01');
    const monthlyData = [];
    let currentInvestment = initialInvestment;
    let monthlyReturn = initialInvestment * (multiplier - 1) / 4; // Distribute returns over 4 months
    
    // January to April data
    for (let i = 0; i < 4; i++) {
      const month = new Date(investmentDate);
      month.setMonth(investmentDate.getMonth() + i);
      const monthName = month.toLocaleString('fr-FR', { month: 'long' });
      
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      
      const returnValue = currentInvestment + (monthlyReturn * (i + 1));
      
      monthlyData.push({
        month: capitalizedMonth,
        invested: initialInvestment,
        return: Number(returnValue.toFixed(2)),
        ...(i === 3 ? { withdrawal: returnValue } : {})
      });
    }
    
    return monthlyData;
  };
  
  const monthlyChartData = generateRealisticData();
  const totalEarnings = initialInvestment * multiplier;
  const profit = totalEarnings - initialInvestment;
  
  // Transaction data
  const transactions = [
    {
      type: 'deposit',
      amount: initialInvestment,
      date: '01/01/2025',
      status: 'Complété'
    },
    {
      type: 'interest',
      amount: Number((initialInvestment * 0.25 * (multiplier - 1)).toFixed(2)),
      date: '01/02/2025',
      status: 'Intérêts'
    },
    {
      type: 'interest',
      amount: Number((initialInvestment * 0.25 * (multiplier - 1)).toFixed(2)),
      date: '01/03/2025',
      status: 'Intérêts'
    },
    {
      type: 'interest',
      amount: Number((initialInvestment * 0.25 * (multiplier - 1)).toFixed(2)),
      date: '01/04/2025',
      status: 'Intérêts'
    },
    {
      type: 'withdrawal',
      amount: Number(totalEarnings.toFixed(2)),
      date: '15/04/2025',
      status: 'En attente'
    }
  ];
  
  // Referral data
  const referralData = {
    link: 'https://onlyinvest.com/ref=exemple123',
    earnings: 75,
    referrals: 3,
    pending: 25
  };
  
  // Balance data
  const balance = {
    available: Number(totalEarnings.toFixed(2)),
    pending: 0,
    total: Number(totalEarnings.toFixed(2))
  };
  
  // Data for the demo
  const demoData = {
    creator,
    transactions,
    referralData,
    balance,
    totalInvested: initialInvestment,
    totalEarnings: Number(totalEarnings.toFixed(2)),
    monthlyChartData
  };
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exemple d'investissement</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Voici un exemple d'investissement de {initialInvestment}€ avec un rendement de x{multiplier.toFixed(1)} sur une créatrice.
          </p>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="creators">Créatrice</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Investi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-investment-500" />
                    <span className="text-2xl font-bold">{initialInvestment}€</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold text-green-500">+{profit.toFixed(2)}€</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Retrait disponible
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <CircleDollarSign className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">{totalEarnings.toFixed(2)}€</span>
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      Dans {daysUntilWithdrawal} jours
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Chart */}
            <OnlyfansRevenueChart data={demoData.monthlyChartData} />
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Historique des 5 dernières transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-blue-50 text-blue-600' : 
                          transaction.type === 'withdrawal' ? 'bg-amber-50 text-amber-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {transaction.type === 'deposit' ? <Plus size={14} /> : 
                           transaction.type === 'withdrawal' ? <Minus size={14} /> :
                           <TrendingUp size={14} />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === 'deposit' ? "Dépôt" : 
                             transaction.type === 'withdrawal' ? "Retrait" :
                             "Intérêts"}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'withdrawal' ? 'text-amber-600' : 
                          transaction.type === 'deposit' ? 'text-gray-900 dark:text-gray-100' : 
                          'text-green-600'
                        }`}>
                          {transaction.type === 'withdrawal' ? '-' : transaction.type === 'interest' ? '+' : ''}{transaction.amount}€
                        </p>
                        <p className="text-xs text-gray-500">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <p className="text-sm text-gray-500">Total des transactions: {transactions.length}</p>
                <Button variant="ghost" size="sm">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Referral Program */}
            <Card>
              <CardHeader>
                <CardTitle>Programme de parrainage</CardTitle>
                <CardDescription>
                  Gagnez 25€ pour chaque ami qui s'inscrit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <span className="text-sm truncate">{referralData.link}</span>
                    <Button variant="outline" size="sm">Copier</Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Award className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                      <p className="text-lg font-bold">{referralData.earnings}€</p>
                      <p className="text-xs text-gray-500">Gains totaux</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <UserPlus className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-lg font-bold">{referralData.referrals}</p>
                      <p className="text-xs text-gray-500">Amis parrainés</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Gift className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                      <p className="text-lg font-bold">{referralData.pending}€</p>
                      <p className="text-xs text-gray-500">En attente</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Partager mon lien
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Historique des transactions</CardTitle>
                <CardDescription>
                  Suivi complet de vos mouvements financiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Tous</Button>
                    <Button variant="ghost" size="sm">Dépôts</Button>
                    <Button variant="ghost" size="sm">Retraits</Button>
                    <Button variant="ghost" size="sm">Intérêts</Button>
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((transaction, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-blue-50 text-blue-600' : 
                          transaction.type === 'withdrawal' ? 'bg-amber-50 text-amber-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {transaction.type === 'deposit' ? <Plus size={18} /> : 
                           transaction.type === 'withdrawal' ? <Minus size={18} /> :
                           <TrendingUp size={18} />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === 'deposit' ? "Dépôt initial" : 
                             transaction.type === 'withdrawal' ? "Retrait final" :
                             "Intérêts mensuels"}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'withdrawal' ? 'text-amber-600' : 
                          transaction.type === 'deposit' ? 'text-gray-900 dark:text-gray-100' : 
                          'text-green-600'
                        }`}>
                          {transaction.type === 'withdrawal' ? '-' : transaction.type === 'interest' ? '+' : ''}{transaction.amount}€
                        </p>
                        <Badge variant={
                          transaction.status === 'Complété' ? 'outline' :
                          transaction.status === 'En attente' ? 'secondary' : 'default'
                        } className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Résumé financier</CardTitle>
                <CardDescription>
                  Aperçu de votre portefeuille d'investissement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Total investi</h3>
                    <p className="text-2xl font-bold">{initialInvestment}€</p>
                    <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-investment-500 h-full rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Total des gains</h3>
                    <p className="text-2xl font-bold text-green-500">+{profit.toFixed(2)}€</p>
                    <p className="text-sm text-gray-500">Rendement: +{((multiplier - 1) * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Creators Tab */}
          <TabsContent value="creators" className="space-y-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Détails de la créatrice</CardTitle>
                <CardDescription>
                  Investissement sur une créatrice populaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24 border-2 border-investment-300">
                      <AvatarImage src={creator.imageUrl} alt={creator.name} />
                      <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">{creator.name}</h3>
                      <Badge className="bg-investment-100 text-investment-800 hover:bg-investment-200">VIP</Badge>
                      <Badge variant="outline" className="ml-auto">
                        ⭐ {creator.rating}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Users className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                        <p className="text-lg font-bold">{creator.subscribers}</p>
                        <p className="text-xs text-gray-500">Abonnés</p>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Filter className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                        <p className="text-lg font-bold">{creator.content}</p>
                        <p className="text-xs text-gray-500">Contenus</p>
                      </div>
                      
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CircleDollarSign className="h-4 w-4 mx-auto mb-1 text-green-500" />
                        <p className="text-lg font-bold">{creator.earned}</p>
                        <p className="text-xs text-gray-500">Revenus</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Investissement actuel</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Montant investi</p>
                          <p className="font-bold">{initialInvestment}€</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Valeur actuelle</p>
                          <p className="font-bold text-green-500">{totalEarnings.toFixed(2)}€</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Performance</p>
                          <p className="font-bold text-green-500">+{((multiplier - 1) * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="default" size="sm" className="w-full bg-investment-600 hover:bg-investment-700">
                  Voir le profil complet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold">Prêt à commencer votre investissement ?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Inscrivez-vous maintenant et commencez à investir à partir de 100€
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link to="/register">Créer un compte</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contacter un conseiller</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
