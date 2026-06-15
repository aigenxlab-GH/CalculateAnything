import type { Metadata } from 'next';
import { PiggyBank } from 'lucide-react';
import { RDCalc } from '@/components/calculators/RDCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'RD Calculator: ₹5,000/Month RD — Maturity Amount Revealed',
  description: 'Free RD calculator India — ₹5K/month at 7% for 3 years = ₹1.99L at maturity. Compare bank and post office RD rates 2026. Instant recurring deposit result.',
  keywords: ['RD calculator', 'recurring deposit calculator', 'RD maturity calculator', 'post office RD calculator'],
  alternates: { canonical: '/calculators/rd-calculator/' },
};

const faqs = [
  { q: 'How is RD maturity calculated?', a: 'Each monthly installment is compounded quarterly for the remaining period. RD uses the formula: M = R × [(1+r)^n − 1] / (1 − (1+r)^(-1/3)), where r = quarterly rate, n = quarters.' },
  { q: 'RD vs SIP — which is better?', a: 'RD offers guaranteed, fixed returns (no market risk) while SIP in equity can give much higher returns over the long term but with market risk. For short-term goals (1–3 years), RD is safer.' },
  { q: 'Can I open an RD in a post office?', a: 'Yes. Post Office RD has a 5-year term and currently offers 6.7% interest. It\'s eligible for Section 80C deduction and has government backing, making it very safe.' },
  { q: 'RD vs SIP - which is better for monthly savings?', a: 'Both invest a fixed monthly amount but RD gives guaranteed returns of typically 6-7% while SIP in equity funds has historically returned 12-15% over 10+ years. RD is suitable for 1-3 year goals requiring capital protection. SIP is better for 5+ year goals where market volatility can be absorbed for higher long-term growth.' },
  { q: 'How is RD interest calculated in Indian banks?', a: 'RD interest uses compound interest with quarterly compounding: each monthly instalment grows at (1 + R/4)^(4t), where R is the annual rate and t is remaining tenure in years. Banks compound quarterly, which results in a maturity amount slightly higher than simple interest calculation would suggest.' },
  { q: 'Can I close my RD before maturity?', a: 'Yes. Most banks allow premature RD closure with a penalty of 1-2% off the prevailing interest rate for the actual period held. Post office RD can be prematurely closed after 3 years with reduced interest. If you need liquidity, consider taking an overdraft against your RD at 1-2% above the RD rate instead of breaking it.' },
  { q: 'What is the Post Office RD interest rate and is it safe?', a: 'Post Office RD currently offers 6.7% per annum with quarterly compounding for a 5-year tenure. It is backed by the Government of India (sovereign guarantee), making it the safest RD option. Compared to bank RDs, India Post offers competitive rates and is particularly accessible for investors in smaller towns and rural areas.' },
  { q: 'How does RD compare to FD for the same amount and tenure?', a: 'RD and FD at the same rate will differ in maturity amount because FD invests the full amount on day one while RD invests monthly. Example: Rs 10,000/month RD vs Rs 1.2 lakh FD both at 7% for 1 year — the FD earns more because all principal is invested for the full period. Use RD when you can only commit a monthly amount; use FD when you have a lump sum. For the same interest rate, FD gives about 50% more absolute interest since capital is deployed earlier.' },
];

const related = calculators.filter(c => ['fd-calculator', 'ppf-calculator', 'sip-calculator'].includes(c.id));

export default function RDPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="RD Calculator" slug="rd-calculator" />
      <CalculatorByline slug="rd-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <PiggyBank className="w-4 h-4 text-pink-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Recurring Deposit (RD) Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Recurring Deposit maturity amount. Uses quarterly compounding as per Indian bank standards — applicable for all bank and post office RDs.</p>
      </div>
      <RDCalc />

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
        name: 'RD Calculator',
        url: 'https://calculate-today.com/calculators/rd-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'RD calculator — compute Recurring Deposit maturity value for any monthly deposit amount and tenure.',
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
      <RelatedGuides calculatorId="rd-calculator" />
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
