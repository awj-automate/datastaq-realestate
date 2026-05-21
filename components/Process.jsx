'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { popRotate } from '@/lib/animations/variants';
import { Search, Brain, Chart, Check } from '@/components/Icons';

const STEPS = [
  {
    n: '01',
    tag: 'Audit',
    accent: '#C9A227',
    title: 'We map your stack',
    dur: 'Week 1',
    body: 'A working session, not a 40-field intake form. We see exactly where leads enter, where they leak, and what is already sitting in your database.',
    points: [
      'Map your CRM, Zillow, ads, referrals & website',
      'Audit your database size and current lead flow',
      'Pinpoint exactly where leads go cold today',
    ],
  },
  {
    n: '02',
    tag: 'Setup',
    accent: '#8B6CF0',
    title: 'We build the AI inside it',
    dur: 'Weeks 1-3',
    body: 'The voice agent is built into the tools you already use. Nothing gets ripped out. Both streams go live and start booking.',
    points: [
      'AI voice agent built INSIDE your existing stack',
      'Inbound: instant response + persistent follow-ups',
      'Database: systematic reactivation with contextual openers',
      'Direct calendar booking or live transfer to you',
      'Full CRM sync with detailed call notes',
    ],
  },
  {
    n: '03',
    tag: 'Optimize',
    accent: '#22A559',
    title: 'We tune it every week',
    dur: 'Ongoing',
    body: 'Once it is live, we keep sharpening it. You get a partner watching the numbers, not a tool you were handed and forgotten.',
    points: [
      'Weekly call review with you',
      'CRM analysis to spot booking patterns',
      'Scripts and routing tuned as results come in',
    ],
  },
];

