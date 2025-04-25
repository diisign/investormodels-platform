
import React from 'react';
import { CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';

interface DashboardStatsProps {
  totalInvested: number;
  totalReturn: number;
  investmentsCount: number;
}

const DashboardStats = ({ totalInvested, totalReturn, investmentsCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              Dans {investmentsCount} créatrice{investmentsCount > 1 ? 's' : ''}
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
    </div>
  );
};

export default DashboardStats;
