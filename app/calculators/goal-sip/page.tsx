import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Target } from 'lucide-react';
import { GoalSIPCalc } from '@/components/calculators/GoalSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';

export const metadata: Metadata = {
  title: 'Goal SIP Calculator � Monthly SIP Needed for Target | CalculateToday',
  description: 'Find out the exact monthly SIP amount needed to reach your financial goal. Set your target corpus, timeline and expected returns.',
  keywords: ['goal SIP calculator', 'SIP needed for goal', 'target SIP calculator', 'reverse SIP calculator'],
};

const faqs = [
  { q: 'How much SIP do I need for ?1 crore?', a: 'At 12% expected return: for 10 years you need ?43,471/month; for 15 years, ?19,816/month; for 20 years, ?10,011/month. Starting early dramatically reduces the monthly SIP required.' },
  { q: 'How is goal SIP calculated?', a: 'Required SIP = Goal Amount / ((((1+r)^n � 1)/r) � (1+r)), where r = monthly rate, n = months. This is the reverse of the SIP maturity formula.' },
  { q: 'What are common financial goals to plan for?', a: 'Child education (typically ?50L�?1Cr), marriage fund (?25�50L), home down payment (?20�50L), retirement corpus (?3�5Cr), foreign travel or car (?5�20L).' },
];

const related = calculators.filter(c => ['sip-calculator', 'step-up-sip', 'lumpsum-calculator'].includes(c.id));

export default function GoalSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Goal SIP</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Goal SIP Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Enter your financial goal amount, timeline and expected returns � we instantly calculate the exact monthly SIP needed to reach it.</p>
      </div>
      <GoalSIPCalc />
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
      <BrokerPlatformTable />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
