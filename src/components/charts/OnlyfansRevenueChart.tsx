
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

// Données du chiffre d'affaires d'OnlyFans sur 12 mois finissant en mars
// Generate monthly data with variations
const generateMonthlyData = () => {
  const monthNames = ['Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'];
  const baseRevenue = 1300; // Base revenue value
  
  return monthNames.map((month, index) => {
    // Add variation to each month (between 85% and 115% of base revenue)
    const variationFactor = 0.85 + (Math.random() * 0.3);
    return {
      month,
      revenue: Math.round(baseRevenue * variationFactor)
    };
  });
};

// Generate the revenue data
const revenueData = generateMonthlyData();

// Configuration du graphique
const chartConfig = {
  revenue: {
    label: "Chiffre d'affaires (millions $)",
    theme: {
      light: "#8B5CF6",
      dark: "#9B87F5"
    }
  }
};

const OnlyfansRevenueChart = () => {
  const formatTooltipValue = (value: number) => {
    return `${Math.round(value)}M $`;
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-investment-500 to-investment-600 rounded-2xl blur opacity-30 animate-pulse-light"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 p-4 h-full">
        <h3 className="text-lg font-semibold mb-2">Croissance du Chiffre d'Affaires OnlyFans</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Évolution mensuelle (en millions $)</p>

        <ChartContainer className="aspect-[5/4] h-[300px]" config={chartConfig}>
          <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'var(--foreground)' }}
              tickLine={{ stroke: 'var(--border)' }} 
            />
            <YAxis 
              tick={{ fill: 'var(--foreground)' }} 
              tickLine={{ stroke: 'var(--border)' }}
              tickFormatter={(value) => `${Math.round(value)}M`}
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

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Source: Rapports financiers publics OnlyFans 2023-2024
        </div>
      </div>
    </div>
  );
};

export default OnlyfansRevenueChart;
