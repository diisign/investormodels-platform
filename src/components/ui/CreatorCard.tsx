
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from './avatar';
import { getCreatorProfile } from '@/utils/creatorProfiles';

interface CreatorCardProps {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  investorsCount: number;
  totalInvested: number;
  className?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  id,
  name,
  imageUrl,
  category,
  investorsCount,
  totalInvested,
  className,
}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get consistent creator data
  const creatorProfile = getCreatorProfile(id);

  const handleCardClick = () => {
    navigate(`/creator/${id}`);
  };

  return (
    <div 
      className={cn(
        'glass-card cursor-pointer overflow-hidden relative group',
        'hover:translate-y-[-5px] hover:shadow-xl',
        'transition-all duration-500 ease-out-expo',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl"></div>
      
      <div className="flex flex-col items-center pt-6">
        <Avatar className="h-20 w-20 mb-3 ring-2 ring-investment-200 dark:ring-investment-800">
          <AvatarImage 
            src={imageUrl} 
            alt={name}
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'transition-all duration-700',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </Avatar>
        
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 text-investment-600 dark:text-investment-400 text-xs font-semibold rounded-full backdrop-blur-sm shadow-sm">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4 relative z-20">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-creator-300 transition-colors duration-300 text-center">
          {name}
        </h3>
        
        <div className="grid grid-cols-3 gap-1 mt-3">
          <div className="flex flex-col items-center p-2 bg-gray-50/90 dark:bg-gray-800/70 rounded-lg">
            <TrendingUp className="h-4 w-4 text-green-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Rendement prévu</span>
            <span className="font-semibold text-sm text-gray-800 dark:text-white">{creatorProfile.returnRate}%</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-gray-50/90 dark:bg-gray-800/70 rounded-lg">
            <Users className="h-4 w-4 text-blue-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Investisseurs</span>
            <span className="font-semibold text-sm text-gray-800 dark:text-white">{investorsCount}</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-gray-50/90 dark:bg-gray-800/70 rounded-lg">
            <CircleDollarSign className="h-4 w-4 text-investment-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Revenu</span>
            <span className="font-semibold text-sm text-gray-800 dark:text-white">{creatorProfile.monthlyRevenue.toLocaleString()}€</span>
          </div>
        </div>
        
        <div 
          className="w-full mt-4 h-9 bg-gradient-to-r from-investment-600 to-investment-500 rounded-lg 
                    flex items-center justify-center text-black font-medium text-sm
                    transform transition-all duration-300 opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0 shadow-md"
        >
          Voir le profil
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
