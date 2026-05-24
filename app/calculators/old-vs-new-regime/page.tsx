import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Scale } from 'lucide-react';
import { OldVsNewTax } from '@/components/calculators/OldVsNewTax';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'Old vs New Income Tax Regime — Which Saves More? | CalculateAnything',
  description: 'Compare old vs new income tax regime side-by-side for FY 2025-26. Find which regime gives you lower tax with your income and deductions.',
  keywords: ['old vs new tax regime', 'income tax regime comparison', 'tax regime 2025-26', 'which tax regime is better'],
};

const faqs = [
  { q: 'Which tax regime is better for salaried employees?', a: 'It depends on your deductions. If you claim significant deductions (80C, HRA, home loan interest), the old regime may save more. If you have few deductions, the new regime\'s lower slabs and ₹12L zero-tax benefit make it better.' },
  { q: 'What is the 87A rebate in the new regime for FY 2025-26?', a: 'Under the new regime for FY 2025-26, if your taxable income (after standard deduction) is ₹12 lakh or less, you get a full rebate under Section 87A — effectively paying zero income tax. This is a significant benefit.' },
  { q: 'Can I switch tax regimes every year?', a: 'Salaried employees can switch between old and new tax regimes every year when filing their return. However, those with business income can switch only once.' },
  { q: 'What deductions can I claim in the old regime?', a: 'Old regime allows deductions under Section 80C (up to ₹1.5L), 80D (medical insurance), HRA exemption, LTA, home loan interest (up to ₹2L), NPS employer contribution, standard deduction (₹50K), and more.' },
];

const related = calculators.filter(c => ['new-income-tax-2526', 'old-income-tax', 'salary-calculator'].includes(c.id));

export default function OldVsNewRegimePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Old vs New Tax Regime</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Scale className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Old vs New Tax Regime</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Compare your tax liability side-by-side under old and new income tax regimes for FY 2025-26. Enter your income and deductions to instantly see which saves you more.</p>
      </div>
      <OldVsNewTax />

      <TaxFilingTable />
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
