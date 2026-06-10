import type { Metadata } from 'next';
import { ArrowRightLeft } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'Old vs New Tax Regime: Comparison & Calculator for FY 2025-26',
  description: 'Compare old vs new income tax regime in India. Calculate which regime saves more tax based on your salary, deductions, and financial goals. Updated 2025-26.',
  keywords: ['old vs new regime', 'tax regime comparison', 'new regime vs old regime', 'income tax calculator'],
  alternates: { canonical: '/calculators/old-vs-new-tax-regime/' },
};

const regimeComparison = [
  { aspect: 'Best For', old: 'High deduction claimers', new: 'Simple salaried employees' },
  { aspect: 'Tax Slabs', old: '5% → 30%', new: '0% → 30% (same above ₹24L)' },
  { aspect: 'Standard Deduction', old: 'Not applicable', new: '₹75,000 (salaried)' },
  { aspect: 'Section 80C Deduction', old: '✓ Rs 1.5L limit', new: '✗ Not allowed' },
  { aspect: 'HRA Exemption', old: '✓ Allowed', new: '✗ Not allowed' },
  { aspect: 'Home Loan Interest', old: '✓ Rs 2L limit', new: '✗ Not allowed' },
  { aspect: 'Section 80D (Health)', old: '✓ Allowed', new: '✗ Not allowed' },
  { aspect: 'NPS 80CCD(1B)', old: '✓ Rs 50K extra', new: '✗ Not allowed' },
  { aspect: 'Rebate u/s 87A', old: '✗ Not applicable', new: '✓ Rs 12L rebate' },
  { aspect: 'Switching', old: 'Allowed annually', new: 'Allowed annually' },
];

const faqs = [
  {
    q: 'Which regime should I choose for FY 2025-26?',
    a: 'Calculate total deductions (80C + HRA + 80D + home loan interest). If total > Rs 3.5L, old regime usually wins. If < Rs 3.5L, new regime wins. For most salaried below Rs 12L salary with few deductions, new regime saves more tax.',
  },
  {
    q: 'Can I switch between regimes every year?',
    a: 'Yes! Salaried employees can switch regimes every financial year at ITR filing. However, you must declare your regime choice to your employer for TDS purposes by April. Self-employed can switch only once in a lifetime.',
  },
  {
    q: 'What is the new regime rebate of Rs 12 lakh?',
    a: 'Section 87A provides a tax rebate of up to full tax liability if taxable income is below Rs 12L under new regime. This means zero tax for income up to Rs 12L. Old regime has no similar rebate.',
  },
  {
    q: 'Is there a break-even income level between regimes?',
    a: 'Yes. The break-even depends on total deductions. For Rs 5L salary: break-even at ~Rs 3.5L deductions. For Rs 10L salary: break-even at ~Rs 4.5L deductions. Use our calculator to find your exact break-even.',
  },
  {
    q: 'Why are HRA and 80C deductions not allowed in new regime?',
    a: 'The new regime eliminates deductions to simplify tax filing and reduce compliance burden. Instead, it offers lower tax rates and rebate u/s 87A. The trade-off is worthwhile only if your deductions are small.',
  },
  {
    q: 'Which regime is better for NPS contributions?',
    a: 'Old regime: Full 80CCD(1B) benefit of Rs 50K extra deduction. New regime: No 80CCD(1B), but employer NPS contribution (80CCD(2)) is deductible even under new regime — making NPS valuable under both.',
  },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'old-income-tax', 'new-income-tax-2526'].includes(c.id));

export default function OldVsNewRegimePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Old vs New Tax Regime" slug="old-vs-new-tax-regime" />

      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <ArrowRightLeft className="w-4 h-4 text-purple-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Old vs New Tax Regime: Complete Comparison FY 2025-26</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Compare income tax savings under old and new regimes. Understand which regime saves you more tax based on your salary, deductions, and financial situation.
        </p>
      </div>

      {/* Featured Snippet */}
      <section className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-purple-900 mb-2">Quick Answer: Which Regime Saves More Tax?</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>Old Regime</strong> saves more if your total deductions (80C + HRA + 80D + home loan interest) exceed <strong>Rs 3.5-4 lakh/year</strong>.
        </p>
        <p className="text-sm text-slate-700 mb-3">
          <strong>New Regime</strong> saves more if deductions are below Rs 3.5 lakh due to Section 87A rebate (zero tax up to Rs 12L income).
        </p>
        <p className="text-xs text-slate-600 font-medium">
          <strong>Action:</strong> Calculate your deductions, use our calculator to compare, and decide by April each year.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Side-by-Side Comparison</h2>
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left p-4 font-semibold text-slate-700">Feature</th>
                <th className="text-left p-4 font-semibold text-slate-700">Old Regime</th>
                <th className="text-left p-4 font-semibold text-slate-700">New Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regimeComparison.map((row) => (
                <tr key={row.aspect} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700">{row.aspect}</td>
                  <td className="p-4 text-slate-600">{row.old}</td>
                  <td className="p-4 text-slate-600">{row.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Real Example */}
      <section className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Real Example: Rs 15 Lakh Salary</h2>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">Profile</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• Salary: Rs 15 lakh</li>
              <li>• HRA: Rs 3 lakh</li>
              <li>• 80C (EPF): Rs 1.5 lakh</li>
              <li>• Home loan interest: Rs 2 lakh</li>
              <li>• Tax bracket: 30%</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">Total Deductions: Rs 6.5 lakh</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• HRA exemption: Rs 2.4 lakh</li>
              <li>• 80C deduction: Rs 1.5 lakh</li>
              <li>• Home loan: Rs 2 lakh</li>
              <li>• Total: Rs 5.9 lakh ≈ Rs 6L</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-slate-700 mb-2">Old Regime</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Taxable income: Rs 9 lakh</p>
              <p>Tax: <strong className="text-slate-800">Rs 65,900</strong></p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-slate-700 mb-2">New Regime</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Taxable income: Rs 14.25 lakh</p>
              <p>Tax: <strong className="text-slate-800">Rs 97,500</strong></p>
            </div>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-700 mt-3">✓ Old regime saves Rs 31,600/year (32% less tax)</p>
      </section>

      {/* Decision Framework */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">How to Decide: Decision Flowchart</h2>
        <div className="space-y-3">
          <div className="border-2 border-purple-300 bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-bold text-purple-900 mb-2">Step 1: Calculate Total Deductions</p>
            <p className="text-xs text-slate-700">Add: HRA exemption + 80C (Rs 1.5L max) + Home loan interest (Rs 2L max) + 80D insurance + Other deductions</p>
          </div>
          <div className="border-2 border-purple-300 bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-bold text-purple-900 mb-2">Step 2: Compare in Calculator</p>
            <p className="text-xs text-slate-700">Use our Old vs New Regime Calculator to enter your exact salary and deductions</p>
          </div>
          <div className="border-2 border-purple-300 bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-bold text-purple-900 mb-2">Step 3: Check the Lower Tax Amount</p>
            <p className="text-xs text-slate-700">Whichever regime shows lower tax is your answer. But verify break-even if close.</p>
          </div>
          <div className="border-2 border-purple-300 bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-bold text-purple-900 mb-2">Step 4: Inform Your Employer</p>
            <p className="text-xs text-slate-700">Tell HR by April which regime you chose so they set correct TDS</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-6">
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

      {/* Related Calculators */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
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

      <NewsletterCapture />
    </div>
  );
}
