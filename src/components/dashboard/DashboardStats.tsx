
import { CircleDollarSign, TrendingUp, Users, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      <FadeIn direction="up" delay={100}>
        <Card className="hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Votre solde</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{balance.toFixed(2)} €</div>
            <button 
              onClick={onDepositClick}
              className="w-full text-sm text-purple-600 hover:text-purple-500 flex items-center justify-center font-medium bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg py-1.5 transition-colors"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Déposer des fonds
            </button>
          </CardContent>
        </Card>
      </FadeIn>
      
      <FadeIn direction="up" delay={200}>
        <Card className="p-4 sm:p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total investi</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <CircleDollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{totalInvested.toFixed(2)}€</span>
          </div>
        </Card>
      </FadeIn>
      
      <FadeIn direction="up" delay={300}>
        <Card className="p-4 sm:p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Rendement</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{totalReturn.toFixed(2)}€</span>
            {percentageReturn > 0 && (
              <span className="ml-2 text-sm text-green-500">
                +{percentageReturn.toFixed(1)}%
              </span>
            )}
          </div>
          {totalReturn > 0 && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {(totalReturn / investmentsCount).toFixed(2)}€ par investissement
            </div>
          )}
        </Card>
      </FadeIn>
      
      <FadeIn direction="up" delay={400}>
        <Card className="p-4 sm:p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Créatrices suivies</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-end mb-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{investmentsCount}</span>
          </div>
          <Link 
            to="/creators" 
            className="text-sm text-purple-600 hover:text-purple-500 flex items-center font-medium"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Découvrir plus de créatrices
          </Link>
        </Card>
      </FadeIn>
    </div>
  );
};

export default DashboardStats;
