import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

gsap.registerPlugin(ScrollTrigger);

interface StatDef {
  id: string;
  target: number;
  decimals: number;
  suffix: string;
  padZero?: boolean;
  label: string;
  sublabel: string;
}

const STATS: StatDef[] = [
  {
    id: 'rating',
    target: BUSINESS_INFO.googleRating,
    decimals: 1,
    suffix: '',
    label: 'Google Rating',
    sublabel: 'Customer satisfaction score',
  },
  {
    id: 'reviews',
    target: BUSINESS_INFO.reviewCount,
    decimals: 0,
    suffix: '+',
    label: 'Verified Reviews',
    sublabel: 'Homeowners & contractors',
  },
  {
    id: 'types',
    target: 6,
    decimals: 0,
    suffix: '',
    padZero: true,
    label: 'All Door Types',
    sublabel: 'Teak, carved, flush, frames & hardware',
  },
  {
    id: 'wholesale',
    target: 100,
    decimals: 0,
    suffix: '%',
    label: 'Wholesale Rates',
    sublabel: 'Direct showroom pricing',
  },
];

export function BigNumbersBand() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      STATS.forEach((stat) => {
        const numEl = section.querySelector<HTMLElement>(`[data-stat-num="${stat.id}"]`);
        const lineEl = section.querySelector<HTMLElement>(`[data-stat-line="${stat.id}"]`);

        if (numEl) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.target,
            duration: 1.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
            onUpdate: () => {
              const formatted =
                stat.decimals > 0
                  ? obj.val.toFixed(stat.decimals)
                  : stat.padZero
                    ? String(Math.round(obj.val)).padStart(2, '0')
                    : String(Math.round(obj.val));
              numEl.textContent = `${formatted}${stat.suffix}`;
            },
          });
        }

        if (lineEl) {
          gsap.fromTo(
            lineEl,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Door World Showroom Metrics"
      className="py-16 lg:py-36 bg-[#0E0C0A] text-[#FBF8F3] border-y border-[#E6C98B]/20"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-10">
          {STATS.map((stat, idx) => {
            const initialDisplay =
              stat.decimals > 0
                ? `${stat.target.toFixed(stat.decimals)}${stat.suffix}`
                : stat.padZero
                  ? `${String(stat.target).padStart(2, '0')}${stat.suffix}`
                  : `${stat.target}${stat.suffix}`;

            const mobileCellBorders = [
              idx % 2 === 0 ? 'pr-4 border-r border-[#E6C98B]/20 lg:pr-0 lg:border-r-0' : 'pl-4 lg:pl-0',
              idx < 2 ? 'pb-6 border-b border-[#E6C98B]/20 lg:pb-0 lg:border-b-0' : 'pt-6 lg:pt-0',
            ].join(' ');

            return (
              <div key={stat.id} className={`flex flex-col ${mobileCellBorders}`}>
                <span
                  data-stat-num={stat.id}
                  className="type-stat font-semibold text-[#E6C98B] tabular-nums mb-3 lg:mb-5"
                >
                  {initialDisplay}
                </span>

                <div
                  data-stat-line={stat.id}
                  aria-hidden="true"
                  className="origin-left h-[1px] w-full bg-[#E6C98B]/55 mb-3 lg:mb-4"
                />

                <p className="type-eyebrow font-semibold text-[#FBF8F3] mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#8A7F73]">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
