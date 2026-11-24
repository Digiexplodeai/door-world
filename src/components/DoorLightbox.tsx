import { FC, useEffect, useCallback, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DoorItem } from '../data/doors';

export interface DoorLightboxProps {
  doors: DoorItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

export const DoorLightbox: FC<DoorLightboxProps> = ({
  doors,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}) => {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = doors.length;
  const currentDoor = doors[currentIndex] || doors[0];

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % total);
  }, [currentIndex, total, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || !currentDoor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentDoor.title} preview`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070504]/95 backdrop-blur-md p-4 sm:p-6 lg:p-10 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close door preview (Esc)"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-[#1A1512] hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous door (Left arrow)"
          className="absolute left-3 sm:left-6 z-50 w-11 h-11 rounded-full bg-[#1A1512]/80 hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next door (Right arrow)"
          className="absolute right-3 sm:right-6 z-50 w-11 h-11 rounded-full bg-[#1A1512]/80 hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Lightbox Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-[#140F0B] rounded-[8px] border border-[#2A241F] overflow-hidden shadow-2xl"
      >
        {/* Full Image Frame */}
        <div className="relative w-full flex-1 max-h-[70vh] sm:max-h-[74vh] flex items-center justify-center bg-[#0E0C0A] overflow-hidden">
          <img
            src={currentDoor.image}
            alt={currentDoor.alt}
            className={`max-w-full max-h-[70vh] sm:max-h-[74vh] ${
              currentDoor.isColourStrip
                ? 'object-contain p-4'
                : 'object-cover sm:object-contain'
            }`}
          />
        </div>

        {/* Caption & Quote Action Bar */}
        <div className="w-full p-4 sm:p-6 bg-[#171412] border-t border-[#2A241F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A]">
                {currentDoor.category}
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-[10px] font-mono text-[#8E8275]">
                {currentIndex + 1} of {total}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#FBF8F3]">
              {currentDoor.title}
            </h3>
            {currentDoor.description && (
              <p className="text-xs text-[#8E8275] max-w-xl mt-1">
                {currentDoor.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(
                `/contact?product=${encodeURIComponent(
                  `Door World: ${currentDoor.title}`
                )}`
              );
            }}
            className="px-5 py-2.5 rounded-[4px] bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-md"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
