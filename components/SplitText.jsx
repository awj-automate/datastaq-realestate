'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { charReveal, wordReveal } from '@/lib/animations/variants';

/**
 * Splits text into per-character or per-word spans and staggers them
 * into view. Words never break mid-word; the visible text stays
 * accessible via aria-label.
 */
export default function SplitText({
  text,
  as = 'span',
  mode = 'char',
  className = '',
  stagger,
  delay = 0,
  once = true,
}) {
  const Tag = motion[as] || motion.span;
  const words = String(text).split(' ');
  const step = stagger ?? (mode === 'char' ? 0.026 : 0.08);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      aria-label={String(text)}
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              perspective: '600px',
            }}
          >
            {mode === 'char'
              ? word.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    variants={charReveal}
                    style={{ display: 'inline-block' }}
                  >
                    {ch}
                  </motion.span>
                ))
              : (
                  <motion.span variants={wordReveal} style={{ display: 'inline-block' }}>
                    {word}
                  </motion.span>
                )}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
