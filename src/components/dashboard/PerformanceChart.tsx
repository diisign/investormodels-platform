
import React from 'react';
import { Card } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';
import { Investment } from '@/types/investment';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { toast } from 'sonner';

interface PerformanceChartProps {
  investments: Investment[];
  timeRange: string;
  setTimeRange: (range: string) => void;
}

const PerformanceChart = ({ investments, timeRange, setTimeRange }: PerformanceChartProps) => {
  return (
    <FadeIn direction="up" className="glass-card lg:col-span-3">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Performance</h3>
          <select 
            className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="12">12 derniers mois</option>
            <option value="6">6 derniers mois</option>
            <option value="3">3 derniers mois</option>
          </select>
        </div>
        <div className="h-72">
          <OnlyfansRevenueChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {investments.map((investment) => {
            const creator = getCreatorProfile(investment.creator_id);
            console.log(`Rendering creator for ${investment.creator_id}:`, creator);
            return (
              <div 
                key={investment.id}
                className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={creator?.imageUrl} 
                    alt={creator?.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${investment.creator_id}`;
                      toast.error(`Impossible de charger l'image pour ${creator?.name || 'la créatrice'}`);
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{creator?.name}</h4>
                    <span className="text-sm font-semibold">{Number(investment.amount).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Initial: {Number(investment.initial_amount).toFixed(2)}€
                    </span>
                    <span className="text-xs font-medium text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {investment.return_rate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};

export default PerformanceChart;
