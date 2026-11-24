import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryImage } from '../data/site';

export const GallerySection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Kitchens', 'Doors', 'Wardrobes', 'Interiors'];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#B8793A]/25"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-10 lg:mb-14">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/40 block"
            >
              09
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              Visual Portfolio · Master Gallery
            </p>
            <h2 id="gallery-heading" className="type-h2 font-bold text-[#FBF8F3]">
              Curated Architectural <br />
              <span className="italic font-normal text-[#B8793A]">Execution Gallery</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#8E8275] leading-relaxed">
              Explore recent modular kitchens, solid teak door installations, luxury wardrobes, and bespoke living room panelling.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-[#2A241F]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer ${isActive
                    ? 'bg-[#B8793A] text-[#0E0C0A] font-bold'
                    : 'bg-[#171412] text-[#8E8275] hover:text-[#FBF8F3] border border-[#2A241F]'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-[6px] overflow-hidden bg-[#171412] border border-[#2A241F] hover:border-[#B8793A] transition-all cursor-pointer"
                onClick={() => setActiveLightbox(item)}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#221D19]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2 py-0.5 rounded-[2px] border border-[#B8793A]/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Eye Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0E0C0A]/80 text-[#FBF8F3] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-[#B8793A]" />
                  </div>

                  {/* Bottom Title & Tag */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8793A] block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-[#FBF8F3] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 bg-[#0E0C0A]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#171412] text-[#FBF8F3] border border-[#2A241F] rounded-[8px] max-w-3xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[16/10] bg-[#0E0C0A]">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.imageAlt}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0E0C0A]/80 text-[#FBF8F3] flex items-center justify-center hover:bg-[#B8793A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <span className="text-xs font-mono font-bold text-[#B8793A] uppercase tracking-wider">
                  {activeLightbox.category} · {activeLightbox.tag}
                </span>
                <h3 className="text-xl font-bold text-[#FBF8F3] mt-1">
                  {activeLightbox.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
