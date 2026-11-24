import { FC } from 'react';
import { Compass, Factory, MapPin, Navigation, Phone } from 'lucide-react';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from './MagneticButton';

export const ShowroomFactorySection: FC = () => {
  const { showroom, factory, contact } = SITE_DATA.business;

  return (
    <section
      id="showroom"
      aria-labelledby="showroom-heading"
      className="py-20 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#B8793A]/25"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/40 block"
            >
              07
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              Mohali Master Gallery &amp; Yamuna Nagar Plant
            </p>
            <h2 id="showroom-heading" className="type-h2 font-bold text-[#FBF8F3]">
              Visit Our Showroom <br />
              <span className="italic font-normal text-[#B8793A]">&amp; Factory Facilities</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#8E8275] leading-relaxed">
              Explore full-scale modular kitchens, operational island displays, solid teak entrance doors, and architectural hardware in person at Sector 82, JLPL Mohali.
            </p>
          </div>
        </div>

        {/* Two Col Split: Mohali Showroom & Map vs Yamuna Nagar Factory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 Cols: Mohali Master Gallery & Live Map Embed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-[8px] bg-[#171412] border border-[#2A241F]">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0E0C0A] border border-[#B8793A]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B8793A]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A]">
                    Master Gallery · Mohali
                  </span>
                  <h3 className="text-xl font-bold text-[#FBF8F3] mt-0.5">
                    {showroom.title}
                  </h3>
                  <p className="text-sm text-[#8E8275] mt-1 leading-relaxed">
                    {showroom.fullAddress}
                  </p>
                  <p className="text-xs text-[#8E8275]/80 mt-1">
                    {showroom.hours}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#2A241F]">
                <MagneticButton
                  href={showroom.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-6 py-2.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <LinkRollText text="Get Directions (Google Maps)" />
                </MagneticButton>

                <MagneticButton
                  href={`tel:+91${contact.primaryPhone}`}
                  className="min-h-[44px] px-5 py-2.5 bg-transparent border border-[#B8793A]/40 hover:border-[#B8793A] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B8793A]" />
                  <span>Call {contact.primaryPhoneDisplay}</span>
                </MagneticButton>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="relative h-[320px] sm:h-[380px] rounded-[8px] overflow-hidden border border-[#2A241F] bg-[#171412]">
              <iframe
                title="Kumar Kitchen King Showroom Map - Plot 657, Sector 82, JLPL Mohali"
                src={showroom.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale-[25%] contrast-[110%]"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right 5 Cols: Factory Built Quality (Yamuna Nagar) + Storefront Photo Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-[8px] bg-[#171412] border border-[#2A241F]">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0E0C0A] border border-[#B8793A]/40 flex items-center justify-center shrink-0">
                  <Factory className="w-5 h-5 text-[#B8793A]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A]">
                    Manufacturing Facility · Haryana
                  </span>
                  <h3 className="text-xl font-bold text-[#FBF8F3] mt-0.5">
                    {factory.title}
                  </h3>
                  <p className="text-sm text-[#8E8275] mt-1 leading-relaxed">
                    {factory.address}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[6px] bg-[#0E0C0A] border border-[#2A241F] mb-4">
                <p className="text-xs font-bold text-[#FBF8F3] mb-1">
                  {factory.badge}
                </p>
                <p className="text-xs text-[#8E8275] leading-relaxed">
                  {factory.description}
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#8E8275]">
                <p>• Advanced CNC Panel Saws &amp; Edge Banding</p>
                <p>• Pressure-Assisted Membrane Press for Acrylics</p>
                <p>• Dust-Controlled PU Lacquer &amp; Pigment Spray Booths</p>
                <p>• Kiln Timber Seasoning Chambers for Solid Doors</p>
              </div>
            </div>

            {/* Storefront Photo Container */}
            <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden bg-[#171412] border border-[#2A241F]">
              <img
                src="/images/showroom.jpg"
                alt="Kumar Kitchen King illuminated night storefront in Sector 82, JLPL Mohali"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/videos/hero_doors_poster_desktop.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[10px] font-mono uppercase font-bold text-[#B8793A] tracking-wider block mb-0.5">
                  Live Showroom
                </span>
                <p className="text-sm font-bold text-[#FBF8F3]">
                  Kumar Kitchen King Illuminated Signboard Gallery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
