
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { Investment } from '@/types/investments';
import { toast } from 'sonner';
import WithdrawReturnsButton from './WithdrawReturnsButton';

interface PerformanceChartProps {
  investments: Investment[];
  performanceData: any[];
  onWithdraw: () => void;
}

const PerformanceChart = ({ investments, performanceData, onWithdraw }: PerformanceChartProps) => {
  return (
    <>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={performanceData}
            margin={{ top: 5, right: 5, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              domain={[0, 'dataMax + 1']}
              tickCount={5}
              tickFormatter={(value) => Math.round(value).toString()}
              width={40}
            />
            <Tooltip formatter={(value) => `${value}€`} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {investments.map((investment) => {
          const creator = getCreatorProfile(investment.creator_id);
          return (
            <div 
              key={investment.id}
              className="flex flex-col p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={creator?.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${investment.creator_id}`}
                    alt={creator?.name || 'Créatrice'}
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
                    <h4 className="font-medium text-sm">{creator?.name || 'Créatrice'}</h4>
                    <span className="text-sm font-semibold">{Number(investment.amount).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      Initial: {Number(investment.amount).toFixed(2)}€
                    </span>
                    <span className="text-xs font-medium text-green-500">
                      +{investment.return_rate}%
                    </span>
                  </div>
                </div>
              </div>
              <WithdrawReturnsButton 
                investment={investment}
                onWithdraw={onWithdraw}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PerformanceChart;
