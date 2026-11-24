import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

const SESSION_KEY = 'doorworld_pass3_preloader_v1';

export function IntroPreloader() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [isDone, setIsDone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDone) return;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, 'true');
      setIsDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          window.sessionStorage.setItem(SESSION_KEY, 'true');
          setIsDone(true);
        },
      });

      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
        .to(
          counterObj,
          {
            val: 100,
            duration: 1.05,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counterObj.val)).padStart(
                  2,
                  '0'
                );
              }
            },
          },
          0.1
        )
        .to(
          [handleRef.current, brandRef.current, counterRef.current?.parentElement],
          {
            opacity: 0,
            duration: 0.28,
            ease: 'power2.out',
          },
          1.12
        )
        .to(
          leftDoorRef.current,
          {
            rotateY: -102,
            duration: 1.0,
            ease: 'power3.inOut',
          },
          1.2
        )
        .to(
          rightDoorRef.current,
          {
            rotateY: 102,
            duration: 1.0,
            ease: 'power3.inOut',
          },
          1.2
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power1.out',
          },
          1.95
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isDone, prefersReducedMotion]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ perspective: '1800px' }}
      className="fixed inset-0 z-[120] flex overflow-hidden pointer-events-none"
    >
      {/* Left Wooden Door Panel (hinged at outer left edge) */}
      <div
        ref={leftDoorRef}
        style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        className="relative w-1/2 h-full wood-leaf-texture border-r border-[#E6C98B]/35 shadow-2xl"
      >
        <div className="absolute inset-6 sm:inset-14 border border-[#E6C98B]/12" />
        <div className="absolute inset-10 sm:inset-20 border border-[#B8733B]/15" />
      </div>

      {/* Right Wooden Door Panel (hinged at outer right edge) */}
      <div
        ref={rightDoorRef}
        style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
        className="relative w-1/2 h-full wood-leaf-texture border-l border-[#E6C98B]/35 shadow-2xl"
      >
        <div className="absolute inset-6 sm:inset-14 border border-[#E6C98B]/12" />
        <div className="absolute inset-10 sm:inset-20 border border-[#B8733B]/15" />
      </div>

      {/* Center Champagne Gold Handle Line */}
      <div
        ref={handleRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 pointer-events-none"
      >
        <div className="w-[2px] h-32 sm:h-44 bg-gradient-to-b from-transparent via-[#E6C98B] to-transparent" />
        <div className="w-[2px] h-32 sm:h-44 bg-gradient-to-b from-transparent via-[#E6C98B] to-transparent" />
      </div>

      {/* Center Brand Mark */}
      <div
        ref={brandRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div className="bg-[#0E0C0A]/70 backdrop-blur-sm border border-[#E6C98B]/30 px-8 py-5 rounded-[4px] text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#E6C98B] mb-2">
            Mohali · Architectural Studio
          </p>
          <p className="font-display text-3xl sm:text-5xl font-semibold text-[#FBF8F3] tracking-tight">
            Door World
          </p>
        </div>
      </div>

      {/* Bottom Counter 00 to 100 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-baseline gap-2 text-[#E6C98B] tabular-nums">
        <span ref={counterRef} className="font-display text-3xl sm:text-4xl font-medium">
          00
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8A7F73]">/ 100</span>
      </div>
    </div>
  );
}
