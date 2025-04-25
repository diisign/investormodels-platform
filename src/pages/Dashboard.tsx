
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { LogOut, PlusCircle } from 'lucide-react';
import { getUserInvestments } from '@/utils/investments';
import Navbar from '@/components/layout/Navbar';
import FadeIn from '@/components/animations/FadeIn';
import DashboardStats from '@/components/dashboard/DashboardStats';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import InvestmentsList from '@/components/dashboard/InvestmentsList';

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
    withdrawal: undefined
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
        baseData[monthIndex].value = investment.amount;
        
        for (let i = 1; i <= 3; i++) {
          if (monthIndex + i < baseData.length) {
            const monthlyReturn = investment.amount * (0.433 * i);
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

  const { data: investments = [], isLoading: isInvestmentsLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: getUserInvestments,
    enabled: !!user,
  });

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalReturn = investments.reduce((sum, inv) => sum + (Number(inv.amount) * Number(inv.return_rate) / 100), 0);
  const performanceData = generatePerformanceData(investments);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      <main className="flex-grow pt-20">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text

-3xl font-bold mb-8">Tableau de bord</h1>

            <DashboardStats 
              totalInvested={totalInvested}
              totalReturn={totalReturn}
              investmentsCount={investments.length}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <PerformanceChart 
                investments={investments}
                performanceData={performanceData}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <InvestmentsList investments={investments} />
            </div>
            
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
