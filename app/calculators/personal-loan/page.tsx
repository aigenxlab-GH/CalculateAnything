import type { Metadata } from 'next';
import { User } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator',
  description: 'Calculate personal loan EMI and total interest cost. Compare different tenures and rates to find the most affordable personal loan.',
  keywords: ['personal loan EMI calculator', 'personal loan calculator India', 'instant personal loan EMI', 'loan EMI calculator'],
  alternates: { canonical: '/calculators/personal-loan/' },
};

const config: LoanConfig = {
  principalLabel: 'Personal Loan Amount',
  principalMin: 50000, principalMax: 5000000,
  defaultPrincipal: 500000,
  defaultRate: 13.0, rateMin: 8, rateMax: 30,
  defaultTenureYears: 3, tenureMax: 5,
  color: '#0891b2',
  buttonLabel: 'Calculate Personal Loan EMI',
  loanType: 'personal',
};

const faqs = [
  { q: 'What is the typical personal loan interest rate?', a: 'Personal loan rates in India range from 10.5% to 24%+ depending on lender, credit score and income. Banks like SBI and HDFC offer 10.5–15%, while fintech lenders may go higher.' },
  { q: 'How fast can I get a personal loan?', a: 'Instant personal loans from fintech apps (KreditBee, MoneyTap) can be disbursed in minutes. Bank personal loans typically take 1–7 working days for existing customers.' },
  { q: 'Should I use personal loan or credit card EMI?', a: 'Personal loan typically has lower interest (11–15%) vs credit card EMI (24–36% equivalent). Personal loan is better for large amounts; credit card EMI suits smaller purchases if your card has a 0% EMI offer.' },
  { q: 'What is a good personal loan interest rate in India?', a: 'Personal loan rates in India range from 9.99% to 24% depending on lender, CIBIL score and income. Banks like SBI (11%), HDFC (10.5%) and ICICI (10.8%) offer lower rates to existing customers with 750+ CIBIL scores. NBFCs like Bajaj Finserv and MoneyView charge 13-20% for faster disbursals. Always compare the APR including processing fees, not just the stated rate.' },
  { q: 'Can I get a personal loan with a low CIBIL score?', a: 'CIBIL below 700: most banks will reject or charge 18-24%. Better alternatives: (1) Loan against FD or PPF at 1-2% above the FD rate. (2) Gold loan at 7-14%. (3) Loan against insurance policy. (4) Employer advance scheme. Building your credit score before taking a personal loan saves significant interest cost over the loan tenure.' },
  { q: 'What is the difference between a personal loan and balance transfer?', a: 'Balance transfer converts high-interest personal loan debt to a lower-rate loan from a new lender. Example: Rs 3L personal loan at 18% transferred to 12% saves Rs 18,000/year in interest. Processing fees for balance transfer are typically 1-2% of the loan amount. Worth doing when the rate difference exceeds 4-5% and there are no large foreclosure charges from the current lender.' },
  { q: 'Is it safe to take a personal loan to invest in the stock market?', a: 'Generally no. Personal loans cost 10-18% p.a. While markets can return more in bull years, you are taking market risk with borrowed money. If the market falls 20%, you still owe the full loan at 15% interest. For most investors, borrowing to invest creates financial stress that leads to panic selling at market bottoms - exactly the wrong outcome.' },
  { q: 'What are personal loan foreclosure charges and how can I avoid them?', a: 'Foreclosure (prepayment in full) charges range from 0–4% of the outstanding balance, usually applicable only within the first 6–12 months. After that, many lenders waive it. Part-prepayment (paying extra lump sums) often has lower or no charges. RBI guidelines prevent banks from charging foreclosure fees on floating-rate personal loans. Always negotiate zero-foreclosure terms when taking the loan — it costs nothing upfront and saves significantly if you prepay early.' },
];

const related = calculators.filter(c => ['emi-calculator', 'home-loan-eligibility', 'loan-prepayment'].includes(c.id));

export default function PersonalLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Personal Loan Calculator" slug="personal-loan" />
      <CalculatorByline slug="personal-loan" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <User className="w-4 h-4 text-cyan-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Personal Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your personal loan EMI and total repayment amount. Compare different loan amounts and tenures to plan your finances better.</p>
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
        name: 'Personal Loan EMI Calculator',
        url: 'https://calculate-today.com/calculators/personal-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Personal loan EMI calculator — compute monthly EMI and total interest for personal loans.',
      }} />
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
      <RelatedGuides calculatorId="personal-loan" />
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
