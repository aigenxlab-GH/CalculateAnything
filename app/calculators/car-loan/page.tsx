import type { Metadata } from 'next';
import { Car } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator: ₹8L Car at 9% — Monthly Payment?',
  description: 'Free car loan EMI calculator — ₹8L at 9% for 5 years = ₹16,604 EMI, ₹1.96L total interest. Compare different tenures and find cheapest car loan option.',
  keywords: ['car loan EMI calculator', 'car loan calculator India', 'auto loan calculator', 'vehicle loan EMI'],
  alternates: { canonical: '/calculators/car-loan/' },
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
  { q: 'How much car loan can I get on my salary?', a: 'Banks typically allow EMI up to 40% of net monthly income. At ₹50,000 net income, maximum EMI is ~₹20,000. At 10% for 5 years, you can get approx. ₹9.2L car loan.' },
  { q: 'Should I put a higher down payment for a car loan?', a: 'Yes. A larger down payment reduces your loan amount, EMI, total interest, and also improves your chances of loan approval. Aim for at least 20% down payment.' },
  { q: 'How much down payment should I make on a car loan?', a: 'Banks fund 80-90% of the on-road price. The standard advice: put down at least 20% as down payment. Higher down payment means lower loan amount and less total interest. For a Rs 10L car, a 30% down payment saves approximately Rs 15,000-20,000 in total interest over a 5-year loan compared to a 10% down payment.' },
  { q: 'Is it better to buy a car on loan or pay cash if available?', a: 'If you have the cash, paying outright is almost always better - you avoid 9-12% interest. However, if the same cash invested in equity earns more than the car loan rate, borrowing makes mathematical sense. In practice, a car is a depreciating asset losing 10-15% per year. Prefer cash if available; take a loan only if necessary.' },
  { q: 'What documents are needed for a car loan application?', a: 'For salaried employees: PAN card, Aadhaar, last 3 months salary slips, last 6 months bank statements, ITR for last 2 years if required, and Form 16. For self-employed: PAN, Aadhaar, ITR for last 2 years, CA-certified profit and loss statements, and bank statements. Some lenders process car loans in 2-4 hours digitally for existing bank customers.' },
  { q: 'What is the typical car loan interest rate in India in 2025?', a: 'Car loan rates in 2025: SBI (7.25-8.75%), HDFC (7.95-9.40%), ICICI (8.85-10.90%), Bajaj Auto Finance (7.5-17.5%). Rates depend on CIBIL score, car age (new vs used), loan amount and tenure. Used car loans are typically 1-3% higher than new car loans. Pre-owned cars above 5 years are often not financed by large banks.' },
  { q: 'How does a larger down payment reduce my total car loan cost?', a: 'On a Rs 10 lakh car at 10% for 5 years: 10% down (Rs 1L loan = Rs 9L) costs Rs 2.14L in total interest. 30% down (Rs 7L loan) costs Rs 1.66L in interest — saving Rs 48,000. Additionally, lower loan-to-value ratio often qualifies you for a 0.5-1% lower rate, saving another Rs 15,000-20,000. A higher down payment also means lower EMI (Rs 17,012/month vs Rs 19,127/month), improving monthly cash flow.' },
];

const related = calculators.filter(c => ['emi-calculator', 'personal-loan', 'loan-prepayment'].includes(c.id));

export default function CarLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Car Loan Calculator" slug="car-loan" />
      <CalculatorByline slug="car-loan" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Car className="w-4 h-4 text-violet-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Car Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your car loan EMI, total interest and full repayment schedule. Compare different tenures to find the most affordable option.</p>
      </div>
      <LoanCalcPage config={config} />
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
        name: 'Car Loan EMI Calculator',
        url: 'https://calculate-today.com/calculators/car-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Car loan EMI calculator — compute monthly payment, total interest and full amortization schedule.',
      }} />
      {/* Unique content — differentiates from other loan calculators */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Car Loan vs Other Loans — Key Differences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {[
            { title: 'Car Loan', color: 'violet', items: ['Secured against the vehicle', 'Rate: 7.5–11% p.a.', 'Tenure: up to 7 years', 'Funds 80–90% of on-road price', 'OEM tie-up rates often lower'] },
            { title: 'Home Loan', color: 'red', items: ['Secured against property', 'Rate: 8.4–9.5% p.a.', 'Tenure: up to 30 years', 'Tax benefit Sec 24 &amp; 80C', 'Appreciating asset'] },
            { title: 'Personal Loan', color: 'cyan', items: ['Unsecured — no collateral', 'Rate: 10.5–24% p.a.', 'Tenure: up to 5 years', 'No end-use restriction', 'Fastest disbursal (hours)'] },
          ].map(({ title, color, items }) => (
            <div key={title} className={`bg-${color}-50 rounded-xl p-3 text-xs`}>
              <p className={`font-bold text-${color}-700 mb-1.5`}>{title}</p>
              <ul className="space-y-1 text-slate-600">{items.map(i => <li key={i}>• {i}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">A car depreciates 10–15% in Year 1. On a ₹10L car, that's ₹1–1.5L lost in value before the first service. Factor depreciation into your buy-vs-lease decision — the total cost of ownership often exceeds the sticker price by 40–60% over 5 years when you include loan interest, insurance, fuel and maintenance.</p>
      </section>

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
      <RelatedGuides calculatorId="car-loan" />
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
