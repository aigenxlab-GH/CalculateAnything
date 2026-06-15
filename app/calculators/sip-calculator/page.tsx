import type { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { SIPCalc } from '@/components/calculators/SIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'SIP Calculator: ₹5,000/Month Grows to How Much in 20 Years?',
  description: 'Free SIP calculator — ₹5K/month at 12% for 20 years = ₹49.9L corpus. Year-by-year breakdown, SIP vs lumpsum comparison. No sign-up, instant results.',
  keywords: ['SIP calculator', 'SIP return calculator', 'mutual fund SIP calculator', 'systematic investment plan'],
  alternates: { canonical: '/calculators/sip-calculator/' },
};

const faqs = [
  { q: 'What is SIP and how does it work?', a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount in mutual funds every month. You buy fund units at the prevailing NAV, benefiting from rupee cost averaging over time.' },
  { q: 'What is the expected return rate for SIP?', a: 'Equity mutual funds have historically delivered 12-15% CAGR over long periods (10+ years). Debt funds give 6-8%. Use 12% as a conservative estimate for diversified equity SIP calculations.' },
  { q: 'How is SIP maturity value calculated?', a: 'FV = P × [(1+r)^n − 1]/r × (1+r), where P = monthly SIP, r = monthly rate (annual rate ÷ 12 ÷ 100), n = number of months. This assumes end-of-month investments.' },
  { q: 'Is SIP better than FD for long-term wealth?', a: 'For long-term goals (7+ years), SIP in equity funds has significantly outperformed FDs historically. But SIP returns are market-linked and not guaranteed, unlike FD returns.' },
  { q: 'How much SIP is needed to accumulate Rs 1 crore?', a: 'At 12% annual return: Rs 5,500/month for 20 years, Rs 2,600/month for 25 years, or Rs 1,700/month for 30 years. Starting earlier dramatically reduces the required monthly SIP due to compounding. The SIP calculator lets you reverse-engineer the amount needed for any target corpus.' },
  { q: 'What is a step-up SIP and should I use one?', a: 'A step-up SIP automatically increases your investment by a fixed percentage each year, typically 10-15% to match salary growth. Over 20 years, a Rs 5,000/month SIP stepped up 10% annually builds a corpus nearly 2x larger than a flat Rs 5,000 SIP. Always use a step-up SIP if your income is growing.' },
  { q: 'What is the minimum SIP amount to start investing?', a: 'Most mutual funds allow SIPs starting from Rs 100-500/month. Platforms like Groww and Zerodha Coin allow Rs 100 minimums on most large-cap funds. There is no maximum limit. The key is consistency - a small SIP started early outperforms a larger SIP started late.' },
  { q: 'How are SIP returns taxed in India?', a: 'Equity fund SIP units held over 1 year attract LTCG tax at 12.5% on gains above Rs 1.25 lakh per year. Units held under 1 year are STCG at 20%. Each SIP instalment is treated as a separate investment with its own purchase date for tax purposes.' },
];

const related = calculators.filter(c => ['goal-sip', 'step-up-sip', 'lumpsum-calculator'].includes(c.id));

export default function SIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="SIP Calculator" slug="sip-calculator" />
      <CalculatorByline slug="sip-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SIP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate the maturity value and wealth created from your monthly SIP investment. Includes a year-by-year growth chart and comparison panel for different scenarios.</p>
      </div>
      <SIPCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* Cross-Calculator Internal Linking Section */}
      <section className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
        <h2 className="text-sm font-bold text-green-900 mb-3">Explore Related Investment Strategies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
          <div>
            <p className="font-semibold text-slate-800 mb-1">SIP vs Lumpsum</p>
            <p className="text-xs text-slate-600 mb-2">Have a large amount to invest now? Use our <a href="/calculators/lumpsum-calculator/" className="text-primary font-medium hover:underline">Lumpsum Calculator</a> to compare returns vs SIP over different horizons.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Increase Your SIP</p>
            <p className="text-xs text-slate-600 mb-2">Align your investments with salary growth using a <a href="/calculators/step-up-sip/" className="text-primary font-medium hover:underline">Step-Up SIP</a> — it can double your corpus vs flat SIP over 20 years.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Target-Based Goals</p>
            <p className="text-xs text-slate-600 mb-2">Set a wealth goal and calculate the exact SIP needed using our <a href="/calculators/goal-sip/" className="text-primary font-medium hover:underline">Goal SIP Calculator</a>.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">Real Returns</p>
            <p className="text-xs text-slate-600 mb-2">Understand long-term wealth with our <a href="/calculators/cagr-calculator/" className="text-primary font-medium hover:underline">CAGR Calculator</a> — compute actual compounded annual growth rates.</p>
          </div>
        </div>
      </section>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Calculate SIP Returns',
        description: 'Step-by-step guide to using the SIP calculator to find maturity value and plan your mutual fund investment.',
        totalTime: 'PT2M',
        tool: [{ '@type': 'HowToTool', name: 'SIP Calculator' }],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter monthly SIP amount',
            text: 'Type the fixed amount you plan to invest every month, e.g. ₹5,000.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set expected annual return rate',
            text: 'Enter the expected annual return rate. Use 12% for equity mutual funds as a conservative estimate.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose investment duration',
            text: 'Select your investment tenure in years, e.g. 10, 15, or 20 years.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review maturity value and wealth gained',
            text: 'The calculator instantly shows total corpus at maturity, total amount invested, and wealth gained through compounding.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Compare scenarios',
            text: 'Use the comparison panel to see how different SIP amounts or return rates change your final corpus.',
          },
        ],
      }} />
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
        name: 'SIP Calculator',
        url: 'https://calculate-today.com/calculators/sip-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'SIP calculator — compute maturity value of monthly SIP investments with expected return rate.',
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
      <RelatedGuides calculatorId="sip-calculator" />
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
