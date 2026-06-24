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

      {/* Old regime deduction stack */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Maximum Deductions You Can Stack Under Old Regime</h2>
        <p className="text-xs text-slate-500 mb-3">FY 2025-26. Claim all of these and you could reduce taxable income by ₹5–7L depending on situation.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Section</th>
                <th className="px-3 py-2 text-left border border-slate-100">What It Covers</th>
                <th className="px-3 py-2 text-left border border-slate-100">Max Deduction</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['Standard Deduction', 'Automatic — no proof needed', '₹50,000'],
                ['80C', 'PPF, ELSS, EPF, LIC, NSC, home loan principal', '₹1,50,000'],
                ['80CCD(1B)', 'NPS contribution (over and above 80C)', '₹50,000'],
                ['80D', 'Health insurance — self/family', '₹25,000–₹50,000'],
                ['80D', 'Health insurance — parents (senior)', '+ ₹50,000'],
                ['HRA', 'Rent paid (metro 50%, non-metro 40%)', 'Varies'],
                ['Section 24(b)', 'Home loan interest', '₹2,00,000'],
                ['80E', 'Education loan interest', 'Unlimited'],
              ].map(([sec, desc, max]) => (
                <tr key={sec + desc} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-medium text-blue-700">{sec}</td>
                  <td className="px-3 py-2 border border-slate-100">{desc}</td>
                  <td className="px-3 py-2 border border-slate-100 font-semibold text-emerald-700">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Who should stay on old regime */}
      <section className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-amber-900 mb-2">Who Still Benefits from the Old Tax Regime?</h2>
        <p className="text-sm text-slate-700 mb-2">The new regime beats old for most people below ₹15L. But old regime wins if you have a large deduction stack:</p>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span><span><strong>Metro renter with ₹20K+/month rent:</strong> HRA exemption alone can be ₹1L+/year, making old regime worth it even without 80C.</span></li>
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span><span><strong>Home loan borrower with ₹2L+ annual interest:</strong> Section 24 deduction is available only in old regime. On a ₹50L loan at 8.5%, your first few years' interest easily hits ₹4L.</span></li>
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span><span><strong>High earners (₹25L+) with full deduction stack:</strong> HRA + 80C + 80CCD(1B) + 80D + home loan = ₹5L+ deductions. At 30% slab, every rupee of deduction saves ₹31.2 paise in tax.</span></li>
        </ul>
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
        name: 'Old Regime Income Tax Calculator',
        url: 'https://calculate-today.com/calculators/old-income-tax/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Old regime income tax calculator. Add 80C, 80D, HRA and other deductions to compute your tax liability.',
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
