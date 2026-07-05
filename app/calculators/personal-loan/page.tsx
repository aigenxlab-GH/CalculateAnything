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
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Personal Loan EMI: ₹5L at 14% — True Total Cost Revealed',
  description: 'Free personal loan EMI calculator — ₹5L at 14% for 3 years = ₹17,098/month EMI, ₹1.15L total interest. See true cost and compare with top bank rates.',
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

      <InContentAd format="rectangle" className="my-6" />

      {/* Personal loan rate comparison table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Personal Loan Interest Rates — Top Banks &amp; NBFCs (2025)</h2>
        <p className="text-xs text-slate-500 mb-3">
          The rate you get depends on your CIBIL score, income, employer category and existing relationship with the lender. The rates below are indicative starting rates for salaried employees with 750+ CIBIL scores. Use this as a benchmark when comparing loan offers.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Lender</th>
                <th className="px-3 py-2 text-left border border-slate-100">Starting Rate (p.a.)</th>
                <th className="px-3 py-2 text-left border border-slate-100">Processing Fee</th>
                <th className="px-3 py-2 text-left border border-slate-100">Max Tenure</th>
                <th className="px-3 py-2 text-left border border-slate-100">Disbursal Time</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['SBI Xpress Credit', '10.30%', '1% + GST', '6 years', '2–3 days'],
                ['HDFC Bank', '10.50%', 'Up to 2.5%', '5 years', 'Same day (existing)'],
                ['ICICI Bank', '10.80%', 'Up to 2.25%', '6 years', '1–2 days'],
                ['Axis Bank', '10.49%', 'Up to 2%', '5 years', '1–3 days'],
                ['Kotak Mahindra', '10.99%', 'Up to 3%', '5 years', '2–4 days'],
                ['Bajaj Finserv', '13.00%', 'Up to 3.93%', '7 years', 'Instant–2 days'],
                ['Tata Capital', '10.99%', 'Up to 3%', '6 years', '2–3 days'],
                ['KreditBee / Fintech', '18–30%+', 'Up to 4%', '3 years', 'Minutes'],
              ].map(([lender, rate, fee, tenure, disbursal]) => (
                <tr key={lender} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-medium">{lender}</td>
                  <td className="px-3 py-2 border border-slate-100 font-bold text-cyan-700">{rate}</td>
                  <td className="px-3 py-2 border border-slate-100">{fee}</td>
                  <td className="px-3 py-2 border border-slate-100">{tenure}</td>
                  <td className="px-3 py-2 border border-slate-100">{disbursal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Rates are indicative as of 2025 and subject to change. Final rate depends on applicant profile. Always compare the APR (Annual Percentage Rate) — which includes processing fees — not just the headline interest rate.</p>
      </section>

      {/* EMI comparison at different rates */}
      <section className="mb-6 bg-cyan-50 border border-cyan-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-cyan-900 mb-2">EMI Comparison — ₹5 Lakh Personal Loan at Different Rates</h2>
        <p className="text-sm text-slate-700 mb-3">Even a 2–3% difference in interest rate can save ₹10,000–₹20,000 over a 3-year loan. Always negotiate or compare before accepting the first offer.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[460px]">
            <thead>
              <tr className="bg-cyan-100 text-cyan-900">
                <th className="px-3 py-2 text-left border border-cyan-200">Rate (p.a.)</th>
                <th className="px-3 py-2 text-left border border-cyan-200">EMI — 1 Year</th>
                <th className="px-3 py-2 text-left border border-cyan-200">EMI — 3 Years</th>
                <th className="px-3 py-2 text-left border border-cyan-200">EMI — 5 Years</th>
                <th className="px-3 py-2 text-left border border-cyan-200">Total Interest (3 yr)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['10.5%', '₹44,042', '₹16,230', '₹10,747', '₹84,280'],
                ['12%',   '₹44,424', '₹16,607', '₹11,122', '₹97,852'],
                ['14%',   '₹44,898', '₹17,091', '₹11,634', '₹1,15,276'],
                ['16%',   '₹45,377', '₹17,583', '₹12,158', '₹1,32,988'],
                ['18%',   '₹45,861', '₹18,084', '₹12,694', '₹1,51,024'],
                ['24%',   '₹47,378', '₹19,611', '₹14,330', '₹2,05,996'],
              ].map(([rate, y1, y3, y5, int3]) => (
                <tr key={rate} className="border-b border-cyan-100 hover:bg-cyan-50">
                  <td className="px-3 py-2 border border-cyan-100 font-bold text-slate-800">{rate}</td>
                  <td className="px-3 py-2 border border-cyan-100">{y1}</td>
                  <td className="px-3 py-2 border border-cyan-100 font-medium">{y3}</td>
                  <td className="px-3 py-2 border border-cyan-100">{y5}</td>
                  <td className="px-3 py-2 border border-cyan-100 font-semibold text-red-600">{int3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">Loan amount: ₹5,00,000. The difference between 10.5% and 24% for a 3-year loan is ₹1.22 lakh in extra interest — nearly 25% of the principal amount. A good CIBIL score (750+) is the single biggest factor in getting the lowest rate.</p>
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
        name: 'Personal Loan EMI Calculator',
        url: 'https://calculate-today.com/calculators/personal-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Personal loan EMI calculator — compute monthly EMI and total interest for personal loans.',
      }} />
      {/* Unique content — differentiates from other loan calculators */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Is a Personal Loan Right for You?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-green-50 rounded-xl p-3 text-xs">
            <p className="font-bold text-green-700 mb-1.5">✓ Choose Personal Loan When</p>
            <ul className="space-y-1 text-slate-600">
              <li>• Urgent need — disbursal in hours</li>
              <li>• No collateral available</li>
              <li>• Amount ₹50K–₹10L</li>
              <li>• CIBIL score 720+</li>
              <li>• Medical emergency, wedding, home renovation</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-xs">
            <p className="font-bold text-red-700 mb-1.5">✗ Avoid Personal Loan When</p>
            <ul className="space-y-1 text-slate-600">
              <li>• Investing in stocks or crypto</li>
              <li>• CIBIL score below 680</li>
              <li>• Existing EMIs already &gt;40% of income</li>
              <li>• Secured loan option available</li>
              <li>• Amount needed &gt;₹25L</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-slate-500">Personal loans are fully unsecured — no property, gold or vehicle is pledged. This makes them flexible but expensive at 10.5–24% p.a. vs 8–9.5% for home loans. Always compare the APR including processing fees (typically 1–3%), not just the headline interest rate. A ₹5L personal loan at 15% for 3 years costs ₹1.24L in total interest.</p>
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
