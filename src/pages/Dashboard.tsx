import React, { useState } from 'react';
import { useAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircle, CircleDollarSign } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Database } from '@/integrations/supabase/types';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import DashboardStats from '@/components/dashboard/DashboardStats';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import InvestmentsSection from '@/components/dashboard/InvestmentsSection';
import { Investment } from '@/types/investment';

type Transaction = Database['public']['Tables']['transactions']['Row'];

interface ExtendedTransaction extends Transaction {
  type: 'deposit' | 'withdrawal' | 'investment';
}

interface ExtendedInvestment extends Investment {
  creator_name: string;
  creator_image: string;
  initial_amount: number;
  monthly_return: number;
  total_return: number;
}

const enhanceTransaction = (transaction: Transaction): ExtendedTransaction => {
  let type: 'deposit' | 'withdrawal' | 'investment' = 'deposit';
  
  if (transaction.payment_method?.includes('investment') || 
      transaction.payment_id?.includes('invest') || 
      transaction.status === 'invested') {
    type = 'investment';
  } else if (transaction.amount < 0 || transaction.payment_method === 'withdrawal') {
    type = 'withdrawal';
  }
  
  return {
    ...transaction,
    type
  };
};

const enhanceInvestment = (investment: Investment): ExtendedInvestment => {
  const creator = getCreatorProfile(investment.creator_id);
  
  const monthlyReturnRate = Number(investment.return_rate) / 3;
  
  const monthlyReturn = (Number(investment.amount) * monthlyReturnRate) / 100;
  
  const totalReturn = Number(investment.amount) * (Number(investment.return_rate) / 100);
  
  return {
    ...investment,
    creator_name: creator?.name || "Créatrice",
    creator_image: creator?.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${investment.creator_id}`,
    initial_amount: Number(investment.amount),
    monthly_return: monthlyReturn,
    total_return: totalReturn
  };
};

const generateLastTwelveMonths = () => {
  const months = [];
  let date = new Date(2025, 4, 1);
  
  for (let i = 0; i < 12; i++) {
    const monthLabel = new Date(date).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
    months.unshift(monthLabel);
    date.setMonth(date.getMonth() - 1);
  }
  
  return months;
};

const generatePerformanceData = (investments) => {
  const months = generateLastTwelveMonths();
  
  const baseData = months.map(month => ({
    month,
    value: 0,
    withdrawal: undefined as number | undefined
  }));
  
  if (investments.length > 0) {
    investments.forEach(investment => {
      const investDate = new Date(investment.created_at);
      const monthIndex = baseData.findIndex(data => {
        const [monthStr, yearStr] = data.month.split(' ');
        const monthIdx = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'].indexOf(monthStr);
        const monthDate = new Date(2000 + parseInt(yearStr), monthIdx);
        return monthDate.getMonth() === investDate.getMonth() && 
               monthDate.getFullYear() === investDate.getFullYear();
      });
      
      if (monthIndex !== -1) {
        // Initial investment amount
        baseData[monthIndex].value = investment.amount;
        
        // Calculate returns for the next 3 months
        for (let i = 1; i <= 3; i++) {
          if (monthIndex + i < baseData.length) {
            const monthlyReturn = investment.amount * (0.433 * i); // 43.3% per month
            baseData[monthIndex + i].value = investment.amount + monthlyReturn;
          }
        }
      }
    });
  }
  
  return baseData;
};

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('12');

  const { data: rawTransactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['userTransactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }); // Most recent first

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const userTransactions: ExtendedTransaction[] = rawTransactions.map(enhanceTransaction);

  const { data: rawInvestments = [], isLoading: isInvestmentsLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      console.log("Fetched investments:", data);
      return data || [];
    },
    enabled: !!user,
  });

  const investments: ExtendedInvestment[] = rawInvestments.map(enhanceInvestment);
  console.log("Enhanced investments:", investments);

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalReturn = investments.reduce((sum, inv) => sum + inv.monthly_return, 0);

  const performanceData = generatePerformanceData(investments);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

            <DashboardStats 
              userTransactions={userTransactions}
              investments={investments}
              totalReturn={totalReturn}
              totalInvested={totalInvested}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <PerformanceChart
                investments={investments}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <InvestmentsSection investments={investments} />
              
              <FadeIn direction="up" delay={100} className="glass-card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Transactions récentes</h3>
                    {/* Component for transactions section will go here in a future refactoring */}
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn direction="up" delay={200} className="glass-card mt-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Programme de parrainage</h3>
                  {/* Component for referral program will go here in a future refactoring */}
                </div>
              </div>
            </FadeIn>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button 
                onClick={() => navigate('/deposit')} 
                className="flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Déposer des fonds
              </Button>
              <Button 
                onClick={logout} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Se déconnecter
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
