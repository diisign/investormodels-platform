
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, TrendingUp, Users } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

// Les données simulées pour les meilleurs parrains avec pseudonymes et nouveau calcul
const topAffiliates = [
  {
    id: 1,
    name: "CryptoSophie_",
    referrals: 743,
    earnings: 111450,  // 743 × 150 (gain moyen de 150€ par filleul)
  },
  {
    id: 2,
    name: "TomInvest92",
    referrals: 612,
    earnings: 91800,   // 612 × 150
  },
  {
    id: 3,
    name: "EmmaTrader",
    referrals: 589,
    earnings: 88350,   // 589 × 150
  },
  {
    id: 4,
    name: "LuckyLucas_",
    referrals: 534,
    earnings: 80100,   // 534 × 150
  },
  {
    id: 5,
    name: "CamInvestor",
    referrals: 487,
    earnings: 73050,   // 487 × 150
  },
];

const TopAffiliates = () => {
  return (
    <FadeIn direction="up" delay={100}>
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                <Award className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg font-medium">Top 5 des parrains (mai)</CardTitle>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Gain moyen: 150€/filleul</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="py-2 px-3">Parrain</TableHead>
                <TableHead className="py-2 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Filleuls</span>
                  </div>
                </TableHead>
                <TableHead className="py-2 px-3 text-right">Gains</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAffiliates.map((affiliate, index) => (
                <TableRow key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="py-2 px-3 font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                        index === 0 
                          ? "bg-yellow-100 text-yellow-700" 
                          : index === 1 
                            ? "bg-gray-200 text-gray-700" 
                            : index === 2 
                              ? "bg-amber-100 text-amber-700"
                              : "bg-purple-100 text-purple-700"
                      }`}>
                        {index + 1}
                      </div>
                      {affiliate.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-3 text-center">{affiliate.referrals}</TableCell>
                  <TableCell className="py-2 px-3 text-right font-medium text-purple-600">{affiliate.earnings}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default TopAffiliates;
