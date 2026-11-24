import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  onEnquireDesign: (designTitle: string) => void;
}

export function HorizontalGallery({ onEnquireDesign }: HorizontalGalleryProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  const activeItem: (GalleryItem | any) | null =
    lightboxIndex !== null && GALLERY_ITEMS[lightboxIndex]
      ? (GALLERY_ITEMS[lightboxIndex] as any)
      : null;

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!section || !pinWrapper || !track || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 96);

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinWrapper,
            pin: true,
            scrub: 0.9,
            start: 'top top',
            end: () => `+=${Math.max(900, getScrollDistance())}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Subtle inner-image parallax shift inside each gallery frame
        const innerImgs = track.querySelectorAll<HTMLElement>('.gallery-parallax-img');
        innerImgs.forEach((img, idx) => {
          const speed = (GALLERY_ITEMS[idx] as any)?.parallaxSpeed ?? 1;
          gsap.fromTo(
            img,
            { xPercent: -4 * speed },
            {
              xPercent: 4 * speed,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMobileScroll = () => {
    const scroller = mobileScrollRef.current;
    if (!scroller) return;
    if (!hasSwiped && scroller.scrollLeft > 12) {
      setHasSwiped(true);
    }
    const cardStep = scroller.clientWidth * 0.78 + 16;
    const nextIdx = Math.max(
      0,
      Math.min(GALLERY_ITEMS.length - 1, Math.round(scroller.scrollLeft / cardStep))
    );
    setActiveSlide(nextIdx);
  };

  const scrollToSlide = (targetIdx: number) => {
    const scroller = mobileScrollRef.current;
    if (!scroller) return;
    const cardStep = scroller.clientWidth * 0.78 + 16;
    scroller.scrollTo({ left: targetIdx * cardStep, behavior: 'smooth' });
    setActiveSlide(targetIdx);
    setHasSwiped(true);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 85 || info.velocity.y > 380) {
      closeLightbox();
      return;
    }
    if (info.offset.x < -55 || info.velocity.x < -300) {
      showNext();
    } else if (info.offset.x > 55 || info.velocity.x > 300) {
      showPrev();
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="bg-[#1C1511] text-[#FBF8F3] overflow-x-clip"
    >
      <div
        ref={pinWrapperRef}
        className="py-16 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center"
      >
        {/* Editorial Header */}
        <div className="max-w-[1440px] w-full mx-auto px-5 md:px-8 lg:px-12 mb-6 lg:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-end">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-semibold text-stroke-gold opacity-65 block"
              >
                04
              </span>
            </div>

            <div className="lg:col-span-7">
              <p className="type-eyebrow text-[#E6C98B] font-semibold mb-2">
                Architectural Installations
              </p>
              <h2
                id="gallery-heading"
                className="type-h2 font-semibold text-[#FBF8F3]"
              >
                Horizontal Gallery
              </h2>
            </div>

            <div className="lg:col-span-3 lg:text-right flex items-center justify-between lg:justify-end">
              <p className="type-eyebrow text-[#8A7F73]">
                Tap any frame to inspect
              </p>
              <span
                className={`lg:hidden type-eyebrow text-[#E6C98B] transition-opacity duration-500 ${
                  hasSwiped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                Swipe →
              </span>
            </div>
          </div>

          {/* Horizontal Progress Line */}
          <div className="mt-5 lg:mt-6 h-[1px] w-full bg-[#E6C98B]/20 overflow-hidden">
            <div
              ref={progressRef}
              style={{ transform: 'scaleX(0)' }}
              className="origin-left h-full w-full bg-[#E6C98B]"
            />
          </div>
        </div>

        {/* Horizontal Track (Pinned scrub on desktop, CSS scroll-snap 78vw carousel on mobile) */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar scroll-px-5 md:scroll-px-8"
        >
          <div
            ref={trackRef}
            className="flex items-start lg:items-end gap-4 lg:gap-12 px-5 md:px-8 lg:px-12 w-max"
          >
            {GALLERY_ITEMS.map((item: any, idx) => {
              const sizeClasses =
                item.sizeClass === 'tall' || item.aspect === 'tall'
                  ? 'w-[78vw] sm:w-[46vw] lg:w-[27vw] h-auto lg:h-[58vh]'
                  : item.sizeClass === 'wide' || item.aspect === 'wide'
                    ? 'w-[78vw] sm:w-[60vw] lg:w-[38vw] h-auto lg:h-[46vh]'
                    : 'w-[78vw] sm:w-[48vw] lg:w-[30vw] h-auto lg:h-[52vh]';

              return (
                <figure
                  key={item.id}
                  className={`snap-start lg:snap-center shrink-0 group ${sizeClasses} flex flex-col`}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    data-cursor="view"
                    aria-label={`Inspect ${item.title} in fullscreen`}
                    className="relative h-[44svh] sm:h-[46svh] lg:h-auto lg:flex-1 w-full overflow-hidden rounded-[4px] bg-[#0E0C0A] border border-[#E6C98B]/20 cursor-pointer text-left"
                  >
                    <div className="gallery-parallax-img w-full lg:w-[110%] lg:-ml-[5%] h-full">
                      <SafeImage
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        sizes="(max-width: 1023px) 78vw, 35vw"
                        className="w-full h-full object-cover editorial-photo lg:transition-transform lg:duration-700 lg:group-hover:scale-105"
                      />
                    </div>
                    <div aria-hidden="true" className="hidden lg:block absolute inset-0 film-grain-overlay" />
                  </button>

                  <figcaption className="mt-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-[1.0625rem] sm:text-xl lg:type-h3 leading-snug font-medium text-[#FBF8F3] line-clamp-2">
                        {item.title}
                      </p>
                      <p className="lg:hidden text-[11px] uppercase tracking-[0.16em] text-[#E6C98B]/85 mt-1">
                        {item.category}
                      </p>
                      <p className="hidden lg:block type-eyebrow text-[#E6C98B]/85 mt-1">
                        {item.finish || item.tag || item.category}
                      </p>
                    </div>
                    <span className="text-xs text-[#8A7F73] tabular-nums shrink-0 pt-1">
                      0{idx + 1}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {/* Mobile Dot Pagination */}
        <div
          className="lg:hidden mt-5 px-5 flex items-center justify-center gap-1"
          role="tablist"
          aria-label="Gallery slide pagination"
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View slide ${idx + 1}: ${item.title}`}
                onClick={() => scrollToSlide(idx)}
                className="min-w-[24px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-5 bg-[#E6C98B]' : 'w-1.5 bg-[#E6C98B]/35'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Keyboard & Swipe Lightbox (Swipe Down to Close, Pinch-Friendly) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0E0C0A]/96 lg:bg-[#0E0C0A]/94 lg:backdrop-blur-xl flex flex-col justify-between p-5 sm:p-8 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
            onClick={closeLightbox}
          >
            <div
              className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#E6C98B]">
                  {activeItem.category}
                </p>
                <h3 className="font-display text-xl sm:text-3xl font-medium text-[#FBF8F3] line-clamp-2">
                  {activeItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close fullscreen gallery"
                className="w-11 h-11 rounded-[4px] border border-[#E6C98B]/40 text-[#FBF8F3] hover:bg-[#B8733B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              drag={prefersReducedMotion ? false : true}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.22}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 flex items-center justify-center my-3 overflow-hidden touch-pinch-zoom cursor-grab active:cursor-grabbing"
            >
              <SafeImage
                src={activeItem.image}
                alt={activeItem.imageAlt}
                loading="eager"
                className="max-h-[68svh] lg:max-h-[70vh] w-auto max-w-[92vw] object-contain rounded-[4px] editorial-photo select-none"
              />

              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous design"
                className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-[4px] bg-[#0E0C0A]/85 border border-[#E6C98B]/40 text-[#FBF8F3] hover:bg-[#B8733B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next design"
                className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-[4px] bg-[#0E0C0A]/85 border border-[#E6C98B]/40 text-[#FBF8F3] hover:bg-[#B8733B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            <div
              className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E6C98B]/20 pt-3.5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A7F73] tabular-nums">
                Frame {String((lightboxIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                {String(GALLERY_ITEMS.length).padStart(2, '0')} · Swipe down to close
              </p>

              <button
                type="button"
                onClick={() => {
                  const title = activeItem.title;
                  closeLightbox();
                  onEnquireDesign(title);
                }}
                className="w-full sm:w-auto min-h-[44px] bg-[#B8733B] hover:bg-[#E6C98B] text-[#FBF8F3] hover:text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-[4px] transition-colors cursor-pointer"
              >
                Enquire About This Design
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
