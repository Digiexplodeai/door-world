import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, Eye, Sparkles, X } from 'lucide-react';
import {
  KITCHEN_CATALOGUE_ITEMS,
  KITCHEN_CORE_SWATCHES,
  KITCHEN_FEATURE_HIGHLIGHTS,
  KITCHEN_SERIES_INFO,
  KITCHEN_STYLE_CATEGORIES,
  KitchenProductItem,
} from '../data/site';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface ModularKitchensShowcaseProps {
  onEnquireKitchen: (kitchenTitle: string) => void;
}

export const ModularKitchensShowcase: FC<ModularKitchensShowcaseProps> = ({
  onEnquireKitchen,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeSwatch, setActiveSwatch] = useState<string>(KITCHEN_CORE_SWATCHES[0].code);
  const [lightboxItem, setLightboxItem] = useState<KitchenProductItem | null>(null);

  const filteredKitchens = KITCHEN_CATALOGUE_ITEMS.filter((item) => {
    if (selectedStyle === 'all') return true;
    return item.style.toLowerCase().includes(selectedStyle.toLowerCase());
  });

  return (
    <section
      id="kitchens"
      aria-labelledby="kitchens-heading"
      className="py-20 lg:py-40 bg-[#F7F3EC] text-[#0E0C0A] relative"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/30 block"
            >
              02
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              From Kitchen Catalogue · Kumar Kitchen King
            </p>
            <h2 id="kitchens-heading" className="type-h2 font-bold text-[#0E0C0A]">
              Classic European <br />
              <span className="italic font-normal text-[#B8793A]">Designer Series</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#4E443C] leading-relaxed">
              PU lacquer and high-gloss acrylic modular kitchens built with rectangular European cabinetry. Factory-built and professionally managed with zero on-site mess.
            </p>
          </div>
        </div>

        {/* Style Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-[#E6DEC9]">
          <button
            onClick={() => setSelectedStyle('all')}
            className={`px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer ${
              selectedStyle === 'all'
                ? 'bg-[#0E0C0A] text-[#F7F3EC]'
                : 'bg-white/80 text-[#6E6358] hover:text-[#0E0C0A] border border-[#E6DEC9]'
            }`}
          >
            All Kitchen Styles ({KITCHEN_CATALOGUE_ITEMS.length})
          </button>
          {KITCHEN_STYLE_CATEGORIES.map((cat) => {
            const isActive = selectedStyle === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedStyle(cat.id)}
                className={`px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#B8793A] text-[#0E0C0A] font-bold shadow-sm'
                    : 'bg-white/80 text-[#6E6358] hover:text-[#0E0C0A] border border-[#E6DEC9]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Core Colour Swatches & Palette Feature */}
        <div className="mb-14 p-6 sm:p-8 rounded-[8px] bg-white border border-[#E6DEC9] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#B8793A] mb-1">
                Curated Architectural Finishes
              </p>
              <h3 className="text-xl font-bold text-[#0E0C0A]">
                High Reflective White, Pure White &amp; 20 Greiges Palette
              </h3>
              <p className="text-xs text-[#8E8275] mt-1 max-w-xl">
                Balanced between cool grey clarity and warm beige comfort. Specially formulated PU-pigment paints resist yellowing, kitchen steam, and grease stains.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {KITCHEN_CORE_SWATCHES.map((swatch) => {
                const isSelected = activeSwatch === swatch.code;
                return (
                  <button
                    key={swatch.code}
                    onClick={() => setActiveSwatch(swatch.code)}
                    className={`group flex items-center gap-2.5 px-3 py-2 rounded-[6px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0E0C0A] text-[#F7F3EC] border-[#0E0C0A]'
                        : 'bg-[#F7F3EC] text-[#0E0C0A] border-[#E6DEC9] hover:border-[#B8793A]'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: swatch.hex }}
                      className="w-5 h-5 rounded-full border border-black/15 shrink-0 shadow-inner"
                    />
                    <div className="text-left">
                      <p className="text-[11px] font-bold leading-tight">{swatch.name}</p>
                      <p className="text-[9px] opacity-75 font-mono">{swatch.code}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modular Kitchen Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredKitchens.map((item) => (
            <div
              key={item.code}
              className="group bg-white rounded-[8px] border border-[#E6DEC9] hover:border-[#B8793A] overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-[#EFE9DE] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/videos/hero_doors_poster_desktop.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#0E0C0A] px-2 py-1 rounded-[3px]">
                    {item.style}
                  </span>
                </div>

                {/* Quick Lightbox View Button */}
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  aria-label={`View ${item.name} details in full resolution`}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#0E0C0A]/80 hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8793A] mb-1">
                    {item.finish}
                  </p>
                  <h4 className="text-xl font-bold text-[#0E0C0A] mb-2.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#6E6358] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 mb-6">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#4E443C]">
                        <Check className="w-3.5 h-3.5 text-[#B8793A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E6DEC9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onEnquireKitchen(`Modular Kitchen ${item.code} - ${item.name}`)}
                    className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E0C0A] hover:text-[#B8793A] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Kitchen Quote</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8793A]" />
                  </button>
                  <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                    Factory Fitted
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid from Catalogue */}
        <div className="pt-10 border-t border-[#E6DEC9]">
          <p className="text-xs uppercase font-bold tracking-[0.24em] text-[#B8793A] text-center mb-2">
            Engineering &amp; Innovation
          </p>
          <h3 className="type-h3 font-bold text-center text-[#0E0C0A] mb-10">
            European Architectural Features in Every Cabinet
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KITCHEN_FEATURE_HIGHLIGHTS.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-[6px] border border-[#E6DEC9] shadow-sm hover:border-[#B8793A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#F7F3EC] text-[#B8793A] font-mono text-xs font-bold flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-[#0E0C0A] mb-2">{feat.title}</h4>
                <p className="text-xs text-[#6E6358] leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0E0C0A]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#171412] text-[#FBF8F3] border border-[#2A241F] rounded-[8px] max-w-3xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[16/10] bg-[#0E0C0A]">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.imageAlt}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0E0C0A]/80 text-[#FBF8F3] flex items-center justify-center hover:bg-[#B8793A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#B8793A] tracking-widest uppercase">
                      Code: {lightboxItem.code} · {lightboxItem.style}
                    </span>
                    <h3 className="text-2xl font-bold text-[#FBF8F3] mt-1">
                      {lightboxItem.name}
                    </h3>
                  </div>
                  <MagneticButton
                    onClick={() => {
                      setLightboxItem(null);
                      onEnquireKitchen(`Modular Kitchen ${lightboxItem.code} - ${lightboxItem.name}`);
                    }}
                    className="min-h-[44px] px-6 py-2.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] cursor-pointer"
                  >
                    <span>Enquire for Layout</span>
                  </MagneticButton>
                </div>
                <p className="text-sm text-[#8E8275] leading-relaxed mb-6">
                  {lightboxItem.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs text-[#F7F3EC]/90 border-t border-[#2A241F] pt-4">
                  {lightboxItem.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8793A]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
