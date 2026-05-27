import type { Metadata } from 'next';
import { CreditCard } from 'lucide-react';
import { LoanPrepayment } from '@/components/calculators/LoanPrepayment';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Loan Prepayment Calculator — Save Interest',
  description: 'Calculate how much interest and time you save by making a lumpsum prepayment on your home loan or any loan. See the impact of part-payment instantly.',
  keywords: ['loan prepayment calculator', 'home loan prepayment savings', 'part payment calculator', 'loan foreclosure calculator'],
  alternates: { canonical: '/calculators/loan-prepayment/' },
};

const faqs = [
  { q: 'Should I prepay my home loan or invest?', a: 'If loan interest rate > expected investment return after tax ? prepay. If your home loan rate is 8.5% and equity SIP returns 12%+ ? invest. For debt-averse individuals or loans above 9%, prepayment is often the safer choice.' },
  { q: 'When is the best time to prepay a home loan?', a: 'Early in the tenure — when the interest component in EMI is highest. Prepaying in year 1–5 of a 20-year loan saves dramatically more than prepaying in year 15. The benefit reduces significantly in the second half of tenure.' },
  { q: 'What is the prepayment penalty on home loans?', a: 'RBI mandates that floating rate home loans cannot have prepayment penalties. Fixed rate loans may have 2–3% penalty from some banks. Always check your loan agreement before prepaying.' },
  { q: 'How much should I prepay at once?', a: 'Any amount helps, but larger lump sums (like annual bonus or matured investment) create the most impact. Even ₹1–2 lakh extra on a ₹50L loan can save ₹3–5 lakh in interest and cut tenure by 2–3 years.' },
  { q: 'Is it better to reduce EMI or tenure when making a loan prepayment?', a: 'Reducing tenure saves significantly more total interest. Example on Rs 50L loan at 8.5%, 20 years, after 5 years: Rs 5L prepayment to reduce tenure saves Rs 6.2L interest. Same prepayment to reduce EMI saves only Rs 2.1L. Always opt for tenure reduction unless you genuinely need the cash flow relief from a lower EMI.' },
  { q: 'Are there prepayment charges on home loans in India?', a: 'For floating rate home loans: RBI regulations prohibit prepayment charges for individual borrowers. You can prepay any amount at any time for free. For fixed rate loans, banks can charge up to 2-3% of the prepaid amount. Always confirm with your bank before deciding between fixed and floating rate - the free prepayment option on floating rate is a significant advantage.' },
  { q: 'When should I invest the surplus instead of prepaying my loan?', a: 'If your loan interest rate is 8.5%, an investment earning above 8.5% after tax favours investing over prepaying. NPS equity historically at 12% beats the 8.5% home loan rate. Rule of thumb: if you can earn more than the loan rate after tax with reasonable certainty, invest. For risk-averse borrowers, the guaranteed interest savings from prepayment is always superior.' },
  { q: 'How often should I make loan prepayments?', a: 'Most advisors suggest an annual prepayment strategy: once a year, prepay 5-10% of the outstanding principal using year-end bonuses. This systematically reduces the loan tenure. Avoid irregular very small prepayments below 1% of outstanding - the bank processing sometimes equals the interest saved. Set an annual prepayment date and stick to it.' },
];

const related = calculators.filter(c => ['home-loan', 'interest-free-home-loan', 'emi-calculator'].includes(c.id));

export default function LoanPrepaymentPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Loan Prepayment Calculator" slug="loan-prepayment" />
      <CalculatorByline slug="loan-prepayment" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Loan Prepayment Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate how much interest you save and how many months you cut off your loan tenure by making a lumpsum prepayment.</p>
      </div>
      <LoanPrepayment />
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
        name: 'Loan Prepayment Calculator',
        url: 'https://calculate-today.com/calculators/loan-prepayment/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Loan prepayment calculator — see interest saved and tenure reduced by making a part-payment.',
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
      <RelatedGuides calculatorId="loan-prepayment" />
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
