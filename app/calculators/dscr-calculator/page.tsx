import type { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { DSCRCalc } from '@/components/calculators/DSCRCalc';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'DSCR Calculator: Will Your Business Qualify for That Loan?',
  description: 'Free DSCR calculator — banks need DSCR ≥ 1.25 to approve loans. ₹12L NOI ÷ ₹8L debt service = 1.5 DSCR (approved). Calculate yours before applying.',
  keywords: ['DSCR calculator', 'debt service coverage ratio', 'DSCR formula', 'business loan eligibility DSCR'],
  alternates: { canonical: '/calculators/dscr-calculator/' },
};

const faqs = [
  { q: 'What is DSCR and why does it matter?', a: 'DSCR (Debt Service Coverage Ratio) = Net Operating Income ÷ Total Debt Service (principal + interest). It shows how many times your income can cover your debt payments. Banks require DSCR of 1.25–1.5x before approving business loans.' },
  { q: 'What is a good DSCR for a business loan?', a: 'DSCR > 1.5 is excellent — banks will offer the best rates. DSCR 1.25–1.5 is acceptable for most lenders. DSCR 1.0–1.25 is risky — many banks will decline. DSCR < 1.0 means income insufficient to cover debt — loan rejection is almost certain.' },
  { q: 'How is DSCR different from interest coverage ratio?', a: 'Interest Coverage Ratio (ICR) only considers interest payments: ICR = EBIT ÷ Interest. DSCR is stricter — it includes both principal and interest repayment. Banks use DSCR for term loans and ICR for working capital assessment.' },
  { q: 'How can I improve my DSCR?', a: '(1) Increase operating income (revenue growth, cost reduction), (2) Reduce debt obligations (prepay existing loans), (3) Restructure loans to longer tenures (reduces annual principal), (4) Refinance at lower interest rates, (5) Add profitable revenue streams to boost NOI.' },
  { q: 'What does a DSCR below 1.0 mean for my business?', a: 'DSCR below 1.0 means your business does not generate enough operating income to cover debt obligations. Example: DSCR = 0.85 means for every Rs 1 of debt service due, you only generate Rs 0.85 of net operating income. This is a red flag for lenders (loan rejection likely) and signals the business may need equity infusion, cost reduction, or debt restructuring.' },
  { q: 'How can I improve my DSCR before applying for a loan?', a: 'Strategies to improve DSCR: (1) Increase NOI by raising prices or cutting operating expenses. (2) Reduce debt service by refinancing at lower rates or extending loan tenure. (3) Prepay or close high-rate loans to reduce annual debt obligations. (4) Show rental income as part of operating income. (5) Improve EBITDA margins - lenders often calculate DSCR on EBITDA for project loans.' },
  { q: 'What is the difference between DSCR and Interest Coverage Ratio (ICR)?', a: 'Interest Coverage Ratio = EBIT divided by Interest Expense - measures ability to pay interest only, ignoring principal. DSCR = Net Operating Income divided by Total Debt Service (principal + interest) - more comprehensive. DSCR is a stricter test. ICR of 3.0 may coexist with DSCR of 1.2 if the loan has large bullet principal repayments.' },
  { q: 'Is DSCR used for individual home loan applications?', a: 'For individual home loans, banks typically use FOIR (Fixed Obligation to Income Ratio) rather than DSCR. DSCR is used primarily for business and project loans, commercial real estate loans, and housing loans for self-employed individuals where income comes from business operations rather than a fixed salary.' },
];

const related = calculators.filter(c => ['break-even', 'working-capital', 'profit-margin'].includes(c.id));

