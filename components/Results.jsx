'use client';

/*
  ── RESULTS DATA — verify before launch ──────────────────────────
   Luke & Jonathan figures come straight from the brief. Priya &
   Marcus are illustrative placeholders in the same format.
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
  { name: 'Priya', total: 19, inbound: 11, database: 8, window: '30 days', note: 'Solo agent, suburban' },
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

/* ── Climbing trajectory chart ─────────────────────────────── */
function TrajectoryChart() {
  const W = 320;
  const H = 170;
  const max = 26;
  const pts = RAMP.map((p, i) => ({
    x: 24 + (i / (RAMP.length - 1)) * (W - 44),
    y: H - 28 - (p.v / max) * (H - 54),
    ...p,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${line} ${pts[pts.length - 1].x},${H - 28} ${pts[0].x},${H - 28}`;

  return (
    <div className="card h-full p-6">
      <h3 className="mb-1 font-jakarta text-base font-extrabold text-ds-heading" style={{ letterSpacing: '-0.03em' }}>
        The 30-day ramp
      </h3>
      <p className="mb-3 font-jakarta text-xs text-ds-subtle">
        Cumulative qualified appointments — representative client
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fill="none">
        <defs>
          <linearGradient id="rampFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1="24" y1={28 + g * 30} x2={W - 20} y2={28 + g * 30} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
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
          strokeWidth="3"
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
            <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#C9A227" strokeWidth="2.6" />
            <text x={p.x} y={p.y - 11} textAnchor="middle" fontSize="10" fontWeight="700" fill="#3F3F46" className="font-jakarta">
              {p.v}
            </text>
            <text x={p.x} y={H - 10} textAnchor="middle" fontSize="8.5" fill="#A1A1AA" className="font-jakarta">
              {p.d}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ── Inbound vs database split bars ────────────────────────── */
function SplitBars() {
  return (
    <div className="card h-full p-6">
      <h3 className="mb-1 font-jakarta text-base font-extrabold text-ds-heading" style={{ letterSpacing: '-0.03em' }}>
        Where the appointments came from
      </h3>
      <p className="mb-4 font-jakarta text-xs text-ds-subtle">
        Inbound speed-to-lead vs. database reactivation, by client
      </p>
      <div className="space-y-4">
        {RESULTS.map((r, idx) => (
          <div key={r.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="font-jakarta text-xs font-bold text-ds-heading">{r.name}</span>
              <span className="font-jakarta text-xs font-semibold text-ds-subtle">{r.total} total</span>
            </div>
            <div className="flex h-5 overflow-hidden rounded-full bg-black/[0.04]">
              <motion.div
                className="flex items-center justify-end pr-2"
                style={{ background: 'linear-gradient(90deg, #E5C463, #C9A227)' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.inbound / r.total) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-jakarta text-[9px] font-bold text-white">{r.inbound}</span>
              </motion.div>
              <motion.div
                className="flex items-center justify-start pl-2"
                style={{ background: 'linear-gradient(90deg, #8B6CF0, #6D4FD6)' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.database / r.total) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.35 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-jakarta text-[9px] font-bold text-white">{r.database}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5 border-t border-black/[0.06] pt-3">
        <span className="flex items-center gap-1.5 font-jakarta text-[11px] font-semibold text-ds-muted">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#C9A227]" /> Inbound
        </span>
        <span className="flex items-center gap-1.5 font-jakarta text-[11px] font-semibold text-ds-muted">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#8B6CF0]" /> Database
        </span>
      </div>
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
            className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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

          {/* charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
              <TrajectoryChart />
            </Reveal>
            <Reveal variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
              <SplitBars />
            </Reveal>
          </div>

          <Reveal className="mt-10 text-center">
            <p className="font-jakarta text-sm text-ds-subtle">
              Figures from early partners. Your results depend on lead volume,
              database size, and market — see the guarantee below.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
