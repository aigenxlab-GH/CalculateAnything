import type { Metadata } from 'next';
import { Umbrella } from 'lucide-react';
import { NPSCalc } from '@/components/calculators/NPSCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'NPS Calculator: Monthly Pension from Your Contributions?',
  description: 'Free NPS calculator — ₹5,000/month for 30 years at 10% = ₹1.13Cr corpus, ~₹45K pension/month from annuity. Estimate your retirement income instantly.',
  keywords: ['NPS calculator', 'national pension system calculator', 'NPS retirement calculator', 'NPS monthly pension'],
  alternates: { canonical: '/calculators/nps-calculator/' },
};

const faqs = [
  { q: 'What is NPS and how does it work?', a: 'NPS (National Pension System) is a government-backed retirement savings scheme. You contribute monthly and at retirement get 60% as lumpsum (tax-free) and must use 40% to buy an annuity for monthly pension.' },
  { q: 'What are the tax benefits of NPS?', a: 'Under Section 80CCD(1): up to ₹1.5L within 80C limit. Under 80CCD(1B): additional ₹50K deduction. Employer contribution under 80CCD(2): up to 10% of basic (no upper limit). Lumpsum at maturity: 60% tax-free.' },
  { q: 'What is the expected return on NPS?', a: 'NPS offers multiple asset classes: Equity (Tier I) has given 10–13% historical returns. Corporate bonds: 8–10%. Government Securities: 7–9%. Lifecycle funds automatically shift allocation with age.' },
  { q: 'What is the difference between NPS Tier 1 and Tier 2?', a: 'Tier 1 is mandatory for government employees and offers tax benefits under 80CCD(1) and 80CCD(1B). It has a lock-in till age 60 with specific partial withdrawal rules. Tier 2 is voluntary with no lock-in and no tax benefits except for government employees. Use Tier 1 first to exhaust tax benefits; Tier 2 is a flexible investment account without the annuity requirement.' },
  { q: 'What percentage of NPS corpus can be withdrawn at retirement?', a: 'At age 60: maximum 60% can be withdrawn as a lump sum (tax-free). Minimum 40% must be used to buy an annuity providing monthly pension, which is taxable as income. If the total corpus is below Rs 5 lakh, 100% can be withdrawn as lump sum. You can defer withdrawal up to age 75.' },
  { q: 'NPS vs EPF - which is better for retirement savings?', a: 'EPF gives guaranteed 8.15% on all contributions and is fully liquid at retirement. NPS equity can return 12%+ but 40% is locked into annuity. NPS has a unique advantage: the extra Rs 50,000 Section 80CCD(1B) deduction available to all taxpayers. For tax efficiency, use both: EPF for the guaranteed base plus NPS to claim the additional 80CCD(1B) deduction.' },
  { q: 'What is the expected annuity income from NPS at retirement?', a: 'Current annuity rates in India range from 5.5-7% per year depending on the insurer and type chosen. On a Rs 1 crore NPS corpus at retirement, if Rs 40L buys annuity at 6.5%, you get Rs 2,167/month. The remaining Rs 60L lump sum can be invested for additional income. The NPS calculator shows projected corpus - compute annuity income separately using the annuity rate.' },
  { q: 'How is the annuity rate for NPS calculated and which insurer gives the best rate?', a: 'At NPS maturity, you purchase an annuity from an IRDAI-approved insurer (LIC, SBI Life, HDFC Life, etc.) using the mandatory 40% of your corpus. Annuity rate = annual pension / purchase price × 100. Typical rates: Life annuity with return of purchase price: 5.5-6%. Life annuity without return of purchase price (higher monthly payout): 6.5-7.5%. LIC and SBI Life typically offer the highest rates. Always compare rates from all empanelled insurers at retirement — a 1% difference in annuity rate on Rs 40L corpus means Rs 33,333/year more pension for life.' },
];

const related = calculators.filter(c => ['epf-calculator', 'ppf-calculator', 'retirement-fire'].includes(c.id));

export default function NPSPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="NPS Calculator" slug="nps-calculator" />
      <CalculatorByline slug="nps-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <Umbrella className="w-4 h-4 text-sky-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NPS Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Estimate your National Pension Scheme corpus and monthly pension at retirement. See how the 60/40 lumpsum-annuity split works for your contributions.</p>
      </div>
      <NPSCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* NPS contribution examples */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">NPS Corpus & Pension Estimates at Retirement (Age 60)</h2>
        <p className="text-xs text-slate-500 mb-3">Assumes 10% annual return on corpus, 6% annuity rate on the mandatory 40% annuity purchase. Monthly pension is approximate.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Monthly Contribution</th>
                <th className="px-3 py-2 text-left border border-slate-100">Years to Retirement</th>
                <th className="px-3 py-2 text-left border border-slate-100">Total Corpus</th>
                <th className="px-3 py-2 text-left border border-slate-100">Lumpsum (60%)</th>
                <th className="px-3 py-2 text-left border border-slate-100">~Monthly Pension</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹3,000', '30 yrs', '₹67.9L', '₹40.7L', '₹13,580'],
                ['₹5,000', '30 yrs', '₹1.13Cr', '₹67.9L', '₹22,630'],
                ['₹10,000', '25 yrs', '₹1.33Cr', '₹79.8L', '₹26,620'],
                ['₹10,000', '30 yrs', '₹2.27Cr', '₹1.36Cr', '₹45,260'],
                ['₹20,000', '20 yrs', '₹1.52Cr', '₹91.2L', '₹30,390'],
              ].map(([contrib, ...cols]) => (
                <tr key={contrib + cols[0]} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{contrib}</td>
                  {cols.map((v, i) => <td key={i} className={`px-3 py-2 border border-slate-100 ${i === 3 ? 'font-bold text-emerald-700' : ''}`}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NPS tax benefits guide */}
      <section className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-blue-900 mb-2">NPS Tax Benefits — What Most People Miss</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">80CCD(1):</span><span>Your own NPS contribution up to ₹1.5L is deductible — shares the 80C bucket with PPF, ELSS etc. Old regime only.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">80CCD(1B):</span><span>Extra ₹50,000 deduction on your own NPS contribution, <strong>over and above</strong> the ₹1.5L 80C limit. Saves ₹15,600/year at 30% slab. This is the key NPS tax advantage — available old regime only.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">80CCD(2):</span><span>Employer NPS contribution up to 10% of Basic (14% for govt employees) is deductible — and this one <strong>works in both old and new regime</strong>. If your employer offers NPS, always take it.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">At maturity:</span><span>60% lumpsum withdrawal is tax-free. The 40% annuity income is taxable as regular salary income in the year received.</span></li>
        </ul>
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
        name: 'NPS Calculator',
        url: 'https://calculate-today.com/calculators/nps-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'NPS calculator — estimate retirement corpus and monthly pension from National Pension Scheme contributions.',
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
      <RelatedGuides calculatorId="nps-calculator" />
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
