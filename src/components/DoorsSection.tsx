import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, DoorOpen, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DOORS_CATALOGUE, DoorProductItem } from '../data/site';
import { LinkRollText, MagneticButton } from './MagneticButton';

interface DoorsSectionProps {
  onEnquireDoor?: (doorName: string) => void;
}

export const DoorsSection: FC<DoorsSectionProps> = ({ onEnquireDoor }) => {
  const [activeDoor, setActiveDoor] = useState<DoorProductItem>(DOORS_CATALOGUE[0]);
  const navigate = useNavigate();

  const handleEnquire = (name: string) => {
    if (onEnquireDoor) {
      onEnquireDoor(name);
    } else {
      navigate(`/contact?product=${encodeURIComponent(`Door World: ${name}`)}`);
    }
  };

  return (
    <section
      id="doors"
      aria-labelledby="doors-heading"
      className="py-20 lg:py-40 bg-[#0E0C0A] text-[#FBF8F3] relative overflow-hidden border-t border-[#B8793A]/25"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/40 block"
            >
              04
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              Second Major Division · Door World
            </p>
            <h2 id="doors-heading" className="type-h2 font-bold text-[#FBF8F3]">
              The Complete <br />
              <span className="italic font-normal text-[#B8793A]">Doors Solutions</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#8E8275] leading-relaxed">
              Solid Burma Teak, natural Walnut raised panels, intricate 3D CNC carved double entrance doors, durable decorative laminated doors, and seasoned hardwood chaukhats.
            </p>
          </div>
        </div>

        {/* 12-Col Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Dynamic Door Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[3/4] max-h-[640px] w-full rounded-[6px] overflow-hidden bg-[#171412] border border-[#B8793A]/40 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoor.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#171412]"
                >
                  <img
                    src={activeDoor.image}
                    alt={activeDoor.imageAlt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/doors/luxury-villa-entrance-01.webp';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/95 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Spec Details */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8793A] font-bold block mb-1">
                    {activeDoor.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[#FBF8F3]">
                    {activeDoor.name}
                  </h3>
                  <p className="text-xs text-[#8E8275] mt-1">
                    {activeDoor.dimensions}
                  </p>
                </div>

                <MagneticButton
                  onClick={() => handleEnquire(activeDoor.name)}
                  className="shrink-0 min-h-[44px] px-5 py-2.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] cursor-pointer"
                >
                  <LinkRollText text="Enquire Rate" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: Door Categories Selector & Specs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 bg-[#171412] rounded-[6px] border border-[#2A241F]">
              <div className="flex items-center gap-2 text-xs text-[#B8793A] font-semibold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#B8793A]" />
                <span>Client Notice · Real Door Catalogue</span>
              </div>
              <p className="text-xs text-[#8E8275]">
                {activeDoor.pricingNote} (Contact our Mohali desk for wholesale &amp; project rates).
              </p>
            </div>

            {/* List of 5 Door Collections */}
            <div className="space-y-3">
              {DOORS_CATALOGUE.map((door) => {
                const isCurrent = activeDoor.id === door.id;
                return (
                  <button
                    key={door.id}
                    onClick={() => setActiveDoor(door)}
                    className={`w-full text-left p-5 rounded-[6px] border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#171412] border-[#B8793A] shadow-md'
                        : 'bg-transparent border-[#2A241F] hover:border-[#B8793A]/50 text-[#8E8275]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm font-bold text-[#FBF8F3]">
                        {door.name}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-mono font-bold tracking-wider ${
                          isCurrent ? 'text-[#B8793A]' : 'text-[#8E8275]'
                        }`}
                      >
                        {door.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8275] line-clamp-2 leading-relaxed">
                      {door.description}
                    </p>

                    {/* Timber options chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {door.woodOptions.map((w, idx) => (
                        <span
                          key={idx}
                          className="text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#0E0C0A] text-[#D49557] border border-[#2A241F]"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
