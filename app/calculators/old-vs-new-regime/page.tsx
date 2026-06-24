import type { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { OldVsNewTax } from '@/components/calculators/OldVsNewTax';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Old vs New Tax Regime: Which Actually Saves You More Tax?',
  description: 'Free tax regime calculator 2025-26 — enter salary + deductions, get exact rupee savings in both regimes. ₹10L salary: new regime saves ₹46,800. Answer in 30 seconds.',
  keywords: ['old vs new tax regime', 'income tax regime comparison', 'tax regime 2025-26', 'which tax regime is better'],
  alternates: { canonical: '/calculators/old-vs-new-regime/' },
};

const faqs = [
  { q: 'Which tax regime is better for salaried employees?', a: 'It depends on your deductions. If you claim significant deductions (80C, HRA, home loan interest), the old regime may save more. If you have few deductions, the new regime\'s lower slabs and ₹12L zero-tax benefit make it better.' },
  { q: 'What is the 87A rebate in the new regime for FY 2025-26?', a: 'Under the new regime for FY 2025-26, if your taxable income (after standard deduction) is ₹12 lakh or less, you get a full rebate under Section 87A — effectively paying zero income tax. This is a significant benefit.' },
  { q: 'Can I switch tax regimes every year?', a: 'Salaried employees can switch between old and new tax regimes every year when filing their return. However, those with business income can switch only once.' },
  { q: 'What deductions can I claim in the old regime?', a: 'Old regime allows deductions under Section 80C (up to ₹1.5L), 80D (medical insurance), HRA exemption, LTA, home loan interest (up to ₹2L), NPS employer contribution, standard deduction (₹50K), and more.' },
  { q: 'What are the key changes in the new tax regime for FY 2025-26?', a: 'Major changes: (1) Tax-free threshold raised to Rs 12 lakh via 87A rebate vs Rs 7 lakh earlier. (2) Standard deduction increased to Rs 75,000 vs Rs 50,000. (3) New slabs: 0% up to Rs 4L, 5% for Rs 4-8L, 10% for Rs 8-12L, 15% for Rs 12-16L, 20% for Rs 16-20L, 25% for Rs 20-24L, 30% above Rs 24L. These changes make the new regime significantly more attractive for incomes up to Rs 18-20L.' },
  { q: 'Which deductions are allowed under the new tax regime?', a: 'The new regime allows: NPS employer contribution under 80CCD(2), gratuity exemption, leave encashment exemption, and standard deduction of Rs 75,000 for salaried. It does NOT allow: 80C (PPF, ELSS, LIC), 80D (health insurance), HRA full exemption, home loan interest under Section 24, and most other Chapter VI-A deductions.' },
  { q: 'Can I switch between old and new tax regime every year?', a: 'Salaried employees: yes, you can switch every year by informing your employer. Business income taxpayers: can switch from new to old only once. The default since FY 2024-25 is the new regime. To opt for old regime, you must actively indicate it in your ITR. TDS deducted by employer under old regime can be adjusted at ITR filing.' },
  { q: 'Is NPS more beneficial under the new or old tax regime?', a: 'Under both regimes, employer NPS contribution under 80CCD(2) is deductible. Under the OLD regime, the additional 80CCD(1B) deduction of Rs 50,000 on your own NPS contribution also applies. Under the NEW regime, 80CCD(1B) is NOT available. For NPS investors who want to claim the full Rs 50,000 personal deduction, the old regime is better.' },
];

const related = calculators.filter(c => ['new-income-tax-2526', 'old-income-tax', 'salary-calculator'].includes(c.id));

