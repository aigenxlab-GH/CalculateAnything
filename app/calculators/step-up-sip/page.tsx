import type { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { StepUpSIPCalc } from '@/components/calculators/StepUpSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'Step-Up SIP Calculator — Annual SIP Increase',
  description: 'Calculate returns from a step-up SIP where you increase monthly investment by a fixed % every year. Compare with flat SIP to see the extra wealth created.',
  keywords: ['step-up SIP calculator', 'increasing SIP', 'top-up SIP calculator', 'SIP with annual increase'],
  alternates: { canonical: '/calculators/step-up-sip/' },
};

const faqs = [
  { q: 'What is a step-up or top-up SIP?', a: 'A step-up SIP (also called top-up SIP) automatically increases your SIP amount by a fixed percentage every year. This aligns with your salary hikes, helping you invest more as you earn more.' },
  { q: 'By how much should I step up my SIP?', a: 'A 10–15% annual step-up is generally recommended, aligned with typical salary hike percentages. Even a 10% step-up can significantly boost your final corpus compared to a flat SIP.' },
  { q: 'How much extra does step-up SIP earn?', a: 'A step-up SIP of ₹5,000/month with 10% annual increase, at 12% return over 15 years, creates about 40% more wealth than a flat ₹5,000 SIP over the same period.' },
  { q: 'What step-up percentage should I use in the calculator?', a: 'Use your expected annual salary increment percentage - typically 8-12% for most salaried employees in India. A 10% step-up is a conservative and realistic default. If you are in a high-growth career like tech or consulting, 15% may be appropriate. Never use a step-up higher than your expected income growth rate.' },
  { q: 'How much more does a 10% step-up SIP earn vs a flat SIP?', a: 'On a Rs 5,000/month SIP at 12% over 20 years: flat SIP = Rs 49.9 lakh corpus. With 10% annual step-up = Rs 1.01 crore - more than double. Step-up SIP is the single most impactful change to any long-term SIP strategy.' },
  { q: 'Can I pause the step-up if I face financial difficulty?', a: 'Yes. Most mutual fund platforms allow you to modify or pause the step-up at any time. If you face a financial crunch, simply stop the step-up for that year and resume the next year. Even a flat year in the middle reduces the final corpus by only 5-8% vs continuous step-up.' },
  { q: 'Is step-up SIP available for all mutual fund schemes?', a: 'Most equity, hybrid, and debt funds from all major AMCs support step-up SIP. You can set it up on platforms like Groww, Zerodha Coin, or ET Money. The step-up is typically applied annually on the SIP anniversary. Verify that your chosen fund supports top-up SIP before investing.' },
  { q: 'How should I use step-up SIP to plan for a specific goal like retirement or child education?', a: 'Work backwards: identify your target corpus, expected return rate, and years available. Use the step-up SIP calculator to find the starting monthly amount at your expected step-up %. Example: For Rs 2 crore in 20 years at 12% returns with 10% annual step-up, you only need to start with Rs 13,500/month — far less than the Rs 22,500 flat SIP needed for the same goal. Pair this with goal-based SIP accounts on platforms like Groww or Coin to separate goals.' },
];

const related = calculators.filter(c => ['sip-calculator', 'goal-sip', 'lumpsum-calculator'].includes(c.id));

export default function StepUpSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Step-Up SIP" slug="step-up-sip" />
      <CalculatorByline slug="step-up-sip" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Step-Up SIP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate how much more wealth you create by increasing your SIP amount by a fixed percentage every year — aligned with salary hikes.</p>
      </div>
      <StepUpSIPCalc />
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
        name: 'Step-Up SIP Calculator',
        url: 'https://calculate-today.com/calculators/step-up-sip/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Step-up SIP calculator — compute maturity value when SIP amount increases every year.',
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
