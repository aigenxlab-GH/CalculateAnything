import type { Metadata } from 'next';
import { ArrowDownCircle } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { SWPCalc } from '@/components/calculators/SWPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'SWP Calculator: How Long Does ₹50L Corpus Last at ₹25K/Month?',
  description: 'Free SWP calculator — ₹50L corpus at 8% return with ₹25K monthly withdrawals lasts 30+ years. Plan retirement income, see corpus depletion year by year.',
  keywords: ['SWP calculator', 'systematic withdrawal plan', 'retirement income calculator', 'SWP mutual fund'],
  alternates: { canonical: '/calculators/swp-calculator/' },
};

const faqs = [
  { q: 'What is SWP?', a: 'Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount from your mutual fund every month. It\'s ideal for retirement income — your corpus continues to grow while you draw a monthly income.' },
  { q: 'How long will my corpus last?', a: 'If your monthly return on corpus exceeds your withdrawal, the corpus lasts indefinitely. Example: ₹50L at 8% return earns ₹33,333/month; if you withdraw ₹25,000/month, the corpus keeps growing.' },
  { q: 'Is SWP income taxable?', a: 'SWP from equity funds: gains taxed as LTCG (10% above ₹1L if held >1 year) or STCG (15% if held <1 year). Debt funds are taxed as per your income slab (LTCG with indexation benefit removed from FY 2024-25).' },
  { q: 'What is the difference between SWP and dividend option in mutual funds?', a: 'In dividend option, the fund house decides if and when to pay dividends - you have no control. With SWP, you set the exact withdrawal amount and date every month. SWP is also more tax-efficient: only the capital gains portion of each withdrawal is taxed, unlike dividends which are taxed at slab rates on the entire amount.' },
  { q: 'How is SWP taxed in India?', a: 'Each SWP withdrawal has two components: return of capital (tax-free) and capital gains (taxed). For equity funds, LTCG held over 1 year is taxed at 12.5% on gains above Rs 1.25L/year; STCG at 20%. Since the oldest units are redeemed first (FIFO), most SWP withdrawals after a few years qualify as LTCG, making SWP tax-efficient for retirement income.' },
  { q: 'What is the safe withdrawal rate for an Indian retirement corpus?', a: 'The US 4% rule may need adjustment for India due to higher inflation of 5-7% vs the US 2-3%. A 3-3.5% withdrawal rate is more conservative for Indian retirees. On a Rs 2 crore corpus, that is Rs 60,000-70,000/month. The SWP calculator helps model different withdrawal rates against your specific corpus.' },
  { q: 'Can I set up SWP in equity funds for regular monthly income?', a: 'Yes - a popular retirement strategy. Keep your corpus in a balanced advantage fund or large-cap equity fund and set up a monthly SWP. Key rule: if the market falls more than 20%, reduce withdrawals for that year to avoid selling units at a loss. Keep 12-24 months of expenses in a liquid fund as a cash buffer.' },
  { q: 'What is the minimum corpus needed to retire with SWP in India?', a: 'Using the 3.5% safe withdrawal rate for India (adjusted for 6% inflation): for Rs 50,000/month (Rs 6 lakh/year), you need Rs 1.7 crore corpus. For Rs 1 lakh/month: Rs 3.4 crore. For Rs 2 lakh/month: Rs 6.8 crore. These figures assume a balanced allocation returning 9–10% p.a. Use the FIRE calculator to work out how many years of savings are needed to reach your target corpus.' },
];

const related = calculators.filter(c => ['sip-calculator', 'retirement-fire', 'nps-calculator'].includes(c.id));

export default function SWPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="SWP Calculator" slug="swp-calculator" />
      <CalculatorByline slug="swp-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
            <ArrowDownCircle className="w-4 h-4 text-cyan-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SWP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Plan your retirement income with Systematic Withdrawal Plan. See how long your corpus lasts with monthly withdrawals and at what return rate it lasts indefinitely.</p>
      </div>
      <SWPCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* Corpus longevity reference */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">How Long Does Your Corpus Last?</h2>
        <p className="text-xs text-slate-500 mb-3">Assumes 8% annual return on the corpus. Monthly withdrawal fixed throughout.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Corpus</th>
                <th className="px-3 py-2 text-left border border-slate-100">₹15K/month</th>
                <th className="px-3 py-2 text-left border border-slate-100">₹25K/month</th>
                <th className="px-3 py-2 text-left border border-slate-100">₹40K/month</th>
                <th className="px-3 py-2 text-left border border-slate-100">₹60K/month</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹25 lakh', '26 yrs', '13 yrs', '7 yrs', '4 yrs'],
                ['₹50 lakh', 'Indefinite ✓', '30+ yrs', '16 yrs', '9 yrs'],
                ['₹1 crore', 'Indefinite ✓', 'Indefinite ✓', 'Indefinite ✓', '23 yrs'],
                ['₹2 crore', 'Indefinite ✓', 'Indefinite ✓', 'Indefinite ✓', 'Indefinite ✓'],
              ].map(([corpus, ...vals]) => (
                <tr key={corpus} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{corpus}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-3 py-2 border border-slate-100 ${v.includes('✓') ? 'text-emerald-700 font-medium' : ''}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">"Indefinite" means monthly return on corpus exceeds withdrawal — the corpus keeps growing.</p>
      </section>

      {/* India-specific safe withdrawal context */}
      <section className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-amber-900 mb-2">The 3.5% Rule for Indian Retirees</h2>
        <p className="text-sm text-slate-700 mb-2">
          The popular 4% rule was built on US market data and 2-3% inflation. India's average CPI inflation runs 5-7%. A safer withdrawal rate for Indian retirees is <strong>3-3.5% annually</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">₹50K/month goal</p>
            <p>Annual need: ₹6L</p>
            <p>At 3.5% rate → corpus needed: <strong>₹1.71 crore</strong></p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">₹1L/month goal</p>
            <p>Annual need: ₹12L</p>
            <p>At 3.5% rate → corpus needed: <strong>₹3.43 crore</strong></p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="font-bold text-slate-800 mb-1">₹2L/month goal</p>
            <p>Annual need: ₹24L</p>
            <p>At 3.5% rate → corpus needed: <strong>₹6.86 crore</strong></p>
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
        '@type': 'WebApplication',
        name: 'SWP Calculator',
        url: 'https://calculate-today.com/calculators/swp-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'SWP calculator — see how long your mutual fund corpus lasts with monthly systematic withdrawals.',
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
      <RelatedGuides calculatorId="swp-calculator" />
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
