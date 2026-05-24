import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Briefcase } from 'lucide-react';
import { EPFCalc } from '@/components/calculators/EPFCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'EPF Calculator � Employee Provident Fund Corpus | CalculateToday',
  description: 'Calculate your EPF corpus at retirement at 8.15% PA. See employee and employer contributions split and total interest earned.',
  keywords: ['EPF calculator', 'employee provident fund calculator', 'PF calculator India', 'EPF corpus calculator'],
};

const faqs = [
  { q: 'What is EPF and who must contribute?', a: 'EPF (Employee Provident Fund) is mandatory for employees earning up to ?15,000/month at establishments with 20+ workers. Both employer and employee contribute 12% of basic salary.' },
  { q: 'What is the current EPF interest rate?', a: 'EPF interest rate for FY 2023-24 is 8.15% per annum. The EPFO Board recommends the rate each year, subject to government approval.' },
  { q: 'What happens to EPF at retirement?', a: 'The entire EPF balance (employee + employer contributions + interest) can be withdrawn tax-free if you have 5+ years of continuous service.' },
  { q: 'How is EPF different from EPS?', a: 'Employee contributes 12% to EPF. Employer contributes 12% � but only 3.67% goes to EPF; the remaining 8.33% goes to EPS (Employee Pension Scheme), which provides pension but has lower corpus.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'nps-calculator', 'gratuity-calculator'].includes(c.id));

export default function EPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">EPF Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-teal-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">EPF Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Employee Provident Fund corpus at retirement. See how employee (12%) and employer (3.67%) contributions compound at 8.15% interest.</p>
      </div>
      <EPFCalc />
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
