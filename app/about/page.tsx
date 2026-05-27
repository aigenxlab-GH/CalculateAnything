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
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Why This Exists</h2>
        <p className="text-slate-600 leading-relaxed">
          Indians deserve financial calculators that are accurate, always up to date, and genuinely simple
          to use. Basic number-crunching — figuring out your SIP target, comparing tax regimes, working out
          an EMI — should be a 30-second task, accessible to everyone, completely free.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          CalculateToday covers <strong>39+ calculators</strong> across income tax, investments, retirement,
          loans, business, and health — all updated whenever the government changes the rules.
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
        <h2 className="text-xl font-semibold text-slate-900 mb-3">The Story Behind It</h2>
        <p className="text-slate-600 leading-relaxed">
          I&apos;m <strong>Sandeep Singsarva</strong>, a business software developer and the person
          behind CalculateToday. I built this because I saw a real opportunity — Indian users needed a
          financial calculator platform that was accurate, simple, and genuinely free. As someone who
          builds business software professionally, getting the numbers right is what drives me.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          So I built a proper income tax calculator — one that actually reflects the current slabs and
          gives a clear answer. Then I thought: why stop at one? That project became CalculateToday.
          It&apos;s still just me, keeping every calculator up to date when tax slabs change, when the
          RBI moves rates, or when the government updates PPF and NPS rules. No team, no VC funding.
          Just a developer who saw a better way to do it and built it.
        </p>
        <p className="text-slate-600 leading-relaxed mt-3">
          I&apos;m not a bank, broker, or SEBI-registered advisor — these are informational tools.
          For major financial decisions, always talk to a qualified professional.
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
