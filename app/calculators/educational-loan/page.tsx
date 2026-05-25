import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Education Loan EMI Calculator | CalculateToday',
  description: 'Calculate education loan EMI for undergraduate, postgraduate or overseas education. Plan your student loan repayment after completing studies.',
  keywords: ['education loan EMI calculator', 'student loan calculator India', 'education loan interest', 'overseas education loan'],
};

const config: LoanConfig = {
  principalLabel: 'Education Loan Amount',
  principalMin: 100000, principalMax: 7500000,
  defaultPrincipal: 2000000,
  defaultRate: 10.0, rateMin: 6, rateMax: 18,
  defaultTenureYears: 7, tenureMax: 15,
  color: '#059669',
  buttonLabel: 'Calculate Education Loan EMI',
  loanType: 'education',
};

const faqs = [
  { q: 'What is the education loan interest rate?', a: 'Education loan rates range from 8–13% for top colleges and overseas. Government schemes (Vidya Lakshmi) offer subsidised rates. IIT/IIM students may get lower rates due to high placement prospects.' },
  { q: 'When does education loan EMI start?', a: 'Most banks offer a moratorium period (course duration + 6 months to 1 year after job) during which only simple interest accrues. EMI repayment begins after the moratorium period.' },
  { q: 'Is education loan interest tax deductible?', a: 'Yes. Under Section 80E, the entire interest paid on education loan is deductible for 8 years (starting from the year repayment begins). There is no upper limit on this deduction.' },
];

const related = calculators.filter(c => ['emi-calculator', 'personal-loan', 'home-loan-eligibility'].includes(c.id));

export default function EducationLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Education Loan Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-green-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Education Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate education loan EMI and total repayment. Plan your student loan finances for undergraduate, postgraduate or overseas education.</p>
      </div>
      <LoanCalcPage config={config} />
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
