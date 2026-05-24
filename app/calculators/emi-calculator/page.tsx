import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CreditCard } from 'lucide-react';
import { EMICalculatorClient } from '@/components/calculators/EMICalculatorClient';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'EMI Calculator — Calculate Loan EMI Instantly',
  description:
    'Free EMI Calculator — calculate monthly EMI, total interest, and amortization schedule for home loan, car loan, and personal loan. Instant results.',
  keywords: ['EMI calculator', 'home loan EMI', 'car loan calculator', 'personal loan EMI', 'amortization schedule'],
};

const faqs = [
  {
    q: 'What is EMI?',
    a: 'EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender every month on a fixed date. It consists of both the principal repayment and the interest accrued.',
  },
  {
    q: 'How is EMI calculated?',
    a: 'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the principal loan amount, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the number of monthly installments.',
  },
  {
    q: 'Does prepayment reduce my EMI?',
    a: 'Yes. Making a partial prepayment reduces your outstanding principal, which lowers the total interest payable. You can choose to either reduce your EMI amount or shorten the loan tenure.',
  },
  {
    q: 'What is an amortization schedule?',
    a: 'An amortization schedule shows the month-by-month breakdown of each EMI payment — how much goes toward principal repayment vs. interest, and the remaining outstanding balance.',
  },
];

const related = calculators.filter((c) => ['gst-calculator', 'ppc-calculator', 'sip-calculator'].includes(c.id));

export default function EMICalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-1 pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/" className="hover:text-primary transition-colors">Calculators</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">EMI Calculator</span>
      </nav>

      {/* Title — compact single-line layout */}
      <div className="mb-2 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
          <CreditCard className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">EMI Calculator</h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-snug">
            Calculate monthly EMI, total interest and full amortization for any loan.
          </p>
        </div>
      </div>

      {/* Calculator (includes BankRateTable below the 3-col grid) */}
      <EMICalculatorClient />

      {/* FAQ */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This EMI Calculator</h2>
        <ol className="space-y-3">
          {[
            'Enter your loan amount (the principal you wish to borrow).',
            'Set the annual interest rate offered by your bank or lender.',
            'Choose the loan tenure in years or months.',
            'Your monthly EMI, total interest, and total repayment amount are instantly calculated.',
            'Scroll down to view the full amortization schedule showing how each payment is split.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
    </div>
  );
}
