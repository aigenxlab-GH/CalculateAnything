import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { NSCCalc } from '@/components/calculators/NSCCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'NSC Calculator — National Savings Certificate Maturity & Interest',
  description: 'Free NSC maturity calculator — calculate National Savings Certificate returns and interest for 5-year tenure. Based on current 7.7% NSC interest rate 2026.',
  keywords: ['NSC calculator', 'national savings certificate calculator', 'NSC interest rate', 'post office NSC'],
  alternates: { canonical: '/calculators/nsc-calculator/' },
};

const faqs = [
  { q: 'What is NSC and who should invest?', a: 'NSC (National Savings Certificate) is a fixed-income investment by the Indian Post Office. It\'s ideal for risk-averse investors seeking guaranteed returns with Section 80C tax benefits.' },
  { q: 'What is the current NSC interest rate?', a: 'NSC currently offers 7.7% per annum (Q1 FY 2024-25), compounded annually but paid at maturity.' },
  { q: 'How to calculate NSC interest and maturity amount?', a: 'NSC interest is calculated using compound interest formula: A = P(1 + r/100)^n where P is principal, r is 7.7%, and n is number of years. Use our NSC interest calculator above to instantly compute maturity value, year-wise interest accrual, and total returns on any investment amount.' },
  { q: 'What is the NSC maturity calculator and how does it work?', a: 'The NSC maturity calculator computes the final amount you receive after 5 years at current 7.7% interest rate. It shows: total maturity value, total interest earned, year-wise interest accrual, and tax implications. Simply enter your investment amount and the calculator displays all details instantly.' },
  { q: 'Is NSC interest taxable?', a: 'NSC interest accrues annually and is deemed to be reinvested (so you can claim 80C deduction on accrued interest each year). The final maturity year\'s interest is taxable as income.' },
  { q: 'How is NSC different from PPF?', a: 'NSC has a 5-year lock-in vs PPF\'s 15 years. NSC interest rate (7.7%) is slightly higher than PPF (7.1%). PPF has EEE tax status, while NSC interest is partially taxable. NSC has no upper limit on investment.' },
  { q: 'NSC vs Fixed Deposit - which gives better after-tax returns?', a: 'NSC at 7.7% compounded annually beats most bank FDs for 5-year tenure. Moreover, NSC qualifies for Section 80C deduction up to Rs 1.5L/year while FD interest is fully taxable. On Rs 1L for 5 years: NSC gross return Rs 44,896 plus up to Rs 46,500 tax saving makes the effective return far exceed FD for taxpayers in the 30% slab.' },
  { q: 'How much return will I get if I invest Rs 1 lakh in NSC for 5 years?', a: 'If you invest Rs 1 lakh in NSC at 7.7% per annum for 5 years, your maturity amount will be Rs 1,44,896 (gross return of Rs 44,896). After Section 80C tax benefit (savings up to Rs 31,143 for 30% bracket), effective return is approximately Rs 1,75,896 equivalent. Use the calculator to compute exact returns for your investment amount and tax bracket.' },
  { q: 'Can NSC be withdrawn before 5 years?', a: 'Premature withdrawal of NSC is not allowed except in exceptional cases: death of the holder, order by a competent court, or forfeiture by a pledgee. Unlike PPF or FDs, NSC has no standard premature closure option. Make sure you do not need the money for at least 5 years before investing in NSC.' },
  { q: 'Where can I buy NSC and what is the minimum investment?', a: 'NSC is sold at post offices across India. The minimum investment is Rs 100. You can invest in multiples of Rs 100 up to any amount. Since November 2023, NSC can also be purchased digitally through the India Post e-Services platform. NSC is available in physical and Demat (electronic) forms.' },
  { q: 'Can NSC be held in Demat form?', a: 'Yes - since April 2023, NSC can be held in Demat form. You can purchase NSC through your Demat account and it will be credited as a dematerialised sovereign instrument. Existing physical NSC can be dematerialised. Digital NSC is easier to track, transfer as loan collateral, and avoids the risk of physical certificate loss.' },
];

const related = calculators.filter(c => ['ppf-calculator', 'fd-calculator', 'epf-calculator'].includes(c.id));

