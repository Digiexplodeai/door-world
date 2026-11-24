import { FC } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_DATA } from '../data/site';
import { SITE_IMAGES } from '../data/images';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface HeroProps {
  onExploreClick?: () => void;
  onQuoteClick?: () => void;
}

export const Hero: FC<HeroProps> = ({ onExploreClick, onQuoteClick }) => {
  const { contact } = SITE_DATA.business;

  return (
    <section
      id="home"
      aria-label="Kumar Kitchen King and Door World Entrance"
      className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#0E0C0A] text-[#FBF8F3] pt-28 pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Background Architectural Image (Immediate Load, Crisp Quality, Zero Black State) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-[#120D09]">
        <img
          src={SITE_IMAGES.hero.background}
          alt="Radial carved wood entrance door by Door World"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />

        {/* Dark Gradient Scrim (55-70% black, stronger behind text on the left) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#0E0C0A]/60 bg-gradient-to-r from-[#0E0C0A]/90 via-[#0E0C0A]/70 to-[#0E0C0A]/45"
        />
        {/* Subtle Top & Bottom Architectural Blending Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0E0C0A]/95 via-[#0E0C0A]/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0E0C0A] via-[#0E0C0A]/60 to-transparent"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 flex flex-col justify-between">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-md border border-[#B8793A]/40 text-[#B8793A] type-eyebrow font-bold uppercase tracking-[0.2em] w-fit mb-6 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#B8793A] animate-pulse" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs">Kumar Kitchen King · Sector 82, JLPL Mohali &amp; Yamuna Nagar</span>
        </motion.div>

        {/* Main Editorial Headline */}
        <div className="max-w-2xl lg:max-w-3xl py-2">
          <h1 className="font-sans text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-black text-[#FBF8F3] leading-[1.04] tracking-tight mb-4 drop-shadow-[0_4px_24px_rgba(14,12,10,0.95)]">
            <span className="block">The Complete</span>
            <span className="block text-[#B8793A] italic font-serif">Interior Solution.</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-[#F7F3EC] font-sans font-semibold mb-3 drop-shadow-[0_2px_12px_rgba(14,12,10,0.9)]">
            Custom Modular Kitchens, Architectural Doors &amp; Interiors
          </p>

          <p className="text-sm sm:text-base md:text-lg text-[#E8DFC8] font-sans font-medium leading-relaxed max-w-xl mb-6 drop-shadow-[0_2px_10px_rgba(14,12,10,0.95)]">
            Factory-manufactured European modular kitchens, solid teak entrance doors, and turnkey luxury interior joinery. 100% factory built with zero on-site carpentry work.
          </p>

          {/* Trust Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-sm border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC] flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8793A]" />
              Factory Built
            </span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-sm border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC] flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#B8793A]" />
              No Carpentry at Site
            </span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-sm border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC] shadow-md">
              ISI Certified
            </span>
            <span className="px-3 py-1.5 rounded-[4px] bg-[#0E0C0A]/85 backdrop-blur-sm border border-[#B8793A]/40 text-[11px] font-bold uppercase tracking-wider text-[#F7F3EC] shadow-md">
              Custom CAD Designs
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="min-h-[50px] inline-flex items-center justify-center gap-3 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-[4px] shadow-lg shadow-[#B8793A]/25 transition-all cursor-pointer"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4 text-[#0E0C0A]" aria-hidden="true" />
            </Link>

            <Link
              to="/kitchens"
              className="min-h-[50px] inline-flex items-center justify-center gap-3 border border-[#B8793A]/50 hover:border-[#B8793A] bg-[#171412]/80 hover:bg-[#171412] backdrop-blur-md text-[#FBF8F3] hover:text-[#B8793A] text-xs uppercase tracking-[0.2em] font-bold px-7 py-4 rounded-[4px] transition-all cursor-pointer"
            >
              <span>Explore Kitchens</span>
            </Link>

            <Link
              to="/doors"
              className="min-h-[50px] inline-flex items-center justify-center gap-3 border border-[#2A241F] hover:border-[#B8793A] bg-[#0E0C0A]/70 hover:bg-[#0E0C0A] text-[#E8DFC8] hover:text-[#FBF8F3] text-xs uppercase tracking-[0.2em] font-bold px-7 py-4 rounded-[4px] transition-all cursor-pointer"
            >
              <span>Explore Doors</span>
            </Link>

            <a
              href={`tel:+91${contact.primaryPhone}`}
              className="min-h-[50px] hidden xl:inline-flex items-center justify-center gap-2.5 text-[#E8DFC8] hover:text-[#B8793A] text-xs uppercase tracking-[0.18em] font-semibold px-4 py-4 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B8793A]" />
              <span>Call: {contact.primaryPhoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Bottom Architectural Specs Strip */}
        <div className="w-full pt-8 mt-12 border-t border-[#B8793A]/25 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <p className="type-eyebrow text-[#B8793A] font-bold text-[10px] sm:text-xs">Yamuna Nagar Plant</p>
              <p className="text-[11px] sm:text-xs text-[#D4C9B8]">100% Factory Built · CNC Precision</p>
            </div>
            <div className="w-px h-6 bg-[#2A241F]" />
            <div>
              <p className="type-eyebrow text-[#B8793A] font-bold text-[10px] sm:text-xs">Sector 82, JLPL Mohali</p>
              <p className="text-[11px] sm:text-xs text-[#D4C9B8]">Master Gallery &amp; Showroom</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#B8793A] font-mono text-[11px] uppercase tracking-wider">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '18s' }} />
            <span>Visit Mohali Showroom · Mon - Sat</span>
          </div>
        </div>
      </div>
    </section>
  );
};
