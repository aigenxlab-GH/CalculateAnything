import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageTracker } from '@/components/PageTracker';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        {/* Organization schema — Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CalculateToday',
            url: 'https://calculate-today.com',
            logo: 'https://calculate-today.com/og-image.png',
            description: 'Free, accurate online calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up required.',
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
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <PageTracker />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F4NF1E8QEN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
