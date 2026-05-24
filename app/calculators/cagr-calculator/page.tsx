import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BarChart2 } from 'lucide-react';
import { CAGRCalc } from '@/components/calculators/CAGRCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'CAGR Calculator — Compound Annual Growth Rate | CalculateAnything',
  description: 'Calculate CAGR from initial and final investment value. Compare your returns against FD, PPF and Nifty 50 benchmarks.',
  keywords: ['CAGR calculator', 'compound annual growth rate', 'investment return calculator', 'CAGR formula India'],
};

const faqs = [
  { q: 'What is CAGR?', a: 'CAGR (Compound Annual Growth Rate) is the annual rate of return that brings an investment from its initial value to its final value over a given period, assuming profits are reinvested.' },
  { q: 'CAGR formula?', a: 'CAGR = (Final Value / Initial Value)^(1/Years) – 1, expressed as a percentage. It smooths out the effect of market volatility to show a consistent annualised growth rate.' },
  { q: 'What is a good CAGR for investments?', a: '> 20%: Excellent (rare, usually small-cap or sector bets). 12–20%: Good (equity mutual funds). 8–12%: Moderate (balanced funds). < 8%: Low (consider if it beats inflation at ~6%).' },
];

const related = calculators.filter(c => ['lumpsum-calculator', 'sip-calculator', 'inflation-calculator'].includes(c.id));

export default function CAGRPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">CAGR Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">CAGR Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the Compound Annual Growth Rate of any investment. Enter initial and final values to see annualised returns and compare against benchmarks.</p>
      </div>
      <CAGRCalc />
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
