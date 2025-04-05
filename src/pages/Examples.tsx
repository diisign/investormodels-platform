
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BadgeDollarSign, Wallet, ArrowUpRight, ArrowDownRight, 
  Users, ArrowLeftRight, TrendingUp, Calendar, BarChart3
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradientButton from '@/components/ui/GradientButton';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';

// Example data for demonstration
const portfolioData = {
  invested: 200, // 100€ for Sophia + 100€ for Kayla
  totalReturn: 444, // Initial 200€ + 7 months of earnings (38€ + 36€) * 6 months
  monthlyEarnings: 74, // 38€ + 36€ per month
};

// Transactions for the last 12 months - only deposits, withdrawals, and investments
const transactionsExample = [
  {
    id: 1,
    type: "deposit",
    description: "Dépôt via Stripe",
    amount: 200,
    date: "10 Oct 2024"
  },
  {
    id: 2,
    type: "investment",
    description: "Investissement - Sophia Martinez",
    amount: -100,
    date: "10 Oct 2024"
  },
  {
    id: 3,
    type: "investment",
    description: "Investissement - Kayla Smith",
    amount: -100,
    date: "10 Oct 2024"
  },
  {
    id: 4,
    type: "deposit",
    description: "Dépôt via Stripe",
    amount: 300,
    date: "15 Aug 2024"
  },
  {
    id: 5,
    type: "withdrawal",
    description: "Retrait vers compte bancaire",
    amount: -150,
    date: "05 Jul 2024"
  }
];

// Enhanced referral program data
const referralProgram = {
  earnings: 145,
  referrals: 3,
  pendingEarnings: 75,
  levels: [
    {
      level: 1,
      reward: "5% des revenus générés",
      bonusThreshold: "5 filleuls = bonus de 50€"
    },
    {
      level: 2,
      reward: "2% des revenus générés",
      bonusThreshold: "10 filleuls niveau 2 = bonus de 100€"
    },
    {
      level: 3,
      reward: "1% des revenus générés",
      bonusThreshold: "Accès au programme VIP d'affiliation"
    }
  ],
  bonusHistory: [
    { description: "Bonus pour 5 filleuls", amount: 50, date: "15 Sep 2024" },
    { description: "Revenus d'affiliation - Niveau 1", amount: 75, date: "01 Oct 2024" },
    { description: "Revenus d'affiliation - Niveau 2", amount: 20, date: "01 Oct 2024" }
  ]
};

// Updated monthly chart data - 12 months of history with investments starting in October
const monthlyDataExample = [
  { month: "Apr", invested: 0, return: 0 },
  { month: "Mai", invested: 0, return: 0 },
  { month: "Jun", invested: 0, return: 0 },
  { month: "Jul", invested: 0, return: 0 },
  { month: "Aou", invested: 0, return: 0 },
  { month: "Sep", invested: 0, return: 0 },
  { month: "Oct", invested: 200, return: 0 },
  { month: "Nov", invested: 200, return: 74 },
  { month: "Dec", invested: 200, return: 148 },
  { month: "Jan", invested: 200, return: 222 },
  { month: "Fev", invested: 200, return: 296 },
  { month: "Mar", invested: 200, return: 370 },
  { month: "Avr", invested: 200, return: 444 }
];

// Example investments data
const investmentsExample = [
  {
    id: 1,
    creatorName: "Sophia Martinez",
    creatorImage: "https://api.dicebear.com/7.x/lorelei/svg?seed=creator1",
    amount: 100,
    returnRate: 38,
    returnMultiplier: 2.25,
    startDate: "10 Oct 2024",
    status: "active",
    monthlyReturn: 38
  },
  {
    id: 2,
    creatorName: "Kayla Smith",
    creatorImage: "https://api.dicebear.com/7.x/lorelei/svg?seed=creator3",
    amount: 100,
    returnRate: 36,
    returnMultiplier: 2.15,
    startDate: "10 Oct 2024",
    status: "active",
    monthlyReturn: 36
  }
];

