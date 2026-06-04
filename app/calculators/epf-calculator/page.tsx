import type { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { EPFCalc } from '@/components/calculators/EPFCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'EPF Calculator — Employee Provident Fund Corpus & Interest Calculator',
  description: 'Free EPF calculator India — calculate EPF corpus at retirement, yearly interest earned and employer vs employee contribution breakdown. Based on current 8.25% EPF rate 2026.',
  keywords: ['EPF calculator', 'employee provident fund calculator', 'PF calculator India', 'EPF corpus calculator'],
  alternates: { canonical: '/calculators/epf-calculator/' },
};

const faqs = [
  { q: 'What is EPF and who must contribute?', a: 'EPF (Employee Provident Fund) is mandatory for employees earning up to ₹15,000/month at establishments with 20+ workers. Both employer and employee contribute 12% of basic salary.' },
  { q: 'What is the current EPF interest rate?', a: 'EPF interest rate for FY 2023-24 is 8.15% per annum. The EPFO Board recommends the rate each year, subject to government approval.' },
  { q: 'What happens to EPF at retirement?', a: 'The entire EPF balance (employee + employer contributions + interest) can be withdrawn tax-free if you have 5+ years of continuous service.' },
  { q: 'How is EPF different from EPS?', a: 'Employee contributes 12% to EPF. Employer contributes 12% — but only 3.67% goes to EPF; the remaining 8.33% goes to EPS (Employee Pension Scheme), which provides pension but has lower corpus.' },
  { q: 'What is the current EPF interest rate and how often does it change?', a: 'EPF interest rate for FY 2023-24 is 8.15% p.a. The rate is set annually by the EPFO Central Board of Trustees. Historical rates: 8.50% (FY22), 8.10% (FY21), 8.50% (FY20). Rates have ranged from 8.1-8.65% over the past decade. The EPF calculator uses the current rate as default but allows adjustment for projections.' },
  { q: 'EPF vs PPF - which is better for retirement savings?', a: 'EPF is mandatory for covered employees and gives 8.15% - higher than PPF 7.1%. Both have EEE tax status at maturity. Key difference: EPF has your employer contributing an additional 12% of basic. PPF has no employer contribution. For salaried employees, maximize EPF via VPF first, then add PPF for additional tax-free savings.' },
  { q: 'When can I withdraw EPF and are there tax implications?', a: 'Full EPF withdrawal is allowed only on retirement at age 58 or after 2 months of unemployment. Partial withdrawals are allowed for medical emergencies, home purchase, education, or marriage with specific conditions. Tax rule: EPF withdrawal is tax-free only if you have completed 5 continuous years of service. Withdrawal before 5 years is taxable as salary income.' },
  { q: 'What is VPF and should I invest in it?', a: 'VPF (Voluntary Provident Fund) lets you contribute beyond the mandatory 12% of basic to your EPF account - up to 100% of basic + DA. VPF earns the same 8.15% EPF rate, gets EEE tax treatment under the Rs 2.5L/year limit for tax-free interest, and requires no additional paperwork. If you want safe, tax-free debt returns above 8%, VPF is the best instrument for salaried employees.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'nps-calculator', 'gratuity-calculator'].includes(c.id));

export default function EPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="EPF Calculator" slug="epf-calculator" />
      <CalculatorByline slug="epf-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-teal-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">EPF Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Employee Provident Fund corpus at retirement. See how employee (12%) and employer (3.67%) contributions compound at 8.15% interest.</p>
      </div>
      <EPFCalc />
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
        name: 'EPF Calculator India',
        url: 'https://calculate-today.com/calculators/epf-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'EPF calculator India — compute Employee Provident Fund corpus at 8.15% interest rate.',
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
      <RelatedGuides calculatorId="epf-calculator" />
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
