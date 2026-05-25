import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Receipt } from 'lucide-react';
import { NewTax2425 } from '@/components/calculators/NewTax2425';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'New Income Tax Calculator FY 2024-25 | CalculateToday',
  description: 'Calculate income tax under the new regime for FY 2024-25. Tax slabs, ₹75K standard deduction, 87A rebate up to ₹7L taxable income, cess and surcharge.',
  keywords: ['income tax calculator 2024-25', 'new tax regime 2024-25', 'income tax FY 2024-25'],
};

const faqs = [
  { q: 'What are the tax slabs for FY 2024-25 new regime?', a: '₹0–3L (0%), ₹3–7L (5%), ₹7–10L (10%), ₹10–12L (15%), ₹12–15L (20%), above ₹15L (30%). Standard deduction of ₹75,000 applies.' },
  { q: 'What is the 87A rebate limit for FY 2024-25?', a: 'Under the new regime for FY 2024-25, the rebate u/s 87A applies if taxable income (after SD) = ₹7 lakh. The full tax is rebated, making net tax zero.' },
  { q: 'How does FY 2024-25 differ from FY 2025-26?', a: 'FY 2025-26 brought significantly better slabs and raised the 87A rebate from ₹7L to ₹12L, making more people tax-free. The standard deduction of ₹75K remains the same.' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2526', 'old-income-tax'].includes(c.id));

export default function NewTax2425Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">New Tax 2024-25</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Receipt className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Income Tax Calculator FY 2024-25</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your income tax under the new regime for FY 2024-25 with updated slabs, 87A rebate up to ₹7 lakh taxable income, and 4% cess.</p>
      </div>
      <NewTax2425 />

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