export default function DSCRPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="DSCR Calculator" slug="dscr-calculator" />
      <CalculatorByline slug="dscr-calculator" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Scale className="w-4 h-4 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">DSCR Calculator</h1>
            <span className="text-xs bg-accent text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">New</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate your Debt Service Coverage Ratio — the key metric banks use to approve business loans. See your debt repayment capacity at a glance.</p>
      </div>
      <DSCRCalc />

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
        name: 'DSCR Calculator',
        url: 'https://calculate-today.com/calculators/dscr-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'DSCR calculator — compute debt service coverage ratio to assess loan repayment capacity.',
      }} />
      {/* Unique content — Indian banking context */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">DSCR Requirements in Indian Business Lending (2026)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">Bank-wise Minimum DSCR</p>
            <div className="space-y-1.5 text-xs">
              {([
                ['SBI Term Loans', '≥ 1.50x', 'text-green-600'],
                ['HDFC Bank', '≥ 1.35x', 'text-green-600'],
                ['ICICI / Axis Bank', '≥ 1.25x', 'text-amber-700'],
                ['NBFCs (Bajaj, Shriram)', '≥ 1.10x', 'text-amber-700'],
                ['MUDRA / Microfinance', '≥ 1.00x', 'text-orange-700'],
              ] as [string, string, string][]).map(([bank, req, color]) => (
                <div key={bank} className="flex justify-between items-center py-1 border-b border-slate-50 text-slate-600">
                  <span>{bank}</span>
                  <span className={`font-bold ${color}`}>{req}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">RBI &amp; Regulatory Context</p>
            <ul className="text-xs text-slate-600 space-y-2">
              <li>• RBI mandates DSCR reporting for all NPA accounts above ₹5 crore</li>
              <li>• SIDBI requires DSCR ≥ 1.25x for MSME term loans</li>
              <li>• CGTMSE guarantees up to ₹2Cr without collateral if DSCR ≥ 1.0x</li>
              <li>• Project finance: lenders require minimum 1.30x throughout loan tenure</li>
              <li>• Indian banks calculate DSCR on PAT + Depreciation + Interest (cash DSCR)</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-slate-500">If your DSCR is marginal (1.0–1.25x), consider applying under CGTMSE which covers up to ₹2 crore in business loans without collateral. Alternatively, restructuring existing debt to longer tenures reduces annual debt service and improves DSCR without increasing income.</p>
      </section>

      {/* Content Depth: DSCR Improvement & Real Business Examples */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">How to Improve DSCR (Strategies for Business Owners)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Strategy 1: Increase Operating Income (Fastest):</strong> DSCR = NOI / Debt Service. To boost NOI: (a) Increase revenue by 15% (raise prices 5%, volume 10%) = NOI boost Rs 30L → DSCR 0.9 to 1.2, (b) Cut operating costs by 10% (reduce rent/freelancers) = NOI Rs 25L boost. Timeline: 2-3 months. Most effective for quick loan approval.
            </p>
            <p>
              <strong>Strategy 2: Reduce Debt Service (Restructuring):</strong> DSCR = NOI / Debt Service. Current debt: Rs 50L/year payment. Refinance to longer tenure: 5 years → 7 years = Rs 35L/year. DSCR improves 0.9 to 1.3. Cost: refinancing fees Rs 1-2L. Best for: struggling businesses needing immediate breathing room.
            </p>
            <p>
              <strong>Strategy 3: Add Rental Income to NOI:</strong> Own a property being used personally? Offer to lease from self (transfer income). Example: business operates from Rs 15L/year rental space → can claim Rs 10L/year rent as operating expense (reduces taxes!) AND add Rs 10L rental income to NOI. Net effect: NOI improves Rs 20L, DSCR jumps 0.5 points. Banks accept self-rental income if lease deed is formal.
            </p>
            <p>
              <strong>Strategy 4: Prepay High-Interest Loans:</strong> Currently paying 12% on Rs 20L personal loan AND 8% on Rs 50L term loan. Prepay personal loan (Rs 20L) → reduces annual debt service Rs 3L. DSCR improves from 0.9 to 1.25. Use business cash reserves or ask investors for equity infusion (cleaner than debt).
            </p>
            <p>
              <strong>Strategy 5: Show Full Operating Income (Accounting):</strong> Many business owners understate income for tax avoidance. Banks will only approve based on tax returns! If you show Rs 50L profit but actually make Rs 75L (off-books), lenders see DSCR 0.9 (rejection). Solution: Formalize operations, show full income. Slightly higher taxes but loan approval worth it.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">DSCR Calculation in Real Business Scenarios</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Scenario 1: Trading Company (DSCR 0.85 - Loan Rejection):</strong> Annual revenue Rs 2 crore, operating costs Rs 1.8 crore (employee salaries, rent, logistics), NOI = Rs 20 lakh/year. Existing debt service: Rs 15L/year (term loan Rs 10L + working capital interest Rs 5L). DSCR = 20 / 15 = 0.85. Bank says NO → not sufficient income to cover debt. Solution: increase NOI to Rs 25L (cut costs to Rs 1.75 crore) or reduce debt (prepay working capital) to improve DSCR to 1.25.
            </p>
            <p>
              <strong>Scenario 2: Manufacturing Unit (DSCR 1.45 - Loan Approved):</strong> Annual revenue Rs 5 crore, operating costs Rs 3.5 crore (factory rent, raw materials, wages, utilities), NOI = Rs 1.5 crore/year. Current debt service: Rs 1 crore/year (term loan). DSCR = 1.5 / 1.0 = 1.45. Bank approves at competitive rates (SBI: 7-8% interest). Loan amount: Rs 3-5 crore expandable. Safety margin: 45% buffer for income fluctuations.
            </p>
            <p>
              <strong>Scenario 3: Retail Business (DSCR 1.05 - Marginal Approval):</strong> Revenue Rs 1 crore/year, costs Rs 85 lakh (staff, rent, inventory), NOI = Rs 15L. Debt service = Rs 14L (term loan for store fit-out). DSCR = 15/14 = 1.07. HDFC Bank requires 1.35x → rejection. ICICI Bank requires 1.25x → rejection. But MUDRA/CGTMSE only requires 1.0x → APPROVED with government guarantee. Alternative: reduce debt via prepayment Rs 2L → new debt service Rs 12L, DSCR = 1.25 → banks approve.
            </p>
            <p>
              <strong>Scenario 4: Food Delivery Startup (Negative NOI - Loan Rejection):</strong> Revenue Rs 50L/year, operating costs Rs 60L (delivery fees, platform commissions, staff), EBITDA = -Rs 10L (losses). DSCR = -10 / 8 = -1.25 (NEGATIVE). All banks reject. Solution: Prove path to profitability (unit economics improving, cost reduction plan). Raise equity instead of debt until DSCR {`>`} 1.0.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">DSCR vs FOIR vs ICR: Which Metric Do Banks Use?</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>DSCR (Debt Service Coverage Ratio):</strong> Used for: Business loans, term loans, project finance, commercial real estate. Formula: NOI / Total Debt Service. Strictest test (includes principal {`+`} interest). Acceptable range: 1.25-1.5x. Banks prefer this for business because it shows true repayment capacity from earnings.
            </p>
            <p>
              <strong>FOIR (Fixed Obligation to Income Ratio):</strong> Used for: Individual home loans, personal loans, auto loans. Formula: Total monthly obligations / Monthly income. Limit: 40-50%. Does NOT include business debt. Only counts: housing EMI, auto EMI, credit card minimums. Better for salary employees.
            </p>
            <p>
              <strong>ICR (Interest Coverage Ratio):</strong> Used for: Working capital loans, short-term facility assessment. Formula: EBIT / Interest only (ignores principal). Looser test (doesn{`'`}t measure principal repayment). Acceptable: ICR {`>`} 3x. Used alongside DSCR (ICR for interest, DSCR for full repayment).
            </p>
            <p>
              <strong>Practical Impact:</strong> Business with DSCR 1.25x but ICR 5x = approved (interest is covered 5x, principal manageable). Business with DSCR 1.0x but ICR 2x = rejected by most banks (interest barely covered, principal risky). Business with FOIR 50% salaried income BUT DSCR 0.9x on business = home loan approved (FOIR looks fine, but business loan rejected because business can{`'`}t handle debt).
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
      <RelatedGuides calculatorId="dscr-calculator" />
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
