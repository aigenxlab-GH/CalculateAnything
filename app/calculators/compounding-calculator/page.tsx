import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';
import { CompoundingCalc } from '@/components/calculators/CompoundingCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Monthly, Quarterly, Annual | CalculateAnything',
  description: 'Calculate compound interest with any compounding frequency — monthly, quarterly, semi-annual or annual. Compare how frequency impacts your returns.',
  keywords: ['compound interest calculator', 'compounding calculator India', 'compound interest formula', 'quarterly compounding'],
};

const faqs = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It\'s often called "interest on interest" and grows your wealth exponentially over time.' },
  { q: 'How does compounding frequency affect returns?', a: 'More frequent compounding gives higher returns. Monthly compounding at 10% gives ~10.47% effective annual rate, while annual compounding gives exactly 10%. The difference grows with time.' },
  { q: 'Formula for compound interest?', a: 'A = P × (1 + r/n)^(n×t), where P = principal, r = annual rate (decimal), n = compounding periods per year, t = years.' },
];

const related = calculators.filter(c => ['simple-interest', 'fd-calculator', 'lumpsum-calculator'].includes(c.id));

export default function CompoundingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Compounding Calculator</span>
      </nav>
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
