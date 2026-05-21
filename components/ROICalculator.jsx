'use client';

/*
  ── ROI MODEL — assumptions (tune here) ──────────────────────────
   INBOUND_RATE  share of new monthly leads that become a qualified
                 appointment once response time drops under 60s.
   DB_RATE       share of the existing database converted into a
                 qualified appointment per month of reactivation.
   These are deliberately conservative. [TODO: confirm before launch.]
  ─────────────────────────────────────────────────────────────────
*/

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { Bolt, Cabinet, Calendar } from '@/components/Icons';

const INBOUND_RATE = 0.22;
const DB_RATE = 0.03;

/* Spring-morphing number — animates smoothly as sliders move. */
function MorphNumber({ value, prefix = '', suffix = '', className = '' }) {
  const spring = useSpring(value, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  useEffect(() => spring.on('change', (v) => setDisplay(v)), [spring]);

  return (
    <span className={className}>
      {prefix}
      {Math.round(display).toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

function Slider({ label, icon, value, min, max, step, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 font-jakarta text-sm font-semibold text-ds-heading">
          <span className="text-ds-primary">{icon}</span>
          {label}
        </span>
        <span className="rounded-lg bg-ds-primary/10 px-2.5 py-1 font-jakarta text-sm font-extrabold tabular-nums text-ds-primary-dark">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ds-range"
        style={{
          background: `linear-gradient(90deg, #C9A227 0%, #E5C463 ${pct}%, rgba(0,0,0,0.08) ${pct}%, rgba(0,0,0,0.08) 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between font-jakarta text-[10px] font-medium text-ds-subtle">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [leads, setLeads] = useState(30);
  const [database, setDatabase] = useState(500);
  const [commission, setCommission] = useState(10000);
  const [closeRate, setCloseRate] = useState(15);

  const inboundAppts = Math.round(leads * INBOUND_RATE);
  const dbAppts = Math.round(database * DB_RATE);
  const totalAppts = inboundAppts + dbAppts;
  const closings = (totalAppts * closeRate) / 100;
  const monthlyRevenue = Math.round(closings * commission);
  const annualRevenue = monthlyRevenue * 12;

  const inboundPct = totalAppts ? (inboundAppts / totalAppts) * 100 : 50;

  return (
    <section id="roi" className="relative overflow-hidden bg-ds-bg py-20 lg:py-28">
      <div
        className="blob pointer-events-none absolute bottom-[10%] right-[6%] h-[360px] w-[360px]"
        style={{
          background: 'linear-gradient(96deg, #C9A227, #E5C463)',
          filter: 'blur(120px)',
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-12 text-center lg:mb-16">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                Run The Math
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="What this is worth" mode="char" />{' '}
              <span className="gradient-text-flow">to you</span>
            </h2>
            <Reveal delay={0.1}>
              <p
                className="mx-auto mt-5 max-w-2xl font-jakarta text-lg text-ds-muted"
                style={{ letterSpacing: '-0.02em' }}
              >
                Drag the sliders to match your business. The numbers update live.
              </p>
            </Reveal>
          </div>

          <Reveal variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
            <div className="card grid gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12">
              {/* sliders */}
              <div className="space-y-7">
                <Slider
                  label="New leads / month"
                  icon={<Bolt size={16} />}
                  value={leads}
                  min={30}
                  max={300}
                  step={5}
                  onChange={setLeads}
                  format={(v) => v.toLocaleString()}
                />
                <Slider
                  label="Leads in your database"
                  icon={<Cabinet size={16} />}
                  value={database}
                  min={500}
                  max={5000}
                  step={100}
                  onChange={setDatabase}
                  format={(v) => v.toLocaleString()}
                />
                <Slider
                  label="Avg. commission / closing"
                  icon={<Calendar size={16} />}
                  value={commission}
                  min={5000}
                  max={20000}
                  step={500}
                  onChange={setCommission}
                  format={(v) => `$${(v / 1000).toFixed(0)}K`}
                />
                <Slider
                  label="Appointment → close rate"
                  icon={<Calendar size={16} />}
                  value={closeRate}
                  min={5}
                  max={30}
                  step={1}
                  onChange={setCloseRate}
                  format={(v) => `${v}%`}
                />
              </div>

              {/* results */}
              <div className="flex flex-col justify-between rounded-[20px] bg-ds-heading p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-4">
                    <div className="font-jakarta text-[11px] font-semibold uppercase tracking-wide text-ds-primary-light">
                      Inbound appts
                    </div>
                    <MorphNumber
                      value={inboundAppts}
                      className="font-jakarta text-3xl font-extrabold text-white"
                    />
                    <div className="font-jakarta text-[10px] text-white/40">/ month</div>
                  </div>
                  <div className="rounded-2xl bg-white/[0.06] p-4">
                    <div className="font-jakarta text-[11px] font-semibold uppercase tracking-wide text-[#B69CF5]">
                      Database appts
                    </div>
                    <MorphNumber
                      value={dbAppts}
                      className="font-jakarta text-3xl font-extrabold text-white"
                    />
                    <div className="font-jakarta text-[10px] text-white/40">/ month</div>
                  </div>
                </div>

                {/* split bar */}
                <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="bg-gradient-to-r from-[#E5C463] to-[#C9A227]"
                    animate={{ width: `${inboundPct}%` }}
                    transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                  />
                  <div className="flex-1 bg-gradient-to-r from-[#8B6CF0] to-[#6D4FD6]" />
                </div>

                <div className="mt-4 rounded-2xl border border-ds-primary/25 bg-ds-primary/[0.12] p-4 text-center">
                  <div className="font-jakarta text-[11px] font-semibold uppercase tracking-wide text-ds-primary-light">
                    Total qualified appointments
                  </div>
                  <MorphNumber
                    value={totalAppts}
                    className="font-jakarta text-5xl font-extrabold text-white"
                  />
                  <div className="font-jakarta text-[11px] text-white/45">
                    every single month
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#8C6F1E] p-5 text-center">
                  <div className="font-jakarta text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                    Projected added revenue
                  </div>
                  <MorphNumber
                    value={monthlyRevenue}
                    prefix="$"
                    className="block font-jakarta text-[2.6rem] font-extrabold leading-tight text-white sm:text-5xl"
                  />
                  <div className="font-jakarta text-xs font-semibold text-white/80">
                    per month &nbsp;·&nbsp;{' '}
                    <MorphNumber value={annualRevenue} prefix="$" /> / year
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-6 text-center">
            <p className="font-jakarta text-xs text-ds-subtle">
              Estimates based on conservative conversion assumptions — not a
              guarantee of results. The 30-day appointment guarantee terms are
              below.
            </p>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        .ds-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 100px;
          outline: none;
          cursor: pointer;
        }
        .ds-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(60% 60% at 50% 30%, #fff, #f0e6c8);
          border: 3px solid #c9a227;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.45);
          transition: transform 0.15s ease;
        }
        .ds-range::-webkit-slider-thumb:hover {
          transform: scale(1.18);
        }
        .ds-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(60% 60% at 50% 30%, #fff, #f0e6c8);
          border: 3px solid #c9a227;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.45);
        }
      `}</style>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
