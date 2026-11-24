import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, CookingPot, Phone, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { ModularKitchensShowcase } from '../components/ModularKitchensShowcase';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const KitchensPage: FC = () => {
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  return (
    <>
      <SeoHead
        title="Modular Kitchens | European Designer Series"
        description="Explore Kumar Kitchen King modular kitchens in PU lacquer and high-gloss acrylic. KKK series KKK-101 to KKK-176 factory manufactured with German hardware in Mohali."
        path="/kitchens"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              Kumar Kitchen King · Division 01
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              Modular Kitchens <br />
              <span className="italic font-normal text-[#B8793A]">European Craftsmanship</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-8">
              Custom-built rectangular European-style cabinetry finished in premium PU lacquer, PU-pigment paints, and mirror-gloss acrylics. Built 100% at our Yamuna Nagar factory with German fittings and zero on-site carpentry delays.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => navigate('/contact?product=Modular+Kitchen')}
                className="px-7 py-3.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <LinkRollText text="Request Free 3D Kitchen Plan" />
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href={`tel:+91${contact.primaryPhone}`}
                className="px-6 py-3.5 bg-[#171412] hover:bg-[#221D19] border border-[#2A241F] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px] cursor-pointer inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B8793A]" />
                <span>Call {contact.primaryPhoneDisplay}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Modular Kitchens Showcase (Filter Tabs, Swatches, 7 KKK Kitchens & Features) */}
      <ModularKitchensShowcase />

      {/* Consultation & Site Measurement Banner */}
      <section className="py-16 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8793A] font-bold block mb-1">
              Zero Mess · Precision Installation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
              Ready to Design Your Modular Kitchen?
            </h3>
            <p className="text-sm text-[#8E8275] mt-2 max-w-xl">
              Our architectural specialists visit your site for laser measurements, discuss finish swatches, and provide a 3D plan with transparent factory quotes.
            </p>
          </div>
          <MagneticButton
            onClick={() => navigate('/contact?product=Modular+Kitchen+Consultation')}
            className="px-8 py-4 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] shrink-0 cursor-pointer shadow-xl inline-flex items-center gap-2"
          >
            <LinkRollText text="Schedule Site Measurement" />
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </section>
    </>
  );
};
