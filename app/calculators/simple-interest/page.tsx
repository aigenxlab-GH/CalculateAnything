import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { SimpleInterestCalc } from '@/components/calculators/SimpleInterestCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator: Instant SI for Any Loan or Deposit',
  description: 'Free simple interest calculator — ₹1L at 8% for 5 years = ₹40,000 interest, ₹1.4L total. Compute SI, total amount and return % for any combination. Instant.',
  keywords: ['simple interest calculator', 'SI calculator', 'simple interest formula', 'calculate simple interest India'],
  alternates: { canonical: '/calculators/simple-interest/' },
};

const faqs = [
  { q: 'What is simple interest?', a: 'Simple Interest (SI) is calculated only on the principal amount. It doesn\'t compound. SI = P × R × T / 100, where P = principal, R = rate per year, T = time in years.' },
  { q: 'When is simple interest used?', a: 'Simple interest is used for short-term loans, EMI calculations for the first period, car loans in some countries, personal loans, and rural lending. Banks in India typically use compound interest for deposits.' },
  { q: 'Simple interest vs compound interest — what\'s the difference?', a: 'In simple interest, interest is calculated only on principal. In compound interest, interest is calculated on principal + accumulated interest. Over time, compound interest generates significantly more returns.' },
  { q: 'When is simple interest used vs compound interest in real life?', a: 'Simple interest is used for most car loans and short-term borrowings where banks calculate interest on the original principal only. Compound interest applies to FDs, savings accounts, PPF, NSC and most investments. For borrowers, simple interest loans are cheaper than compound interest loans at the same stated rate.' },
  { q: 'How is simple interest calculated for a partial year?', a: 'SI = Principal x Rate x Time, where Time is in years. For 8 months: Time = 8/12 = 0.667 years. For 45 days: Time = 45/365 = 0.123 years. Banks often use exact day count for loans. The Simple Interest calculator handles any time period including fractions of years.' },
  { q: 'Do Indian banks use simple or compound interest for savings accounts?', a: 'Savings accounts technically pay simple interest calculated on daily balance but credited quarterly. This approximates monthly compound interest in practice. FDs pay compound interest with quarterly compounding for most banks. Home and car loans use the reducing balance method, similar to monthly compounding, not true simple interest.' },
  { q: 'Is simple interest or compound interest better for investors?', a: 'For investors, compound interest is always better - your earnings generate further earnings. For borrowers, simple interest loans are cheaper. Rs 1 lakh at 10% for 5 years: Simple Interest total = Rs 1.5L. Compound Interest total = Rs 1.61L. The compound interest instrument grows your wealth 7.3% faster over this period.' },
  { q: 'Can I use this calculator for inter-company loans and informal lending?', a: 'Yes. Simple interest applies to most informal and inter-company loans. Enter the principal, agreed annual rate, and exact tenure. For loans shorter than a year, enter the time in decimal (e.g., 0.5 for 6 months, 0.25 for 3 months). Indian tax law requires inter-company loans to charge at least 12% p.a. to avoid deemed dividend treatment — keep this in mind when structuring internal business lending.' },
];

const related = calculators.filter(c => ['compounding-calculator', 'fd-calculator', 'lumpsum-calculator'].includes(c.id));

export default function SimpleInterestPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Simple Interest" slug="simple-interest" />
      <CalculatorByline slug="simple-interest" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-slate-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Simple Interest Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate simple interest using the formula SI = P × R × T / 100. Compare with compound interest to see why long-term wealth grows faster with compounding.</p>
      </div>
      <SimpleInterestCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* SI vs CI worked examples */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Simple vs Compound Interest — Real Numbers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Principal</th>
                <th className="px-3 py-2 text-left border border-slate-100">Rate</th>
                <th className="px-3 py-2 text-left border border-slate-100">Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">Simple Interest</th>
                <th className="px-3 py-2 text-left border border-slate-100">Compound Interest</th>
                <th className="px-3 py-2 text-left border border-slate-100">Difference</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹1,00,000', '8%', '1 yr', '₹8,000', '₹8,000', '₹0'],
                ['₹1,00,000', '8%', '3 yr', '₹24,000', '₹25,971', '₹1,971'],
                ['₹1,00,000', '8%', '5 yr', '₹40,000', '₹46,933', '₹6,933'],
                ['₹1,00,000', '10%', '10 yr', '₹1,00,000', '₹1,59,374', '₹59,374'],
                ['₹5,00,000', '8%', '5 yr', '₹2,00,000', '₹2,34,664', '₹34,664'],
              ].map(row => (
                <tr key={row[2]} className="border-b border-slate-50 hover:bg-slate-50">
                  {row.map((v, i) => (
                    <td key={i} className={`px-3 py-2 border border-slate-100 ${i === 5 ? 'font-semibold text-emerald-700' : ''}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Compound interest calculated annually. The gap widens sharply after year 5 — which is why long-term savings should always use compounding instruments.</p>
      </section>

      {/* Where each type is used */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Where Simple vs Compound Interest Applies in India</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold text-slate-700 mb-2 text-xs uppercase tracking-wide">Simple Interest Used For</p>
            <ul className="space-y-1 text-slate-600 text-xs">
              <li>• Most car loans and short-term personal loans</li>
              <li>• Inter-company / informal loans</li>
              <li>• Interest on income tax refunds (Section 244A)</li>
              <li>• Partial period calculations on overdraft accounts</li>
              <li>• Court-ordered interest on pending payments</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-700 mb-2 text-xs uppercase tracking-wide">Compound Interest Used For</p>
            <ul className="space-y-1 text-slate-600 text-xs">
              <li>• All bank FDs and RDs (quarterly compounding)</li>
              <li>• PPF, NSC, EPF — all government savings schemes</li>
              <li>• Home loan EMIs (reducing balance = monthly compounding)</li>
              <li>• SIP / mutual fund NAV growth</li>
              <li>• Credit card outstanding balance (daily compounding)</li>
            </ul>
          </div>
        </div>
      </section>

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
        name: 'Simple Interest Calculator',
        url: 'https://calculate-today.com/calculators/simple-interest/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Simple interest calculator — compute interest and total amount for any principal, rate and time.',
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
      <RelatedGuides calculatorId="simple-interest" />
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
