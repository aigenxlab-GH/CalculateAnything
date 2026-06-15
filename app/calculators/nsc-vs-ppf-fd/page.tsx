import type { Metadata } from 'next';
import { BarChart3 } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { ComparisonMatrix } from '@/components/ComparisonMatrix';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'NSC vs PPF vs FD: Which Earns More on ₹1L Investment?',
  description: 'NSC (7.7%) vs PPF (7.1%) vs FD (6.5%) — tax treatment, lock-in, liquidity, winner by goal. ₹1L for 5 years: NSC beats FD by ₹3,900. Full 2026 comparison.',
  keywords: ['NSC vs PPF', 'PPF vs FD', 'NSC vs FD comparison', 'savings options India', 'best savings scheme'],
  alternates: { canonical: '/calculators/nsc-vs-ppf-fd/' },
};

const comparisonData = [
  { feature: 'Current Interest Rate', nsc: '7.7% PA', ppf: '7.1% PA', fd: '6.5% PA' },
  { feature: 'Lock-in Period', nsc: '5 years', ppf: '15 years', fd: '5 years' },
  { feature: 'Partial Withdrawal', nsc: 'Not allowed', ppf: 'From 7th year', fd: 'Allowed with penalty' },
  { feature: 'Tax Status (Interest)', nsc: 'Partially taxable', ppf: 'Fully tax-free (EEE)', fd: 'Fully taxable' },
  { feature: 'Min Investment', nsc: '₹100', ppf: '₹500', fd: '₹10,000+' },
  { feature: 'Max Investment', nsc: 'Unlimited', ppf: '₹1.5L/year', fd: 'Unlimited' },
  { feature: 'Section 80C Benefit', nsc: '✓ Yes', ppf: '✓ Yes', fd: '✓ Yes' },
  { feature: 'Flexibility', nsc: 'Very low', ppf: 'Low', fd: 'High' },
  { feature: 'Risk Level', nsc: 'Zero (Govt-backed)', ppf: 'Zero (Govt-backed)', fd: 'Low (Bank-backed)' },
];

const faqs = [
  {
    q: 'Which is better: NSC, PPF, or FD?',
    a: 'It depends on your timeline and goals. PPF is best for long-term (15+ years) wealth with lowest tax burden. NSC suits 5-year goals with guaranteed returns. FD is most flexible but fully taxable — best for conservative short-term savings.',
  },
  {
    q: 'How much return can I get on ₹1 lakh in each?',
    a: 'After 5 years at current rates: NSC = ₹1,44,896 (44.9% return), PPF = ₹1,41,478 (41.5% return), FD = ₹1,38,238 (38.2% return). NSC has highest 5-year return but PPF becomes superior after year 7-8 due to tax-free compounding.',
  },
  {
    q: 'Is NSC worth it over PPF?',
    a: 'NSC edges PPF on interest rate (7.7% vs 7.1%) but PPF wins on tax treatment. For 5-year goals, NSC is better. For 15+ year goals, PPF is significantly better due to full tax-free compounding.',
  },
  {
    q: 'Why is FD interest fully taxable but NSC is not?',
    a: 'NSC interest compounds and is deemed reinvested annually, so only the final year interest is truly taxable. FD interest is credited to your account, making it immediately taxable income. This distinction gives NSC a tax advantage over FD.',
  },
  {
    q: 'Can I invest in all three simultaneously?',
    a: 'Yes! Many investors use a combined strategy: NSC for 5-year goals, PPF for retirement, FD for emergency funds. You can max out all three within their limits (PPF capped at ₹1.5L/year, NSC/FD unlimited).',
  },
  {
    q: 'Which gives best post-tax returns over 10 years?',
    a: 'At 30% tax bracket, over 10 years: PPF ≈ ₹2.55 crore (fully tax-free), NSC ≈ ₹2.30 crore (tax-efficient), FD ≈ ₹1.95 crore (fully taxed annually). PPF dominates after 7-8 years.',
  },
];

const related = calculators.filter(c => ['nsc-calculator', 'ppf-calculator', 'fd-calculator'].includes(c.id));

// Interactive Comparison Matrix Data
const comparisonItems = [
  { id: 'nsc', name: 'NSC', color: 'bg-amber-500', badge: 'Best 5-yr' },
  { id: 'ppf', name: 'PPF', color: 'bg-emerald-500', badge: 'Best Long-term' },
  { id: 'fd', name: 'FD', color: 'bg-blue-500', badge: 'Most Flexible' },
];

