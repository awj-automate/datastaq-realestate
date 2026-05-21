'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import AnimatedCounter from '@/components/AnimatedCounter';
import ParticleField from '@/components/ParticleField';
import { House, Calendar, Bolt, Check, Phone } from '@/components/Icons';
import { BOOK_URL } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1];

/* ── Live <60s response ticker ─────────────────────────────── */
function LiveCountdown() {
  const [t, setT] = useState(58);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setT(0);
      setConnected(true);
      return;
    }
    const id = setInterval(() => {
      setT((prev) => {
        if (prev <= 1) {
          setConnected(true);
          setTimeout(() => setConnected(false), 1700);
          return 58;
        }
        return prev - 1;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-glass flex items-center gap-4 px-5 py-4">
      <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-ds-primary/30" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ds-heading text-ds-primary-light">
          <Bolt size={20} />
        </span>
      </div>
      <div className="leading-none">
        <div className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-muted">
          New lead → AI dialing in
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          {connected ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-jakarta text-3xl font-extrabold"
              style={{ color: '#22A559', letterSpacing: '-0.04em' }}
            >
              Connected
            </motion.span>
          ) : (
            <>
              <span
                className="font-jakarta text-4xl font-extrabold tabular-nums text-ds-heading"
                style={{ letterSpacing: '-0.05em' }}
              >
                {t}
              </span>
              <span className="font-jakarta text-base font-bold text-ds-primary-dark">
                sec
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Floating notification chip ───────────────────────────── */
function FloatChip({ icon, text, color, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="absolute z-30 flex items-center gap-2 rounded-[14px] bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md"
      style={{ border: '1px solid rgba(201,162,39,0.18)', ...style }}
    >
      <span
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md"
        style={{ background: `${color}1A`, color }}
      >
        {icon}
      </span>
      <span className="whitespace-nowrap font-jakarta text-[11px] font-semibold text-ds-heading">
        {text}
      </span>
    </motion.div>
  );
}

/* ── Live soundwave ───────────────────────────────────────── */
function SoundWave({ bars = 22, color = '#C9A227' }) {
  return (
    <div className="flex h-9 items-center justify-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}88)`,
            animationDelay: `${(i % 7) * 0.09}s`,
            animationDuration: `${0.7 + (i % 5) * 0.13}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── 3D phone mockup: a live AI call ──────────────────────── */
function PhoneMockup() {
  const [secs, setSecs] = useState(43);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div
      className="relative mx-auto w-[290px] rounded-[44px] p-3 sm:w-[320px]"
      style={{
        background: 'linear-gradient(160deg, #2A2722, #14110B)',
        boxShadow:
          '0 40px 80px rgba(0,0,0,0.35), 0 0 0 2px rgba(201,162,39,0.25), inset 0 2px 6px rgba(255,255,255,0.08)',
      }}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-[#14110B]" />

      <div className="overflow-hidden rounded-[34px] bg-ds-bg">
        {/* status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3">
          <span className="font-jakarta text-[10px] font-bold text-ds-heading">9:41</span>
          <span className="flex items-center gap-1 text-ds-heading">
            <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
              <rect x="0" y="6" width="2.4" height="3" rx="0.6" />
              <rect x="3.6" y="4" width="2.4" height="5" rx="0.6" />
              <rect x="7.2" y="2" width="2.4" height="7" rx="0.6" />
              <rect x="10.8" y="0" width="2.4" height="9" rx="0.6" />
            </svg>
          </span>
        </div>

        {/* call header */}
        <div className="px-5 pb-4 pt-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{
                background:
                  'radial-gradient(50% 58% at 50% 95%, #E5C463, #C9A227)',
              }}
            >
              <House size={20} />
            </div>
            <div className="leading-tight">
              <div className="font-jakarta text-sm font-bold text-ds-heading">
                New Zillow Lead
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22A559]" />
                <span className="font-jakarta text-[10px] font-semibold text-[#22A559]">
                  AI Voice Agent · live {mm}:{ss}
                </span>
              </div>
            </div>
          </div>

          {/* soundwave */}
          <div className="mt-4 rounded-2xl bg-ds-heading/[0.04] py-2">
            <SoundWave />
          </div>

          {/* transcript */}
          <div className="mt-3 space-y-2">
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              <p className="font-jakarta text-[10.5px] leading-snug text-ds-text">
                Hi! Following up on the 3-bed you saved on Zillow. Are you still
                hoping to tour soon?
              </p>
            </div>
            <div
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2 text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, #C9A227, #8C6F1E)' }}
            >
              <p className="font-jakarta text-[10.5px] leading-snug">
                Yeah, this weekend would be ideal.
              </p>
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              <p className="font-jakarta text-[10.5px] leading-snug text-ds-text">
                Perfect. I have Saturday 11 AM open with your agent, locking
                it in now.
              </p>
            </div>
          </div>

          {/* booked badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{ background: 'rgba(34,165,89,0.1)', border: '1px solid rgba(34,165,89,0.25)' }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22A559] text-white">
              <Check size={14} />
            </span>
            <span className="font-jakarta text-[11px] font-bold text-[#1B7E45]">
              Appointment booked · Sat 11:00 AM
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ds-bg pt-20 lg:pt-16"
    >
      {/* particle field */}
      <div className="absolute inset-0 z-0">
        <ParticleField density={1} />
      </div>

      {/* gradient blobs */}
      <motion.div
        style={{ y: blobY }}
        className="blob pointer-events-none absolute -top-40 right-[8%] z-0 h-[520px] w-[520px]"
      >
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(96deg, #C9A227, #E5C463)',
            filter: 'blur(120px)',
            opacity: 0.12,
          }}
        />
      </motion.div>
      <div
        className="blob pointer-events-none absolute bottom-[6%] left-[2%] z-0 h-[360px] w-[360px]"
        style={{
          background: 'linear-gradient(96deg, #8C6F1E, #D4AF37)',
          filter: 'blur(110px)',
          opacity: 0.08,
          animationDelay: '3s',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="content-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
            {/* ── Copy ── */}
            <motion.div style={{ y: copyY }}>
              <h1
                className="mb-6 font-jakarta text-[2.7rem] font-extrabold text-ds-heading sm:text-6xl xl:text-[4.4rem]"
                style={{ lineHeight: '1.04', letterSpacing: '-0.045em' }}
              >
                <SplitText text="20 qualified appointments" mode="char" />{' '}
                <SplitText
                  text="in the next 30 days"
                  mode="word"
                  delay={0.5}
                />{' '}
                <motion.span
                  initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
                  className="gradient-text-flow inline-block"
                >
                  or you don&apos;t pay.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
                className="mb-8 max-w-xl font-jakarta text-lg text-ds-muted sm:text-xl"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                An AI voice agent that calls every new lead in under{' '}
                <strong className="font-bold text-ds-heading">60 seconds</strong>,{' '}
                and reactivates the{' '}
                <strong className="font-bold text-ds-heading">
                  500+ dead leads
                </strong>{' '}
                rotting in your CRM. Two streams, one calendar, zero new hires.
              </motion.p>

              {/* stat chips */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
                className="mb-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <LiveCountdown />
                <div className="card-glass flex items-center gap-4 px-5 py-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ds-heading text-ds-primary-light">
                    <Phone size={20} />
                  </span>
                  <div className="leading-none">
                    <div className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-muted">
                      Database reactivated
                    </div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <AnimatedCounter
                        to={500}
                        duration={2.4}
                        className="font-jakarta text-4xl font-extrabold tabular-nums text-ds-heading"
                      />
                      <span className="font-jakarta text-2xl font-extrabold text-ds-primary">
                        +
                      </span>
                      <span className="font-jakarta text-xs font-semibold text-ds-primary-dark">
                        dead leads
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 1.45 }}
                className="mb-8 flex flex-wrap gap-4"
              >
                <MagneticButton
                  href={BOOK_URL}
                  className="btn-accent h-14 px-9 text-base"
                  cursorText="Let's go →"
                  strength={0.5}
                >
                  <span className="relative z-10">Get My 20 Appointments</span>
                </MagneticButton>
                <MagneticButton
                  href="#demo"
                  className="btn-light h-14 px-8 text-base"
                  strength={0.35}
                >
                  Hear the AI in action
                </MagneticButton>
              </motion.div>

              {/* trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 font-jakarta text-sm text-ds-subtle"
              >
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-ds-primary" />
                  Installs in your existing CRM
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-ds-primary" />
                  US-based team
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-ds-primary" />
                  Live in 2-3 weeks
                </span>
              </motion.div>
            </motion.div>

            {/* ── Phone visual ── */}
            <motion.div
              style={{ y: phoneY }}
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.85, rotateY: 24 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            >
              <div style={{ perspective: 1400 }}>
                <motion.div
                  animate={
                    reduced
                      ? {}
                      : { rotateY: [-7, 7, -7], rotateX: [3, -3, 3], y: [0, -16, 0] }
                  }
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <PhoneMockup />
                </motion.div>
              </div>

              <FloatChip
                icon={<Bolt size={13} />}
                text="Responded in 47s"
                color="#C9A227"
                delay={1.7}
                style={{ top: '4%', left: '-7%' }}
              />
              <FloatChip
                icon={<Calendar size={13} />}
                text="3 showings booked today"
                color="#22A559"
                delay={2.0}
                style={{ bottom: '20%', left: '-11%' }}
              />
              <FloatChip
                icon={<Phone size={13} />}
                text="Old lead → seller appt"
                color="#8C6F1E"
                delay={2.3}
                style={{ top: '32%', right: '-9%' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
