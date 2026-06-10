import type { Metadata } from 'next';
import { BarChart2 } from 'lucide-react';
import { BreakEvenCalc } from '@/components/calculators/BreakEvenCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Break-Even Calculator: How Many Sales to Start Making Profit?',
  description: 'Free break-even calculator — ₹1L fixed costs + ₹500 margin/unit = 200 units to break even. See BEP in units and revenue, contribution margin, safety margin.',
  keywords: ['break even calculator', 'break-even point calculator', 'BEP calculator business', 'fixed cost break even'],
  alternates: { canonical: '/calculators/break-even/' },
};

const faqs = [
  { q: 'What is the break-even point?', a: 'The break-even point (BEP) is the number of units sold (or revenue generated) at which total revenue equals total costs — neither profit nor loss. Beyond this point, every unit sold generates profit.' },
  { q: 'How is break-even calculated?', a: 'Break-Even Units = Fixed Costs ÷ (Selling Price per Unit - Variable Cost per Unit). The denominator is called the Contribution Margin per unit. For example: ₹5L fixed costs, ₹500 selling price, ₹200 variable cost ? BEP = 5,00,000 ÷ 300 = 1,667 units.' },
  { q: 'What is a good break-even point?', a: 'Lower is better. If BEP is 50% of capacity or less, the business has good safety margin. BEP above 80% capacity is risky — a small revenue drop leads to losses. Aim for BEP below 40% of production/sales capacity.' },
  { q: 'How can I lower my break-even point?', a: '(1) Reduce fixed costs (smaller office, reduce overheads), (2) Reduce variable costs (better supplier deals, efficiency), (3) Increase selling price (if market allows), (4) Increase sales volume (marketing, new channels), (5) Improve product mix to higher-margin items.' },
  { q: 'What is the difference between contribution margin and gross margin?', a: 'Contribution Margin = Revenue minus Variable Costs (used for break-even analysis, focuses on costs that change with production). Gross Margin = Revenue minus COGS (includes both variable manufacturing costs and fixed manufacturing overhead). Contribution margin is used for short-term pricing decisions; gross margin for overall business profitability analysis.' },
  { q: 'How do I calculate break-even for a business with multiple products?', a: 'For multi-product break-even: calculate a weighted average contribution margin based on your sales mix. Example: Product A (60% of sales, Rs 200 contribution) plus Product B (40% of sales, Rs 100 contribution) = Weighted CM = Rs 160. Break-even units = Fixed Costs divided by Rs 160. This assumes a constant sales mix across products.' },
  { q: 'What is the margin of safety and how do I use it for business planning?', a: 'Margin of Safety = (Actual Sales minus Break-Even Sales) divided by Actual Sales expressed as percentage. Example: actual revenue Rs 10L, break-even Rs 7L: Margin of Safety = 30%. This means sales can fall 30% before losses begin. A 20%+ margin of safety is generally considered healthy; below 15% is dangerously close to break-even.' },
  { q: 'How do semi-variable costs affect the break-even calculation?', a: 'Semi-variable costs such as electricity (fixed base plus variable per unit) must be split into fixed and variable components before the break-even calculation. Use the high-low method: (Highest cost minus Lowest cost) divided by (Highest output minus Lowest output) = Variable rate per unit. Add the fixed portion to your fixed costs and variable portion to variable cost per unit.' },
];

const related = calculators.filter(c => ['profit-margin', 'working-capital', 'gst-calculator'].includes(c.id));

export default function BreakEvenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Break-Even Calculator" slug="break-even" />
      <CalculatorByline slug="break-even" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Break-Even Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Find your business break-even point — the exact number of units and revenue needed to cover all fixed and variable costs.</p>
      </div>
      <BreakEvenCalc />

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
        name: 'Break-Even Calculator',
        url: 'https://calculate-today.com/calculators/break-even/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Break-even calculator — find units and revenue needed to cover fixed costs and start making profit.',
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
      <RelatedGuides calculatorId="break-even" />
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