/* ── Step illustrations ────────────────────────────────────── */
function ScanViz({ accent }) {
  const rows = ['CRM', 'Zillow leads', 'Paid ads', 'Website forms', 'Referrals'];
  return (
    <div className="relative space-y-2 overflow-hidden rounded-2xl bg-ds-bg/70 p-4">
      <motion.div
        className="absolute inset-x-3 h-10 rounded-lg"
        style={{
          background: `linear-gradient(180deg, ${accent}00, ${accent}30, ${accent}00)`,
        }}
        animate={{ top: ['8%', '78%', '8%'] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {rows.map((r, i) => (
        <div
          key={r}
          className="relative flex items-center justify-between rounded-lg border border-black/[0.06] bg-white px-3 py-2"
        >
          <span className="font-jakarta text-[11px] font-semibold text-ds-muted">{r}</span>
          <motion.span
            className="flex h-4 w-4 items-center justify-center rounded-full text-white"
            style={{ background: accent }}
            animate={{ scale: [0, 1, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.2 + i * 0.13, 1] }}
          >
            <Check size={10} />
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function NeuralViz({ accent }) {
  const nodes = [
    { x: 22, y: 30 }, { x: 22, y: 78 },
    { x: 90, y: 18 }, { x: 90, y: 54 }, { x: 90, y: 92 },
    { x: 158, y: 36 }, { x: 158, y: 78 },
    { x: 224, y: 56 },
  ];
  const edges = [
    [0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7],
  ];
  return (
    <div className="rounded-2xl bg-ds-bg/70 p-4">
      <svg viewBox="0 0 246 110" className="w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={accent}
            strokeWidth="1.4"
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y}
            r="6"
            fill="#fff"
            stroke={accent}
            strokeWidth="2"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </svg>
    </div>
  );
}

function ChartViz({ accent }) {
  const bars = [34, 48, 42, 66, 78, 96];
  return (
    <div className="rounded-2xl bg-ds-bg/70 p-4">
      <div className="flex h-32 items-end justify-between gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md"
            style={{ background: `linear-gradient(180deg, ${accent}, ${accent}66)` }}
            initial={{ height: '8%' }}
            animate={{ height: [`${h * 0.5}%`, `${h}%`, `${h * 0.5}%`] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5" style={{ color: accent }}>
        <Chart size={14} />
        <span className="font-jakarta text-[10px] font-bold">
          Appointments trending up
        </span>
      </div>
    </div>
  );
}

const VIZ = [ScanViz, NeuralViz, ChartViz];

/* ── A single scrolling step block ─────────────────────────── */
function StepBlock({ step, index, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.55, margin: '-20% 0px -20% 0px' });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="relative pl-16 lg:min-h-[58vh]">
      {/* number badge */}
      <motion.div
        variants={popRotate}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl font-jakarta text-lg font-extrabold text-white"
        style={{
          background: `radial-gradient(60% 70% at 50% 0%, ${step.accent}, ${step.accent}cc)`,
          boxShadow: `0 10px 26px ${step.accent}55`,
        }}
      >
        {step.n}
      </motion.div>

      <Reveal>
        <span
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-jakarta text-[10px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: step.accent }}
        >
          {step.tag} · {step.dur}
        </span>
        <h3
          className="mb-3 font-jakarta text-2xl font-extrabold text-ds-heading sm:text-3xl"
          style={{ letterSpacing: '-0.035em' }}
        >
          {step.title}
        </h3>
        <p
          className="mb-5 max-w-md font-jakarta text-[15px] text-ds-muted"
          style={{ letterSpacing: '-0.02em', lineHeight: '1.65' }}
        >
          {step.body}
        </p>
        <ul className="space-y-2.5">
          {step.points.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="flex items-start gap-2.5"
            >
              <span
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-white"
                style={{ background: step.accent }}
              >
                <Check size={12} />
              </span>
              <span
                className="font-jakarta text-sm text-ds-text"
                style={{ letterSpacing: '-0.01em' }}
              >
                {p}
              </span>
            </motion.li>
          ))}
        </ul>
      </Reveal>

      {/* mobile-only inline visual */}
      <div className="mt-6 lg:hidden">
        {index === 0 && <ScanViz accent={step.accent} />}
        {index === 1 && <NeuralViz accent={step.accent} />}
        {index === 2 && <ChartViz accent={step.accent} />}
      </div>
    </div>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const colRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: colRef,
    offset: ['start center', 'end center'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const ActiveViz = VIZ[active];
  const accent = STEPS[active].accent;

  return (
    <section id="process" className="relative bg-white py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-14 text-center lg:mb-20">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                How It Works
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="Live in" mode="char" />{' '}
              <span className="gradient-text-flow">three steps</span>
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* sticky visual */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <motion.div
                  className="card p-7"
                  animate={{ borderColor: `${accent}40` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <motion.div
                      key={active}
                      initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                      style={{
                        background: `radial-gradient(60% 70% at 50% 0%, ${accent}, ${accent}cc)`,
                        boxShadow: `0 12px 30px ${accent}55`,
                      }}
                    >
                      {active === 0 && <Search size={26} />}
                      {active === 1 && <Brain size={26} />}
                      {active === 2 && <Chart size={26} />}
                    </motion.div>
                    <span
                      className="font-jakarta text-6xl font-extrabold"
                      style={{ color: `${accent}22`, letterSpacing: '-0.05em' }}
                    >
                      {STEPS[active].n}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3
                        className="mb-1 font-jakarta text-xl font-extrabold text-ds-heading"
                        style={{ letterSpacing: '-0.03em' }}
                      >
                        {STEPS[active].tag}
                      </h3>
                      <p className="mb-4 font-jakarta text-sm text-ds-muted">
                        {STEPS[active].title}
                      </p>
                      <ActiveViz accent={accent} />
                    </motion.div>
                  </AnimatePresence>

                  {/* progress dots */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {STEPS.map((s, i) => (
                      <motion.span
                        key={s.n}
                        className="h-1.5 rounded-full"
                        animate={{
                          width: i === active ? 28 : 8,
                          backgroundColor: i === active ? s.accent : 'rgba(0,0,0,0.12)',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* scrolling steps + draw-on connector */}
            <div ref={colRef} className="relative space-y-12 lg:space-y-0">
              <div className="absolute left-[23px] top-2 bottom-2 hidden w-[3px] rounded-full bg-black/[0.07] lg:block">
                <motion.div
                  className="h-full w-full origin-top rounded-full"
                  style={{
                    scaleY: lineScale,
                    background:
                      'linear-gradient(180deg, #C9A227, #8B6CF0 55%, #22A559)',
                  }}
                />
              </div>
              {STEPS.map((s, i) => (
                <StepBlock key={s.n} step={s} index={i} onActive={setActive} />
              ))}
            </div>
          </div>

          {/* timeline callout */}
          <Reveal className="mt-12 text-center">
            <div className="card-glass inline-flex items-center gap-3 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ds-heading text-ds-primary-light">
                <Check size={16} />
              </span>
              <span
                className="font-jakarta text-base font-semibold text-ds-heading"
                style={{ letterSpacing: '-0.02em' }}
              >
                2-3 weeks start to finish. Then it just runs.
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
