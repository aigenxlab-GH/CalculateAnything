import type { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { DSCRCalc } from '@/components/calculators/DSCRCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'DSCR Calculator — Debt Service Coverage Ratio',
  description: 'Calculate Debt Service Coverage Ratio (DSCR) to assess your ability to repay loans from operating income. Used by banks for business loan approvals.',
  keywords: ['DSCR calculator', 'debt service coverage ratio', 'DSCR formula', 'business loan eligibility DSCR'],
  alternates: { canonical: '/calculators/dscr-calculator/' },
};

const faqs = [
  { q: 'What is DSCR and why does it matter?', a: 'DSCR (Debt Service Coverage Ratio) = Net Operating Income ÷ Total Debt Service (principal + interest). It shows how many times your income can cover your debt payments. Banks require DSCR of 1.25–1.5x before approving business loans.' },
  { q: 'What is a good DSCR for a business loan?', a: 'DSCR > 1.5 is excellent — banks will offer the best rates. DSCR 1.25–1.5 is acceptable for most lenders. DSCR 1.0–1.25 is risky — many banks will decline. DSCR < 1.0 means income insufficient to cover debt — loan rejection is almost certain.' },
  { q: 'How is DSCR different from interest coverage ratio?', a: 'Interest Coverage Ratio (ICR) only considers interest payments: ICR = EBIT ÷ Interest. DSCR is stricter — it includes both principal and interest repayment. Banks use DSCR for term loans and ICR for working capital assessment.' },
  { q: 'How can I improve my DSCR?', a: '(1) Increase operating income (revenue growth, cost reduction), (2) Reduce debt obligations (prepay existing loans), (3) Restructure loans to longer tenures (reduces annual principal), (4) Refinance at lower interest rates, (5) Add profitable revenue streams to boost NOI.' },
  { q: 'What does a DSCR below 1.0 mean for my business?', a: 'DSCR below 1.0 means your business does not generate enough operating income to cover debt obligations. Example: DSCR = 0.85 means for every Rs 1 of debt service due, you only generate Rs 0.85 of net operating income. This is a red flag for lenders (loan rejection likely) and signals the business may need equity infusion, cost reduction, or debt restructuring.' },
  { q: 'How can I improve my DSCR before applying for a loan?', a: 'Strategies to improve DSCR: (1) Increase NOI by raising prices or cutting operating expenses. (2) Reduce debt service by refinancing at lower rates or extending loan tenure. (3) Prepay or close high-rate loans to reduce annual debt obligations. (4) Show rental income as part of operating income. (5) Improve EBITDA margins - lenders often calculate DSCR on EBITDA for project loans.' },
  { q: 'What is the difference between DSCR and Interest Coverage Ratio (ICR)?', a: 'Interest Coverage Ratio = EBIT divided by Interest Expense - measures ability to pay interest only, ignoring principal. DSCR = Net Operating Income divided by Total Debt Service (principal + interest) - more comprehensive. DSCR is a stricter test. ICR of 3.0 may coexist with DSCR of 1.2 if the loan has large bullet principal repayments.' },
  { q: 'Is DSCR used for individual home loan applications?', a: 'For individual home loans, banks typically use FOIR (Fixed Obligation to Income Ratio) rather than DSCR. DSCR is used primarily for business and project loans, commercial real estate loans, and housing loans for self-employed individuals where income comes from business operations rather than a fixed salary.' },
];

const related = calculators.filter(c => ['break-even', 'working-capital', 'profit-margin'].includes(c.id));

export default function DSCRPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="DSCR Calculator" slug="dscr-calculator" />
      <CalculatorByline slug="dscr-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Scale className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">DSCR Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Debt Service Coverage Ratio — the key metric banks use to approve business loans. See your debt repayment capacity at a glance.</p>
      </div>
      <DSCRCalc />

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
        name: 'DSCR Calculator',
        url: 'https://calculate-today.com/calculators/dscr-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'DSCR calculator — compute debt service coverage ratio to assess loan repayment capacity.',
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
