import type { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { WorkingCapitalCalc } from '@/components/calculators/WorkingCapitalCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Working Capital Calculator: Is Your Business Cash-Flow Healthy?',
  description: 'Free working capital calculator — current ratio below 1.5 is a warning sign. Instantly compute net working capital, current ratio and quick ratio. Assess liquidity.',
  keywords: ['working capital calculator', 'current ratio calculator', 'quick ratio calculator', 'business liquidity calculator'],
  alternates: { canonical: '/calculators/working-capital/' },
};

const faqs = [
  { q: 'What is working capital?', a: 'Working capital = Current Assets - Current Liabilities. It represents the funds available for day-to-day business operations. Positive working capital means the business can meet its short-term obligations. Negative working capital is a warning sign of potential cash flow problems.' },
  { q: 'What is a good current ratio?', a: 'Current Ratio = Current Assets ÷ Current Liabilities. A ratio of 1.5–3.0 is generally considered healthy. Below 1.0 means liabilities exceed assets — liquidity risk. Above 3.0 may indicate idle cash not being put to productive use.' },
  { q: 'What is the quick ratio and why does it matter?', a: 'Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities. It excludes inventory (which may not be quickly convertible to cash). A quick ratio of 1.0+ is considered healthy. This is a stricter test of liquidity than the current ratio.' },
  { q: 'How can I improve working capital?', a: '(1) Speed up receivables collection (reduce credit period), (2) Negotiate longer payable terms with suppliers, (3) Reduce inventory levels (JIT inventory management), (4) Secure a working capital loan or overdraft facility, (5) Convert slow-moving stock into cash.' },
  { q: 'Can a business have negative working capital and still be financially healthy?', a: 'Yes - retail businesses like Amazon operate with negative working capital (current liabilities > current assets). They collect cash from customers immediately but pay suppliers in 30-60 days, using supplier credit to fund operations. This is healthy negative working capital. It becomes dangerous when it stems from unpaid short-term debts the business cannot service.' },
  { q: 'What is the difference between current ratio and quick ratio?', a: 'Current Ratio = Current Assets divided by Current Liabilities (includes inventory). Quick Ratio = (Current Assets minus Inventory) divided by Current Liabilities (excludes inventory for a more conservative liquidity measure). For manufacturing businesses with large slow-moving inventory, quick ratio is more meaningful. Target: Current Ratio > 1.5, Quick Ratio > 1.0.' },
  { q: 'What is the working capital cycle and why does it matter?', a: 'Working Capital Cycle = Inventory Days plus Receivables Days minus Payables Days. Example: 45 + 30 - 20 = 55-day cycle. This means cash is locked for 55 days per sales cycle. Shorter cycle means less working capital needed and less financing cost. To shorten: reduce inventory, collect receivables faster, negotiate longer credit terms with suppliers.' },
  { q: 'What is the difference between working capital and cash flow?', a: 'Working capital is a balance sheet snapshot: current assets minus current liabilities at a point in time. Cash flow is actual cash movement over a period. A business can have positive working capital but negative cash flow if it has large non-cash current assets like slow receivables or obsolete inventory. For day-to-day operations, cash flow is more critical.' },
];

const related = calculators.filter(c => ['break-even', 'profit-margin', 'dscr-calculator'].includes(c.id));

export default function WorkingCapitalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Working Capital Calculator" slug="working-capital" />
      <CalculatorByline slug="working-capital" />
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
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your business working capital and liquidity ratios — current ratio, quick ratio and cash ratio — to assess short-term financial health.</p>
      </div>
      <WorkingCapitalCalc />

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
        name: 'Working Capital Calculator',
        url: 'https://calculate-today.com/calculators/working-capital/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Working capital calculator — compute current ratio, quick ratio and net working capital for your business.',
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
      <RelatedGuides calculatorId="working-capital" />
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
