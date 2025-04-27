
import { CircleDollarSign, TrendingUp, Users, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';

interface DashboardStatsProps {
  totalInvested: number;
  totalReturn: number;
  investmentsCount: number;
  balance: number;
  onDepositClick: () => void;
}

const DashboardStats = ({
  totalInvested,
  totalReturn,
  investmentsCount,
  balance,
  onDepositClick
}: DashboardStatsProps) => {
  const percentageReturn = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <FadeIn direction="up" delay={100} className="glass-card">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-black dark:text-white">Votre solde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">{balance.toFixed(2)} €</div>
            <button 
              onClick={onDepositClick}
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
            <span className="text-2xl font-bold">{totalInvested.toFixed(2)}€</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Dans {investmentsCount} créatrice{investmentsCount > 1 ? 's' : ''}
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
            <span className="text-2xl font-bold">{totalReturn.toFixed(2)}€</span>
            <span className="ml-2 text-sm text-green-500">
              +{percentageReturn.toFixed(1)}%
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {totalReturn > 0 ? `+${(totalReturn / investmentsCount).toFixed(2)}€ par investissement` : 'Pas encore de rendement'}
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
            <span className="text-2xl font-bold">{investmentsCount}</span>
          </div>
          <Link to="/creators" className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium">
            <Plus className="h-4 w-4 mr-1" />
            Découvrir plus de créatrices
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardStats;
