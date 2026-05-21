'use client';

import { MARQUEE_ITEMS } from '@/lib/constants';

/**
 * Infinite horizontal ticker. The track holds two copies of the
 * items so the CSS translate loop is seamless. Pauses on hover.
 */
function Diamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="mx-5 shrink-0 text-ds-primary" fill="none">
      <path d="M5 0l5 5-5 5-5-5 5-5z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee({ items = MARQUEE_ITEMS, reverse = false }) {
  const row = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden border-y border-black/10 bg-ds-heading py-4"
      aria-hidden
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-ds-heading to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-ds-heading to-transparent" />

      <div
        className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {row.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="whitespace-nowrap font-jakarta text-sm font-semibold uppercase tracking-[0.14em] text-ds-bg/90">
              {item}
            </span>
            <Diamond />
          </div>
        ))}
      </div>
    </div>
  );
}
