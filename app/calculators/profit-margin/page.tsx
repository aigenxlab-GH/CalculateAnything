import type { Metadata } from 'next';
import { Percent } from 'lucide-react';
import { ProfitMarginCalc } from '@/components/calculators/ProfitMarginCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator: Is Your Business Making Enough?',
  description: 'Free profit margin calculator — sell at ₹1,000, cost ₹600: that\'s 40% gross margin. Calculate gross, operating and net profit margin instantly. Find your pricing gap.',
  keywords: ['profit margin calculator', 'gross profit margin calculator', 'net profit margin', 'operating margin calculator India'],
  alternates: { canonical: '/calculators/profit-margin/' },
};

const faqs = [
  { q: 'What is gross profit margin?', a: 'Gross Profit Margin = (Revenue - COGS) ÷ Revenue × 100. It measures what percentage of revenue remains after direct production costs. A high gross margin means more money available to cover operating expenses and earn profit.' },
  { q: 'What is a good profit margin for a business?', a: 'It varies by industry. Retail: 2–5% net, SaaS: 70–80% gross, Manufacturing: 10–20% gross, Services: 20–40% net. Compare against industry benchmarks. Net margin of 10%+ is generally considered healthy for most businesses.' },
  { q: 'What is the difference between markup and margin?', a: 'Margin is profit as % of selling price. Markup is profit as % of cost price. If cost is ₹100 and you sell at ₹150: Margin = 33.3%, Markup = 50%. They are related but not the same. Most businesses use margin for pricing strategy.' },
  { q: 'How do I improve my profit margin?', a: '(1) Increase selling price (if price-inelastic market), (2) Reduce COGS via better supplier terms, (3) Reduce operating expenses (rent, salaries, overheads), (4) Improve product mix towards high-margin items, (5) Automate processes to reduce labour costs.' },
  { q: 'What is a good net profit margin for Indian businesses?', a: 'Typical net profit margins by sector in India: Software/IT services 15-25%, Pharmaceuticals 12-20%, FMCG 8-15%, Retail/e-commerce 2-5%, Manufacturing 5-10%. If your net margin is below your industry average, identify which cost layer (COGS, OpEx, interest, tax) is the culprit and compare against industry peers.' },
  { q: 'What is the difference between gross, operating, and net profit margin?', a: 'Gross Margin = (Revenue minus COGS) / Revenue - measures production efficiency. Operating Margin = (Revenue minus COGS minus OpEx) / Revenue - measures business efficiency including overheads. Net Margin = Net Profit / Revenue - the bottom line after interest and taxes. All three together show exactly where profitability is being lost.' },
  { q: 'Profit margin vs markup - what is the difference?', a: 'Markup is calculated on cost; margin is calculated on revenue. If cost = Rs 80 and selling price = Rs 100: Markup = Rs 20 / Rs 80 = 25%. Gross Margin = Rs 20 / Rs 100 = 20%. They are NOT interchangeable. The formula to convert: Margin = Markup / (1 + Markup). A 50% markup equals only 33.3% gross margin.' },
  { q: 'What is a practical way to improve net profit margin?', a: 'Key levers: (1) Increase price - even a 5% price increase on Rs 10L revenue adds Rs 50,000 extra profit. (2) Reduce COGS by negotiating with suppliers and improving yield. (3) Cut fixed overheads by renegotiating rent and lease terms. (4) Reduce interest cost by prepaying high-interest loans. (5) Improve asset utilisation - more revenue from the same fixed cost base.' },
];

const related = calculators.filter(c => ['break-even', 'working-capital', 'gst-calculator'].includes(c.id));

export default function ProfitMarginPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Profit Margin Calculator" slug="profit-margin" />
      <CalculatorByline slug="profit-margin" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Percent className="w-4 h-4 text-violet-700" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Profit Margin Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate gross, operating and net profit margins for your business. See all three margin types at once with color-coded health indicators.</p>
      </div>
      <ProfitMarginCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* Industry margin benchmarks */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Profit Margin Benchmarks by Industry — India 2026</h2>
        <p className="text-xs text-slate-500 mb-3">Compare your margins against sector averages. Net margin varies widely by capital intensity and competition.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[420px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Industry</th>
                <th className="px-3 py-2 text-left border border-slate-100">Gross Margin</th>
                <th className="px-3 py-2 text-left border border-slate-100">Operating Margin</th>
                <th className="px-3 py-2 text-left border border-slate-100">Net Margin</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['IT / Software Services', '30–50%', '20–35%', '15–25%'],
                ['FMCG / Consumer Goods', '40–55%', '15–25%', '8–15%'],
                ['Pharmaceutical', '55–70%', '20–30%', '12–20%'],
                ['Retail / E-commerce', '20–35%', '3–8%', '2–5%'],
                ['Manufacturing', '15–30%', '8–15%', '4–10%'],
                ['Restaurant / F&B', '55–70%', '5–15%', '3–8%'],
                ['Real Estate', '25–40%', '15–25%', '10–18%'],
              ].map(([ind, ...margins]) => (
                <tr key={ind} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-medium">{ind}</td>
                  {margins.map((v, i) => <td key={i} className="px-3 py-2 border border-slate-100">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gross vs net explained */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Gross, Operating and Net Margin — What Each Tells You</h2>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="p-3 border border-slate-100 rounded-lg">
            <p className="font-bold text-slate-800">Gross Margin = (Revenue − COGS) / Revenue</p>
            <p className="text-xs mt-1">Measures production/sourcing efficiency. If your gross margin is dropping, your raw material cost or manufacturing cost is rising faster than your price. Fix: renegotiate supplier terms, improve yield, raise prices.</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg">
            <p className="font-bold text-slate-800">Operating Margin = (Revenue − COGS − OpEx) / Revenue</p>
            <p className="text-xs mt-1">Measures business efficiency including overhead. If gross is healthy but operating is poor, your SG&A (salaries, rent, marketing) is too high. Fix: reduce headcount, cut discretionary spend, renegotiate rent.</p>
          </div>
          <div className="p-3 border border-slate-100 rounded-lg">
            <p className="font-bold text-slate-800">Net Margin = Net Profit / Revenue</p>
            <p className="text-xs mt-1">The true bottom line after interest and taxes. If operating is fine but net is poor, your debt burden (interest expense) or tax rate is high. Fix: prepay high-interest loans, structure tax-efficient salary for founders.</p>
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
        name: 'Profit Margin Calculator',
        url: 'https://calculate-today.com/calculators/profit-margin/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Profit margin calculator — compute gross, operating and net margin percentages for your business.',
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
      <RelatedGuides calculatorId="profit-margin" />
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
