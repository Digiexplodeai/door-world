import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  DoorOpen,
  Layers,
  Palette,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { DoorsSection } from '../components/DoorsSection';
import { ArchWholesaleBanner } from '../components/ArchWholesaleBanner';
import {
  DOOR_MATERIALS,
  DOOR_SIZES_CUSTOMIZATION,
  DOOR_SPECIFICATIONS,
} from '../data/doors';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

const DOOR_ADVANTAGES = [
  {
    title: 'Kiln-Seasoned Hardwoods',
    description:
      'Every teak, oak, and marandi timber is moisture-tested to 10–12% equilibrium, eliminating warping, shrinking, or sagging over decades of use.',
  },
  {
    title: 'Mortise & Tenon Joinery',
    description:
      'Built with mechanical wood-to-wood joinery reinforced with German Henkel industrial adhesives and 4-side 12mm solid teakwood edge lipping.',
  },
  {
    title: 'Deep 3D CNC & Hand Relief',
    description:
      'Intricate architectural patterns routed with 5-axis CNC cutters, finished with fine manual carving for crisp visual depth and tactile shadow lines.',
  },
  {
    title: '6" Anti-Twist Chaukhats',
    description:
      'Precision-rebated door frames available in Sal and Teak with central aluminium filling and integrated acoustic draft-exclusion rubber seals.',
  },
];

export const DoorsPage: FC = () => {
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  return (
    <>
      <SeoHead
        title="Architectural Doors & Frames | Door World by Kumar Kitchen King"
        description="Solid wood panel doors, carved designer entrance doors, glass & lattice, laminated acoustic doors, 6-inch aluminium-filled chaukhats, and architectural hardware in Mohali."
        path="/doors"
      />

      {/* 1. Hero Header */}
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
              From grand 10ft luxury villa pivot entrances to intricately carved solid teak double doors, contemporary chevron veneer interiors, seasoned Sal wood chaukhats, and German-engineered hardware—manufactured to exact architectural specifications.
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

      {/* 2. Interactive 6 Door Collections Showcase (Solid Wood Panel, Carved Designer, Glass & Lattice, Laminated, Frames, Hardware) */}
      <DoorsSection />

      {/* 3. Materials, Finishes & Sizing Standards */}
      <section className="py-20 lg:py-32 bg-[#F7F3EC] text-[#0E0C0A] border-t border-[#E6DEC9]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/30 block"
              >
                03
              </span>
            </div>
            <div className="lg:col-span-6">
              <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
                Certified Materials &amp; Sizing
              </p>
              <h2 className="type-h2 font-bold text-[#0E0C0A]">
                Bespoke Materials, Finishes &amp; <br />
                <span className="italic font-normal text-[#B8793A]">Custom Sizes</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#4E443C] leading-relaxed">
                Every door leaf and chaukhat frame is tailored to your site openings. Available in custom heights up to 10ft &amp; 12ft grand pivots.
              </p>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {DOOR_MATERIALS.map((mat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[8px] bg-white border border-[#E6DEC9] shadow-sm hover:border-[#B8793A] transition-colors"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8793A] font-bold block mb-1">
                  {mat.badge}
                </span>
                <h3 className="text-base font-bold text-[#0E0C0A] mb-2">{mat.name}</h3>
                <p className="text-xs text-[#6E6358] leading-relaxed">{mat.description}</p>
              </div>
            ))}
          </div>

          {/* Sizing & Customization Details */}
          <div className="p-8 rounded-[8px] bg-white border border-[#E6DEC9] shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <Ruler className="w-5 h-5 text-[#B8793A]" />
              <h3 className="text-sm uppercase font-mono font-bold tracking-[0.2em] text-[#0E0C0A]">
                Dimensional Capabilities &amp; Customization Specs
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOOR_SIZES_CUSTOMIZATION.map((item, idx) => (
                <div key={idx} className="p-5 rounded-[6px] bg-[#F7F3EC] border border-[#E6DEC9]">
                  <h4 className="text-xs uppercase font-mono font-bold text-[#B8793A] tracking-wider mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm font-semibold text-[#0E0C0A] leading-relaxed">
                    {item.specs}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Engineering & Wood Standards */}
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

      {/* 5. Wholesale & Architect Project Banner */}
      <ArchWholesaleBanner />
    </>
  );
};
