import type { Metadata } from 'next';
import { Home } from 'lucide-react';
import { LoanEligibility } from '@/components/calculators/LoanEligibility';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Home Loan Eligibility Calculator — Check Housing Loan Eligibility India',
  description: 'Free home loan eligibility calculator India — find out how much home loan you can get based on your monthly salary, existing EMIs, age and loan tenure.',
  keywords: ['home loan eligibility calculator', 'how much home loan can I get', 'home loan eligibility by salary', 'FOIR calculator'],
  alternates: { canonical: '/calculators/home-loan-eligibility/' },
};

const faqs = [
  { q: 'How is home loan eligibility calculated based on salary?', a: 'Banks use FOIR (Fixed Obligation to Income Ratio) — typically 40–50% of net monthly income. If your income is ₹80,000/month and existing EMIs are ₹10,000, available EMI capacity = ₹22,000–₹30,000. Loan eligibility is the loan amount achievable at this EMI for your chosen tenure. Use our calculator to enter your salary and find your exact eligible amount.' },
  { q: 'What is a good FOIR for home loan?', a: 'Most lenders prefer FOIR below 40–45%. Below 30% FOIR gives excellent eligibility and better chances of approval at lower rates. Above 50% FOIR, many lenders will decline or offer lower amounts.' },
  { q: 'How much home loan can I get on Rs 80,000 monthly salary?', a: 'On a ₹80,000 monthly salary with no existing EMIs: at 45% FOIR, available EMI capacity = ₹36,000/month. At 9% interest for 20 years, this qualifies for approximately ₹45-50 lakh home loan. If you have existing EMIs of ₹8,000, your eligible loan reduces to ₹35-40 lakh. Use the calculator with your exact salary and tenure to get your precise eligible amount.' },
  { q: 'What is the home loan eligibility calculator and how to use it?', a: 'The home loan eligibility calculator computes the maximum loan amount you can borrow based on your monthly income, existing EMI obligations, preferred tenure, and current interest rates. It uses the standard FOIR method (40-50% of income). Simply enter your net monthly salary, existing loan EMIs, preferred tenure in years, and click calculate. The tool will show your maximum eligible loan amount instantly.' },
  { q: 'Does credit score affect home loan eligibility?', a: 'Yes significantly. Credit score 750+ gives best rates and full eligibility. Score 700–750 may get approval with slightly higher rates. Score below 650 often results in rejection or very high rates. Check your CIBIL score before applying.' },
  { q: 'What is FOIR and how do banks use it to determine home loan eligibility?', a: 'FOIR (Fixed Obligation to Income Ratio) = Total monthly EMIs divided by net monthly income. Banks allow maximum 40-55% FOIR. If your net income is Rs 80,000 and existing EMIs are Rs 15,000, available FOIR for new EMIs is Rs 80,000 x 50% minus Rs 15,000 = Rs 25,000/month. This dictates the maximum loan you can get. The eligibility calculator applies FOIR to compute your eligible amount.' },
  { q: 'Does adding a co-applicant increase my home loan eligibility?', a: 'Yes - significantly. Adding a co-applicant (spouse, parent) combines both incomes for FOIR calculation, often increasing eligibility by 40-60%. Example: Rs 60,000 plus Rs 40,000 = Rs 1L combined income vs individual Rs 60,000 eligibility. Many banks also give lower interest rates to co-applicant applications. The co-applicant should have a good CIBIL score of 750+.' },
  { q: 'What CIBIL score is required for a home loan in India?', a: 'Most banks require a minimum CIBIL score of 750 for home loan approval and best interest rates. Score 750-800: approved at standard rates. Score 800+: eligible for 0.05-0.25% lower rates. Score below 700: likely rejection or significantly higher rates. If your score is low, spend 6-12 months paying all EMIs on time and reducing credit card utilisation to below 30%.' },
  { q: 'What documents are required for home loan eligibility verification?', a: 'Banks typically require: (1) Last 2 years ITR (Income Tax Return) and salary slips, (2) Last 6 months bank statements, (3) Employment letter from employer, (4) CIBIL report/credit score, (5) Property documents and valuation report, (6) ID, address, and age proof. Self-employed need 3 years ITR and business registration. Co-applicants need the same documents separately. Early submission of documents speeds up approval.' },
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

      {/* Featured Snippet Section - Quick Answer */}
      <section className="bg-red-50 border-l-4 border-red-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-red-900 mb-2">Quick Answer: How Much Home Loan Can I Get?</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>Maximum Home Loan</strong> = (Monthly Income × FOIR% - Existing EMIs) × Loan Tenure Factor
        </p>
        <div className="bg-white rounded p-3 mb-3">
          <p className="text-xs text-slate-600 mb-2"><strong>Example:</strong> Rs 80,000 monthly salary, no existing EMIs, 20-year tenure:</p>
          <ul className="text-xs text-slate-700 space-y-1 ml-4">
            <li>• Available EMI capacity (50% FOIR): Rs 40,000/month</li>
            <li>• At 9% interest, 20 years: ~Rs 45-50 lakh eligible</li>
            <li>• With spouse income (Rs 60,000): Rs 70-75 lakh eligible</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600">
          Banks use FOIR (Fixed Obligation to Income Ratio) at 40-50%. Use the calculator to enter your exact salary, existing EMIs, and tenure to find your maximum eligible loan amount.
        </p>
      </section>
      <LoanEligibility />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Calculator',
        name: 'Home Loan Eligibility Calculator',
        description: 'Calculate maximum home loan eligibility based on your monthly income, existing EMI obligations, and preferred loan tenure using FOIR method.',
        url: 'https://calculate-today.com/calculators/home-loan-eligibility/',
        applicationCategory: 'FinanceApplication',
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
        name: 'Home Loan Eligibility Calculator',
        url: 'https://calculate-today.com/calculators/home-loan-eligibility/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Home loan eligibility calculator — check maximum loan amount based on salary and existing obligations.',
      }} />
      {/* Common Mistakes Section */}
      <section className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-900 mb-3">❌ Common Home Loan Eligibility Mistakes</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="font-bold text-red-600">1.</span> <span><strong>Using gross salary instead of net:</strong> Banks use net monthly income (after tax) for FOIR calculation, not gross CTC. This can reduce eligibility by 20-30%.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">2.</span> <span><strong>Ignoring existing EMI obligations:</strong> Banks subtract all existing EMIs (car loans, personal loans, credit cards) from FOIR. Missing even one existing EMI inflates calculated eligibility.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">3.</span> <span><strong>Not checking CIBIL score first:</strong> Even if eligible by income, a low CIBIL score (&lt;700) can result in outright rejection. Check your score before applying.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">4.</span> <span><strong>Assuming same eligibility across banks:</strong> Different banks use different FOIR ratios (40-55%), have different credit score thresholds, and assess self-employed differently.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">5.</span> <span><strong>Adding co-applicant with low income/score:</strong> A co-applicant with poor credit history can drag down your application instead of helping. Verify their CIBIL &gt;750 first.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">6.</span> <span><strong>Forgetting to disclose all income sources:</strong> Rental income, freelance work, investment returns all count toward total income. Under-reporting limits eligibility.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">7.</span> <span><strong>Using current salary for self-employed:</strong> Banks average income over 3 years for self-employed. A sudden 50% salary increase this year won't increase eligibility.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">8.</span> <span><strong>Not preparing documentation in advance:</strong> Delayed ITR, bank statements, employment letters can slow approval by 2-3 weeks. Have 2 years of documents ready.</span></li>
        </ul>
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
      <RelatedGuides calculatorId="home-loan-eligibility" />
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
