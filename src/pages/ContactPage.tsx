import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, Factory, Mail, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { ContactSection } from '../components/ContactSection';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const ContactPage: FC = () => {
  const [searchParams] = useSearchParams();
  const productParam =
    searchParams.get('product') ||
    searchParams.get('door') ||
    searchParams.get('kitchen') ||
    searchParams.get('service') ||
    '';

  const { business } = SITE_DATA;

  return (
    <>
      <SeoHead
        title="Contact & Showroom Location | Kumar Kitchen King Mohali"
        description="Visit our Master Gallery in Sector 82 Mohali or contact our technical team for custom modular kitchens and door quotes. Call 98120 05418."
        path="/contact"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-14 lg:pt-44 lg:pb-16 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              Direct Showroom &amp; Plant Desk
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              Connect With Our <br />
              <span className="italic font-normal text-[#B8793A]">Technical Consultants</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-6">
              Whether you are planning a single residential modular kitchen or require wholesale supply for a luxury villa development, our engineering desk in Mohali is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section with Live Supabase Form */}
      <ContactSection preselectedDoorType={productParam} />

      {/* Direct Showroom & Plant Location Details */}
      <section className="py-20 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Mohali Showroom */}
            <div className="p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-[#B8793A]" />
                </div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A] block mb-1">
                  Master Gallery
                </span>
                <h3 className="text-xl font-bold text-[#FBF8F3] mb-2">
                  {business.showroom.title}
                </h3>
                <p className="text-sm text-[#8E8275] leading-relaxed mb-4">
                  {business.showroom.fullAddress}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#8E8275]">
                  <Clock className="w-4 h-4 text-[#B8793A]" />
                  <span>{business.showroom.hours}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2A241F]">
                <MagneticButton
                  href={business.showroom.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.16em] font-bold rounded-[4px] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <LinkRollText text="Google Maps Directions" />
                </MagneticButton>
              </div>
            </div>

            {/* Card 2: Factory Facility */}
            <div className="p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-4">
                  <Factory className="w-5 h-5 text-[#B8793A]" />
                </div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A] block mb-1">
                  Manufacturing Facility
                </span>
                <h3 className="text-xl font-bold text-[#FBF8F3] mb-2">
                  {business.factory.title}
                </h3>
                <p className="text-sm text-[#8E8275] leading-relaxed mb-4">
                  {business.factory.address}
                </p>
                <div className="p-3 bg-[#171412] rounded-[4px] border border-[#2A241F] text-xs text-[#8E8275]">
                  <span className="text-[#D49557] font-semibold block mb-0.5">
                    {business.factory.badge}
                  </span>
                  Heavy machinery &amp; automated finishing lines.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2A241F]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8275] block text-center">
                  Direct Mill Dispatches
                </span>
              </div>
            </div>

            {/* Card 3: Direct Phone Numbers */}
            <div className="p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-[#B8793A]" />
                </div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A] block mb-1">
                  Telephonic Assistance
                </span>
                <h3 className="text-xl font-bold text-[#FBF8F3] mb-4">
                  Call or WhatsApp
                </h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275] block">
                      Primary Contact
                    </span>
                    <a
                      href={`tel:+91${business.contact.primaryPhone}`}
                      className="text-lg font-bold text-[#FBF8F3] hover:text-[#B8793A] transition-colors"
                    >
                      {business.contact.primaryPhoneDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275] block">
                      Showroom Landline
                    </span>
                    <a
                      href={`tel:${business.contact.landline}`}
                      className="text-sm font-semibold text-[#8E8275] hover:text-[#FBF8F3] transition-colors"
                    >
                      {business.contact.landlineDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275] block">
                      Email Desk
                    </span>
                    <a
                      href={`mailto:${business.contact.email}`}
                      className="text-xs text-[#8E8275] hover:text-[#B8793A] transition-colors"
                    >
                      {business.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2A241F]">
                <MagneticButton
                  href={`tel:+91${business.contact.primaryPhone}`}
                  className="w-full py-2.5 bg-transparent border border-[#B8793A]/50 hover:border-[#B8793A] text-[#FBF8F3] text-xs uppercase tracking-[0.16em] font-bold rounded-[4px] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B8793A]" />
                  <span>Call {business.contact.primaryPhoneDisplay}</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
