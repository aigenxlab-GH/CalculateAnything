import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { NSCCalc } from '@/components/calculators/NSCCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'NSC Calculator � National Savings Certificate Maturity | CalculateToday',
  description: 'Calculate NSC maturity value at 7.7% PA. See year-wise interest accrual for 5-year National Savings Certificate from Post Office.',
  keywords: ['NSC calculator', 'national savings certificate calculator', 'NSC interest rate', 'post office NSC'],
};

const faqs = [
  { q: 'What is NSC and who should invest?', a: 'NSC (National Savings Certificate) is a fixed-income investment by the Indian Post Office. It\'s ideal for risk-averse investors seeking guaranteed returns with Section 80C tax benefits.' },
  { q: 'What is the current NSC interest rate?', a: 'NSC currently offers 7.7% per annum (Q1 FY 2024-25), compounded annually but paid at maturity.' },
  { q: 'Is NSC interest taxable?', a: 'NSC interest accrues annually and is deemed to be reinvested (so you can claim 80C deduction on accrued interest each year). The final maturity year\'s interest is taxable as income.' },
  { q: 'How is NSC different from PPF?', a: 'NSC has a 5-year lock-in vs PPF\'s 15 years. NSC interest rate (7.7%) is slightly higher than PPF (7.1%). PPF has EEE tax status, while NSC interest is partially taxable. NSC has no upper limit on investment.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'fd-calculator', 'epf-calculator'].includes(c.id));

export default function NSCPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">NSC Calculator</span>
      </nav>
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
