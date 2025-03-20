
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  once?: boolean;
  distance?: number;
  threshold?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  direction = 'up',
  duration = 600,
  delay = 0,
  once = true,
  distance = 20,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && current) {
            observer.unobserve(current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once, threshold]);

  const getDirectionStyles = () => {
    const transitionStyles = `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`;
    switch (direction) {
      case 'up':
        return {
          transition: transitionStyles,
          transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
        };
      case 'down':
        return {
          transition: transitionStyles,
          transform: isVisible ? 'translateY(0)' : `translateY(-${distance}px)`,
        };
      case 'left':
        return {
          transition: transitionStyles,
          transform: isVisible ? 'translateX(0)' : `translateX(${distance}px)`,
        };
      case 'right':
        return {
          transition: transitionStyles,
          transform: isVisible ? 'translateX(0)' : `translateX(-${distance}px)`,
        };
      case 'none':
      default:
        return {
          transition: `opacity ${duration}ms cubic-bezier(0.19, 1, 0.22, 1) ${delay}ms`,
        };
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        ...getDirectionStyles(),
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
