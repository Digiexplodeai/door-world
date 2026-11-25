import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Hero } from '../components/Hero';
import { PartnerBrandsStrip } from '../components/PartnerBrandsStrip';
import { EditorialStory } from '../components/EditorialStory';
import { ShowroomFactorySection } from '../components/ShowroomFactorySection';
import { HOME_FEATURED_DOORS } from '../data/doors';
import { KITCHEN_CABINET_SERIES } from '../data/kitchenData';
import { DoorImage } from '../components/DoorImage';
import { DoorLightbox } from '../components/DoorLightbox';
import { KitchenImage } from '../components/KitchenImage';

export const HomePage: FC = () => {
  const [activeDoorIndex, setActiveDoorIndex] = useState<number | null>(null);

  // 4 Featured Kitchens for Homepage Summary
  const featuredKitchens = KITCHEN_CABINET_SERIES.slice(0, 4);

  return (
    <>
      <SeoHead
        title="Kumar Kitchen King & Door World | Custom Modular Kitchens & Doors Mohali"
        description="Manufacturer of customised modular kitchens (acrylic & PU) and solid architectural doors by Door World. 100% factory built with zero on-site carpentry work in Mohali & Yamuna Nagar."
        path="/"
      />

      {/* 1. Hero with Headline, Subtext & Two Buttons */}
      <Hero />

      {/* 2. Associate Partner Brands Strip */}
      <PartnerBrandsStrip />

      {/* 3. Editorial Craft, Built to Endure (3 Points) & About Teaser */}
      <EditorialStory />

      {/* 4. Doors Section (Short Summary: 2-3 lines of info, 4 door images, Explore More Doors -> /doors) */}
      <section
        id="home-doors"
        aria-labelledby="home-doors-heading"
        className="py-16 sm:py-20 lg:py-28 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F]"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/40 block mb-2"
              >
                02
              </span>
              <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-[0.2em] mb-2">
                Door World Division
              </p>
              <h2 id="home-doors-heading" className="type-h2 font-bold text-[#FBF8F3] mb-3">
                Architectural <br />
                <span className="italic font-normal text-[#B8793A]">Solid Wood Doors</span>
              </h2>
              <p className="text-sm sm:text-base text-[#8E8275] leading-relaxed">
                Handcrafted from kiln-seasoned Burma Teak, American Walnut, and high-density HDHMR. Engineered with mortise-and-tenon joinery and 3D CNC relief for lifetime warp-free stability.
              </p>
            </div>

            <Link
              to="/doors"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#B8793A] hover:text-[#D49557] transition-colors self-start md:self-end pb-1 border-b border-[#B8793A]/30 hover:border-[#B8793A]"
            >
              <span>Explore More Doors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Door Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_FEATURED_DOORS.map((door, index) => (
              <div
                key={door.id}
                className="group bg-[#171412] rounded-[8px] overflow-hidden border border-[#2A241F] hover:border-[#B8793A]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative">
                  <DoorImage
                    src={door.image}
                    alt={door.alt}
                    aspectRatio="4/5"
                    onClick={() => setActiveDoorIndex(index)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
                      {door.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDoorIndex(index)}
                    aria-label={`View ${door.title} in full resolution`}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0E0C0A]/80 hover:bg-[#B8793A] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#FBF8F3] mb-2 group-hover:text-[#B8793A] transition-colors">
                      {door.title}
                    </h3>
                    <p className="text-xs text-[#8E8275] leading-relaxed line-clamp-2 mb-4">
                      {door.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2A241F] flex items-center justify-between">
                    <Link
                      to={`/contact?product=${encodeURIComponent(`Door World: ${door.title}`)}`}
                      className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8793A] hover:text-[#D49557] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Request Quote</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                      Seasoned Teak
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/doors"
              className="w-full min-h-[48px] bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] inline-flex items-center justify-center gap-2"
            >
              <span>Explore More Doors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Door Lightbox */}
        <DoorLightbox
          doors={HOME_FEATURED_DOORS}
          currentIndex={activeDoorIndex ?? 0}
          isOpen={activeDoorIndex !== null}
          onClose={() => setActiveDoorIndex(null)}
          onIndexChange={(idx) => setActiveDoorIndex(idx)}
        />
      </section>

      {/* 5. Kitchen Section (Short Summary: 2-3 lines of info, 4 kitchen cards, Explore More Kitchens -> /kitchen) */}
      <section
        id="home-kitchens"
        aria-labelledby="home-kitchens-heading"
        className="py-16 sm:py-20 lg:py-28 bg-[#F7F3EC] text-[#0E0C0A] border-b border-[#E6DEC9]"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/40 block mb-2"
              >
                03
              </span>
              <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-[0.2em] mb-2">
                Kumar Kitchen King
              </p>
              <h2 id="home-kitchens-heading" className="type-h2 font-bold text-[#0E0C0A] mb-3">
                Custom European <br />
                <span className="italic font-normal text-[#B8793A]">Modular Kitchens</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4E443C] leading-relaxed">
                Precision CNC-built acrylic, PU lacquer, and textured laminate kitchens engineered with Blum/Hettich silent motion hardware. 100% factory built with zero on-site sawdust or delays.
              </p>
            </div>

            <Link
              to="/kitchen"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#0E0C0A] hover:text-[#B8793A] transition-colors self-start md:self-end pb-1 border-b border-[#0E0C0A]/30 hover:border-[#B8793A]"
            >
              <span>Explore More Kitchens</span>
              <ArrowRight className="w-4 h-4 text-[#B8793A]" />
            </Link>
          </div>

          {/* 4 Kitchen Cards (Clean Elegant Placeholders or Real Images via KitchenImage) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredKitchens.map((kitchen) => (
              <div
                key={kitchen.code}
                className="group bg-white rounded-[8px] overflow-hidden border border-[#E6DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <KitchenImage
                  src={kitchen.image}
                  alt={kitchen.imageAlt}
                  code={kitchen.code}
                  styleName={kitchen.name}
                  finishName={kitchen.finish}
                  aspectRatio="16/11"
                />

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8793A] mb-1">
                      {kitchen.finish}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-[#0E0C0A] mb-2">
                      {kitchen.name}
                    </h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed line-clamp-2 mb-4">
                      {kitchen.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DEC9] flex items-center justify-between">
                    <Link
                      to={`/contact?product=${encodeURIComponent(`Modular Kitchen ${kitchen.code} - ${kitchen.name}`)}`}
                      className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E0C0A] hover:text-[#B8793A] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Request Quote</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B8793A]" />
                    </Link>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                      Factory Fitted
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/kitchen"
              className="w-full min-h-[48px] bg-[#0E0C0A] hover:bg-[#1A1613] text-[#F7F3EC] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] inline-flex items-center justify-center gap-2"
            >
              <span>Explore More Kitchens</span>
              <ArrowRight className="w-4 h-4 text-[#B8793A]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Visit Our Showroom & Factory Section (With Map & Verified Storefront Photo) */}
      <ShowroomFactorySection />
    </>
  );
};
