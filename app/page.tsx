import type { Metadata } from 'next';
import { HomepageGrid } from '@/components/HomepageGrid';
import { FeaturedGuides } from '@/components/FeaturedGuides';

export const metadata: Metadata = {
  title: 'Free Online Calculators — CalculateToday',
  description:
    'Free, accurate online calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up. Instant results.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
          Indian Financial Calculators
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-snug">
          Accurate, instant calculators for income tax, SIP, EMI, GST, BMI and 30+ more. No sign-up.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <HomepageGrid />
        <FeaturedGuides />
      </div>
    </>
  );
}
