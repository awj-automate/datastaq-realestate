import { DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { SITE_URL } from '@/lib/constants';

/* Face is DM Sans; the CSS variable keeps the `--font-jakarta`
   token name so design tokens stay shared with datastaq-agency-offer. */
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const TITLE =
  '20 Real Estate Appointments in 30 Days | AI Voice Agent by DataStaq AI';
const DESCRIPTION =
  'An AI voice agent for real estate agents that responds to new leads in under 60 seconds and reactivates the dead leads in your CRM. 20 qualified appointments in 30 days, or you don\'t pay.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'real estate AI voice agent',
    'speed to lead real estate',
    'real estate lead reactivation',
    'AI ISA for realtors',
    'real estate appointment setting',
    'CRM database reactivation',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'DataStaq AI',
    title: TITLE,
    description: DESCRIPTION,
    // TODO: add /public/og-image.png (1200x630) before launch
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DataStaq AI: AI Voice Agent for Real Estate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-jakarta antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
