'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import TiltCard from '@/components/TiltCard';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { Stopwatch, Phoenix, Puzzle, Repeat, Pin, Shield } from '@/components/Icons';

const CARDS = [
  {
    icon: Stopwatch,
    title: 'Under 60 seconds, 24/7',
    body: 'Every new lead gets a call before it cools: nights, weekends, holidays. Speed is the entire game, and the AI never misses.',
    anim: { rotate: [0, -10, 10, 0] },
    dur: 3,
  },
  {
    icon: Phoenix,
    title: 'Reactivates your dead database',
    body: 'It works methodically through the 500+ old leads you already paid for, and turns the forgotten ones into booked appointments.',
    anim: { scale: [1, 1.12, 1], y: [0, -3, 0] },
    dur: 2.6,
  },
  {
    icon: Puzzle,
    title: 'Works with your existing stack',
    body: 'No rip-and-replace. The AI installs inside your current CRM, dialer, and lead sources. It snaps into what you already run.',
    anim: { rotate: [0, 14, 0], scale: [1, 1.08, 1] },
    dur: 3.2,
  },
  {
    icon: Repeat,
    title: 'Persistent follow-ups built in',
    body: 'Most leads need 6+ touches. The AI follows up relentlessly on a smart cadence until the lead books or clearly opts out.',
    anim: { rotate: [0, 360] },
    dur: 5,
  },
  {
    icon: Pin,
    title: 'US-based team behind it',
    body: 'A real American team builds, monitors, and tunes your agent every week. You get a partner, not a tool you were handed.',
    anim: { y: [0, -5, 0] },
    dur: 2.4,
  },
  {
    icon: Shield,
    title: 'Pay only if we deliver',
    body: '20 qualified appointments in 30 days, or you do not pay. The guarantee is the offer. We only win when you do.',
    anim: { scale: [1, 1.1, 1] },
    dur: 2.8,
  },
];

function Card({ card, index }) {
  const Icon = card.icon;
  return (
    <motion.div variants={fadeUp}>
      <TiltCard
        max={11}
        className="group relative h-full rounded-[22px]"
      >
        <div className="gradient-border h-full rounded-[22px]">
          <div className="relative h-full rounded-[20px] bg-white/85 p-7 backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_24px_55px_rgba(201,162,39,0.22)]">
            {/* index watermark */}
            <span
              className="pointer-events-none absolute right-5 top-3 font-jakarta text-5xl font-extrabold text-ds-primary/[0.07]"
              style={{ letterSpacing: '-0.05em' }}
            >
              0{index + 1}
            </span>

            {/* animated icon */}
            <div className="mb-5 inline-flex">
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                style={{
                  background: 'radial-gradient(58% 64% at 50% 8%, #E5C463, #C9A227)',
                  boxShadow: '0 10px 26px rgba(201,162,39,0.35)',
                }}
              >
                {index === 4 && (
                  <span className="pulse-ring absolute inset-0 rounded-2xl bg-ds-primary/40" />
                )}
                <motion.span
                  className="relative"
                  animate={card.anim}
                  transition={{
                    duration: card.dur,
                    repeat: Infinity,
                    ease: index === 3 ? 'linear' : 'easeInOut',
                  }}
                >
                  <Icon size={26} />
                </motion.span>
              </span>
            </div>

            <h3
              className="mb-2 font-jakarta text-lg font-extrabold text-ds-heading"
              style={{ letterSpacing: '-0.03em' }}
            >
              {card.title}
            </h3>
            <p
              className="font-jakarta text-sm text-ds-muted"
              style={{ letterSpacing: '-0.01em', lineHeight: '1.6' }}
            >
              {card.body}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Differentiation() {
  return (
    <section id="why" className="relative overflow-hidden bg-ds-bg py-20 lg:py-28">
      <div
        className="blob pointer-events-none absolute left-[8%] top-[20%] h-[340px] w-[340px]"
        style={{
          background: 'linear-gradient(96deg, #C9A227, #E5C463)',
          filter: 'blur(120px)',
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-14 text-center lg:mb-20">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                Why Agents Choose This
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="Not another" mode="char" />{' '}
              <span className="gradient-text-flow">lead tool</span>
            </h2>
            <Reveal delay={0.1}>
              <p
                className="mx-auto mt-5 max-w-2xl font-jakarta text-lg text-ds-muted"
                style={{ letterSpacing: '-0.02em' }}
              >
                Six reasons this outperforms hiring an ISA, buying a dialer, or
                bolting on yet another piece of software.
              </p>
            </Reveal>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CARDS.map((c, i) => (
              <Card key={c.title} card={c} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
