import { FC, useState } from 'react';

export interface DoorImageProps {
  src: string;
  alt: string;
  aspectRatio?: '4/5' | '16/9' | '3/4' | '1/1' | 'contain' | 'auto';
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  objectFit?: 'cover' | 'contain';
}

const FALLBACK_WOOD_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23171310'/%3E%3Cpath d='M0 0h800v1000H0z' fill='none' stroke='%23B8793A' stroke-width='4' stroke-opacity='0.2'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23B8793A' font-family='sans-serif' font-size='24' font-weight='600' letter-spacing='2'%3EDOOR WORLD%3C/text%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' fill='%238E8275' font-family='sans-serif' font-size='14'%3EKumar Kitchen King%3C/text%3E%3C/svg%3E";

export const DoorImage: FC<DoorImageProps> = ({
  src,
  alt,
  aspectRatio = '4/5',
  priority = false,
  className = '',
  imgClassName = '',
  width = 800,
  height = 1000,
  onClick,
  objectFit = 'cover',
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Aspect ratio classes
  let aspectClass = 'aspect-[4/5]';
  if (aspectRatio === '16/9') aspectClass = 'aspect-[16/9]';
  else if (aspectRatio === '3/4') aspectClass = 'aspect-[3/4]';
  else if (aspectRatio === '1/1') aspectClass = 'aspect-square';
  else if (aspectRatio === 'contain') aspectClass = 'aspect-[4/5]';
  else if (aspectRatio === 'auto') aspectClass = '';

  const fitClass = objectFit === 'contain' ? 'object-contain p-2' : 'object-cover object-center';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative w-full overflow-hidden bg-[#140F0B] ${aspectClass} ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-expect-error React 18/19 fetchPriority
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setCurrentSrc(FALLBACK_WOOD_PLACEHOLDER);
          }
        }}
        className={`w-full h-full ${fitClass} transition-transform duration-700 ease-out ${
          onClick ? 'group-hover:scale-105' : ''
        } ${imgClassName}`}
      />
    </div>
  );
};
