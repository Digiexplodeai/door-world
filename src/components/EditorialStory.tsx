import { FC } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const BUILT_TO_ENDURE_POINTS = [
  {
    number: '01',
    title: '100% Factory Built Precision',
    description:
      'Precision European CNC cutting, automated PUR edgebanders, and dust-free PU lacquer booths at our Yamuna Nagar plant. Zero messy carpentry work or noise at your site.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'ISI Certified Core Materials',
    description:
      'Moisture-resistant marine-grade boiling waterproof (BWP) plywood, high-density HDHMR boards, and certified European fittings from Blum, Hettich, and Hafele.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Direct Manufacturer Pricing',
    description:
      'Direct mill-to-site rates with no middleman margins. Transparent running-foot quotations with dedicated project managers overseeing measurement to final handover.',
    icon: Trophy,
  },
];

export const EditorialStory: FC = () => {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="py-16 sm:py-20 lg:py-28 bg-[#F7F3EC] text-[#0E0C0A] border-b border-[#E6DEC9]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-16 lg:mb-24">
          <div className="lg:col-span-3">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/40 block mb-2"
            >
              01
            </span>
            <p
              id="story-heading"
              className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-[0.2em]"
            >
              Our Craft &amp; Promise
            </p>
          </div>

          <div className="lg:col-span-9">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-serif font-bold text-[#0E0C0A] leading-snug mb-5">
              Engineered with industrial precision. Finished with artisanal mastery. <br />
              <span className="italic font-normal text-[#B8793A]">
                Every component built under our own roof.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#4E443C] leading-relaxed max-w-3xl mb-6">
              At Kumar Kitchen King and Door World, we eliminated on-site carpentry delays, sawdust, and unpredictable craftsmanship. Every modular kitchen and solid teak entrance door is engineered on computer-controlled European machinery at our Yamuna Nagar factory and presented live at our Sector 82, JLPL Mohali Master Gallery.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#0E0C0A] hover:text-[#B8793A] transition-colors pb-1 border-b border-[#0E0C0A]/30 hover:border-[#B8793A]"
            >
              <span>Know More About Our Factory &amp; Heritage</span>
              <ArrowRight className="w-4 h-4 text-[#B8793A]" />
            </Link>
          </div>
        </div>

        {/* Built to Endure: 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-8 border-t border-[#E6DEC9]">
          <div className="lg:col-span-4">
            <p className="type-eyebrow text-[#B8793A] font-bold uppercase tracking-[0.2em] mb-2">
              Why Kumar Kitchen King
            </p>
            <h3 className="type-h2 font-bold text-[#0E0C0A] mb-3">
              Built to Endure.
            </h3>
            <p className="text-sm text-[#6E6358] leading-relaxed mb-6">
              From kiln-seasoned hardwoods and waterproof BWP ply to silent Blum motion technologies, our architectural solutions are engineered for decades of daily family use.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#B8793A] hover:text-[#9A5F26] transition-colors"
            >
              <span>Know More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BUILT_TO_ENDURE_POINTS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <article
                  key={pillar.number}
                  className="bg-white p-6 rounded-[8px] border border-[#E6DEC9] shadow-sm hover:border-[#B8793A] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#B8793A] tabular-nums">
                        {pillar.number}
                      </span>
                      <IconComp className="w-4 h-4 text-[#B8793A]" />
                    </div>
                    <h4 className="text-base font-bold text-[#0E0C0A] mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#6E6358] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
