'use client';

/*
  ── STATS TO CONFIRM (directional placeholders) ──────────────────
   • "391%" — leads contacted within 1 min convert up to 391% better
     (Lead Response Management / Velocify study). Safe, widely cited.
   • "$22,500" — 500 dead leads × ~$45 average paid per portal lead.
     [TODO: confirm the per-lead cost you want to anchor on.]
   • "$12K / mo" — illustrative missed-commission figure.
     [TODO: confirm or soften before launch.]
  ─────────────────────────────────────────────────────────────────
*/

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import AnimatedCounter from '@/components/AnimatedCounter';
import { fadeLeft, fadeRight, fadeUp, staggerContainer } from '@/lib/animations/variants';
import { Stopwatch, Cabinet, Ghost } from '@/components/Icons';

/* ── Speed-to-lead decay curve ─────────────────────────────── */
function DecayChart() {
  const pts = [
    { t: '1 min', x: 16, y: 18, pct: 100 },
    { t: '5 min', x: 92, y: 44, pct: 78 },
    { t: '10 min', x: 168, y: 78, pct: 52 },
    { t: '30 min', x: 244, y: 116, pct: 22 },
    { t: '1 hr', x: 304, y: 134, pct: 9 },
  ];
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${line} 304,150 16,150`;

  return (
    <div className="rounded-2xl bg-ds-bg/60 p-4">
      <svg viewBox="0 0 320 168" className="w-full" fill="none">
        <defs>
          <linearGradient id="decayFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[18, 54, 90, 126].map((y) => (
          <line key={y} x1="16" y1={y} x2="304" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        ))}
        <motion.polygon
          points={area}
          fill="url(#decayFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.polyline
          points={line}
          stroke="#EF4444"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {pts.map((p, i) => (
          <motion.g
            key={p.t}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.22, type: 'spring', stiffness: 260, damping: 16 }}
          >
            <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#EF4444" strokeWidth="2.4" />
            <text
              x={p.x}
              y={p.y - 11}
              textAnchor="middle"
              className="font-jakarta"
              fontSize="10"
              fontWeight="700"
              fill="#3F3F46"
            >
              {p.pct}%
            </text>
            <text
              x={p.x}
              y="164"
              textAnchor="middle"
              className="font-jakarta"
              fontSize="9"
              fill="#A1A1AA"
            >
              {p.t}
            </text>
          </motion.g>
        ))}
      </svg>
      <p className="mt-1 text-center font-jakarta text-[11px] font-medium text-ds-subtle">
        Odds a lead picks up &amp; qualifies, by how fast you call
      </p>
    </div>
  );
}

/* ── Stacking "dead leads" graveyard ───────────────────────── */
function GraveStack() {
  const rows = [
    { src: 'Zillow lead', age: '4 months cold' },
    { src: 'Open house sign-in', age: '8 months cold' },
    { src: 'Facebook lead form', age: '11 months cold' },
    { src: 'Realtor.com inquiry', age: '14 months cold' },
    { src: 'Past referral', age: '16 months cold' },
  ];
  return (
    <motion.div
      variants={staggerContainer(0.13)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-2.5 rounded-2xl bg-ds-bg/60 p-4"
    >
      {rows.map((r) => (
        <motion.div
          key={r.src}
          variants={{
            hidden: { opacity: 0, y: -24, rotateZ: -3 },
            show: {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              transition: { type: 'spring', stiffness: 200, damping: 18 },
            },
          }}
          className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white/70 px-3.5 py-3 grayscale"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-ds-subtle/15 text-ds-subtle">
            <Ghost size={17} />
          </span>
          <div className="flex-1 leading-tight">
            <div className="font-jakarta text-xs font-bold text-ds-muted line-through decoration-ds-subtle/50">
              {r.src}
            </div>
            <div className="font-jakarta text-[10px] text-ds-subtle">{r.age}</div>
          </div>
          <span className="font-jakarta text-[10px] font-semibold uppercase tracking-wide text-ds-subtle">
            Never called
          </span>
        </motion.div>
      ))}
      <p className="pt-1 text-center font-jakarta text-[11px] font-medium text-ds-subtle">
        ...and 495 more just like these
      </p>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          {/* heading */}
          <div className="mb-14 text-center lg:mb-20">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                The Leak
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="You're losing money" mode="char" />{' '}
              <span className="gradient-text-flow">twice</span>
            </h2>
            <Reveal delay={0.1}>
              <p
                className="mx-auto mt-5 max-w-2xl font-jakarta text-lg text-ds-muted"
                style={{ letterSpacing: '-0.02em' }}
              >
                Every agent has two leaks running at once, and both of them are
                paid for, measurable, and completely fixable.
              </p>
            </Reveal>
          </div>

          {/* two halves */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Half 1 — new leads dying */}
            <Reveal variants={fadeLeft} className="card group p-7 lg:p-9">
              <div className="mb-5 flex items-center gap-4">
                <span className="icon-box h-12 w-12 text-[#EF4444]">
                  <Stopwatch size={24} />
                </span>
                <div>
                  <div className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-subtle">
                    Leak #1
                  </div>
                  <h3
                    className="font-jakarta text-2xl font-extrabold text-ds-heading"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    Your new leads are dying
                  </h3>
                </div>
              </div>
              <p
                className="mb-6 font-jakarta text-[15px] text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                A Zillow lead goes cold in minutes. While you&apos;re on a
                showing, three other agents are dialing the same person. The
                first to call usually wins, and it&apos;s rarely you.
              </p>
              <DecayChart />
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#EF4444]/15 bg-[#EF4444]/[0.05] p-4">
                <AnimatedCounter
                  to={391}
                  duration={2}
                  suffix="%"
                  className="font-jakarta text-4xl font-extrabold text-[#EF4444]"
                />
                <p className="font-jakarta text-[13px] font-medium text-ds-muted">
                  better conversion when a lead is called within{' '}
                  <strong className="text-ds-heading">1 minute</strong> vs. 30.
                  Speed isn&apos;t an edge. It&apos;s the whole game.
                </p>
              </div>
            </Reveal>

            {/* Half 2 — CRM graveyard */}
            <Reveal variants={fadeRight} className="card group p-7 lg:p-9">
              <div className="mb-5 flex items-center gap-4">
                <span className="icon-box h-12 w-12 text-ds-muted">
                  <Cabinet size={24} />
                </span>
                <div>
                  <div className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-subtle">
                    Leak #2
                  </div>
                  <h3
                    className="font-jakarta text-2xl font-extrabold text-ds-heading"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    Your CRM is a graveyard
                  </h3>
                </div>
              </div>
              <p
                className="mb-6 font-jakarta text-[15px] text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                Hundreds of leads you already paid for, sitting untouched for
                months. Some of those people are ready to buy or sell right now.
                You just never called them back.
              </p>
              <GraveStack />
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-ds-primary/15 bg-ds-primary/[0.06] p-4">
                <AnimatedCounter
                  to={22500}
                  duration={2.4}
                  prefix="$"
                  className="font-jakarta text-4xl font-extrabold text-ds-primary-dark"
                />
                <p className="font-jakarta text-[13px] font-medium text-ds-muted">
                  already spent acquiring the{' '}
                  <strong className="text-ds-heading">500+ leads</strong> now
                  collecting dust. Money sitting on the table, not lost yet.
                </p>
              </div>
            </Reveal>
          </div>

          {/* bridge line */}
          <Reveal variants={fadeUp} className="mt-12 text-center">
            <p
              className="mx-auto max-w-2xl font-jakarta text-xl font-bold text-ds-heading sm:text-2xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              One AI voice agent plugs{' '}
              <span className="gradient-text">both leaks</span>, at the same
              time.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
