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
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator: ₹1 Lakh Invested Today = How Much in 2045?',
  description: 'Free lumpsum calculator — ₹1L at 12% for 20 years grows to ₹9.65L. Year-by-year growth chart, CAGR and wealth gain. Compare with SIP returns. Instant.',
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
            <Layers className="w-4 h-4 text-indigo-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Lumpsum Investment Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the future value of a one-time lumpsum investment in mutual funds, stocks or any instrument. See how your money grows over time with a visual chart.</p>
      </div>
      <LumpsumCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* Growth reference table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Lumpsum Growth Table — What ₹1L Becomes</h2>
        <p className="text-xs text-slate-500 mb-3">Annual compounding. No taxes deducted. Equity funds have historically returned 12–14% over 10+ year periods.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[460px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Investment</th>
                <th className="px-3 py-2 text-left border border-slate-100">5 Years @10%</th>
                <th className="px-3 py-2 text-left border border-slate-100">10 Years @12%</th>
                <th className="px-3 py-2 text-left border border-slate-100">15 Years @12%</th>
                <th className="px-3 py-2 text-left border border-slate-100">20 Years @12%</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹1 lakh', '₹1.61L', '₹3.11L', '₹5.47L', '₹9.65L'],
                ['₹5 lakh', '₹8.05L', '₹15.53L', '₹27.37L', '₹48.23L'],
                ['₹10 lakh', '₹16.11L', '₹31.06L', '₹54.74L', '₹96.46L'],
                ['₹25 lakh', '₹40.26L', '₹77.65L', '₹1.37Cr', '₹2.41Cr'],
                ['₹50 lakh', '₹80.53L', '₹1.55Cr', '₹2.74Cr', '₹4.82Cr'],
              ].map(([inv, ...vals]) => (
                <tr key={inv} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{inv}</td>
                  {vals.map((v, i) => <td key={i} className="px-3 py-2 border border-slate-100 text-emerald-700 font-medium">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to use lumpsum vs SIP */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Lumpsum vs SIP — When to Use Which</h2>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
            <span className="font-bold text-slate-800 w-28 flex-shrink-0">Invest lumpsum:</span>
            <span>You have idle cash sitting in savings/FD, markets have fallen 15–20% from peak, or you've received a windfall (bonus, inheritance). Every month of delay has a real cost.</span>
          </div>
          <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
            <span className="font-bold text-slate-800 w-28 flex-shrink-0">Use SIP instead:</span>
            <span>You're investing monthly income, markets are at all-time highs, or you'd panic-sell in a 20% correction. SIP removes the timing stress entirely.</span>
          </div>
          <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="font-bold text-blue-800 w-28 flex-shrink-0">Use STP:</span>
            <span>Large lumpsum + uncertain market. Park in liquid fund, auto-transfer ₹X to equity every week over 6–12 months. Gets rupee cost averaging while money earns 6–7% waiting.</span>
          </div>
        </div>
      </section>

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
      <InContentAd format="horizontal" className="mb-6" variant="faq" />

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
