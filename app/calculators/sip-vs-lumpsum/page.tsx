import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
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
    name: '5-Year Returns (Rs 3 lakh deployed, 12% CAGR)',
    category: 'Returns (Typical)',
    values: { sip: 'Rs 4.12 lakh (SIP Rs 5K/month)', lumpsum: 'Rs 5.29 lakh (one-time Rs 3 lakh)' },
    highlight: 'best' as const,
    bestId: 'lumpsum',
  },
  {
    id: 'returns20yr',
    name: '20-Year Returns (Rs 12 lakh deployed, 12% CAGR)',
    category: 'Returns (Long-term)',
    values: { sip: 'Rs 49.96 lakh (SIP Rs 5K/month)', lumpsum: 'Rs 1.16 crore (one-time Rs 12 lakh)' },
    highlight: 'best' as const,
    bestId: 'lumpsum',
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
  {
    q: 'Is SIP better than FD for long-term wealth creation?',
    a: 'Over a 10+ year horizon, equity SIPs have historically outperformed fixed deposits by a wide margin: the Nifty 50 has delivered roughly 12% CAGR over the past 20 years against FD rates of 6-7%. SIP returns are not guaranteed, though, and in any given 3-year window a SIP can underperform an FD. For goals beyond 7 years, equity SIP has historically been the stronger choice.',
  },
  {
    q: 'Can I do both SIP and lumpsum in the same fund?',
    a: 'Yes. You can invest a lumpsum into a mutual fund and run a monthly SIP in the same scheme at the same time. Many investors put their annual bonus in as a lumpsum and keep the salary SIP running. The fund makes no distinction between the two; units are simply added at the prevailing NAV.',
  },
  {
    q: 'What is the minimum SIP amount?',
    a: 'Most large-cap and index funds accept SIPs from Rs 100-500/month, and several platforms allow Rs 100 minimums. There is no upper limit. For a meaningful wealth-accumulation goal, Rs 2,000-5,000/month is a more realistic starting point.',
  },
  {
    q: 'How is SIP taxed compared to a lumpsum?',
    a: 'Each SIP instalment counts as a separate investment with its own purchase date. For equity funds, units held over a year attract LTCG at 12.5% on gains above Rs 1.25 lakh a year, while units held under a year attract STCG at 20%. With a lumpsum, every unit shares one purchase date, so after a year the entire gain can qualify for LTCG treatment. That gives a lumpsum a modest tax-timing advantage in some cases.',
  },
  {
    q: 'How much SIP do I need for 1 crore in 15 years?',
    a: 'At 12% CAGR a SIP of roughly Rs 20,000/month reaches Rs 1 crore in 15 years. Starting at about Rs 14,000/month and stepping up 10% annually gets you to the same place with a lower initial commitment that tracks typical income growth. Use the Goal SIP Calculator to back-solve the exact figure for your target.',
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
        <h2 className="text-lg font-bold text-slate-800 mb-1">Real Example: Rs 12 Lakh Deployed Over 20 Years (12% CAGR)</h2>
        <p className="text-xs text-slate-600 mb-3">
          Both columns below deploy the same Rs 12 lakh of capital, so the comparison is like-for-like.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2">SIP: Rs 5,000/month</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Total invested: Rs 12 lakh (Rs 5K x 240 months)</p>
              <p>Maturity value: <strong className="text-slate-800">Rs 49.96 lakh</strong></p>
              <p>Wealth created: Rs 37.96 lakh</p>
              <p className="text-green-600">Smooth entry, no crash regret</p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-xs font-bold text-blue-600 mb-2">Lumpsum: Rs 12 Lakh on Day 1</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Invested once: Rs 12 lakh</p>
              <p>Maturity value: <strong className="text-slate-800">Rs 1.16 crore</strong></p>
              <p>Wealth created: Rs 1.04 crore</p>
              <p className="text-amber-700">Needs nerve to hold through a 40-50% drawdown</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-3">
          The lumpsum finishes roughly Rs 66 lakh ahead on identical capital, purely because all of it
          compounds for the full 20 years while the SIP deploys its last rupee in month 240. That edge is
          real but conditional: it assumes you invest the whole sum at once and do not sell during a
          crash. For reference, a smaller Rs 1 lakh one-time investment over the same 20 years at 12%
          grows to about Rs 9.65 lakh.
        </p>
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

      {/* Rupee Cost Averaging */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Rupee Cost Averaging: What It Actually Means</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          When you invest Rs 5,000/month and the NAV falls from Rs 50 to Rs 40, you buy 125 units in the
          cheaper month against 100 units in the expensive one. Your average cost per unit ends up lower
          than if you had bought everything at Rs 50. That is rupee cost averaging.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          The benefit only materialises if prices recover after the dip. In a market that keeps falling, a
          SIP still produces a loss, just a smaller one than a lumpsum would. The advantage of a SIP is not
          that it guarantees profits; it is that it reduces the impact of bad timing on large deployments
          of capital.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          This is why a common approach is a SIP for regular income and a lumpsum for windfalls such as a
          bonus, inheritance or asset sale. It maximises deployment speed for large sums while keeping the
          discipline that monthly investing builds.
        </p>
      </section>

      {/* STP */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">STP: The Middle Path Between SIP and Lumpsum</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          A Systematic Transfer Plan parks the entire lumpsum in a liquid fund of the same AMC, earning
          roughly 6-7% risk-free, then auto-transfers a fixed amount into your target equity fund each
          month. It deploys faster than a 12-month SIP while avoiding a single all-in entry.
        </p>
        <ul className="text-sm text-slate-600 space-y-2 ml-4 mb-3">
          <li>Against a savings account: the parked money earns 6-7% rather than 3-4%.</li>
          <li>Against a straight lumpsum: you avoid the regret of deploying everything the week before a 5% fall.</li>
          <li>Against a salary-funded SIP: the full amount reaches equity in 6-12 months instead of several years.</li>
        </ul>
        <p className="text-sm text-slate-600 leading-relaxed">
          Worked example: Rs 15 lakh from a flat sale. Park it in a liquid fund, then set an STP of
          Rs 1.5 lakh/month into your target large-cap fund for 10 months. Total deployment time is 10
          months, and the idle balance earns 6-7% throughout.
        </p>
      </section>

      {/* Step-Up SIP */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Step-Up SIP: Matching Investment to Income Growth</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          A step-up SIP raises your monthly contribution by a fixed percentage each year. A Rs 5,000/month
          SIP increased 10% annually reaches Rs 8,053/month by year six, and the 20-year corpus lands
          roughly 1.9x larger than a flat Rs 5,000 SIP on the same 12% assumption.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Step-ups suit salaried investors whose income rises annually, because they stop lifestyle
          inflation from quietly eroding the savings rate. Most AMCs and platforms allow the setup at no
          extra cost. See the{' '}
          <Link href="/calculators/step-up-sip/" className="font-medium text-primary hover:underline">
            Step-Up SIP Calculator
          </Link>{' '}
          to compare a rising SIP against a flat one.
        </p>
      </section>

      {/* 10-year math */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Rs 12 Lakh Lumpsum vs Rs 10,000 SIP Over 10 Years</h2>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-bold text-blue-700 mb-2">Scenario A: Rs 12 lakh lumpsum</p>
            <div className="text-xs text-slate-700 space-y-1">
              <p>Deployed: Rs 12 lakh on day 1</p>
              <p>Corpus after 10 years: <strong>Rs 37.27 lakh</strong></p>
              <p>Wealth gain: Rs 25.27 lakh</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2">Scenario B: Rs 10,000/month SIP</p>
            <div className="text-xs text-slate-700 space-y-1">
              <p>Deployed: Rs 12 lakh over 120 months</p>
              <p>Corpus after 10 years: <strong>Rs 23.23 lakh</strong></p>
              <p>Wealth gain: Rs 11.23 lakh</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The lumpsum builds Rs 14 lakh more on identical capital, purely through time in market. But that
          assumes a steady 12%. Over a real stretch like 2007-2017, a lumpsum deployed in January 2008
          would have halved by March 2009 before recovering, and many investors capitulate at that point.
          If you have the money today and can hold through a 50% drawdown, lumpsum wins. If the timing
          risk worries you, deploy it over a 6-12 month STP instead.
        </p>
      </section>

      {/* 1 crore */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">What It Takes to Reach Rs 1 Crore in 15 Years</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          At a 12% CAGR there are three routes to the same Rs 1 crore target in 15 years:
        </p>
        <ul className="text-sm text-slate-600 space-y-2 ml-4 mb-3">
          <li>A flat SIP of about <strong>Rs 20,000/month</strong> (Rs 36 lakh deployed in total).</li>
          <li>A one-time lumpsum of about <strong>Rs 18.3 lakh</strong> today.</li>
          <li>A step-up SIP starting near <strong>Rs 14,000/month</strong> and rising 10% a year.</li>
        </ul>
        <p className="text-sm text-slate-600 leading-relaxed">
          The lumpsum needs the largest single cheque but the smallest total outgo. The flat SIP demands
          the most capital overall. The step-up route is usually the most realistic for salaried earners,
          because the contribution grows alongside income rather than straining the early years.
        </p>
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

      <RelatedGuides calculatorId="sip-vs-lumpsum" />
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
