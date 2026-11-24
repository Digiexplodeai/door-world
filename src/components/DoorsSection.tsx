import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, Layers } from 'lucide-react';
import {
  ALL_DOOR_CATEGORIES,
  COLOUR_OPTIONS_STRIP,
  DOOR_SPECIFICATIONS,
  DoorItem,
} from '../data/doors';
import { DoorImage } from './DoorImage';
import { DoorLightbox } from './DoorLightbox';

interface DoorsSectionProps {
  onEnquireDoor?: (doorTitle: string) => void;
}

export const DoorsSection: FC<DoorsSectionProps> = ({ onEnquireDoor }) => {
  const navigate = useNavigate();

  // Lightbox state
  const [activeCategoryDoors, setActiveCategoryDoors] = useState<DoorItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleEnquire = (doorTitle: string) => {
    if (onEnquireDoor) {
      onEnquireDoor(doorTitle);
    } else {
      navigate(`/contact?product=${encodeURIComponent(`Door World: ${doorTitle}`)}`);
    }
  };

  const openLightbox = (doorsList: DoorItem[], index: number) => {
    setActiveCategoryDoors(doorsList);
    setLightboxIndex(index);
  };

  return (
    <section
      id="doors"
      aria-labelledby="doors-heading"
      className="py-16 sm:py-24 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] relative overflow-hidden border-t border-[#B8793A]/25"
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
              Solid Burma Teak, natural Walnut raised panels, intricate 3D CNC carved entrance doors, architectural fluted profiles, and bespoke acoustic leather-finish doors.
            </p>
          </div>
        </div>

        {/* 5. VERIFIED DOOR SPECIFICATIONS BLOCK (Facts Only) */}
        <div className="mb-20 p-6 sm:p-8 rounded-[8px] bg-[#140F0B] border border-[#2A241F] shadow-xl">
          <div className="flex items-center gap-2.5 mb-6">
            <Layers className="w-5 h-5 text-[#B8793A]" />
            <h3 className="text-sm uppercase font-mono font-bold tracking-[0.2em] text-[#B8793A]">
              Architectural Specifications &amp; Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOOR_SPECIFICATIONS.map((spec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[6px] bg-[#0E0C0A] border border-[#221D19]"
              >
                <span className="text-[10px] uppercase font-mono font-bold text-[#8E8275] tracking-wider block mb-1">
                  {spec.label}
                </span>
                <p className="text-sm font-bold text-[#FBF8F3] mb-1">
                  {spec.value}
                </p>
                <span className="text-[11px] text-[#B8793A]/80 font-mono">
                  {spec.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY GRIDS (1 heading per category, 3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="space-y-24">
          {ALL_DOOR_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              {/* Category Heading Bar */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-8 border-b border-[#2A241F]">
                <div>
                  <span className="text-[11px] uppercase font-mono font-bold tracking-[0.22em] text-[#B8793A] block mb-1">
                    Collection Series
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-[#8E8275] sm:text-right max-w-md">
                  {cat.subtitle} ({cat.doors.length} Designs)
                </p>
              </div>

              {/* 3-Col / 2-Col / 1-Col Responsive Door Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cat.doors.map((door, index) => (
                  <article
                    key={door.id}
                    className="group bg-[#171412] rounded-[8px] overflow-hidden border border-[#2A241F] hover:border-[#B8793A]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Visual Container (Fixed 4:5 Aspect Ratio, Dark Backing, Object-Fit Cover) */}
                    <div className="relative">
                      <DoorImage
                        src={door.image}
                        alt={door.alt}
                        aspectRatio="4/5"
                        onClick={() => openLightbox(cat.doors, index)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/90 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
                          {door.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => openLightbox(cat.doors, index)}
                        aria-label={`Enlarge ${door.title}`}
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0E0C0A]/80 hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Meta & Quote Action */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-[#FBF8F3] mb-2 group-hover:text-[#B8793A] transition-colors">
                          {door.title}
                        </h4>
                        {door.description && (
                          <p className="text-xs text-[#8E8275] leading-relaxed line-clamp-2 mb-4">
                            {door.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#2A241F] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleEnquire(door.title)}
                          className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8793A] hover:text-[#D49557] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                          Factory Precision
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          {/* COLOUR OPTIONS STRIP (Light tile container, object-fit: contain) */}
          <div className="pt-6">
            <div className="pb-4 mb-8 border-b border-[#2A241F]">
              <span className="text-[11px] uppercase font-mono font-bold tracking-[0.22em] text-[#B8793A] block mb-1">
                Finishing Palettes
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
                Colour Options &amp; Finish Collections
              </h3>
              <p className="text-xs text-[#8E8275] mt-1 max-w-xl">
                Bespoke palette samples, natural timber stains, and PU architectural colors available for custom doors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {COLOUR_OPTIONS_STRIP.map((strip, index) => (
                <div
                  key={strip.id}
                  onClick={() => openLightbox(COLOUR_OPTIONS_STRIP, index)}
                  className="group bg-[#F4EFE6] rounded-[8px] overflow-hidden border border-[#E0D5C3] p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[4/5] bg-white rounded-[4px] overflow-hidden flex items-center justify-center">
                    <DoorImage
                      src={strip.image}
                      alt={strip.alt}
                      aspectRatio="contain"
                      objectFit="contain"
                      className="bg-transparent"
                    />
                  </div>
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0E0C0A]">
                        {strip.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono font-bold text-[#B8793A]">
                        Sample Palette
                      </span>
                    </div>
                    <Eye className="w-4 h-4 text-[#8E8275] group-hover:text-[#B8793A] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Doors Section */}
      <DoorLightbox
        doors={activeCategoryDoors}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
};
