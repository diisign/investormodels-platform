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
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-card dark:bg-card text-card-foreground dark:text-card-foreground rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className} relative`}
    >
      {rank !== undefined && (
        <div className="absolute top-2 left-2 z-10 h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {rank}
        </div>
      )}
      <Link to={`/creator/${id}`} className="block h-full">
        <div className="relative p-2 sm:p-4">
          <div className="flex flex-col items-center mb-2 sm:mb-4">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-card dark:border-card shadow-lg mb-2 sm:mb-3">
              <AvatarImage src={imageUrl} alt={creatorProfile.name} className="object-cover" />
              <AvatarFallback>{creatorProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-sm sm:text-lg text-center text-card-foreground dark:text-card-foreground">{creatorProfile.name}</h3>
          </div>
          
          <div className="bg-muted dark:bg-muted rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-accent" />
                <span className="text-xs sm:text-sm font-medium text-card-foreground dark:text-card-foreground">Rendement prévu</span>
              </div>
              <span className="text-sm sm:text-lg font-bold text-accent">{creatorProfile.returnRate}%</span>
            </div>
          </div>
          
          <div className="space-y-1.5 sm:space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm text-card-foreground dark:text-card-foreground">Followers</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-card-foreground dark:text-card-foreground">{creatorProfile.followers.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CircleDollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm text-card-foreground dark:text-card-foreground">Revenu mensuel</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-card-foreground dark:text-card-foreground">{monthlyRevenue.toLocaleString()}€</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                <span className="text-xs sm:text-sm text-card-foreground dark:text-card-foreground">Investisseurs</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-card-foreground dark:text-card-foreground">{investorsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="px-2 sm:px-4 pb-2 sm:pb-4">
          <div className="pt-2 sm:pt-3 border-t border-border dark:border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-base font-medium text-card-foreground dark:text-card-foreground">Total investi</span>
              <span className="text-xs sm:text-base font-semibold text-accent">{totalInvested.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CreatorCard;
