import type { Metadata } from 'next';
import { Receipt } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { NewTax2425 } from '@/components/calculators/NewTax2425';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Income Tax Calculator FY 2024-25 — New Regime Tax Slab Calculator',
  description: 'Free income tax calculator FY 2024-25 — calculate income tax under new regime with 87A rebate up to ₹7 lakh, surcharge and 4% cess. Instant results.',
  keywords: ['income tax calculator 2024-25', 'new tax regime 2024-25', 'income tax FY 2024-25'],
  alternates: { canonical: '/calculators/new-income-tax-2425/' },
};

const faqs = [
  { q: 'What are the tax slabs for FY 2024-25 new regime?', a: '₹0–3L (0%), ₹3–7L (5%), ₹7–10L (10%), ₹10–12L (15%), ₹12–15L (20%), above ₹15L (30%). Standard deduction of ₹75,000 applies.' },
  { q: 'What is the 87A rebate limit for FY 2024-25?', a: 'Under the new regime for FY 2024-25, the rebate u/s 87A applies if taxable income (after SD) = ₹7 lakh. The full tax is rebated, making net tax zero.' },
  { q: 'How does FY 2024-25 differ from FY 2025-26?', a: 'FY 2025-26 brought significantly better slabs and raised the 87A rebate from ₹7L to ₹12L, making more people tax-free. The standard deduction of ₹75K remains the same.' },
  { q: 'What is the key difference between FY 2024-25 and FY 2025-26 new tax regime?', a: 'FY 2024-25 new regime: Rs 7 lakh rebate limit, standard deduction Rs 50,000. FY 2025-26 new regime: Rs 12 lakh rebate limit, standard deduction Rs 75,000. A person earning Rs 10L pays Rs 22,500 tax under 2024-25 new regime vs zero under 2025-26. If you are filing for FY 2024-25, use this calculator; for FY 2025-26, use the dedicated FY 2025-26 calculator.' },
  { q: 'What was the Section 87A rebate limit for FY 2024-25?', a: 'The Section 87A rebate for FY 2024-25 under the new regime was Rs 25,000 (offsetting full tax liability for income up to Rs 7 lakh). Under the old regime, the 87A rebate was Rs 12,500 (for income up to Rs 5 lakh). For FY 2024-25, the new regime was better for most taxpayers earning below Rs 15-18L depending on their deductions.' },
  { q: 'What is the standard deduction for salaried employees in FY 2024-25?', a: 'Standard deduction under both the new and old regime for FY 2024-25 is Rs 50,000. This replaced the earlier transport and medical allowance exemptions. For income of Rs 7.5L with no other deductions: taxable income = Rs 7L after standard deduction, which qualifies for the full 87A rebate = zero tax in the new regime.' },
  { q: 'Are EPF and PPF contributions still deductible in FY 2024-25 old regime?', a: 'Yes - under the OLD regime for FY 2024-25: EPF employee contribution, PPF deposits, ELSS, LIC premiums, NSC, home loan principal and tuition fees all qualify under Section 80C (combined limit Rs 1.5L). In addition: health insurance 80D up to Rs 25,000, home loan interest Section 24 up to Rs 2L, and NPS 80CCD(1B) Rs 50,000. These deductions are NOT available in the new regime.' },
  { q: 'What is the exact 87A rebate limit for FY 2024-25 and how does it differ from FY 2025-26?', a: 'For FY 2024-25, Section 87A rebate under the new regime: maximum rebate of Rs 25,000 applies if taxable income (after Rs 50,000 standard deduction) is up to Rs 7 lakh, making net tax zero. A person earning Rs 7.5L gross gets taxable income of Rs 7L and pays zero tax. For FY 2025-26, the rebate limit was raised to Rs 12 lakh (after Rs 75,000 SD), so a Rs 12.75L salary earner pays zero tax. If you are filing your ITR for AY 2025-26 (FY 2024-25), the Rs 7L limit applies — not the new Rs 12L limit.' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2526', 'old-income-tax'].includes(c.id));

export default function NewTax2425Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="New Tax 2024-25" slug="new-income-tax-2425" />
      <CalculatorByline slug="new-income-tax-2425" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
            <Receipt className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Income Tax Calculator FY 2024-25</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your income tax under the new regime for FY 2024-25 with updated slabs, 87A rebate up to ₹7 lakh taxable income, and 4% cess.</p>
      </div>
      <NewTax2425 />

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
        name: 'New Income Tax Calculator FY 2024-25',
        url: 'https://calculate-today.com/calculators/new-income-tax-2425/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'New income tax calculator FY 2024-25. Calculate tax under new regime with slabs, rebate and cess.',
      }} />
      {/* Unique content — year comparison table */}
      <section className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-amber-800 mb-3">📋 This calculator is for AY 2025-26 (FY 2024-25) — ITR filing deadline: 31 July 2025</p>
        <h2 className="text-base font-bold text-slate-800 mb-3">FY 2024-25 vs FY 2025-26 — New Regime Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-amber-200">
                <th className="text-left py-1.5 font-semibold text-slate-700">Feature</th>
                <th className="text-right py-1.5 font-semibold text-slate-700">FY 2024-25 (This calc)</th>
                <th className="text-right py-1.5 font-semibold text-green-700">FY 2025-26 (New)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-slate-600">
              {([
                ['87A Rebate Limit', '₹7 lakh', '₹12 lakh'],
                ['Standard Deduction', '₹50,000', '₹75,000'],
                ['Effectively tax-free up to', '₹7.5L gross salary', '₹12.75L gross salary'],
                ['Tax on ₹10L income', '~₹22,500', '₹0'],
                ['Tax on ₹15L income', '~₹1,05,000', '~₹45,000'],
                ['Tax on ₹20L income', '~₹2,25,000', '~₹1,65,000'],
              ] as [string, string, string][]).map(([feature, fy2425, fy2526]) => (
                <tr key={feature}>
                  <td className="py-1.5 font-medium">{feature}</td>
                  <td className="py-1.5 text-right">{fy2425}</td>
                  <td className="py-1.5 text-right text-green-700 font-semibold">{fy2526}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">If you are filing ITR for FY 2024-25 (Assessment Year 2025-26), use this calculator. For your current year tax planning (FY 2025-26), use our <a href="/calculators/new-income-tax-2526/" className="text-primary hover:underline font-medium">New Income Tax 2025-26 Calculator</a> — FY 2025-26 slabs are significantly more generous.</p>
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
      <RelatedGuides calculatorId="new-income-tax-2425" />
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
