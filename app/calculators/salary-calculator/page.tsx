import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Wallet } from 'lucide-react';
import { SalaryCalc } from '@/components/calculators/SalaryCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'Salary Calculator � CTC to Take Home | CalculateToday',
  description: 'Convert CTC to in-hand salary. See complete salary breakup: basic pay, HRA, special allowance, PF deductions, professional tax and net monthly take-home.',
  keywords: ['salary calculator India', 'CTC to take home', 'in-hand salary calculator', 'salary breakup India'],
};

const faqs = [
  { q: 'How is take-home salary calculated from CTC?', a: 'Take-home = Gross Salary � Employee PF � Professional Tax. Gross Salary = Basic + HRA + Special Allowance. CTC also includes Employer PF, which is not paid to the employee.' },
  { q: 'What is the standard CTC breakup in India?', a: 'Typical breakup: Basic = 40% of CTC, HRA = 50% of Basic (metro), Special Allowance = remainder. Employee PF = 12% of Basic (capped at ?1800/month). Professional Tax = ?200/month.' },
  { q: 'Is PF deducted from in-hand salary?', a: 'Yes. 12% of basic salary (capped at ?1800/month) is deducted as Employee PF. An equal amount is contributed by the employer, but it forms part of CTC and is not in-hand.' },
  { q: 'What is professional tax?', a: 'Professional Tax is a state-level tax on salaries, typically ?200/month (?2,400/year). It varies by state � some states don\'t levy it at all.' },
];

const related = calculators.filter(c => ['hra-exemption', 'old-vs-new-regime', 'epf-calculator'].includes(c.id));

export default function SalaryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Salary Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-violet-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Salary Calculator � CTC to Take Home</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Convert your annual CTC into monthly take-home salary. See the complete breakup of basic pay, HRA, PF and professional tax deductions.</p>
      </div>
      <SalaryCalc />

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
