'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { fadeUp, fadeLeft, fadeRight } from '@/lib/animations/variants';
import {
  House,
  Bolt,
  Check,
  Calendar,
  Cabinet,
  Phone,
  Search,
  ArrowRight,
} from '@/components/Icons';

const STREAM_A = [
  { label: 'New lead lands', sub: 'Zillow · Realtor.com · ads', icon: House },
  { label: 'AI calls in < 60s', sub: '24/7, before competitors', icon: Bolt },
  { label: 'Qualifies the buyer', sub: 'timeline · financing', icon: Check },
  { label: 'Books the showing', sub: 'straight to calendar', icon: Calendar },
];

const STREAM_B = [
  { label: 'Pulls an old lead', sub: 'from your 500+ database', icon: Cabinet },
  { label: 'Contextual outreach', sub: 'references prior interest', icon: Phone },
  { label: 'Surfaces seller intent', sub: 'finds who is ready now', icon: Search },
  { label: 'Books the listing appt', sub: 'straight to calendar', icon: Calendar },
];

/* ── One pipeline lane ─────────────────────────────────────── */
function StreamRow({ tag, title, nodes, step, accent, dim }) {
  return (
    <div
      className="rounded-[22px] border p-5"
      style={{
        borderColor: `${accent}33`,
        background: `linear-gradient(180deg, ${accent}0D, transparent)`,
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-jakarta text-[10px] font-bold uppercase tracking-[0.12em] text-white"
          style={{ background: accent }}
        >
          {tag}
        </span>
        <span className="font-jakarta text-sm font-bold text-ds-heading">
          {title}
        </span>
      </div>

      <div className="flex flex-wrap items-stretch gap-y-3">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const isActive = step === i;
          const isDone = step > i;
          return (
            <div key={n.label} className="flex flex-1 items-center" style={{ minWidth: 132 }}>
              <motion.div
                animate={{
                  scale: isActive ? 1.06 : 1,
                  borderColor: isActive || isDone ? accent : 'rgba(0,0,0,0.08)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative flex-1 rounded-2xl border-2 bg-white px-3 py-3"
                style={{
                  boxShadow: isActive
                    ? `0 10px 26px ${accent}40`
                    : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId={`glow-${tag}`}
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{ boxShadow: `0 0 0 4px ${accent}22` }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors"
                    style={{
                      background: isActive || isDone ? accent : '#EBEBEB',
                      color: isActive || isDone ? '#fff' : '#71717A',
                    }}
                  >
                    {isDone ? <Check size={16} /> : <Icon size={16} />}
                  </span>
                  <span className="font-jakarta text-[11px] font-bold leading-tight text-ds-heading">
                    {n.label}
                  </span>
                </div>
                <p className="mt-1.5 font-jakarta text-[10px] leading-tight text-ds-subtle">
                  {n.sub}
                </p>
              </motion.div>

              {i < nodes.length - 1 && (
                <div className="relative mx-1 h-[2px] w-5 flex-shrink-0 overflow-hidden rounded-full bg-black/10 sm:w-7">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: accent }}
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                      style={{ background: accent }}
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Converging calendar ───────────────────────────────────── */
function ConvergeCalendar({ booked }) {
  const slots = Array.from({ length: 12 });
  return (
    <div className="card-glass relative h-full p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ds-heading text-ds-primary-light">
            <Calendar size={16} />
          </span>
          <span className="font-jakarta text-sm font-extrabold text-ds-heading">
            Your calendar
          </span>
        </div>
        <span className="rounded-full bg-ds-primary/12 px-2.5 py-1 font-jakarta text-[10px] font-bold text-ds-primary-dark">
          this week
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {slots.map((_, i) => {
          const filled = i < booked.length;
          const b = booked[i];
          return (
            <motion.div
              key={i}
              className="relative flex aspect-square flex-col items-center justify-center rounded-xl border"
              animate={{
                borderColor: filled ? `${b?.color}66` : 'rgba(0,0,0,0.06)',
                backgroundColor: filled ? `${b?.color}14` : 'rgba(0,0,0,0.015)',
              }}
            >
              <AnimatePresence>
                {filled && (
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex flex-col items-center"
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-md text-white"
                      style={{ background: b?.color }}
                    >
                      <Check size={12} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-ds-heading px-4 py-3">
        <span className="font-jakarta text-[11px] font-semibold uppercase tracking-wide text-ds-bg/70">
          Appointments booked
        </span>
        <motion.span
          key={booked.length}
          initial={{ scale: 1.5, color: '#E5C463' }}
          animate={{ scale: 1, color: '#FFFFFF' }}
          className="font-jakarta text-2xl font-extrabold tabular-nums"
        >
          {booked.length}
        </motion.span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 font-jakarta text-[10px] font-semibold">
        <span className="flex items-center gap-1.5 text-ds-muted">
          <span className="h-2 w-2 rounded-full bg-[#C9A227]" /> Inbound
        </span>
        <span className="flex items-center gap-1.5 text-ds-muted">
          <span className="h-2 w-2 rounded-full bg-[#8B6CF0]" /> Reactivation
        </span>
      </div>
    </div>
  );
}

function DualStreamFlow() {
  const [stepA, setStepA] = useState(0);
  const [stepB, setStepB] = useState(2);
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStepA(3);
      setStepB(3);
      setBooked([
        { color: '#C9A227' },
        { color: '#8B6CF0' },
        { color: '#C9A227' },
        { color: '#8B6CF0' },
        { color: '#C9A227' },
      ]);
      return;
    }

    const add = (color) =>
      setBooked((prev) => (prev.length >= 12 ? [{ color }] : [...prev, { color }]));

    const a = setInterval(() => {
      setStepA((s) => {
        if (s >= 3) {
          add('#C9A227');
          return 0;
        }
        return s + 1;
      });
    }, 950);

    const b = setInterval(() => {
      setStepB((s) => {
        if (s >= 3) {
          add('#8B6CF0');
          return 0;
        }
        return s + 1;
      });
    }, 1250);

    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div className="card overflow-hidden p-5 sm:p-7 lg:p-8">
      <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <StreamRow
            tag="Stream A"
            title="Inbound speed-to-lead"
            nodes={STREAM_A}
            step={stepA}
            accent="#C9A227"
          />
          {/* convergence cue */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-ds-primary/40 to-ds-primary/40" />
            <span className="flex items-center gap-1.5 rounded-full border border-ds-primary/25 bg-ds-primary/[0.07] px-3 py-1 font-jakarta text-[10px] font-bold uppercase tracking-wide text-ds-primary-dark">
              Both streams converge
              <ArrowRight size={12} />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#8B6CF0]/40 to-[#8B6CF0]/40" />
          </div>
          <StreamRow
            tag="Stream B"
            title="Database reactivation"
            nodes={STREAM_B}
            step={stepB}
            accent="#8B6CF0"
          />
        </div>

        <ConvergeCalendar booked={booked} />
      </div>
    </div>
  );
}

export default function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden bg-ds-bg py-20 lg:py-28">
      {/* ambient blob */}
      <div
        className="blob pointer-events-none absolute right-[6%] top-[12%] h-[380px] w-[380px]"
        style={{
          background: 'linear-gradient(96deg, #C9A227, #E5C463)',
          filter: 'blur(120px)',
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-12 text-center lg:mb-16">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                The Mechanism
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="Two lead streams." mode="char" />{' '}
              <span className="gradient-text-flow">One calendar.</span>
            </h2>
            <Reveal delay={0.1}>
              <p
                className="mx-auto mt-5 max-w-2xl font-jakarta text-lg text-ds-muted"
                style={{ letterSpacing: '-0.02em' }}
              >
                The AI voice agent installs inside the stack you already run,
                and works both leaks in parallel, 24/7.
              </p>
            </Reveal>
          </div>

          <Reveal variants={fadeUp} amount={0.15}>
            <DualStreamFlow />
          </Reveal>

          {/* two stream explainers */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Reveal variants={fadeLeft} className="card p-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="icon-box h-11 w-11 text-ds-primary">
                  <Bolt size={22} />
                </span>
                <h3
                  className="font-jakarta text-xl font-extrabold text-ds-heading"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Stream A · Inbound
                </h3>
              </div>
              <p
                className="font-jakarta text-[15px] text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                The instant a new lead hits your CRM or inbox, the AI is dialing
                in under 60 seconds, 24/7. It qualifies on timeline, financing
                and motivation, then books the showing or warm-transfers a hot
                buyer straight to you.
              </p>
            </Reveal>
            <Reveal variants={fadeRight} className="card p-7">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="icon-box h-11 w-11"
                  style={{ color: '#8B6CF0' }}
                >
                  <Cabinet size={22} />
                </span>
                <h3
                  className="font-jakarta text-xl font-extrabold text-ds-heading"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Stream B · Reactivation
                </h3>
              </div>
              <p
                className="font-jakarta text-[15px] text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                In parallel, the AI works methodically through your 500+ aged
                leads with contextual, non-spammy openers that reference where
                each lead came from, surfacing the sellers and buyers quietly
                ready to move right now.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
