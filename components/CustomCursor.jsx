'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Morphing custom cursor.
 *  - default : small dot + trailing ring
 *  - hover   : ring expands (any [data-cursor="hover"] element)
 *  - label   : ring becomes a dark pill showing [data-cursor-text]
 * Only mounts on fine-pointer devices and when motion is allowed —
 * touch + reduced-motion visitors keep the native cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 48 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 48 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor]');
      if (!el) {
        setVariant('default');
        setLabel('');
        return;
      }
      const mode = el.getAttribute('data-cursor');
      if (mode === 'label') {
        setVariant('label');
        setLabel(el.getAttribute('data-cursor-text') || '');
      } else {
        setVariant('hover');
        setLabel('');
      }
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('cursor-none');
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === 'hover' ? 64 : 38;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* trailing ring */}
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: variant === 'label' ? 0 : 1,
            scale: down ? 0.8 : 1,
            borderColor:
              variant === 'hover' ? 'rgba(201,162,39,0.9)' : 'rgba(201,162,39,0.55)',
            backgroundColor:
              variant === 'hover' ? 'rgba(201,162,39,0.12)' : 'rgba(201,162,39,0)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          style={{ borderWidth: 1.5, borderStyle: 'solid' }}
        />
      </motion.div>

      {/* precise dot */}
      <motion.div className="absolute top-0 left-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-ds-primary"
          animate={{
            width: variant === 'default' ? 6 : 0,
            height: variant === 'default' ? 6 : 0,
            opacity: variant === 'default' ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>

      {/* label pill */}
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <AnimatePresence>
          {variant === 'label' && (
            <motion.div
              key="cursor-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 font-jakarta text-[11px] font-semibold tracking-wide text-white"
              style={{
                background:
                  'radial-gradient(62% 82% at 28% -10%, rgba(255,255,255,0.2), transparent), #C9A227',
                boxShadow: '0 8px 24px rgba(201,162,39,0.4)',
              }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
