
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

// Define prop type for the chart data
interface OnlyfansRevenueChartProps {
  data?: Array<{
    month?: string;
    year?: string;
    revenue?: number;
    invested?: number;
    return?: number;
  }>;
}

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
    label: "Investi (€)",
    theme: {
      light: "#3B82F6",
      dark: "#60A5FA"
    }
  },
  return: {
    label: "Retour (€)",
    theme: {
      light: "#10B981",
      dark: "#34D399"
    }
  }
};

const OnlyfansRevenueChart = ({ data = defaultRevenueData }: OnlyfansRevenueChartProps) => {
  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'revenue') {
      return value < 1 ? `${Math.round(value * 1000)}M $` : `${value}B $`;
    }
    return `${value} €`;
  };

  // Determine if we're showing the OnlyFans revenue data or investment data
  const isInvestmentData = data[0]?.month !== undefined;
  const dataKey = isInvestmentData ? 'month' : 'year';
  
  // Determine chart title and description based on data type
  const chartTitle = isInvestmentData 
    ? "Performance de votre investissement" 
    : "Croissance du Chiffre d'Affaires OnlyFans";
    
  const chartDescription = isInvestmentData
    ? "Évolution sur les 12 derniers mois"
    : "Évolution annuelle (2019-2024)";

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-investment-500 to-investment-600 rounded-2xl blur opacity-30 animate-pulse-light"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-2 sm:p-4 h-full">
        <h3 className="text-lg font-semibold mb-1 sm:mb-2">{chartTitle}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">{chartDescription}</p>

        <ChartContainer className="aspect-[5/4] h-[240px] sm:h-[320px]" config={chartConfig}>
          <AreaChart 
            data={data} 
            margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
              {isInvestmentData && (
                <>
                  <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="returnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey={dataKey}
              tick={{ fill: 'var(--foreground)', fontSize: 10 }}
              tickLine={{ stroke: 'var(--border)' }} 
              padding={{ left: 25, right: 20 }}
              tickMargin={5}
            />
            <YAxis 
              tick={{ fill: 'var(--foreground)', fontSize: 10 }} 
              tickLine={{ stroke: 'var(--border)' }}
              tickFormatter={(value) => {
                if (!isInvestmentData) {
                  return value < 1 ? `${value * 1000}M` : `${value}B`;
                }
                return `${value}€`;
              }}
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
            
            {/* Render the appropriate areas based on data type */}
            {isInvestmentData ? (
              <>
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#investedGradient)" 
                  name="Investi"
                  stackId="1"
                />
                <Area 
                  type="monotone" 
                  dataKey="return" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#returnGradient)" 
                  name="Retour"
                  stackId="1"
                />
              </>
            ) : (
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
                name="Chiffre d'affaires"
              />
            )}
            <Legend />
          </AreaChart>
        </ChartContainer>

        <div className="mt-2 sm:mt-4 text-xs text-gray-500 dark:text-gray-400">
          {isInvestmentData 
            ? "Source: Données de performance de votre portefeuille" 
            : "Source: Rapports financiers publics OnlyFans 2019-2024"}
        </div>
      </div>
    </div>
  );
};

export default OnlyfansRevenueChart;
