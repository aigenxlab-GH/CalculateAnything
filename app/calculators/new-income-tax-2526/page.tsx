import type { Metadata } from 'next';
import { Receipt } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { NewTax2526 } from '@/components/calculators/NewTax2526';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Income Tax 2025-26: Zero Tax Up to ₹12.75L — Is Yours Right?',
  description: 'Free FY 2025-26 income tax calculator — exact tax with 87A rebate, surcharge & cess. Salaried up to ₹12.75L pays zero tax. Enter salary, get result instantly.',
  keywords: ['income tax calculator 2025-26', 'new tax regime 2025-26', 'income tax FY 2025-26', '87A rebate 2025-26'],
  alternates: { canonical: '/calculators/new-income-tax-2526/' },
};

const faqs = [
  { q: 'What are the new income tax slabs for FY 2025-26?', a: 'Under the new regime for FY 2025-26: ₹0–4L (0%), ₹4–8L (5%), ₹8–12L (10%), ₹12–16L (15%), ₹16–20L (20%), ₹20–24L (25%), above ₹24L (30%). Plus 4% health and education cess.' },
  { q: 'What is the standard deduction in the new regime?', a: 'Salaried employees and pensioners get a standard deduction of ₹75,000 per year under the new regime for FY 2025-26.' },
  { q: 'Up to what income is tax zero in FY 2025-26?', a: 'If your gross salary is up to ₹12,75,000 (taxable income = ₹12L after ₹75K SD), the Section 87A rebate makes your tax liability zero. Above ₹12.75L, full tax applies on the full taxable income.' },
  { q: 'Is surcharge applicable?', a: 'Yes, surcharge applies if income exceeds ₹50 lakh: 10% surcharge above ₹50L, 15% above ₹1Cr, 25% above ₹2Cr, and 37% above ₹5Cr (capped at 25% for new regime from FY 2023-24).' },
  { q: 'Who pays zero income tax under the new regime in FY 2025-26?', a: 'Anyone with gross income up to Rs 12,75,000 pays zero tax. The Rs 75,000 standard deduction reduces taxable income to Rs 12L, and the Section 87A rebate of Rs 60,000 fully offsets the tax liability. For income above Rs 12.75L, the full tax liability without rebate applies from the first rupee above Rs 12L.' },
  { q: 'How does surcharge work in the new tax regime for FY 2025-26?', a: 'Surcharge rates in new regime: 10% for income Rs 50L-1Cr, 15% for Rs 1-2Cr, 25% for Rs 2Cr+. Surcharge applies on the tax amount, not on income. Example: Rs 60L income, tax approx Rs 13.8L, surcharge Rs 1.38L (10%), plus 4% cess equals total tax Rs 15.79L. The calculator auto-applies surcharge at the correct slab.' },
  { q: 'Are capital gains taxed under the new income tax regime?', a: 'Capital gains are taxed separately under their own rates regardless of which regime you choose. LTCG on equity: 12.5% above Rs 1.25L per year. STCG on equity: 20%. LTCG on debt or property: 12.5% without indexation. The income tax regime choice affects only your salary and business income deductions, not capital gains tax rates.' },
  { q: 'Is 80CCD(1B) NPS deduction available under the new tax regime in 2025-26?', a: 'No. Section 80CCD(1B) - the additional Rs 50,000 NPS deduction - is not available under the new tax regime. This is a significant disadvantage for NPS investors. However, the employer NPS contribution under 80CCD(2) IS available in both regimes. Tax saving from 80CCD(1B) in old regime: Rs 15,600 at 30% slab - weigh this against new regime slab savings.' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2425', 'old-income-tax'].includes(c.id));

export default function NewTax2526Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="New Tax 2025-26" slug="new-income-tax-2526" />
      <CalculatorByline slug="new-income-tax-2526" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Receipt className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Income Tax Calculator FY 2025-26</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your exact income tax liability under the new regime for FY 2025-26. Includes ₹75K standard deduction, 87A rebate, surcharge and 4% cess.</p>
      </div>
      <NewTax2526 />

      <InContentAd format="rectangle" className="my-6" />

      {/* Slab breakdown + worked examples */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">New Regime Tax Slabs FY 2025-26 — With Real Examples</h2>
        <p className="text-xs text-slate-500 mb-3">After ₹75,000 standard deduction. 4% cess added to final tax. 87A rebate: zero tax if taxable income ≤ ₹12L.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Gross Salary (CTC)</th>
                <th className="px-3 py-2 text-left border border-slate-100">Taxable Income</th>
                <th className="px-3 py-2 text-left border border-slate-100">Tax (before cess)</th>
                <th className="px-3 py-2 text-left border border-slate-100">87A Rebate?</th>
                <th className="px-3 py-2 text-left border border-slate-100">Final Tax (incl. 4% cess)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹10L', '₹9.25L', '₹52,500', 'Full rebate', '₹0'],
                ['₹12.75L', '₹12L', '₹60,000', 'Full rebate', '₹0'],
                ['₹13L', '₹12.25L', '₹63,750', 'No rebate', '₹66,300'],
                ['₹15L', '₹14.25L', '₹93,750', 'No rebate', '₹97,500'],
                ['₹20L', '₹19.25L', '₹1,93,750', 'No rebate', '₹2,01,500'],
                ['₹30L', '₹29.25L', '₹4,43,750', 'No rebate', '₹4,61,500'],
              ].map(([salary, taxable, tax, rebate, final]) => (
                <tr key={salary} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{salary}</td>
                  <td className="px-3 py-2 border border-slate-100">{taxable}</td>
                  <td className="px-3 py-2 border border-slate-100">{tax}</td>
                  <td className={`px-3 py-2 border border-slate-100 ${rebate === 'Full rebate' ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>{rebate}</td>
                  <td className={`px-3 py-2 border border-slate-100 font-bold ${final === '₹0' ? 'text-emerald-700' : 'text-red-600'}`}>{final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">The ₹12.75L to ₹13L jump is sharp: you pay ₹0 at ₹12.75L but ₹66,300 at ₹13L. Structure salary to stay below if possible.</p>
      </section>

      {/* New vs old regime quick guide */}
      <section className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-blue-900 mb-2">New Regime: Who Benefits, Who Doesn't</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div>
            <p className="font-bold text-emerald-700 mb-2">New regime is better if you:</p>
            <ul className="space-y-1">
              <li>• Have income ≤ ₹12.75L (pay zero tax)</li>
              <li>• Have few deductions (no HRA, no home loan)</li>
              <li>• Are in a metro but employer doesn't give HRA</li>
              <li>• Want simplicity — no paperwork, no declarations</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-red-700 mb-2">Old regime may be better if you:</p>
            <ul className="space-y-1">
              <li>• Pay ₹18K+/month rent and claim HRA in a metro</li>
              <li>• Have a home loan with ₹2L+ annual interest</li>
              <li>• Claim full 80C (₹1.5L) + 80D + NPS ₹50K</li>
              <li>• Total deductions exceed ₹3.75L–₹4L</li>
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
        name: 'New Income Tax Calculator FY 2025-26',
        url: 'https://calculate-today.com/calculators/new-income-tax-2526/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'New income tax calculator FY 2025-26. Calculate tax with new regime slabs, 87A rebate, surcharge and 4% cess.',
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
      <RelatedGuides calculatorId="new-income-tax-2526" />
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
