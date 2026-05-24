import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { StepUpSIPCalc } from '@/components/calculators/StepUpSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Step-Up SIP Calculator � Annual SIP Increase | CalculateToday',
  description: 'Calculate returns from a step-up SIP where you increase monthly investment by a fixed % every year. Compare with flat SIP to see the extra wealth created.',
  keywords: ['step-up SIP calculator', 'increasing SIP', 'top-up SIP calculator', 'SIP with annual increase'],
};

const faqs = [
  { q: 'What is a step-up or top-up SIP?', a: 'A step-up SIP (also called top-up SIP) automatically increases your SIP amount by a fixed percentage every year. This aligns with your salary hikes, helping you invest more as you earn more.' },
  { q: 'By how much should I step up my SIP?', a: 'A 10�15% annual step-up is generally recommended, aligned with typical salary hike percentages. Even a 10% step-up can significantly boost your final corpus compared to a flat SIP.' },
  { q: 'How much extra does step-up SIP earn?', a: 'A step-up SIP of ?5,000/month with 10% annual increase, at 12% return over 15 years, creates about 40% more wealth than a flat ?5,000 SIP over the same period.' },
];

const related = calculators.filter(c => ['sip-calculator', 'goal-sip', 'lumpsum-calculator'].includes(c.id));

export default function StepUpSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Step-Up SIP</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Step-Up SIP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate how much more wealth you create by increasing your SIP amount by a fixed percentage every year � aligned with salary hikes.</p>
      </div>
      <StepUpSIPCalc />
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
