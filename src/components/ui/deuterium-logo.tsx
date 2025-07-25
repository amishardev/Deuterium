import React from 'react';
import { cn } from '@/lib/utils';

interface DeuteriumLogoProps {
  variant?: 'main' | 'alt';
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export const DeuteriumLogo: React.FC<DeuteriumLogoProps> = ({
  variant = 'main',
  className,
  imgClassName,
  textClassName,
}) => {
  const logoSrc = variant === 'main' 
    ? 'https://github.com/amishardev/Deuterium-web/blob/main/DEUTERIUM.png?raw=true'
    : 'https://github.com/amishardev/Deuterium-web/blob/main/Untitled%20design%20(2).png?raw=true';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img
        src={logoSrc}
        alt="Deuterium Logo"
        width={48}
        height={48}
        className={cn(
          'object-contain transition-opacity duration-200 hover:opacity-90',
          imgClassName
        )}
      />
      {textClassName && (
        <span className={cn('text-lg font-semibold', textClassName)}>
          Deuterium
        </span>
      )}
    </div>
  );
};