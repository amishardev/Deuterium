"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/placeholder-image.svg',
  priority = false,
  fill = false,
  sizes,
  quality = 75,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // For external URLs, use regular img tag with error handling
  const isExternalUrl = src.startsWith('http') || src.startsWith('//');
  
  if (isExternalUrl) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'opacity-50',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  // For local images, use Next.js Image component
  const imageProps = {
    src: imgSrc,
    alt,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      hasError && 'opacity-50',
      className
    ),
    onLoad: handleLoad,
    onError: handleError,
    priority,
    quality,
    unoptimized: true, // For Netlify compatibility
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
    />
  );
};

// Placeholder SVG for fallback
export const PlaceholderImage = ({ width = 400, height = 300, className }: {
  width?: number;
  height?: number;
  className?: string;
}) => (
  <div 
    className={cn(
      'flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600',
      className
    )}
    style={{ width, height }}
  >
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z"
        fill="currentColor"
      />
    </svg>
  </div>
);
