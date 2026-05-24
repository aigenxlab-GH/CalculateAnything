import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Car } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator | CalculateToday',
  description: 'Calculate car loan EMI, total interest and repayment schedule. Find the best car loan tenure and compare rates before buying your dream car.',
  keywords: ['car loan EMI calculator', 'car loan calculator India', 'auto loan calculator', 'vehicle loan EMI'],
};

const config: LoanConfig = {
  principalLabel: 'Car Loan Amount',
  principalMin: 100000, principalMax: 5000000,
  defaultPrincipal: 800000,
  defaultRate: 9.5, rateMin: 6, rateMax: 20,
  defaultTenureYears: 5, tenureMax: 7,
  color: '#7c3aed',
  buttonLabel: 'Calculate Car Loan EMI',
  loanType: 'car',
};

const faqs = [
  { q: 'What is the current car loan interest rate?', a: 'Car loan rates in India range from 8.5% to 12%+ depending on the bank, your credit score and whether it\'s a new or used vehicle. Maruti, Hyundai and other OEM tie-ups sometimes offer special rates.' },
  { q: 'How much car loan can I get on my salary?', a: 'Banks typically allow EMI up to 40% of net monthly income. At ?50,000 net income, maximum EMI is ~?20,000. At 10% for 5 years, you can get approx. ?9.2L car loan.' },
  { q: 'Should I put a higher down payment for a car loan?', a: 'Yes. A larger down payment reduces your loan amount, EMI, total interest, and also improves your chances of loan approval. Aim for at least 20% down payment.' },
];

const related = calculators.filter(c => ['emi-calculator', 'personal-loan', 'loan-prepayment'].includes(c.id));

export default function CarLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Car Loan Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Car className="w-4 h-4 text-violet-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Car Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your car loan EMI, total interest and full repayment schedule. Compare different tenures to find the most affordable option.</p>
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
