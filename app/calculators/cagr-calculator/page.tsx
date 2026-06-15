import type { Metadata } from 'next';
import { BarChart2 } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CAGRCalc } from '@/components/calculators/CAGRCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'CAGR Calculator: What Is Your Investment\'s True Annual Return?',
  description: 'Free CAGR calculator — ₹1L grown to ₹3L in 10 years = 11.6% CAGR. Find actual compound annual growth for any investment. Reverse-calculate in seconds.',
  keywords: ['CAGR calculator', 'compound annual growth rate', 'investment return calculator', 'CAGR formula India'],
  alternates: { canonical: '/calculators/cagr-calculator/' },
};

const faqs = [
  { q: 'What is CAGR?', a: 'CAGR (Compound Annual Growth Rate) is the annual rate of return that brings an investment from its initial value to its final value over a given period, assuming profits are reinvested.' },
  { q: 'CAGR formula?', a: 'CAGR = (Final Value / Initial Value)^(1/Years) − 1, expressed as a percentage. It smooths out the effect of market volatility to show a consistent annualised growth rate.' },
  { q: 'What is a good CAGR for investments?', a: '> 20%: Excellent (rare, usually small-cap or sector bets). 12–20%: Good (equity mutual funds). 8–12%: Moderate (balanced funds). < 8%: Low (consider if it beats inflation at ~6%).' },
  { q: 'What is the difference between CAGR and XIRR?', a: 'CAGR works for single investments with a fixed start and end value. XIRR handles irregular cash flows - it is the correct metric for SIPs where you invest different amounts at different dates. For evaluating a mutual fund SIP, always use XIRR. CAGR is accurate for lumpsum investments or fund performance measurement.' },
  { q: 'What is a good CAGR for a stock portfolio in India?', a: 'Nifty 50 has delivered approximately 13-14% CAGR over 20 years. A diversified equity portfolio matching or beating the index at 14-16% CAGR is excellent performance. Individual stock pickers targeting 20%+ CAGR should benchmark against the Nifty 50 total return index to assess true outperformance.' },
  { q: 'How do I calculate CAGR of my mutual fund?', a: 'CAGR = (Current NAV divided by Purchase NAV) raised to (1 divided by Years) minus 1. Example: bought at NAV Rs 50, current NAV Rs 120, held 5 years: CAGR = (120/50)^0.2 - 1 = 19.1%. For multiple SIP instalments, use XIRR instead. Your mutual fund factsheet shows trailing 1Y, 3Y and 5Y CAGR returns.' },
  { q: 'Can CAGR be negative and what does it mean?', a: 'Yes. Negative CAGR means your investment declined in value over the period. For example, CAGR of -5% means your portfolio lost 5% per year on average. It is important to evaluate CAGR over complete market cycles of 7-10 years rather than short periods that may capture only one phase of the market.' },
  { q: 'When should I use absolute returns instead of CAGR?', a: 'Use absolute return (percentage gain = (Final - Initial) / Initial × 100) for investments held less than 1 year, since CAGR annualises returns and can be misleading over very short periods. Example: a 20% gain in 3 months is 20% absolute return, but CAGR would show 107% — an unrealistic annualised figure. CAGR is most meaningful for periods of 2 years or more. For 1-year periods, absolute return and CAGR are identical.' },
];

const related = calculators.filter(c => ['lumpsum-calculator', 'sip-calculator', 'inflation-calculator'].includes(c.id));

