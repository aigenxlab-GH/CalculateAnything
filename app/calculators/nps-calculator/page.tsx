import type { Metadata } from 'next';
import { Umbrella } from 'lucide-react';
import { NPSCalc } from '@/components/calculators/NPSCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'NPS Calculator — National Pension Scheme Corpus',
  description: 'Estimate NPS corpus and monthly pension at retirement. Calculate 60% lumpsum and 40% annuity split from NPS contributions.',
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
            <Umbrella className="w-4 h-4 text-sky-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NPS Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Estimate your National Pension Scheme corpus and monthly pension at retirement. See how the 60/40 lumpsum-annuity split works for your contributions.</p>
      </div>
      <NPSCalc />
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
