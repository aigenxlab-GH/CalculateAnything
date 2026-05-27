import type { Metadata } from 'next';
import { HomepageGrid } from '@/components/HomepageGrid';
import { FeaturedGuides } from '@/components/FeaturedGuides';

export const metadata: Metadata = {
  title: 'Free SIP, EMI, Loan & Tax Calculators India — CalculateToday',
  description:
    'Free, accurate online calculators for income tax, SIP, EMI, loans, GST and 30+ more. Built for India. No sign-up — instant results on any device.',
  alternates: { canonical: '/' },
  openGraph: { url: 'https://calculate-today.com/' },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
          Indian Financial Calculators
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-snug">
          Accurate Indian financial tools — income tax, SIP, EMI, loans and 30+ more. No sign-up.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <HomepageGrid />
        <FeaturedGuides />

        {/* Why CalculateToday — adds keyword-rich content for SEO */}
        <section className="mt-10 mb-4 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Why Use CalculateToday?</h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              CalculateToday offers 39+ free financial tools built for India — covering income tax (old &amp; new
              regime, FY 2025-26), SIP returns, EMI, home buying costs, GST, PPF, NPS, EPF, FD, RD, CAGR,
              inflation, brokerage, and more. Every result uses the latest{' '}
              <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RBI-published interest rates</a>,{' '}
              <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Income Tax India</a>{' '}
              slabs, and{' '}
              <a href="https://nsiindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">government-declared scheme rates</a>.
            </p>
            <p>
              No sign-up. No ads cluttering your results. Just accurate numbers in seconds. Whether you are
              planning to buy a home, estimating SIP maturity, comparing old vs new regime, working out GST on
              a product, or checking your PPF corpus at retirement — you will find the right tool here.
            </p>
            <p>
              Every tool works on mobile, tablet and desktop. Results update as you type, with year-by-year
              breakdowns and comparison panels where relevant. Bookmark any page for quick access — no account
              needed.
            </p>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-3 mt-1">
              Last updated: 27 May 2026 · All calculators are for informational purposes only and do not
              constitute financial, tax, or legal advice. Consult a qualified professional before making
              financial decisions.{' '}
              <a href="/about/" className="underline hover:text-slate-600">Editorial Policy</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
