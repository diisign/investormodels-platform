import { Badge } from '@/components/ui/badge';
import { Diamond, Medal, Trophy } from 'lucide-react';

interface CreatorBadgeProps {
  returnRate: number;
  className?: string;
}

export const CreatorBadge = ({ returnRate, className = '' }: CreatorBadgeProps) => {
  const getBadgeInfo = (rate: number) => {
    if (rate >= 115 && rate <= 130) {
      return {
        label: 'Diamant',
        icon: Diamond,
        variant: 'default' as const,
        className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700'
      };
    } else if (rate >= 100 && rate < 115) {
      return {
        label: 'Platine',
        icon: Medal,
        variant: 'secondary' as const,
        className: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-0 hover:from-gray-500 hover:to-gray-700'
      };
    } else if (rate >= 80 && rate < 100) {
      return {
        label: 'Or',
        icon: Trophy,
        variant: 'outline' as const,
        className: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0 hover:from-yellow-500 hover:to-yellow-700'
      };
    }
    return null;
  };

  const badgeInfo = getBadgeInfo(returnRate);

  if (!badgeInfo) return null;

  const { label, icon: Icon, className: badgeClassName } = badgeInfo;

  return (
    <Badge className={`${badgeClassName} ${className} flex items-center gap-1 font-semibold`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
};