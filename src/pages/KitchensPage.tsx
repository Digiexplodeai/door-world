import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Compass,
  CookingPot,
  Eye,
  Layers,
  Palette,
  Phone,
  Ruler,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import {
  KITCHEN_CABINET_SERIES,
  KITCHEN_COLOUR_SWATCHES,
  KITCHEN_FINISH_TYPES,
  KITCHEN_LAYOUTS,
  KITCHEN_PROCESS_STEPS,
  KITCHEN_STYLES_LIST,
  KitchenCabinetSeries,
  KitchenStyle,
} from '../data/kitchenData';
import { KitchenImage } from '../components/KitchenImage';
import { SITE_DATA } from '../data/site';
import { LinkRollText, MagneticButton } from '../components/MagneticButton';

export const KitchensPage: FC = () => {
  const navigate = useNavigate();
  const { contact } = SITE_DATA.business;

  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeSwatch, setActiveSwatch] = useState<string>(KITCHEN_COLOUR_SWATCHES[0].code);
  const [selectedLayout, setSelectedLayout] = useState<string>(KITCHEN_LAYOUTS[0].id);

  const filteredKitchens = KITCHEN_CABINET_SERIES.filter((item) => {
    if (selectedStyle === 'all') return true;
    return item.style.toLowerCase() === selectedStyle.toLowerCase();
  });

  const activeLayoutData =
    KITCHEN_LAYOUTS.find((l) => l.id === selectedLayout) || KITCHEN_LAYOUTS[0];

  const handleEnquire = (title: string) => {
    navigate(`/contact?product=${encodeURIComponent(title)}`);
  };

  return (
    <>
      <SeoHead
        title="Modular Kitchens | European Designer Series | Kumar Kitchen King"
        description="Bespoke European modular kitchens in Contemporary, Craftsman, Traditional, Tudor, French & Rustic styles. PU lacquer, 20 Greiges palette, and German Blum/Hettich hardware in Mohali."
        path="/kitchen"
      />

      {/* 1. HERO HEADER */}
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
              Precision European modular cabinetry crafted with high-gloss mirror acrylic, anti-yellowing PU lacquer, and architectural 20 Greiges palettes. Built 100% at our Yamuna Nagar heavy manufacturing plant with German hardware and zero on-site carpentry mess.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => handleEnquire('Modular Kitchen Design Consultation')}
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

      {/* 2. KITCHEN STYLES OVERVIEW */}
      <section className="py-20 lg:py-32 bg-[#171412] text-[#FBF8F3] border-b border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/30 block"
              >
                01
              </span>
            </div>
            <div className="lg:col-span-6">
              <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
                Design Aesthetics &amp; Architecture
              </p>
              <h2 className="type-h2 font-bold text-[#FBF8F3]">
                Six Signature <br />
                <span className="italic font-normal text-[#B8793A]">Kitchen Styles</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#8E8275] leading-relaxed">
                Whether you prefer the clean handleless lines of Contemporary European design, the timeless geometry of Craftsman Shaker, or the sculpted heritage of Tudor and French Provincial.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KITCHEN_STYLES_LIST.map((style, idx) => (
              <div
                key={style.id}
                className="p-6 sm:p-7 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] hover:border-[#B8793A]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#B8793A] px-2.5 py-1 rounded-[3px] bg-[#171412] border border-[#B8793A]/30">
                      Style 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-[#8E8275]">
                      {style.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FBF8F3] mb-2.5">{style.name}</h3>
                  <p className="text-xs text-[#8E8275] leading-relaxed mb-5">
                    {style.description}
                  </p>

                  <div className="space-y-2 border-t border-[#221D19] pt-4 mb-6">
                    {style.architecturalFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#C5BAA9]">
                        <Check className="w-3.5 h-3.5 text-[#B8793A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedStyle(style.id);
                    const el = document.getElementById('cabinet-series');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8793A] hover:text-[#D49557] inline-flex items-center gap-1.5 transition-colors cursor-pointer pt-2"
                >
                  <span>Explore {style.id} Cabinets</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CABINET SERIES SHOWCASE */}
      <section id="cabinet-series" className="py-20 lg:py-36 bg-[#F7F3EC] text-[#0E0C0A] relative">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/30 block"
              >
                02
              </span>
            </div>
            <div className="lg:col-span-6">
              <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
                Catalogue Series · Kumar Kitchen King
              </p>
              <h2 className="type-h2 font-bold text-[#0E0C0A]">
                Modular Cabinet <br />
                <span className="italic font-normal text-[#B8793A]">Series Showcase</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#4E443C] leading-relaxed">
                Custom factory configurations from contemporary handleless suites to handcrafted arched traditional doors. All paths centralized in kitchenData for instant image updates.
              </p>
            </div>
          </div>

          {/* Style Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-[#E6DEC9]">
            <button
              onClick={() => setSelectedStyle('all')}
              className={`px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer ${
                selectedStyle === 'all'
                  ? 'bg-[#0E0C0A] text-[#F7F3EC]'
                  : 'bg-white/80 text-[#6E6358] hover:text-[#0E0C0A] border border-[#E6DEC9]'
              }`}
            >
              All Styles ({KITCHEN_CABINET_SERIES.length})
            </button>
            {KITCHEN_STYLES_LIST.map((style) => {
              const isActive = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2.5 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#B8793A] text-[#0E0C0A] font-bold shadow-sm'
                      : 'bg-white/80 text-[#6E6358] hover:text-[#0E0C0A] border border-[#E6DEC9]'
                  }`}
                >
                  {style.id}
                </button>
              );
            })}
          </div>

          {/* Cabinet Series Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKitchens.map((series: KitchenCabinetSeries) => (
              <article
                key={series.code}
                className="group bg-white rounded-[8px] border border-[#E6DEC9] hover:border-[#B8793A] overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                {/* Visual / Fallback Placeholder Container */}
                <div className="relative aspect-[4/3] bg-[#0E0C0A] overflow-hidden">
                  <KitchenImage
                    src={series.image}
                    alt={series.imageAlt}
                    code={series.code}
                    style={series.style}
                    aspectRatio="4/3"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span
                      style={{ backgroundColor: series.colorHex }}
                      className="w-4 h-4 rounded-full border border-black/30 shadow"
                      title={series.colorName}
                    />
                  </div>
                </div>

                {/* Card Meta & Action */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8793A] block mb-1">
                      {series.finish}
                    </span>
                    <h3 className="text-xl font-bold text-[#0E0C0A] mb-2.5">
                      {series.name}
                    </h3>
                    <p className="text-xs text-[#6E6358] leading-relaxed mb-4">
                      {series.description}
                    </p>

                    <ul className="space-y-1.5 mb-6 border-t border-[#F1E8DA] pt-4">
                      {series.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#4E443C]">
                          <Check className="w-3.5 h-3.5 text-[#B8793A] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#E6DEC9] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        handleEnquire(`Modular Kitchen ${series.code} - ${series.name}`)
                      }
                      className="text-xs font-bold uppercase tracking-[0.18em] text-[#0E0C0A] hover:text-[#B8793A] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Request Quote</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B8793A]" />
                    </button>
                    <span className="text-[10px] uppercase font-mono text-[#8E8275]">
                      {series.colorName}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURATED FINISHES & 20 GREIGES PALETTE */}
      <section className="py-20 lg:py-32 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
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
                Finishes &amp; Colour Standards
              </p>
              <h2 className="type-h2 font-bold text-[#FBF8F3]">
                Architectural Finishes &amp; <br />
                <span className="italic font-normal text-[#B8793A]">20 Greiges Palette</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#8E8275] leading-relaxed">
                Specially formulated anti-yellowing PU lacquer paints and scratch-resistant acrylics balanced between cool clarity and warm residential comfort.
              </p>
            </div>
          </div>

          {/* 4 Finish Types */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {KITCHEN_FINISH_TYPES.map((finish, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] hover:border-[#B8793A]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#171412] border border-[#B8793A]/40 flex items-center justify-center mb-4">
                  <Palette className="w-4 h-4 text-[#B8793A]" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8793A] font-bold block mb-1">
                  {finish.badge}
                </span>
                <h4 className="text-base font-bold text-[#FBF8F3] mb-2">{finish.name}</h4>
                <p className="text-xs text-[#8E8275] leading-relaxed">{finish.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Colour Swatches Grid */}
          <div className="p-6 sm:p-8 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#221D19]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B8793A] font-bold block mb-1">
                  Swatches &amp; Tone Balance
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FBF8F3]">
                  Select a Swatch from the Core Palette
                </h3>
              </div>
              <span className="text-xs text-[#8E8275]">
                Available across all 6 kitchen cabinet styles
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {KITCHEN_COLOUR_SWATCHES.map((swatch) => {
                const isSelected = activeSwatch === swatch.code;
                return (
                  <button
                    key={swatch.code}
                    type="button"
                    onClick={() => setActiveSwatch(swatch.code)}
                    className={`p-3.5 rounded-[6px] text-left transition-all cursor-pointer flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-[#171412] border-[#B8793A] shadow-md'
                        : 'bg-[#120F0D] border-[#221D19] hover:border-[#B8793A]/50'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: swatch.hex }}
                      className="w-full aspect-square rounded-[4px] border border-black/20 mb-3 shadow-inner"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-[#B8793A] block">
                        {swatch.code}
                      </span>
                      <h5 className="text-xs font-bold text-[#FBF8F3] truncate">
                        {swatch.name}
                      </h5>
                      <span className="text-[9px] text-[#8E8275] block truncate mt-0.5">
                        {swatch.type}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL KITCHEN LAYOUTS */}
      <section className="py-20 lg:py-36 bg-[#F7F3EC] text-[#0E0C0A]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/30 block"
              >
                04
              </span>
            </div>
            <div className="lg:col-span-6">
              <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
                Space Planning &amp; Work Triangle
              </p>
              <h2 className="type-h2 font-bold text-[#0E0C0A]">
                Five Architectural <br />
                <span className="italic font-normal text-[#B8793A]">Kitchen Layouts</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#4E443C] leading-relaxed">
                Engineered around the Golden Work Triangle to optimize every footstep between refrigerator, preparation counter, sink, and cooking range.
              </p>
            </div>
          </div>

          {/* Layout Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-[#E6DEC9]">
            {KITCHEN_LAYOUTS.map((layout) => {
              const isActive = selectedLayout === layout.id;
              return (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`px-5 py-3 rounded-[4px] text-xs uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0E0C0A] text-[#F7F3EC] shadow-sm'
                      : 'bg-white text-[#6E6358] hover:text-[#0E0C0A] border border-[#E6DEC9]'
                  }`}
                >
                  {layout.name.split(' ')[0]} Layout
                </button>
              );
            })}
          </div>

          {/* Active Layout Deep-Dive Card */}
          <div className="bg-white rounded-[8px] border border-[#E6DEC9] p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs uppercase font-mono tracking-widest text-[#B8793A] font-bold block mb-2">
                  {activeLayoutData.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E0C0A] mb-4">
                  {activeLayoutData.name}
                </h3>
                <p className="text-sm text-[#6E6358] leading-relaxed mb-6">
                  {activeLayoutData.description}
                </p>

                <div className="space-y-4 border-t border-[#E6DEC9] pt-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Compass className="w-4 h-4 text-[#B8793A] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-bold text-[#0E0C0A] block">
                        Recommended For:
                      </span>
                      <p className="text-xs text-[#6E6358]">{activeLayoutData.idealFor}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ruler className="w-4 h-4 text-[#B8793A] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-bold text-[#0E0C0A] block">
                        Ergonomic Workflow:
                      </span>
                      <p className="text-xs text-[#6E6358]">{activeLayoutData.workflow}</p>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  onClick={() =>
                    handleEnquire(`Kitchen Layout Consultation: ${activeLayoutData.name}`)
                  }
                  className="px-6 py-3 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.18em] font-bold rounded-[4px] cursor-pointer inline-flex items-center gap-2 shadow"
                >
                  <LinkRollText text="Plan This Layout for Your Home" />
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>

              {/* Layout Diagram / Card Representation */}
              <div className="lg:col-span-5 bg-[#F7F3EC] p-6 rounded-[8px] border border-[#E6DEC9] text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-[#B8793A] shadow-sm mb-4">
                  <CookingPot className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#0E0C0A] mb-1">
                  Laser Site Measurement
                </h4>
                <p className="text-xs text-[#8E8275] max-w-xs mx-auto mb-6">
                  Our CAD engineers verify exact corner angles, pipe shafts, and electrical heights before producing factory drawings.
                </p>
                <div className="p-3 bg-white rounded-[4px] border border-[#E6DEC9] text-[11px] font-mono text-[#0E0C0A]">
                  Factory standard modules: 300mm · 450mm · 600mm · 900mm
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 4-STEP MANUFACTURING & INSTALLATION PROCESS */}
      <section className="py-20 lg:py-32 bg-[#171412] text-[#FBF8F3] border-t border-[#2A241F]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="type-section-num font-bold text-[#B8793A]/30 block"
              >
                05
              </span>
            </div>
            <div className="lg:col-span-6">
              <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
                Turnkey Workflow
              </p>
              <h2 className="type-h2 font-bold text-[#FBF8F3]">
                Four-Step Seamless <br />
                <span className="italic font-normal text-[#B8793A]">Kitchen Delivery</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#8E8275] leading-relaxed">
                From initial site laser measurements to 48-hour final assembly with zero on-site wood cutting or household disruption.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KITCHEN_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-[8px] bg-[#0E0C0A] border border-[#2A241F] hover:border-[#B8793A]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono text-[#B8793A]">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E8275] px-2 py-0.5 rounded bg-[#171412] border border-[#2A241F]">
                      {step.timeline}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#FBF8F3] mb-1">{step.title}</h4>
                  <span className="text-[11px] font-semibold text-[#D49557] block mb-3">
                    {step.tagline}
                  </span>
                  <p className="text-xs text-[#8E8275] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#221D19] flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#8E8275]">
                  <Clock className="w-3.5 h-3.5 text-[#B8793A]" />
                  <span>On-Schedule Guaranteed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREE CONSULTATION & 3D DESIGN CTA BANNER */}
      <section className="py-16 sm:py-20 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#2A241F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8793A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-[12px] bg-[#171412] border border-[#B8793A]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B8793A] font-bold block mb-2">
                Zero Obligation · Direct Factory Pricing
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#FBF8F3] tracking-tight">
                Ready to Experience Your <br />
                <span className="italic font-normal text-[#B8793A]">Custom 3D Kitchen Plan?</span>
              </h3>
              <p className="text-sm sm:text-base text-[#8E8275] mt-3 leading-relaxed">
                Visit our Sector 82 Mohali Master Gallery or request a home visit by our senior kitchen engineers. We bring material swatches, laser measurement tools, and instant 3D layout options.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <MagneticButton
                onClick={() => handleEnquire('Free 3D Kitchen Plan Consultation')}
                className="px-8 py-4 bg-[#B8793A] hover:bg-[#D49557] text-[#0E0C0A] text-xs uppercase tracking-[0.2em] font-bold rounded-[4px] cursor-pointer shadow-xl inline-flex items-center justify-center gap-2"
              >
                <LinkRollText text="Schedule 3D Consultation" />
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href={`tel:+91${contact.primaryPhone}`}
                className="px-6 py-4 bg-[#0E0C0A] hover:bg-[#221D19] border border-[#2A241F] text-[#FBF8F3] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B8793A]" />
                <span>Call {contact.primaryPhoneDisplay}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
