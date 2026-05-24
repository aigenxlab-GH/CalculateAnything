import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { LoanEligibility } from '@/components/calculators/LoanEligibility';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Home Loan Eligibility Calculator | CalculateToday',
  description: 'Check your home loan eligibility based on monthly income, existing EMIs and preferred tenure. Find out the maximum home loan amount you can get.',
  keywords: ['home loan eligibility calculator', 'how much home loan can I get', 'home loan eligibility by salary', 'FOIR calculator'],
};

const faqs = [
  { q: 'How is home loan eligibility calculated?', a: 'Banks use FOIR (Fixed Obligation to Income Ratio) � typically 40�50% of net monthly income. If your income is ?80,000/month and existing EMIs are ?10,000, available EMI capacity = ?22,000�?30,000. Loan eligibility is the loan amount achievable at this EMI for your chosen tenure.' },
  { q: 'What is a good FOIR for home loan?', a: 'Most lenders prefer FOIR below 40�45%. Below 30% FOIR gives excellent eligibility and better chances of approval at lower rates. Above 50% FOIR, many lenders will decline or offer lower amounts.' },
  { q: 'How can I increase my home loan eligibility?', a: '(1) Add a co-applicant (spouse income counts), (2) Close existing loans/credit card dues, (3) Opt for longer tenure (increases eligible amount), (4) Improve credit score above 750, (5) Show additional income sources like rent or freelance.' },
  { q: 'Does credit score affect home loan eligibility?', a: 'Yes significantly. Credit score 750+ gives best rates and full eligibility. Score 700�750 may get approval with slightly higher rates. Score below 650 often results in rejection or very high rates. Check your CIBIL score before applying.' },
];

const related = calculators.filter(c => ['home-loan', 'emi-calculator', 'loan-prepayment'].includes(c.id));

export default function HomeLoanEligibilityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Home Loan Eligibility</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-red-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Home Loan Eligibility Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Find the maximum home loan you can get based on your income, existing obligations and preferred tenure. Uses the standard FOIR method used by banks.</p>
      </div>
      <LoanEligibility />
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
