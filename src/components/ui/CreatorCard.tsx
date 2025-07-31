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
      {rank !== undefined && <div className="absolute top-2 left-2 z-10 h-7 w-7 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-sm shadow-md bg-zinc-950">
          {rank}
        </div>}
      <div onClick={handleClick} className="block h-full cursor-pointer">
        <div className="relative p-1 sm:p-2 bg-slate-100">
          <div className="flex flex-col items-center mb-1 sm:mb-2 bg-transparent">
            <Avatar className="h-8 w-8 sm:h-12 sm:w-12 border-2 border-white dark:border-gray-700 shadow-lg mb-1">
              <AvatarImage src={finalImageUrl} alt={creatorProfile.name} className="object-cover" onError={e => {
              console.log(`Image failed to load for ${creatorProfile.name}:`, finalImageUrl);
            }} onLoad={() => {
              if (id === 'creator3') {
                console.log(`Image loaded successfully for Kayla:`, finalImageUrl);
              }
            }} />
              <AvatarFallback className="text-xs">{creatorProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-xs sm:text-sm text-center truncate w-full px-1">{creatorProfile.name}</h3>
          </div>
          
          {/* Key Metrics - Simplified */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">Revenus</span>
              <span className="text-xs font-medium">{(monthlyRevenue/1000).toFixed(0)}k€</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Investisseurs</span>
              <span className="text-xs font-medium">{investorsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="px-1 sm:px-2 pb-1 sm:pb-2">
          <div className="pt-1 border-t border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <span className="text-xs font-semibold text-yellow-300">{(totalInvested/1000).toFixed(0)}k€ investi</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default CreatorCard;