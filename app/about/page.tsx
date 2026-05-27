import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Target, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about CalculateToday — free, accurate Indian financial calculators for income tax, SIP, EMI, GST, and more. No sign-up, no fees.',
  alternates: { canonical: '/about/' },
};

const values = [
  {
    icon: Zap,
    title: 'Instant & Free',
    description:
      'Every calculator on CalculateToday is completely free to use. No sign-up, no subscription, no hidden fees — ever.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Target,
    title: 'Built for India',
    description:
      'Our calculators are designed specifically for Indian financial products — income tax slabs, SIP returns, EMI structures, GST rates, and more.',
    color: 'text-primary',
    bg: 'bg-primary/5',
  },
  {
    icon: Shield,
    title: 'Private by Design',
    description:
      'All calculations happen entirely in your browser. We never store, transmit, or see any of the numbers you enter.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">About CalculateToday</h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
          Free, fast, and accurate financial calculators built for everyday Indians — from salaried
          professionals to small business owners.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Our Mission</h2>
        <p className="text-slate-600 leading-relaxed">
          Financial decisions — choosing between tax regimes, planning an SIP, calculating home loan EMIs,
          or understanding GST — should not require expensive software or a financial advisor for basic
          number-crunching. CalculateToday exists to put accurate, easy-to-use calculators in the hands
          of every Indian, completely free of charge.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          We cover <strong>38+ calculators</strong> across income tax, investments, retirement, loans,
          business, and health — all updated for the latest Indian tax laws and financial products.
        </p>
      </section>

      {/* Values */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">What We Stand For</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="p-5 rounded-xl border border-slate-100 bg-white">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${v.bg} mb-3`}>
                <v.icon className={`w-5 h-5 ${v.color}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Who We Are</h2>
        <p className="text-slate-600 leading-relaxed">
          CalculateToday was founded and built by <strong>Sandeep Singsarva</strong> — a developer
          passionate about making practical financial tools accessible to every Indian. We are not a bank,
          financial institution, or SEBI-registered advisor. Our calculators are informational tools —
          always consult a qualified professional before making major financial decisions.
        </p>
      </section>

      {/* Editorial Policy */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Editorial Policy</h2>
        <p className="text-slate-600 leading-relaxed">
          All calculators on CalculateToday are reviewed by our editorial team for accuracy before
          publication. We update figures — tax slabs, interest rates, and scheme rates — as soon as
          official changes are announced by the Government of India,{' '}
          <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RBI</a>, or{' '}
          <a href="https://sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SEBI</a>.
          Sources include the{' '}
          <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Income Tax Act</a>,
          RBI circulars, and government scheme notifications.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          Our content is intended for informational purposes only. We are not a bank, broker, or
          registered financial advisor. Always verify figures with official sources and consult a
          qualified professional before making major financial decisions.
        </p>
      </section>

      {/* Affiliate disclosure */}
      <section className="mb-10 p-5 rounded-xl border border-amber-100 bg-amber-50">
        <h2 className="text-base font-semibold text-amber-900 mb-2">A Note on Affiliate Links</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          Some pages on CalculateToday include links to financial products (brokers, banks, insurance
          providers). These may be affiliate links — if you click and sign up, we may earn a small
          commission at no extra cost to you. This helps us keep the calculators free. Our recommendations
          are based on product merit, not commission rates.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-slate-500 mb-4">Have a question or feedback?</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Contact Us
        </Link>
      </section>

    </div>
  );
}
