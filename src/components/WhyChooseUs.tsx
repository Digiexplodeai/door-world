import { FC } from 'react';
import { WHY_CHOOSE_US } from '../data/site';

export const WhyChooseUs: FC = () => {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="relative z-10 py-16 sm:py-20 lg:py-32 bg-[#F7F3EC] text-[#0E0C0A] border-t border-[#E6DEC9] clear-both"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-14 lg:mb-20">
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
              Verified Principles · Real Client Data
            </p>
            <h2 id="why-heading" className="type-h2 font-bold text-[#0E0C0A]">
              Why Kumar Kitchen King <br />
              <span className="italic font-normal text-[#B8793A]">&amp; Door World</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#6E6358] leading-relaxed">
              No inflated claims or unverified stats. Our manufacturing discipline is built on a decade of factory precision, certified materials, and honest pricing.
            </p>
          </div>
        </div>

        {/* 6 Real Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((point) => (
            <div
              key={point.num}
              className="p-8 bg-white rounded-[8px] border border-[#E6DEC9] hover:border-[#B8793A] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-mono font-bold text-[#B8793A] tracking-wider block mb-4">
                  {point.num}
                </span>
                <h3 className="text-xl font-bold text-[#0E0C0A] mb-3 leading-snug">
                  {point.title}
                </h3>
                <p className="text-sm text-[#6E6358] leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2ECE1] flex items-center justify-between">
                <span className="w-6 h-px bg-[#B8793A]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8275]">
                  Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
