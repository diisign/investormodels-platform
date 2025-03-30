
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, TrendingUp, CircleDollarSign } from 'lucide-react';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export interface CreatorCardProps {
  id: string;
  name?: string;
  imageUrl: string;
  category: string;
  investorsCount: number;
  totalInvested: number;
  className?: string;
  monthlyRevenue?: number;
  rank?: number;
}

const CreatorCard = ({ 
  id, 
  imageUrl, 
  category, 
  investorsCount, 
  totalInvested, 
  monthlyRevenue, 
  className = '',
  rank 
}: CreatorCardProps) => {
  const creatorProfile = getCreatorProfile(id);
  
  // Ensure totalInvested is between 42,000 and 105,000
  const validatedTotalInvested = Math.max(42000, Math.min(105000, totalInvested));
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className} relative`}
    >
      {rank !== undefined && (
        <div className="absolute top-2 left-2 z-10 h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {rank}
        </div>
      )}
      <Link to={`/creator/${id}`} className="block h-full">
        <div className="relative p-2 sm:p-4">
          <div className="flex flex-col items-center mb-2 sm:mb-4">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-white dark:border-gray-700 shadow-lg mb-2 sm:mb-3">
              <AvatarImage src={imageUrl} alt={creatorProfile.name} className="object-cover" />
              <AvatarFallback>{creatorProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-sm sm:text-lg text-center">{creatorProfile.name}</h3>
          </div>
          
          {/* Expected Return Rate - Highlighted */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-green-500" />
                <span className="text-xs sm:text-sm font-medium">Rendement prévu</span>
              </div>
              <span className="text-sm sm:text-lg font-bold text-green-500">{creatorProfile.returnRate}%</span>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm">Followers</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{creatorProfile.followers.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CircleDollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm">Revenu mensuel</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{(monthlyRevenue || creatorProfile.monthlyRevenue).toLocaleString()}€</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm">Investisseurs</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{investorsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="px-2 sm:px-4 pb-2 sm:pb-4">
          <div className="pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-base font-medium">Total investi</span>
              <span className="text-xs sm:text-base font-semibold text-investment-600 dark:text-investment-400">{validatedTotalInvested.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CreatorCard;
