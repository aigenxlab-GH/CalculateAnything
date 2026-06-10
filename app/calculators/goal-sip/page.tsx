import type { Metadata } from 'next';
import { Target } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { GoalSIPCalc } from '@/components/calculators/GoalSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Goal SIP Calculator: Monthly SIP to Reach ₹1 Crore in 20 Yrs?',
  description: 'Free goal SIP calculator — ₹1Cr in 20 years at 12% needs only ₹10,011/month. Enter your target corpus, get exact SIP. Plan education, home, retirement now.',
  keywords: ['goal SIP calculator', 'SIP needed for goal', 'target SIP calculator', 'reverse SIP calculator'],
  alternates: { canonical: '/calculators/goal-sip/' },
};

const faqs = [
  { q: 'How much SIP do I need for ₹1 crore?', a: 'At 12% expected return: for 10 years you need ₹43,471/month; for 15 years, ₹19,816/month; for 20 years, ₹10,011/month. Starting early dramatically reduces the monthly SIP required.' },
  { q: 'How is goal SIP calculated?', a: 'Required SIP = Goal Amount / ((((1+r)^n − 1)/r) × (1+r)), where r = monthly rate, n = months. This is the reverse of the SIP maturity formula.' },
  { q: 'What are common financial goals to plan for?', a: 'Child education (typically ₹50L–₹1Cr), marriage fund (₹25–50L), home down payment (₹20–50L), retirement corpus (₹3–5Cr), foreign travel or car (₹5–20L).' },
  { q: 'What happens if I delay starting my Goal SIP by 2 years?', a: 'Delaying by 2 years typically increases the required monthly SIP by 15-25%. For a Rs 50 lakh goal in 15 years at 12%, you need Rs 10,500/month. Waiting 2 years means you need Rs 14,000/month - paying Rs 84,000 extra per year. Every month of delay compounds the catch-up cost.' },
  { q: 'Can I use Goal SIP for multiple financial goals simultaneously?', a: 'Yes - and you should. Create separate SIPs for each goal: one for child education, one for home down payment, one for retirement. Each SIP runs in an appropriate fund category matching the time horizon. Mixing goals in one SIP makes tracking and rebalancing difficult.' },
  { q: 'Goal SIP vs PPF - which is better for a 15-year goal?', a: 'For a 15-year horizon, equity Goal SIP at 12%+ CAGR historically outperforms PPF at 7.1%. However, PPF returns are guaranteed and tax-free while SIP returns are market-linked. A combination works best: PPF for the guaranteed floor plus Goal SIP for the growth component.' },
  { q: 'Should I increase my Goal SIP amount if my target changes?', a: 'Yes - review your Goal SIP at least annually. If your target corpus increases due to higher inflation estimates, use the Goal SIP calculator to recompute the required monthly amount for the remaining years and increase the SIP accordingly. Most platforms allow free SIP amount modifications.' },
  { q: 'What should I do if the required Goal SIP amount is too high for my budget?', a: 'If the computed SIP is unaffordable, use a step-up SIP instead: start at a lower amount you can afford today and increase it 10-15% each year as your salary grows. For example, if you need Rs 20,000/month but can only manage Rs 12,000, a 15% annual step-up from Rs 12,000 reaches Rs 20,000+ in just 4 years while still building significant corpus. Alternatively, extend the goal timeline by 2-3 years to reduce the monthly requirement substantially.' },
];

const related = calculators.filter(c => ['sip-calculator', 'step-up-sip', 'lumpsum-calculator'].includes(c.id));

