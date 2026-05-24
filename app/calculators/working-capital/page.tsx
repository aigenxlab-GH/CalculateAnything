import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Briefcase } from 'lucide-react';
import { WorkingCapitalCalc } from '@/components/calculators/WorkingCapitalCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';

export const metadata: Metadata = {
  title: 'Working Capital Calculator � Current & Quick Ratio | CalculateToday',
  description: 'Calculate working capital, current ratio, quick ratio and cash ratio. Assess your business short-term liquidity and financial health instantly.',
  keywords: ['working capital calculator', 'current ratio calculator', 'quick ratio calculator', 'business liquidity calculator'],
};

const faqs = [
  { q: 'What is working capital?', a: 'Working capital = Current Assets - Current Liabilities. It represents the funds available for day-to-day business operations. Positive working capital means the business can meet its short-term obligations. Negative working capital is a warning sign of potential cash flow problems.' },
  { q: 'What is a good current ratio?', a: 'Current Ratio = Current Assets � Current Liabilities. A ratio of 1.5�3.0 is generally considered healthy. Below 1.0 means liabilities exceed assets � liquidity risk. Above 3.0 may indicate idle cash not being put to productive use.' },
  { q: 'What is the quick ratio and why does it matter?', a: 'Quick Ratio = (Current Assets - Inventory) � Current Liabilities. It excludes inventory (which may not be quickly convertible to cash). A quick ratio of 1.0+ is considered healthy. This is a stricter test of liquidity than the current ratio.' },
  { q: 'How can I improve working capital?', a: '(1) Speed up receivables collection (reduce credit period), (2) Negotiate longer payable terms with suppliers, (3) Reduce inventory levels (JIT inventory management), (4) Secure a working capital loan or overdraft facility, (5) Convert slow-moving stock into cash.' },
];

const related = calculators.filter(c => ['break-even', 'profit-margin', 'dscr-calculator'].includes(c.id));

export default function WorkingCapitalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Working Capital Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-cyan-700" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Working Capital Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your business working capital and liquidity ratios � current ratio, quick ratio and cash ratio � to assess short-term financial health.</p>
      </div>
      <WorkingCapitalCalc />

      <BusinessToolTable variant="loans" />
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
