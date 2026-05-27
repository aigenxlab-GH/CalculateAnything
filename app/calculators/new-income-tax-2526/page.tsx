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

export const metadata: Metadata = {
  title: 'New Income Tax Calculator FY 2025-26',
  description: 'Calculate income tax under the new regime for FY 2025-26. Updated tax slabs, ₹75K standard deduction, 87A rebate up to ₹12L income, and 4% cess.',
  keywords: ['income tax calculator 2025-26', 'new tax regime 2025-26', 'income tax FY 2025-26', '87A rebate 2025-26'],
  alternates: { canonical: '/calculators/new-income-tax-2526/' },
};

const faqs = [
  { q: 'What are the new income tax slabs for FY 2025-26?', a: 'Under the new regime for FY 2025-26: ₹0–4L (0%), ₹4–8L (5%), ₹8–12L (10%), ₹12–16L (15%), ₹16–20L (20%), ₹20–24L (25%), above ₹24L (30%). Plus 4% health and education cess.' },
  { q: 'What is the standard deduction in the new regime?', a: 'Salaried employees and pensioners get a standard deduction of ₹75,000 per year under the new regime for FY 2025-26.' },
  { q: 'Up to what income is tax zero in FY 2025-26?', a: 'If your gross salary is up to ₹12,75,000 (taxable income = ₹12L after ₹75K SD), the Section 87A rebate makes your tax liability zero. Above ₹12.75L, full tax applies on the full taxable income.' },
  { q: 'Is surcharge applicable?', a: 'Yes, surcharge applies if income exceeds ₹50 lakh: 10% surcharge above ₹50L, 15% above ₹1Cr, 25% above ₹2Cr, and 37% above ₹5Cr (capped at 25% for new regime from FY 2023-24).' },
  { q: 'Who pays zero income tax under the new regime in FY 2025-26?', a: 'Anyone with gross income up to Rs 12,75,000 pays zero tax. The Rs 75,000 standard deduction reduces taxable income to Rs 12L, and the Section 87A rebate of Rs 60,000 fully offsets the tax liability. For income above Rs 12.75L, the full tax liability without rebate applies from the first rupee above Rs 12L.' },
  { q: 'How does surcharge work in the new tax regime for FY 2025-26?', a: 'Surcharge rates in new regime: 10% for income Rs 50L-1Cr, 15% for Rs 1-2Cr, 25% for Rs 2Cr+. Surcharge applies on the tax amount, not on income. Example: Rs 60L income, tax approx Rs 12.75L, surcharge Rs 1.275L (10%), plus 4% cess equals total tax Rs 14.586L. The calculator auto-applies surcharge at the correct slab.' },
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
