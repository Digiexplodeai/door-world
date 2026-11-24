import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, BUSINESS_INFO } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

export function FloatingActions() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [scrollingDownFast, setScrollingDownFast] = useState(false);
  const [blockedSectionVisible, setBlockedSectionVisible] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const visibleIdsRef = useRef<Set<string>>(new Set());

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroEl = document.getElementById('home');
    const heroThreshold = heroEl ? Math.max(380, heroEl.offsetHeight * 0.72) : 480;
    setPastHero(latest > heroThreshold);

    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    if (delta > 6) {
      setScrollingDownFast(true);
    } else if (delta < -2) {
      setScrollingDownFast(false);
    }

    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      setScrollingDownFast(false);
    }, 1000);
  });

  useEffect(() => {
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const targetIds = [
      'footer-visibility-sentinel',
      'site-footer',
      'contact',
      'wholesale-banner',
      'showroom-cta-banner',
    ];
    const elements = targetIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibleSet = visibleIdsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        });
        setBlockedSectionVisible(visibleSet.size > 0);
      },
      { threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showMobileBar = pastHero && !blockedSectionVisible && !scrollingDownFast;

  const quickWhatsAppHref = buildWhatsAppUrl(
    `Hello Kumar Kitchen King & Door World, I am enquiring about modular kitchens, doors, and turnkey interior solutions.`
  );

  return (
    <>
      {/* Desktop / Tablet: 52px Circular WhatsApp Button with Pulse Ring (unchanged) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        {!prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#1B5C4F]/60 animate-ping pointer-events-none"
            style={{ animationDuration: '2.8s' }}
          />
        )}
        <a
          href={quickWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Door World on WhatsApp"
          className="relative w-[52px] h-[52px] rounded-full bg-[#0F3B33] hover:bg-[#1B5C4F] text-[#E6C98B] border border-[#E6C98B]/55 shadow-[0_10px_28px_rgba(14,12,10,0.45)] flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>

      {/* Mobile Only (Banner #7): Slim 56px Smart Bottom Action Bar */}
      <motion.div
        role="region"
        aria-label="Mobile Wholesale Quote and Quick Contact"
        initial={{ y: 84, opacity: 0 }}
        animate={{ y: showMobileBar ? 0 : 84, opacity: showMobileBar ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0E0C0A]/96 border-t border-[#E6C98B]/30 px-3 pb-[env(safe-area-inset-bottom)] ${
          showMobileBar ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="h-[56px] flex items-center justify-between gap-2">
          {/* Subtle Shimmer Promo CTA */}
          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden flex-1 min-h-[44px] bg-[#B8733B] text-[#FBF8F3] rounded-[4px] px-3 flex items-center justify-center text-center whitespace-nowrap"
          >
            {!prefersReducedMotion && (
              <span
                aria-hidden="true"
                className="animate-pill-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent"
              />
            )}
            <span className="relative z-10 text-[11px] uppercase tracking-[0.14em] font-semibold">
              Get Kitchen &amp; Door Quote →
            </span>
          </a>

          {/* 44x44px Call & WhatsApp Action Buttons */}
          <a
            href={BUSINESS_INFO.phoneHref}
            aria-label="Call Door World"
            className="w-11 h-11 rounded-[4px] bg-[#1C1511] border border-[#E6C98B]/35 text-[#E6C98B] flex items-center justify-center shrink-0"
          >
            <Phone className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </a>

          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Door World"
            className="w-11 h-11 rounded-[4px] bg-[#0F3B33] border border-[#E6C98B]/40 text-[#E6C98B] flex items-center justify-center shrink-0"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </>
  );
}
