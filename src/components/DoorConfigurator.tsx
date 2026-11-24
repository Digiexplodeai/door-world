import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  BUSINESS_INFO,
  DOOR_SIZES,
  DOOR_STYLES,
  WOOD_FINISHES,
} from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText, MagneticButton } from './MagneticButton';
import { SafeImage } from './SafeImage';

export function DoorConfigurator() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [selectedFinish, setSelectedFinish] = useState(WOOD_FINISHES[0]);
  const [selectedStyle, setSelectedStyle] = useState(DOOR_STYLES[0]);
  const [selectedSize, setSelectedSize] = useState(DOOR_SIZES[0]);

  const quoteHref = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.contactPerson}, I configured a door on Door World:\n• Wood Finish: ${selectedFinish.name}\n• Door Style: ${selectedStyle.name}\n• Size: ${selectedSize.name} (${selectedSize.dimensions})\nPlease share wholesale pricing and availability.`
  );

  return (
    <section
      id="configurator"
      aria-labelledby="configurator-heading"
      className="pt-12 pb-16 lg:py-44 bg-[#0F3B33] text-[#FBF8F3] relative overflow-hidden"
    >
      {/* Subtle Emerald ambient light gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(27,92,79,0.75),transparent_55%)] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-10 items-end mb-6 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-semibold text-stroke-gold opacity-65 block"
            >
              02
            </span>
          </div>

          <div className="lg:col-span-10">
            <p className="type-eyebrow text-[#E6C98B] font-semibold mb-2 lg:mb-3">
              Interactive Specification Studio
            </p>
            <h2
              id="configurator-heading"
              className="type-h2 font-semibold text-[#FBF8F3]"
            >
              Configure Your{' '}
              <span className="italic font-normal text-[#E6C98B]">Door</span>
            </h2>
          </div>
        </div>

        <div className="h-px w-full bg-[#E6C98B]/25 mb-6 lg:mb-16" aria-hidden="true" />

        {/* 12-Column Asymmetric Configurator Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* LEFT: Live Preview Frame (55svh max on mobile, 3:4 on desktop) */}
          <div className="lg:col-span-6">
            <div
              data-cursor="view"
              className="relative h-[52svh] max-h-[55svh] lg:h-auto lg:aspect-[3/4] lg:max-h-[680px] w-full overflow-hidden rounded-[4px] bg-[#0E0C0A] border border-[#E6C98B]/30"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStyle.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={selectedStyle.image}
                    alt={`${selectedFinish.name} finish ${selectedStyle.imageAlt}`}
                    loading="lazy"
                    sizes="(max-width: 1024px) 92vw, 48vw"
                    className="w-full h-full object-cover transition-[filter] duration-500 ease-out"
                  />
                  {/* Live Wood Finish Color Grade & Glaze */}
                  <div
                    aria-hidden="true"
                    style={{
                      backgroundColor: selectedFinish.tintOverlay,
                      mixBlendMode: 'multiply',
                    }}
                    className="absolute inset-0 transition-colors duration-500 pointer-events-none"
                  />
                  <div
                    aria-hidden="true"
                    style={{ backdropFilter: selectedFinish.filterCss }}
                    className="hidden lg:block absolute inset-0 transition-[backdrop-filter] duration-500 pointer-events-none opacity-45"
                  />
                </motion.div>
              </AnimatePresence>

              <div aria-hidden="true" className="hidden lg:block absolute inset-0 film-grain-overlay" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/85 via-transparent to-transparent"
              />

              {/* Live Preview Spec Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="type-eyebrow text-[#E6C98B] mb-1">
                    {selectedFinish.name} · {selectedStyle.name}
                  </p>
                  <p className="type-h3 text-[#FBF8F3] line-clamp-2">
                    {selectedStyle.tagline}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#F1E8DA] border border-[#E6C98B]/40 px-2.5 py-1.5 rounded-[4px] whitespace-nowrap shrink-0">
                  {selectedSize.name}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Selectable Options & Live Summary */}
          <div className="lg:col-span-6 space-y-7 lg:space-y-10">
            {/* 1. Wood Finish Swatches */}
            <div className="pb-6 lg:pb-8 border-b border-[#E6C98B]/20">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#E6C98B] font-semibold">
                  01 · Wood Finish
                </p>
                <span className="text-sm text-[#F1E8DA] font-medium">
                  {selectedFinish.name}
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Select wood finish"
                className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-3"
              >
                {WOOD_FINISHES.map((finish) => {
                  const isActive = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      aria-label={`${finish.name} wood finish`}
                      onClick={() => setSelectedFinish(finish)}
                      className="group min-w-[44px] min-h-[44px] flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <span
                        style={{ backgroundColor: finish.swatchHex }}
                        className={`w-11 h-11 rounded-full transition-transform duration-200 border ${
                          isActive
                            ? 'ring-2 ring-[#E6C98B] ring-offset-2 lg:ring-offset-4 ring-offset-[#0F3B33] scale-105 border-white/40'
                            : 'border-white/20 lg:group-hover:scale-105'
                        }`}
                      />
                      <span
                        className={`text-[11px] tracking-wider uppercase ${
                          isActive ? 'text-[#E6C98B] font-semibold' : 'text-[#F1E8DA]/75'
                        }`}
                      >
                        {finish.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#F1E8DA]/75">{selectedFinish.gradeNote}</p>
            </div>

            {/* 2. Door Style Chips */}
            <div className="pb-6 lg:pb-8 border-b border-[#E6C98B]/20">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#E6C98B] font-semibold mb-4">
                02 · Architectural Style
              </p>

              <div
                role="radiogroup"
                aria-label="Select door style"
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {DOOR_STYLES.map((style) => {
                  const isActive = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSelectedStyle(style)}
                      className={`min-h-[44px] py-3 px-4 rounded-[4px] text-xs uppercase tracking-[0.18em] font-semibold border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#E6C98B] text-[#0E0C0A] border-[#E6C98B]'
                          : 'bg-transparent text-[#FBF8F3] border-[#E6C98B]/30 hover:border-[#E6C98B]'
                      }`}
                    >
                      {style.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Dimensions (Full-width stacked on mobile) */}
            <div className="pb-6 lg:pb-8 border-b border-[#E6C98B]/20">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#E6C98B] font-semibold mb-4">
                03 · Door Dimensions
              </p>

              <div
                role="radiogroup"
                aria-label="Select door size"
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {DOOR_SIZES.map((size) => {
                  const isActive = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSelectedSize(size)}
                      className={`w-full min-h-[48px] text-left p-4 rounded-[4px] border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#1B5C4F] border-[#E6C98B] text-[#FBF8F3]'
                          : 'bg-transparent border-[#E6C98B]/30 text-[#F1E8DA] hover:border-[#E6C98B]'
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#E6C98B] mb-1">
                        {size.name}
                      </span>
                      <span className="block text-xs text-[#F1E8DA]/85">
                        {size.dimensions}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Configuration Summary & WhatsApp Quote CTA */}
            <div className="pt-1 space-y-5 lg:space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-xs border border-[#E6C98B]/25 bg-[#0E0C0A]/30 p-4 sm:p-5 rounded-[4px]">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E6C98B] mb-1">
                    Finish
                  </span>
                  <span className="font-medium text-[#FBF8F3]">{selectedFinish.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E6C98B] mb-1">
                    Style
                  </span>
                  <span className="font-medium text-[#FBF8F3]">{selectedStyle.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E6C98B] mb-1">
                    Sizing
                  </span>
                  <span className="font-medium text-[#FBF8F3]">{selectedSize.name}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <MagneticButton
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  wrapperClassName="w-full sm:w-auto inline-block"
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 bg-[#B8733B] hover:bg-[#E6C98B] text-[#FBF8F3] hover:text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-semibold px-7 py-4 rounded-[4px] transition-colors duration-200 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <LinkRollText text="Get Quote on WhatsApp" />
                </MagneticButton>
                <p className="text-xs text-[#F1E8DA]/80 leading-relaxed">
                  Direct wholesale quote from {BUSINESS_INFO.contactPerson} ({BUSINESS_INFO.phoneDisplay})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
