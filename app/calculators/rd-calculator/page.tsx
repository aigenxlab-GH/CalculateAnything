import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, PiggyBank } from 'lucide-react';
import { RDCalc } from '@/components/calculators/RDCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'RD Calculator — Recurring Deposit Maturity | CalculateAnything',
  description: 'Calculate Recurring Deposit maturity amount with monthly deposits. Uses quarterly compounding — standard for Indian banks and post offices.',
  keywords: ['RD calculator', 'recurring deposit calculator', 'RD maturity calculator', 'post office RD calculator'],
};

const faqs = [
  { q: 'How is RD maturity calculated?', a: 'Each monthly installment is compounded quarterly for the remaining period. RD uses the formula: M = R × [(1+r)^n – 1] / (1 – (1+r)^(-1/3)), where r = quarterly rate, n = quarters.' },
  { q: 'RD vs SIP — which is better?', a: 'RD offers guaranteed, fixed returns (no market risk) while SIP in equity can give much higher returns over the long term but with market risk. For short-term goals (1–3 years), RD is safer.' },
  { q: 'Can I open an RD in a post office?', a: 'Yes. Post Office RD has a 5-year term and currently offers 6.7% interest. It\'s eligible for Section 80C deduction and has government backing, making it very safe.' },
];

const related = calculators.filter(c => ['fd-calculator', 'ppf-calculator', 'sip-calculator'].includes(c.id));

export default function RDPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">RD Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <PiggyBank className="w-4 h-4 text-pink-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Recurring Deposit (RD) Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Recurring Deposit maturity amount. Uses quarterly compounding as per Indian bank standards — applicable for all bank and post office RDs.</p>
      </div>
      <RDCalc />
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
