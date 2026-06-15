import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { PPFCalc } from '@/components/calculators/PPFCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'PPF Calculator: ₹1.5L/Year at 7.1% — Tax-Free Maturity Value?',
  description: 'Free PPF calculator — max ₹1.5L/year for 15 years at 7.1% = ₹40.68L tax-free maturity. Year-by-year interest breakdown, extension scenarios. 100% government-backed. Calculate yours.',
  keywords: ['PPF calculator', 'public provident fund calculator', 'PPF maturity calculator', 'PPF interest 2025-26'],
  alternates: { canonical: '/calculators/ppf-calculator/' },
};

const faqs = [
  { q: 'What is the current PPF interest rate?', a: 'The current PPF interest rate is 7.1% per annum (as of Q1 2024-25), compounded annually. The rate is set by the government quarterly.' },
  { q: 'What are the tax benefits of PPF?', a: 'PPF has EEE status: (1) Investment qualifies for 80C deduction (up to ₹1.5L), (2) Interest earned is completely tax-free, (3) Maturity amount is fully tax-free.' },
  { q: 'Can I extend PPF after 15 years?', a: 'Yes. After the 15-year lock-in, you can extend the account in 5-year blocks (with or without further contributions), and the EEE tax benefit continues.' },
  { q: 'What is the maximum PPF investment per year?', a: 'Maximum: ₹1.5 lakh per financial year. Minimum: ₹500. Deposits can be made in lump sum or up to 12 installments per year.' },
  { q: 'PPF vs ELSS - which is better for Section 80C investment?', a: 'ELSS has a 3-year lock-in vs PPF 15 years and offers higher potential returns of 12-15% CAGR vs PPF 7.1%. However, PPF is guaranteed and completely tax-free at maturity while ELSS gains above Rs 1.25L/year are taxed at 12.5% LTCG. For investors with 15+ year horizons and risk appetite, ELSS historically creates 2-3x more wealth than PPF.' },
  { q: 'Can I extend PPF after 15 years and should I?', a: 'Yes - in blocks of 5 years, indefinitely. Two options: extend with contributions (continue depositing up to Rs 1.5L/year and earn 7.1%) or extend without contributions (account grows at 7.1% on existing balance with no new deposits, full withdrawal allowed anytime). Extending with contributions makes sense if you have no better tax-free investment avenue.' },
  { q: 'When can I partially withdraw from PPF?', a: 'Partial withdrawal is allowed from year 7 onwards. Maximum withdrawal: 50% of the balance at the end of 4 years prior to the year of withdrawal or 50% of the preceding year balance, whichever is lower. Only one partial withdrawal permitted per financial year. All PPF withdrawals are completely tax-free.' },
  { q: 'Which bank is best to open a PPF account?', a: 'All banks offer the same 7.1% government-mandated rate - the choice is about convenience. SBI PPF is openable via YONO app in 5 minutes. ICICI Bank and HDFC Bank offer PPF via net banking. India Post is the original PPF provider with the widest branch network. Choose the bank where you already have your salary account for easy online transfers.' },
];

const related = calculators.filter(c => ['nsc-calculator', 'epf-calculator', 'nps-calculator'].includes(c.id));

