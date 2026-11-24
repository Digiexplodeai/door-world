import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  CookingPot,
  DoorOpen,
  Layers,
  LayoutGrid,
  Bath,
  Sun,
  Sparkles,
  Maximize2,
  Armchair,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SHOWROOM_SERVICES, ServiceItem } from '../data/site';

interface ServicesGridProps {
  onEnquireService?: (serviceTitle: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Services (9)' },
  { id: 'kitchens', label: 'Kitchens' },
  { id: 'doors', label: 'Doors' },
  { id: 'wardrobes', label: 'Wardrobes' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'decor', label: 'Architectural Decor' },
];

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case 'CookingPot':
      return <CookingPot className="w-10 h-10 text-[#B8793A]" />;
    case 'DoorOpen':
      return <DoorOpen className="w-10 h-10 text-[#B8793A]" />;
    case 'Layers':
      return <Layers className="w-10 h-10 text-[#B8793A]" />;
    case 'LayoutGrid':
      return <LayoutGrid className="w-10 h-10 text-[#B8793A]" />;
    case 'Bath':
      return <Bath className="w-10 h-10 text-[#B8793A]" />;
    case 'Sun':
      return <Sun className="w-10 h-10 text-[#B8793A]" />;
    case 'Sparkles':
      return <Sparkles className="w-10 h-10 text-[#B8793A]" />;
    case 'Maximize2':
      return <Maximize2 className="w-10 h-10 text-[#B8793A]" />;
    case 'Armchair':
      return <Armchair className="w-10 h-10 text-[#B8793A]" />;
    default:
      return <Sparkles className="w-10 h-10 text-[#B8793A]" />;
  }
}

export const ServicesGrid: FC<ServicesGridProps> = ({ onEnquireService }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const filteredServices = SHOWROOM_SERVICES.filter((svc) =>
    activeFilter === 'all' ? true : svc.category === activeFilter
  );

  const handleEnquire = (title: string) => {
    if (onEnquireService) {
      onEnquireService(title);
    } else {
      navigate(`/contact?product=${encodeURIComponent(title)}`);
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#B8793A]/25"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-10 lg:mb-16">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-semibold text-[#B8793A]/40 block"
            >
              03
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              From Showroom Signboard · Complete Solutions
            </p>
            <h2 id="services-heading" className="type-h2 font-bold text-[#FBF8F3]">
              Bespoke Services <br />
              <span className="italic font-normal text-[#B8793A]">Under One Roof</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#8E8275] leading-relaxed">
              Every interior element—from custom acrylic &amp; PU modular kitchens to solid teak doors and sacred sanctuaries—manufactured at our factory with zero on-site carpentry delays.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#2A241F]">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#B8793A] text-[#0E0C0A] shadow-md shadow-[#B8793A]/20'
                    : 'bg-[#171412] text-[#8E8275] hover:text-[#FBF8F3] hover:bg-[#221D19] border border-[#2A241F]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 9 Services Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const hasPhoto = Boolean(service.image);

              return (
                <motion.article
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative bg-[#171412] rounded-[8px] border border-[#2A241F] hover:border-[#B8793A]/60 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(184,121,58,0.12)]"
                >
                  {/* Visual Header / Image or Icon Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#221D19] flex items-center justify-center">
                    {hasPhoto ? (
                      <>
                        <img
                          src={service.image!}
                          alt={service.imageAlt || service.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-transparent to-transparent z-10" />
                      </>
                    ) : (
                      /* Clean architectural icon showcase */
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1E1915] via-[#171412] to-[#120F0D]">
                        <div className="w-16 h-16 rounded-full bg-[#2A241F]/80 border border-[#B8793A]/30 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-[#B8793A] transition-all duration-300">
                          {getServiceIcon(service.iconName)}
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-[#B8793A]/80 uppercase mt-3">
                          Bespoke Manufacturing
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
                        Service 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B8793A] mb-1.5">
                        {service.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-[#FBF8F3] mb-3 group-hover:text-[#B8793A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#8E8275] leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Enquire Link */}
                    <div className="pt-4 border-t border-[#2A241F] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleEnquire(service.title)}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] hover:text-[#B8793A] transition-colors cursor-pointer"
                      >
                        <span>Enquire Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B8793A] transition-transform duration-200 group-hover:translate-x-1" />
                      </button>

                      <span className="text-[10px] uppercase font-medium text-[#8E8275] tracking-wider">
                        Factory Precision
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
