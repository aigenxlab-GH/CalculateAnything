import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { NSCCalc } from '@/components/calculators/NSCCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'NSC Calculator — National Savings Certificate Maturity',
  description: 'Calculate NSC maturity value at 7.7% PA. See year-wise interest accrual for 5-year National Savings Certificate from Post Office.',
  keywords: ['NSC calculator', 'national savings certificate calculator', 'NSC interest rate', 'post office NSC'],
  alternates: { canonical: '/calculators/nsc-calculator/' },
};

const faqs = [
  { q: 'What is NSC and who should invest?', a: 'NSC (National Savings Certificate) is a fixed-income investment by the Indian Post Office. It\'s ideal for risk-averse investors seeking guaranteed returns with Section 80C tax benefits.' },
  { q: 'What is the current NSC interest rate?', a: 'NSC currently offers 7.7% per annum (Q1 FY 2024-25), compounded annually but paid at maturity.' },
  { q: 'Is NSC interest taxable?', a: 'NSC interest accrues annually and is deemed to be reinvested (so you can claim 80C deduction on accrued interest each year). The final maturity year\'s interest is taxable as income.' },
  { q: 'How is NSC different from PPF?', a: 'NSC has a 5-year lock-in vs PPF\'s 15 years. NSC interest rate (7.7%) is slightly higher than PPF (7.1%). PPF has EEE tax status, while NSC interest is partially taxable. NSC has no upper limit on investment.' },
  { q: 'NSC vs Fixed Deposit - which gives better after-tax returns?', a: 'NSC at 7.7% compounded annually beats most bank FDs for 5-year tenure. Moreover, NSC qualifies for Section 80C deduction up to Rs 1.5L/year while FD interest is fully taxable. On Rs 1L for 5 years: NSC gross return Rs 44,896 plus up to Rs 46,500 tax saving makes the effective return far exceed FD for taxpayers in the 30% slab.' },
  { q: 'Is NSC interest taxable?', a: 'Yes, but with a useful feature: NSC interest compounds and is re-invested in the certificate. Each year, the accrued interest is deemed reinvested and qualifies as a fresh Section 80C investment. So effectively only the final year interest is truly taxable. This makes NSC tax-efficient for investors in lower tax brackets.' },
  { q: 'Can NSC be withdrawn before 5 years?', a: 'Premature withdrawal of NSC is not allowed except in exceptional cases: death of the holder, order by a competent court, or forfeiture by a pledgee. Unlike PPF or FDs, NSC has no standard premature closure option. Make sure you do not need the money for at least 5 years before investing in NSC.' },
  { q: 'Can NSC be held in Demat form?', a: 'Yes - since April 2023, NSC can be held in Demat form. You can purchase NSC through your Demat account and it will be credited as a dematerialised sovereign instrument. Existing physical NSC can be dematerialised. Digital NSC is easier to track, transfer as loan collateral, and avoids the risk of physical certificate loss.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'fd-calculator', 'epf-calculator'].includes(c.id));

export default function NSCPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="NSC Calculator" slug="nsc-calculator" />
      <CalculatorByline slug="nsc-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-orange-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NSC Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate National Savings Certificate maturity value at 7.7% PA. View year-wise interest accrual and plan your Section 80C investments.</p>
      </div>
      <NSCCalc />
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
        name: 'NSC Calculator',
        url: 'https://calculate-today.com/calculators/nsc-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'NSC calculator — compute maturity amount of National Savings Certificate at 7.7% PA.',
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
