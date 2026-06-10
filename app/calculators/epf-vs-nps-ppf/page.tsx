import type { Metadata } from 'next';
import { ArrowRightLeft } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { ComparisonMatrix } from '@/components/ComparisonMatrix';

export const metadata: Metadata = {
  title: 'EPF vs NPS vs PPF: Which Builds the Biggest Retirement Corpus?',
  description: 'EPF (8.25%) vs NPS (~10%) vs PPF (7.1%) — employer match, tax, annuity, lock-in. ₹30K salary for 30 yrs: who actually wins? Full 2025-26 comparison with numbers.',
  keywords: ['EPF vs NPS', 'EPF vs PPF', 'NPS vs PPF', 'best retirement savings India', 'EPF NPS PPF comparison'],
  alternates: { canonical: '/calculators/epf-vs-nps-ppf/' },
};

const comparisonItems = [
  { id: 'epf', name: 'EPF', color: 'bg-teal-500', badge: 'Employer Match' },
  { id: 'nps', name: 'NPS', color: 'bg-blue-500', badge: 'Market-Linked' },
  { id: 'ppf', name: 'PPF', color: 'bg-emerald-500', badge: 'Guaranteed' },
];

const comparisonFeatures = [
  {
    id: 'returns',
    name: 'Expected Returns',
    category: 'Returns',
    values: { epf: '8.25% (fixed, FY 2025-26)', nps: '10-12% CAGR (equity mix)', ppf: '7.1% (fixed)' },
    highlight: 'best' as const,
    bestId: 'nps',
  },
  {
    id: 'employer',
    name: 'Employer Contribution',
    category: 'Returns',
    values: { epf: '✓ 3.67% of basic (free money)', nps: '✓ Up to 10% of basic (optional)', ppf: '✗ None' },
    highlight: 'best' as const,
    bestId: 'epf',
  },
  {
    id: 'taxstatus',
    name: 'Tax Status',
    category: 'Tax Benefits',
    values: { epf: 'EEE (fully tax-free)', nps: 'EET (40% annuity taxed at retirement)', ppf: 'EEE (fully tax-free)' },
    highlight: 'best' as const,
    bestId: 'epf',
    worstId: 'nps',
  },
  {
    id: 'deduction80c',
    name: 'Section 80C Deduction',
    category: 'Tax Benefits',
    values: { epf: '✓ Within ₹1.5L limit', nps: '✓ Within ₹1.5L limit', ppf: '✓ Within ₹1.5L limit' },
  },
  {
    id: 'nps80ccd',
    name: 'Extra NPS Deduction (80CCD)',
    category: 'Tax Benefits',
    values: { epf: '✗ Not available', nps: '✓ ₹50K extra under 80CCD(1B)', ppf: '✗ Not available' },
    highlight: 'best' as const,
    bestId: 'nps',
  },
  {
    id: 'lockin',
    name: 'Lock-in Period',
    category: 'Flexibility',
    values: { epf: 'Until age 58 / retirement', nps: 'Until age 60', ppf: '15 years (extendable)' },
    highlight: 'best' as const,
    bestId: 'ppf',
  },
  {
    id: 'withdrawal',
    name: 'Withdrawal Flexibility',
    category: 'Flexibility',
    values: { epf: 'Partial from 5 yrs; full on exit', nps: '60% lump sum; 40% mandatory annuity', ppf: 'Partial from year 7; full at 15' },
    highlight: 'best' as const,
    bestId: 'epf',
    worstId: 'nps',
  },
  {
    id: 'annuity',
    name: 'Mandatory Annuity at Maturity',
    category: 'Flexibility',
    values: { epf: '✗ None', nps: '✓ 40% must buy annuity (lower returns)', ppf: '✗ None' },
    highlight: 'best' as const,
    bestId: 'epf',
  },
  {
    id: 'mininvest',
    name: 'Minimum Annual Contribution',
    category: 'Investment',
    values: { epf: '12% of basic (mandatory if salaried)', nps: '₹1,000/year', ppf: '₹500/year' },
    highlight: 'best' as const,
    bestId: 'nps',
  },
  {
    id: 'maxinvest',
    name: 'Maximum Annual Contribution',
    category: 'Investment',
    values: { epf: 'No cap on VPF (tax-free limit ₹2.5L)', nps: 'No limit', ppf: '₹1.5L/year' },
    highlight: 'best' as const,
    bestId: 'nps',
  },
  {
    id: 'risk',
    name: 'Investment Risk',
    category: 'Risk',
    values: { epf: 'Zero (government-backed)', nps: 'Medium (equity + debt mix)', ppf: 'Zero (government-backed)' },
    highlight: 'best' as const,
    bestId: 'epf',
  },
  {
    id: 'corpus30yr',
    name: 'Approx. Corpus (₹10K/month, 30 yrs)',
    category: 'Returns',
    values: { epf: '~₹4.8 crore (8.25%)', nps: '~₹7.2 crore (11% CAGR)', ppf: '~₹3.8 crore (7.1%, capped ₹1.5L/yr)' },
    highlight: 'best' as const,
    bestId: 'nps',
  },
];

