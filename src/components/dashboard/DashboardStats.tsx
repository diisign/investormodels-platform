
import { CircleDollarSign, TrendingUp, Users, Plus, Wallet } from 'lucide-react';
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <FadeIn direction="up" delay={100}>
        <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Votre solde</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{balance.toFixed(2)} €</div>
          <Link 
            to="/deposit"
            className="w-full text-sm text-yellow-300 hover:text-yellow-200 flex items-center justify-center font-medium bg-black hover:bg-gray-900 rounded-lg py-1.5 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 mr-1 text-yellow-300" />
            Déposer des fonds
          </Link>
        </div>
      </FadeIn>
      
      <FadeIn direction="up" delay={200}>
        <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total investi</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
              <CircleDollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{totalInvested.toFixed(2)}€</div>
        </div>
      </FadeIn>
      
      <FadeIn direction="up" delay={300}>
        <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Bénéfice</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{totalReturn.toFixed(2)}€</div>
        </div>
      </FadeIn>
      
      <FadeIn direction="up" delay={400}>
        <div className="p-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Créatrices suivies</h3>
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black text-yellow-300">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{investmentsCount}</div>
          <Link 
            to="/creators" 
            className="text-sm text-yellow-300 hover:text-yellow-400 flex items-center font-medium"
          >
            <Plus className="h-3.5 w-3.5 mr-1 text-yellow-300" />
            Découvrir plus de créatrices
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardStats;
