'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/**
 * Counts a number up from `from` to `to` the first time it scrolls
 * into view. Handles decimals, thousands separators, prefix/suffix.
 */
export default function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = true,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  const fixed = Number(value).toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const intFmt = separator ? Number(intPart).toLocaleString('en-US') : intPart;
  const display = decimals > 0 ? `${intFmt}.${decPart}` : intFmt;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
