import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Layers } from 'lucide-react';
import { LumpsumCalc } from '@/components/calculators/LumpsumCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator � One-Time Investment Returns | CalculateToday',
  description: 'Calculate the future value of a one-time lumpsum investment at any expected annual return rate. Compare with SIP for smarter wealth planning.',
  keywords: ['lumpsum calculator', 'one time investment calculator', 'lumpsum return calculator', 'mutual fund lumpsum'],
};

const faqs = [
  { q: 'Lumpsum vs SIP � which is better?', a: 'Lumpsum is better when markets are low (you buy more at lower NAVs). SIP is better for regular investors who want to average out market volatility. For most salaried investors, SIP is recommended.' },
  { q: 'How is lumpsum return calculated?', a: 'FV = P � (1 + r)^n, where P = principal, r = annual return rate � 100, n = years. This assumes the return is compounded annually.' },
  { q: 'What is a good expected return for lumpsum equity?', a: 'Historically, large-cap equity funds have delivered 12�15% CAGR over 10+ years. Conservative estimate: 10�12% for equity, 6�8% for debt funds.' },
];

const related = calculators.filter(c => ['sip-calculator', 'cagr-calculator', 'compounding-calculator'].includes(c.id));

export default function LumpsumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Lumpsum Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Lumpsum Investment Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the future value of a one-time lumpsum investment in mutual funds, stocks or any instrument. See how your money grows over time with a visual chart.</p>
      </div>
      <LumpsumCalc />
      <BrokerPlatformTable />
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
