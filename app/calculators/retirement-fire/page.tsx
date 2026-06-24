import type { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { FIRECalc } from '@/components/calculators/FIRECalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'FIRE Calculator: How Much to Retire at 45 in India?',
  description: 'Free FIRE/retirement calculator — spending ₹1L/month? You need ₹3Cr corpus (4% rule). Find your FIRE number, target retirement age and monthly savings needed.',
  keywords: ['FIRE calculator India', 'financial independence calculator', 'early retirement calculator', 'FIRE number calculator'],
  alternates: { canonical: '/calculators/retirement-fire/' },
};

const faqs = [
  { q: 'What is the FIRE movement?', a: 'FIRE stands for Financial Independence, Retire Early. The goal is to accumulate enough wealth that investment returns cover all living expenses, allowing you to stop working whenever you choose.' },
  { q: 'What is the 4% rule?', a: 'The 4% rule (Trinity Study) says you can safely withdraw 4% of your portfolio annually without depleting it over 30 years. So FIRE corpus = 25× your annual expenses.' },
  { q: 'What is the FIRE corpus needed in India?', a: 'For monthly expenses of ₹50,000 (₹6L/year), FIRE corpus = 25 × ₹6L = ₹1.5 Crore. For ₹1L/month expenses: ₹3 Crore. However, inflation and India-specific factors should be considered.' },
  { q: 'How do I achieve FIRE faster?', a: '(1) Increase income (skills, promotion, side income), (2) Reduce expenses (higher savings rate), (3) Invest aggressively in equity SIPs, (4) Avoid lifestyle inflation, (5) Pay off debt quickly.' },
  { q: 'Does the 4% rule work for retirement planning in India?', a: 'The 4% rule (from the US Trinity Study) may be aggressive for India due to higher inflation of 5-7% vs US 2-3%. Many Indian financial planners suggest a 3-3.5% safe withdrawal rate. At 3%, your corpus should be 33x your annual expenses. Our FIRE calculator uses 4% as default but lets you adjust the withdrawal rate to suit your risk profile.' },
  { q: 'What is Lean FIRE vs Fat FIRE and which should I plan for?', a: 'Lean FIRE means retiring with a minimal corpus covering only basic expenses of Rs 20,000-30,000/month. Fat FIRE means retiring comfortably with lifestyle spending of Rs 1L+/month. Most people target Regular FIRE at Rs 50,000-80,000/month. Do not underestimate lifestyle inflation - build for Fat FIRE with Lean FIRE as the floor.' },
  { q: 'What is Coast FIRE and can I achieve it before full FIRE?', a: 'Coast FIRE means accumulating enough corpus that even without additional contributions, your investments will compound to your full retirement target by retirement age. Example: at age 35, Rs 60L invested at 12% CAGR grows to Rs 5.85 crore by age 65 without any more contributions. Once you reach Coast FIRE, you only need to earn enough for current expenses.' },
  { q: 'What asset allocation is recommended for a FIRE portfolio in India?', a: 'Pre-retirement accumulation phase: 70-80% equity (index funds), 10-15% debt (PPF/NPS), 5-10% gold. Post-retirement distribution phase: reduce equity to 40-60%, increase debt to 30-40%, keep gold at 5-10%. Rebalance annually or when equity drifts beyond 5% of target allocation to maintain the right risk level.' },
];

const related = calculators.filter(c => ['sip-calculator', 'nps-calculator', 'swp-calculator'].includes(c.id));

export default function FIREPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="FIRE Calculator" slug="retirement-fire" />
      <CalculatorByline slug="retirement-fire" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">FIRE Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your FIRE number — the corpus needed to retire early and live off investments forever. Uses the proven 4% safe withdrawal rule.</p>
      </div>
      <FIRECalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* FIRE number reference table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Your FIRE Number — India (3.5% Withdrawal Rate)</h2>
        <p className="text-xs text-slate-500 mb-3">Using 3.5% (adjusted for India's 6% average inflation) instead of the US 4% rule. Corpus = Annual Expenses ÷ 0.035.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[460px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Monthly Spend</th>
                <th className="px-3 py-2 text-left border border-slate-100">Annual Spend</th>
                <th className="px-3 py-2 text-left border border-slate-100">FIRE Corpus (3.5%)</th>
                <th className="px-3 py-2 text-left border border-slate-100">At 4% (US rule)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹30,000', '₹3.6L', '₹1.03 Cr', '₹90L'],
                ['₹50,000', '₹6L', '₹1.71 Cr', '₹1.5Cr'],
                ['₹75,000', '₹9L', '₹2.57 Cr', '₹2.25Cr'],
                ['₹1,00,000', '₹12L', '₹3.43 Cr', '₹3Cr'],
                ['₹1,50,000', '₹18L', '₹5.14 Cr', '₹4.5Cr'],
                ['₹2,00,000', '₹24L', '₹6.86 Cr', '₹6Cr'],
              ].map(([spend, annual, fire, us]) => (
                <tr key={spend} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{spend}</td>
                  <td className="px-3 py-2 border border-slate-100">{annual}</td>
                  <td className="px-3 py-2 border border-slate-100 font-bold text-amber-700">{fire}</td>
                  <td className="px-3 py-2 border border-slate-100 text-slate-500">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">India's FIRE corpus is 14–15% larger than the US equivalent — the 0.5% withdrawal rate difference adds up significantly over a 30+ year retirement.</p>
      </section>

      {/* Monthly savings needed */}
      <section className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-amber-900 mb-2">How Many Years to FIRE? Monthly Savings Required at 12% CAGR</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
          {[
            { corpus: '₹1.5Cr', years: [
              { yrs: '10 yrs', saving: '₹71,800/mo' },
              { yrs: '15 yrs', saving: '₹31,000/mo' },
              { yrs: '20 yrs', saving: '₹15,500/mo' },
            ]},
            { corpus: '₹3Cr', years: [
              { yrs: '10 yrs', saving: '₹1,43,600/mo' },
              { yrs: '15 yrs', saving: '₹62,000/mo' },
              { yrs: '20 yrs', saving: '₹31,000/mo' },
            ]},
          ].map(({ corpus, years }) => (
            <div key={corpus} className="col-span-2 bg-white rounded-lg p-3">
              <p className="font-bold text-slate-800 mb-2">Target: {corpus}</p>
              {years.map(({ yrs, saving }) => (
                <div key={yrs} className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-600">{yrs}</span>
                  <span className="font-semibold text-amber-800">{saving}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">Starting earlier is everything — the same ₹3Cr needs ₹31,000/month if you have 20 years, but ₹1.44L/month if you only have 10 years.</p>
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
        name: 'Retirement & FIRE Calculator',
        url: 'https://calculate-today.com/calculators/retirement-fire/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Retirement and FIRE calculator — compute the corpus needed for early retirement using the 4% rule.',
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
      <RelatedGuides calculatorId="retirement-fire" />
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
