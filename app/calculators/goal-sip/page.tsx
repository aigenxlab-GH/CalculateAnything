import type { Metadata } from 'next';
import { Target } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { GoalSIPCalc } from '@/components/calculators/GoalSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'Goal SIP Calculator — Monthly SIP Needed for Target',
  description: 'Find out the exact monthly SIP amount needed to reach your financial goal. Set your target corpus, timeline and expected returns.',
  keywords: ['goal SIP calculator', 'SIP needed for goal', 'target SIP calculator', 'reverse SIP calculator'],
  alternates: { canonical: '/calculators/goal-sip/' },
};

const faqs = [
  { q: 'How much SIP do I need for ₹1 crore?', a: 'At 12% expected return: for 10 years you need ₹43,471/month; for 15 years, ₹19,816/month; for 20 years, ₹10,011/month. Starting early dramatically reduces the monthly SIP required.' },
  { q: 'How is goal SIP calculated?', a: 'Required SIP = Goal Amount / ((((1+r)^n − 1)/r) × (1+r)), where r = monthly rate, n = months. This is the reverse of the SIP maturity formula.' },
  { q: 'What are common financial goals to plan for?', a: 'Child education (typically ₹50L–₹1Cr), marriage fund (₹25–50L), home down payment (₹20–50L), retirement corpus (₹3–5Cr), foreign travel or car (₹5–20L).' },
  { q: 'What happens if I delay starting my Goal SIP by 2 years?', a: 'Delaying by 2 years typically increases the required monthly SIP by 15-25%. For a Rs 50 lakh goal in 15 years at 12%, you need Rs 10,500/month. Waiting 2 years means you need Rs 14,000/month - paying Rs 84,000 extra per year. Every month of delay compounds the catch-up cost.' },
  { q: 'Can I use Goal SIP for multiple financial goals simultaneously?', a: 'Yes - and you should. Create separate SIPs for each goal: one for child education, one for home down payment, one for retirement. Each SIP runs in an appropriate fund category matching the time horizon. Mixing goals in one SIP makes tracking and rebalancing difficult.' },
  { q: 'Goal SIP vs PPF - which is better for a 15-year goal?', a: 'For a 15-year horizon, equity Goal SIP at 12%+ CAGR historically outperforms PPF at 7.1%. However, PPF returns are guaranteed and tax-free while SIP returns are market-linked. A combination works best: PPF for the guaranteed floor plus Goal SIP for the growth component.' },
  { q: 'Should I increase my Goal SIP amount if my target changes?', a: 'Yes - review your Goal SIP at least annually. If your target corpus increases due to higher inflation estimates, use the Goal SIP calculator to recompute the required monthly amount for the remaining years and increase the SIP accordingly. Most platforms allow free SIP amount modifications.' },
  { q: 'What should I do if the required Goal SIP amount is too high for my budget?', a: 'If the computed SIP is unaffordable, use a step-up SIP instead: start at a lower amount you can afford today and increase it 10-15% each year as your salary grows. For example, if you need Rs 20,000/month but can only manage Rs 12,000, a 15% annual step-up from Rs 12,000 reaches Rs 20,000+ in just 4 years while still building significant corpus. Alternatively, extend the goal timeline by 2-3 years to reduce the monthly requirement substantially.' },
];

const related = calculators.filter(c => ['sip-calculator', 'step-up-sip', 'lumpsum-calculator'].includes(c.id));

export default function GoalSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Goal SIP" slug="goal-sip" />
      <CalculatorByline slug="goal-sip" />
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
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Enter your financial goal amount, timeline and expected returns — we instantly calculate the exact monthly SIP needed to reach it.</p>
      </div>
      <GoalSIPCalc />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Goal SIP Calculator',
        url: 'https://calculate-today.com/calculators/goal-sip/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Goal SIP calculator — find the monthly SIP amount needed to reach your target corpus.',
      }} />
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
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
