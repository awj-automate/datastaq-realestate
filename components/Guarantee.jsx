'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { Bolt, Cabinet, Pin, Check } from '@/components/Icons';
import { BOOK_URL } from '@/lib/constants';

const REQS = [
  {
    icon: Bolt,
    title: '30+ new inbound leads / month',
    body: 'Enough fresh volume for the speed-to-lead stream to work.',
  },
  {
    icon: Cabinet,
    title: '500+ leads in your database',
    body: 'A real backlog for the reactivation stream to mine.',
  },
  {
    icon: Pin,
    title: 'A US-based agent or team',
    body: 'Licensed and actively working buyers and sellers.',
  },
];

/* ── The guarantee seal ────────────────────────────────────── */
function Seal() {
  return (
    <div className="relative mx-auto h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]">
      {/* pulsing glow */}
      <div
        className="animate-pulse-glow absolute inset-6 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,162,39,0.55), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* rotating circular text */}
      <svg
        viewBox="0 0 340 340"
        className="animate-spin-slower absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id="sealText"
            d="M170,170 m-138,0 a138,138 0 1,1 276,0 a138,138 0 1,1 -276,0"
          />
        </defs>
        <text
          className="font-jakarta"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="3.5"
          fill="#8C6F1E"
        >
          <textPath href="#sealText" startOffset="0">
            20 QUALIFIED APPOINTMENTS · 30 DAYS · OR YOU DON&apos;T PAY ·
          </textPath>
        </text>
      </svg>

      {/* rotating conic ring */}
      <div className="absolute inset-[42px] rounded-full p-[3px]">
        <div className="conic-ring h-full w-full rounded-full" />
      </div>

      {/* inner seal */}
      <div
        className="absolute inset-[50px] flex flex-col items-center justify-center rounded-full text-center"
        style={{
          background: 'radial-gradient(70% 70% at 50% 25%, #2A2620, #14110B)',
          boxShadow:
            'inset 0 4px 20px rgba(201,162,39,0.25), 0 26px 50px rgba(0,0,0,0.35)',
        }}
      >
        {/* drawn checkmark */}
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
          <motion.circle
            cx="31"
            cy="31"
            r="27"
            stroke="#C9A227"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M19 32.5l8.5 8.5L44 22"
            stroke="#E5C463"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div
          className="mt-2 font-jakarta text-6xl font-extrabold leading-none text-white"
          style={{ letterSpacing: '-0.05em' }}
        >
          20
        </div>
        <div className="mt-1 font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-ds-primary-light">
          appointments
        </div>
        <div className="mt-0.5 font-jakarta text-[11px] font-semibold text-white/55">
          in 30 days, or $0
        </div>
      </div>
    </div>
  );
}

export default function Guarantee() {
  return (
    <section id="guarantee" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* seal */}
            <Reveal variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>
              <Seal />
            </Reveal>

            {/* copy */}
            <div>
              <Reveal>
                <div className="sub-title mb-6">
                  <span className="sub-title-dot" />
                  The Guarantee
                </div>
              </Reveal>
              <h2
                className="mb-5 font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl"
                style={{ lineHeight: '1.08', letterSpacing: '-0.04em' }}
              >
                <SplitText text="20 qualified appointments" mode="char" />{' '}
                <span className="gradient-text-flow">or you don&apos;t pay.</span>
              </h2>
              <Reveal delay={0.1}>
                <p
                  className="mb-7 max-w-lg font-jakarta text-lg text-ds-muted"
                  style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
                >
                  No retainer trap, no vague deliverables. We commit to 20
                  qualified appointments on your calendar in the first 30 days.
                  Miss it, and you don&apos;t pay. It&apos;s that simple, because
                  we only win when you do.
                </p>
              </Reveal>

              {/* requirements */}
              <Reveal delay={0.15}>
                <p className="mb-3 font-jakarta text-[11px] font-bold uppercase tracking-[0.14em] text-ds-subtle">
                  This offer is a fit if you have
                </p>
              </Reveal>
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mb-8 space-y-3"
              >
                {REQS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <motion.div
                      key={r.title}
                      variants={fadeUp}
                      className="flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-ds-bg/50 p-4"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-ds-heading text-ds-primary-light">
                        <Icon size={20} />
                      </span>
                      <div className="flex-1">
                        <div className="font-jakarta text-sm font-extrabold text-ds-heading">
                          {r.title}
                        </div>
                        <div className="font-jakarta text-xs text-ds-muted">
                          {r.body}
                        </div>
                      </div>
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#22A559] text-white">
                        <Check size={14} />
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              <Reveal delay={0.2}>
                <MagneticButton
                  href={BOOK_URL}
                  className="btn-accent h-14 px-9 text-base"
                  cursorText="Claim it →"
                >
                  <span className="relative z-10">See if you qualify</span>
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
