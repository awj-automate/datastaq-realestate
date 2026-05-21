'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations/variants';

/**
 * Generic scroll-reveal wrapper. Drop it around anything that should
 * animate in once on first viewport entry.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  as = 'div',
  className = '',
  delay = 0,
  amount = 0.25,
  once = true,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
