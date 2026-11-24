import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Hero } from '../components/Hero';
import { PartnerBrandsStrip } from '../components/PartnerBrandsStrip';
import { EditorialStory } from '../components/EditorialStory';
import { ServicesGrid } from '../components/ServicesGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ShowroomFactorySection } from '../components/ShowroomFactorySection';
import { DoorOpeningCtaBanner } from '../components/DoorOpeningCtaBanner';
import { DOORS_CATALOGUE, KITCHEN_CATALOGUE_ITEMS, SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  // Featured 3-4 kitchens for the homepage
  const featuredKitchens = KITCHEN_CATALOGUE_ITEMS.slice(0, 3);
  // Featured 3 doors for the homepage
  const featuredDoors = DOORS_CATALOGUE.slice(0, 3);

  return (
    <>
      <SeoHead
        title="Kumar Kitchen King & Door World | Modular Kitchens & Luxury Doors Mohali"
        description="Manufacturer of customised modular kitchens (acrylic & PU) and solid architectural doors by Door World. 100% factory built with zero on-site carpentry work in Mohali & Yamuna Nagar."
        path="/"
      />

      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => navigate('/kitchens')}
        onQuoteClick={() => navigate('/contact')}
      />

      {/* 2. Partner Brands Strip */}
      <PartnerBrandsStrip />

      {/* 3. Short Editorial Intro / Story */}
      <EditorialStory />

      {/* 4. Services Overview (9 Services) */}
      <ServicesGrid />

      {/* 5. Featured Kitchens Preview */}
      <section className="py-20 lg:py-36 bg-[#F7F3EC] text-[#0E0C0A] border-t border-[#E6DEC9]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <p className="text-xs uppercase font-bold tracking-[0.22em] text-[#B8793A] mb-2">
                Designer Modular Kitchens · Kumar Kitchen King
              </p>
              <h2 className="type-h2 font-bold text-[#0E0C0A]">
                Classic European <br />
                <span className="italic font-normal text-[#B8793A]">Cabinetry Series</span>
              </h2>
            </div>
            <Link
              to="/kitchens"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#0E0C0A] hover:text-[#B8793A] transition-colors self-start md:self-end pb-1 border-b border-[#0E0C0A]/30 hover:border-[#B8793A]"
            >
              <span>Explore All Kitchens ({KITCHEN_CATALOGUE_ITEMS.length})</span>
              <ArrowRight className="w-4 h-4 text-[#B8793A]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredKitchens.map((item) => (
              <div
                key={item.code}
                className="group bg-white rounded-[8px] overflow-hidden border border-[#E6DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#221D19]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
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
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8793A] mb-1">
                      {item.finish}
                    </p>
                    <h3 className="text-xl font-bold text-[#0E0C0A] mb-2">{item.name}</h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6DEC9] flex items-center justify-between">
                    <Link
                      to={`/contact?product=${encodeURIComponent(`Modular Kitchen ${item.code} - ${item.name}`)}`}
                      className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E0C0A] hover:text-[#B8793A] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Request Quote</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B8793A]" />
                    </Link>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                      Factory Precision
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Architectural Doors Preview */}
      <section className="py-20 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#B8793A]/25">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <p className="text-xs uppercase font-bold tracking-[0.22em] text-[#B8793A] mb-2">
                Door World Division · Seasoned Hardwoods
              </p>
              <h2 className="type-h2 font-bold text-[#FBF8F3]">
                The Complete <br />
                <span className="italic font-normal text-[#B8793A]">Doors Solutions</span>
              </h2>
            </div>
            <Link
              to="/doors"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FBF8F3] hover:text-[#B8793A] transition-colors self-start md:self-end pb-1 border-b border-white/20 hover:border-[#B8793A]"
            >
              <span>Explore All Doors ({DOORS_CATALOGUE.length} Collections)</span>
              <ArrowRight className="w-4 h-4 text-[#B8793A]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoors.map((door) => (
              <div
                key={door.id}
                className="group bg-[#171412] rounded-[8px] overflow-hidden border border-[#2A241F] hover:border-[#B8793A]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#171412]">
                  <img
                    src={door.image}
                    alt={door.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-[#0E0C0A]/85 backdrop-blur-md text-[#B8793A] px-2.5 py-1 rounded-[3px] border border-[#B8793A]/30">
                      {door.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#FBF8F3] mb-2 group-hover:text-[#B8793A] transition-colors">
                      {door.name}
                    </h3>
                    <p className="text-xs text-[#8E8275] leading-relaxed line-clamp-2 mb-4">
                      {door.description}
                    </p>
                    <p className="text-[11px] font-mono text-[#D49557] mb-4">
                      {door.dimensions}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2A241F] flex items-center justify-between">
                    <Link
                      to={`/contact?product=${encodeURIComponent(`Door World: ${door.name}`)}`}
                      className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8793A] hover:text-[#D49557] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Enquire Rate</span>
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
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Showroom & Factory Section */}
      <ShowroomFactorySection />

      {/* 9. Interactive CTA Banner */}
      <DoorOpeningCtaBanner />
    </>
  );
};
