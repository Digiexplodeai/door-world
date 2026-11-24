import { FC } from 'react';
import { SITE_DATA } from '../data/site';

export const AboutSection: FC = () => {
  const { business } = SITE_DATA;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 lg:py-40 bg-[#F7F3EC] text-[#0E0C0A] border-t border-[#E6DEC9]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/30 block mb-3"
            >
              08
            </span>
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              Our Story · Heritage &amp; Craftsmanship
            </p>
            <h2 id="about-heading" className="type-h2 font-bold text-[#0E0C0A] mb-6">
              The Complete <br />
              <span className="italic font-normal text-[#B8793A]">Interior Solution</span>
            </h2>

            <div className="p-4 rounded-[6px] bg-white border border-[#E6DEC9]">
              <p className="text-xs font-bold text-[#0E0C0A] mb-1">
                Kumar Kitchen King &amp; Door World
              </p>
              <p className="text-xs text-[#6E6358] leading-relaxed">
                Operating with a decade of proven manufacturing mastery. Dual footprint with Master Showroom in Sector 82, JLPL Mohali and heavy manufacturing in Yamuna Nagar, Haryana.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base text-[#4E443C] leading-relaxed">
            <p className="font-medium text-lg text-[#0E0C0A] leading-relaxed">
              Founded on the belief that home spaces deserve uncompromised craftsmanship, Kumar Kitchen King has grown into a premier manufacturer of customized modular kitchens, architectural solid doors, and comprehensive turnkey interiors.
            </p>

            <p>
              Traditional on-site carpentry frequently introduces months of dust, noisy disturbances, inconsistent joinery, and unpredictable budget inflations. At Kumar Kitchen King, we revolutionized this by investing in a high-precision, 100% factory-built manufacturing model.
            </p>

            <p>
              Every modular cabinet, slatted glass unit, and carved entrance door is engineered using automated European CNC saws, computerized edge-banding lines, and clean PU-pigment spray facilities at our Yamuna Nagar plant. When our team arrives at your residence or commercial project site, every module is ready for clean, rapid fitting without cutting a single board in your home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E6DEC9]">
              <div className="p-5 bg-white rounded-[6px] border border-[#E6DEC9]">
                <h4 className="text-base font-bold text-[#0E0C0A] mb-1.5">
                  Certified Core Materials
                </h4>
                <p className="text-xs text-[#6E6358] leading-relaxed">
                  We strictly specify ISI-certified marine-grade and BWR plywood, seasoned hardwoods, and non-porous quartz surfaces that withstand the toughest humidity, steam, and everyday wear.
                </p>
              </div>

              <div className="p-5 bg-white rounded-[6px] border border-[#E6DEC9]">
                <h4 className="text-base font-bold text-[#0E0C0A] mb-1.5">
                  Direct Mill-to-Site Value
                </h4>
                <p className="text-xs text-[#6E6358] leading-relaxed">
                  By controlling both our production facilities and master showroom, we eliminate middleman margins, offering competitive pricing for bespoke individual residences and large-scale builder projects alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
