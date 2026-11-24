import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

gsap.registerPlugin(ScrollTrigger);

export function StatsRibbonBanner() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const ribbonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ribbonRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const ratingEl = el.querySelector<HTMLElement>('[data-ribbon-count="rating"]');
      const reviewsEl = el.querySelector<HTMLElement>('[data-ribbon-count="reviews"]');

      if (ratingEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: BUSINESS_INFO.googleRating,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            ratingEl.textContent = `${obj.val.toFixed(1)} ★`;
          },
        });
      }

      if (reviewsEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: BUSINESS_INFO.reviewCount,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            reviewsEl.textContent = `${Math.round(obj.val)}+`;
          },
        });
      }

      const paths = el.querySelectorAll<SVGGeometryElement>('.ribbon-draw-path');
      paths.forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 80;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, ribbonRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ribbonRef}
      aria-label="Door World Showroom Highlights"
      className="bg-[#F1E8DA] text-[#0E0C0A] border-y border-[#B8733B]/30 py-6 lg:py-10"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#B8733B]/35">
          {/* 1. 4.6 ★ Google Rating */}
          <div className="flex items-start sm:items-center gap-3 lg:gap-4 pr-3 pb-4 border-r border-b lg:border-r-0 lg:border-b-0 border-[#B8733B]/25 lg:pr-8 lg:pb-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8733B" strokeWidth="1.5" aria-hidden="true" className="shrink-0 mt-0.5 sm:mt-0 lg:w-7 lg:h-7">
              <path
                className="ribbon-draw-path"
                d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5z"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-[#0E0C0A]">
                <span data-ribbon-count="rating">{BUSINESS_INFO.googleRating.toFixed(1)} ★</span>
              </p>
              <p className="type-eyebrow text-[#8A7F73]">Google Rating</p>
            </div>
          </div>

          {/* 2. 55+ Happy Reviews */}
          <div className="flex items-start sm:items-center gap-3 lg:gap-4 pl-3.5 pb-4 border-b lg:border-b-0 border-[#B8733B]/25 lg:px-8 lg:pb-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8733B" strokeWidth="1.5" aria-hidden="true" className="shrink-0 mt-0.5 sm:mt-0 lg:w-7 lg:h-7">
              <path
                className="ribbon-draw-path"
                d="M4 5.5h16v11H9l-5 4v-15z"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold tabular-nums text-[#0E0C0A]">
                <span data-ribbon-count="reviews">{BUSINESS_INFO.reviewCount}+</span>
              </p>
              <p className="type-eyebrow text-[#8A7F73]">Happy Reviews</p>
            </div>
          </div>

          {/* 3. All Door Types */}
          <div className="flex items-start sm:items-center gap-3 lg:gap-4 pr-3 pt-4 border-r lg:border-r-0 border-[#B8733B]/25 lg:px-8 lg:pt-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8733B" strokeWidth="1.5" aria-hidden="true" className="shrink-0 mt-0.5 sm:mt-0 lg:w-7 lg:h-7">
              <path
                className="ribbon-draw-path"
                d="M6 21V3h12v18M14.5 12h.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold text-[#0E0C0A]">
                All Door Types
              </p>
              <p className="type-eyebrow text-[#8A7F73]">Teak &amp; Flush</p>
            </div>
          </div>

          {/* 4. Direct Wholesale */}
          <div className="flex items-start sm:items-center gap-3 lg:gap-4 pl-3.5 pt-4 lg:pl-8 lg:pt-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8733B" strokeWidth="1.5" aria-hidden="true" className="shrink-0 mt-0.5 sm:mt-0 lg:w-7 lg:h-7">
              <path
                className="ribbon-draw-path"
                d="M7 5h10M7 9.5h10M12 9.5c2.5 0 3.5 1.3 3.5 2.8 0 1.8-1.5 3.2-4.2 3.2H7.5l6.5 4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold text-[#0E0C0A]">
                Direct Wholesale
              </p>
              <p className="type-eyebrow text-[#8A7F73]">Bulk &amp; Retail</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
