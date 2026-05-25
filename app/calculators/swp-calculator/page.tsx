import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowDownCircle } from 'lucide-react';
import { SWPCalc } from '@/components/calculators/SWPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'SWP Calculator — Systematic Withdrawal Plan | CalculateToday',
  description: 'Calculate how long your mutual fund corpus lasts with monthly systematic withdrawals. Plan your retirement income with SWP.',
  keywords: ['SWP calculator', 'systematic withdrawal plan', 'retirement income calculator', 'SWP mutual fund'],
};

const faqs = [
  { q: 'What is SWP?', a: 'Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount from your mutual fund every month. It\'s ideal for retirement income — your corpus continues to grow while you draw a monthly income.' },
  { q: 'How long will my corpus last?', a: 'If your monthly return on corpus exceeds your withdrawal, the corpus lasts indefinitely. Example: ₹50L at 8% return earns ₹33,333/month; if you withdraw ₹25,000/month, the corpus keeps growing.' },
  { q: 'Is SWP income taxable?', a: 'SWP from equity funds: gains taxed as LTCG (10% above ₹1L if held >1 year) or STCG (15% if held <1 year). Debt funds are taxed as per your income slab (LTCG with indexation benefit removed from FY 2024-25).' },
];

const related = calculators.filter(c => ['sip-calculator', 'retirement-fire', 'nps-calculator'].includes(c.id));

export default function SWPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">SWP Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <ArrowDownCircle className="w-4 h-4 text-cyan-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SWP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Plan your retirement income with Systematic Withdrawal Plan. See how long your corpus lasts with monthly withdrawals and at what return rate it lasts indefinitely.</p>
      </div>
      <SWPCalc />
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
