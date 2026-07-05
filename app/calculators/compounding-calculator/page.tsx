import type { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CompoundingCalc } from '@/components/calculators/CompoundingCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Compound Interest: When Does ₹1 Lakh Double at 12%?',
  description: 'Free compound interest calculator — ₹1L at 12% doubles in just 6 years (Rule of 72). See exact growth with daily, monthly, quarterly or annual compounding.',
  keywords: ['compound interest calculator', 'compounding calculator India', 'compound interest formula', 'quarterly compounding'],
  alternates: { canonical: '/calculators/compounding-calculator/' },
};

const faqs = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It\'s often called "interest on interest" and grows your wealth exponentially over time.' },
  { q: 'How does compounding frequency affect returns?', a: 'More frequent compounding gives higher returns. Monthly compounding at 10% gives ~10.47% effective annual rate, while annual compounding gives exactly 10%. The difference grows with time.' },
  { q: 'Formula for compound interest?', a: 'A = P × (1 + r/n)^(n×t), where P = principal, r = annual rate (decimal), n = compounding periods per year, t = years.' },
  { q: 'What is the Rule of 72 and how does it relate to compounding?', a: 'Rule of 72: divide 72 by the annual interest rate to find the years needed to double your money. At 8%: 9 years to double. At 12%: 6 years. At 6%: 12 years. This is a quick mental shortcut - the compounding calculator gives the exact figures for any rate.' },
  { q: 'How much does compounding frequency affect returns?', a: 'For Rs 1 lakh at 8% over 10 years: Annual = Rs 2.159L, Quarterly = Rs 2.208L, Monthly = Rs 2.219L, Daily = Rs 2.225L. The difference is real but modest. The bigger impact is the interest rate itself and the investment duration - an extra 2% rate far outweighs daily vs monthly compounding.' },
  { q: 'Which Indian investments use compound interest?', a: 'All equity mutual funds, PPF, NSC, FDs, RDs, and NPS use compounding. PPF compounds annually at 7.1%. FDs compound quarterly for most banks. Mutual fund NAV compounds continuously as the fund reinvests gains. SIPs compound both the return on each unit and the frequency of new unit purchases.' },
  { q: 'What is the practical difference between simple and compound interest over 10 years?', a: 'On Rs 1 lakh for 10 years at 8%: Simple Interest earns Rs 80,000 (total Rs 1.8L). Compound Interest earns Rs 1,15,892 (total Rs 2.15L). That is Rs 35,892 more from compounding alone. The gap widens dramatically over 20-30 years, making compound instruments far superior for long-term wealth building.' },
  { q: 'How long does it take to double money using the Rule of 72?', a: 'Rule of 72: divide 72 by your annual return rate to get the approximate years to double your money. At 6% (PPF rate): 72/6 = 12 years to double. At 8% (FD rate): 9 years. At 12% (equity SIP): 6 years. At 15% (mid-cap funds): 4.8 years. This means Rs 1 lakh in an equity SIP at 12% becomes Rs 16 lakh in 24 years (four doublings), illustrating the exponential power of compounding.' },
];

const related = calculators.filter(c => ['simple-interest', 'fd-calculator', 'lumpsum-calculator'].includes(c.id));

