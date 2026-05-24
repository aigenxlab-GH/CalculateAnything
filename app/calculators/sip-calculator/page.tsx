import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { SIPCalc } from '@/components/calculators/SIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'SIP Calculator — Systematic Investment Plan Returns | CalculateAnything',
  description: 'Calculate SIP maturity value and wealth created from monthly mutual fund investments. Free SIP calculator with growth chart and year-wise projections.',
  keywords: ['SIP calculator', 'SIP return calculator', 'mutual fund SIP calculator', 'systematic investment plan'],
};

const faqs = [
  { q: 'What is SIP and how does it work?', a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount in mutual funds every month. You buy fund units at the prevailing NAV, benefiting from rupee cost averaging over time.' },
  { q: 'What is the expected return rate for SIP?', a: 'Equity mutual funds have historically delivered 12-15% CAGR over long periods (10+ years). Debt funds give 6-8%. Use 12% as a conservative estimate for diversified equity SIP calculations.' },
  { q: 'How is SIP maturity value calculated?', a: 'FV = P × [(1+r)^n – 1]/r × (1+r), where P = monthly SIP, r = monthly rate (annual rate ÷ 12 ÷ 100), n = number of months. This assumes end-of-month investments.' },
  { q: 'Is SIP better than FD for long-term wealth?', a: 'For long-term goals (7+ years), SIP in equity funds has significantly outperformed FDs historically. But SIP returns are market-linked and not guaranteed, unlike FD returns.' },
];

const related = calculators.filter(c => ['goal-sip', 'step-up-sip', 'lumpsum-calculator'].includes(c.id));

export default function SIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">SIP Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SIP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the maturity value and wealth created from your monthly SIP investment. Includes a year-by-year growth chart and comparison panel for different scenarios.</p>
      </div>
      <SIPCalc />
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
