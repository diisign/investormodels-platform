import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Default yearly OnlyFans revenue data (in billions/millions USD)
const defaultRevenueData = [
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
  },
  invested: {
    label: "Investissement (€)",
    theme: {
      light: "#0ea5e9",
      dark: "#38bdf8"
    }
  },
  return: {
    label: "Rendement (€)",
    theme: {
      light: "#22c55e",
      dark: "#4ade80"
    }
  },
  withdrawal: {
    label: "Retrait (€)",
    theme: {
      light: "#22c55e",
      dark: "#4ade80"
    }
  }
};

interface OnlyfansRevenueChartProps {
  data?: { month: string; invested: number; return: number; withdrawal?: number }[];
}

const OnlyfansRevenueChart: React.FC<OnlyfansRevenueChartProps> = ({ data }) => {
  // Determine if we should use monthly investment data or default yearly revenue data
  const isMonthlyData = !!data && data.length > 0;
  
  // Process the chart data to ensure returns continue to increase after withdrawal
  const chartData = isMonthlyData ? data.map((item, index, array) => {
    // Keep the original data properties
    const newItem = { ...item };
    
    // Return values shouldn't be reduced after withdrawal
    if (index > 0 && 'withdrawal' in array[index - 1] && array[index - 1].withdrawal) {
      // Ensure the return value keeps increasing even after withdrawal
      newItem.return = Math.max(array[index - 1].return, item.return);
    }
    
    return newItem;
  }) : defaultRevenueData;
  
  // Find withdrawal point if exists
  const withdrawalPoint = isMonthlyData ? 
    chartData.findIndex(item => 'withdrawal' in item && item.withdrawal && item.withdrawal > 0) : -1;
  
  const formatTooltipValue = (value: number, name: string) => {
    if (!isMonthlyData) {
      // For yearly data, format as billions or millions
      return value < 1 ? `${Math.round(value * 1000)}M $` : `${value}B $`;
    } else {
      // For monthly data, format as euros
      return `${value}€`;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-investment-500 to-investment-600 rounded-2xl blur opacity-30 animate-pulse-light"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-2 sm:p-4 h-full">
        <h3 className="text-lg font-semibold mb-1 sm:mb-2">
          {isMonthlyData ? "Évolution de l'Investissement" : "Croissance du Chiffre d'Affaires OnlyFans"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
          {isMonthlyData ? "Performance mensuelle (investissement vs rendement)" : "Évolution annuelle (2019-2024)"}
        </p>

        <ChartContainer className="aspect-[5/4] h-[240px] sm:h-[320px]" config={chartConfig}>
          {isMonthlyData ? (
            // Monthly investment chart
            <AreaChart 
              data={chartData} 
              margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
            >
              <defs>
                <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="returnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'var(--foreground)', fontSize: 10 }}
                tickLine={{ stroke: 'var(--border)' }} 
                padding={{ left: 25, right: 20 }}
                tickMargin={5}
              />
              <YAxis 
                tick={{ fill: 'var(--foreground)', fontSize: 10 }} 
                tickLine={{ stroke: 'var(--border)' }}
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
                dataKey="invested" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#investedGradient)" 
                name="Investissement"
                stackId="1"
              />
              <Area 
                type="monotone" 
                dataKey="return" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#returnGradient)" 
                name="Rendement"
              />
              {withdrawalPoint >= 0 && (
                <ReferenceLine 
                  x={(chartData[withdrawalPoint] as any).month}
                  stroke="#22c55e" 
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{ 
                    value: "Retrait", 
                    position: 'top', 
                    fill: "#22c55e",
                    fontSize: 10
                  }} 
                />
              )}
              <Legend />
            </AreaChart>
          ) : (
            // Yearly OnlyFans revenue chart
            <AreaChart 
              data={chartData} 
              margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
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
                padding={{ left: 25, right: 20 }}
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
          )}
        </ChartContainer>

        <div className="mt-2 sm:mt-4 text-xs text-gray-500 dark:text-gray-400">
          Source: {isMonthlyData ? "Données de votre portefeuille" : "Rapports financiers publics OnlyFans 2019-2024"}
        </div>
      </div>
    </div>
  );
};

export default OnlyfansRevenueChart;
