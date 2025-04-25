
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';
import { Investment } from '@/types/investment';

interface DashboardStatsProps {
  userTransactions: any[];
  investments: Investment[];
  totalReturn: number;
  totalInvested: number;
}

const DashboardStats = ({ userTransactions, investments, totalReturn, totalInvested }: DashboardStatsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FadeIn direction="up" delay={100}>
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium">Votre solde</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">
              {userTransactions.reduce((sum, t) => sum + Number(t.amount), 0).toFixed(2)}€
            </div>
            <button 
              onClick={() => navigate('/deposit')}
              className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Déposer des fonds
            </button>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn direction="up" delay={200}>
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-investment-50/50 to-transparent dark:from-investment-900/20" />
          <div className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total investi</h3>
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-investment-100/80 dark:bg-investment-900/30 text-investment-600">
                <CircleDollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{totalInvested}€</span>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Dans {investments.length} créatrice{investments.length > 1 ? 's' : ''}
            </div>
          </div>
        </Card>
      </FadeIn>

      <FadeIn direction="up" delay={300}>
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/20" />
          <div className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendement</h3>
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100/80 dark:bg-green-900/30 text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{totalReturn.toFixed(2)}€</span>
              {totalInvested > 0 && (
                <span className="ml-2 text-sm text-green-500">
                  +{((totalReturn / totalInvested) * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </Card>
      </FadeIn>

      <FadeIn direction="up" delay={400} className="glass-card">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Créatrices suivies</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold">{investments.length}</span>
          </div>
          <button 
            onClick={() => navigate('/creators')}
            className="mt-4 text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Découvrir plus de créatrices
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardStats;
