'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';

/**
 * Lenis smooth-scroll provider.
 * Wraps the whole app in app/layout.js. Disabled entirely when the
 * visitor prefers reduced motion — native scrolling takes over.
 * Also upgrades in-page #anchor links to eased Lenis scrolls.
 */
export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth-scroll in-page anchor links through Lenis.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -84, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  // reducedMotion="user" makes every Framer Motion component respect the
  // OS prefers-reduced-motion setting (transforms held, opacity kept).
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