const faqs = [
  {
    q: 'Which is better for retirement: EPF, NPS, or PPF?',
    a: 'Depends on your profile. EPF is best if you get employer match (free money). NPS is best for long-term growth if comfortable with equity. PPF is best for guaranteed, risk-free tax-free savings. Ideal strategy: max EPF + VPF first, add NPS ₹50K for extra deduction, then PPF if surplus remains.',
  },
  {
    q: 'Can I invest in all three simultaneously?',
    a: 'Yes. EPF is mandatory for most salaried employees. You can open NPS (Tier I) separately for the 80CCD(1B) deduction of ₹50K. You can open PPF at any bank or post office. Many high earners use all three to build a diversified, tax-efficient retirement corpus.',
  },
  {
    q: 'Why does NPS have mandatory annuity and is it bad?',
    a: 'At age 60, NPS requires 40% of corpus to buy an annuity (pension). Annuities typically yield 5-6% p.a. and are taxable. The remaining 60% is tax-free lump sum. This is the key disadvantage vs EPF/PPF where full corpus is tax-free. For a ₹3 crore NPS corpus: ₹1.8 crore lump sum (tax-free) + ₹1.2 crore annuity (taxable income).',
  },
  {
    q: 'Is EPF interest still tax-free in 2025-26?',
    a: 'Partially. Interest on EPF contributions up to ₹2.5L/year remains tax-free. Interest on contributions above ₹2.5L/year (including VPF) is taxable as income. For most employees, this limit is rarely breached unless they contribute very high VPF amounts.',
  },
  {
    q: 'What happens to EPF and NPS on job change?',
    a: 'EPF: Transfer to new employer via UAN (Universal Account Number) — seamless, no tax. NPS: Continue with same PRAN number across employers — no transfer needed, contributions simply continue. PPF: Self-maintained, unaffected by job change.',
  },
  {
    q: 'Which scheme gives the highest tax saving?',
    a: 'NPS gives the highest tax deduction: ₹1.5L under 80C + ₹50K under 80CCD(1B) = ₹2L total deduction. At 30% tax bracket, this saves ₹60K in taxes annually. EPF and PPF only qualify within the ₹1.5L 80C limit. If your only goal is tax saving, NPS wins by offering ₹50K extra.',
  },
];

const related = calculators.filter(c => ['epf-calculator', 'nps-calculator', 'ppf-calculator'].includes(c.id));