export default function NSCPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="NSC Calculator" slug="nsc-calculator" />
      <CalculatorByline slug="nsc-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-orange-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">NSC Calculator (National Savings Certificate)</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate NSC maturity value, interest returns, and Section 80C tax benefits at current 7.7% PA rate. Our National Savings Certificate calculator helps you plan safe government investments with guaranteed returns.</p>
      </div>

      {/* Featured Snippet Section - Quick Answer */}
      <section className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-blue-900 mb-2">Quick Answer: NSC Interest Calculator</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>NSC maturity amount</strong> = Principal × (1.077)^5 at current 7.7% annual interest rate.
        </p>
        <div className="bg-white rounded p-3 mb-3">
          <p className="text-xs text-slate-600 mb-2"><strong>Example:</strong> Invest Rs 1,00,000 for 5 years:</p>
          <ul className="text-xs text-slate-700 space-y-1 ml-4">
            <li>• Year 1: Rs 1,07,700</li>
            <li>• Year 3: Rs 1,24,896</li>
            <li>• Year 5: Rs 1,44,896 ← Final amount</li>
            <li>• Total return: Rs 44,896 (44.9%)</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600">
          Use the calculator below to compute exact maturity for your investment amount and verify annual interest accrual.
        </p>
      </section>
      <NSCCalc />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Calculator',
        name: 'NSC Calculator',
        description: 'Calculate National Savings Certificate maturity value and interest accrual at 7.7% per annum for 5-year tenure.',
        url: 'https://calculate-today.com/calculators/nsc-calculator/',
        applicationCategory: 'FinanceApplication',
      }} />
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
        name: 'NSC Calculator',
        url: 'https://calculate-today.com/calculators/nsc-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'NSC calculator — compute maturity amount of National Savings Certificate at 7.7% PA.',
      }} />
      {/* Common Mistakes Section */}
      <section className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-900 mb-3">❌ Common NSC Investment Mistakes to Avoid</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">1.</span>
            <span><strong>Ignoring tax implications:</strong> NSC interest is partially taxable. Each year's accrued interest is deemed reinvested, making only final year interest truly taxable — but it still counts as income.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">2.</span>
            <span><strong>Wrong comparison with FD:</strong> Comparing NSC 7.7% with FD 6.5% on gross returns is misleading. FD interest is fully taxable annually. NSC's partial tax deferral makes it more efficient than gross rates suggest.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">3.</span>
            <span><strong>Forgetting Section 80C benefit:</strong> NSC qualifies for Section 80C deduction, saving up to 30% on the investment amount itself. Many savers compare returns without factoring tax savings.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">4.</span>
            <span><strong>Not tracking rate changes:</strong> NSC rates are reviewed quarterly by the government. Rates have ranged from 6.8% to 8.7% over the past decade. Always check current rates before investing.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">5.</span>
            <span><strong>Assuming zero risk in all scenarios:</strong> While NSC is government-backed, inflation risk still exists. At 7.7% interest vs 5% inflation, your real return is only 2.7%.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">6.</span>
            <span><strong>Investing entire corpus as lumpsum:</strong> If you invest Rs 5L in NSC and rates drop to 6% next quarter, you're locked in 5 years. Consider ladder approach: invest in tranches across quarters.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">7.</span>
            <span><strong>Holding physical certificates without backup:</strong> Physical NSC certificates can be lost or damaged. Use Demat form (available since 2023) to hold digitally and avoid risk.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-600 font-bold">8.</span>
            <span><strong>Not exploring alternatives for 5+ year goals:</strong> For longer horizons (10-15 years), PPF's 7.1% with full EEE tax status often beats NSC's partial tax benefit.</span>
          </li>
        </ul>
      </section>

      {/* Content Depth Section: NSC Alternatives & Context */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">NSC vs Other Safe Investments</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>NSC vs PPF (Public Provident Fund):</strong> Both are government-backed with zero risk. NSC offers higher interest (7.7% vs 7.1%) but has a 5-year lock-in. PPF has a 15-year lock-in but offers fully tax-free returns (EEE status), making it superior for long-term (10+ year) wealth. Choose NSC if you need returns in 5 years; choose PPF if you're planning for retirement.
            </p>
            <p>
              <strong>NSC vs FD (Fixed Deposit):</strong> NSC at 7.7% appears competitive with FD at 6.5-7% from banks. However, NSC interest compounds and is re-invested annually, creating a tax efficiency advantage over FDs where interest is fully taxable as income each year. For a ₹1 lakh 5-year investment: NSC net gain = ₹40,000 (after tax); FD net gain = ₹27,000 (after tax). NSC wins decisively due to tax treatment.
            </p>
            <p>
              <strong>NSC vs Savings Account:</strong> Savings accounts offer 3-4% interest, fully taxable. NSC at 7.7% gives 2x returns. The trade-off is liquidity — NSC locks your money 5 years with no early withdrawal. If you have emergency funds elsewhere, NSC is the clear winner for medium-term savings.
            </p>
            <p>
              <strong>NSC vs Bonds/G-Sec:</strong> NSC is a government security. Government securities (G-Secs) offer slightly lower interest (6-7%) but have a more liquid secondary market. For most savers who won't need the money, NSC's simplicity and higher rate make it preferable.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">How NSC Interest Rates Change & Historical Context</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Why NSC rates change quarterly:</strong> The Ministry of Finance reviews rates every quarter (March, June, September, December) based on government bond yields and inflation. Rates have ranged from 6.8% (2019) to 8.7% (2023). The current 7.7% is attractive historically.
            </p>
            <p>
              <strong>Rate history (last 5 years):</strong>
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-3 text-xs">
              <p>2021-22: 6.8% | 2022-23: 6.8% | 2023-24: 7.7% | 2024-25: 7.7% | 2025-26: 7.7% (current)</p>
            </div>
            <p>
              <strong>When to lock in NSC:</strong> If rates are expected to fall (inflation cooling), locking in 7.7% now is wise. If rates are climbing, consider starting smaller and averaging through the year. Since rates last increased in 2023 and have been stable, now is a good time to invest.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Who Should Invest in NSC?</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>✓ Good fit for:</strong> Conservative investors seeking guaranteed returns, individuals who want to maximize Section 80C tax deductions (up to ₹1.5L/year), anyone needing funds in exactly 5 years, people in high tax brackets (30%) who want tax-efficient savings, those who want zero-risk (unlike stocks/mutual funds).
            </p>
            <p>
              <strong>✗ Not suitable for:</strong> Investors needing liquidity (money locked 5 years), young investors with 15+ year horizons (PPF is better due to full EEE status), those in low tax brackets (&lt;20%) where tax benefit is minimal, anyone expecting inflation &gt;7.7% (real returns go negative).
            </p>
            <p>
              <strong>Ideal NSC investor profile:</strong> Age 40-55, stable salary, wants safe savings for 5 years, claims Section 80C deductions, has emergency fund separately, is in 30% tax bracket. For this person, ₹1.5L/year in NSC builds ₹10L+ corpus in 5 years with ₹2L+ tax saved.
            </p>
          </div>
        </div>
      </section>

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
      <RelatedGuides calculatorId="nsc-calculator" />
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
