import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { BankRateTable } from '@/components/calculators/BankRateTable';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator � Calculate Monthly EMI | CalculateToday',
  description: 'Calculate home loan EMI, total interest payable and full amortization schedule. Compare home loan rates and tenures to plan your dream home purchase.',
  keywords: ['home loan EMI calculator', 'housing loan calculator', 'home loan interest calculator', 'mortgage calculator India'],
};

const config: LoanConfig = {
  principalLabel: 'Home Loan Amount',
  principalMin: 500000, principalMax: 20000000,
  defaultPrincipal: 5000000,
  defaultRate: 8.5, rateMin: 5, rateMax: 18,
  defaultTenureYears: 20, tenureMax: 30,
  color: '#dc2626',
  buttonLabel: 'Calculate Home Loan EMI',
  loanType: 'home',
};

const faqs = [
  { q: 'What is the home loan interest rate in 2024?', a: 'Home loan rates in India currently range from 8.35% (SBI) to 9.5%+ depending on the lender, loan amount, credit score and tenure. Floating rate loans are linked to external benchmarks like RBI repo rate.' },
  { q: 'How much home loan can I get on ?50,000 salary?', a: 'Banks typically allow 40�50% FOIR (Fixed Obligation to Income Ratio). On ?50,000/month income with no existing EMIs, you may be eligible for approx. ?25�30L at 8.5% for 20 years.' },
  { q: 'Should I opt for longer or shorter home loan tenure?', a: 'Longer tenure reduces monthly EMI but increases total interest paid significantly. A 30-year loan at 8.5% on ?50L costs about 2.5� in total interest vs a 10-year loan. Shorter tenure saves more.' },
  { q: 'Is home loan interest tax deductible?', a: 'Yes. Home loan principal repayment qualifies under Section 80C (up to ?1.5L). Interest on home loan qualifies under Section 24 (up to ?2L for self-occupied property). Both deductions are under old tax regime only.' },
];

const related = calculators.filter(c => ['interest-free-home-loan', 'loan-prepayment', 'home-loan-eligibility'].includes(c.id));

export default function HomeLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Home Loan Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-red-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Home Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your monthly home loan EMI, total interest payable and view full amortization schedule. Adjust tenure and rate to find the perfect combination.</p>
      </div>
      <LoanCalcPage config={config} />
      <BankRateTable principal={5000000} tenureMonths={240} lockedLoanType="home" />
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
