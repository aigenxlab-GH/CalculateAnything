import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Receipt } from 'lucide-react';
import { NewTax2526 } from '@/components/calculators/NewTax2526';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'New Income Tax Calculator FY 2025-26 | CalculateToday',
  description: 'Calculate income tax under the new regime for FY 2025-26. Updated tax slabs, ₹75K standard deduction, 87A rebate up to ₹12L income, and 4% cess.',
  keywords: ['income tax calculator 2025-26', 'new tax regime 2025-26', 'income tax FY 2025-26', '87A rebate 2025-26'],
};

const faqs = [
  { q: 'What are the new income tax slabs for FY 2025-26?', a: 'Under the new regime for FY 2025-26: ₹0–4L (0%), ₹4–8L (5%), ₹8–12L (10%), ₹12–16L (15%), ₹16–20L (20%), ₹20–24L (25%), above ₹24L (30%). Plus 4% health and education cess.' },
  { q: 'What is the standard deduction in the new regime?', a: 'Salaried employees and pensioners get a standard deduction of ₹75,000 per year under the new regime for FY 2025-26.' },
  { q: 'Up to what income is tax zero in FY 2025-26?', a: 'If your gross salary is up to ₹12,75,000 (taxable income = ₹12L after ₹75K SD), the Section 87A rebate makes your tax liability zero. Above ₹12.75L, full tax applies on the full taxable income.' },
  { q: 'Is surcharge applicable?', a: 'Yes, surcharge applies if income exceeds ₹50 lakh: 10% surcharge above ₹50L, 15% above ₹1Cr, 25% above ₹2Cr, and 37% above ₹5Cr (capped at 25% for new regime from FY 2023-24).' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2425', 'old-income-tax'].includes(c.id));

export default function NewTax2526Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">New Tax 2025-26</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Receipt className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Income Tax Calculator FY 2025-26</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your exact income tax liability under the new regime for FY 2025-26. Includes ₹75K standard deduction, 87A rebate, surcharge and 4% cess.</p>
      </div>
      <NewTax2526 />

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
