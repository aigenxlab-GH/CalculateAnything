import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { OldTax } from '@/components/calculators/OldTax';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Old Regime Tax Calculator: Does 80C Save Enough to Stay Old?',
  description: 'Free old regime income tax calculator — add 80C (₹1.5L), 80D, HRA, NPS and see exact tax. Max deductions can save ₹46,800+ annually. Compare vs new regime.',
  keywords: ['old tax regime calculator', 'income tax with deductions', '80C 80D HRA calculator', 'old regime tax slab'],
  alternates: { canonical: '/calculators/old-income-tax/' },
};

const faqs = [
  { q: 'What are the old tax regime slabs?', a: '₹0–2.5L (0%), ₹2.5–5L (5%), ₹5–10L (20%), above ₹10L (30%). Standard deduction of ₹50,000 applies. Plus 4% cess on total tax.' },
  { q: 'What deductions are allowed under old regime?', a: 'Key deductions: Section 80C (up to ₹1.5L — PF, PPF, ELSS, LIC), 80D (health insurance ₹25K), HRA exemption, home loan interest (up to ₹2L), standard deduction (₹50K), LTA, NPS employer contribution.' },
  { q: 'Is 87A rebate available in old regime?', a: 'Yes, if taxable income = ₹5 lakh under old regime, you get a full rebate u/s 87A (up to ₹12,500), making tax zero.' },
  { q: 'Who benefits most from the old regime?', a: 'High earners with substantial deductions — particularly those paying home loan interest, investing full ₹1.5L in 80C, claiming HRA, and health insurance premiums. Generally beneficial above ₹8L income with maximum deductions.' },
  { q: 'What is the maximum total deduction possible under the old tax regime?', a: 'Common deductions combined: 80C (Rs 1.5L) + 80D health insurance (Rs 25,000-50,000) + 80CCD(1B) NPS (Rs 50,000) + HRA exemption (varies) + home loan interest Section 24 (Rs 2L) + standard deduction (Rs 50,000) = total deductions can reach Rs 4.5-6L+ depending on your situation. This is why the old regime benefits taxpayers with large deduction portfolios.' },
  { q: 'Is the old income tax regime still available in FY 2025-26?', a: 'Yes - the old regime is still available for FY 2025-26. It is now the non-default option with new regime as default. To use the old regime, salaried employees must declare it to their employer for TDS purposes. Individuals with large deductions (HRA + 80C + home loan) at Rs 20L+ income may still benefit significantly from the old regime.' },
  { q: 'Can I claim both HRA exemption and home loan interest deduction simultaneously?', a: 'Yes - in the OLD regime, you can claim both if you live in a rented house in a different city from where your owned property is located. Example: you own a flat in Delhi (rented out) and live on rent in Mumbai for work. You can claim HRA exemption on Mumbai rent AND home loan interest deduction on the Delhi flat under Section 24. Both deductions apply simultaneously.' },
  { q: 'Does Section 80E education loan interest deduction work under both regimes?', a: 'Section 80E deduction for education loan interest is available ONLY under the OLD tax regime. Under the new regime this deduction is not available. If you have a significant education loan and are paying Rs 30,000-50,000/year in interest, the 80E deduction alone saves Rs 9,000-15,000/year in tax at the 30% slab - a factor to consider when choosing between regimes.' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2526', 'hra-exemption'].includes(c.id));

export default function OldTaxPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Old Income Tax" slug="old-income-tax" />
      <CalculatorByline slug="old-income-tax" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <FileText className="w-4 h-4 text-green-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Old Income Tax Regime Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate tax under the old regime with all deductions — 80C, HRA, home loan interest, 80D and more. See your exact tax liability with old slabs.</p>
      </div>
      <OldTax />

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
        name: 'Old Regime Income Tax Calculator',
        url: 'https://calculate-today.com/calculators/old-income-tax/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Old regime income tax calculator. Add 80C, 80D, HRA and other deductions to compute your tax liability.',
      }} />
      <InContentAd format="horizontal" className="mb-6" />

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
      <RelatedGuides calculatorId="old-income-tax" />
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
