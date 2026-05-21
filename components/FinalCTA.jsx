'use client';

/*
  ── CALENDAR EMBED ───────────────────────────────────────────────
   The booking card below is a styled PLACEHOLDER. Drop your real
   scheduler embed (Calendly / Cal.com / SavvyCal) into the
   "CALENDAR EMBED SLOT" marked inside BookingCard. The placeholder
   keeps the layout intact until then.
  ─────────────────────────────────────────────────────────────────
*/

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SplitText from '@/components/SplitText';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';
import ParticleField from '@/components/ParticleField';
import { Calendar, Bolt, Cabinet, Check, ArrowRight } from '@/components/Icons';
import { BOOK_URL } from '@/lib/constants';

/* ── Cursor-trailing particles ─────────────────────────────── */
function useCursorTrail(enabled) {
  const [trail, setTrail] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  const spawn = (x, y) => {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastRef.current < 38) return;
    lastRef.current = now;
    const id = idRef.current++;
    setTrail((t) => [...t.slice(-16), { id, x, y }]);
  };
  const remove = (id) => setTrail((t) => t.filter((p) => p.id !== id));
  return { trail, spawn, remove };
}

/* ── Booking placeholder ───────────────────────────────────── */
function BookingCard() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];
  return (
    <div className="card-glass-dark p-6 sm:p-7">
      {/* CALENDAR EMBED SLOT — replace this block with your scheduler */}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ds-primary text-white">
          <Calendar size={20} />
        </span>
        <div>
          <div className="font-jakarta text-sm font-extrabold text-white">
            Book your 30-day game-plan call
          </div>
          <div className="font-jakarta text-[11px] text-white/50">
            20 minutes · with a DataStaq strategist
          </div>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-5 gap-2">
        {days.map((d, i) => (
          <div
            key={d}
            className={`rounded-xl border py-2.5 text-center font-jakarta text-[11px] font-bold transition-colors ${
              i === 2
                ? 'border-ds-primary bg-ds-primary/15 text-ds-primary-light'
                : 'border-white/10 text-white/55'
            }`}
          >
            <div>{d}</div>
            <div className="text-base">{12 + i}</div>
          </div>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        {slots.map((s, i) => (
          <div
            key={s}
            className={`rounded-xl border py-2.5 text-center font-jakarta text-xs font-semibold transition-colors ${
              i === 1
                ? 'border-ds-primary bg-ds-primary/15 text-white'
                : 'border-white/10 text-white/55'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <MagneticButton
        href={BOOK_URL}
        className="btn-accent h-14 w-full justify-center text-base"
        cursorText="Book it →"
        strength={0.35}
      >
        <span className="relative z-10 flex items-center gap-2">
          Confirm my strategy call
          <ArrowRight size={18} />
        </span>
      </MagneticButton>
      <p className="mt-3 text-center font-jakarta text-[11px] text-white/40">
        No pressure, no hard sell — we&apos;ll tell you honestly if it&apos;s a fit.
      </p>
    </div>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { trail, spawn, remove } = useCursorTrail(!reduced);

  const handleMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spawn(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <section
      id="book"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="mesh-gradient relative overflow-hidden py-24 lg:py-32"
    >
      {/* particles */}
      <div className="absolute inset-0 opacity-70">
        <ParticleField density={0.9} theme="dark" />
      </div>

      {/* grain veil */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

      {/* cursor trail */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <AnimatePresence>
          {trail.map((p) => (
            <motion.span
              key={p.id}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: p.x,
                top: p.y,
                background:
                  'radial-gradient(circle, #FBEFC4, #C9A227)',
                boxShadow: '0 0 8px rgba(229,196,99,0.8)',
              }}
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onAnimationComplete={() => remove(p.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* copy */}
            <div className="text-center lg:text-left">
              <Reveal>
                <div
                  className="sub-title mb-6"
                  style={{ color: '#E5C463', background: 'rgba(201,162,39,0.14)' }}
                >
                  <span className="sub-title-dot" />
                  Last Step
                </div>
              </Reveal>

              <h2
                className="mb-6 font-jakarta text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
                style={{ lineHeight: '1.05', letterSpacing: '-0.045em' }}
              >
                <SplitText text="Two streams." mode="char" />
                <br />
                <SplitText text="One calendar." mode="char" delay={0.3} />
                <br />
                <span className="gradient-text-flow">20 appointments.</span>
              </h2>

              <Reveal delay={0.1}>
                <p
                  className="mx-auto mb-8 max-w-lg font-jakarta text-lg text-white/70 lg:mx-0"
                  style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
                >
                  An AI voice agent answering new leads in 60 seconds and
                  reviving your dead database — running in parallel, every day.
                  Hit 20 qualified appointments in 30 days, or you don&apos;t pay.
                </p>
              </Reveal>

              {/* feature chips */}
              <Reveal delay={0.15}>
                <div className="mb-9 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {[
                    { icon: <Bolt size={14} />, t: 'Inbound in < 60s' },
                    { icon: <Cabinet size={14} />, t: '500+ leads revived' },
                    { icon: <Check size={14} />, t: 'Pay only on results' },
                  ].map((c) => (
                    <span
                      key={c.t}
                      className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 font-jakarta text-xs font-semibold text-white/80"
                    >
                      <span className="text-ds-primary-light">{c.icon}</span>
                      {c.t}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* massive CTA */}
              <Reveal delay={0.2}>
                <div className="relative inline-block">
                  <div
                    className="animate-pulse-glow absolute -inset-3 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(201,162,39,0.6), transparent 70%)',
                      filter: 'blur(18px)',
                    }}
                  />
                  <MagneticButton
                    href={BOOK_URL}
                    className="btn-accent relative h-16 px-12 text-lg"
                    cursorText="Let's go →"
                    strength={0.55}
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      Get My 20 Appointments
                      <ArrowRight size={20} />
                    </span>
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            {/* booking card */}
            <Reveal variants={{ hidden: { opacity: 0, y: 50, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
              <BookingCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
