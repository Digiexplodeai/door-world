import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { ANNOUNCEMENT_MESSAGES } from '../data/doorWorldData';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

interface AnnouncementBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export function AnnouncementBar({ visible, onDismiss }: AnnouncementBarProps) {
  const { prefersReducedMotion } = useMotionCapabilities();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!visible || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [visible, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Showroom Announcements"
      className="absolute top-0 inset-x-0 z-[60] h-9 bg-[#B8793A] text-[#0E0C0A] border-b border-[#0E0C0A]/20 flex items-center justify-center px-10 overflow-hidden"
    >
      <div className="relative h-6 w-full max-w-2xl flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={ANNOUNCEMENT_MESSAGES[msgIndex]}
            initial={prefersReducedMotion ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="type-eyebrow text-center text-[#0E0C0A] font-bold whitespace-nowrap truncate"
          >
            {ANNOUNCEMENT_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss announcement bar"
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] h-9 flex items-center justify-center rounded-[4px] text-[#0E0C0A]/80 hover:text-[#0E0C0A] hover:bg-black/10 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </aside>
  );
}
