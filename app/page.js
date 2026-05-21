/*
  ═══════════════════════════════════════════════════════════════════════
  PAGE — Real Estate AI Voice Agent landing page ("/")
  ───────────────────────────────────────────────────────────────────────
  Server component: renders SEO metadata (see app/layout.js) + JSON-LD,
  then composes the section components. All animation lives inside the
  client components below.

  ⚠️  BEFORE LAUNCH
    • /public/og-image.png (1200x630) — referenced in app/layout.js
    • Wire the real scheduler embed in components/FinalCTA.jsx
    • Confirm placeholder stats — search the repo for "TODO"
  ═══════════════════════════════════════════════════════════════════════
*/

import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Process from '@/components/Process';
import SectionDivider from '@/components/SectionDivider';
import Demo from '@/components/Demo';
import Differentiation from '@/components/Differentiation';
import Results from '@/components/Results';
import ROICalculator from '@/components/ROICalculator';
import Guarantee from '@/components/Guarantee';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { faqs } from '@/lib/faqData';
import { SITE_URL } from '@/lib/constants';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'DataStaq AI',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
    },
    {
      '@type': 'Service',
      name: 'AI Voice Agent for Real Estate Agents',
      serviceType: 'AI voice agent — speed-to-lead and CRM database reactivation',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'US',
      description:
        'An AI voice agent installed inside a real estate agent\'s existing stack that responds to new inbound leads in under 60 seconds and systematically reactivates an existing database of 500+ leads — qualifying buyers and sellers and booking appointments directly to calendar.',
      audience: {
        '@type': 'BusinessAudience',
        name: 'US real estate agents and teams with 30+ new inbound leads per month and a database of 500+ existing leads',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a.replace(/\s*\[TODO[^\]]*\]/g, ''),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <Process />
        <SectionDivider topColor="#FFFFFF" fill="#14110B" />
        <Demo />
        <SectionDivider topColor="#14110B" fill="#F5F0E1" />
        <Differentiation />
        <Results />
        <ROICalculator />
        <Guarantee />
        <FAQ />
        <SectionDivider topColor="#F5F0E1" fill="#14110B" />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
