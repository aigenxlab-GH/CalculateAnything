import type { Metadata } from 'next';
import { Award } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { GratuityCalc } from '@/components/calculators/GratuityCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Gratuity Calculator — Calculate Gratuity Amount as per Gratuity Act',
  description: 'Free gratuity calculator India — calculate gratuity payable on resignation or retirement under the Payment of Gratuity Act 1972 based on last salary and years of service.',
  keywords: ['gratuity calculator India', 'gratuity formula', 'payment of gratuity act', 'gratuity calculation'],
  alternates: { canonical: '/calculators/gratuity-calculator/' },
};

const faqs = [
  { q: 'What is the formula for gratuity?', a: 'For employees covered under the Act: Gratuity = (Basic + DA) × 15/26 × Years of service. For non-covered: (Basic + DA) × 15/30 × Years. The tax-free limit is ₹20 lakh.' },
  { q: 'When is gratuity paid?', a: 'Gratuity is payable when an employee completes at least 5 continuous years of service, on resignation, retirement, death, or disablement due to accident/disease.' },
  { q: 'What is the tax treatment of gratuity?', a: 'Gratuity up to ₹20 lakh is fully tax-free for private sector employees under Section 10(10). Government employees get full exemption. Amount above ₹20L is added to income and taxed.' },
  { q: 'Why is 26 used in the formula?', a: 'The denominator 26 represents the number of working days in a month (excluding 4 Sundays). The numerator 15 represents 15 days of basic salary per year of service.' },
  { q: 'What is the tax exemption limit on gratuity received from a private employer?', a: 'Gratuity received from a covered employer (companies with 10+ employees) is tax-exempt up to Rs 20 lakh. Government employees are exempt without any limit. Private sector exemption = minimum of actual gratuity, Rs 20L, or 15 days salary x years of service. Any amount above Rs 20L is taxable as salary income in the year of receipt.' },
  { q: 'Is gratuity payable for part years of service beyond 5 years?', a: 'Under the Payment of Gratuity Act: if a fraction of a year is greater than 6 months, it is rounded up to a full year. Example: 8 years 7 months = 9 years gratuity. 8 years 4 months = 8 years gratuity. Companies can offer more liberal gratuity terms than the statutory minimum as part of their employment policy.' },
  { q: 'What is the formula for gratuity calculation in the private sector?', a: 'For covered employers (Payment of Gratuity Act): Gratuity = (Last drawn basic + DA) x 15/26 x Years of service. The 15/26 factor equals 15 days of salary assuming a 26-day work month. Last drawn salary includes basic plus dearness allowance only - not HRA or other allowances. For uncovered employers, some companies use a 30-day month formula.' },
  { q: 'Is 5 years of continuous service mandatory for gratuity?', a: 'Under the Payment of Gratuity Act, gratuity is payable after 5 continuous years of service. The 5-year rule is relaxed in case of death or disability - gratuity is payable even for service less than 5 years. The Supreme Court has ruled that fixed-term contracts renewed continuously for 5+ years also qualify for gratuity.' },
];

const related = calculators.filter(c => ['salary-calculator', 'epf-calculator', 'nps-calculator'].includes(c.id));

export default function GratuityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Gratuity Calculator" slug="gratuity-calculator" />
      <CalculatorByline slug="gratuity-calculator" />
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

      <PensionProviderTable scheme="retirement" />
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
        name: 'Gratuity Calculator India',
        url: 'https://calculate-today.com/calculators/gratuity-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Gratuity calculator India — compute gratuity payable under the Payment of Gratuity Act 1972.',
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
      <RelatedGuides calculatorId="gratuity-calculator" />
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
