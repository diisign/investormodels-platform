
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { TrendingUp } from 'lucide-react';

interface CreatorProfileProps {
  creatorId: string;
  amount: number;
  returnRate: number;
  initialAmount: number;
}

const CreatorProfile = ({ creatorId, amount, returnRate, initialAmount }: CreatorProfileProps) => {
  const creator = getCreatorProfile(creatorId);
  
  return (
    <div className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
        <img 
          src={creator?.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorId}`}
          alt={creator?.name || 'Créatrice'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm">{creator?.name || 'Créatrice'}</h4>
          <span className="text-sm font-semibold">{amount.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            Initial: {initialAmount}€
          </span>
          <span className="text-xs font-medium text-green-500 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            {returnRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
