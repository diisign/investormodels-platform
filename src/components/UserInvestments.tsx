
import { useQuery } from '@tanstack/react-query';
import { getUserInvestments } from '@/utils/investments';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

const UserInvestments = () => {
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ['userInvestments'],
    queryFn: getUserInvestments,
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos investissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vos investissements</CardTitle>
      </CardHeader>
      <CardContent>
        {investments.length === 0 ? (
          <p className="text-gray-500">Aucun investissement pour le moment</p>
        ) : (
          <div className="space-y-4">
            {investments.map((investment) => {
              const creator = getCreatorProfile(investment.creator_id);
              const investmentDate = new Date(investment.created_at);
              
              console.log('Creator profile in UserInvestments:', creator);
              
              return (
                <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                    <div>
                      <p className="font-medium">{creator?.name || 'Créatrice'}</p>
                      <p className="text-sm text-gray-500">Rendement: {investment.return_rate}%</p>
                      <p className="text-xs text-gray-500">
                        Bloqué jusqu'au {format(
                          new Date(
                            investmentDate.getFullYear(),
                            investmentDate.getMonth() + 3,
                            investmentDate.getDate()
                          ),
                          'dd MMMM yyyy',
                          { locale: fr }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{investment.amount}€</p>
                    <p className="text-sm text-gray-500">
                      {format(investmentDate, 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInvestments;
