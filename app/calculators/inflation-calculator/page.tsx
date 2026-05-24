import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, TrendingDown } from 'lucide-react';
import { InflationCalc } from '@/components/calculators/InflationCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Inflation Calculator � Future Cost & Purchasing Power | CalculateToday',
  description: 'Calculate the future cost of today\'s expenses due to inflation. See how inflation erodes purchasing power over 5, 10 or 20 years.',
  keywords: ['inflation calculator India', 'future cost calculator', 'purchasing power calculator', 'inflation rate India'],
};

const faqs = [
  { q: 'What is the average inflation rate in India?', a: 'India\'s CPI inflation has averaged around 5�7% per year over the past decade. For planning purposes, use 6% as a conservative estimate.' },
  { q: 'How does inflation affect savings?', a: 'If your savings earn 6% and inflation is 6%, your real return is 0% � your purchasing power doesn\'t grow. To beat inflation, your investments should return more than the inflation rate.' },
  { q: 'What items in India have high inflation?', a: 'Education costs inflate at 10�12% annually. Healthcare at 8�10%. Food at 5�7%. Real estate in metros at 5�8%. Planning with category-specific inflation rates gives more accurate results.' },
];

const related = calculators.filter(c => ['sip-calculator', 'retirement-fire', 'cagr-calculator'].includes(c.id));

export default function InflationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Inflation Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-red-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Inflation Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Find out how much today&apos;s money will be worth in the future, and how much more you&apos;ll need to maintain the same lifestyle with inflation.</p>
      </div>
      <InflationCalc />
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
