import type { Metadata } from 'next';
import { Landmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';
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

      {/* Best FD Rates Guide CTA */}
      <Link href="/guides/best-fd-rates-india-2026/" className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 my-6 hover:bg-blue-100 transition-colors group">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-900">Best FD Rates in India — June 2026</p>
          <p className="text-xs text-blue-700">Compare 15+ banks: Unity SFB 9.5%, Suryoday 9.1%, SBI 7.0%, HDFC 7.4% and more →</p>
        </div>
      </Link>

      <InContentAd format="rectangle" className="my-6" />

      {/* FD maturity reference table */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">FD Maturity Table — What ₹1L Becomes (Quarterly Compounding)</h2>
        <p className="text-xs text-slate-500 mb-3">General public rates. Senior citizens earn 0.25–0.5% extra at most banks. Verify rates before booking.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[460px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Principal</th>
                <th className="px-3 py-2 text-left border border-slate-100">1 Yr @7%</th>
                <th className="px-3 py-2 text-left border border-slate-100">2 Yr @7.25%</th>
                <th className="px-3 py-2 text-left border border-slate-100">3 Yr @7%</th>
                <th className="px-3 py-2 text-left border border-slate-100">5 Yr @7%</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹1 lakh', '₹1.07L', '₹1.15L', '₹1.23L', '₹1.41L'],
                ['₹5 lakh', '₹5.36L', '₹5.76L', '₹6.14L', '₹7.03L'],
                ['₹10 lakh', '₹10.72L', '₹11.52L', '₹12.28L', '₹14.07L'],
                ['₹25 lakh', '₹26.79L', '₹28.80L', '₹30.70L', '₹35.17L'],
              ].map(([p, ...vals]) => (
                <tr key={p} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-semibold">{p}</td>
                  {vals.map((v, i) => <td key={i} className="px-3 py-2 border border-slate-100 text-emerald-700 font-medium">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FD tips */}
      <section className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-slate-800 mb-2">FD Tips That Most Investors Don't Use</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">→</span><span><strong>FD ladder:</strong> Split ₹5L into 5 FDs of ₹1L each maturing in 3, 6, 12, 24, 36 months. You always have an FD maturing soon — no premature withdrawal penalties.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">→</span><span><strong>Small Finance Banks:</strong> DICGC-insured up to ₹5L — same as SBI. Unity SFB (9.5%), Suryoday SFB (9.1%), Ujjivan SFB (8.25%) are all legitimate options for the insured portion.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">→</span><span><strong>Form 15G/15H:</strong> If your total income is below the taxable limit, submit Form 15G (below 60) or 15H (senior citizens) to your bank to stop TDS deduction. Saves hassle of ITR refunds.</span></li>
          <li className="flex gap-2"><span className="text-blue-600 font-bold flex-shrink-0">→</span><span><strong>Tax-saving FD (80C):</strong> 5-year lock-in, qualifies for 80C deduction up to ₹1.5L. Unlike ELSS, it has guaranteed returns — useful for debt-averse investors who've exhausted other 80C options.</span></li>
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
