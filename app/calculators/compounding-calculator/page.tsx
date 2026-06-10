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
            <Zap className="w-4 h-4 text-yellow-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Compound Interest Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate compound interest with different frequencies and compare how monthly, quarterly, or annual compounding impacts your final returns.</p>
      </div>
      <CompoundingCalc />
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
