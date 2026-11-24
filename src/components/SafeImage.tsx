import { useState } from 'react';
import { DoorOpen } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  fallbackTitle?: string;
}

function buildResponsiveSrcSet(src: string): string | undefined {
  const prefix = '/src/assets/images/';
  if (!src.startsWith(prefix) || src.includes('/mobile/')) return undefined;
  const filename = src.slice(prefix.length);
  return `${prefix}mobile/${filename} 800w, ${src} 1376w`;
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '(max-width: 767px) 100vw, 50vw',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#3B2419] via-[#2B1A12] to-[#1D110C] text-[#E8DCC8] p-6 text-center ${className}`}
      >
        <DoorOpen className="w-10 h-10 text-[#C9A24B] mb-3 opacity-85" strokeWidth={1.5} />
        <span className="font-display text-base text-[#FAF6EF] tracking-wide">
          {fallbackTitle || 'Door World Architectural Collection'}
        </span>
      </div>
    );
  }

  const srcSet = buildResponsiveSrcSet(src);

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
