import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { HRACalc } from '@/components/calculators/HRACalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'HRA Exemption Calculator — Section 10(13A) | CalculateToday',
  description: 'Calculate HRA tax exemption under Section 10(13A). Get the minimum of 3 conditions: actual HRA, rent-10% of basic, and 50/40% of basic salary.',
  keywords: ['HRA exemption calculator', 'HRA tax exemption', 'Section 10(13A)', 'house rent allowance India'],
};

const faqs = [
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the minimum of: (1) Actual HRA received from employer, (2) Rent paid minus 10% of Basic Salary, (3) 50% of Basic Salary (metro) or 40% (non-metro).' },
  { q: 'Is HRA available in the new tax regime?', a: 'No. HRA exemption is only available under the old tax regime. If you opt for the new regime, HRA is fully taxable.' },
  { q: 'Which cities are considered metro for HRA?', a: 'Mumbai, Delhi, Kolkata, and Chennai are considered metros (50% of basic). All other cities including Bangalore, Hyderabad, Pune, Ahmedabad are non-metro (40% of basic).' },
  { q: 'What documents are needed to claim HRA?', a: 'You need rent receipts from your landlord. If annual rent exceeds ₹1 lakh, you also need the landlord\'s PAN number. Rent agreement is advisable.' },
];

const related = calculators.filter(c => ['salary-calculator', 'old-income-tax', 'old-vs-new-regime'].includes(c.id));

export default function HRAPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">HRA Exemption</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-orange-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">HRA Exemption Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your HRA tax exemption under Section 10(13A). See all three conditions and find the minimum exempt amount based on your HRA, basic salary, and rent paid.</p>
      </div>
      <HRACalc />

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
