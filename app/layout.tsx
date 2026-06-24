import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SkipLink from '@/components/SkipLink';
import {
  medicalClinicJsonLd,
  webSiteJsonLd,
  faqJsonLd,
  serializeJsonLd,
} from '@/lib/structured-data';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://srirudra.in';
const TITLE = 'Sri Rudra Rehabilitation & Healing Institute';
const DESCRIPTION =
  'Sri Rudra — premier doctor-led, 24×7 rehabilitation hospital in Nalgonda for neuro, orthopedic, cardiac, ICU, pediatric and geriatric recovery.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Sri Rudra Rehabilitation & Healing Institute',
  },
  description: DESCRIPTION,
  applicationName: 'Sri Rudra',
  keywords: [
    'rehabilitation hospital Nalgonda',
    'neuro rehabilitation',
    'orthopedic rehab',
    'cardiac rehabilitation',
    'stroke recovery',
    'physiotherapy Nalgonda',
    'Sri Rudra',
    'Sri Rudra Rehab Center',
    'rehab center Nalgonda',
    'Telangana rehabilitation',
  ],
  authors: [{ name: 'Sri Rudra Rehabilitation & Healing Institute' }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sri Rudra',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        // 1200×630 social-share image (separate from the square logo so
        // Facebook/Twitter cards render at full bleed, not letterboxed).
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Rudra Rehabilitation & Healing Institute',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo.jpg', type: 'image/jpeg' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        {/* MedicalClinic + WebSite + FAQPage structured data for Google
            knowledge panel, local pack, and FAQ rich results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([
              medicalClinicJsonLd(),
              webSiteJsonLd(),
              faqJsonLd(),
            ]),
          }}
        />
      </head>
      <body className={`${inter.className} bg-brand-50 text-brand-900 antialiased`}>
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1 focus:outline-none" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
