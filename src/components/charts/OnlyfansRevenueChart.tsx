
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Yearly OnlyFans revenue data (in billions/millions USD)
const revenueData = [
  { year: '2019', revenue: 0.12 },  // 120 millions
  { year: '2020', revenue: 0.375 }, // 375 millions
  { year: '2021', revenue: 0.932 }, // 932 millions
  { year: '2022', revenue: 1.1 },   // 1.1 milliards
  { year: '2023', revenue: 1.3 },   // 1.3 milliards
  { year: '2024', revenue: 1.6 }    // 1.6 milliards
];

// Configuration du graphique
const chartConfig = {
  revenue: {
    label: "Chiffre d'affaires (milliards $)",
    theme: {
      light: "#8B5CF6",
      dark: "#9B87F5"
    }
  }
};

const OnlyfansRevenueChart = () => {
  const formatTooltipValue = (value: number) => {
    return value < 1 ? `${Math.round(value * 1000)}M $` : `${value}B $`;
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-investment-500 to-investment-600 rounded-2xl blur opacity-30 animate-pulse-light"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-2 sm:p-4 h-full">
        <h3 className="text-lg font-semibold mb-1 sm:mb-2">Croissance du Chiffre d'Affaires OnlyFans</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">Évolution annuelle (2019-2024)</p>

        <ChartContainer className="aspect-[5/4] h-[220px] sm:h-[280px]" config={chartConfig}>
          <AreaChart 
            data={revenueData} 
            margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="year" 
              tick={{ fill: 'var(--foreground)', fontSize: 10 }}
              tickLine={{ stroke: 'var(--border)' }} 
              padding={{ left: 20, right: 20 }}
              tickMargin={5}
            />
            <YAxis 
              tick={{ fill: 'var(--foreground)', fontSize: 10 }} 
              tickLine={{ stroke: 'var(--border)' }}
              tickFormatter={(value) => value < 1 ? `${value * 1000}M` : `${value}B`}
              width={40}
              dx={3}
            />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload?.length) {
                  return (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      label={label}
                      formatter={formatTooltipValue}
                    />
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              fillOpacity={1} 
              fill="url(#revenueGradient)" 
              name="Chiffre d'affaires"
            />
            <Legend />
          </AreaChart>
        </ChartContainer>

        <div className="mt-2 sm:mt-4 text-xs text-gray-500 dark:text-gray-400">
          Source: Rapports financiers publics OnlyFans 2019-2024
        </div>
      </div>
    </div>
  );
};

export default OnlyfansRevenueChart;
