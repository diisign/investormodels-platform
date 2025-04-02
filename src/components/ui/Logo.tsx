
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className,
  withText = true
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="logo-icon-container relative">
        <div className="logo-icon-graph absolute z-10 animate-float"></div>
        <div className="logo-icon-circle"></div>
      </div>
      
      {withText && (
        <span className={cn('font-bold logo-text', textSizeClasses[size])}>
          <span className="text-purple-gradient-from">investor</span>
          <span className="text-purple-gradient-to">models</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
