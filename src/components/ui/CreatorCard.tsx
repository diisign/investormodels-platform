import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, CircleDollarSign } from 'lucide-react';
import { getCreatorProfile } from '@/utils/creatorProfiles';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import CreatorBadge from '@/components/ui/CreatorBadge';
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
  const navigate = useNavigate();
  const creatorProfile = getCreatorProfile(id);

  // Debug logging for Kayla specifically
  if (id === 'creator3') {
    console.log('CreatorCard - Kayla debug:', {
      id,
      creatorProfileImageUrl: creatorProfile.imageUrl,
      propsImageUrl: imageUrl,
      creatorProfileName: creatorProfile.name
    });
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/creator/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Use the profile image URL instead of the props imageUrl
  const finalImageUrl = creatorProfile.imageUrl || imageUrl;
  return <motion.div whileHover={{
    y: -5
  }} transition={{
    type: 'spring',
    stiffness: 300
  }} className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className} relative`}>
      {rank !== undefined && <div className="absolute top-2 left-2 z-10 h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-md bg-zinc-950">
          {rank}
        </div>}
      <div onClick={handleClick} className="block h-full cursor-pointer">
        <div className="relative p-2 sm:p-4 bg-slate-100">
          <div className="flex flex-col items-center mb-2 sm:mb-4 bg-transparent">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-4 border-white dark:border-gray-700 shadow-lg mb-2 sm:mb-3">
              <AvatarImage src={finalImageUrl} alt={creatorProfile.name} className="object-cover" onError={e => {
              console.log(`Image failed to load for ${creatorProfile.name}:`, finalImageUrl);
            }} onLoad={() => {
              if (id === 'creator3') {
                console.log(`Image loaded successfully for Kayla:`, finalImageUrl);
              }
            }} />
              <AvatarFallback>{creatorProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-sm sm:text-lg text-center">{creatorProfile.name}</h3>
          </div>
          
          {/* Creator Badge */}
          
          
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
              <span className="text-xs sm:text-sm font-medium">{monthlyRevenue.toLocaleString()}€</span>
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
              <span className="text-xs sm:text-base font-semibold text-investment-600 dark:text-investment-400">{totalInvested.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default CreatorCard;