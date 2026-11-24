import { useEffect, useRef } from 'react';
import { useScroll, useVelocity } from 'motion/react';
import { MARQUEE_ITEMS } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

function DoorHandleSvg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="inline-block text-[#E6C98B] shrink-0"
    >
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M12 9v3" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.5" />
    </svg>
  );
}

function KeyholeSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="inline-block text-[#E6C98B] shrink-0"
    >
      <circle cx="12" cy="10" r="3" />
      <path d="M10.5 12.6L9.5 19h5l-1-6.4" strokeLinejoin="round" />
    </svg>
  );
}

export function TiltedRibbonsBanner() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(false);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(-50);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityRef = useRef(0);

  useEffect(() => {
    return scrollVelocity.on('change', (v) => {
      velocityRef.current = v;
    });
  }, [scrollVelocity]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        isInViewRef.current = Boolean(entries[0]?.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isInViewRef.current && !isHoveredRef.current) {
        const rawVel = velocityRef.current;
        const speedBoost = Math.min(Math.abs(rawVel) * 0.004, 14);
        const skew = Math.max(-5, Math.min(5, rawVel * 0.0025));

        const rate = (3.4 + speedBoost) * dt;
        offset1Ref.current -= rate;
        if (offset1Ref.current <= -50) offset1Ref.current += 50;

        offset2Ref.current += rate;
        if (offset2Ref.current >= 0) offset2Ref.current -= 50;

        if (track1Ref.current) {
          track1Ref.current.style.transform = `translate3d(${offset1Ref.current}%, 0, 0) skewX(${-skew}deg)`;
        }
        if (track2Ref.current) {
          track2Ref.current.style.transform = `translate3d(${offset2Ref.current}%, 0, 0) skewX(${skew}deg)`;
        }
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Door World Specializations"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="relative py-4 md:py-10 lg:py-24 bg-[#0E0C0A] overflow-hidden select-none"
    >
      <div className="relative h-[104px] md:h-[140px] lg:h-[190px] flex items-center justify-center">
        {/* Ribbon 2: Ink with Outlined Ivory text, tilted -2deg mobile / -3deg desktop, scrolling right */}
        <div className="absolute w-[108vw] lg:w-[116vw] -rotate-[2deg] lg:-rotate-[3deg] bg-[#0E0C0A] border-y border-[#E6C98B]/45 py-2 md:py-3 lg:py-4 shadow-xl z-10 overflow-hidden">
          <div ref={track2Ref} className="flex w-max items-center will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy > 0} className="flex items-center shrink-0">
                {MARQUEE_ITEMS.map((item, idx) => (
                  <span
                    key={`${copy}-r2-${item}`}
                    className="inline-flex items-center gap-4 md:gap-6 lg:gap-8 px-3.5 md:px-5 lg:px-7 type-marquee font-semibold text-stroke-ivory whitespace-nowrap"
                  >
                    <span>{item}</span>
                    {idx % 2 === 0 ? <DoorHandleSvg /> : <KeyholeSvg />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Ribbon 1: Champagne Gold with Ink text, tilted +2deg mobile / +3deg desktop, scrolling left */}
        <div className="absolute w-[108vw] lg:w-[116vw] rotate-[2deg] lg:rotate-[3deg] bg-[#E6C98B] text-[#0E0C0A] py-2 md:py-3 lg:py-4 shadow-2xl z-20 overflow-hidden">
          <div ref={track1Ref} className="flex w-max items-center will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy > 0} className="flex items-center shrink-0">
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${copy}-r1-${item}`}
                    className="inline-flex items-center gap-4 md:gap-6 lg:gap-8 px-3.5 md:px-5 lg:px-7 type-marquee font-semibold text-[#0E0C0A] whitespace-nowrap"
                  >
                    <span>{item}</span>
                    <span aria-hidden="true" className="text-[#B8733B] text-base md:text-xl lg:text-2xl">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
