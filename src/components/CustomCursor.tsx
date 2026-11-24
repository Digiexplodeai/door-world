import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

type CursorMode = 'default' | 'grow' | 'view' | 'explore';

export function CustomCursor() {
  const { prefersReducedMotion, isDesktopPointer } = useMotionCapabilities();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);

  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (prefersReducedMotion || !isDesktopPointer) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorZone = target?.closest('[data-cursor]') as HTMLElement | null;
      const zoneType = cursorZone?.dataset.cursor;

      if (zoneType === 'view') {
        setMode('view');
      } else if (zoneType === 'explore') {
        setMode('explore');
      } else if (target?.closest('a, button, input, select, textarea, [data-cursor="grow"]')) {
        setMode('grow');
      } else {
        setMode('default');
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion, isDesktopPointer, mouseX, mouseY, visible]);

  if (prefersReducedMotion || !isDesktopPointer || !visible) return null;

  const isLabeled = mode === 'view' || mode === 'explore';

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[110] pointer-events-none">
      {/* Trailing Ring / Label Circle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isLabeled ? 74 : mode === 'grow' ? 46 : 32,
          height: isLabeled ? 74 : mode === 'grow' ? 46 : 32,
          backgroundColor: isLabeled
            ? 'rgba(230, 201, 139, 0.94)'
            : mode === 'grow'
              ? 'rgba(230, 201, 139, 0.14)'
              : 'rgba(0, 0, 0, 0)',
          borderColor:
            mode === 'grow' || isLabeled
              ? 'rgba(230, 201, 139, 0.95)'
              : 'rgba(230, 201, 139, 0.65)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-full border-[1.5px] flex items-center justify-center shadow-lg"
      >
        {isLabeled && (
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0E0C0A]">
            {mode === 'view' ? 'VIEW' : 'EXPLORE'}
          </span>
        )}
      </motion.div>

      {/* Center Precision Gold Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isLabeled ? 0 : mode === 'grow' ? 0.55 : 1,
          opacity: isLabeled ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E6C98B]"
      />
    </div>
  );
}
