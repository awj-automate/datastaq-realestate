'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Hairline gold progress bar pinned to the top of the viewport.
 * Tracks total document scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #8C6F1E, #C9A227 40%, #E5C463 70%, #D4AF37)',
        boxShadow: '0 0 12px rgba(201,162,39,0.6)',
      }}
    />
  );
}