export default function CompoundingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Compounding Calculator" slug="compounding-calculator" />
      <CalculatorByline slug="compounding-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Zap className="w-4 h-4 text-yellow-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Compound Interest Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate compound interest with different frequencies and compare how monthly, quarterly, or annual compounding impacts your final returns.</p>
      </div>
      <CompoundingCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* How compound interest works — worked example */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">How Compound Interest Works — ₹1 Lakh at 12%</h2>
        <p className="text-xs text-slate-500 mb-3">
          Compounding means your returns also earn returns. At 12% annual return, ₹1 lakh doesn&apos;t grow by ₹12,000 every year — it grows by <em>more</em> each year because the base grows. By year 10, you&apos;re earning ₹37,000 in a single year on an investment that started at just ₹1 lakh.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[460px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Year</th>
                <th className="px-3 py-2 text-left border border-slate-100">Opening Balance</th>
                <th className="px-3 py-2 text-left border border-slate-100">Interest Earned</th>
                <th className="px-3 py-2 text-left border border-slate-100">Closing Balance</th>
                <th className="px-3 py-2 text-left border border-slate-100">Simple Interest (for comparison)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['1', '₹1,00,000', '₹12,000', '₹1,12,000', '₹1,12,000'],
                ['3', '₹1,25,440', '₹15,053', '₹1,40,493', '₹1,36,000'],
                ['5', '₹1,57,352', '₹18,882', '₹1,76,234', '₹1,60,000'],
                ['10', '₹2,47,596', '₹29,712', '₹3,10,585', '₹2,20,000'],
                ['15', '₹4,47,358', '₹53,683', '₹5,47,357', '₹2,80,000'],
                ['20', '₹8,64,629', '₹1,03,756', '₹9,64,629', '₹3,40,000'],
                ['30', '₹2,99,599', '₹35,952', '₹29,95,992', '₹4,60,000'],
              ].map(([yr, open, int, close, si]) => (
                <tr key={yr} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">Year {yr}</td>
                  <td className="px-3 py-2 border border-slate-100">{open}</td>
                  <td className="px-3 py-2 border border-slate-100 text-emerald-700 font-medium">{int}</td>
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{close}</td>
                  <td className="px-3 py-2 border border-slate-100 text-slate-400">{si}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Principal: ₹1,00,000, Rate: 12% p.a. annual compounding. Note the exponential gap between compound and simple interest by year 20–30 — this is the core reason long-term equity investing in India builds wealth so effectively.</p>
      </section>

      {/* Compounding frequency comparison */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Compounding Frequency Comparison — ₹1 Lakh at 8% for 10 Years</h2>
        <p className="text-xs text-slate-500 mb-3">
          More frequent compounding gives a higher effective annual yield. Banks quote FD rates as annual rates but compound quarterly — that&apos;s actually better than annual compounding at the same stated rate. The difference between monthly and daily compounding is negligible in practice.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Compounding</th>
                <th className="px-3 py-2 text-left border border-slate-100">Effective Annual Rate</th>
                <th className="px-3 py-2 text-left border border-slate-100">Value After 10 Yrs</th>
                <th className="px-3 py-2 text-left border border-slate-100">Extra Earnings</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['Annual', '8.00%', '₹2,15,892', '—'],
                ['Semi-Annual', '8.16%', '₹2,19,112', '+₹3,220'],
                ['Quarterly', '8.24%', '₹2,20,804', '+₹4,912'],
                ['Monthly', '8.30%', '₹2,21,964', '+₹6,072'],
                ['Daily', '8.33%', '₹2,22,534', '+₹6,642'],
              ].map(([freq, ear, val, extra]) => (
                <tr key={freq} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-medium">{freq}</td>
                  <td className="px-3 py-2 border border-slate-100">{ear}</td>
                  <td className="px-3 py-2 border border-slate-100 font-semibold text-emerald-700">{val}</td>
                  <td className="px-3 py-2 border border-slate-100 text-slate-500">{extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Takeaway: the rate itself matters far more than frequency. Moving from 8% to 10% annual compounding adds ₹59,000+ over 10 years — far more than switching from annual to daily compounding at the same rate (₹6,642 extra).</p>
      </section>

      <FdRateTable principal={100000} tenureYears={5} mode="fd" />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Compound Interest Calculator',
        url: 'https://calculate-today.com/calculators/compounding-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Compound interest calculator — compute growth with daily, monthly, quarterly or annual compounding.',
      }} />
      <InContentAd format="horizontal" className="mb-6" variant="faq" />

      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(f => (
            <div key={f.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{f.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedGuides calculatorId="compounding-calculator" />
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
