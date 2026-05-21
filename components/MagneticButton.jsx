'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Cursor-attracting button. The element eases toward the pointer
 * while hovered and snaps back on leave. Renders as <a> by default;
 * pass as="button" for form/JS triggers.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  as = 'a',
  strength = 0.45,
  cursorText,
  ariaLabel,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 230, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 230, damping: 15, mass: 0.4 });

  const handleMove = (e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] || motion.a;

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ x: sx, y: sy }}
      aria-label={ariaLabel}
      data-cursor={cursorText ? 'label' : 'hover'}
      data-cursor-text={cursorText}
      {...rest}
    >
      {children}
    </Comp>
  );
}
