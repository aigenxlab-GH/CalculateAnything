import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { InterestFreeHomeLoan } from '@/components/calculators/InterestFreeHomeLoan';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Interest-Free Home Loan Calculator | CalculateToday',
  description: 'Discover how a parallel SIP can offset your entire home loan interest. Pay EMI + invest in SIP and become effectively interest-free on your home loan.',
  keywords: ['interest free home loan', 'home loan SIP offset', 'smart home loan strategy', 'SIP vs home loan interest'],
};

const faqs = [
  { q: 'How can a home loan be interest-free?', a: 'The strategy works by investing a fixed amount in SIP (equity mutual fund) every month alongside your EMI. Over the loan tenure, SIP returns (historically 12%+) can exceed the total interest paid, making your net effective interest zero or even negative.' },
  { q: 'Is this a guaranteed strategy?', a: 'No. Equity SIP returns are market-linked and not guaranteed. This calculator shows the mathematical potential. The strategy works well historically but equity returns can vary significantly year-to-year.' },
  { q: 'How much should I invest in SIP alongside EMI?', a: 'Typically investing 20�30% of your EMI amount in an equity mutual fund SIP creates a large enough corpus over 15�20 years to offset the entire loan interest. The calculator shows the optimal SIP amount.' },
  { q: 'Which mutual funds are best for this strategy?', a: 'Diversified equity index funds (Nifty 50, Nifty Next 50) or flexi-cap funds work well. These have historically delivered 11�14% CAGR over 15+ year periods. Avoid debt funds for this strategy as returns are insufficient.' },
];

const related = calculators.filter(c => ['home-loan', 'loan-prepayment', 'sip-calculator'].includes(c.id));

export default function InterestFreeHomeLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Interest-Free Home Loan</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Interest-Free Home Loan Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">See how investing a small SIP alongside your home loan EMI can offset the entire interest cost � making your home loan effectively interest-free.</p>
      </div>
      <InterestFreeHomeLoan />
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
