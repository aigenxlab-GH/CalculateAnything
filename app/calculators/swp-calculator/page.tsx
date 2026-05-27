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

export const metadata: Metadata = {
  title: 'SWP Calculator — Systematic Withdrawal Plan',
  description: 'Calculate how long your mutual fund corpus lasts with monthly systematic withdrawals. Plan your retirement income with SWP.',
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
            <ArrowDownCircle className="w-4 h-4 text-cyan-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">SWP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Plan your retirement income with Systematic Withdrawal Plan. See how long your corpus lasts with monthly withdrawals and at what return rate it lasts indefinitely.</p>
      </div>
      <SWPCalc />
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
