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
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'Gratuity Calculator: What Do You Get After 10 Years of Service?',
  description: 'Free gratuity calculator India — last salary ₹50,000 × 10 years service = ₹2.88L gratuity under Act 1972. Resignation or retirement. Instant calculation.',
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
            <Award className="w-4 h-4 text-amber-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Gratuity Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your gratuity amount as per the Payment of Gratuity Act 1972. Works for both covered (10+ employee) and non-covered organisations.</p>
      </div>
      <GratuityCalc />

      <InContentAd format="rectangle" className="my-6" />

      {/* Worked examples */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Gratuity Worked Examples (Payment of Gratuity Act)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-2">Software Engineer, 7 years</p>
            <p>Last Basic + DA: ₹60,000/month</p>
            <p className="mt-2">Formula: 60,000 × 15/26 × 7</p>
            <p className="font-bold text-emerald-700 mt-1 text-sm">Gratuity = ₹2,42,307</p>
            <p className="text-slate-500 mt-1">Tax: fully exempt (below ₹20L limit)</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-2">Bank Manager, 25 years</p>
            <p>Last Basic + DA: ₹1,20,000/month</p>
            <p className="mt-2">Formula: 1,20,000 × 15/26 × 25</p>
            <p className="font-bold text-emerald-700 mt-1 text-sm">Gratuity = ₹17,30,769</p>
            <p className="text-slate-500 mt-1">Tax: fully exempt (below ₹20L limit)</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-2">Senior Executive, 30 years</p>
            <p>Last Basic + DA: ₹2,00,000/month</p>
            <p className="mt-2">Formula: 2,00,000 × 15/26 × 30</p>
            <p className="font-bold text-amber-700 mt-1 text-sm">Calculated: ₹34,61,538</p>
            <p className="text-slate-500 mt-1">Tax: ₹20L exempt, ₹14.6L taxable at slab</p>
          </div>
        </div>
      </section>

      {/* Key rules */}
      <section className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-amber-900 mb-3">Key Gratuity Rules Most Employees Don't Know</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span> <span><strong>The 4 year 240 days rule:</strong> If you work 4 years and 240+ days (8 months) in the 5th year, courts have held that rounds up to 5 years — qualifying you for gratuity. Don't resign just before month 8 of year 5.</span></li>
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span> <span><strong>Death or disability:</strong> 5-year minimum is waived. Gratuity is payable from day one to the nominee in case of death, regardless of years served.</span></li>
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span> <span><strong>HRA and allowances excluded:</strong> Only Basic + DA goes into the formula. Your total CTC or take-home pay is irrelevant. A ₹1L CTC employee with ₹40K basic earns gratuity on ₹40K.</span></li>
          <li className="flex gap-2"><span className="text-amber-600 font-bold flex-shrink-0">→</span> <span><strong>Employer can pay more, never less:</strong> Companies can pay higher than the statutory formula (some MNCs pay 30 days instead of 15 days per year). They cannot pay less than the Act requires.</span></li>
        </ul>
      </section>

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
