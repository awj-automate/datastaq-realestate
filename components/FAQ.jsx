'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/Reveal';
import SplitText from '@/components/SplitText';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { faqs } from '@/lib/faqData';

/* Hide any inline [TODO ...] authoring notes from visitors. */
const clean = (s) => s.replace(/\s*\[TODO[^\]]*\]/g, '');

function Item({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div variants={fadeUp}>
      <div
        className={`group overflow-hidden rounded-2xl border transition-colors duration-300 ${
          isOpen
            ? 'border-ds-primary/40 bg-white'
            : 'border-black/[0.08] bg-white/70 hover:border-ds-primary/30'
        }`}
        style={
          isOpen
            ? { boxShadow: '0 16px 36px rgba(201,162,39,0.14)' }
            : undefined
        }
      >
        <button
          onClick={onToggle}
          data-cursor="hover"
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
          aria-expanded={isOpen}
        >
          <span
            className={`font-jakarta text-xs font-bold tabular-nums transition-colors ${
              isOpen ? 'text-ds-primary' : 'text-ds-subtle'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="flex-1 font-jakarta text-base font-bold text-ds-heading sm:text-lg"
            style={{ letterSpacing: '-0.02em' }}
          >
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen ? 'bg-ds-primary text-white' : 'bg-black/[0.05] text-ds-muted'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pl-[52px] sm:px-6 sm:pb-6 sm:pl-[60px]">
                <p
                  className="font-jakarta text-[15px] text-ds-muted"
                  style={{ letterSpacing: '-0.01em', lineHeight: '1.65' }}
                >
                  {clean(faq.a)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-ds-bg py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="content-wrap">
          <div className="mb-12 text-center lg:mb-16">
            <Reveal>
              <div className="sub-title mx-auto mb-6">
                <span className="sub-title-dot" />
                Questions
              </div>
            </Reveal>
            <h2
              className="mx-auto max-w-3xl font-jakarta text-4xl font-extrabold text-ds-heading sm:text-5xl lg:text-[3.5rem]"
              style={{ lineHeight: '1.1', letterSpacing: '-0.04em' }}
            >
              <SplitText text="Everything" mode="char" />{' '}
              <span className="gradient-text-flow">agents ask</span>
            </h2>
          </div>

          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mx-auto max-w-3xl space-y-3"
          >
            {faqs.map((faq, i) => (
              <Item
                key={i}
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 section-divider" />
    </section>
  );
}
