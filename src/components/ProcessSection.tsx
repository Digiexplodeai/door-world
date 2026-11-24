import { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/site';

export const ProcessSection: FC = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-20 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-t border-[#B8793A]/25"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="type-section-num font-bold text-[#B8793A]/40 block"
            >
              06
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="type-eyebrow text-[#B8793A] font-bold tracking-[0.22em] uppercase mb-2">
              From Consultation to Key Turn
            </p>
            <h2 id="process-heading" className="type-h2 font-bold text-[#FBF8F3]">
              Five Steps to <br />
              <span className="italic font-normal text-[#B8793A]">Architectural Perfection</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-[#8E8275] leading-relaxed">
              A transparent, factory-managed workflow that guarantees exact laser measurements, fixed estimates, and rapid installation without carpentry mess.
            </p>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 bg-[#171412] rounded-[8px] border border-[#2A241F] hover:border-[#B8793A] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-bold text-[#B8793A]">
                    {step.step}
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-[#2A241F]" />
                  )}
                </div>
                <h3 className="text-base font-bold text-[#FBF8F3] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8E8275] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#2A241F] flex items-center justify-between">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8793A]" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E8275]">
                  Stage 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