export default function GoalSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Goal SIP" slug="goal-sip" />
      <CalculatorByline slug="goal-sip" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Goal SIP Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Enter your financial goal amount, timeline and expected returns — we instantly calculate the exact monthly SIP needed to reach it.</p>
      </div>
      <GoalSIPCalc />
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
        name: 'Goal SIP Calculator',
        url: 'https://calculate-today.com/calculators/goal-sip/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Goal SIP calculator — find the monthly SIP amount needed to reach your target corpus.',
      }} />
      {/* Content Depth: Goal Planning & Real Examples */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Monthly SIP for Popular Financial Goals (At 12% Returns)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Child Education Goal (Rs 50L in 15 years):</strong> Required monthly SIP = Rs 10,500. Invest for 180 months, corpus grows to Rs 50L tax-free in education. Timeline: age 3 → age 18 (college ready). Can adjust upward in 5-year reviews as inflation hits ~6% per year.
            </p>
            <p>
              <strong>Home Down Payment (Rs 40L in 10 years):</strong> Required monthly SIP = Rs 24,000. Invest for 120 months, corpus grows to Rs 40L (20% down payment for Rs 200L home). Timeline: age 35 → age 45 (peak earning years). Can use home loan for remaining 80%.
            </p>
            <p>
              <strong>Retirement Corpus (Rs 300L in 25 years):</strong> Required monthly SIP = Rs 35,000. Invest continuously, corpus reaches Rs 300L for 25-year post-retirement spending (if you also draw interest). Timeline: age 25 → age 50 (full career). Actually builds Rs 450L+ with careful rebalancing in final 5 years.
            </p>
            <p>
              <strong>Child Marriage Goal (Rs 20L in 18 years):</strong> Required monthly SIP = Rs 3,200. Invest early (start when child is 0-5 years), let compounding work. By year 18, Rs 20L accumulated for marriage expenses (venue, shopping, gifts). Inflation-adjusted: actual cost might be Rs 30-35L, so recommend Rs 200K upfront + Rs 3.2K SIP.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">How Goal Inflation Affects Your SIP (Critical Planning Factor)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Inflation Impact Example:</strong> Child education today = Rs 40L (IIT/medical college 4-year fee + hostel). Inflation rate = 6% annually (education inflation is 1-2% above CPI). In 15 years, same education = Rs 98L (2.45x current cost). Most people use Rs 40L goal → falls short by Rs 58L. Solution: add 6% inflation to returns assumption. Instead of 12% assumed return, use 12% - 6% = 6% real return in calculator.
            </p>
            <p>
              <strong>Home Inflation Example:</strong> Home price today = Rs 100L, need Rs 20L down payment (20%). In 10 years, home price = Rs 160L (5% annual appreciation), need Rs 32L down payment. Most people calculate for Rs 20L, run short by Rs 12L. Solution: assume home appreciation (5%) in your goal amount. Instead of Rs 20L goal, use Rs 32L.
            </p>
            <p>
              <strong>Retirement Inflation Example:</strong> Today you spend Rs 50K/month. In 30 years at 5% inflation, same spending = Rs 215K/month. Most people calculate retirement corpus for today{`'`}s spending = massively under-prepared. Solution: multiply current monthly spend × 300 (25-year lifespan × 12 months) × 1.5-2x (inflation buffer) = real retirement goal. Example: Rs 50K × 300 × 1.75 = Rs 2.6 crore.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Fund Selection for Different Time Horizons (Goal SIP Risk Matching)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>{`<`}5 Years (Short-term Goal):</strong> Use Debt/Conservative funds or short-term debt funds. Expected returns = 5-6%. Higher volatility unacceptable. Example: car fund in 3 years → use liquid funds, max 2-3% risk. Monthly SIP in bank savings interest wouldn{`'`}t be enough, debt fund SIP is optimal.
            </p>
            <p>
              <strong>5-10 Years (Medium-term Goal):</strong> Use Balanced/Hybrid funds (60% equity, 40% debt). Expected returns = 9-10%. Balanced downside risk with growth potential. Example: home down payment in 8 years → 60% stock, 40% bond split smooths volatility while aiming for double-digit returns.
            </p>
            <p>
              <strong>10-15 Years (Long-term Goal):</strong> Use Growth/Large-cap equity funds. Expected returns = 11-13%. Can absorb 40-50% volatility. Example: child education in 15 years → 100% equity SIP. Market volatility during tenure matters little compared to long compounding power.
            </p>
            <p>
              <strong>15+ Years (Retirement):</strong> Use Growth funds for first 10 years (12%+ expected return), shift to balanced funds in years 11-15 (10% return), shift to debt in years 16+ (6-7% return, capital preservation). Glide path strategy: aggressive early, conservative late. Example: 30-year retirement planning = 100% equity until age 45, 50-50 until 50, 30-70 until retirement.
            </p>
          </div>
        </div>
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
      <RelatedGuides calculatorId="goal-sip" />
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
