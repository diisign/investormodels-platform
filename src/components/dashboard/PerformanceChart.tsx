import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { Investment } from '@/types/investments';
import { toast } from 'sonner';
import WithdrawReturnsButton from './WithdrawReturnsButton';
import { format } from 'date-fns';

interface PerformanceChartProps {
  investments: Investment[];
  performanceData: any[];
  onWithdraw: () => void;
}

const PerformanceChart = ({ investments, performanceData, onWithdraw }: PerformanceChartProps) => {
  const calculateGains = (investment: Investment) => {
    const now = new Date('2025-04-26');
    const investmentDate = new Date(investment.created_at);
    const daysDiff = Math.floor((now.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24));
    const monthsDiff = daysDiff / 30;
    
    if (daysDiff < 30) return { gains: 0, percentage: 0 };
    
    const quarterlyRate = Number(investment.return_rate);
    const quarters = Math.floor(monthsDiff / 3);
    const gains = Number(investment.amount) * (quarterlyRate / 100) * quarters;
    const percentage = (gains / Number(investment.amount)) * 100;
    
    return { gains: Math.round(gains * 100) / 100, percentage: Math.round(percentage * 100) / 100 };
  };

  // Calculate dynamic Y-axis based on max value
  const maxValue = Math.max(...performanceData.map(d => d.value));
  
  const getYAxisConfig = (maxVal: number) => {
    if (maxVal <= 1000) {
      return {
        domain: [0, 1000],
        ticks: [0, 250, 500, 750, 1000],
        tickFormatter: (value: number) => value.toString()
      };
    } else if (maxVal <= 5000) {
      return {
        domain: [0, 5000],
        ticks: [0, 1000, 2000, 3000, 4000, 5000],
        tickFormatter: (value: number) => `${Math.round(value/1000)}k`
      };
    } else if (maxVal <= 10000) {
      return {
        domain: [0, 10000],
        ticks: [0, 2000, 4000, 6000, 8000, 10000],
        tickFormatter: (value: number) => `${Math.round(value/1000)}k`
      };
    } else {
      // For values > 10k, round up to nearest 5k increment
      const roundedMax = Math.ceil(maxVal / 5000) * 5000;
      const maxTick = Math.max(30000, roundedMax);
      return {
        domain: [0, maxTick],
        ticks: [10000, 15000, 20000, 25000, 30000].filter(v => v <= maxTick),
        tickFormatter: (value: number) => `${Math.round(value/1000)}k`
      };
    }
  };

  const yAxisConfig = getYAxisConfig(maxValue);

  return (
    <>
      <div className="h-72 bg-white rounded-lg p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performanceData}
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="none" vertical={false} stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 11, fill: '#000000' }}
              interval={0}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              domain={yAxisConfig.domain}
              ticks={yAxisConfig.ticks}
              tickFormatter={yAxisConfig.tickFormatter}
              tick={{ fontSize: 10, fill: '#000000' }}
              width={30}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}€`, 'Valeur']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: 'black'
              }}
            />
            <Bar
              dataKey="value"
              fill="#8B5CF6"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {investments.map((investment) => {
          const creator = getCreatorProfile(investment.creator_id);
          const { gains, percentage } = calculateGains(investment);
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
                      +{investment.return_rate}% / trimestre
                    </span>
                  </div>
                  {gains > 0 && (
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-green-500 font-medium">
                        Gains: +{gains}€
                      </span>
                      <span className="text-green-500 font-medium">
                        +{percentage}%
                      </span>
                    </div>
                  )}
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
