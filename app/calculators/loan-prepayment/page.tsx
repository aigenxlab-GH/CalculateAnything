import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CreditCard } from 'lucide-react';
import { LoanPrepayment } from '@/components/calculators/LoanPrepayment';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'Loan Prepayment Calculator — Save Interest | CalculateToday',
  description: 'Calculate how much interest and time you save by making a lumpsum prepayment on your home loan or any loan. See the impact of part-payment instantly.',
  keywords: ['loan prepayment calculator', 'home loan prepayment savings', 'part payment calculator', 'loan foreclosure calculator'],
};

const faqs = [
  { q: 'Should I prepay my home loan or invest?', a: 'If loan interest rate > expected investment return after tax ? prepay. If your home loan rate is 8.5% and equity SIP returns 12%+ ? invest. For debt-averse individuals or loans above 9%, prepayment is often the safer choice.' },
  { q: 'When is the best time to prepay a home loan?', a: 'Early in the tenure — when the interest component in EMI is highest. Prepaying in year 1–5 of a 20-year loan saves dramatically more than prepaying in year 15. The benefit reduces significantly in the second half of tenure.' },
  { q: 'What is the prepayment penalty on home loans?', a: 'RBI mandates that floating rate home loans cannot have prepayment penalties. Fixed rate loans may have 2–3% penalty from some banks. Always check your loan agreement before prepaying.' },
  { q: 'How much should I prepay at once?', a: 'Any amount helps, but larger lump sums (like annual bonus or matured investment) create the most impact. Even ₹1–2 lakh extra on a ₹50L loan can save ₹3–5 lakh in interest and cut tenure by 2–3 years.' },
];

const related = calculators.filter(c => ['home-loan', 'interest-free-home-loan', 'emi-calculator'].includes(c.id));

export default function LoanPrepaymentPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Loan Prepayment Calculator</span>
      </nav>
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Loan Prepayment Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate how much interest you save and how many months you cut off your loan tenure by making a lumpsum prepayment.</p>
      </div>
      <LoanPrepayment />
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
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map(c => <CalculatorCard key={c.id} calculator={c} />)}
        </div>
      </section>
    </div>
  );
}
