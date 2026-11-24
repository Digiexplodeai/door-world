import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { NAV_LINKS } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

export function ScrollProgress() {
  const { prefersReducedMotion } = useMotionCapabilities();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] origin-left bg-gradient-to-r from-[#B8733B] via-[#E6C98B] to-[#B8733B] pointer-events-none"
    />
  );
}

export function SectionIndicator() {
  const [activeNumeral, setActiveNumeral] = useState('01');

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.sectionId)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = NAV_LINKS.find((l) => l.sectionId === entry.target.id);
            if (matched) setActiveNumeral(matched.numeral);
          }
        });
      },
      { rootMargin: '-40% 0px -48% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Current section indicator"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 pointer-events-none mix-blend-difference"
    >
      <span className="font-display text-sm font-medium text-[#E6C98B] tabular-nums">
        {activeNumeral}
      </span>
      <span className="w-[1px] h-10 bg-[#E6C98B]/50" />
      <span className="text-[10px] tracking-[0.2em] text-[#FBF8F3]/75 tabular-nums">
        06
      </span>
    </aside>
  );
}
