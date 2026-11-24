import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Eye, Phone, Sparkles, X } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { GALLERY_ITEMS, GalleryImage, SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

const CATEGORIES = ['All', 'Doors', 'Kitchens', 'Interiors'];

export const GalleryPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryImage | null>(null);
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <>
      <SeoHead
        title="Gallery & Project Portfolio | Kumar Kitchen King & Door World"
        description="Browse high-resolution photographs of installed modular kitchens, luxury solid wood entrance doors, fluted interiors, and architectural woodwork in Mohali."
        path="/gallery"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              Execution Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              Architectural <br />
              <span className="italic font-normal text-[#B8793A]">Work Gallery</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-8">
              Explore authentic photography of our completed modular kitchens, custom acrylic cabinetry, solid teak entrance doors, and fluted panel designs.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-[4px] text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#B8793A] text-[#0E0C0A] font-bold shadow-md shadow-[#B8793A]/20'
                        : 'bg-[#171412] text-[#8E8275] hover:text-[#FBF8F3] hover:bg-[#221D19] border border-[#2A241F]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry / Grid Section */}
      <section className="py-16 lg:py-24 bg-[#0E0C0A] text-[#FBF8F3]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-[8px] overflow-hidden bg-[#171412] border border-[#2A241F] hover:border-[#B8793A] transition-all cursor-pointer shadow-md hover:shadow-2xl"
                  onClick={() => setActiveLightbox(item)}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#140F0B]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/doors/web/cnc-carved/17-radial-carved-wood-door.webp';
                      }}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/95 via-[#0E0C0A]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
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
      </section>

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
              className="bg-[#171412] text-[#FBF8F3] border border-[#2A241F] rounded-[8px] max-w-4xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-[#0E0C0A]">
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
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#B8793A] uppercase tracking-wider">
                    {activeLightbox.category} · {activeLightbox.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FBF8F3] mt-1">
                    {activeLightbox.title}
                  </h3>
                </div>
                <MagneticButton
                  onClick={() => {
                    const title = activeLightbox.title;
                    setActiveLightbox(null);
                    navigate(`/contact?product=${encodeURIComponent(title)}`);
                  }}
                  className="px-6 py-3 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] cursor-pointer inline-flex items-center gap-2 self-start sm:self-auto shrink-0"
                >
                  <span>Enquire This Design</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
