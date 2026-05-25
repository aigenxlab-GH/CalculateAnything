import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { PPFCalc } from '@/components/calculators/PPFCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'PPF Calculator — Public Provident Fund Maturity | CalculateToday',
  description: 'Calculate PPF maturity amount at 7.1% PA. See year-wise balance growth, total interest earned and maturity amount for any yearly deposit.',
  keywords: ['PPF calculator', 'public provident fund calculator', 'PPF maturity calculator', 'PPF interest 2024'],
  alternates: { canonical: '/calculators/ppf-calculator/' },
};

const faqs = [
  { q: 'What is the current PPF interest rate?', a: 'The current PPF interest rate is 7.1% per annum (as of Q1 2024-25), compounded annually. The rate is set by the government quarterly.' },
  { q: 'What are the tax benefits of PPF?', a: 'PPF has EEE status: (1) Investment qualifies for 80C deduction (up to ₹1.5L), (2) Interest earned is completely tax-free, (3) Maturity amount is fully tax-free.' },
  { q: 'Can I extend PPF after 15 years?', a: 'Yes. After the 15-year lock-in, you can extend the account in 5-year blocks (with or without further contributions), and the EEE tax benefit continues.' },
  { q: 'What is the maximum PPF investment per year?', a: 'Maximum: ₹1.5 lakh per financial year. Minimum: ₹500. Deposits can be made in lump sum or up to 12 installments per year.' },
];

const related = calculators.filter(c => ['nsc-calculator', 'epf-calculator', 'nps-calculator'].includes(c.id));

export default function PPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="PPF Calculator" slug="ppf-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-green-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">PPF Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate PPF maturity amount at 7.1% interest. View year-wise balance with our detailed chart and plan your tax-free retirement savings.</p>
      </div>
      <PPFCalc />
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
        name: 'PPF Calculator',
        url: 'https://calculate-today.com/calculators/ppf-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'PPF calculator — compute maturity value of Public Provident Fund at 7.1% interest with yearly deposits.',
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
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
