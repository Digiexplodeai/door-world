import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDITORIAL_PILLARS, STORY_STATEMENT } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

gsap.registerPlugin(ScrollTrigger);

export function EditorialStory() {
  const { prefersReducedMotion, isTouchDevice } = useMotionCapabilities();
  const sectionRef = useRef<HTMLElement>(null);
  const wordsWrapperRef = useRef<HTMLParagraphElement>(null);

  const words = STORY_STATEMENT.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    const wordsEl = wordsWrapperRef.current;
    if (!section || !wordsEl || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const wordSpans = wordsEl.querySelectorAll<HTMLElement>('.story-word');
        gsap.fromTo(
          wordSpans,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: wordsEl,
              start: 'top 78%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-labelledby="story-heading"
      className="py-16 lg:py-44 bg-[#F1E8DA] text-[#0E0C0A]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* 12-Col Asymmetric Scroll-Scrubbed Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-start mb-12 lg:mb-32">
          <div className="lg:col-span-3">
            <span
              aria-hidden="true"
              className="type-section-num font-semibold text-stroke-teak opacity-65 block mb-3 lg:mb-4"
            >
              03
            </span>
            <h2
              id="story-heading"
              className="type-eyebrow text-[#B8733B] font-semibold"
            >
              Our Craft &amp; Promise
            </h2>
          </div>

          <div className="lg:col-span-9">
            <p
              ref={wordsWrapperRef}
              className="type-statement font-medium text-[#0E0C0A]"
            >
              {words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="story-word inline-block mr-[0.24em]"
                  style={{ opacity: prefersReducedMotion || isTouchDevice ? 1 : 0.2 }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Unboxed Asymmetric Editorial Pillars (1px gold-tinted rules, no boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-eyebrow text-[#B8733B] font-semibold mb-3">
              Why Door World
            </p>
            <p className="type-h2 font-semibold text-[#0E0C0A] mb-4">
              Built to Endure.
            </p>
            <p className="type-body text-[#8A7F73]">
              Every detail—from timber seasoning to brass bearing hinges—is showcased under one roof in Sector 82, JLPL Industrial Area, Mohali.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {EDITORIAL_PILLARS.map((pillar, idx) => (
              <article
                key={pillar.number}
                className={`border-t border-[#B8733B]/35 pt-5 ${
                  idx % 2 === 1 ? 'sm:mt-6' : ''
                }`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="type-eyebrow text-[#B8733B] font-semibold tabular-nums">
                    {pillar.number}
                  </span>
                </div>
                <h3 className="type-h3 font-semibold text-[#0E0C0A] mb-2">
                  {pillar.title}
                </h3>
                <p className="type-body text-[#1C1511]/75">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
