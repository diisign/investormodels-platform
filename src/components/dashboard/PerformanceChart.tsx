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
import { useIsMobile } from '@/hooks/use-mobile';

interface PerformanceChartProps {
  investments: Investment[];
  performanceData: any[];
  onWithdraw: () => void;
}

const PerformanceChart = ({ investments, performanceData, onWithdraw }: PerformanceChartProps) => {
  const isMobile = useIsMobile();
  
  const calculateGains = (investment: Investment) => {
    const now = new Date();
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

  // Calculate dynamic Y-axis based on max value (considering both investment and referral values)
  const maxValue = Math.max(...performanceData.map(d => Math.max(d.investmentValue || d.value || 0, d.referralGains || 0)));
  
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
    <div>
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'hsl(var(--purple-accent))' }}></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Investissements & Gains</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'hsl(var(--accent))' }}></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gains Parrainage</span>
        </div>
      </div>
      <div className={`${isMobile ? 'h-64' : 'h-72'} w-full bg-white rounded-lg ${isMobile ? 'p-2' : 'p-4'} border border-gray-200`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performanceData}
            margin={{ top: 20, right: isMobile ? 5 : 20, left: isMobile ? 5 : 20, bottom: isMobile ? 20 : 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="none" vertical={false} stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: '#000000' }}
              interval={0}
              angle={isMobile ? -90 : 0}
              textAnchor={isMobile ? 'end' : 'middle'}
              height={isMobile ? 50 : 30}
              dy={isMobile ? 0 : 10}
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
              formatter={(value: number, name: string) => {
                if (name === 'investmentValue') return [`${value}€`, 'Investissements & Gains'];
                if (name === 'referralGains') return [`${value}€`, 'Gains Parrainage'];
                return [`${value}€`, name];
              }}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: 'black'
              }}
            />
            
            <Bar
              dataKey="investmentValue"
              fill="hsl(var(--purple-accent))"
              name="Investissements & Gains"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="referralGains"
              fill="hsl(var(--accent))"
              name="Gains Parrainage"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;