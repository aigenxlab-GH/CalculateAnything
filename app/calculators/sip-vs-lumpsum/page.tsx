import type { Metadata } from 'next';
import { ArrowRightLeft } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { ComparisonMatrix } from '@/components/ComparisonMatrix';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'SIP vs Lumpsum: ₹5K/Month vs ₹1L One-Time — Who Wins at 20 Yrs?',
  description: 'SIP vs lumpsum: real 20-year comparison. ₹5K/month SIP vs ₹1L lumpsum — which builds more wealth? Market timing matters. See numbers, risks and decision framework.',
  keywords: ['SIP vs lumpsum', 'SIP vs one time investment', 'lumpsum investing', 'SIP better than lumpsum'],
  alternates: { canonical: '/calculators/sip-vs-lumpsum/' },
};

const comparisonItems = [
  { id: 'sip', name: 'SIP', color: 'bg-emerald-500', badge: 'Dollar Cost Avg' },
  { id: 'lumpsum', name: 'Lumpsum', color: 'bg-blue-500', badge: 'Market Timing' },
];

const comparisonFeatures = [
  {
    id: 'amount',
    name: 'Investment Amount',
    category: 'Investment Style',
    values: { sip: 'Fixed monthly (₹5K-50K)', lumpsum: 'One-time (₹1L-100L+)' },
  },
  {
    id: 'frequency',
    name: 'Investment Frequency',
    category: 'Investment Style',
    values: { sip: 'Monthly/Quarterly', lumpsum: 'Single transaction' },
  },
  {
    id: 'risk',
    name: 'Market Timing Risk',
    category: 'Risk',
    values: { sip: 'Low (DCA smooths volatility)', lumpsum: 'High (one-time market exposure)' },
    highlight: 'best' as const,
    bestId: 'sip',
  },
  {
    id: 'volatility',
    name: 'Volatility Impact',
    category: 'Risk',
    values: { sip: 'Reduced by spreading purchases', lumpsum: 'Full impact (market timing dependent)' },
    highlight: 'best' as const,
    bestId: 'sip',
  },
  {
    id: 'returns5yr',
    name: '5-Year Returns (₹1L, 12% CAGR)',
    category: 'Returns (Typical)',
    values: { sip: 'Rs 69L (SIP Rs 5K/month)', lumpsum: 'Rs 1.76L' },
    highlight: 'best' as const,
    bestId: 'lumpsum',
  },
  {
    id: 'returns20yr',
    name: '20-Year Returns (₹1L base, 12% CAGR)',
    category: 'Returns (Long-term)',
    values: { sip: 'Rs 13+ crore (SIP Rs 5K/month)', lumpsum: 'Rs 9.6 crore' },
  },
  {
    id: 'discipline',
    name: 'Discipline Required',
    category: 'Behavioral',
    values: { sip: 'High (commit monthly)', lumpsum: 'Emotional (avoid panic selling)' },
  },
  {
    id: 'psycho',
    name: 'Psychological Impact',
    category: 'Behavioral',
    values: { sip: 'Low regret (averaging in)', lumpsum: 'High regret (if market crashes)' },
    highlight: 'best' as const,
    bestId: 'sip',
  },
  {
    id: 'cashflow',
    name: 'Cash Flow Requirement',
    category: 'Financial',
    values: { sip: 'Spread over time', lumpsum: 'Requires surplus now' },
    highlight: 'best' as const,
    bestId: 'sip',
  },
  {
    id: 'bestfor',
    name: 'Best For',
    category: 'Suitability',
    values: { sip: 'Regular salary earners, beginners', lumpsum: 'Bonus, inheritance, windfall' },
  },
];

const faqs = [
  {
    q: 'Should I do SIP or lumpsum investment?',
    a: 'SIP if you have regular monthly cash flow and want to reduce timing risk. Lumpsum if you have a windfall (bonus, inheritance) and 10+ year investment horizon. For most Indians, SIP is recommended due to salary-based cash flow.',
  },
  {
    q: 'Can lumpsum beat SIP in returns?',
    a: 'Yes, if you invest a lumpsum at market bottom. Example: Invest ₹1L on March 2020 (COVID crash) = Rs 2.5L by Jan 2025 (18% CAGR). But timing the bottom is nearly impossible. Over 100 market cycles, SIP historically matches or beats lumpsum.',
  },
  {
    q: 'What is dollar-cost averaging (DCA)?',
    a: 'Dollar-cost averaging means investing fixed amounts regularly (monthly SIP). You buy more shares when price is low, fewer when price is high, averaging out your purchase price. This reduces volatility impact.',
  },
  {
    q: 'If I have ₹5 lakh, should I invest all at once or SIP?',
    a: 'Depends on your risk tolerance. Lumpsum: ₹5L invested today grows faster IF market rises. SIP: ₹50K/month for 10 months reduces crash risk. Optimal: SIP ₹3L over 3 months (50%), invest ₹2L lumpsum (50%) = hybrid approach.',
  },
  {
    q: 'How much longer must I hold lumpsum vs SIP?',
    a: 'Both require 7+ years for equity. But lumpsum needs longer horizon to recover if you invest before market crash. SIP recovers faster due to averaging in during downturns. SIP suitable for 5-7 years, lumpsum for 10+ years.',
  },
  {
    q: 'SIP returns vs lumpsum: which is statistically higher?',
    a: 'Lumpsum wins 60-70% of the time if you invest at bottoms (impossible to predict). SIP wins 30-40% by avoiding peak investments. But SIP provides peace of mind and behavioral advantage. For most Indians, SIP mental comfort > 2-3% return difference.',
  },
];

