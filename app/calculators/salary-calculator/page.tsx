import type { Metadata } from 'next';
import { Wallet } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { SalaryCalc } from '@/components/calculators/SalaryCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Salary Calculator: ₹12 LPA CTC — What Is Your Actual Take-Home?',
  description: 'Free CTC to in-hand salary calculator — ₹12L CTC = ~₹85K/month take-home after PF & tax. Get instant breakup: basic, HRA, PF, professional tax. No sign-up.',
  keywords: ['salary calculator India', 'CTC to take home', 'in-hand salary calculator', 'salary breakup India'],
  alternates: { canonical: '/calculators/salary-calculator/' },
};

const faqs = [
  { q: 'How is take-home salary calculated from CTC?', a: 'Take-home = Gross Salary − Employee PF − Professional Tax. Gross Salary = Basic + HRA + Special Allowance. CTC also includes Employer PF, which is not paid to the employee.' },
  { q: 'What is the standard CTC breakup in India?', a: 'Typical breakup: Basic = 40% of CTC, HRA = 50% of Basic (metro), Special Allowance = remainder. Employee PF = 12% of Basic (capped at ₹1800/month). Professional Tax = ₹200/month.' },
  { q: 'Is PF deducted from in-hand salary?', a: 'Yes. 12% of basic salary (capped at ₹1800/month) is deducted as Employee PF. An equal amount is contributed by the employer, but it forms part of CTC and is not in-hand.' },
  { q: 'What is professional tax?', a: 'Professional Tax is a state-level tax on salaries, typically ₹200/month (₹2,400/year). It varies by state — some states don\'t levy it at all.' },
  { q: 'How can I legally reduce my TDS deduction?', a: 'Legal TDS reduction methods: (1) Submit investment proof (80C, 80D, NPS) to HR by the January deadline. (2) Claim HRA exemption with rent receipts and landlord PAN. (3) Declare home loan interest certificate. (4) Opt for old vs new regime based on what saves more tax. (5) Maximize flexible benefits like meal allowance and mobile reimbursement. Proactive declaration reduces TDS; otherwise you claim a refund via ITR.' },
  { q: 'What is the HRA structure in salary and how is it determined?', a: 'HRA (House Rent Allowance) is typically 40-50% of Basic Salary. Metro city employers usually set HRA at 50% of Basic; non-metro at 40%. If HRA is not separately mentioned in your offer letter, you cannot claim HRA exemption - only Section 80GG of Rs 5,000/month applies instead. When negotiating salary, ask for HRA to be explicitly stated if you plan to live on rent.' },
  { q: 'What is Leave Travel Allowance (LTA) and how do I claim it?', a: 'LTA covers domestic travel expenses (airfare, train tickets) for you and family twice in a 4-year block. Current block: 2022-2025. Submit travel tickets to HR. Exemption covers actual travel cost only, not hotels or food. Only domestic travel qualifies. LTA is exempt under Section 10(5) in the old regime only - not available in the new tax regime.' },
  { q: 'What is VPF and how does it reduce my tax liability?', a: 'VPF (Voluntary Provident Fund) lets you contribute beyond the mandatory 12% EPF to your EPF account at the same 8.15% interest rate with EEE tax treatment. VPF contributions qualify under Section 80C (combined Rs 1.5L limit). For high earners who have maxed out 80C, VPF interest is taxable above Rs 2.5L/year contribution, but still beats most FDs on after-tax return.' },
];

const related = calculators.filter(c => ['hra-exemption', 'old-vs-new-regime', 'epf-calculator'].includes(c.id));

export default function SalaryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Salary Calculator" slug="salary-calculator" />
      <CalculatorByline slug="salary-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-violet-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Salary Calculator — CTC to Take Home</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Convert your annual CTC into monthly take-home salary. See the complete breakup of basic pay, HRA, PF and professional tax deductions.</p>
      </div>
      <SalaryCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* CTC to take-home reference table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">CTC to Take-Home — Common Salary Levels (FY 2025-26)</h2>
        <p className="text-xs text-slate-500 mb-3">Based on standard breakup: Basic 40%, HRA 50% of Basic, Employee PF 12% of Basic (capped ₹1,800/month), Professional Tax ₹200/month. New tax regime (no deductions). Actuals vary by employer.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Annual CTC</th>
                <th className="px-3 py-2 text-left border border-slate-100">Gross/month</th>
                <th className="px-3 py-2 text-left border border-slate-100">PF deduction</th>
                <th className="px-3 py-2 text-left border border-slate-100">Income Tax/month</th>
                <th className="px-3 py-2 text-left border border-slate-100">Take-home/month</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹6 LPA', '₹46,200', '₹1,440', '₹0', '~₹44,500'],
                ['₹8 LPA', '₹61,600', '₹1,800', '₹0', '~₹59,600'],
                ['₹10 LPA', '₹76,900', '₹1,800', '₹833', '~₹74,100'],
                ['₹12 LPA', '₹92,300', '₹1,800', '₹2,083', '~₹88,200'],
                ['₹15 LPA', '₹1,15,400', '₹1,800', '₹4,583', '~₹1,08,800'],
                ['₹20 LPA', '₹1,53,800', '₹1,800', '₹9,167', '~₹1,42,600'],
              ].map(([ctc, gross, pf, tax, takehome]) => (
                <tr key={ctc} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{ctc}</td>
                  <td className="px-3 py-2 border border-slate-100">{gross}</td>
                  <td className="px-3 py-2 border border-slate-100 text-red-600">{pf}</td>
                  <td className="px-3 py-2 border border-slate-100 text-red-600">{tax}</td>
                  <td className="px-3 py-2 border border-slate-100 font-bold text-emerald-700">{takehome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Employer PF (another 12% of Basic) is part of your CTC but never reaches you — it goes directly to your EPF account.</p>
      </section>

      {/* What eats into your salary */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">What Reduces Your Take-Home — and What Doesn't</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold text-red-700 mb-2 text-xs uppercase tracking-wide">Deductions from your gross pay</p>
            <ul className="space-y-2 text-slate-600 text-xs">
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>Employee PF (12% of Basic)</span><span className="font-medium">Capped at ₹1,800/month</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>Professional Tax</span><span className="font-medium">₹200/month (varies by state)</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>TDS / Income Tax</span><span className="font-medium">Depends on income + regime</span></li>
              <li className="flex justify-between"><span>Group Insurance premium</span><span className="font-medium">Employer-specific</span></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-emerald-700 mb-2 text-xs uppercase tracking-wide">In CTC but NOT in your take-home</p>
            <ul className="space-y-2 text-slate-600 text-xs">
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>Employer PF (12% of Basic)</span><span className="font-medium">Goes to EPF, not you</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>Gratuity component</span><span className="font-medium">Only after 5 years service</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>Medical insurance premium</span><span className="font-medium">Benefit, not cash</span></li>
              <li className="flex justify-between"><span>Variable pay (un-earned)</span><span className="font-medium">Paid if targets hit</span></li>
            </ul>
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
        name: 'Salary Calculator India',
        url: 'https://calculate-today.com/calculators/salary-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Salary calculator India — convert CTC to take-home salary. See complete salary breakup with PF, HRA, professional tax.',
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
      <RelatedGuides calculatorId="salary-calculator" />
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
