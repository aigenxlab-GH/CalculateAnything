import type { Metadata } from 'next';
import { BarChart2 } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CAGRCalc } from '@/components/calculators/CAGRCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'CAGR Calculator — Compound Annual Growth Rate',
  description: 'Calculate CAGR from initial and final investment value. Compare your returns against FD, PPF and Nifty 50 benchmarks.',
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
