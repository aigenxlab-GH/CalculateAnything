import type { Metadata } from 'next';
import { Home } from 'lucide-react';
import { InterestFreeHomeLoan } from '@/components/calculators/InterestFreeHomeLoan';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Interest-Free Home Loan: Can a SIP Wipe Out Your ₹30L Interest?',
  description: 'Free calculator: invest ₹3K/month in SIP while paying your home loan EMI. The SIP corpus eventually offsets your entire interest cost. See your crossover point.',
  keywords: ['interest free home loan', 'home loan SIP offset', 'smart home loan strategy', 'SIP vs home loan interest'],
  alternates: { canonical: '/calculators/interest-free-home-loan/' },
};

const faqs = [
  { q: 'How can a home loan be interest-free?', a: 'The strategy works by investing a fixed amount in SIP (equity mutual fund) every month alongside your EMI. Over the loan tenure, SIP returns (historically 12%+) can exceed the total interest paid, making your net effective interest zero or even negative.' },
  { q: 'Is this a guaranteed strategy?', a: 'No. Equity SIP returns are market-linked and not guaranteed. This calculator shows the mathematical potential. The strategy works well historically but equity returns can vary significantly year-to-year.' },
  { q: 'How much should I invest in SIP alongside EMI?', a: 'Typically investing 20–30% of your EMI amount in an equity mutual fund SIP creates a large enough corpus over 15–20 years to offset the entire loan interest. The calculator shows the optimal SIP amount.' },
  { q: 'Which mutual funds are best for this strategy?', a: 'Diversified equity index funds (Nifty 50, Nifty Next 50) or flexi-cap funds work well. These have historically delivered 11–14% CAGR over 15+ year periods. Avoid debt funds for this strategy as returns are insufficient.' },
  { q: 'How much SIP do I need to offset my home loan interest?', a: 'For a Rs 50L loan at 8.5% for 20 years (total interest Rs 54L), you need approximately Rs 5,400/month SIP at 12% CAGR to accumulate Rs 54L over the same 20 years. The interest-free calculator computes this automatically for your specific loan inputs.' },
  { q: 'Is the interest-free home loan strategy risky?', a: 'The strategy has a key risk: equity SIP returns are not guaranteed. If equity returns drop to 8% in a bad decade, your SIP corpus may fall short of covering the loan interest. Mitigate this by starting the SIP as soon as the home loan disburses, using a conservative 10% return assumption, and staying invested for the full loan tenure.' },
  { q: 'Does this strategy work better in the old or new tax regime?', a: 'Old regime: Home loan interest deduction (Section 24) plus LTCG exemption on equity gives double benefit. New regime: No home loan interest deduction, but you still get the SIP maturity corpus. The strategy works in both regimes but gives marginally better net returns in the old regime for large loans where interest exceeds Rs 2L/year.' },
  { q: 'Can I use this strategy for a car loan or personal loan?', a: 'Yes, in principle. Any loan with a fixed tenure can be paired with a parallel SIP. However, car loans at 9-11% and personal loans at 12-15% have much higher rates than equity SIP historical returns. The offset is less reliable for high-rate short-tenure loans. This strategy works best for long-tenure home loans where equity has time to outperform.' },
];

const related = calculators.filter(c => ['home-loan', 'loan-prepayment', 'sip-calculator'].includes(c.id));

export default function InterestFreeHomeLoanPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Interest-Free Home Loan" slug="interest-free-home-loan" />
      <CalculatorByline slug="interest-free-home-loan" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Interest-Free Home Loan Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">See how investing a small SIP alongside your home loan EMI can offset the entire interest cost — making your home loan effectively interest-free.</p>
      </div>
      <InterestFreeHomeLoan />

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
        name: 'Interest-Free Home Loan Calculator',
        url: 'https://calculate-today.com/calculators/interest-free-home-loan/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Interest-free home loan calculator — see how SIP returns can offset your home loan interest cost.',
      }} />
      {/* Unique content — strategy explainer */}
      <section className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h2 className="text-base font-bold text-slate-800 mb-3">The SIP + EMI Strategy — Step by Step</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { step: '1', title: 'Take the Home Loan', color: 'blue', text: 'Borrow ₹50L at 8.5% for 20 years. Monthly EMI = ₹43,391. Total interest over 20 years = ₹54.14L — nearly equal to the principal.' },
            { step: '2', title: 'Start SIP on Day 1', color: 'blue', text: 'Invest ₹8,000–10,000/month in an equity index fund (Nifty 50) from the very first EMI month. Do not skip or pause for 20 years.' },
            { step: '3', title: 'Offset the Interest', color: 'blue', text: 'At 12% CAGR, a ₹9,000/month SIP grows to ₹55–60L in 20 years — fully covering the ₹54L interest. Net effective interest = ₹0.' },
          ].map(({ step, title, color, text }) => (
            <div key={step} className={`bg-white rounded-xl p-3 border border-${color}-100 text-xs`}>
              <p className={`font-bold text-${color}-700 mb-1.5`}>Step {step}: {title}</p>
              <p className="text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-3 border border-blue-100 text-xs text-slate-600">
          <p className="font-semibold text-slate-700 mb-1">⚠️ Key Risk to Understand</p>
          <p>Equity SIP returns are not guaranteed. Nifty 50 historical 20-year CAGR is ~13%, but future returns may differ. Use a conservative 10% assumption when planning. If returns drop to 8%, the corpus may fall short by ~₹20L. This strategy works best for disciplined long-term investors who will not redeem the SIP prematurely.</p>
        </div>
      </section>
      {/* SIP offset table by loan size */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">SIP Needed to Offset Interest — By Loan Size (8.5%, 20 Years)</h2>
        <p className="text-xs text-slate-500 mb-3">
          For each loan size, this table shows the total interest you&apos;ll pay over 20 years and the monthly SIP (at 12% CAGR) whose corpus would match that interest by the end of the tenure. The SIP works out to roughly 20% of your EMI in every case.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Loan Amount</th>
                <th className="px-3 py-2 text-left border border-slate-100">Monthly EMI</th>
                <th className="px-3 py-2 text-left border border-slate-100">Total Interest (20 yrs)</th>
                <th className="px-3 py-2 text-left border border-slate-100">SIP to Offset It</th>
                <th className="px-3 py-2 text-left border border-slate-100">SIP as % of EMI</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹25 lakh', '₹21,696', '₹27,07,000', '₹2,710', '12.5%'],
                ['₹40 lakh', '₹34,713', '₹43,31,000', '₹4,335', '12.5%'],
                ['₹50 lakh', '₹43,391', '₹54,14,000', '₹5,420', '12.5%'],
                ['₹75 lakh', '₹65,087', '₹81,21,000', '₹8,130', '12.5%'],
                ['₹1 crore', '₹86,782', '₹1,08,28,000', '₹10,840', '12.5%'],
              ].map(([loan, emi, interest, sip, pct]) => (
                <tr key={loan} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-bold">{loan}</td>
                  <td className="px-3 py-2 border border-slate-100">{emi}</td>
                  <td className="px-3 py-2 border border-slate-100 text-red-600">{interest}</td>
                  <td className="px-3 py-2 border border-slate-100 font-semibold text-emerald-700">{sip}</td>
                  <td className="px-3 py-2 border border-slate-100 text-slate-500">{pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Loan at 8.5% p.a. for 20 years; SIP corpus computed at 12% CAGR over the same 240 months. At a conservative 10% CAGR, increase the SIP by about 30% (e.g. ₹7,050/month instead of ₹5,420 for the ₹50L loan). Use the calculator above to test your own numbers.</p>
      </section>

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
      <RelatedGuides calculatorId="interest-free-home-loan" />
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
