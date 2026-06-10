import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageTracker } from '@/components/PageTracker';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'fallback', // 100ms window then uses system font — avoids 1.4s LCP delay from font chain
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'fallback',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculate-today.com'),
  title: {
    default: 'CalculateToday — Free Online Calculators',
    template: '%s | CalculateToday',
  },
  description:
    'Free, fast, and accurate online calculators for finance, health, business, and more. EMI, GST, BMI, PPC calculators — no sign-up required.',
  keywords: ['calculator', 'online calculator', 'EMI calculator', 'GST calculator', 'BMI calculator', 'PPC calculator'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CalculateToday',
    // Note: title/description/url intentionally omitted here.
    // Next.js auto-fills them from each page's title/description so social
    // previews are per-page, not generic homepage copy.
    images: [
      {
        url: 'https://calculate-today.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalculateToday — Free Indian Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    // title/description omitted — Next.js auto-fills from page metadata
    images: ['https://calculate-today.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        {/* llms.txt — AI/LLM crawler discoverability */}
        <link rel="llms" href="/llms.txt" />
        {/* Preconnect hints — establish early connections to third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Organization schema — Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CalculateToday',
            alternateName: 'Calculate Today',
            url: 'https://calculate-today.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://calculate-today.com/og-image.png',
              width: 1200,
              height: 630,
            },
            description: 'Free, accurate online calculators for income tax, SIP, EMI, GST, loans and 38+ more. Built for India. No sign-up required.',
            foundingDate: '2025',
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
            knowsAbout: [
              'Income Tax Calculation',
              'SIP Investment Planning',
              'EMI Calculation',
              'GST Calculator',
              'PPF and EPF Savings',
              'Home Loan Eligibility',
            ],
            sameAs: [
              'https://calculate-today.com',
            ],
          }) }}
        />
        {/* WebSite schema — enables Google Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CalculateToday',
            url: 'https://calculate-today.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://calculate-today.com/?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
        {/* Impact.com site verification — Semrush affiliate */}
        <meta name="impact-site-verification" content="4a9b06a9-aae2-48a7-89e5-366158718a9a" />
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[--background] text-[--foreground]">
        <ThemeProvider>
          {/* Skip to main content — accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>
          <PageTracker />
          <ScrollDepthTracker />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        {/* Google Analytics — lazyOnload defers 63KB of GTM JS until browser is idle */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F4NF1E8QEN"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F4NF1E8QEN');
          `}
        </Script>
      </body>
    </html>
  );
}
