
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
        <div className="relative p-4 flex flex-col items-center">
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 rounded-full text-investment-600 dark:text-investment-400">
              {category}
            </span>
          </div>
          
          <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-700 shadow-lg mb-4">
            <AvatarImage src={imageUrl} alt={creatorProfile.name} className="object-cover" />
            <AvatarFallback>{creatorProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h3 className="font-bold text-lg mb-4 truncate text-center">{creatorProfile.name}</h3>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{creatorProfile.followers.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-sm font-medium text-green-500">{creatorProfile.returnRate}%</span>
            </div>
            <div className="flex items-center">
              <CircleDollarSign className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{creatorProfile.monthlyRevenue.toLocaleString()}€</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{investorsCount} investisseurs</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4 pt-2">
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total investi</span>
              <span className="font-medium">{totalInvested.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CreatorCard;
