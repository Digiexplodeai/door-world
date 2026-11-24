import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, Phone, Sparkles, X } from 'lucide-react';
import { NAV_LINKS, SITE_DATA } from '../data/site';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { DoorWorldLogo } from './DoorWorldLogo';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface NavbarProps {
  onNavigate: (href: string) => void;
  hasAnnouncement: boolean;
}

export const Navbar: FC<NavbarProps> = ({ onNavigate, hasAnnouncement }) => {
  const { prefersReducedMotion } = useMotionCapabilities();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 40);

    if (mobileMenuOpen) {
      setIsHidden(false);
      return;
    }

    if (latest > 160 && latest > previous + 6) {
      setIsHidden(true);
    } else if (latest < previous - 4 || latest <= 80) {
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
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
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

  const primaryPhone = SITE_DATA.business.contact.primaryPhone;
  const primaryPhoneDisplay = SITE_DATA.business.contact.primaryPhoneDisplay;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: !prefersReducedMotion && isHidden ? '-140%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 z-50 transition-[top,background-color,padding] duration-300 ${
          hasAnnouncement && !isScrolled ? 'top-9' : 'top-0'
        } ${
          isScrolled
            ? 'bg-[#0E0C0A]/95 backdrop-blur-xl border-b border-[#2A241F] py-2.5 shadow-xl'
            : 'bg-[#0E0C0A]/40 backdrop-blur-md border-b border-white/5 py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group min-h-[44px] flex items-center shrink-0 cursor-pointer"
            aria-label="Kumar Kitchen King and Door World Home"
          >
            <DoorWorldLogo variant="header" theme="dark" showSubtitle={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-7 text-[12px] uppercase tracking-[0.18em] font-medium text-[#F7F3EC]"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative py-1 whitespace-nowrap shrink-0 group transition-colors ${
                    isActive ? 'text-[#B8793A] font-bold' : 'text-[#E5DDD0] hover:text-[#B8793A]'
                  }`}
                >
                  <LinkRollText text={item.label} />
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B8793A]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons: Call Now & Get Quote */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:+91${primaryPhone}`}
              className="min-h-[42px] px-4 py-2 rounded-[4px] border border-[#2A241F] hover:border-[#B8793A] bg-[#171412] text-[#F7F3EC] text-xs uppercase tracking-[0.16em] font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#B8793A]" />
              <span className="hidden md:inline">{primaryPhoneDisplay}</span>
              <span className="md:hidden">Call</span>
            </a>

            <MagneticButton
              onClick={() => onNavigate('#contact')}
              className="min-h-[42px] px-5 py-2.5 rounded-[4px] bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md whitespace-nowrap"
            >
              <LinkRollText text="Get a Quote" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="xl:hidden w-11 h-11 rounded-[4px] bg-[#171412] border border-[#2A241F] text-[#FBF8F3] flex items-center justify-center cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5 text-[#B8793A]" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0E0C0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10"
          >
            <div className="flex items-center justify-between border-b border-[#2A241F] pb-4">
              <DoorWorldLogo variant="compact" showSubtitle={true} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-10 h-10 rounded-full bg-[#171412] border border-[#2A241F] text-[#FBF8F3] flex items-center justify-center hover:bg-[#B8793A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="my-auto py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-baseline justify-between text-2xl font-bold text-[#FBF8F3] hover:text-[#B8793A] transition-colors py-1"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-[#B8793A]">
                      {link.numeral}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            <div className="space-y-3 pt-4 border-t border-[#2A241F]">
              <a
                href={`tel:+91${primaryPhone}`}
                className="w-full min-h-[48px] rounded-[4px] bg-[#171412] border border-[#2A241F] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B8793A]" />
                <span>Direct Call: {primaryPhoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('#contact');
                }}
                className="w-full min-h-[48px] rounded-[4px] bg-[#B8793A] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center"
              >
                Get Free Project Quote →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
