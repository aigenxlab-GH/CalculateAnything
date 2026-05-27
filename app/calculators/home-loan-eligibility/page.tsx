import type { Metadata } from 'next';
import { Home } from 'lucide-react';
import { LoanEligibility } from '@/components/calculators/LoanEligibility';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'Home Loan Eligibility Calculator',
  description: 'Check your home loan eligibility based on monthly income, existing EMIs and preferred tenure. Find out the maximum home loan amount you can get.',
  keywords: ['home loan eligibility calculator', 'how much home loan can I get', 'home loan eligibility by salary', 'FOIR calculator'],
  alternates: { canonical: '/calculators/home-loan-eligibility/' },
};

const faqs = [
  { q: 'How is home loan eligibility calculated?', a: 'Banks use FOIR (Fixed Obligation to Income Ratio) — typically 40–50% of net monthly income. If your income is ₹80,000/month and existing EMIs are ₹10,000, available EMI capacity = ₹22,000–₹30,000. Loan eligibility is the loan amount achievable at this EMI for your chosen tenure.' },
  { q: 'What is a good FOIR for home loan?', a: 'Most lenders prefer FOIR below 40–45%. Below 30% FOIR gives excellent eligibility and better chances of approval at lower rates. Above 50% FOIR, many lenders will decline or offer lower amounts.' },
  { q: 'How can I increase my home loan eligibility?', a: '(1) Add a co-applicant (spouse income counts), (2) Close existing loans/credit card dues, (3) Opt for longer tenure (increases eligible amount), (4) Improve credit score above 750, (5) Show additional income sources like rent or freelance.' },
  { q: 'Does credit score affect home loan eligibility?', a: 'Yes significantly. Credit score 750+ gives best rates and full eligibility. Score 700–750 may get approval with slightly higher rates. Score below 650 often results in rejection or very high rates. Check your CIBIL score before applying.' },
  { q: 'What is FOIR and how do banks use it to determine home loan eligibility?', a: 'FOIR (Fixed Obligation to Income Ratio) = Total monthly EMIs divided by net monthly income. Banks allow maximum 40-55% FOIR. If your net income is Rs 80,000 and existing EMIs are Rs 15,000, available FOIR for new EMIs is Rs 80,000 x 50% minus Rs 15,000 = Rs 25,000/month. This dictates the maximum loan you can get. The eligibility calculator applies FOIR to compute your eligible amount.' },
  { q: 'Does adding a co-applicant increase my home loan eligibility?', a: 'Yes - significantly. Adding a co-applicant (spouse, parent) combines both incomes for FOIR calculation, often increasing eligibility by 40-60%. Example: Rs 60,000 plus Rs 40,000 = Rs 1L combined income vs individual Rs 60,000 eligibility. Many banks also give lower interest rates to co-applicant applications. The co-applicant should have a good CIBIL score of 750+.' },
  { q: 'What CIBIL score is required for a home loan in India?', a: 'Most banks require a minimum CIBIL score of 750 for home loan approval and best interest rates. Score 750-800: approved at standard rates. Score 800+: eligible for 0.05-0.25% lower rates. Score below 700: likely rejection or significantly higher rates. If your score is low, spend 6-12 months paying all EMIs on time and reducing credit card utilisation to below 30%.' },
  { q: 'How can I increase my home loan eligibility?', a: 'Strategies to increase eligibility: (1) Pre-close small loans to reduce FOIR. (2) Add a co-applicant with stable income. (3) Opt for 30-year tenure to reduce EMI and increase eligible amount. (4) Improve CIBIL score. (5) Show additional income sources with IT returns. Most banks assess 3-year average income from ITR, not just current salary.' },
];

const related = calculators.filter(c => ['home-loan', 'emi-calculator', 'loan-prepayment'].includes(c.id));

export default function HomeLoanEligibilityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Home Loan Eligibility" slug="home-loan-eligibility" />
      <CalculatorByline slug="home-loan-eligibility" />
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
        name: 'Home Loan Eligibility Calculator',
        url: 'https://calculate-today.com/calculators/home-loan-eligibility/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Home loan eligibility calculator — check maximum loan amount based on salary and existing obligations.',
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