export default function CAGRPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="CAGR Calculator" slug="cagr-calculator" />
      <CalculatorByline slug="cagr-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-blue-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">CAGR Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the Compound Annual Growth Rate of any investment. Enter initial and final values to see annualised returns and compare against benchmarks.</p>
      </div>
      <CAGRCalc />

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
        name: 'CAGR Calculator',
        url: 'https://calculate-today.com/calculators/cagr-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'CAGR calculator — compute the compound annual growth rate of any investment.',
      }} />
      {/* Content Depth: CAGR Benchmarking & Real Examples */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Benchmark CAGR Comparison: Is Your Investment Performing?</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Nifty 50 Index:</strong> 13-14% CAGR over 20 years (historical data 2005-2025). This is the baseline for equity investors. If your stock portfolio or equity fund CAGR is below 13%, you{`'`}re underperforming the index. Index funds (like Zerodha Golden or Vanguard Nifty) track this with minimal fees (~0.3%).
            </p>
            <p>
              <strong>Sensex (BSE):</strong> 12-13% CAGR over 20 years. Slightly lower than Nifty50 due to larger-cap bias and dividend adjustments. Use this if your portfolio is BSE-heavy (older PSU stocks, banks).
            </p>
            <p>
              <strong>Nifty Smallcap 50:</strong> 18-20% CAGR over 20 years (higher volatility). If you invest in small-cap funds, benchmark against this 18-20% range. Lower CAGR here suggests poor fund manager performance.
            </p>
            <p>
              <strong>Debt (Government Securities):</strong> 6-7% CAGR over 20 years (low volatility). If your debt fund CAGR is under 6%, you{`'`}re underperforming risk-free government bonds. Why pay an AMC fee?
            </p>
            <p>
              <strong>Inflation in India:</strong> ~6-7% CAGR. Your total portfolio CAGR should exceed inflation + taxes. If achieving 8% CAGR in a debt fund, real return = 8% - 7% inflation - 1% tax = 0% real return (you{`'`}re losing purchasing power). Shift to equity for growth.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">CAGR vs XIRR vs Absolute Return: When to Use Each</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>CAGR (Use: Lumpsum Investments, Funds):</strong> Formula: (Final/Initial)^(1/Years) - 1. Best for single investment with fixed start and end. Example: bought mutual fund at NAV Rs 100, now at Rs 250 after 5 years = CAGR 20%. Simple, assumes reinvestment. Use for comparing fund performance over fixed periods.
            </p>
            <p>
              <strong>XIRR (Use: SIPs, Monthly Investments):</strong> Internal Rate of Return - accounts for irregular cash flows. Example: SIP Rs 10K/month for 5 years at varying NAVs = XIRR 15% (accounts for each monthly investment date). More accurate for SIPs than CAGR. All mutual fund portals (Groww, Zerodha Coin) show XIRR for SIP portfolios.
            </p>
            <p>
              <strong>Absolute Return (Use: Short-term, {`<`}1 year):</strong> Formula: (Final - Initial) / Initial × 100. Example: stock bought at Rs 100, sold at Rs 125 in 3 months = 25% absolute return. CAGR would annualise this to 140% (misleading). Use absolute return for: day trades, short-term speculation, comparing monthly/quarterly performance.
            </p>
            <p>
              <strong>Decision Tree:</strong> Investment type = lumpsum? Use CAGR. Monthly SIP? Use XIRR. Hold period {`<`}1 year? Use absolute return. Comparing fund performance? Use trailing 1Y/3Y/5Y CAGR from factsheet.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Real Investment CAGR Examples Across Asset Classes</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Example 1: Equity Fund (Consistent Performer):</strong> Invested Rs 1L in a Nifty50 index fund in Jan 2020. Today (Jan 2025) = Rs 2.2L. CAGR = (2.2L/1L)^(1/5) - 1 = 18% CAGR. This beats Nifty historical 13-14% average because COVID crash in 2020 created buying opportunity. Takeaway: market crashes = buying opportunities for long-term investors.
            </p>
            <p>
              <strong>Example 2: Debt Fund (Underperformance Case):</strong> Invested Rs 1L in a debt fund in 2020. Today = Rs 1.32L. CAGR = (1.32L/1L)^(1/5) - 1 = 5.8% CAGR. This is BELOW 6% inflation + taxes. Real return = -0.5% (losing purchasing power). Takeaway: if debt fund CAGR {`<`} inflation, move to equity or fixed deposits.
            </p>
            <p>
              <strong>Example 3: Small-Cap Fund (High Volatility, High Growth):</strong> Invested Rs 1L in a small-cap fund in 2019. Today = Rs 3.2L. CAGR = (3.2L/1L)^(1/6) - 1 = 25.8% CAGR. This beats small-cap benchmark of 18-20%, good fund manager. But: if you invested Rs 1L in Jan 2022 (peak), today = Rs 0.85L (negative return). Takeaway: timing matters for small-caps, use SIP to smooth volatility.
            </p>
            <p>
              <strong>Example 4: Real Estate (Illiquid, Untracked CAGR):</strong> Bought flat for Rs 50L in 2015. Today valued at Rs 85L (2025). CAGR = (85L/50L)^(1/10) - 1 = 5.4% CAGR. Below inflation! Plus: maintenance Rs 50K/year, property tax Rs 10K/year = net return even lower. Takeaway: real estate appreciation lags equities historically, best as shelter not investment.
            </p>
          </div>
        </div>
      </section>
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
      <RelatedGuides calculatorId="cagr-calculator" />
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
