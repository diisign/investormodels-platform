
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, TrendingUp } from 'lucide-react';
import { getCreatorProfile } from '@/utils/creatorProfiles';

export interface CreatorCardProps {
  id: string;
  name?: string;
  imageUrl: string;
  category: string;
  investorsCount: number;
  totalInvested: number;
  className?: string;
  // We added returnRate to the props but it's not needed since we get it from creatorProfile
  monthlyRevenue?: number; // Add optional monthlyRevenue prop
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
        <div className="relative h-60 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={creatorProfile.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 rounded-full text-investment-600 dark:text-investment-400">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">{creatorProfile.name}</h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{investorsCount} investisseurs</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-sm font-medium text-green-500">{creatorProfile.returnRate}%</span>
            </div>
          </div>
          
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