export default function OldVsNewRegimePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Old vs New Tax Regime" slug="old-vs-new-regime" />
      <CalculatorByline slug="old-vs-new-regime" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Scale className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Old vs New Tax Regime</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Compare your tax liability side-by-side under old and new income tax regimes for FY 2025-26. Enter your income and deductions to instantly see which saves you more.</p>
      </div>
      <OldVsNewTax />

      <InContentAd format="rectangle" className="my-6" />

      {/* Side-by-side tax comparison at key income levels */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Old vs New Regime — Tax Comparison at Key Salary Levels</h2>
        <p className="text-xs text-slate-500 mb-3">Old regime assumes max deductions: ₹1.5L (80C) + ₹50K (80CCD1B NPS) + ₹25K (80D) + ₹50K SD = ₹2.75L total. New regime: only ₹75K SD.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Gross Salary</th>
                <th className="px-3 py-2 text-left border border-slate-100">Old Regime Tax</th>
                <th className="px-3 py-2 text-left border border-slate-100">New Regime Tax</th>
                <th className="px-3 py-2 text-left border border-slate-100">Better Regime</th>
                <th className="px-3 py-2 text-left border border-slate-100">Saving</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹8L', '₹0', '₹0', 'Either', '—'],
                ['₹10L', '₹31,200', '₹0', 'New ✓', '₹31,200'],
                ['₹12.75L', '₹78,000', '₹0', 'New ✓', '₹78,000'],
                ['₹15L', '₹1,17,000', '₹97,500', 'New ✓', '₹19,500'],
                ['₹20L', '₹2,08,000', '₹2,01,500', 'New ✓', '₹6,500'],
                ['₹25L (with HRA ₹10L)', '₹2,08,000', '₹3,51,400', 'Old ✓', '₹1,43,400'],
              ].map(([salary, old, newt, better, saving]) => (
                <tr key={salary} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{salary}</td>
                  <td className="px-3 py-2 border border-slate-100">{old}</td>
                  <td className="px-3 py-2 border border-slate-100">{newt}</td>
                  <td className={`px-3 py-2 border border-slate-100 font-medium ${better.includes('New') ? 'text-blue-700' : better.includes('Old') ? 'text-amber-700' : 'text-slate-500'}`}>{better}</td>
                  <td className="px-3 py-2 border border-slate-100 font-semibold text-emerald-700">{saving}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">The break-even point shifts based on your actual deductions. Use the calculator above with your real numbers to find your exact breakeven.</p>
      </section>

      {/* Deduction comparison */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Which Deductions Are Allowed in Each Regime?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[380px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Deduction</th>
                <th className="px-3 py-2 text-center border border-slate-100">Old Regime</th>
                <th className="px-3 py-2 text-center border border-slate-100">New Regime</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['Standard Deduction', '₹50,000', '₹75,000'],
                ['Section 80C (PPF, ELSS, LIC)', '✓ up to ₹1.5L', '✗'],
                ['Section 80D (Health Insurance)', '✓ up to ₹25K–₹50K', '✗'],
                ['HRA Exemption', '✓', '✗'],
                ['Home Loan Interest (Sec 24)', '✓ up to ₹2L', '✗'],
                ['80CCD(1B) NPS (own contribution)', '✓ ₹50,000', '✗'],
                ['80CCD(2) Employer NPS', '✓', '✓'],
                ['LTA, Leave Encashment', '✓', 'Partial'],
              ].map(([dedn, old, newt]) => (
                <tr key={dedn} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100">{dedn}</td>
                  <td className={`px-3 py-2 border border-slate-100 text-center ${old.startsWith('✓') ? 'text-emerald-700' : 'text-red-600'}`}>{old}</td>
                  <td className={`px-3 py-2 border border-slate-100 text-center ${newt.startsWith('✓') || newt.startsWith('₹') ? 'text-emerald-700' : newt === '✗' ? 'text-red-600' : 'text-amber-700'}`}>{newt}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        name: 'Old vs New Income Tax Regime Calculator',
        url: 'https://calculate-today.com/calculators/old-vs-new-regime/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Compare old vs new income tax regime. Instantly find which regime gives you lower tax for FY 2025-26.',
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
      <RelatedGuides calculatorId="old-vs-new-regime" />
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
