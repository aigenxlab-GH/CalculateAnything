import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { OldTax } from '@/components/calculators/OldTax';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Old Income Tax Regime Calculator with Deductions | CalculateToday',
  description: 'Calculate income tax under the old regime with all deductions: 80C, 80D, HRA, home loan interest, LTA, standard deduction and more.',
  keywords: ['old tax regime calculator', 'income tax with deductions', '80C 80D HRA calculator', 'old regime tax slab'],
  alternates: { canonical: '/calculators/old-income-tax/' },
};

const faqs = [
  { q: 'What are the old tax regime slabs?', a: '₹0–2.5L (0%), ₹2.5–5L (5%), ₹5–10L (20%), above ₹10L (30%). Standard deduction of ₹50,000 applies. Plus 4% cess on total tax.' },
  { q: 'What deductions are allowed under old regime?', a: 'Key deductions: Section 80C (up to ₹1.5L — PF, PPF, ELSS, LIC), 80D (health insurance ₹25K), HRA exemption, home loan interest (up to ₹2L), standard deduction (₹50K), LTA, NPS employer contribution.' },
  { q: 'Is 87A rebate available in old regime?', a: 'Yes, if taxable income = ₹5 lakh under old regime, you get a full rebate u/s 87A (up to ₹12,500), making tax zero.' },
  { q: 'Who benefits most from the old regime?', a: 'High earners with substantial deductions — particularly those paying home loan interest, investing full ₹1.5L in 80C, claiming HRA, and health insurance premiums. Generally beneficial above ₹8L income with maximum deductions.' },
];

const related = calculators.filter(c => ['old-vs-new-regime', 'new-income-tax-2526', 'hra-exemption'].includes(c.id));

export default function OldTaxPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Old Income Tax" slug="old-income-tax" />
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

      <TaxFilingTable />
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
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
