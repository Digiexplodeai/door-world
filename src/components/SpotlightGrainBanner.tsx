import { MouseEvent, useEffect, useRef } from 'react';
import { SPOTLIGHT_WOOD_IMAGE } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { SafeImage } from './SafeImage';

export function SpotlightGrainBanner() {
  const { prefersReducedMotion, isDesktopPointer } = useMotionCapabilities();
  const containerRef = useRef<HTMLElement>(null);
  const revealedLayerRef = useRef<HTMLDivElement>(null);

  // Auto-drifting spotlight on mobile / touch devices
  useEffect(() => {
    if (prefersReducedMotion || isDesktopPointer) return;

    let rafId = 0;
    const start = performance.now();

    const drift = (now: number) => {
      const t = (now - start) * 0.00075;
      const xPct = 50 + Math.sin(t) * 28;
      const yPct = 50 + Math.cos(t * 1.3) * 20;

      if (revealedLayerRef.current) {
        const mask = `radial-gradient(circle 180px at ${xPct}% ${yPct}%, black 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`;
        revealedLayerRef.current.style.maskImage = mask;
        revealedLayerRef.current.style.webkitMaskImage = mask;
      }

      rafId = window.requestAnimationFrame(drift);
    };

    rafId = window.requestAnimationFrame(drift);
    return () => window.cancelAnimationFrame(rafId);
  }, [prefersReducedMotion, isDesktopPointer]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !isDesktopPointer || !containerRef.current || !revealedLayerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mask = `radial-gradient(circle 230px at ${x}px ${y}px, black 0%, rgba(0,0,0,0.48) 55%, transparent 100%)`;
    revealedLayerRef.current.style.maskImage = mask;
    revealedLayerRef.current.style.webkitMaskImage = mask;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Timber Material Craftsmanship"
      className="relative min-h-[60svh] lg:min-h-[480px] bg-[#0E0C0A] text-[#FBF8F3] overflow-hidden flex items-center justify-center border-y border-[#E6C98B]/20"
    >
      {/* Dimmed Base Macro Timber Layer */}
      <SafeImage
        src={SPOTLIGHT_WOOD_IMAGE.src}
        alt={SPOTLIGHT_WOOD_IMAGE.alt}
        loading="lazy"
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover opacity-15 editorial-photo"
      />

      {/* Spotlight-Revealed Rich Grain Layer */}
      <div
        ref={revealedLayerRef}
        style={{
          maskImage:
            'radial-gradient(circle 220px at 50% 50%, black 0%, rgba(0,0,0,0.45) 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle 220px at 50% 50%, black 0%, rgba(0,0,0,0.45) 55%, transparent 100%)',
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <SafeImage
          src={SPOTLIGHT_WOOD_IMAGE.src}
          alt=""
          loading="lazy"
          sizes="100vw"
          className="w-full h-full object-cover brightness-110 contrast-110 saturate-125"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#E6C98B]/15 mix-blend-overlay"
        />
      </div>

      <div aria-hidden="true" className="hidden lg:block absolute inset-0 film-grain-overlay" />

      {/* Centered Editorial Typography (90vw max width on mobile) */}
      <div className="relative z-10 w-full max-w-[90vw] lg:max-w-4xl mx-auto px-5 md:px-8 text-center py-12 lg:py-16 pointer-events-none">
        <p className="type-eyebrow text-[#E6C98B] font-semibold mb-4">
          Material Integrity
        </p>
        <h2 className="type-h2 font-semibold text-[#FBF8F3] mb-4 drop-shadow-[0_4px_20px_rgba(14,12,10,0.85)]">
          Feel the grain.{' '}
          <span className="italic font-normal text-[#E6C98B]">Trust the timber.</span>
        </h2>
        <p className="type-body text-[#F1E8DA]/90 mx-auto">
          Seasoned Teak, Sal, Sagwan &amp; Walnut
        </p>
      </div>
    </section>
  );
}
