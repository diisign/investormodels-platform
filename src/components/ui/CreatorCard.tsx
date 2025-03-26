
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
}

const CreatorCard = ({ id, imageUrl, category, investorsCount, totalInvested, className = '' }: CreatorCardProps) => {
  const creatorProfile = getCreatorProfile(id);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <Link to={`/creator/${id}`} className="block h-full">
        <div className="relative p-4">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-700 shadow-lg mb-3">
              <AvatarImage src={imageUrl} alt={creatorProfile.name} className="object-cover" />
              <AvatarFallback>{creatorProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-lg text-center">{creatorProfile.name}</h3>
          </div>
          
          {/* Expected Return Rate - Highlighted */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-medium">Rendement prévu</span>
              </div>
              <span className="text-lg font-bold text-green-500">{creatorProfile.returnRate}%</span>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">Followers</span>
              </div>
              <span className="text-sm font-medium">{creatorProfile.followers.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CircleDollarSign className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">Revenu mensuel</span>
              </div>
              <span className="text-sm font-medium">{creatorProfile.monthlyRevenue.toLocaleString()}€</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">Investisseurs</span>
              </div>
              <span className="text-sm font-medium">{investorsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total investi</span>
              <span className="font-semibold text-investment-600 dark:text-investment-400">{totalInvested.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CreatorCard;
