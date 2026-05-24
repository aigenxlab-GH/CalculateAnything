import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BarChart2 } from 'lucide-react';
import { BreakEvenCalc } from '@/components/calculators/BreakEvenCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';

export const metadata: Metadata = {
  title: 'Break-Even Calculator — Units & Revenue | CalculateAnything',
  description: 'Calculate your business break-even point in units and revenue. Find how many sales you need to cover fixed and variable costs and start making profit.',
  keywords: ['break even calculator', 'break-even point calculator', 'BEP calculator business', 'fixed cost break even'],
};

const faqs = [
  { q: 'What is the break-even point?', a: 'The break-even point (BEP) is the number of units sold (or revenue generated) at which total revenue equals total costs — neither profit nor loss. Beyond this point, every unit sold generates profit.' },
  { q: 'How is break-even calculated?', a: 'Break-Even Units = Fixed Costs ÷ (Selling Price per Unit − Variable Cost per Unit). The denominator is called the Contribution Margin per unit. For example: ₹5L fixed costs, ₹500 selling price, ₹200 variable cost → BEP = 5,00,000 ÷ 300 = 1,667 units.' },
  { q: 'What is a good break-even point?', a: 'Lower is better. If BEP is 50% of capacity or less, the business has good safety margin. BEP above 80% capacity is risky — a small revenue drop leads to losses. Aim for BEP below 40% of production/sales capacity.' },
  { q: 'How can I lower my break-even point?', a: '(1) Reduce fixed costs (smaller office, reduce overheads), (2) Reduce variable costs (better supplier deals, efficiency), (3) Increase selling price (if market allows), (4) Increase sales volume (marketing, new channels), (5) Improve product mix to higher-margin items.' },
];

const related = calculators.filter(c => ['profit-margin', 'working-capital', 'gst-calculator'].includes(c.id));

export default function BreakEvenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Break-Even Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Break-Even Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Find your business break-even point — the exact number of units and revenue needed to cover all fixed and variable costs.</p>
      </div>
      <BreakEvenCalc />

      <BusinessToolTable variant="accounting" />
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
