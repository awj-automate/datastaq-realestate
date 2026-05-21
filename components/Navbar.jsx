'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { BOOK_URL } from '@/lib/constants';

const navLinks = [
  { label: 'The Problem', href: '#problem' },
  { label: 'How It Works', href: '#process' },
  { label: 'Live Demo', href: '#demo' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -110 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ds-bg/85 shadow-sm backdrop-blur-2xl' : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled
          ? '1px solid rgba(0,0,0,0.08)'
          : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <a href="#top" className="group flex items-center gap-3" data-cursor="hover">
            <div className="relative h-9 w-9 flex-shrink-0">
              <img
                src="/logo.png"
                alt="DataStaq AI"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:rotate-[18deg]"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <span className="font-jakarta text-xl font-extrabold tracking-heading text-ds-heading">
              DataStaq<span className="gradient-text">AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor="hover"
                className="group relative font-jakarta text-sm font-medium text-ds-muted transition-colors duration-200 hover:text-ds-heading"
                style={{ letterSpacing: '-0.02em' }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href={BOOK_URL} className="btn-dark h-11 text-sm">
              Get My 20 Appointments
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ds-muted transition-all hover:bg-black/5 hover:text-ds-heading md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open ? (
                <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h14M4 11h14M4 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-5 border-t border-black/5 bg-ds-bg px-6 py-6">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-jakarta text-base text-ds-muted transition-colors hover:text-ds-heading"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={BOOK_URL}
                onClick={() => setOpen(false)}
                className="btn-dark mt-2 w-full justify-center text-sm"
              >
                Get My 20 Appointments
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
