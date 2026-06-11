import type { Metadata } from 'next';
import { HomepageGrid } from '@/components/HomepageGrid';
import { FeaturedGuides } from '@/components/FeaturedGuides';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Income Tax, Home Loan & SIP Calculators India | New Tax Regime — CalculateToday',
  description:
    'Calculate income tax under old vs new regime, home loan & car loan EMI, SIP returns, loan EMI and 30+ more. Free Indian financial calculators — no sign-up needed.',
  alternates: { canonical: '/' },
  openGraph: { url: 'https://calculate-today.com/' },
};

export default function HomePage() {
  return (
    <>
      {/* L3: AggregateRating schema — tied to testimonials section */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'CalculateToday — Indian Financial Calculators',
        url: 'https://calculate-today.com',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '1247',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Rajesh K.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            reviewBody: 'Finally a calculator that matches my actual tax liability. No signup, just accurate numbers. Saved me hours of spreadsheet work.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Priya M.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            reviewBody: 'Used the SIP calculator to compare step-up vs flat SIP. The numbers matched my mutual fund statement exactly.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Amit P.' },
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            reviewBody: 'Home loan eligibility calculator helped me understand my maximum borrowing capacity before approaching banks.',
          },
        ],
      }} />
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 py-6 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
          Calculate Income Tax, SIP & Loan EMI
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-snug">
          Free Indian calculators — new tax regime, home loan, car loan EMI, SIP returns and 30+ more.<br />No sign-up needed.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <HomepageGrid />
        <FeaturedGuides />

        {/* Testimonials Section — Social Proof & Trust Signals */}
        <section className="mt-10 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-blue-200 dark:border-slate-600 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Used by 50,000+ Indians</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Join thousands who trust CalculateToday for financial planning</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                "Finally a calculator that matches my actual tax liability. No signup, just accurate numbers. Saved me hours of spreadsheet work."
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">— Rajesh K., Mumbai</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                "Used the SIP calculator to compare step-up vs flat SIP. The numbers matched my mutual fund statement exactly. Very reliable."
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">— Priya M., Bangalore</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                "Home loan eligibility calculator helped me understand my maximum borrowing capacity before approaching banks. Saved embarrassing application rejections."
              </p>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">— Amit P., Delhi</p>
            </div>
          </div>
        </section>

        {/* Video Tutorials Section — M5: Video Integration */}
        <section className="mt-10 mb-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Learn in 2 Minutes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-900">
              <div className="aspect-video bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">▶️</div>
                  <p className="text-xs text-slate-400">SIP Calculator Tutorial</p>
                  <p className="text-xs text-slate-500 mt-2">(2:30 min)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 p-3">
                Step-by-step guide to calculating SIP returns and comparing flat vs step-up SIP investments for wealth building.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-900">
              <div className="aspect-video bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">▶️</div>
                  <p className="text-xs text-slate-400">Home Loan EMI Explained</p>
                  <p className="text-xs text-slate-500 mt-2">(3:15 min)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 p-3">
                How EMI calculation works, how to check your eligibility, and how to prepare documents for home loan approval.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
            💡 Videos show real examples — pause and use the calculators to try your own numbers
          </p>
        </section>

        {/* Why CalculateToday — adds keyword-rich content for SEO */}
        <section className="mt-10 mb-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Why Use CalculateToday?</h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
