import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { DoorOpen, Menu, Phone, X } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface NavbarProps {
  onNavigate: (href: string) => void;
  hasAnnouncement: boolean;
}

export function Navbar({ onNavigate, hasAnnouncement }: NavbarProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 48);

    if (mobileMenuOpen) {
      setIsHidden(false);
      return;
    }

    if (latest > 160 && latest > previous + 5) {
      setIsHidden(true);
    } else if (latest < previous - 4 || latest <= 90) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.sectionId)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -48% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const overflowValue = mobileMenuOpen ? 'hidden' : '';
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: !prefersReducedMotion && isHidden ? '-140%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 z-50 transition-[top,background-color,padding] duration-300 ${
          hasAnnouncement ? 'top-9' : 'top-0'
        } ${
          isScrolled
            ? 'bg-[#0E0C0A]/95 lg:bg-[#0E0C0A]/78 lg:backdrop-blur-xl border-b border-[#E6C98B]/20 py-2.5 lg:py-3'
            : 'bg-transparent py-3.5 lg:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-2 lg:gap-8">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="inline-flex items-center gap-2 sm:gap-2.5 text-[#FBF8F3] whitespace-nowrap shrink-0 group min-h-[44px]"
            aria-label="Door World Home"
          >
            <DoorOpen
              className="w-5 h-5 text-[#E6C98B] transition-transform duration-300 lg:group-hover:scale-110 shrink-0"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span className="font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
              {BUSINESS_INFO.name}
            </span>
          </a>

          {/* Navigation Links with Link Roll Hover */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-medium text-[#F1E8DA]"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative py-1 whitespace-nowrap shrink-0 group transition-colors ${
                    isActive ? 'text-[#E6C98B]' : 'text-[#F1E8DA] hover:text-[#FBF8F3]'
                  }`}
                >
                  <LinkRollText text={item.label} />
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-line"
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#E6C98B]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Compact 44px Call Icon Button on Mobile/Tablet */}
            <a
              href={BUSINESS_INFO.phoneHref}
              aria-label={`Call Door World (${BUSINESS_INFO.phoneDisplay})`}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[4px] bg-[#B8733B] text-[#FBF8F3] shrink-0"
            >
              <Phone className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </a>

            {/* Full Call Now Button on Desktop */}
            <MagneticButton
              href={BUSINESS_INFO.phoneHref}
              wrapperClassName="hidden lg:inline-block"
              className="inline-flex items-center gap-2 bg-[#B8733B] hover:bg-[#E6C98B] text-[#FBF8F3] hover:text-[#0E0C0A] font-medium text-xs uppercase tracking-[0.16em] px-5 py-2.5 rounded-[4px] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
              <LinkRollText text="Call Now" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[4px] text-[#FBF8F3] border border-[#E6C98B]/25 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Close full-screen menu' : 'Open full-screen menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-fullscreen-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Staggered Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[75] bg-[#0E0C0A] text-[#FBF8F3] flex flex-col justify-between px-5 pt-20 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto lg:hidden"
          >
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-4 right-4 w-11 h-11 rounded-[4px] border border-[#E6C98B]/35 flex items-center justify-center text-[#E6C98B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <nav aria-label="Full-screen Mobile Navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.055, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-[#E6C98B]/15 pb-3"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-baseline justify-between min-h-[44px] py-1 group"
                    >
                      <span className="font-display text-[2rem] leading-tight font-medium text-[#FBF8F3] group-active:text-[#E6C98B] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs tracking-[0.25em] text-[#E6C98B] tabular-nums">
                        {item.numeral}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="pt-5 border-t border-[#E6C98B]/20 text-xs text-[#8A7F73] space-y-2">
              <p className="text-[#E6C98B] uppercase tracking-[0.22em]">
                {BUSINESS_INFO.hours}
              </p>
              <a
                href={BUSINESS_INFO.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#F1E8DA] underline decoration-[#E6C98B]/40 underline-offset-4 py-1"
              >
                {BUSINESS_INFO.address}
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center min-h-[44px] tabular-nums text-sm text-[#E6C98B] font-semibold"
              >
                {BUSINESS_INFO.phoneDisplay} · {BUSINESS_INFO.contactPerson}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
