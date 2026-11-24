import { useEffect, useRef, useState } from 'react';

export interface MotionCapabilities {
  prefersReducedMotion: boolean;
  isDesktopPointer: boolean;
  isTouchDevice: boolean;
}

function getInitialCapabilities(): MotionCapabilities {
  if (typeof window === 'undefined') {
    return {
      prefersReducedMotion: false,
      isDesktopPointer: true,
      isTouchDevice: false,
    };
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesktop = pointerFine && window.innerWidth >= 1024;
  const hasTouch = !pointerFine || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

  return {
    prefersReducedMotion: prefersReduced,
    isDesktopPointer: isDesktop,
    isTouchDevice: hasTouch,
  };
}

export function useMotionCapabilities(): MotionCapabilities {
  const [capabilities, setCapabilities] = useState<MotionCapabilities>(getInitialCapabilities);
  const lastWidthRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const update = (force = false) => {
      const currentWidth = window.innerWidth;
      // Ignore vertical address-bar resize events on mobile
      if (!force && Math.abs(currentWidth - lastWidthRef.current) < 2) {
        return;
      }
      lastWidthRef.current = currentWidth;

      const desktopPointer = pointerQuery.matches && currentWidth >= 1024;
      const hasTouch = !pointerQuery.matches || navigator.maxTouchPoints > 0 || currentWidth < 1024;
      const reduced = reducedQuery.matches;

      setCapabilities((prev) => {
        if (
          prev.prefersReducedMotion === reduced &&
          prev.isDesktopPointer === desktopPointer &&
          prev.isTouchDevice === hasTouch
        ) {
          return prev;
        }
        return {
          prefersReducedMotion: reduced,
          isDesktopPointer: desktopPointer,
          isTouchDevice: hasTouch,
        };
      });
    };

    const handleMediaChange = () => update(true);

    reducedQuery.addEventListener('change', handleMediaChange);
    pointerQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', () => update(false), { passive: true });

    return () => {
      reducedQuery.removeEventListener('change', handleMediaChange);
      pointerQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', () => update(false));
    };
  }, []);

  return capabilities;
}
