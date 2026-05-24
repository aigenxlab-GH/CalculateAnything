import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award } from 'lucide-react';
import { GratuityCalc } from '@/components/calculators/GratuityCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';

export const metadata: Metadata = {
  title: 'Gratuity Calculator � Payment of Gratuity Act 1972 | CalculateToday',
  description: 'Calculate gratuity payable on retirement or resignation. Based on Payment of Gratuity Act 1972. Supports both covered and non-covered employees.',
  keywords: ['gratuity calculator India', 'gratuity formula', 'payment of gratuity act', 'gratuity calculation'],
};

const faqs = [
  { q: 'What is the formula for gratuity?', a: 'For employees covered under the Act: Gratuity = (Basic + DA) � 15/26 � Years of service. For non-covered: (Basic + DA) � 15/30 � Years. The tax-free limit is ?20 lakh.' },
  { q: 'When is gratuity paid?', a: 'Gratuity is payable when an employee completes at least 5 continuous years of service, on resignation, retirement, death, or disablement due to accident/disease.' },
  { q: 'What is the tax treatment of gratuity?', a: 'Gratuity up to ?20 lakh is fully tax-free for private sector employees under Section 10(10). Government employees get full exemption. Amount above ?20L is added to income and taxed.' },
  { q: 'Why is 26 used in the formula?', a: 'The denominator 26 represents the number of working days in a month (excluding 4 Sundays). The numerator 15 represents 15 days of basic salary per year of service.' },
];

const related = calculators.filter(c => ['salary-calculator', 'epf-calculator', 'nps-calculator'].includes(c.id));

export default function GratuityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Gratuity Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Gratuity Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your gratuity amount as per the Payment of Gratuity Act 1972. Works for both covered (10+ employee) and non-covered organisations.</p>
      </div>
      <GratuityCalc />

      <TaxFilingTable />
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
