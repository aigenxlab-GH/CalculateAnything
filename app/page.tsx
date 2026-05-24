import type { Metadata } from 'next';
import { HomepageGrid } from '@/components/HomepageGrid';

export const metadata: Metadata = {
  title: 'Free Online Calculators — CalculateAnything',
  description:
    'Free, accurate online calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up. Instant results.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero — compact */}
      <section className="bg-white border-b border-slate-100 py-3 px-4 text-center">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 mb-0.5 tracking-tight">
          Indian Financial Calculators
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto leading-snug">
          Accurate, instant calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <HomepageGrid />
      </div>
    </>
  );
}
