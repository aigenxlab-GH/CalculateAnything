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
  title: 'EMI Calculator — Home Loan, Car Loan & Personal Loan EMI India 2026',
  description:
    'Free EMI Calculator India 2026 — calculate monthly EMI, total interest paid and full amortization schedule for home loan, car loan and personal loan. Instant results, no sign-up.',
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

      {/* Cross-Calculator Internal Linking */}
      <section className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-sm font-bold text-blue-900 mb-3">Related Loan & Eligibility Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
          <div>
            <p className="font-semibold text-slate-800 mb-1">Check Eligibility First</p>
            <p className="text-xs text-slate-600 mb-2">Before calculating EMI, find your maximum eligible loan amount using our <a href="/calculators/home-loan-eligibility/" className="text-primary font-medium hover:underline">Home Loan Eligibility Calculator</a>.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Plan Your Prepayment</p>
            <p className="text-xs text-slate-600 mb-2">See how early repayment saves interest with our <a href="/calculators/loan-prepayment/" className="text-primary font-medium hover:underline">Loan Prepayment Calculator</a>.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">EMI vs Investment</p>
            <p className="text-xs text-slate-600 mb-2">Should you prepay or invest? Compare using our <a href="/calculators/sip-calculator/" className="text-primary font-medium hover:underline">SIP Calculator</a> to model both scenarios.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Different Loan Types</p>
            <p className="text-xs text-slate-600 mb-2">Try loan-specific calculators: <a href="/calculators/car-loan/" className="text-primary font-medium hover:underline">Car Loan</a> or <a href="/calculators/personal-loan/" className="text-primary font-medium hover:underline">Personal Loan</a> EMI.</p>
          </div>
        </div>
      </section>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Calculate EMI for a Loan',
        description: 'Step-by-step guide to using the EMI calculator to find monthly loan payments and total interest paid.',
        totalTime: 'PT2M',
        tool: [{ '@type': 'HowToTool', name: 'EMI Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter loan amount', text: 'Type the total loan amount you wish to borrow, e.g. ₹30 lakh for a home loan.' },
          { '@type': 'HowToStep', position: 2, name: 'Set the interest rate', text: 'Enter the annual interest rate quoted by your bank. Current home loan rates are 8.5–9.5% per annum.' },
          { '@type': 'HowToStep', position: 3, name: 'Choose loan tenure', text: 'Select repayment period in months or years. Common tenures are 10, 15, 20 or 30 years.' },
          { '@type': 'HowToStep', position: 4, name: 'View EMI breakdown', text: 'The calculator instantly shows monthly EMI, total interest payable, and total amount paid over the loan tenure.' },
          { '@type': 'HowToStep', position: 5, name: 'Compare tenures', text: 'Try different tenures to find the balance between a lower EMI (longer tenure) and less total interest (shorter tenure).' },
        ],
      }} />
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

      {/* Unique content — loan rate reference table */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Current Loan Interest Rate Reference — India 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 font-semibold text-slate-700">Loan Type</th>
                <th className="text-right py-2 font-semibold text-slate-700">Rate Range (p.a.)</th>
                <th className="text-right py-2 font-semibold text-slate-700">Max Tenure</th>
                <th className="text-right py-2 font-semibold text-slate-700">Typical Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {([
                ['Home Loan', '8.40–9.50%', '30 years', '₹20L–₹5Cr'],
                ['Car Loan', '7.50–11.00%', '7 years', '₹3L–₹50L'],
                ['Personal Loan', '10.50–24.00%', '5 years', '₹50K–₹25L'],
                ['Education Loan', '8.00–13.00%', '15 years', '₹1L–₹75L'],
                ['Gold Loan', '7.00–14.00%', '3 years', '₹10K–₹1Cr'],
                ['Loan Against Property', '8.00–11.00%', '20 years', '₹5L–₹10Cr'],
              ] as [string, string, string, string][]).map(([type, rate, tenure, amount]) => (
                <tr key={type}>
                  <td className="py-2 font-medium text-slate-700">{type}</td>
                  <td className="py-2 text-right">{rate}</td>
                  <td className="py-2 text-right">{tenure}</td>
                  <td className="py-2 text-right">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">Rates are indicative as of May 2026 based on leading Indian bank offerings. Actual rates vary by lender, CIBIL score and loan amount. The EMI calculator above works for all loan types — just enter your specific rate.</p>
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
