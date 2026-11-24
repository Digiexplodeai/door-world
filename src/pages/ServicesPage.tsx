import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Phone, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { ServicesGrid } from '../components/ServicesGrid';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const ServicesPage: FC = () => {
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  return (
    <>
      <SeoHead
        title="Interior & Manufacturing Services | Kumar Kitchen King"
        description="Turnkey interior solutions under one roof: modular kitchens, architectural doors, wardrobes, vanities, wallpapers, pooja mandirs, and designer mirrors."
        path="/services"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              The Complete Interior Solution
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              Bespoke Services <br />
              <span className="italic font-normal text-[#B8793A]">From Factory to Site</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-8">
              No multiple contractors. No coordinating between carpenters, painters, and suppliers. Every element is engineered at our Yamuna Nagar manufacturing facility and installed seamlessly by trained technicians.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => navigate('/contact?product=Complete+Interior+Solution')}
                className="px-7 py-3.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <LinkRollText text="Discuss Turnkey Project" />
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

      {/* Main 9 Services Grid */}
      <ServicesGrid />

      {/* Turnkey Guarantee Banner */}
      <section className="py-16 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8793A] font-bold block mb-1">
              One Single Point of Contact
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF8F3]">
              Need Full Home Interior Woodwork?
            </h3>
            <p className="text-sm text-[#8E8275] mt-2 max-w-xl">
              We coordinate your modular kitchen, wardrobes, bedroom consoles, doors, and mandir room under one unified architectural drawing set and schedule.
            </p>
          </div>
          <MagneticButton
            onClick={() => navigate('/contact?product=Full+Home+Interior')}
            className="px-8 py-4 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] shrink-0 cursor-pointer shadow-xl inline-flex items-center gap-2"
          >
            <LinkRollText text="Request Turnkey Consultation" />
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </section>
    </>
  );
};
