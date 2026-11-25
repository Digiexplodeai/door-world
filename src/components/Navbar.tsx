import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, Phone, X, Sparkles } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, SITE_DATA } from '../data/site';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { DoorWorldLogo } from './DoorWorldLogo';
import { LinkRollText } from './MagneticButton';

interface NavbarProps {
  hasAnnouncement: boolean;
}

export const Navbar: FC<NavbarProps> = ({ hasAnnouncement }) => {
  const { prefersReducedMotion } = useMotionCapabilities();
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 30);

    if (mobileMenuOpen) {
      setIsHidden(false);
      return;
    }

    if (latest > 160 && latest > previous + 6) {
      setIsHidden(true);
    } else if (latest < previous - 4 || latest <= 60) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const overflowValue = mobileMenuOpen ? 'hidden' : '';
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
            : 'bg-[#0E0C0A]/60 backdrop-blur-md border-b border-white/5 py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group min-h-[44px] flex items-center shrink-0 cursor-pointer"
            aria-label="Kumar Kitchen King and Door World Home"
          >
            <DoorWorldLogo variant="header" theme="dark" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] uppercase tracking-[0.18em] font-medium text-[#F7F3EC]"
          >
            {NAV_LINKS.map((item) => {
              const isItemActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href) ||
                    (item.href === '/kitchen' && location.pathname.startsWith('/kitchens')) ||
                    (item.href === '/contact' && location.pathname.startsWith('/inquiry'));

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 group transition-colors ${
                    isItemActive
                      ? 'text-[#B8793A] font-bold'
                      : 'text-[#E5DDD0] hover:text-[#B8793A]'
                  }`}
                >
                  <LinkRollText text={item.label} />
                  {isItemActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B8793A]"
                    />
                  )}
                </NavLink>
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

            <Link
              to="/contact"
              className="min-h-[42px] px-5 py-2 rounded-[4px] bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold inline-flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0E0C0A]" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[4px] text-[#F7F3EC] hover:text-[#B8793A] bg-[#171412] border border-[#2A241F] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0E0C0A]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="space-y-4">
              <p className="text-[10px] uppercase font-mono font-bold tracking-[0.22em] text-[#B8793A] pb-2 border-b border-[#2A241F]">
                Directory Navigation
              </p>
              <div className="space-y-1">
                {NAV_LINKS.map((item) => {
                  const isItemActive =
                    item.href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.href) ||
                        (item.href === '/kitchen' && location.pathname.startsWith('/kitchens')) ||
                        (item.href === '/contact' && location.pathname.startsWith('/inquiry'));

                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-3 px-3 rounded-[4px] text-base uppercase tracking-[0.14em] font-bold transition-colors ${
                        isItemActive
                          ? 'bg-[#B8793A] text-[#0E0C0A]'
                          : 'text-[#E5DDD0] hover:text-[#B8793A] hover:bg-[#171412]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] font-mono opacity-60">{item.numeral}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#2A241F] space-y-3">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0E0C0A]" />
                <span>Request Custom Quote</span>
              </Link>

              <div className="flex gap-2">
                <a
                  href={`tel:+91${primaryPhone}`}
                  className="flex-1 min-h-[44px] bg-[#171412] border border-[#2A241F] text-[#F7F3EC] text-xs uppercase tracking-[0.14em] font-bold rounded-[4px] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#B8793A]" />
                  <span>{primaryPhoneDisplay}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
