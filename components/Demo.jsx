'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { House, Cabinet, Check, Play, Pause, Phone } from '@/components/Icons';

/* ── Conversation scripts ──────────────────────────────────── */
const CONVOS = {
  inbound: {
    accent: '#C9A227',
    caller: 'Jordan Ellis',
    meta: 'New Zillow lead · 412 Lakeview Dr',
    age: 'lead age: 38 seconds',
    icon: House,
    lines: [
      { from: 'ai', text: "Hi Jordan, this is Morgan with the Carter Group — I saw you just asked about 412 Lakeview Drive. Is now an okay time?" },
      { from: 'lead', text: 'Oh — wow, that was fast. Yeah, sure.' },
      { from: 'ai', text: "Love it. Are you hoping to buy in the next few months, or just starting to look around?" },
      { from: 'lead', text: "Next couple of months, ideally. We're already pre-approved." },
      { from: 'ai', text: "Perfect. The listing agent has Saturday at 11 or 1 open for a private tour — which works better?" },
      { from: 'lead', text: 'Saturday at 11 is great.' },
      { from: 'ai', text: "Done — you're booked for Saturday at 11. A text confirmation is on its way. Talk soon!" },
    ],
  },
  reactivation: {
    accent: '#8B6CF0',
    caller: 'Dana Brooks',
    meta: 'Database lead · Maple Heights inquiry',
    age: 'lead age: 14 months',
    icon: Cabinet,
    lines: [
      { from: 'ai', text: "Hi Dana, it's Morgan following up from the Carter Group — you reached out about homes in Maple Heights a while back. Still on your radar?" },
      { from: 'lead', text: "Honestly that was over a year ago... but funny enough, we've been thinking about selling our place." },
      { from: 'ai', text: "That's great to hear. Are you thinking of listing soon, or still feeling it out?" },
      { from: 'lead', text: 'Probably this spring. Prices around here seem solid right now.' },
      { from: 'ai', text: "They are. Would a quick 20-minute valuation with one of our listing agents be useful?" },
      { from: 'lead', text: "Yeah — that would actually be really helpful." },
      { from: 'ai', text: "Great. I've got Thursday at 5:30 — booking it now and sending a confirmation. Appreciate you, Dana!" },
    ],
  },
};

/* ── Soundwave ─────────────────────────────────────────────── */
function SoundWave({ active, color }) {
  return (
    <div className="flex h-8 items-center gap-[3px]">
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            background: `linear-gradient(180deg, ${color}, ${color}66)`,
            animationDelay: `${(i % 9) * 0.07}s`,
            animationDuration: `${0.6 + (i % 6) * 0.12}s`,
            animationPlayState: active ? 'running' : 'paused',
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ── One animated call ─────────────────────────────────────── */
function CallDemo({ convo }) {
  const { lines, accent } = convo;
  const [playing, setPlaying] = useState(true);
  const [st, setSt] = useState({ idx: 0, text: '', hold: 0, phase: 'typing' });
  const scrollRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setSt({ idx: lines.length, text: '', hold: 0, phase: 'finished' });
    }
  }, [lines.length]);

  useEffect(() => {
    if (!playing || st.phase === 'finished') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const id = setInterval(() => {
      setSt((prev) => {
        if (prev.phase === 'finished') return prev;
        const msg = lines[prev.idx];
        if (prev.phase === 'holding') {
          if (prev.hold > 1) return { ...prev, hold: prev.hold - 1 };
          const next = prev.idx + 1;
          if (next >= lines.length) return { ...prev, phase: 'finished' };
          return { idx: next, text: '', hold: 0, phase: 'typing' };
        }
        if (prev.text.length < msg.text.length) {
          return { ...prev, text: msg.text.slice(0, prev.text.length + 1) };
        }
        return { ...prev, phase: 'holding', hold: 16 };
      });
    }, 22);
    return () => clearInterval(id);
  }, [playing, st.phase, lines]);

  // auto-loop after finishing
  useEffect(() => {
    if (st.phase !== 'finished') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = setTimeout(
      () => setSt({ idx: 0, text: '', hold: 0, phase: 'typing' }),
      4200,
    );
    return () => clearTimeout(t);
  }, [st.phase]);

  // keep transcript scrolled to newest line
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [st]);

  const finished = st.phase === 'finished';
  const shown = finished ? lines : lines.slice(0, st.idx);
  const typing = !finished ? lines[st.idx] : null;
  const aiSpeaking = !finished && typing?.from === 'ai' && st.phase === 'typing';

  return (
    <div className="card-glass-dark overflow-hidden">
      {/* call header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-white"
            style={{ background: `radial-gradient(50% 58% at 50% 95%, ${accent}, ${accent}aa)` }}
          >
            <convo.icon size={20} />
          </div>
          <div className="leading-tight">
            <div className="font-jakarta text-sm font-bold text-white">{convo.caller}</div>
            <div className="font-jakarta text-[11px] text-ds-primary-light/80">{convo.meta}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
            <span className="font-jakarta text-[11px] font-semibold text-[#22C55E]">
              AI on the line
            </span>
          </div>
          <div className="font-jakarta text-[10px] text-white/45">{convo.age}</div>
        </div>
      </div>

      {/* transcript */}
      <div
        ref={scrollRef}
        className="h-[330px] space-y-3 overflow-y-auto px-5 py-5"
        data-lenis-prevent
      >
        {shown.map((l, i) => (
          <Bubble key={i} line={l} accent={accent} />
        ))}
        {typing && (st.text || st.phase === 'typing') && (
          <Bubble line={{ ...typing, text: st.text }} accent={accent} caret />
        )}
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            className="flex items-center gap-2.5 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E] text-white">
              <Check size={15} />
            </span>
            <div>
              <div className="font-jakarta text-[12px] font-bold text-[#5BE498]">
                Appointment booked &amp; synced to CRM
              </div>
              <div className="font-jakarta text-[10px] text-white/50">
                Detailed call notes logged automatically
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* controls */}
      <div className="flex items-center gap-4 border-t border-white/10 px-5 py-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          data-cursor="hover"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
          style={{ background: `radial-gradient(50% 58% at 50% 5%, ${accent}, ${accent}cc)` }}
          aria-label={playing ? 'Pause sample call' : 'Play sample call'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? 'pause' : 'play'}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
        <div className="flex-1">
          <SoundWave active={playing && aiSpeaking} color={accent} />
        </div>
        <span className="font-jakarta text-[11px] font-semibold text-white/55">
          {playing ? 'Listening to sample call' : 'Sample call paused'}
        </span>
      </div>
    </div>
  );
}

