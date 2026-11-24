import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText, MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export function DoorOpeningCtaBanner() {
  const { prefersReducedMotion, isDesktopPointer } = useMotionCapabilities();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const doors = el.querySelectorAll<HTMLElement>('.cta-door-leaf');
      const contentCard = el.querySelector<HTMLElement>('.cta-content-card');

      mm.add('(max-width: 1023px)', () => {
        const mobileDoors = Array.from(doors).slice(0, 2);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 76%',
            once: true,
          },
        });

        tl.fromTo(
          mobileDoors,
          { rotateY: 0 },
          {
            rotateY: (idx) => (idx % 2 === 0 ? -76 : 76),
            duration: 1.0,
            stagger: 0.12,
            ease: 'power3.inOut',
          }
        );

        if (contentCard) {
          tl.fromTo(
            contentCard,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            0.55
          );
        }
      });

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          doors,
          { rotateY: 0 },
          {
            rotateY: (idx) => (idx % 2 === 0 ? -74 : 74),
            duration: 1.05,
            stagger: 0.14,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 72%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="showroom-cta-banner"
      ref={sectionRef}
      aria-labelledby="showroom-cta-heading"
      className="relative min-h-[70svh] lg:min-h-0 flex items-center justify-center py-14 lg:py-36 bg-[#1C1511] text-[#FBF8F3] overflow-hidden border-t border-[#E6C98B]/25"
    >
      {/* Warm Interior Light Revealed Behind Doors */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(230,201,139,0.28),rgba(14,12,10,0.94)_74%)] pointer-events-none"
      />

      {/* Row of Wooden Doors (2 Full-Height Doors on Mobile, 4 on Desktop) */}
      <div
        aria-hidden="true"
        style={{ perspective: '1600px' }}
        className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4 p-0 lg:p-6 pointer-events-auto"
      >
        {[0, 1, 2, 3].map((doorIdx) => {
          const isLeftHinged = doorIdx % 2 === 0;
          return (
            <div
              key={doorIdx}
              style={{ perspective: '1400px' }}
              className={`relative h-full border border-[#E6C98B]/20 group/door ${
                doorIdx >= 2 ? 'hidden lg:block' : 'block'
              }`}
              onMouseEnter={
                isDesktopPointer && !prefersReducedMotion
                  ? (e) => {
                      const inner = e.currentTarget.querySelector<HTMLElement>('.cta-door-hover');
                      if (inner) {
                        gsap.to(inner, {
                          rotateY: isLeftHinged ? -10 : 10,
                          duration: 0.45,
                          ease: 'power2.out',
                        });
                      }
                    }
                  : undefined
              }
              onMouseLeave={
                isDesktopPointer && !prefersReducedMotion
                  ? (e) => {
                      const inner = e.currentTarget.querySelector<HTMLElement>('.cta-door-hover');
                      if (inner) {
                        gsap.to(inner, {
                          rotateY: 0,
                          duration: 0.45,
                          ease: 'power2.out',
                        });
                      }
                    }
                  : undefined
              }
            >
              <div
                style={{
                  transformOrigin: isLeftHinged ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  transform: prefersReducedMotion
                    ? `rotateY(${isLeftHinged ? -62 : 62}deg)`
                    : undefined,
                }}
                className="cta-door-leaf w-full h-full"
              >
                <div
                  style={{
                    transformOrigin: isLeftHinged ? 'left center' : 'right center',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`cta-door-hover w-full h-full wood-leaf-texture border border-[#E6C98B]/40 flex items-center ${
                    isLeftHinged ? 'justify-end pr-3 sm:pr-4' : 'justify-start pl-3 sm:pl-4'
                  }`}
                >
                  <div className="w-[3px] h-24 bg-[#E6C98B]/90 shadow-[0_0_12px_rgba(230,201,139,0.45)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered Showroom Invitation */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-5 md:px-8 text-center pointer-events-none">
        <div
          style={prefersReducedMotion ? undefined : undefined}
          className="cta-content-card bg-gradient-to-b from-[#0E0C0A]/92 via-[#0E0C0A]/84 to-[#0E0C0A]/92 lg:bg-[#0E0C0A]/78 lg:backdrop-blur-md border border-[#E6C98B]/35 rounded-[4px] p-6 sm:p-10 lg:p-12 pointer-events-auto shadow-2xl"
        >
          <p className="type-eyebrow text-[#E6C98B] font-semibold mb-3">
            {BUSINESS_INFO.hours}
          </p>
          <h2
            id="showroom-cta-heading"
            className="type-h2 font-semibold text-[#FBF8F3] mb-3 lg:mb-4"
          >
            Visit Our Showroom in Kharar
          </h2>
          <p className="type-body text-[#F1E8DA]/90 mx-auto mb-6 lg:mb-8">
            {BUSINESS_INFO.address}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <MagneticButton
              href={BUSINESS_INFO.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              wrapperClassName="w-full sm:w-auto inline-block"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#B8733B] hover:bg-[#E6C98B] text-[#FBF8F3] hover:text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 lg:py-4 rounded-[4px] transition-colors whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              <LinkRollText text="Get Directions" />
            </MagneticButton>

            <MagneticButton
              href={BUSINESS_INFO.phoneHref}
              wrapperClassName="w-full sm:w-auto inline-block"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 border border-[#E6C98B]/60 hover:border-[#E6C98B] text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-medium px-6 py-3.5 lg:py-4 rounded-[4px] transition-colors whitespace-nowrap tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#E6C98B]" aria-hidden="true" />
              <LinkRollText text="Call Now" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
