'use client';

import { motion } from 'framer-motion';

/**
 * Animated boundary between sections.
 *  - variant="wave"     : flowing wave, gold dashed crest line
 *  - variant="diagonal" : sharp diagonal cut
 * `fill` should be the background colour of the section *below* the
 * divider so the shape appears to pour into it. The crest line draws
 * on when it scrolls into view.
 */
export default function SectionDivider({
  fill = '#FFFFFF',
  topColor = 'transparent',
  variant = 'wave',
  flip = false,
  accent = true,
  className = '',
}) {
  const wave =
    'M0,40 C240,92 470,4 720,42 C975,82 1210,6 1440,46 L1440,120 L0,120 Z';
  const crest = 'M0,40 C240,92 470,4 720,42 C975,82 1210,6 1440,46';
  const diagonal = 'M0,84 L1440,12 L1440,120 L0,120 Z';
  const diagCrest = 'M0,84 L1440,12';

  const isWave = variant === 'wave';

  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{
        transform: flip ? 'rotate(180deg)' : 'none',
        backgroundColor: topColor,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full sm:h-[110px]"
      >
        <path d={isWave ? wave : diagonal} fill={fill} />
        {accent && (
          <motion.path
            d={isWave ? crest : diagCrest}
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        {accent && isWave && (
          <path
            d={crest}
            fill="none"
            stroke="#E5C463"
            strokeWidth="1.4"
            strokeDasharray="2 14"
            strokeLinecap="round"
            style={{ animation: 'dashScroll 4s linear infinite' }}
            opacity="0.7"
          />
        )}
      </svg>
    </div>
  );
}
