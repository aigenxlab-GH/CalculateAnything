import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Receipt, FileText } from 'lucide-react';
import { GSTCalculator } from '@/components/calculators/GSTCalculator';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { GstSoftwareTable } from '@/components/calculators/comparison/GstSoftwareTable';

export const metadata: Metadata = {
  title: 'GST Calculator India — Add or Remove GST Instantly',
  description:
    'Free GST Calculator — add or remove GST from any amount. Get CGST and SGST breakdown for 5%, 12%, 18%, and 28% GST slab rates. Instant results.',
  keywords: ['GST calculator', 'GST calculator India', 'reverse GST calculator', 'CGST SGST calculator', 'remove GST'],
};

const faqs = [
  {
    q: 'What is GST?',
    a: 'GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services in India. It replaced multiple cascading taxes and came into effect on July 1, 2017.',
  },
  {
    q: 'What are the GST slab rates in India?',
    a: 'GST in India has four main tax slabs: 5% (essential goods, transport), 12% (basic goods, processed food), 18% (most services, electronics), and 28% (luxury goods, automobiles, tobacco).',
  },
  {
    q: 'What is the difference between CGST and SGST?',
    a: 'For intra-state transactions, GST is split equally between Central GST (CGST) collected by the central government and State GST (SGST) collected by the state. For inter-state transactions, Integrated GST (IGST) applies.',
  },
  {
    q: 'How do I remove GST from a price?',
    a: 'To remove GST from a GST-inclusive price, use the formula: Pre-GST Price = (GST-inclusive Price × 100) ÷ (100 + GST Rate). Our calculator handles this automatically using the "Remove GST" mode.',
  },
];

const related = calculators.filter((c) => ['emi', 'bmi'].includes(c.id));

export default function GSTCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/" className="hover:text-primary transition-colors">Calculators</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">GST Calculator</span>
      </nav>

      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">GST Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Add GST to a price or remove GST from a GST-inclusive amount. Instantly see the CGST and
          SGST breakdown for any GST slab rate — 5%, 12%, 18%, or 28%.
        </p>
      </div>
      {/* Calculator */}
      <GSTCalculator />

      <GstSoftwareTable />
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
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This GST Calculator</h2>
        <ol className="space-y-3">
          {[
            'Select "Add GST" to calculate GST on an exclusive price, or "Remove GST" to extract GST from an inclusive price.',
            'Enter the amount in the input field.',
            'Select the applicable GST rate: 5%, 12%, 18%, or 28%.',
            'Instantly see the GST amount, CGST, SGST, and the final price.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
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
