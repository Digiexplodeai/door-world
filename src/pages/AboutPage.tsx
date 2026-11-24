import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Factory, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { AboutSection } from '../components/AboutSection';
import { ProcessSection } from '../components/ProcessSection';
import { PartnerBrandsStrip } from '../components/PartnerBrandsStrip';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const AboutPage: FC = () => {
  const navigate = useNavigate();
  const { business } = SITE_DATA;

  return (
    <>
      <SeoHead
        title="About Us & Factory | Kumar Kitchen King & Door World"
        description="Learn about Kumar Kitchen King and Door World: over a decade of manufacturing excellence, our Pansra Yamuna Nagar plant, and Mohali Master Gallery."
        path="/about"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              Heritage &amp; Infrastructure
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              A Decade of <br />
              <span className="italic font-normal text-[#B8793A]">Manufacturing Excellence</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-8">
              Kumar Kitchen King and Door World bring together advanced industrial wood engineering and timeless artisanal craftsmanship. 100% factory-built in Yamuna Nagar and showcased at our Sector 82 Mohali Master Gallery.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => navigate('/contact')}
                className="px-7 py-3.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <LinkRollText text="Contact Our Master Gallery" />
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href={business.showroom.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#171412] hover:bg-[#221D19] border border-[#2A241F] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px] cursor-pointer inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#B8793A]" />
                <span>Visit Mohali Showroom</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Story & Pillars */}
      <AboutSection />

      {/* 5-Step Process */}
      <ProcessSection />

      {/* Factory & Showroom Infrastructure Details */}
      <section className="py-20 lg:py-36 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Factory Plant */}
            <div className="p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F]">
              <div className="w-12 h-12 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-6">
                <Factory className="w-6 h-6 text-[#B8793A]" />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#B8793A] font-bold block mb-1">
                Heavy Manufacturing Plant
              </span>
              <h3 className="text-2xl font-bold text-[#FBF8F3] mb-3">
                {business.factory.title}
              </h3>
              <p className="text-sm text-[#8E8275] mb-4">
                {business.factory.address}
              </p>
              <p className="text-xs text-[#8E8275] leading-relaxed mb-6">
                {business.factory.description}
              </p>
              <div className="space-y-2.5 text-xs text-[#F7F3EC]/90 border-t border-[#2A241F] pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Automated European CNC panel saws for 0.1mm cut accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Continuous heavy-duty PUR edgebanders with zero visible glue line</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Negative-pressure clean rooms for mirror-gloss PU lacquer spray</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>High-capacity timber seasoning kilns for 100% warp-free solid doors</span>
                </div>
              </div>
            </div>

            {/* Showroom Master Gallery */}
            <div className="p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F]">
              <div className="w-12 h-12 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#B8793A]" />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#B8793A] font-bold block mb-1">
                Master Showroom &amp; Display
              </span>
              <h3 className="text-2xl font-bold text-[#FBF8F3] mb-3">
                {business.showroom.title}
              </h3>
              <p className="text-sm text-[#8E8275] mb-4">
                {business.showroom.fullAddress}
              </p>
              <p className="text-xs text-[#8E8275] leading-relaxed mb-6">
                Experience full-scale working modular kitchens, handleless soft-close mechanisms, 10ft solid wood pivot doors, and material swatch palettes in person.
              </p>
              <div className="space-y-2.5 text-xs text-[#F7F3EC]/90 border-t border-[#2A241F] pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Live demonstration of European corner carousel &amp; pantry pull-outs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Full range of 20 Greiges, PU lacquers, and acrylic swatches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>Carved solid Burma Teak entrance door exhibits and chaukhat profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B8793A]" />
                  <span>On-site architectural consultation and instant 3D layout review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brands */}
      <PartnerBrandsStrip />
    </>
  );
};
