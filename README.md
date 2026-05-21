# DataStaq · Real Estate AI Voice Agent — Landing Page

A high-conversion, animation-dense landing page for an AI voice agent service
targeted at real estate agents. Same brand system as `datastaq-agency-offer`,
with animation intensity pushed hard.

The offer: **20 qualified appointments in 30 days, or you don't pay** — an AI
voice agent that answers new leads in under 60 seconds *and* reactivates the
500+ dead leads sitting in the agent's CRM.

## Stack

- **Next.js 14** (App Router) · JavaScript — matches `datastaq-agency-offer`
- **Tailwind CSS 3** — design tokens copied 1:1 from the agency project
- **Framer Motion** — primary animation library (reveals, scroll, gestures)
- **Lenis** — smooth scroll
- Canvas 2D — particle fields
- Deploy target: **Vercel**

```bash
pnpm install
pnpm dev     # local preview
pnpm build   # production build
```

## Structure

```
app/
  layout.js          Root layout · fonts · metadata · SmoothScroll
  page.js            Server component · JSON-LD · section composition
  globals.css        Design system + animation utilities + reduced-motion
components/
  Navbar · Hero · Marquee · Problem · Solution · Process · Demo
  Differentiation · Results · ROICalculator · Guarantee · FAQ
  FinalCTA · Footer                       ← page sections
  SmoothScroll · CustomCursor · ScrollProgress · ParticleField
  MagneticButton · TiltCard · SplitText · AnimatedCounter
  Reveal · SectionDivider · Icons         ← shared animation primitives
lib/
  constants.js       Offer copy + CTA target + marquee items
  faqData.js         FAQ content
  animations/
    variants.js      Shared Framer Motion variants / easings
public/               Logo + favicons (copied from datastaq-agency-offer)
```

## What was added vs. datastaq-agency-offer

The brand (colors, typography, buttons, cards, gold gradient family) is
identical. On top of it, this project adds a full animation layer:

- Smooth scroll (Lenis) + eased in-page anchor navigation
- Morphing custom cursor + magnetic buttons + 3D tilt cards
- Per-character / per-word headline reveals (`SplitText`)
- Scroll-triggered reveals on every section (`Reveal`, Framer `whileInView`)
- Parallax layers in the hero, scroll progress bar
- Canvas particle fields with drifting house / pin / key iconography
- Count-up numbers, live countdown, animated SVG charts (draw-on paths)
- The **dual-stream flow** centerpiece — two live pipelines feeding one calendar
- A typewriter AI-call demo with tabs, soundwave, auto-loop
- Animated wave section dividers, marquee ticker, confetti bursts
- A rotating guarantee seal, mesh-gradient final CTA with cursor-trail particles

## Tuning animation intensity

A few central dials:

- **`globals.css` → `:root { --anim-intensity }`** — reserved master dial.
- **`ParticleField`** — pass `density={0.5}` (or lower) to thin out particles;
  it already auto-reduces on mobile.
- **`lib/animations/variants.js`** — `EASE`, durations, and stagger steps for
  every entrance live here. Lower the `staggerChildren` values or shorten
  durations to calm things down globally.
- **`SmoothScroll.jsx`** — adjust Lenis `duration` / easing, or remove the
  wrapper in `layout.js` to disable smooth scroll entirely.
- **Per-section** — most ambient loops are plain CSS animations in
  `globals.css` / `tailwind.config.js`; tweak durations there.

### Reduced motion

`prefers-reduced-motion: reduce` is fully respected: Lenis is disabled, the
custom cursor and cursor-trail do not mount, canvas fields render a single
static frame, looping demos jump to their finished state, and CSS animations
collapse. No information is lost when motion is off.

## Before launch — TODO

Search the repo for `TODO`. Key items:

- `public/og-image.png` (1200×630) — referenced in `app/layout.js`
- Real scheduler embed — `components/FinalCTA.jsx`, "CALENDAR EMBED SLOT"
- Confirm placeholder stats/results — `Problem.jsx`, `Results.jsx`,
  `ROICalculator.jsx`, `faqData.js` (pricing)
- Real legal pages — linked from `Footer.jsx`

## Performance notes

- Particle counts scale down on mobile; parallax/cursor effects are
  pointer- and motion-gated.
- Heavy loops are `requestAnimationFrame`-driven and clean up on unmount.
- Animation is dense by design — if Lighthouse drops below target, start by
  lowering `ParticleField` density and trimming the marquee/soundwave loops.