function Bubble({ line, accent, caret }) {
  const isAI = line.from === 'ai';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[82%] ${isAI ? '' : 'text-right'}`}>
        <div
          className={`mb-1 font-jakarta text-[9px] font-bold uppercase tracking-[0.12em] ${
            isAI ? 'text-ds-primary-light/70' : 'text-white/40'
          }`}
        >
          {isAI ? 'AI Voice Agent' : line.from === 'lead' ? 'Lead' : ''}
        </div>
        <div
          className={`rounded-2xl px-3.5 py-2.5 font-jakarta text-[12.5px] leading-snug ${
            isAI ? 'rounded-tl-sm text-white' : 'rounded-tr-sm text-white'
          }`}
          style={{
            background: isAI
              ? 'rgba(255,255,255,0.08)'
              : `linear-gradient(135deg, ${accent}, ${accent}99)`,
            border: isAI ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        >
          {line.text}
          {caret && (
            <span
              className="ml-0.5 inline-block h-[13px] w-[2px] -translate-y-[1px] align-middle"
              style={{ background: isAI ? '#E5C463' : '#fff', animation: 'twinkle 0.8s steps(1) infinite' }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Demo() {
  const [tab, setTab] = useState('inbound');
  const tabs = [
    { id: 'inbound', label: 'Inbound Lead Call', icon: House },
    { id: 'reactivation', label: 'Database Reactivation Call', icon: Cabinet },
  ];

  return (
    <section
      id="demo"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #14110B, #221C12 55%, #14110B)' }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[680px] -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(201,162,39,0.18), transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-10 text-center lg:mb-14">
            <Reveal>
              <div
                className="sub-title mx-auto mb-6"
                style={{ color: '#E5C463', background: 'rgba(201,162,39,0.12)' }}
              >
                <span className="sub-title-dot" />
                Hear It Live
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-white sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="This is what your" mode="char" />{' '}
              <span className="gradient-text-flow">leads will hear</span>
            </h2>
            <Reveal delay={0.1}>
              <p
                className="mx-auto mt-5 max-w-2xl font-jakarta text-lg text-white/65"
                style={{ letterSpacing: '-0.02em' }}
              >
                Natural, conversational, and impossible to tell from a trained
                ISA. Toggle between a brand-new inbound lead and a 14-month-old
                database lead.
              </p>
            </Reveal>
          </div>

          {/* tabs */}
          <Reveal className="mb-8 flex justify-center">
            <div className="inline-flex flex-col gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 sm:flex-row">
              {tabs.map((t) => {
                const Icon = t.icon;
                const on = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    data-cursor="hover"
                    className="relative flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-jakarta text-[13px] font-bold transition-colors"
                  >
                    {on && (
                      <motion.span
                        layoutId="demo-tab"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'radial-gradient(62% 82% at 28% -10%, rgba(255,255,255,0.2), transparent), #C9A227',
                        }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-2 ${on ? 'text-white' : 'text-white/55'}`}>
                      <Icon size={16} />
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* call panel */}
          <Reveal variants={{ hidden: { opacity: 0, y: 40, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
              >
                <CallDemo convo={CONVOS[tab]} />
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 flex items-center justify-center gap-2 text-center">
            <Phone size={15} className="text-ds-primary-light" />
            <span className="font-jakarta text-sm text-white/55">
              On any call with real intent, the AI can warm-transfer straight to
              you — live.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