const comparisonFeatures = [
  {
    id: 'interest',
    name: 'Current Interest Rate',
    category: 'Returns',
    values: { nsc: '7.7% PA', ppf: '7.1% PA', fd: '6.5% PA' },
    highlight: 'best' as const,
    bestId: 'nsc',
  },
  {
    id: 'lockperiod',
    name: 'Lock-in Period',
    category: 'Flexibility',
    values: { nsc: '5 years', ppf: '15 years', fd: 'Variable' },
    highlight: 'best' as const,
    bestId: 'fd',
  },
  {
    id: 'withdrawal',
    name: 'Partial Withdrawal',
    category: 'Flexibility',
    values: { nsc: 'Not allowed', ppf: 'From 7th year', fd: 'Anytime (with penalty)' },
    highlight: 'best' as const,
    bestId: 'fd',
  },
  {
    id: 'tax',
    name: 'Tax on Interest',
    category: 'Tax Benefits',
    values: { nsc: 'Partial (taxable)', ppf: 'Zero (EEE)', fd: 'Fully taxable' },
    highlight: 'best' as const,
    bestId: 'ppf',
  },
  {
    id: 'sec80c',
    name: 'Section 80C Deduction',
    category: 'Tax Benefits',
    values: { nsc: '✓ Yes', ppf: '✓ Yes', fd: '✓ Yes' },
  },
  {
    id: 'mininvest',
    name: 'Minimum Investment',
    category: 'Investment',
    values: { nsc: '₹100', ppf: '₹500', fd: '₹10,000+' },
    highlight: 'best' as const,
    bestId: 'nsc',
  },
  {
    id: 'maxinvest',
    name: 'Maximum Investment/Year',
    category: 'Investment',
    values: { nsc: 'Unlimited', ppf: '₹1.5 Lakh', fd: 'Unlimited' },
    highlight: 'best' as const,
    bestId: 'nsc',
  },
  {
    id: 'risk',
    name: 'Safety/Risk Level',
    category: 'Safety',
    values: { nsc: 'Zero (Govt)', ppf: 'Zero (Govt)', fd: 'Low (Bank)' },
  },
  {
    id: '5yr_return',
    name: 'Approximate 5-Yr Return on ₹1L',
    category: 'Returns',
    values: { nsc: '₹1,44,896', ppf: '₹1,41,478', fd: '₹1,38,238' },
    highlight: 'best' as const,
    bestId: 'nsc',
  },
  {
    id: 'besttimeframe',
    name: 'Best For Which Timeline',
    category: 'Suitability',
    values: { nsc: '5-year goals', ppf: 'Retirement (15+ yrs)', fd: 'Short-term & emergency' },
  },
];

export default function NSCVsPPFVsFDPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="NSC vs PPF vs FD" slug="nsc-vs-ppf-fd" />

      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-amber-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NSC vs PPF vs FD: Complete Comparison</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Side-by-side comparison of India's three most popular guaranteed return savings schemes. See which offers best returns, tax benefits, and liquidity for your goals.
        </p>
      </div>

      {/* Featured Snippet Section */}
      <section className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-amber-900 mb-2">Quick Comparison: At a Glance</h2>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-slate-700 mb-1">NSC</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 7.7% interest</li>
              <li>• 5-year lock</li>
              <li>• Partially taxable</li>
              <li>• ₹100 minimum</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-slate-700 mb-1">PPF</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 7.1% interest</li>
              <li>• 15-year lock</li>
              <li>• Fully tax-free</li>
              <li>• ₹500 minimum</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-slate-700 mb-1">FD</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 6.5% interest</li>
              <li>• Flexible</li>
              <li>• Fully taxable</li>
              <li>• Most liquid</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          <strong>Best for:</strong> NSC (5-yr goals), PPF (retirement, 15+ yrs), FD (emergency funds, flexibility)
        </p>
      </section>

      {/* Interactive Comparison Matrix */}
      <section className="mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6">
        <ComparisonMatrix
          items={comparisonItems}
          features={comparisonFeatures}
          title="Interactive Comparison: Toggle Your Picks"
          description="Click on NSC, PPF, or FD above to toggle which schemes you want to compare side-by-side. Customize the view for your specific needs."
        />
      </section>

      {/* Full Comparison Table */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Full Feature Comparison (Static View)</h2>
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left p-4 font-semibold text-slate-700">Feature</th>
                <th className="text-left p-4 font-semibold text-slate-700">NSC</th>
                <th className="text-left p-4 font-semibold text-slate-700">PPF</th>
                <th className="text-left p-4 font-semibold text-slate-700">FD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                  <td className="p-4 text-slate-600">{row.nsc}</td>
                  <td className="p-4 text-slate-600">{row.ppf}</td>
                  <td className="p-4 text-slate-600">{row.fd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Real Example */}
      <section className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Real Example: Invest ₹1 Lakh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-amber-700 mb-2">NSC (5 Years)</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Maturity: <strong className="text-slate-800">₹1,44,896</strong></p>
              <p>Return: <strong className="text-slate-800">₹44,896</strong></p>
              <p>Tax on return: ~₹4,490</p>
              <p><strong>Net gain: ₹40,406</strong></p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2">PPF (5 Years)</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Maturity: <strong className="text-slate-800">₹1,41,478</strong></p>
              <p>Return: <strong className="text-slate-800">₹41,478</strong></p>
              <p>Tax on return: <strong>₹0</strong></p>
              <p><strong>Net gain: ₹41,478</strong></p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-slate-600 mb-2">FD (5 Years)</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Maturity: <strong className="text-slate-800">₹1,38,238</strong></p>
              <p>Return: <strong className="text-slate-800">₹38,238</strong></p>
              <p>Tax on return: ~₹11,471</p>
              <p><strong>Net gain: ₹26,767</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Which Should You Choose?</h2>
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-900 mb-1">✓ Choose NSC If:</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• You have a 5-year time horizon</li>
              <li>• You want highest 5-year guaranteed returns</li>
              <li>• You prefer government-backed safety</li>
              <li>• You want to maximize Section 80C benefits</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-emerald-900 mb-1">✓ Choose PPF If:</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• You have 15+ year horizon (retirement, child education)</li>
              <li>• You want fully tax-free returns forever</li>
              <li>• You're in 30% tax bracket (max benefit)</li>
              <li>• You value long-term wealth accumulation</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-1">✓ Choose FD If:</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• You need funds within 5 years</li>
              <li>• You value liquidity and flexibility</li>
              <li>• You're in low tax bracket (&lt;20%)</li>
              <li>• You're building an emergency fund</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <InContentAd format="horizontal" className="mb-6" />

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
        <h2 className="text-lg font-bold text-slate-800 mb-4">Calculate Your Returns</h2>
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ComparisonChart',
        name: 'NSC vs PPF vs FD Comparison',
        description: 'Compare NSC, PPF, and FD savings schemes side-by-side',
        url: 'https://calculate-today.com/calculators/nsc-vs-ppf-fd/',
      }} />

      <NewsletterCapture />
    </div>
  );
}
