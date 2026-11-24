import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, DoorOpen, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { DoorsSection } from '../components/DoorsSection';
import { ArchWholesaleBanner } from '../components/ArchWholesaleBanner';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

const DOOR_ADVANTAGES = [
  {
    title: 'Kiln-Seasoned Hardwoods',
    description: 'Every teak and marandi timber is moisture-tested to 10–12% equilibrium, eliminating warping, shrinking, or sagging over decades.',
  },
  {
    title: 'Mortise & Tenon Joinery',
    description: 'Built with time-honored mechanical wood-to-wood joinery reinforced with exterior-grade waterproof resin adhesives.',
  },
  {
    title: 'Deep 3D CNC & Hand Relief',
    description: 'Intricate architectural patterns routed with 5-axis CNC cutters, finished with fine manual carving for crisp visual depth.',
  },
  {
    title: 'Custom Architectural Chaukhats',
    description: 'Precision-rebated door frames available in Sal, Teak, and Red Miranti with integrated acoustic and draft-exclusion rubber seals.',
  },
];

export const DoorsPage: FC = () => {
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  return (
    <>
      <SeoHead
        title="Architectural Doors | Door World by Kumar Kitchen King"
        description="Bespoke solid wood panel doors, hand-carved designer entrance doors, laminated decorative doors, and seasoned timber chaukhats by Door World in Mohali."
        path="/doors"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 bg-[#0E0C0A] text-[#FBF8F3] border-b border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-3">
              Door World Division · Division 02
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF8F3] mb-6">
              The Complete <br />
              <span className="italic font-normal text-[#B8793A]">Doors Solutions</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8E8275] leading-relaxed mb-8">
              From grand 10ft luxury villa pivot entrances to intricately carved solid teak double doors, contemporary chevron veneer interiors, and seasoned Sal wood chaukhats—manufactured to exact architectural specifications.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => navigate('/contact?product=Door+World')}
                className="px-7 py-3.5 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <LinkRollText text="Enquire Custom Door Quotation" />
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

      {/* Interactive 5 Door Collections Showcase */}
      <DoorsSection />

      {/* Engineering & Wood Standards */}
      <section className="py-20 lg:py-32 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="text-xs uppercase font-mono tracking-[0.24em] text-[#B8793A] font-bold block mb-2">
              Engineering Excellence
            </span>
            <h2 className="type-h2 font-bold text-[#FBF8F3]">
              Built for Lifelong Stability &amp; Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOOR_ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] hover:border-[#B8793A]/50 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-[#B8793A] block mb-3">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-[#FBF8F3] mb-2">{adv.title}</h3>
                <p className="text-xs text-[#8E8275] leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale & Architect Project Banner */}
      <ArchWholesaleBanner />
    </>
  );
};
