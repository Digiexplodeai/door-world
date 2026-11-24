import { FC } from 'react';

interface DoorWorldLogoProps {
  variant?: 'header' | 'footer' | 'compact';
  theme?: 'dark' | 'light';
  className?: string;
  showSubtitle?: boolean;
}

export const DoorWorldLogo: FC<DoorWorldLogoProps> = ({
  variant = 'header',
  theme = 'dark',
  className = '',
  showSubtitle = true,
}) => {
  const isFooter = variant === 'footer';
  const isCompact = variant === 'compact';
  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Mark Icon: Bold Black D with open door & globe */}
      <div
        className={`relative shrink-0 flex items-center justify-center rounded-[6px] transition-transform duration-300 group-hover:scale-105 ${
          isCompact ? 'w-9 h-9' : isFooter ? 'w-12 h-12' : 'w-11 h-11'
        } bg-[#0E0C0A] border border-[#B8793A]/50 shadow-md`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer D Contour */}
          <path
            d="M10 8 H32 C46 8 54 18 54 32 C54 46 46 56 32 56 H10 Z"
            fill="#171412"
            stroke="#B8793A"
            strokeWidth="2.5"
          />
          {/* Globe grid lines */}
          <circle
            cx="32"
            cy="32"
            r="18"
            fill="none"
            stroke="#2A241F"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="9"
            ry="18"
            fill="none"
            stroke="#2A241F"
            strokeWidth="1"
          />
          {/* Open Wooden Door in Copper Gradient */}
          <path
            d="M20 16 L38 12 L38 52 L20 48 Z"
            fill="#B8793A"
            stroke="#F7F3EC"
            strokeWidth="1.5"
          />
          <rect x="24" y="19" width="10" height="11" rx="0.5" fill="#7A4B1F" opacity="0.75" />
          <rect x="24" y="33" width="10" height="12" rx="0.5" fill="#7A4B1F" opacity="0.75" />
          <circle cx="35" cy="32" r="1.5" fill="#F7F3EC" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className={`font-sans font-black tracking-tight ${
              isCompact ? 'text-lg' : isFooter ? 'text-2xl' : 'text-xl'
            } ${isLight ? 'text-[#0E0C0A]' : 'text-[#FBF8F3]'}`}
          >
            DOORS
          </span>
          <span
            className={`font-sans font-semibold tracking-normal text-[#B8793A] ${
              isCompact ? 'text-lg' : isFooter ? 'text-2xl' : 'text-xl'
            }`}
          >
            world
          </span>
        </div>

        {/* Tagline */}
        <span
          className={`font-sans font-bold uppercase text-[#B8793A] tracking-[0.24em] ${
            isCompact ? 'text-[7px]' : 'text-[8.5px]'
          } mt-0.5 whitespace-nowrap`}
        >
          THE COMPLETE DOORS SOLUTIONS
        </span>

        {/* Subtitle Badge: by Kumar Kitchen King */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#0F3B33] border border-[#1B5C4F]"
              aria-hidden="true"
            />
            <span
              className={`font-sans font-medium text-[9px] tracking-wider uppercase ${
                isLight ? 'text-[#8E8275]' : 'text-[#F7F3EC]/80'
              } whitespace-nowrap`}
            >
              by Kumar Kitchen King
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
