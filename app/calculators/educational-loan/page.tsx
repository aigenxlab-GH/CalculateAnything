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

      {/* Education loan rate comparison */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Education Loan Interest Rates — Banks &amp; NBFCs Compared</h2>
        <p className="text-xs text-slate-500 mb-3">
          Rates vary widely by institution tier and loan amount. Premier institutes (IIT, IIM, ISB, top foreign universities) get the lowest rates because of strong placement records. Collateral-backed loans are typically 1–2% cheaper than unsecured ones.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Lender</th>
                <th className="px-3 py-2 text-left border border-slate-100">Rate Range (p.a.)</th>
                <th className="px-3 py-2 text-left border border-slate-100">Max Amount</th>
                <th className="px-3 py-2 text-left border border-slate-100">Collateral-Free Limit</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['SBI Student Loan', '8.15% – 11.15%', '₹1.5 Cr (abroad)', '₹7.5L'],
                ['SBI Scholar Loan (IIT/IIM/NIT)', '8.05% – 9.65%', '₹40L', 'Full amount'],
                ['Bank of Baroda', '8.40% – 11.15%', '₹1.5 Cr', '₹7.5L'],
                ['HDFC Credila', '10.25% – 13.50%', 'No cap', 'Case-by-case'],
                ['ICICI Bank', '9.50% – 13.25%', '₹3 Cr', '₹1 Cr (select institutes)'],
                ['Avanse / InCred (NBFC)', '11.50% – 14.50%', 'No cap', 'Higher limits, higher rates'],
              ].map(([lender, rate, max, cf]) => (
                <tr key={lender} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-medium">{lender}</td>
                  <td className="px-3 py-2 border border-slate-100 font-bold text-green-700">{rate}</td>
                  <td className="px-3 py-2 border border-slate-100">{max}</td>
                  <td className="px-3 py-2 border border-slate-100">{cf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Indicative 2025-26 rates — verify with the lender. Girl students typically get a 0.50% concession at public banks. Compare via the government&apos;s Vidya Lakshmi portal to apply to multiple banks with one form.</p>
      </section>

      {/* Moratorium impact table */}
      <section className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-emerald-900 mb-2">Moratorium Choice — Pay Interest Now or Let It Compound?</h2>
        <p className="text-sm text-slate-700 mb-3">₹20L loan at 10.5% for a 2-year course + 6-month moratorium (2.5 years), then 10-year repayment. What you do during the moratorium changes the total cost dramatically:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-emerald-100 text-emerald-900">
                <th className="px-3 py-2 text-left border border-emerald-200">Strategy During Moratorium</th>
                <th className="px-3 py-2 text-left border border-emerald-200">Balance at EMI Start</th>
                <th className="px-3 py-2 text-left border border-emerald-200">EMI (10 yrs)</th>
                <th className="px-3 py-2 text-left border border-emerald-200">Total Cost</th>
                <th className="px-3 py-2 text-left border border-emerald-200">Extra vs Full Interest</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['Pay full interest (₹17,500/mo)', '₹20,00,000', '₹26,987', '₹37,63,440', '—'],
                ['Pay partial interest (₹8,750/mo)', '₹22,62,500', '₹30,529', '₹39,26,000', '+₹1,62,560'],
                ['Pay nothing (interest capitalises)', '₹25,25,000', '₹34,071', '₹40,88,520', '+₹3,25,080'],
              ].map(([strategy, balance, emi, total, extra]) => (
                <tr key={strategy} className="border-b border-emerald-100 hover:bg-emerald-50">
                  <td className="px-3 py-2 border border-emerald-100 font-medium">{strategy}</td>
                  <td className="px-3 py-2 border border-emerald-100">{balance}</td>
                  <td className="px-3 py-2 border border-emerald-100">{emi}</td>
                  <td className="px-3 py-2 border border-emerald-100 font-semibold">{total}</td>
                  <td className="px-3 py-2 border border-emerald-100 text-red-600 font-medium">{extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">Figures are approximate (simple interest during moratorium, then reducing-balance EMI). Even partial interest payments during the course — from internships or family support — save lakhs. Remember: all interest paid is deductible under Section 80E (old regime) with no upper limit.</p>
      </section>

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
