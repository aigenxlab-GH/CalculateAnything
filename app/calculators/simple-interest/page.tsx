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

export const metadata: Metadata = {
  title: 'Simple Interest Calculator — Calculate SI, Amount & Interest Earned',
  description: 'Free simple interest calculator — calculate simple interest, total amount payable/receivable for any principal, rate and time period. Instant SI formula results.',
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
