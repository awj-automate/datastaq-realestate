/* ════════════════════════════════════════════════════════════════
   Shared Framer Motion variants + scroll-reveal presets.
   Every section pulls its entrance animations from here so the
   feel stays consistent and intensity can be tuned in one place.
   ════════════════════════════════════════════════════════════════ */

/* Signature easing — matches the cubic-bezier used across the
   datastaq-agency-offer CSS (snappy out, soft settle). */
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.01, 0.56, 1, 1];

/* Default viewport config for whileInView — fires once, a little
   before the element is fully on screen. */
export const viewportOnce = { once: true, amount: 0.25 };
export const viewportSoft = { once: true, amount: 0.15 };

/* ── Entrances ─────────────────────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -56, filter: 'blur(8px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 56, filter: 'blur(8px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.82, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export const popRotate = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 220, damping: 16 },
  },
};

/* ── Stagger containers ────────────────────────────────────── */
export const staggerContainer = (stagger = 0.12, delayChildren = 0.05) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* ── Per-character / per-word text reveal ──────────────────── */
export const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.04 } },
};

export const charReveal = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -55, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
};

export const wordReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
};
