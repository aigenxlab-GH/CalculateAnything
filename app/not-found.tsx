import Link from 'next/link';
import { Calculator, Home, Search } from 'lucide-react';

const suggestions = [
  { label: 'SIP Calculator',        href: '/calculators/sip-calculator' },
  { label: 'EMI Calculator',        href: '/calculators/emi-calculator' },
  { label: 'Income Tax Calculator', href: '/calculators/old-vs-new-regime' },
  { label: 'GST Calculator',        href: '/calculators/gst-calculator' },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Calculator className="w-10 h-10 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-3">Page not found</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Oops — this page doesn&apos;t exist or has been moved. Try one of our popular
          calculators below, or go back home.
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium text-slate-700 hover:text-primary"
            >
              <Search className="w-3.5 h-3.5 flex-shrink-0" />
              {s.label}
            </Link>
          ))}
        </div>

        {/* Home CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
