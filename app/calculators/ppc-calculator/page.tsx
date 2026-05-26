import type { Metadata } from 'next';
import { TrendingUp, Megaphone } from 'lucide-react';
import { PPCCalculator } from '@/components/calculators/PPCCalculator';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'PPC Calculator — Google Ads Budget & ROAS Calculator',
  description:
    'Free PPC Calculator — estimate clicks, impressions, conversions, cost per lead, and ROAS from your Google Ads budget. Plan your ad spend instantly.',
  keywords: ['PPC calculator', 'Google Ads calculator', 'CPC calculator', 'ROAS calculator', 'ad spend calculator'],
  alternates: { canonical: '/calculators/ppc-calculator/' },
};

const faqs = [
  {
    q: 'What is PPC (Pay Per Click)?',
    a: 'PPC is an online advertising model where advertisers pay each time a user clicks on their ad. Google Ads is the most popular PPC platform. Advertisers bid on keywords and pay per click received.',
  },
  {
    q: 'What is ROAS?',
    a: 'ROAS (Return on Ad Spend) measures how much revenue you earn for every dollar spent on advertising. A ROAS of 4x means you earn $4 in revenue for every $1 spent. A ROAS above 1x is profitable.',
  },
  {
    q: 'What is a good CTR for Google Ads?',
    a: 'The average CTR for Google Search Ads is 2–5%. Display ads have much lower CTR (typically 0.1–0.5%). Higher CTR usually indicates better ad relevance and quality score.',
  },
  {
    q: 'What is a good conversion rate for PPC?',
    a: 'Average PPC conversion rates vary by industry — typically 2–5% for e-commerce, and up to 10–15% for high-intent lead generation. Optimizing your landing page is the fastest way to improve conversions.',
  },
];

const related = calculators.filter((c) => ['emi', 'gst'].includes(c.id));

export default function PPCCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="PPC Calculator" slug="ppc-calculator" />

      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">PPC Ad Spend Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Plan your Google Ads or any PPC campaign budget. Instantly estimate clicks, impressions,
          conversions, cost per lead, and ROAS from your ad spend.
        </p>
      </div>
      {/* Calculator */}
      <PPCCalculator />

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
        name: 'PPC Ad Spend Calculator',
        url: 'https://calculate-today.com/calculators/ppc-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'PPC calculator — estimate clicks, conversions, cost per lead and ROAS from your Google Ads budget.',
      }} />
      {/* FAQ */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This PPC Calculator</h2>
        <ol className="space-y-3">
          {[
            'Enter your total ad budget for the campaign period.',
            'Set your average Cost Per Click (CPC) — check Google Keyword Planner for estimates.',
            'Enter your expected Click-Through Rate (CTR). Use 3% as a starting point for search ads.',
            'Set your landing page conversion rate (how many visitors become leads/customers).',
            'Enter the revenue value per conversion (average order value or lead value).',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
      </div>
  );
}
