import type { Metadata } from 'next';
import { GraduationCap } from 'lucide-react';
import { LoanCalcPage, type LoanConfig } from '@/components/calculators/LoanCalcPage';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Education Loan EMI: ₹10L for IIM/Abroad — Monthly Repayment?',
  description: 'Free education loan EMI calculator — ₹10L at 10.5% for 10 years = ₹13,494/month EMI. Compare student loan rates for IIM, IIT, overseas education. Instant.',
  keywords: ['education loan EMI calculator', 'student loan calculator India', 'education loan interest', 'overseas education loan'],
  alternates: { canonical: '/calculators/educational-loan/' },
};

const config: LoanConfig = {
  principalLabel: 'Education Loan Amount',
  principalMin: 100000, principalMax: 7500000,
  defaultPrincipal: 2000000,
  defaultRate: 10.0, rateMin: 6, rateMax: 18,
  defaultTenureYears: 7, tenureMax: 15,
  color: '#059669',
  buttonLabel: 'Calculate Education Loan EMI',
  loanType: 'education',
};

const faqs = [
  { q: 'What is the education loan interest rate?', a: 'Education loan rates range from 8–13% for top colleges and overseas. Government schemes (Vidya Lakshmi) offer subsidised rates. IIT/IIM students may get lower rates due to high placement prospects.' },
  { q: 'When does education loan EMI start?', a: 'Most banks offer a moratorium period (course duration + 6 months to 1 year after job) during which only simple interest accrues. EMI repayment begins after the moratorium period.' },
  { q: 'Is education loan interest tax deductible?', a: 'Yes. Under Section 80E, the entire interest paid on education loan is deductible for 8 years (starting from the year repayment begins). There is no upper limit on this deduction.' },
  { q: 'What is the moratorium period for education loans in India?', a: 'The moratorium period equals course duration plus 6 months (some banks give 1 year). During moratorium, you do not pay EMI but interest accrues and is added to the principal. After moratorium, EMI is calculated on this higher amount. Paying at least the interest during moratorium significantly reduces total interest outgo over the loan life.' },
  { q: 'Do I need collateral for an education loan?', a: 'For loans up to Rs 4 lakh: no collateral required. For Rs 4-7.5 lakh: third-party guarantee required. For above Rs 7.5 lakh: tangible collateral such as property, FD, or insurance policy required for most banks. Specialised lenders like Avanse and InCred sometimes fund without collateral at higher rates.' },
  { q: 'Is education loan interest tax deductible in India?', a: 'Yes - under Section 80E, interest paid on education loan is fully deductible with no upper limit for 8 years from the year repayment begins. The deduction covers interest only, not principal. Applicable only in the old tax regime. This can save Rs 15,000-30,000/year in tax for borrowers in the 20-30% slab.' },
  { q: 'What marks or percentage are needed to get an education loan for abroad studies?', a: 'Most banks require minimum 60% in graduation plus IELTS/TOEFL and GRE/GMAT scores for abroad loans above Rs 20L. Top-tier institution acceptance letters (IVY League, IIM, IIT) see fastest approvals. The biggest factor is the university acceptance letter plus the ROI of the course - expected salary vs total loan amount.' },
  { q: 'How does the moratorium period affect the total interest on an education loan?', a: 'During the moratorium (course duration + 6-12 months), interest accrues on the disbursed principal and is capitalised — added to the loan balance. On a Rs 20L loan at 11% over a 2-year course plus 6-month moratorium (2.5 years moratorium total), accrued interest = Rs 20L × 11% × 2.5 = Rs 5.5L, making the effective loan Rs 25.5L before EMI even begins. Paying the simple interest each month during moratorium (Rs 18,333/month) saves the entire Rs 5.5L from compounding further.' },
];

const related = calculators.filter(c => ['emi-calculator', 'personal-loan', 'home-loan-eligibility'].includes(c.id));

export default function EducationLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Education Loan Calculator" slug="educational-loan" />
      <CalculatorByline slug="educational-loan" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-green-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Education Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate education loan EMI and total repayment. Plan your student loan finances for undergraduate, postgraduate or overseas education.</p>
      </div>
      <LoanCalcPage config={config} />

      <InContentAd format="rectangle" className="my-6" />
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
        name: 'Education Loan EMI Calculator',
        url: 'https://calculate-today.com/calculators/educational-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Education loan EMI calculator — compute monthly payment and total interest for student loans.',
      }} />
      {/* Unique content — differentiates from other loan calculators */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Education Loan Benefits Unique to India</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div className="bg-emerald-50 rounded-xl p-3 text-xs">
            <p className="font-bold text-emerald-700 mb-1.5">Section 80E Tax Deduction</p>
            <p className="text-slate-600">100% of interest paid is tax-deductible for up to 8 years — no upper limit. Saves ₹15,000–30,000/year for borrowers in 20–30% tax slab. Available only under the old regime.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-xs">
            <p className="font-bold text-blue-700 mb-1.5">Moratorium Period</p>
            <p className="text-slate-600">No EMI required during course + 6–12 months after. Only simple interest accrues. Paying even the interest during moratorium prevents it from compounding into a larger principal.</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-xs">
            <p className="font-bold text-amber-700 mb-1.5">Vidya Lakshmi Portal</p>
            <p className="text-slate-600">Government portal (vidyalakshmi.co.in) for applying to multiple banks at once. PM Vidya Lakshmi scheme offers 3% interest subsidy for EWS/LIG students up to ₹10L.</p>
          </div>
        </div>
        <p className="text-xs text-slate-500">Education loans have no collateral requirement up to ₹4L (third-party guarantee for ₹4–7.5L, property/FD for above). Unlike car or personal loans, education loans carry government-backed interest subsidies and complete interest tax deduction — making them the cheapest form of unsecured credit available to students in India.</p>
      </section>
      <InContentAd format="horizontal" className="mb-6" variant="faq" />


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
      <RelatedGuides calculatorId="educational-loan" />
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
