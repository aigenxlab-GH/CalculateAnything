import type { Metadata } from 'next';
import { Home } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { HRACalc } from '@/components/calculators/HRACalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'HRA Exemption: Are You Claiming Your Full Tax Relief?',
  description: 'Free HRA exemption calculator (Sec 10(13A)) — paying ₹20K rent in Delhi? Claim up to ₹1.2L HRA exemption annually. Metro vs non-metro formula. Instant result.',
  keywords: ['HRA exemption calculator', 'HRA tax exemption', 'Section 10(13A)', 'house rent allowance India'],
  alternates: { canonical: '/calculators/hra-exemption/' },
};

const faqs = [
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the minimum of: (1) Actual HRA received from employer, (2) Rent paid minus 10% of Basic Salary, (3) 50% of Basic Salary (metro) or 40% (non-metro).' },
  { q: 'Is HRA available in the new tax regime?', a: 'No. HRA exemption is only available under the old tax regime. If you opt for the new regime, HRA is fully taxable.' },
  { q: 'Which cities are considered metro for HRA?', a: 'Mumbai, Delhi, Kolkata, and Chennai are considered metros (50% of basic). All other cities including Bangalore, Hyderabad, Pune, Ahmedabad are non-metro (40% of basic).' },
  { q: 'What documents are needed to claim HRA?', a: 'You need rent receipts from your landlord. If annual rent exceeds ₹1 lakh, you also need the landlord\'s PAN number. Rent agreement is advisable.' },
  { q: 'Can I claim HRA exemption without providing rent receipts?', a: 'For annual rent below Rs 1 lakh: employers accept a self-declaration without rent receipts. For rent above Rs 1 lakh/year (Rs 8,334+/month): rent receipts AND landlord PAN are mandatory for HRA exemption. Without PAN, the employer cannot allow the exemption. You can still claim HRA directly in your ITR but be prepared for potential scrutiny from tax authorities.' },
  { q: 'Can I claim HRA exemption if I also own a house?', a: 'Yes - if you own a house in City A but live on rent in City B for work. You can claim HRA exemption for City B rent AND home loan deductions for City A under Section 24. However, if you own a home and live in the SAME city while paying rent elsewhere, HRA exemption is typically disallowed by tax authorities.' },
  { q: 'Can I pay rent to my parents and claim HRA exemption?', a: 'Yes - a legitimate and widely-used tax planning strategy. Requirements: (1) Rental agreement between you and parents. (2) Monthly bank transfer for rent (not cash). (3) Rent receipts from parents. (4) Parents must declare rental income in their ITR. Since parents are likely in a lower tax bracket, the family overall tax outgo reduces significantly.' },
  { q: 'What is Section 80GG and when does it apply?', a: 'Section 80GG applies to individuals who do NOT receive HRA as part of their salary, such as self-employed persons or employees whose salary structure excludes HRA. Deduction: minimum of Rs 5,000/month (Rs 60,000/year), 25% of total income, or actual rent minus 10% of total income. Maximum saving Rs 60,000/year - far lower than HRA exemption for most renters.' },
];

const related = calculators.filter(c => ['salary-calculator', 'old-income-tax', 'old-vs-new-regime'].includes(c.id));

export default function HRAPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="HRA Exemption" slug="hra-exemption" />
      <CalculatorByline slug="hra-exemption" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-orange-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">HRA Exemption Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your HRA tax exemption under Section 10(13A). See all three conditions and find the minimum exempt amount based on your HRA, basic salary, and rent paid.</p>
      </div>
      <HRACalc />

      <InContentAd format="rectangle" className="my-6" />

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
        name: 'HRA Exemption Calculator',
        url: 'https://calculate-today.com/calculators/hra-exemption/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'HRA exemption calculator — compute tax-exempt HRA under section 10(13A) for metro and non-metro cities.',
      }} />
      <InContentAd format="horizontal" className="mb-6" />

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
      <RelatedGuides calculatorId="hra-exemption" />
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
