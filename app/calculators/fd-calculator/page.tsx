import type { Metadata } from 'next';
import { Landmark } from 'lucide-react';
import { FDCalc } from '@/components/calculators/FDCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'FD Calculator: ₹1L in Bank FD at 7% — Exact Maturity Value?',
  description: 'Free FD calculator India — ₹1L at 7% for 5 years (quarterly compounding) = ₹1.41L. Compare SBI, HDFC, ICICI FD rates 2026. Find best FD option instantly.',
  keywords: ['FD calculator', 'fixed deposit calculator', 'FD maturity calculator', 'bank FD interest calculator'],
  alternates: { canonical: '/calculators/fd-calculator/' },
};

const faqs = [
  { q: 'What is the best FD rate in India right now?', a: 'Small Finance Banks (Unity SFB, Suryoday SFB) offer 8.5–9%+ for certain tenures. Major banks (SBI, HDFC, ICICI) offer 6.5–7.5%. Senior citizens get additional 0.25–0.5%.' },
  { q: 'How is FD interest calculated?', a: 'For quarterly compounding: A = P × (1 + r/4)^(4t), where r = annual rate, t = years. Effective yield is higher than the nominal rate due to compounding.' },
  { q: 'Is FD interest taxable?', a: 'Yes. FD interest is fully taxable as per your income tax slab. TDS at 10% is deducted if annual interest > ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if income is below taxable limit.' },
  { q: 'Can I break FD prematurely?', a: 'Yes, but most banks charge a 0.5–1% penalty on the applicable rate for premature withdrawal. Some Tax-Saving FDs (5-year lock-in under 80C) cannot be broken early.' },
  { q: 'Which bank offers the best FD interest rate in India right now?', a: 'Small finance banks like Jana SFB, Utkarsh SFB, and Unity SFB offer 8-9% on 1-2 year FDs, significantly higher than large banks (SBI: 6.5-7%, HDFC: 7-7.25%). SFBs are DICGC-insured up to Rs 5 lakh like regular banks. Senior citizens get an additional 0.25-0.5% in most banks. Always compare rates on BankBazaar before booking.' },
  { q: 'FD vs debt mutual funds - which is better after tax?', a: 'For holding periods under 3 years: FDs are simpler and guaranteed. Post-2023 budget changes, debt funds are now taxed at slab rate regardless of holding period, eliminating the earlier indexation advantage. For most retail investors, FDs are now simpler and equally tax-efficient for the debt portion of their portfolio.' },
  { q: 'How is TDS deducted on FD interest?', a: 'Banks deduct TDS at 10% when FD interest exceeds Rs 40,000/year (Rs 50,000 for senior citizens). To avoid TDS, submit Form 15G (if total income is below the taxable limit) or Form 15H (senior citizens) at the start of each financial year. TDS on FD is not a final tax - you may get a refund when filing ITR if your actual tax rate is lower than 10%.' },
  { q: 'What happens if I break an FD before maturity?', a: 'Premature FD closure incurs a penalty of typically 0.5-1% off the interest rate. For example, a 2-year FD booked at 7% broken after 1 year earns approximately 6-6.5% instead of 7%. To avoid this, consider an FD ladder - spread investments across 3, 6, 12, and 24-month FDs for staggered liquidity without penalty.' },
];

const related = calculators.filter(c => ['rd-calculator', 'ppf-calculator', 'compounding-calculator'].includes(c.id));

export default function FDPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="FD Calculator" slug="fd-calculator" />
      <CalculatorByline slug="fd-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-blue-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">FD Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Fixed Deposit maturity amount and effective interest rate. Compare different compounding frequencies to find the best option.</p>
      </div>
      <FDCalc />

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
        name: 'FD Calculator',
        url: 'https://calculate-today.com/calculators/fd-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'FD calculator — compute Fixed Deposit maturity value with quarterly, monthly or annual compounding.',
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
      <RelatedGuides calculatorId="fd-calculator" />
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
