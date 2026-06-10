import type { Metadata } from 'next';
import { TrendingDown } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { InflationCalc } from '@/components/calculators/InflationCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Inflation Calculator: What Will ₹1 Lakh Be Worth in 2045?',
  description: "Free inflation calculator India — at 6% inflation, ₹1L today = just ₹31K in 2045. See purchasing power erosion and how much savings you need to beat inflation.",
  keywords: ['inflation calculator India', 'future cost calculator', 'purchasing power calculator', 'inflation rate India'],
  alternates: { canonical: '/calculators/inflation-calculator/' },
};

const faqs = [
  { q: 'What is the average inflation rate in India?', a: 'India\'s CPI inflation has averaged around 5–7% per year over the past decade. For planning purposes, use 6% as a conservative estimate.' },
  { q: 'How does inflation affect savings?', a: 'If your savings earn 6% and inflation is 6%, your real return is 0% — your purchasing power doesn\'t grow. To beat inflation, your investments should return more than the inflation rate.' },
  { q: 'What items in India have high inflation?', a: 'Education costs inflate at 10–12% annually. Healthcare at 8–10%. Food at 5–7%. Real estate in metros at 5–8%. Planning with category-specific inflation rates gives more accurate results.' },
  { q: 'How does inflation erode FD returns in practice?', a: 'If your FD earns 7% but inflation is 6%, your real return is only 1%. After 30% tax on FD interest, post-tax return is 4.9% - negative in real terms at 6% inflation. This is why money kept in FDs loses purchasing power over time - the nominal return masks the inflation erosion.' },
  { q: 'What is real return and how do I calculate it?', a: 'Real Return = (1 + Nominal Return) divided by (1 + Inflation Rate) minus 1. Example: 12% equity fund with 6% inflation: Real Return = (1.12/1.06) - 1 = 5.66%. While you appear to earn 12%, your actual purchasing power grows at only 5.66%. Equity is one of the few asset classes that consistently beats inflation in India over 10+ year periods.' },
  { q: 'Which assets are the best inflation hedges in India?', a: 'Historical evidence for India: Equity (Nifty 50 CAGR ~13%) far beats CPI inflation (~6%). Real estate has beaten inflation in metro areas but with liquidity risk. Gold (CAGR ~10% over 20 years) is a reasonable hedge. PPF and NSC at 7-7.7% barely beat inflation after tax. FDs and savings accounts lose to inflation in real terms.' },
  { q: 'How much money will I need in 20 years to match Rs 1 lakh today?', a: 'At 6% average inflation: Rs 1 lakh today equals Rs 3.2 lakh in 20 years. At 7% inflation it equals Rs 3.87 lakh. The Inflation Calculator does this instantly for any amount and time period. Use this to plan retirement expenses: if you need Rs 60,000/month today, you may need Rs 1.9-2.3 lakh/month in 20 years.' },
  { q: 'What is the RBI inflation target and how is India CPI measured?', a: "RBI's Monetary Policy Committee (MPC) targets CPI inflation at 4% (+/- 2% tolerance band, i.e., 2-6%). India's CPI is measured by the Ministry of Statistics (MOSPI) monthly using prices of a fixed basket of goods: food and beverages (46% weight), housing (10%), fuel (7%), and miscellaneous (37%). Food inflation is the biggest driver of CPI volatility in India. The RBI uses CPI (not WPI) as its primary inflation benchmark for interest rate decisions. When CPI exceeds 6% for three consecutive quarters, the RBI must explain the breach to the government." },
];

const related = calculators.filter(c => ['sip-calculator', 'retirement-fire', 'cagr-calculator'].includes(c.id));

export default function InflationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Inflation Calculator" slug="inflation-calculator" />
      <CalculatorByline slug="inflation-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Inflation Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Find out how much today&apos;s money will be worth in the future, and how much more you&apos;ll need to maintain the same lifestyle with inflation.</p>
      </div>
      <InflationCalc />
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
        name: 'Inflation Calculator',
        url: 'https://calculate-today.com/calculators/inflation-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Inflation calculator — compute the future cost of today\'s expenses and purchasing power erosion.',
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
      <RelatedGuides calculatorId="inflation-calculator" />
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