const related = calculators.filter(c => ['sip-calculator', 'lumpsum-calculator', 'step-up-sip'].includes(c.id));

export default function SIPVsLumpsumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="SIP vs Lumpsum" slug="sip-vs-lumpsum" />

      <div className="mb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SIP vs Lumpsum: Which Investment Strategy Wins?</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Compare Systematic Investment Plan (SIP) vs lumpsum investing. Understand the pros, cons, returns, and which strategy builds more wealth for your goals.
        </p>
      </div>

      {/* Featured Snippet */}
      <section className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-emerald-900 mb-2">Quick Answer: SIP vs Lumpsum</h2>
        <p className="text-sm text-slate-700 mb-2">
          <strong>SIP wins</strong> if you earn salary monthly and want to reduce market timing risk. Dollar-cost averaging smooths volatility.
        </p>
        <p className="text-sm text-slate-700 mb-2">
          <strong>Lumpsum wins</strong> if you have a windfall (bonus, inheritance) and invest at market bottoms (impossible to predict).
        </p>
        <p className="text-xs text-slate-600">
          <strong>Reality:</strong> SIP matches or beats lumpsum 60-70% of the time historically due to behavioral discipline. Use a hybrid: 50% SIP over 6 months + 50% lumpsum = best of both.
        </p>
      </section>

      {/* Interactive Comparison Matrix */}
      <section className="mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6">
        <ComparisonMatrix
          items={comparisonItems}
          features={comparisonFeatures}
          title="Interactive SIP vs Lumpsum Comparison"
          description="Click SIP or Lumpsum to toggle comparison. Expand categories (Risk, Returns, Behavioral) to see detailed differences."
        />
      </section>

      {/* Real Example */}
      <section className="mb-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Real Example: ₹1 Lakh Investment Over 20 Years (12% CAGR)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2">SIP: ₹5,000/month</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Total invested: ₹12 lakh (₹5K × 240 months)</p>
              <p>Maturity value: <strong className="text-slate-800">₹13+ crore</strong></p>
              <p>Wealth created: ₹12.88 crore</p>
              <p className="text-green-600">✓ Smooth entry, no crash regret</p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-blue-600 mb-2">Lumpsum: ₹1 Lakh Today</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Invested once: ₹1 lakh</p>
              <p>Maturity value: <strong className="text-slate-800">₹9.6 crore</strong></p>
              <p>Wealth created: ₹9.59 crore</p>
              <p className="text-amber-700">⚠ If market crashes next year: ₹4.8 crore loss</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Which Strategy Should You Choose?</h2>
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-emerald-900 mb-1">✓ Choose SIP If:</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• You earn monthly salary (regular cash flow)</li>
              <li>• You want peace of mind (no timing anxiety)</li>
              <li>• You are a beginner investor (easier discipline)</li>
              <li>• You worry about market crashes (SIP buys cheap)</li>
              <li>• You have 5-20 year horizon (compounding builds wealth)</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-1">✓ Choose Lumpsum If:</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• You received bonus, inheritance, or windfall</li>
              <li>• You have 10+ year investment horizon</li>
              <li>• You are confident market will rise (data-driven, not emotional)</li>
              <li>• You have emergency fund separately (not touching investment)</li>
              <li>• You can stay invested despite 40-50% crashes</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-purple-900 mb-1">🏆 Best: Hybrid Approach</p>
            <ul className="text-xs text-slate-700 space-y-1 ml-4">
              <li>• Invest 50% as lumpsum immediately (if windfall)</li>
              <li>• Invest remaining 50% as SIP over 6-12 months</li>
              <li>• Captures upside of lumpsum + safety of SIP averaging</li>
              <li>• Balances timing risk and cash flow smoothing</li>
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
        '@type': 'ComparisonChart',
        name: 'SIP vs Lumpsum Comparison',
        description: 'Compare SIP and lumpsum investment strategies side-by-side',
        url: 'https://calculate-today.com/calculators/sip-vs-lumpsum/',
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
