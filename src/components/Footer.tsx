import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO, NAV_LINKS } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate: (href: string) => void;
}

const WORDMARK_LETTERS = 'DOOR WORLD'.split('');

export function Footer({ onNavigate }: FooterProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordmarkEl = wordmarkRef.current;
    if (!wordmarkEl || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const letters = wordmarkEl.querySelectorAll<HTMLElement>('.footer-letter');
      const triggerEl = document.getElementById('main-content') ?? wordmarkEl;

      gsap.fromTo(
        letters,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'bottom 95%',
            once: true,
          },
        }
      );
    }, wordmarkRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="lg:sticky lg:bottom-0 z-0 bg-[#0E0C0A] text-[#F1E8DA] pt-14 lg:pt-20 pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-8 border-t border-[#E6C98B]/20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[5vw]">
        {/* Clean Single-Column Mobile / 3-Column Desktop Editorial Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pb-10 lg:pb-14 border-b border-[#E6C98B]/15">
          {/* Col 1: Showroom Address (Tappable Google Maps link) */}
          <div>
            <p className="type-eyebrow text-[#E6C98B] font-semibold mb-2.5 lg:mb-3">
              Showroom
            </p>
            <a
              href={BUSINESS_INFO.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="type-body text-[#F1E8DA]/90 hover:text-[#E6C98B] transition-colors max-w-xs block min-h-[44px] py-1 underline decoration-[#E6C98B]/30 underline-offset-4 lg:no-underline"
            >
              {BUSINESS_INFO.address}
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="type-eyebrow text-[#E6C98B] font-semibold mb-2.5 lg:mb-3">
              Index
            </p>
            <ul className="grid grid-cols-2 gap-y-1 lg:gap-y-2 gap-x-6 type-eyebrow">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }}
                    className="text-[#8A7F73] hover:text-[#E6C98B] transition-colors inline-flex items-center min-h-[44px] lg:min-h-0"
                  >
                    <LinkRollText text={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Desk & Hours */}
          <div>
            <p className="type-eyebrow text-[#E6C98B] font-semibold mb-2.5 lg:mb-3">
              Direct Desk
            </p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="type-h3 text-[#FBF8F3] hover:text-[#E6C98B] transition-colors tabular-nums inline-flex items-center min-h-[44px] lg:min-h-0 lg:block mb-1.5"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <p className="text-xs text-[#8A7F73]">
              {BUSINESS_INFO.contactPerson} · {BUSINESS_INFO.hours}
            </p>
            <p className="text-xs text-[#E6C98B]/80 mt-2 tabular-nums">
              {BUSINESS_INFO.googleRating} ★ · {BUSINESS_INFO.reviewCount} Google Reviews
            </p>
          </div>
        </div>

        {/* Wordmark "DOOR WORLD" with 20px mobile / 5vw desktop safe side margins */}
        <div
          ref={wordmarkRef}
          className="pt-6 lg:pt-8 pb-3 lg:pb-4 select-none overflow-hidden"
          aria-label="Door World"
        >
          <p className="type-footer-wordmark font-semibold text-[#FBF8F3] text-center whitespace-nowrap">
            {WORDMARK_LETTERS.map((char, idx) => (
              <span
                key={`${char}-${idx}`}
                className="inline-block overflow-hidden"
              >
                <span className="footer-letter inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 type-eyebrow text-[#8A7F73] text-center sm:text-left">
          <p>&copy; {currentYear} {BUSINESS_INFO.name}, Kharar</p>
          <p>Wooden Doors &amp; Architectural Hardware</p>
        </div>
      </div>
    </footer>
  );
}