export default function PPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="PPF Calculator" slug="ppf-calculator" />
      <CalculatorByline slug="ppf-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-green-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">PPF Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate PPF maturity amount at 7.1% interest. View year-wise balance with our detailed chart and plan your tax-free retirement savings.</p>
      </div>
      <PPFCalc />

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
        name: 'PPF Calculator',
        url: 'https://calculate-today.com/calculators/ppf-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'PPF calculator — compute maturity value of Public Provident Fund at 7.1% interest with yearly deposits.',
      }} />
      {/* Content Depth: PPF Strategy & Comparisons */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">PPF vs NSC vs ELSS vs FD: Complete Comparison for ₹1.5L Annual Investment</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>PPF (₹1.5L/year, 15-year lock-in):</strong> At 7.1% interest, ₹1.5L annual investment for 15 years = Rs 35.8 lakh maturity, fully tax-free. Plus 80C deduction saves Rs 4.5L in taxes (at 30% bracket). Total wealth = Rs 40.3L with zero effort. Best for: conservative investors, retirees, those wanting guaranteed returns.
            </p>
            <p>
              <strong>ELSS (₹1.5L/year, 3-year lock-in):</strong> At 12% CAGR average (market-linked), ₹1.5L reinvested yearly for 15 years = Rs 50-55L maturity. But LTCG tax on gains above Rs 1.25L = Rs 3-4L tax due. Net = Rs 46-52L. Plus you get 80C deduction (Rs 4.5L tax saved). Total wealth = Rs 50-56L. Best for: equity investors willing to take volatility risk.
            </p>
            <p>
              <strong>NSC (₹1.5L/year, 5-year maturity):</strong> At 7.7% semi-annual compounding, ₹1.5L in year 1 grows to Rs 2.17L by year 5, then reinvest. Over 15 years (3 cycles), total corpus Rs 40-42L (similar to PPF after tax). Gets 80C benefit. Problem: multiple renewals to track. Better than PPF only by 0.6% rate advantage.
            </p>
            <p>
              <strong>Verdict:</strong> For risk-averse investors: PPF wins on simplicity and guarantee. For equity-comfortable investors: ELSS creates 20-40% more wealth but requires market discipline. Combined strategy: invest Rs 1.5L in both PPF (guaranteed base) and ELSS (growth) in a 50-50 split for best of both worlds.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">PPF Withdrawal Strategy: Lock-In vs Flexibility Trade-off</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Full Lock-In (15 Years):</strong> You cannot withdraw until year 15. Money sits untouched, grows at 7.1%, completely tax-free. Rs 1.5L/year for 15 years = Rs 35.8L at maturity. Best if: you have stable emergency fund elsewhere, won{`'`}t face financial crises, want maximum compounding.
            </p>
            <p>
              <strong>Partial Withdrawal Strategy (From Year 7):</strong> Starting year 7, withdraw 50% of balance every year. Rs 1.5L/year deposits + 7.1% growth + annual 50% withdrawals = creates a {`'`}flowing{`'`} effect. Useful if: you need ongoing income post-retirement, want tax-free withdrawals, but still want growth on remaining balance.
            </p>
            <p>
              <strong>Post-Maturity Extension:</strong> After 15 years, extend in 5-year blocks. Two options: (1) Extend with contributions (keep depositing Rs 1.5L/year, earn 7.1% on total) or (2) Extend without contributions (balance grows at 7.1%, withdraw anytime). Most people extend without contributions as they{`'`}re retired and don{`'`}t have Rs 1.5L excess income.
            </p>
            <p>
              <strong>Loan Against PPF:</strong> From year 7 onwards, borrow against PPF balance at 1% interest (vs 8-12% for personal loans). Max loan = 50% of preceding year balance. Useful for education/medical emergencies without breaking the investment. But: loan must be repaid within 3 years.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Ideal Investor Profiles for PPF (Who Benefits Most?)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Profile 1: Government/Salaried Employee (30-45 years old):</strong> Stable income, 80C deduction need, risk-averse mindset. Should invest Rs 1.5L/year in PPF. Zero market risk, 7.1% guaranteed, fully tax-free. By age 60 (30-year horizon), corpus grows beyond Rs 80L. Perfect fit.
            </p>
            <p>
              <strong>Profile 2: Self-Employed/Business Owner (35-55 years old):</strong> Income varies, need tax planning flexibility, may need emergency access. Should invest Rs 1-1.25L/year in PPF (vs full Rs 1.5L). Keeps partial liquid money for business. Loan against PPF (at 1% vs 8-12% for business loans) offers emergency backup.
            </p>
            <p>
              <strong>Profile 3: Young Earner (23-35 years old) with Equity Comfort:</strong> Long 30+ year horizon, can afford market volatility, want maximum growth. Should do 50% in PPF (for safety) + 50% in ELSS mutual funds (for growth). PPF = Rs 75K, ELSS = Rs 75K. Expected wealth at 55 = Rs 100L+ vs Rs 60L in pure PPF.
            </p>
            <p>
              <strong>Profile 4: Pre-Retiree (55-60 years old):</strong> Want guaranteed income stream, low risk tolerance, nearing maturity need. Max out PPF to Rs 1.5L/year for last 5 working years. At 60, open extension without contributions, start partial withdrawals at 2-3L/year (fully tax-free) to supplement pension. Creates Rs 40L+ tax-free income pool.
            </p>
          </div>
        </div>
      </section>
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
      <RelatedGuides calculatorId="ppf-calculator" />
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
