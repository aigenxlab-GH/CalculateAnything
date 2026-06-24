import type { Metadata } from 'next';
import { Home } from 'lucide-react';
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
  title: 'Home Loan EMI: ₹50L at 8.5% for 20 Years — Monthly Cost?',
  description: 'Free home loan EMI calculator — ₹50L at 8.5% for 20 yrs = ₹43,391/month, ₹54.1L total interest. Full amortization schedule. Compare SBI, HDFC, ICICI rates 2026.',
  keywords: ['home loan EMI calculator', 'housing loan calculator', 'home loan interest calculator', 'mortgage calculator India'],
  alternates: { canonical: '/calculators/home-loan/' },
};

const config: LoanConfig = {
  principalLabel: 'Home Loan Amount',
  principalMin: 500000, principalMax: 20000000,
  defaultPrincipal: 5000000,
  defaultRate: 8.5, rateMin: 5, rateMax: 18,
  defaultTenureYears: 20, tenureMax: 30,
  color: '#dc2626',
  buttonLabel: 'Calculate Home Loan EMI',
  loanType: 'home',
};

const faqs = [
  { q: 'What is the home loan interest rate in 2024?', a: 'Home loan rates in India currently range from 8.35% (SBI) to 9.5%+ depending on the lender, loan amount, credit score and tenure. Floating rate loans are linked to external benchmarks like RBI repo rate.' },
  { q: 'How much home loan can I get on ₹50,000 salary?', a: 'Banks typically allow 40–50% FOIR (Fixed Obligation to Income Ratio). On ₹50,000/month income with no existing EMIs, you may be eligible for approx. ₹25–30L at 8.5% for 20 years.' },
  { q: 'Should I opt for longer or shorter home loan tenure?', a: 'Longer tenure reduces monthly EMI but increases total interest paid significantly. A 30-year loan at 8.5% on ₹50L costs about 2.5× in total interest vs a 10-year loan. Shorter tenure saves more.' },
  { q: 'Is home loan interest tax deductible?', a: 'Yes. Home loan principal repayment qualifies under Section 80C (up to ₹1.5L). Interest on home loan qualifies under Section 24 (up to ₹2L for self-occupied property). Both deductions are under old tax regime only.' },
  { q: 'Home loan vs renting - which is financially better?', a: 'The rent vs buy decision depends on price-to-rent ratio. If annual rent is less than 3% of property price, renting and investing the saved capital is often better mathematically. But homeownership provides an inflation-hedged asset, forced savings, and leveraged return. Most planners suggest buying when you plan to stay 7+ years in the same city.' },
  { q: 'Fixed rate vs floating rate home loan - which is better in 2026?', a: 'Currently floating rate loans offer 8.35-9% while fixed rates are 11-12% - a significant premium. Floating is better when interest rates are expected to fall. Fixed makes sense when you expect rates to rise significantly. With the RBI rate cut cycle likely starting, floating rate home loans are the better choice for most new borrowers in 2026.' },
  { q: 'How much home loan interest can I claim as tax deduction?', a: 'Under the OLD tax regime: interest deduction up to Rs 2L/year under Section 24 (self-occupied) plus principal repayment up to Rs 1.5L under Section 80C. Under the NEW tax regime: NO deduction for home loan interest or principal. For salaried taxpayers with large home loans of Rs 50L+, the old regime often saves Rs 60,000-90,000/year in tax vs new regime.' },
  { q: 'What is the actual total cost of a home loan over 20 years?', a: 'On a Rs 50L home loan at 8.5% for 20 years: EMI = Rs 43,391. Total payment = Rs 1.04 crore. Total interest = Rs 54.14L - more than the principal itself! This is why prepayment (even Rs 5L lumpsum in year 5) saves Rs 15-20L in interest over the loan life. Use the Loan Prepayment Calculator to quantify your specific savings.' },
];

const related = calculators.filter(c => ['interest-free-home-loan', 'loan-prepayment', 'home-loan-eligibility'].includes(c.id));

export default function HomeLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Home Loan Calculator" slug="home-loan" />
      <CalculatorByline slug="home-loan" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-red-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Home Loan EMI Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your monthly home loan EMI, total interest payable and view full amortization schedule. Adjust tenure and rate to find the perfect combination.</p>
      </div>
      <LoanCalcPage config={config} />

      <InContentAd format="rectangle" className="my-6" />

      {/* EMI reference table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Home Loan EMI Table — 2026</h2>
        <p className="text-xs text-slate-500 mb-3">At 8.5% interest rate. Actuals depend on your bank's rate — use the calculator above to get exact figures.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Loan Amount</th>
                <th className="px-3 py-2 text-left border border-slate-100">10 Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">15 Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">20 Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">Total Interest (20yr)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹20 lakh', '₹24,758', '₹19,695', '₹17,356', '₹21.7L'],
                ['₹30 lakh', '₹37,137', '₹29,543', '₹26,035', '₹32.5L'],
                ['₹50 lakh', '₹61,895', '₹49,238', '₹43,391', '₹54.1L'],
                ['₹75 lakh', '₹92,843', '₹73,857', '₹65,087', '₹81.2L'],
                ['₹1 crore', '₹1,23,790', '₹98,476', '₹86,782', '₹1.08Cr'],
              ].map(([amt, ...cols]) => (
                <tr key={amt} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{amt}</td>
                  {cols.map((v, i) => <td key={i} className={`px-3 py-2 border border-slate-100 ${i === 3 ? 'text-red-600 font-medium' : ''}`}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hidden costs of home loans */}
      <section className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-amber-900 mb-3">Hidden Costs of a Home Loan Most Buyers Miss</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">Processing Fee</p>
            <p>0.25–1% of loan amount. On ₹50L: ₹12,500–₹50,000. Negotiate this — many banks waive it during festive offers.</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">Stamp Duty + Registration</p>
            <p>4–8% of property value depending on state. On a ₹60L flat in Maharashtra: ~₹3.6L stamp + ₹30K registration.</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">Home Loan Insurance</p>
            <p>Banks often bundle a decreasing-term plan into the EMI. A ₹50L loan's insurance can add ₹3–5L to total cost. You can buy it separately much cheaper.</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">Prepayment Penalty</p>
            <p>Floating rate loans: RBI prohibits prepayment penalty. Fixed rate loans: 1–3% penalty on amount prepaid. Always check before signing.</p>
          </div>
        </div>
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
        name: 'Home Loan EMI Calculator',
        url: 'https://calculate-today.com/calculators/home-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Home loan EMI calculator — compute monthly EMI, total interest and amortization schedule.',
      }} />
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
      <RelatedGuides calculatorId="home-loan" />
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