export default function EPFvsNPSvsPPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="EPF vs NPS vs PPF" slug="epf-vs-nps-ppf" />

      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <ArrowRightLeft className="w-4 h-4 text-teal-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">EPF vs NPS vs PPF: Complete Retirement Comparison 2025-26</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Side-by-side comparison of India's three main retirement savings schemes. See which builds the biggest corpus, saves the most tax, and gives the most flexibility.
        </p>
      </div>

      {/* Featured Snippet */}
      <section className="bg-teal-50 border-l-4 border-teal-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-teal-900 mb-2">Quick Answer: EPF vs NPS vs PPF</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-teal-700 mb-1">EPF</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 8.25% guaranteed</li>
              <li>• Employer match free</li>
              <li>• Fully tax-free (EEE)</li>
              <li>• Mandatory salaried</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-blue-700 mb-1">NPS</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 10-12% (equity)</li>
              <li>• ₹50K extra deduction</li>
              <li>• 40% annuity forced</li>
              <li>• Best corpus growth</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="text-xs font-bold text-emerald-700 mb-1">PPF</p>
            <ul className="text-xs text-slate-600 space-y-0.5">
              <li>• 7.1% guaranteed</li>
              <li>• No employer match</li>
              <li>• Fully tax-free (EEE)</li>
              <li>• Max ₹1.5L/year</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          <strong>Best strategy:</strong> Max EPF/VPF first (free employer match) → Add NPS ₹50K (extra tax deduction) → Add PPF for remaining safe savings
        </p>
      </section>

      {/* Interactive Comparison Matrix */}
      <section className="mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6">
        <ComparisonMatrix
          items={comparisonItems}
          features={comparisonFeatures}
          title="Interactive Comparison: Toggle Schemes"
          description="Click EPF, NPS, or PPF to toggle which schemes you want to compare. Expand categories to focus on Returns, Tax Benefits, or Flexibility."
        />
      </section>

      {/* Real Example */}
      <section className="mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Real Example: ₹50L Basic Salary — Retirement Corpus at 60</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-teal-700 mb-2">EPF + VPF</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Employee: ₹3L/year (12%)</p>
              <p>Employer: ₹1.84L/year (3.67%+8.33% EPS)</p>
              <p>VPF: ₹3L/year extra</p>
              <p>Rate: 8.25% over 30 yrs</p>
              <p className="font-bold text-slate-800 mt-2">Corpus: ~₹4.8 crore</p>
              <p className="text-green-600 text-xs">Fully tax-free</p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-blue-600 mb-2">NPS (Tier I)</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Self: ₹2L/year (80C + 80CCD)</p>
              <p>Employer: ₹5L/year (10%)</p>
              <p>Mix: 60% equity, 40% debt</p>
              <p>Rate: ~11% CAGR over 30 yrs</p>
              <p className="font-bold text-slate-800 mt-2">Corpus: ~₹7.2 crore</p>
              <p className="text-amber-700 text-xs">60% tax-free; 40% annuity</p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2">PPF</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Self: ₹1.5L/year max</p>
              <p>No employer match</p>
              <p>Rate: 7.1% over 30 yrs</p>
              <p>(Renew every 15 years)</p>
              <p className="font-bold text-slate-800 mt-2">Corpus: ~₹3.8 crore</p>
              <p className="text-green-600 text-xs">Fully tax-free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Which Should You Prioritise?</h2>
        <div className="space-y-3">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-teal-900 mb-1">Step 1: Maximise EPF first</p>
            <p className="text-xs text-slate-700">Employer contributes 3.67% of basic for free — that's an instant 30% return before any investment growth. Never opt out of EPF. Use VPF to top up beyond 12% for even more guaranteed, tax-efficient savings.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-1">Step 2: Add NPS for ₹50K extra deduction</p>
            <p className="text-xs text-slate-700">At 30% tax bracket, ₹50K NPS contribution saves ₹15K in tax per year. Over 30 years, that's ₹4.5L in saved taxes alone — before counting the returns on the NPS investment itself. Choose 75% equity for maximum growth.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-emerald-900 mb-1">Step 3: Add PPF if surplus remains</p>
            <p className="text-xs text-slate-700">If you have remaining 80C deduction room or want a pure guaranteed, fully flexible (no forced annuity) long-term vehicle, PPF fills that role. Best for non-salaried individuals who lack EPF access.</p>
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
        '@type': 'ComparisonChart',
        name: 'EPF vs NPS vs PPF Comparison',
        description: 'Compare EPF, NPS, and PPF retirement savings schemes side-by-side for returns, tax benefits, and flexibility',
        url: 'https://calculate-today.com/calculators/epf-vs-nps-ppf/',
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

      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Calculate Your Retirement Corpus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
