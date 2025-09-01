import React, { useState } from 'react';
import { format, addMonths, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Investment } from '@/types/investments';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Calendar, Coins } from 'lucide-react';
import { distributeDividends, sellShares, getPendingDividends, getNextDividendDate } from '@/utils/dividends';
import { getCreatorYield } from '@/utils/yieldData';
import { getCreatorProfile } from '@/utils/creatorProfiles';

interface SharesManagementButtonProps {
  investment: Investment;
  onUpdate: () => void;
}

const SharesManagementButton = ({ investment, onUpdate }: SharesManagementButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingDividends, setPendingDividends] = useState<{ amount: number; months: number }>({ amount: 0, months: 0 });

  const creator = getCreatorProfile(investment.creator_id);
  const creatorYield = getCreatorYield(investment.creator_id);
  const investmentDate = new Date(investment.created_at);
  const nextDividendDate = getNextDividendDate(investment);
  
  // Calculer les dividendes en attente quand le dialog s'ouvre
  React.useEffect(() => {
    if (isOpen && investment.shares_owned) {
      getPendingDividends(investment).then(setPendingDividends);
    }
  }, [isOpen, investment]);

  const handleDistributeDividends = async () => {
    setIsLoading(true);
    const success = await distributeDividends(investment.id);
    if (success) {
      onUpdate();
      setPendingDividends({ amount: 0, months: 0 });
    }
    setIsLoading(false);
  };

  const handleSellShares = async () => {
    setIsLoading(true);
    const success = await sellShares(investment.id);
    if (success) {
      onUpdate();
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  if (!investment.shares_owned) {
    return (
      <Badge variant="secondary" className="text-xs">
        Parts vendues le {investment.sold_at ? format(new Date(investment.sold_at), 'dd/MM/yyyy', { locale: fr }) : 'N/A'}
      </Badge>
    );
  }

  const daysUntilNextDividend = nextDividendDate ? differenceInDays(nextDividendDate, new Date()) : 0;
  const monthlyDividend = investment.amount * (creatorYield / 100 / 12);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <Coins className="h-4 w-4 mr-1" />
          Gérer les parts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gestion de vos parts - {creator?.name}</DialogTitle>
          <DialogDescription>
            Vous possédez {investment.amount}€ de parts dans cette créatrice avec un yield de {creatorYield.toFixed(2)}% APY.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informations sur les dividendes */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">Dividendes mensuels: {monthlyDividend.toFixed(2)}€</span>
            </div>
            
            {nextDividendDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  Prochain dividende: {format(nextDividendDate, 'dd MMMM yyyy', { locale: fr })}
                  {daysUntilNextDividend > 0 && ` (dans ${daysUntilNextDividend} jours)`}
                </span>
              </div>
            )}
          </div>

          {/* Dividendes en attente */}
          {pendingDividends.amount > 0 && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Dividendes disponibles</h4>
              <p className="text-green-700 text-sm mb-3">
                Vous avez {pendingDividends.amount.toFixed(2)}€ de dividendes en attente 
                ({pendingDividends.months} mois).
              </p>
              <Button 
                onClick={handleDistributeDividends}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {isLoading ? 'Distribution...' : `Recevoir ${pendingDividends.amount.toFixed(2)}€`}
              </Button>
            </div>
          )}

          {/* Vente des parts */}
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Vendre vos parts</h4>
            <p className="text-orange-700 text-sm mb-3">
              Vous récupérerez votre capital de {investment.amount}€ mais ne recevrez plus de dividendes.
            </p>
            <Button 
              onClick={handleSellShares}
              disabled={isLoading}
              variant="destructive"
              className="w-full"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              {isLoading ? 'Vente...' : `Vendre pour ${investment.amount}€`}
            </Button>
          </div>

          {/* Statistiques */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Investissement initial: {investment.amount}€</p>
            <p>Date d'achat: {format(investmentDate, 'dd MMMM yyyy', { locale: fr })}</p>
            <p>Yield annuel: {creatorYield.toFixed(2)}%</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharesManagementButton;