import { MouseEvent, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMotionCapabilities } from '../hooks/useMotionCapabilities';

interface LinkRollTextProps {
  text: string;
  className?: string;
}

export function LinkRollText({ text, className = '' }: LinkRollTextProps) {
  return (
    <span className={`link-roll ${className}`}>
      <span className="link-roll-inner">{text}</span>
      <span aria-hidden="true" className="link-roll-clone">
        {text}
      </span>
    </span>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
  wrapperClassName?: string;
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
  strength = 0.24,
  wrapperClassName = 'inline-block',
}: MagneticButtonProps) {
  const { prefersReducedMotion, isDesktopPointer } = useMotionCapabilities();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 20 });
  const y = useSpring(rawY, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isDesktopPointer || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const shineOverlay = (
    <span
      aria-hidden="true"
      className="btn-shine-bar pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[160%]"
    />
  );

  return (
    <motion.div
      ref={wrapperRef}
      style={prefersReducedMotion || !isDesktopPointer ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={wrapperClassName}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={onClick}
          data-cursor="grow"
          className={`btn-shine-target group relative overflow-hidden ${className}`}
        >
          {shineOverlay}
          {children}
        </a>
      ) : (
        <button
          type={type}
          disabled={disabled}
          aria-label={ariaLabel}
          onClick={onClick}
          data-cursor="grow"
          className={`btn-shine-target group relative overflow-hidden ${className}`}
        >
          {shineOverlay}
          {children}
        </button>
      )}
    </motion.div>
  );
}
