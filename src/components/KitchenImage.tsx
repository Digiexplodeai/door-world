import { FC, useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

export interface KitchenImageProps {
  src: string;
  alt: string;
  code: string;
  styleName?: string;
  style?: string;
  finishName?: string;
  aspectRatio?: '16/11' | '16/10' | '4/3' | '1/1';
  className?: string;
  onClick?: () => void;
}

export const KitchenImage: FC<KitchenImageProps> = ({
  src,
  alt,
  code,
  styleName,
  style,
  finishName,
  aspectRatio = '16/11',
  className = '',
  onClick,
}) => {
  const displayStyleName = styleName || style || 'Modular Kitchen';
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  let aspectClass = 'aspect-[16/11]';
  if (aspectRatio === '16/10') aspectClass = 'aspect-[16/10]';
  else if (aspectRatio === '4/3') aspectClass = 'aspect-[4/3]';
  else if (aspectRatio === '1/1') aspectClass = 'aspect-square';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ aspectRatio: aspectRatio === '16/11' ? '16/11' : aspectRatio === '16/10' ? '16/10' : '4/3' }}
      className={`relative w-full overflow-hidden bg-[#15100C] ${aspectClass} ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Background subtle architectural wood-grain / gradient container */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#241C16] via-[#17130F] to-[#0D0A08]" />

      {/* Elegant geometric cabinetry lines watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:20px_20px]"
      />

      {/* Real Image Layer if exists and not errored */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`relative z-10 w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
            onClick ? 'group-hover:scale-105' : ''
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Clean Elegant Placeholder (Displayed when image is loading, pending, or fails) */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 z-0 flex flex-col justify-between p-5 sm:p-6 text-[#F7F3EC] select-none">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#B8793A] bg-[#0E0C0A]/90 px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
              {code}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5998A] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B8793A]" />
              Modular Suite
            </span>
          </div>

          <div className="my-auto py-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#201812] border border-[#B8793A]/30 flex items-center justify-center mb-2.5 shadow-inner">
              <ChefHat className="w-6 h-6 text-[#B8793A]" />
            </div>
            <p className="text-sm font-bold text-[#FBF8F3] tracking-wide">
              {displayStyleName}
            </p>
            {finishName && (
              <p className="text-[11px] text-[#A5998A] font-medium mt-0.5">
                {finishName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8275] border-t border-white/5 pt-2">
            <span>Kumar Kitchen King</span>
            <span className="text-[#B8793A]">100% Factory Built</span>
          </div>
        </div>
      )}

      {/* Top subtle scrim */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0E0C0A]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
