import type { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { EPFCalc } from '@/components/calculators/EPFCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'EPF Calculator India 2026 — Find Your PF Corpus at Retirement',
  description: 'Free EPF calculator — ₹30K basic salary for 30 years at 8.15% = ₹72.7L PF corpus. Year-by-year balance, employer vs employee split. Enter salary → see your retirement fund.',
  keywords: ['EPF calculator', 'employee provident fund calculator', 'PF calculator India', 'EPF corpus calculator'],
  alternates: { canonical: '/calculators/epf-calculator/' },
};

const faqs = [
  { q: 'What is EPF and who must contribute?', a: 'EPF (Employee Provident Fund) is mandatory for employees earning up to ₹15,000/month at establishments with 20+ workers. Both employer and employee contribute 12% of basic salary.' },
  { q: 'What is the current EPF interest rate?', a: 'EPF interest rate for FY 2023-24 is 8.15% per annum. The EPFO Board recommends the rate each year, subject to government approval.' },
  { q: 'What happens to EPF at retirement?', a: 'The entire EPF balance (employee + employer contributions + interest) can be withdrawn tax-free if you have 5+ years of continuous service.' },
  { q: 'How is EPF different from EPS?', a: 'Employee contributes 12% to EPF. Employer contributes 12% — but only 3.67% goes to EPF; the remaining 8.33% goes to EPS (Employee Pension Scheme), which provides pension but has lower corpus.' },
  { q: 'What is the current EPF interest rate and how often does it change?', a: 'EPF interest rate for FY 2023-24 is 8.15% p.a. The rate is set annually by the EPFO Central Board of Trustees. Historical rates: 8.50% (FY22), 8.10% (FY21), 8.50% (FY20). Rates have ranged from 8.1-8.65% over the past decade. The EPF calculator uses the current rate as default but allows adjustment for projections.' },
  { q: 'EPF vs PPF - which is better for retirement savings?', a: 'EPF is mandatory for covered employees and gives 8.15% - higher than PPF 7.1%. Both have EEE tax status at maturity. Key difference: EPF has your employer contributing an additional 12% of basic. PPF has no employer contribution. For salaried employees, maximize EPF via VPF first, then add PPF for additional tax-free savings.' },
  { q: 'When can I withdraw EPF and are there tax implications?', a: 'Full EPF withdrawal is allowed only on retirement at age 58 or after 2 months of unemployment. Partial withdrawals are allowed for medical emergencies, home purchase, education, or marriage with specific conditions. Tax rule: EPF withdrawal is tax-free only if you have completed 5 continuous years of service. Withdrawal before 5 years is taxable as salary income.' },
  { q: 'What is VPF and should I invest in it?', a: 'VPF (Voluntary Provident Fund) lets you contribute beyond the mandatory 12% of basic to your EPF account - up to 100% of basic + DA. VPF earns the same 8.15% EPF rate, gets EEE tax treatment under the Rs 2.5L/year limit for tax-free interest, and requires no additional paperwork. If you want safe, tax-free debt returns above 8%, VPF is the best instrument for salaried employees.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'nps-calculator', 'gratuity-calculator', 'epf-vs-nps-ppf'].includes(c.id));

export default function EPFPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="EPF Calculator" slug="epf-calculator" />
      <CalculatorByline slug="epf-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-teal-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">EPF Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Employee Provident Fund corpus at retirement. See how employee (12%) and employer (3.67%) contributions compound at 8.15% interest.</p>
      </div>
      <EPFCalc />

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
        name: 'EPF Calculator India',
        url: 'https://calculate-today.com/calculators/epf-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'EPF calculator India — compute Employee Provident Fund corpus at 8.15% interest rate.',
      }} />
      {/* EPF corpus by salary table */}
      <section className="mt-6 mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">EPF Corpus at Retirement — By Basic Salary (8.25%, 5% Annual Increment)</h2>
        <p className="text-xs text-slate-500 mb-3">
          Estimated EPF corpus for different basic salaries over a 30-year career. Contributions: employee 12% + employer 3.67% of basic (the employer&apos;s remaining 8.33% goes to EPS pension). Salary assumed to grow 5% annually.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">Basic Salary (Monthly)</th>
                <th className="px-3 py-2 text-left border border-slate-100">After 10 Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">After 20 Years</th>
                <th className="px-3 py-2 text-left border border-slate-100">After 30 Years</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['₹15,000', '₹4.9L', '₹17.6L', '₹46.8L'],
                ['₹25,000', '₹8.1L', '₹29.4L', '₹78.0L'],
                ['₹40,000', '₹13.0L', '₹47.0L', '₹1.25Cr'],
                ['₹60,000', '₹19.5L', '₹70.5L', '₹1.87Cr'],
                ['₹1,00,000', '₹32.5L', '₹1.17Cr', '₹3.12Cr'],
              ].map(([salary, y10, y20, y30]) => (
                <tr key={salary} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-bold">{salary}</td>
                  <td className="px-3 py-2 border border-slate-100">{y10}</td>
                  <td className="px-3 py-2 border border-slate-100 font-medium">{y20}</td>
                  <td className="px-3 py-2 border border-slate-100 font-bold text-teal-700">{y30}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Approximate figures: 15.67% of basic contributed monthly, 8.25% interest compounded annually, 5% yearly salary growth. Adding VPF (voluntary contributions beyond 12%) at the same rate can multiply the corpus significantly — use the calculator above for your exact numbers.</p>
      </section>

      {/* Content Depth: EPF Strategy & VPF Optimization */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">EPF vs PPF vs NPS: Which Gives Best Retirement Corpus?</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>EPF (Employee Mandatory):</strong> Baseline retirement savings with employer match. Rs 50L salary (basic), 12% employee + 3.67% employer = 15.67% total annual contribution = Rs 7.83L/year invested. At 8.15% returns over 30 years = Rs 10.09 crore corpus, fully tax-free. Best part: employer contributes 3.67% for free (no such match in PPF or NPS).
            </p>
            <p>
              <strong>VPF (Voluntary, Same EPF Account):</strong> Boost EPF with additional voluntary contributions up to 100% of basic + DA. Example: Add Rs 3L/year VPF (beyond mandatory Rs 3L EPF). Total Rs 6L/year at 8.15% = Rs 7.73 crore over 30 years. Only constraint: interest above Rs 2.5L/year taxable. For high earners, VPF is the best tax-efficient debt instrument.
            </p>
            <p>
              <strong>PPF (Voluntary, 15-Year Lock-in):</strong> Max Rs 1.5L/year, 7.1% returns = Rs 40.7 lakh after 15 years. Then extend another 15 years = Rs 1.55 crore (lower than EPF/VPF due to lower rate). Tax-free. Best for: non-salaried, self-employed, or salaried wanting parallel retirement savings.
            </p>
            <p>
              <strong>NPS (Market-Linked, Self-Directed):</strong> Contribute up to Rs 2L/year (employee) + Rs 2L (employer optional) = Rs 4L/year. Historical 12% CAGR = Rs 11.77 crore over 30 years BUT: 20% on gains above Rs 5L indexed to inflation is taxable. Also: mandatory annuitization of 40% at retirement (lower flexibility). Best for: those comfortable with equity, wanting growth over safety.
            </p>
            <p>
              <strong>Winning Strategy for Rs 50L Basic Salary:</strong> Maximize EPF Rs 6L (12% of basic) + VPF Rs 3L = Rs 9L/year → Rs 11.60 crore, and the employer 3.67% adds a further Rs 2.37 crore. Add NPS Rs 2L/year for equity growth (Rs 5.88 crore). Add PPF Rs 1.5L/year if surplus (Rs 1.55 crore). Total retirement corpus ≈ Rs 21.4 crore by age 60.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">EPF Withdrawal Strategy: When, How, Tax Implications</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Full Withdrawal at Retirement (Age 58+, Tax-Free):</strong> Entire EPF corpus (employee + employer + interest) withdrawable. Rs 10.09 crore EPF → fully tax-free (no income tax, no TDS, no GST). Zero documentation. Receives within 10 days to bank account. This is the ideal scenario: work 30 years, receive corpus tax-free at retirement.
            </p>
            <p>
              <strong>Partial Withdrawal Before 58 (Taxable if Service {`<`} 5 Years):</strong> Allowed for marriage, medical emergency, higher education, home purchase. Example: withdraw Rs 20L at age 35 (only 10 years service = less than 5 continuous) = Rs 20L taxed as salary income at 30% slab = Rs 6L tax. Instead, if 5+ continuous years, same withdrawal = completely tax-free. Takeaway: avoid partial withdrawal before 5 years of service.
            </p>
            <p>
              <strong>Exit on Job Change (Within 30 Days, Reinvest to New Employer):</strong> If you change jobs, EPF balance can be transferred to new employer's account automatically (UAN linked). No tax, no withdrawal. Keep all money invested continuously. Avoid: breaking the chain by withdrawing to personal account and reinvesting = attracts TDS/tax. New employer EPF account = seamless transfer.
            </p>
            <p>
              <strong>Withdrawal on Unemployment (2+ Months):</strong> If jobless beyond 2 months, can withdraw entire EPF. Tax treatment depends on service length (same as retirement rule: tax-free if 5+ years service). But: breaking continuous service may attract tax. Better: try to get re-employed quickly within 2 months to avoid withdrawal.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Actual EPF Corpus Examples by Salary & Service Length</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Example 1: Rs 30L Basic Salary (Junior Manager, Age 25-55, 30 Years):</strong> Mandatory EPF = Rs 3.6L/year (12% of basic) + VPF Rs 2L = Rs 5.6L/year × 30 years at 8.15% = Rs 7.22 crore. Employer contribution = Rs 1.1L/year bonus = Rs 1.42 crore extra (total Rs 8.64 crore). Plus: Rs 1.5L/year PPF = Rs 1.55 crore. Total retirement corpus = Rs 10.18 crore.
            </p>
            <p>
              <strong>Example 2: Rs 50L Basic Salary (Senior Manager, Age 30-60, 30 Years):</strong> Mandatory EPF = Rs 6L/year (12% of basic) + VPF Rs 3L = Rs 9L/year × 30 years at 8.15% = Rs 11.60 crore. Employer = Rs 1.84L/year × 30 = Rs 2.37 crore. NPS Rs 2L/year at 12% CAGR = Rs 5.88 crore. Total = Rs 19.85 crore (enough for Rs 3-4L/month spending in retirement).
            </p>
            <p>
              <strong>Example 3: Rs 15L Basic Salary (Mid-Career, Age 28-58, 30 Years, No VPF):</strong> Only mandatory EPF = Rs 1.8L/year (12% of basic) × 30 = Rs 2.32 crore. Employer Rs 0.55L/year = Rs 70.97 lakh. Plus PPF Rs 1.5L/year = Rs 1.55 crore. Plus NPS Rs 1L/year = Rs 2.94 crore. Total = Rs 7.52 crore (moderate, allows Rs 80K/month spending). VPF addition of Rs 1L/year would boost by Rs 1.29 crore.
            </p>
          </div>
        </div>
      </section>
      <InContentAd format="horizontal" className="mb-6" variant="faq" />


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
      <RelatedGuides calculatorId="epf-calculator" />
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
