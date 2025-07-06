import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Gem, Award, Medal } from 'lucide-react';

interface CreatorBadgeProps {
  returnRate: number;
}

const CreatorBadge = ({ returnRate }: CreatorBadgeProps) => {
  const getBadgeConfig = (rate: number) => {
    if (rate >= 115 && rate <= 130) {
      return {
        variant: 'default' as const,
        icon: Gem,
        text: 'Diamant',
        className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg'
      };
    } else if (rate >= 100 && rate < 115) {
      return {
        variant: 'secondary' as const,
        icon: Award,
        text: 'Platine',
        className: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-0 shadow-md'
      };
    } else if (rate >= 80 && rate < 100) {
      return {
        variant: 'outline' as const,
        icon: Medal,
        text: 'Or',
        className: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-md'
      };
    }
    
    return null;
  };

  const config = getBadgeConfig(returnRate);
  
  if (!config) {
    return null;
  }

  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <IconComponent className="h-3 w-3 mr-1" />
      {config.text}
    </Badge>
  );
};

export default CreatorBadge;