import type { Metadata } from 'next';
import { HomepageGrid } from '@/components/HomepageGrid';
import { FeaturedGuides } from '@/components/FeaturedGuides';

export const metadata: Metadata = {
  title: 'Free SIP, EMI, Loan & Tax Calculators India — CalculateToday',
  description:
    'Free, accurate online calculators for income tax, SIP, EMI, home loan, GST and 30+ more. Designed for India. No sign-up required. Instant results on any device.',
  alternates: { canonical: '/' },
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
          Accurate, instant calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up.
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
              CalculateToday offers 39+ free financial calculators built specifically for India — covering
              income tax (old &amp; new regime for FY 2025-26), SIP returns, EMI for home loans, car loans
              and personal loans, GST, PPF, NPS, EPF, FD, RD, CAGR, inflation, brokerage, and more. Every
              calculator uses the latest FY 2025-26 tax slabs, RBI-published interest rates, and
              government-declared scheme rates.
            </p>
            <p>
              No sign-up. No ads cluttering the results. Just accurate numbers in seconds. Whether you are
              planning a home loan, estimating SIP maturity, comparing old vs new tax regime, calculating
              GST on a product, or checking your PPF corpus at retirement — you will find the right tool here.
            </p>
            <p>
              All calculators work on mobile, tablet and desktop. Results update instantly as you type, with
              year-by-year breakdowns and comparison panels where relevant. Bookmark any calculator for quick
              access — no account needed.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
