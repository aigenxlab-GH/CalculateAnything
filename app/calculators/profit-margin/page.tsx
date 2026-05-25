import type { Metadata } from 'next';
import { Percent } from 'lucide-react';
import { ProfitMarginCalc } from '@/components/calculators/ProfitMarginCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator — Gross, Net & Operating | CalculateToday',
  description: 'Calculate gross profit margin, operating margin and net profit margin for your business. Instantly find the selling price needed to achieve your desired margin.',
  keywords: ['profit margin calculator', 'gross profit margin calculator', 'net profit margin', 'operating margin calculator India'],
  alternates: { canonical: '/calculators/profit-margin/' },
};

const faqs = [
  { q: 'What is gross profit margin?', a: 'Gross Profit Margin = (Revenue - COGS) ÷ Revenue × 100. It measures what percentage of revenue remains after direct production costs. A high gross margin means more money available to cover operating expenses and earn profit.' },
  { q: 'What is a good profit margin for a business?', a: 'It varies by industry. Retail: 2–5% net, SaaS: 70–80% gross, Manufacturing: 10–20% gross, Services: 20–40% net. Compare against industry benchmarks. Net margin of 10%+ is generally considered healthy for most businesses.' },
  { q: 'What is the difference between markup and margin?', a: 'Margin is profit as % of selling price. Markup is profit as % of cost price. If cost is ₹100 and you sell at ₹150: Margin = 33.3%, Markup = 50%. They are related but not the same. Most businesses use margin for pricing strategy.' },
  { q: 'How do I improve my profit margin?', a: '(1) Increase selling price (if price-inelastic market), (2) Reduce COGS via better supplier terms, (3) Reduce operating expenses (rent, salaries, overheads), (4) Improve product mix towards high-margin items, (5) Automate processes to reduce labour costs.' },
];

const related = calculators.filter(c => ['break-even', 'working-capital', 'gst-calculator'].includes(c.id));

export default function ProfitMarginPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Profit Margin Calculator" slug="profit-margin" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Percent className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Profit Margin Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate gross, operating and net profit margins for your business. See all three margin types at once with color-coded health indicators.</p>
      </div>
      <ProfitMarginCalc />

      <BusinessToolTable variant="accounting" />
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
