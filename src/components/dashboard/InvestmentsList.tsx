
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CircleDollarSign } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { Investment } from '@/types/investments';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface InvestmentsListProps {
  investments: Investment[];
}

const InvestmentsList = ({ investments }: InvestmentsListProps) => {
  const navigate = useNavigate();

  return (
    <FadeIn direction="up">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Mes investissements</h3>
          <button
            onClick={() => navigate('/investments')}
            className="text-sm text-investment-600 hover:text-investment-500 flex items-center font-medium"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        {investments.length > 0 ? (
          <div className="space-y-4">
            {investments.map((investment) => {
              const creator = getCreatorProfile(investment.creator_id);
              const investmentDate = new Date(investment.created_at);
              const withdrawalDate = new Date(
                investmentDate.getFullYear(),
                investmentDate.getMonth() + investment.duration_months,
                investmentDate.getDate()
              );
              const canWithdraw = new Date() >= withdrawalDate;
              
              // Debug pour Hannah spécifiquement
              if (creator?.name?.includes('Hannah')) {
                console.log('Hannah Investment Debug:', {
                  creatorName: creator.name,
                  investmentDate: investmentDate.toLocaleDateString('fr-FR'),
                  durationMonths: investment.duration_months,
                  withdrawalDate: withdrawalDate.toLocaleDateString('fr-FR'),
                  canWithdraw,
                  today: new Date().toLocaleDateString('fr-FR')
                });
              }
              
              return (
                <div 
                  key={investment.id}
                  className="flex items-center p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
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
                      <h4 className="font-medium text-sm">{creator?.name || 'Créatrice'} 💎</h4>
                      <span className="text-sm font-semibold">{Number(investment.amount).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {format(investmentDate, 'dd/MM/yyyy', { locale: fr })}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        +{investment.return_rate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        Initial: {investment.initial}€
                      </span>
                      <span className={`text-xs font-medium ${canWithdraw ? 'text-green-600' : 'text-orange-500'}`}>
                        {canWithdraw ? 'Retrait disponible' : `Retrait le ${format(withdrawalDate, 'dd/MM/yyyy', { locale: fr })}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <CircleDollarSign className="h-12 w-12 mx-auto opacity-30" />
            </div>
            <h4 className="text-lg font-medium mb-2">Aucun investissement</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Vous n'avez pas encore investi dans des créateurs.
            </p>
            <Button 
              onClick={() => navigate('/creators')}
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              Découvrir des créatrices
            </Button>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default InvestmentsList;
