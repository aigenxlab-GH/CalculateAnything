import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Umbrella } from 'lucide-react';
import { NPSCalc } from '@/components/calculators/NPSCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'NPS Calculator � National Pension Scheme Corpus | CalculateToday',
  description: 'Estimate NPS corpus and monthly pension at retirement. Calculate 60% lumpsum and 40% annuity split from NPS contributions.',
  keywords: ['NPS calculator', 'national pension system calculator', 'NPS retirement calculator', 'NPS monthly pension'],
};

const faqs = [
  { q: 'What is NPS and how does it work?', a: 'NPS (National Pension System) is a government-backed retirement savings scheme. You contribute monthly and at retirement get 60% as lumpsum (tax-free) and must use 40% to buy an annuity for monthly pension.' },
  { q: 'What are the tax benefits of NPS?', a: 'Under Section 80CCD(1): up to ?1.5L within 80C limit. Under 80CCD(1B): additional ?50K deduction. Employer contribution under 80CCD(2): up to 10% of basic (no upper limit). Lumpsum at maturity: 60% tax-free.' },
  { q: 'What is the expected return on NPS?', a: 'NPS offers multiple asset classes: Equity (Tier I) has given 10�13% historical returns. Corporate bonds: 8�10%. Government Securities: 7�9%. Lifecycle funds automatically shift allocation with age.' },
];

const related = calculators.filter(c => ['epf-calculator', 'ppf-calculator', 'retirement-fire'].includes(c.id));

export default function NPSPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">NPS Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <Umbrella className="w-4 h-4 text-sky-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NPS Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Estimate your National Pension Scheme corpus and monthly pension at retirement. See how the 60/40 lumpsum-annuity split works for your contributions.</p>
      </div>
      <NPSCalc />
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
