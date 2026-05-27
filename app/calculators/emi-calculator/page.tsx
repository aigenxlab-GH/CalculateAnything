import type { Metadata } from 'next';
import { CreditCard } from 'lucide-react';
import { EMICalculatorClient } from '@/components/calculators/EMICalculatorClient';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'EMI Calculator — Calculate Loan EMI Instantly',
  description:
    'Free EMI Calculator — calculate monthly EMI, total interest, and amortization schedule for home loan, car loan, and personal loan. Instant results.',
  keywords: ['EMI calculator', 'home loan EMI', 'car loan calculator', 'personal loan EMI', 'amortization schedule'],
  alternates: { canonical: '/calculators/emi-calculator/' },
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
  { q: 'What happens if I miss an EMI payment?', a: 'Missing one EMI typically triggers: late payment charge of Rs 500-1,000, negative CIBIL score impact of 50-100 points, and penal interest on the overdue amount. If you are struggling, always contact your bank before missing a payment - most banks offer a 3-month moratorium or restructuring. One missed EMI does less damage than two or three consecutive misses.' },
  { q: 'EMI vs SIP - should I prepay my loan or invest the extra money?', a: 'Compare post-tax loan rate vs post-tax investment return. Home loan at 8.5% vs equity SIP at 12% post-tax: invest the surplus. Personal loan at 16%: prepay first. The break-even is around 10-11% for most investors. For moderate rates of 9-11%, split 50/50 between prepayment and investment for a balanced approach.' },
  { q: 'What are foreclosure charges on a loan in India?', a: 'Foreclosure means closing the entire loan before maturity. Charges: Home loans (floating rate) - RBI prohibits charges for individual borrowers, so zero. Home loans (fixed rate) - 2-3% of outstanding. Personal and car loans - 2-5% of outstanding depending on lender. Always verify foreclosure charges before signing the loan agreement.' },
  { q: 'How does the reducing balance method work for EMI calculation?', a: 'All modern bank loans use reducing balance method - interest is calculated each month on the outstanding principal, not the original principal. Early EMIs have high interest component; later EMIs have high principal component. This differs from flat rate loans where interest is on original principal - a flat rate of 10% equals an effective reducing balance rate of approximately 18%.' },
];

const related = calculators.filter((c) => ['gst-calculator', 'ppc-calculator', 'sip-calculator'].includes(c.id));

export default function EMICalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-1 pb-8">
      <CalculatorBreadcrumb name="EMI Calculator" slug="emi-calculator" />

      <CalculatorByline slug="emi-calculator" />
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

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'EMI Calculator',
        url: 'https://calculate-today.com/calculators/emi-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Free EMI calculator — calculate monthly EMI, total interest and amortization for any loan.',
      }} />
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
      <RelatedGuides calculatorId="emi-calculator" />
      <NewsletterCapture />
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