const Examples = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("performance");
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "investment":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return <ArrowLeftRight className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Aperçu de vos investissements</h1>
          <p className="text-muted-foreground">
            Exemple de tableau de bord montrant comment vos investissements pourraient évoluer
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <GradientButton onClick={() => navigate('/creators')}>
            Découvrir les créatrices
          </GradientButton>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <BadgeDollarSign className="mr-2 h-4 w-4 text-primary" />
                <span>Investissement total</span>
              </div>
            </CardTitle>
            <CardDescription>Montant total investi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.invested} €</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                <span>Retour total</span>
              </div>
            </CardTitle>
            <CardDescription>Investissement + Gains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.totalReturn} €</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{((portfolioData.totalReturn - portfolioData.invested) / portfolioData.invested * 100).toFixed(1)}% sur l'investissement
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Wallet className="mr-2 h-4 w-4 text-primary" />
                <span>Revenus mensuels</span>
              </div>
            </CardTitle>
            <CardDescription>Gains générés chaque mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.monthlyEarnings} €</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((portfolioData.monthlyEarnings / portfolioData.invested) * 100).toFixed(1)}% mensuel
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle>Performance</CardTitle>
                  <TabsList className="mt-2 md:mt-0">
                    <TabsTrigger value="performance">12 derniers mois</TabsTrigger>
                    <TabsTrigger value="projection">Projection</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="performance" className="mt-0">
                  <div className="h-[300px]">
                    <OnlyfansRevenueChart data={monthlyDataExample} />
                  </div>
                </TabsContent>
                <TabsContent value="projection" className="mt-0">
                  <div className="h-[300px]">
                    {/* Projection chart would go here */}
                    <div className="flex flex-col h-full justify-center items-center">
                      <p className="text-muted-foreground text-center">
                        La projection sur 5 ans montre un retour potentiel de 8,880 € pour un investissement initial de 200 €.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>Investissements actifs</CardTitle>
              <CardDescription>
                Vos investissements actuels auprès des créateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentsExample.map((investment) => (
                  <div 
                    key={investment.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={investment.creatorImage} 
                          alt={investment.creatorName} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{investment.creatorName}</div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {investment.startDate}
                          </span>
                          <span className="flex items-center">
                            <BadgeDollarSign className="h-3.5 w-3.5 mr-1" />
                            {investment.amount} €
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+{investment.monthlyReturn} €/mois</div>
                      <div className="text-sm text-muted-foreground">
                        {investment.returnMultiplier}x
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions récentes</CardTitle>
              <CardDescription>
                Historique des dépôts, retraits et investissements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionsExample.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount} €
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Programme de parrainage</CardTitle>
              <CardDescription>
                Gagnez de l'argent en parrainant d'autres investisseurs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">{referralProgram.earnings} €</div>
                  <p className="text-xs text-muted-foreground mt-1">Total des gains</p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">{referralProgram.referrals}</div>
                  <p className="text-xs text-muted-foreground mt-1">Filleuls actifs</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Structure de rémunération</h4>
                {referralProgram.levels.map((level, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Niveau {level.level}</span>
                      <span className="text-sm text-primary">{level.reward}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{level.bonusThreshold}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Historique des bonus</h4>
                {referralProgram.bonusHistory.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="text-sm font-medium">{bonus.description}</div>
                      <div className="text-xs text-muted-foreground">{bonus.date}</div>
                    </div>
                    <div className="font-medium text-green-600">+{bonus.amount} €</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Gains en attente</span>
                  <span className="font-medium text-primary">{referralProgram.pendingEarnings} €</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Les gains seront débloqués lorsque vos filleuls investiront
                </p>
              </div>
              
              <GradientButton variant="outline" className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Inviter des amis</span>
                </div>
              </GradientButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Examples;
