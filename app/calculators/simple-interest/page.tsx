import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calculator } from 'lucide-react';
import { SimpleInterestCalc } from '@/components/calculators/SimpleInterestCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator � Formula & Results | CalculateToday',
  description: 'Calculate simple interest instantly. Formula: SI = P � R � T / 100. Compare with compound interest to see the difference.',
  keywords: ['simple interest calculator', 'SI calculator', 'simple interest formula', 'calculate simple interest India'],
};

const faqs = [
  { q: 'What is simple interest?', a: 'Simple Interest (SI) is calculated only on the principal amount. It doesn\'t compound. SI = P � R � T / 100, where P = principal, R = rate per year, T = time in years.' },
  { q: 'When is simple interest used?', a: 'Simple interest is used for short-term loans, EMI calculations for the first period, car loans in some countries, personal loans, and rural lending. Banks in India typically use compound interest for deposits.' },
  { q: 'Simple interest vs compound interest � what\'s the difference?', a: 'In simple interest, interest is calculated only on principal. In compound interest, interest is calculated on principal + accumulated interest. Over time, compound interest generates significantly more returns.' },
];

const related = calculators.filter(c => ['compounding-calculator', 'fd-calculator', 'lumpsum-calculator'].includes(c.id));

export default function SimpleInterestPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Simple Interest</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-slate-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Simple Interest Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate simple interest using the formula SI = P � R � T / 100. Compare with compound interest to see why long-term wealth grows faster with compounding.</p>
      </div>
      <SimpleInterestCalc />
      <FdRateTable principal={50000} tenureYears={2} mode="fd" />
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
