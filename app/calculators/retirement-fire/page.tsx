import type { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { FIRECalc } from '@/components/calculators/FIRECalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'FIRE Calculator — Financial Independence, Retire Early | CalculateToday',
  description: 'Calculate your FIRE number and years to financial independence. Uses the 4% safe withdrawal rule. Plan early retirement with inflation-adjusted projections.',
  keywords: ['FIRE calculator India', 'financial independence calculator', 'early retirement calculator', 'FIRE number calculator'],
  alternates: { canonical: '/calculators/retirement-fire/' },
};

const faqs = [
  { q: 'What is the FIRE movement?', a: 'FIRE stands for Financial Independence, Retire Early. The goal is to accumulate enough wealth that investment returns cover all living expenses, allowing you to stop working whenever you choose.' },
  { q: 'What is the 4% rule?', a: 'The 4% rule (Trinity Study) says you can safely withdraw 4% of your portfolio annually without depleting it over 30 years. So FIRE corpus = 25× your annual expenses.' },
  { q: 'What is the FIRE corpus needed in India?', a: 'For monthly expenses of ₹50,000 (₹6L/year), FIRE corpus = 25 × ₹6L = ₹1.5 Crore. For ₹1L/month expenses: ₹3 Crore. However, inflation and India-specific factors should be considered.' },
  { q: 'How do I achieve FIRE faster?', a: '(1) Increase income (skills, promotion, side income), (2) Reduce expenses (higher savings rate), (3) Invest aggressively in equity SIPs, (4) Avoid lifestyle inflation, (5) Pay off debt quickly.' },
];

const related = calculators.filter(c => ['sip-calculator', 'nps-calculator', 'swp-calculator'].includes(c.id));

export default function FIREPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="FIRE Calculator" slug="retirement-fire" />
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
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
