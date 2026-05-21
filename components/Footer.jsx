'use client';

import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';
import { BOOK_URL } from '@/lib/constants';

const navCols = [
  {
    head: 'The Offer',
    links: [
      { label: 'The Problem', href: '#problem' },
      { label: 'How It Works', href: '#process' },
      { label: 'Live Demo', href: '#demo' },
      { label: 'The Guarantee', href: '#guarantee' },
    ],
  },
  {
    head: 'Explore',
    links: [
      { label: 'Why Agents Choose It', href: '#why' },
      { label: 'Results', href: '#results' },
      { label: 'ROI Calculator', href: '#roi' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ds-bg pt-20 pb-10">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          {/* closing CTA */}
          <Reveal className="relative mb-16 text-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="opacity-[0.05]">
                <circle cx="210" cy="210" r="170" stroke="#C9A227" strokeWidth="1" strokeDasharray="8 6"
                  style={{ animation: 'dashScroll 6s linear infinite' }} />
                <circle cx="210" cy="210" r="128" stroke="#C9A227" strokeWidth="0.5" strokeDasharray="4 4"
                  style={{ animation: 'dashScroll 8s linear infinite reverse' }} />
              </svg>
            </div>
            <h2
              className="relative z-10 mb-7 font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-6xl"
              style={{ lineHeight: '1.06', letterSpacing: '-0.05em' }}
            >
              Your next 20 appointments
              <br />
              <span className="gradient-text">are one call away.</span>
            </h2>
            <MagneticButton
              href={BOOK_URL}
              className="btn-dark relative z-10 h-14 px-10 text-base"
              cursorText="Book now →"
            >
              Get My 20 Appointments
            </MagneticButton>
          </Reveal>

          <div className="section-divider mb-12" />

          {/* columns */}
          <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-4">
            {/* brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-9 w-9 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="DataStaq AI"
                    className="h-full w-full object-contain"
                    style={{ filter: 'brightness(0)' }}
                  />
                </div>
                <span className="font-jakarta text-lg font-extrabold tracking-tight text-ds-heading">
                  DataStaq<span className="gradient-text">AI</span>
                </span>
              </div>
              <p
                className="font-jakarta text-sm text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                AI voice agents for real estate teams — instant speed-to-lead
                and database reactivation, installed in the stack you already
                run.
              </p>
            </div>

            {navCols.map((col) => (
              <div key={col.head}>
                <h4 className="mb-5 font-jakarta text-[11px] font-semibold uppercase tracking-widest text-ds-heading">
                  {col.head}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        data-cursor="hover"
                        className="font-jakarta text-sm text-ds-muted transition-colors hover:text-ds-heading"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* contact */}
            <div>
              <h4 className="mb-5 font-jakarta text-[11px] font-semibold uppercase tracking-widest text-ds-heading">
                Get Started
              </h4>
              <p
                className="mb-5 font-jakarta text-sm text-ds-muted"
                style={{ letterSpacing: '-0.02em', lineHeight: '1.6' }}
              >
                See if your lead volume and database qualify for the 30-day
                guarantee.
              </p>
              <a href={BOOK_URL} className="btn-accent h-11 text-sm">
                Book a Strategy Call
              </a>
            </div>
          </div>

          <div className="section-divider mb-8" />

          {/* bottom */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-jakarta text-sm text-ds-subtle" style={{ letterSpacing: '-0.02em' }}>
              &copy; {new Date().getFullYear()} DataStaq AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {/* TODO: wire real legal pages before launch */}
              <a href="#book" className="font-jakarta text-xs text-ds-subtle transition-colors hover:text-ds-heading">
                Privacy
              </a>
              <a href="#book" className="font-jakarta text-xs text-ds-subtle transition-colors hover:text-ds-heading">
                Terms
              </a>
              <a
                href="#top"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#EBEBEB', boxShadow: '0 0 8px 0 #FFF inset' }}
                aria-label="Back to top"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 12V4M4.5 7.5L8 4l3.5 3.5" stroke="#3F3F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
