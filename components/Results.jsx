'use client';

/*
  ── RESULTS DATA — verify before launch ──────────────────────────
   Luke & Jonathan figures come straight from the brief. Marcus is
   an illustrative placeholder in the same format.
   [TODO: replace placeholders / confirm all figures + add real
    headshots in /public/results if desired.]
  ─────────────────────────────────────────────────────────────────
*/

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import AnimatedCounter from '@/components/AnimatedCounter';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { Calendar, Check } from '@/components/Icons';

const RESULTS = [
  { name: 'Luke', total: 23, inbound: 8, database: 15, window: '30 days', note: 'First full month live' },
  { name: 'Jonathan', total: 12, inbound: 7, database: 5, window: '14 days', note: 'First two weeks' },
  { name: 'Marcus', total: 27, inbound: 9, database: 18, window: '30 days', note: 'Team of 3, big database' },
];

const RAMP = [
  { d: 'Day 5', v: 2 },
  { d: 'Day 10', v: 6 },
  { d: 'Day 15', v: 11 },
  { d: 'Day 20', v: 16 },
  { d: 'Day 25', v: 21 },
  { d: 'Day 30', v: 24 },
];

/* ── Confetti burst on scroll-into-view ────────────────────── */
function Confetti() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const colors = ['#C9A227', '#E5C463', '#8B6CF0', '#22A559', '#D4AF37'];
  const bits = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + Math.random();
    const dist = 46 + Math.random() * 54;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      c: colors[i % colors.length],
      r: Math.random() * 360,
    };
  });
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {inView &&
        bits.map((b, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-7 h-1.5 w-1.5 rounded-[1px]"
            style={{ background: b.c }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ x: b.x, y: b.y, opacity: 0, scale: 0.4, rotate: b.r }}
            transition={{ duration: 1.1, delay: 0.15 + i * 0.012, ease: 'easeOut' }}
          />
        ))}
    </div>
  );
}

/* ── Climbing trajectory chart (full-width) ────────────────── */
function TrajectoryChart() {
  const W = 760;
  const H = 258;
  const padX = 50;
  const padTop = 44;
  const padBottom = 48;
  const max = 26;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const baseY = padTop + innerH;
  const pts = RAMP.map((p, i) => ({
    x: padX + (i / (RAMP.length - 1)) * innerW,
    y: padTop + innerH - (p.v / max) * innerH,
    ...p,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${line} ${pts[pts.length - 1].x},${baseY} ${pts[0].x},${baseY}`;
  const grid = [0, 1, 2, 3].map((g) => padTop + (g / 3) * innerH);

  return (
    <div className="card p-6 sm:p-8">
      <h3
        className="mb-1 font-jakarta text-lg font-extrabold text-ds-heading"
        style={{ letterSpacing: '-0.03em' }}
      >
        The 30-day ramp
      </h3>
      <p className="mb-4 font-jakarta text-sm text-ds-subtle">
        Cumulative qualified appointments, representative client
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fill="none">
        <defs>
          <linearGradient id="rampFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid.map((y, i) => (
          <line key={i} x1={padX} y1={y} x2={W - padX} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
        ))}
        <motion.polygon
          points={area}
          fill="url(#rampFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
        <motion.polyline
          points={line}
          stroke="#C9A227"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {pts.map((p, i) => (
          <motion.g
            key={p.d}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.22, type: 'spring', stiffness: 280, damping: 15 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <circle cx={p.x} cy={p.y} r="6" fill="#fff" stroke="#C9A227" strokeWidth="3.4" />
            <text x={p.x} y={p.y - 16} textAnchor="middle" fontSize="15" fontWeight="700" fill="#3F3F46" className="font-jakarta">
              {p.v}
            </text>
            <text x={p.x} y={H - 14} textAnchor="middle" fontSize="13" fill="#A1A1AA" className="font-jakarta">
              {p.d}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-14 text-center lg:mb-16">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                The Receipts
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="Booked calendars," mode="char" />{' '}
              <span className="gradient-text-flow">not promises</span>
            </h2>
          </div>

          {/* counter cards */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8 grid gap-6 sm:grid-cols-3"
          >
            {RESULTS.map((r) => (
              <motion.div key={r.name} variants={fadeUp}>
                <div className="card relative overflow-hidden p-6 text-center">
                  <Confetti />
                  <div className="relative">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-ds-heading text-ds-primary-light">
                      <Calendar size={20} />
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <AnimatedCounter
                        to={r.total}
                        duration={2.2}
                        className="font-jakarta text-5xl font-extrabold text-ds-heading"
                      />
                    </div>
                    <div className="mt-1 font-jakarta text-sm font-bold text-ds-primary-dark">
                      qualified appointments
                    </div>
                    <div className="mt-3 font-jakarta text-base font-extrabold text-ds-heading">
                      {r.name}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ds-primary/10 px-3 py-1">
                      <Check size={12} className="text-ds-primary-dark" />
                      <span className="font-jakarta text-[11px] font-semibold text-ds-primary-dark">
                        in {r.window}
                      </span>
                    </div>
                    <div className="mt-2 font-jakarta text-[11px] text-ds-subtle">
                      {r.note}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* trajectory chart */}
          <Reveal variants={fadeUp}>
            <TrajectoryChart />
          </Reveal>

          <Reveal className="mt-10 text-center">
            <p className="font-jakarta text-sm text-ds-subtle">
              Figures from early partners. Your results depend on lead volume,
              database size, and market. See the guarantee below.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
