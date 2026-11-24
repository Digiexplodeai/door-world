import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { COLLECTION_CATEGORIES } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';
import { LinkRollText } from './MagneticButton';
import { SafeImage } from './SafeImage';

interface DoorPanelCollectionsProps {
  onEnquireCategory: (categoryTitle: string) => void;
}

export function DoorPanelCollections({ onEnquireCategory }: DoorPanelCollectionsProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [hoveredId, setHoveredId] = useState<string | null>(COLLECTION_CATEGORIES[0].id);
  const [mobileOpenId, setMobileOpenId] = useState<string>(COLLECTION_CATEGORIES[0].id);

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="pt-12 pb-16 lg:py-36 bg-[#FBF8F3] text-[#0E0C0A]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Asymmetric 12-Col Editorial Header (Section Numeral 01 separated cleanly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-8 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-semibold text-stroke-teak opacity-65 block"
            >
              01
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8733B] font-semibold mb-2.5 lg:mb-3">
              Architectural Catalogue
            </p>
            <h2
              id="collections-heading"
              className="type-h2 font-semibold text-[#0E0C0A]"
            >
              Six Timber
              <span className="block italic font-normal text-[#B8733B]">Collections</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-1">
            <p className="type-body text-[#8A7F73]">
              Explore finishes, structural specs, and request direct wholesale rates from our Mohali Master Gallery.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-[#B8733B]/25 mb-6 lg:mb-10" aria-hidden="true" />

        {/* DESKTOP: 6 Full-Height Expanding Door Panels Side-by-Side (unchanged) */}
        <div
          className="hidden lg:flex h-[82vh] min-h-[580px] max-h-[820px] gap-2"
          onMouseLeave={() => setHoveredId(COLLECTION_CATEGORIES[0].id)}
        >
          {COLLECTION_CATEGORIES.map((category) => {
            const isExpanded = hoveredId === category.id;
            return (
              <article
                key={category.id}
                onMouseEnter={() => setHoveredId(category.id)}
                data-cursor="explore"
                style={{
                  flexGrow: isExpanded ? 3.8 : 0.75,
                  flexBasis: 0,
                  transition: 'flex-grow 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative h-full overflow-hidden rounded-[4px] bg-[#1C1511] border border-[#E6C98B]/25 cursor-pointer group"
              >
                {/* Door Photography */}
                <SafeImage
                  src={category.image}
                  alt={category.imageAlt}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={`absolute inset-0 w-full h-full object-cover editorial-photo transition-all duration-700 ${
                    isExpanded ? 'scale-100 opacity-100' : 'scale-110 opacity-45 grayscale-[30%]'
                  }`}
                />
                <div aria-hidden="true" className="absolute inset-0 film-grain-overlay" />

                {/* Dynamic Scrim */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-[#0E0C0A]/92 via-[#0E0C0A]/30 to-[#0E0C0A]/25 opacity-100'
                      : 'bg-[#0E0C0A]/60 opacity-100'
                  }`}
                />

                {/* Top Outlined Numeral */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <span
                    className={`type-section-num font-semibold transition-colors duration-300 tabular-nums ${
                      isExpanded ? 'text-[#E6C98B]' : 'text-stroke-gold opacity-75'
                    }`}
                  >
                    {category.numeral}
                  </span>
                  <span
                    className={`type-eyebrow text-[#E6C98B] transition-opacity duration-300 ${
                      isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {category.woodSpec}
                  </span>
                </div>

                {/* Collapsed Vertical Title */}
                <div
                  className={`absolute inset-x-0 bottom-8 flex justify-center pointer-events-none transition-opacity duration-300 ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <p
                    style={{ writingMode: 'vertical-rl' }}
                    className="rotate-180 font-display text-lg tracking-wide text-[#F1E8DA] whitespace-nowrap"
                  >
                    {category.title}
                  </p>
                </div>

                {/* Expanded Editorial Details */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-8 z-10 transition-all duration-500 ${
                    isExpanded
                      ? 'opacity-100 translate-y-0 delay-100'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <h3 className="type-h3 font-semibold text-[#FBF8F3] mb-3">
                    {category.title}
                  </h3>
                  <p className="type-body text-[#F1E8DA]/85 mb-6">
                    {category.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onEnquireCategory(category.title)}
                    className="inline-flex items-center gap-2.5 type-eyebrow font-semibold text-[#E6C98B] hover:text-[#FBF8F3] border-b border-[#E6C98B]/60 pb-1.5 transition-colors cursor-pointer"
                  >
                    <LinkRollText text="Enquire" />
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* MOBILE / TABLET: Numbered Accordion with 56x56 Thumbnail, Animated Gold Line & Smooth 4:5 Expand */}
        <div className="lg:hidden divide-y divide-[#B8733B]/20 border-b border-[#B8733B]/20">
          {COLLECTION_CATEGORIES.map((category) => {
            const isOpen = mobileOpenId === category.id;
            return (
              <div key={category.id} className="relative py-3.5">
                {/* Animated Gold Accent Line on Active Row */}
                <motion.div
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="origin-left absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8733B] via-[#E6C98B] to-[#B8733B]"
                />

                <button
                  type="button"
                  onClick={() => setMobileOpenId(isOpen ? '' : category.id)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[56px] flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* 56x56 Thumbnail on Left */}
                    <div className="w-14 h-14 rounded-[4px] overflow-hidden bg-[#1C1511] border border-[#B8733B]/30 shrink-0">
                      <SafeImage
                        src={category.image}
                        alt=""
                        loading="lazy"
                        sizes="56px"
                        className="w-full h-full object-cover editorial-photo"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-[#B8733B] font-semibold tabular-nums">
                        {category.numeral} · {category.woodSpec}
                      </span>
                      <span className="type-h3 font-medium text-[#0E0C0A] block truncate">
                        {category.title}
                      </span>
                    </div>
                  </div>
                  <span className="w-11 h-11 rounded-[4px] border border-[#B8733B]/35 flex items-center justify-center text-[#0E0C0A] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, height: 'auto' }
                          : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0, height: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-4">
                        <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden bg-[#1C1511]">
                          <SafeImage
                            src={category.image}
                            alt={category.imageAlt}
                            loading="lazy"
                            sizes="(max-width: 767px) 92vw, 720px"
                            className="w-full h-full object-cover editorial-photo"
                          />
                        </div>
                        <p className="type-body text-[#1C1511]/85">
                          {category.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => onEnquireCategory(category.title)}
                          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#B8733B] text-[#FBF8F3] type-eyebrow font-semibold px-5 py-3 rounded-[4px] cursor-pointer"
                        >
                          <span>Enquire</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
