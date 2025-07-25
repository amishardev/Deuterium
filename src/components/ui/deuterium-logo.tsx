import React from 'react';
import Image from 'next/image';
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
    ? '/deuterium-logo.png'
    : '/deuterium-logo.png'; // Using same logo for both variants for now

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src={logoSrc}
        alt="Deuterium Logo"
        width={48}
        height={48}
        className={cn(
          'object-contain transition-opacity duration-200 hover:opacity-90',
          imgClassName
        )}
        priority={true}
        unoptimized={true}
      />
      {textClassName && (
        <span className={cn('text-lg font-semibold', textClassName)}>
          Deuterium
        </span>
      )}
    </div>
  );
};