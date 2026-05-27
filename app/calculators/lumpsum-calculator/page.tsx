import type { Metadata } from 'next';
import { Layers } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { LumpsumCalc } from '@/components/calculators/LumpsumCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator — One-Time Investment Returns',
  description: 'Calculate the future value of a one-time lumpsum investment at any expected annual return rate. Compare with SIP for smarter wealth planning.',
  keywords: ['lumpsum calculator', 'one time investment calculator', 'lumpsum return calculator', 'mutual fund lumpsum'],
  alternates: { canonical: '/calculators/lumpsum-calculator/' },
};

const faqs = [
  { q: 'Lumpsum vs SIP — which is better?', a: 'Lumpsum is better when markets are low (you buy more at lower NAVs). SIP is better for regular investors who want to average out market volatility. For most salaried investors, SIP is recommended.' },
  { q: 'How is lumpsum return calculated?', a: 'FV = P × (1 + r)^n, where P = principal, r = annual return rate ÷ 100, n = years. This assumes the return is compounded annually.' },
  { q: 'What is a good expected return for lumpsum equity?', a: 'Historically, large-cap equity funds have delivered 12–15% CAGR over 10+ years. Conservative estimate: 10–12% for equity, 6–8% for debt funds.' },
  { q: 'Lumpsum vs SIP - which gives better returns?', a: 'If you invest at a market bottom, lumpsum outperforms SIP significantly. Over random 10-year periods, lumpsum beats SIP about 65% of the time in rising markets. The practical advice: invest lumpsum immediately if you have idle cash - do not try to time the market.' },
  { q: 'What return rate should I use for lumpsum calculations?', a: 'Use 10-12% for diversified large-cap equity, 12-15% for mid/small-cap, 6-8% for debt funds, and 7.1% for PPF. For conservative planning, use 10% for equity. Always run a pessimistic scenario at 8% and an optimistic one at 14% to see the full range of outcomes.' },
  { q: 'Should I invest a large lumpsum all at once or spread it over months?', a: 'If investing in equity during a volatile or uncertain market, consider Systematic Transfer Plan (STP): park the full amount in a liquid fund and transfer fixed amounts to equity funds weekly over 6-12 months. This mimics rupee cost averaging while the idle money earns liquid fund returns of 6-7%.' },
  { q: 'Is a lumpsum investment in a new NFO better than an existing fund?', a: 'Generally no. New Fund Offers (NFOs) have no track record - you cannot assess past performance or fund manager skill. Existing funds with 7-10 year history are far more evaluable. The low Rs 10 NAV of an NFO is irrelevant - what matters is future NAV growth, not the starting price.' },
  { q: 'Is lumpsum investing or SIP better during volatile or falling markets?', a: 'In a falling or volatile market, SIP is generally safer because it averages your purchase price across multiple NAVs (rupee cost averaging). If you invest a Rs 5 lakh lumpsum just before a 20% market correction, your portfolio immediately drops to Rs 4 lakh. The same Rs 5L spread as SIP over 10 months would have bought more units at lower prices, reducing average cost. During stable or rising markets, lumpsum outperforms. Use STP (Systematic Transfer Plan) to get the best of both in uncertain conditions.' },
];

const related = calculators.filter(c => ['sip-calculator', 'cagr-calculator', 'compounding-calculator'].includes(c.id));

export default function LumpsumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Lumpsum Calculator" slug="lumpsum-calculator" />
      <CalculatorByline slug="lumpsum-calculator" />
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
        name: 'Lumpsum Investment Calculator',
        url: 'https://calculate-today.com/calculators/lumpsum-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Lumpsum investment calculator — find future value of a one-time investment over time.',
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
      <RelatedGuides calculatorId="lumpsum-calculator" />
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
