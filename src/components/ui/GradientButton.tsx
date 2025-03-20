import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  className,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  gradientDirection = 'to-r',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `bg-gradient-${gradientDirection} from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-500/20 focus:ring-violet-500/50`;
      case 'secondary':
        return `bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md focus:ring-gray-400/50`;
      case 'outline':
        return `bg-transparent border border-violet-500 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 focus:ring-violet-500/50`;
      case 'ghost':
        return `bg-transparent text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 focus:ring-violet-500/50`;
      default:
        return `bg-gradient-${gradientDirection} from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-500/20 focus:ring-violet-500/50`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'default':
        return 'py-2.5 px-5';
      case 'lg':
        return 'py-3 px-6 text-lg';
      case 'xl':
        return 'py-4 px-8 text-xl';
      default:
        return 'py-2.5 px-5';
    }
  };

  return (
    <button
      className={cn(
        'relative font-medium rounded-lg transform transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50',
        'active:scale-[0.98] hover:-translate-y-0.5',
        getVariantClasses(),
        getSizeClasses(),
        fullWidth ? 'w-full' : '',
        'overflow-hidden group',
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="relative flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </span>
    </button>
  );
};

export default GradientButton;
