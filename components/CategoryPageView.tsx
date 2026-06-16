import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { calculators, type Category } from '@/lib/calculators-registry';
import { CalculatorCard } from '@/components/CalculatorCard';
import { JsonLd } from '@/components/JsonLd';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculate-today.com';

/* ── Category metadata ─────────────────────────────────────────────────── */

interface CategoryMeta {
  slug: string;
  category: Category;
  name: string;
  tagline: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'tax',
    category: 'tax',
    name: 'Income Tax Calculators',
    tagline: 'Calculate your exact tax liability in under 2 minutes',
    intro: `India\'s income tax rules change every year — new slabs, revised rebates, tweaked deductions. Getting it wrong costs you money in two ways: you either overpay because you missed a deduction, or you underpay and face interest under Section 234A/B/C.

Our income tax calculators cover every scenario a salaried or self-employed taxpayer faces in India. Compare old regime vs new regime side-by-side to see which one saves you more for FY 2025-26. Compute your exact tax liability including the 12.5 lakh rebate under the new regime, standard deduction, HRA exemption, 80C, 80D and NPS deductions under the old regime.

The salary calculator converts your CTC into your actual in-hand pay — breaking out Basic, HRA, Special Allowance, PF (employer + employee), professional tax and income tax. Use it before negotiating your next offer so you know exactly what you\'ll take home.

HRA exemption is one of the most under-claimed deductions. The calculator computes the least of three values — actual HRA received, 50%/40% of basic salary (metro vs non-metro), and actual rent minus 10% of basic — to find your exact exemption amount.

Gratuity becomes payable after 5 years of continuous service. The calculator applies the formula under the Payment of Gratuity Act 1972 to tell you exactly what you or your employee is entitled to on exit.

All calculators are updated for FY 2025-26 and are completely free with no login required.`,
    faqs: [
      { q: 'Which tax regime is better for salaried employees in FY 2025-26?', a: 'It depends on your deductions. The new regime is usually better if your 80C + HRA + other deductions are below ₹3.75 lakh. Use the Old vs New Regime calculator to compare your exact numbers — it takes under 60 seconds.' },
      { q: 'Is the ₹12.5 lakh tax-free limit real under the new regime?', a: 'Yes. Under Section 87A (FY 2025-26), individuals with net taxable income up to ₹12 lakh after the ₹75,000 standard deduction (so gross income up to ₹12.75 lakh) pay zero income tax under the new regime. Our new regime calculator automatically applies this rebate.' },
      { q: 'How is HRA exemption calculated for metro cities?', a: 'HRA exemption is the minimum of three values: (1) actual HRA received from employer, (2) 50% of basic salary for metro cities (40% for non-metro), and (3) actual rent paid minus 10% of basic salary. The HRA calculator computes all three and shows the exact exempt amount.' },
    ],
  },
  {
    slug: 'investment',
    category: 'investment',
    name: 'Investment Calculators',
    tagline: 'See exactly how your money grows — before you invest',
    intro: `The single most powerful wealth-building tool is not a hot stock or a crypto tip — it\'s starting early and being consistent. Our investment calculators turn vague hopes ("I want to be rich") into precise plans ("I need to invest ₹7,200/month at 12% to reach ₹1 crore in 20 years").

The SIP calculator is the most popular starting point. Enter your monthly amount, expected return and horizon — it instantly shows your maturity value and the wealth gained versus total invested. The step-up SIP variant lets you increase your SIP by a fixed percentage every year, which closely mirrors real salary growth and dramatically boosts the final corpus.

The Goal SIP calculator works in reverse: tell it your target (e.g., ₹50 lakh for a child\'s education in 15 years) and it tells you the monthly SIP you need to start today.

For one-time investments, the Lumpsum Calculator and CAGR Calculator are your go-to tools. CAGR measures portfolio performance — paste in your starting value, current value, and years to see your annualised return.

The Compounding Calculator shows the magic (and the math) behind Einstein\'s "eighth wonder of the world." Switch between daily, monthly and annual compounding frequencies to see how compounding period affects final growth.

The SWP Calculator is the retirement-phase counterpart of SIP — it shows how long your accumulated corpus lasts when you start withdrawing monthly. The Inflation Calculator puts all of this in context: that ₹1 crore corpus in 25 years may only have the purchasing power of ₹23 lakh today at 6% inflation.`,
    faqs: [
      { q: 'What is a realistic SIP return rate to use in the calculator?', a: 'Large-cap equity funds in India have delivered 10–12% CAGR over 10-year periods historically. Flexi-cap and mid-cap funds have returned 12–15%. Debt funds return 6–8%. For long-term projections, 10–12% is a conservative-yet-realistic assumption for diversified equity SIPs. The calculator lets you change the rate to run best-case and worst-case scenarios.' },
      { q: 'SIP vs Lumpsum — which is better?', a: 'SIP wins when markets are volatile because it averages your purchase cost (rupee cost averaging). Lumpsum wins if you invest at a market bottom. In practice, most investors can\'t time the market, so SIP is the safer default. The step-up SIP variant outperforms both over 15+ years for investors whose income grows annually.' },
      { q: 'How accurate is the CAGR calculator?', a: 'The CAGR formula is mathematically exact: CAGR = (Ending Value / Beginning Value)^(1/Years) − 1. The only variable is the time period — make sure you enter the exact number of years including partial years for accuracy.' },
    ],
  },
  {
    slug: 'savings',
    category: 'savings',
    name: 'Retirement & Savings Calculators',
    tagline: 'Plan your corpus — PPF, NPS, EPF, FD, RD and FIRE',
    intro: `Retirement planning in India means juggling multiple instruments — each with different tax treatment, liquidity, and guaranteed vs market-linked returns. Our savings and retirement calculators cover every major scheme so you can make informed decisions about where to put your money.

Public Provident Fund (PPF) is the gold standard of safe, tax-free long-term savings. Our PPF calculator computes maturity value at the current 7.1% p.a. government rate, accounting for annual contributions and the 15-year lock-in (extendable in 5-year blocks). The National Savings Certificate (NSC) calculator covers the 5-year guaranteed instrument at 7.7% p.a. with Section 80C benefit.

NPS (National Pension System) offers the best tax deal for salaried employees: up to ₹1.5 lakh under 80CCD(1) plus an additional ₹50,000 under 80CCD(1B) that no other instrument offers. The NPS calculator estimates both your lump-sum corpus at 60 and the monthly annuity you can expect. EPF is mandatory for most salaried employees — the EPF calculator shows your growing corpus at the current 8.15% rate over your remaining working years.

For risk-free deposit products, the FD calculator handles quarterly, monthly and annual compounding for any bank rate. The RD calculator covers monthly recurring deposits with the same flexibility. Both show maturity value and interest earned so you can compare returns across banks instantly.

The FIRE calculator is for those who want to retire early. It computes your retirement corpus using the 4% safe withdrawal rule, the monthly SIP needed to reach it, and your FIRE date — the month you can actually stop working.`,
    faqs: [
      { q: 'PPF vs NPS — which is better for retirement?', a: 'PPF gives guaranteed 7.1% tax-free returns with full flexibility on amount (up to ₹1.5L/year). NPS can deliver 10–12%+ in equity allocation but 40% of the corpus is locked into an annuity at retirement. For most salaried employees, both together give the best outcome: max PPF for the guaranteed floor, use NPS for the extra ₹50,000 80CCD(1B) deduction.' },
      { q: 'How is EPF interest calculated?', a: 'EPF interest is calculated on the monthly running balance, but credited annually. The current rate is 8.15% p.a. for FY 2023-24. Both employee (12% of basic) and employer contributions (8.33% to EPS, 3.67% to EPF) earn interest. The EPF calculator shows your projected balance at every year until retirement.' },
      { q: 'What corpus do I need to retire early (FIRE)?', a: 'The 4% rule says your corpus should be 25× your annual expenses. So if you need ₹60,000/month in retirement, your corpus target is ₹60,000 × 12 × 25 = ₹1.8 crore. The FIRE calculator does this math plus shows the monthly SIP needed to reach it by your target date.' },
    ],
  },
  {
    slug: 'loans',
    category: 'loans',
    name: 'Loan & EMI Calculators',
    tagline: 'Know your exact EMI and total interest before you borrow',
    intro: `A loan is one of the largest financial commitments most Indians make — yet most borrowers only ask "what is the EMI?" without understanding the total interest they will pay over the loan tenure. Our loan calculators show the full picture so you never get surprised.

The Home Loan EMI Calculator is the most-used tool on the site. Enter principal, interest rate and tenure — it instantly shows monthly EMI, total interest payable, and a full amortization schedule. You can compare how changing the tenure by 5 years affects the total interest outgo (often by ₹10–20 lakh on a ₹50 lakh loan).

The unique Interest-Free Home Loan Calculator shows an advanced strategy: run a parallel SIP investment alongside your EMI. Over 20 years, a ₹10,000/month SIP at 12% can return more than the total home loan interest — making your loan effectively interest-free.

The Loan Prepayment Calculator answers the most common question borrowers have: "Should I make a part prepayment and by how much does it reduce my interest?" Enter your outstanding principal, current rate and a lumpsum prepayment amount to see exact interest saved and EMI tenure reduction.

For other loan types, dedicated calculators for Car Loans, Personal Loans, and Education Loans each use standard EMI formula with amortization. The Home Loan Eligibility Calculator tells you the maximum loan amount banks will sanction based on your net income and existing EMI obligations.

The universal EMI Calculator handles any loan type with a flexible amortization table — useful when you have a loan that doesn\'t fit neatly into a standard category.`,
    faqs: [
      { q: 'How is EMI calculated?', a: 'EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P = principal, R = monthly interest rate (annual rate ÷ 12), N = number of months. For a ₹50 lakh home loan at 8.5% for 20 years, the EMI is ₹43,391 and total interest paid is ₹54.14 lakh. The calculator shows this instantly.' },
      { q: 'Is it better to reduce EMI or tenure after prepayment?', a: 'Reducing tenure saves more total interest — often 2–3× more than reducing EMI. For example, a ₹5 lakh prepayment on a ₹50 lakh 20-year loan saves ₹6.2 lakh in interest if used to reduce tenure vs ₹2.1 lakh if used to reduce EMI. Use the Loan Prepayment Calculator to see your exact numbers.' },
      { q: 'What is the maximum home loan I can get on my salary?', a: 'Most banks apply the FOIR (Fixed Obligation to Income Ratio) rule: total EMIs (existing + new) should not exceed 40–50% of your net monthly income. The Home Loan Eligibility Calculator applies this rule and outputs the maximum loan amount you can get across different tenure options.' },
    ],
  },
  {
    slug: 'business',
    category: 'business',
    name: 'Business Calculators',
    tagline: 'GST, break-even, profit margins and more — for Indian businesses',
    intro: `Running a business in India means navigating GST filings, calculating whether your pricing covers costs, understanding your debt repayment capacity, and managing ad spend ROI. Our business calculators handle the maths so you can focus on the business.

The GST Calculator is the most-used: enter any amount and pick a GST slab (5%, 12%, 18% or 28%) to instantly get the GST-inclusive or exclusive price, plus the CGST and SGST breakdown. Useful for raising invoices, checking if a supplier is charging the right GST, or filing GSTR-1 manually.

The Break-Even Calculator tells you the minimum sales needed to cover your fixed costs at a given price and variable cost per unit. This is the foundation of every pricing decision. The Profit Margin Calculator goes further: enter your revenue and costs to see gross, operating and net margin percentages — or reverse-engineer the selling price needed for your desired margin.

Working Capital Calculator measures the short-term financial health of your business: current ratio, quick ratio and net working capital from your balance sheet numbers. The DSCR (Debt Service Coverage Ratio) Calculator is used by lenders to assess whether your business generates enough operating income to service debt. Know your DSCR before you apply for a business loan.

The PPC Ad Spend Calculator is built for digital marketers: enter your budget, CPC and expected conversion rate to forecast clicks, leads, cost per lead, and ROAS. It prevents the most common mistake — setting a budget without knowing what it will actually buy.`,
    faqs: [
      { q: 'How do I calculate GST on an invoice in India?', a: 'For an intra-state supply: GST Amount = Value × GST Rate. CGST = SGST = GST Amount / 2. For example, a ₹10,000 service at 18% GST: GST = ₹1,800, so CGST = ₹900 and SGST = ₹900. Total invoice = ₹11,800. For inter-state supplies, the full GST is charged as IGST. Use the GST Calculator to do this in one click.' },
      { q: 'What is a good DSCR for a business loan application?', a: 'Most banks in India require a minimum DSCR of 1.25–1.50 for business loans. A DSCR of 1.25 means your operating income is 25% higher than your total debt obligations — giving the bank a margin of safety. DSCR below 1.0 means your business cannot cover its debt from operations, making loan approval very unlikely.' },
      { q: 'How do I calculate break-even for my business?', a: 'Break-Even Units = Fixed Costs ÷ (Selling Price per Unit − Variable Cost per Unit). Break-Even Revenue = Fixed Costs ÷ Contribution Margin Ratio. For example, if your fixed costs are ₹2 lakh/month, selling price is ₹500 and variable cost is ₹300, break-even is 2,00,000 ÷ 200 = 1,000 units or ₹5 lakh in revenue.' },
    ],
  },
  {
    slug: 'health',
    category: 'health',
    name: 'Health Calculators',
    tagline: 'BMI, calorie needs and ideal weight — in one place',
    intro: `Health calculators turn the complex science of nutrition and body composition into simple, actionable numbers. Our BMI & Calorie Calculator combines two of the most important health metrics in a single tool — so you can understand your current health status and plan your diet intelligently.

Body Mass Index (BMI) is calculated from your height and weight: BMI = Weight (kg) ÷ Height (m)². The WHO classification ranges from Underweight (<18.5) to Obese Class III (≥40). While BMI doesn\'t measure body fat directly, it is the standard screening tool used by doctors, insurance companies, and fitness professionals globally.

More useful than BMI alone is your Total Daily Energy Expenditure (TDEE) — the number of calories you actually burn per day based on your height, weight, age, gender and activity level. The calculator uses the Harris-Benedict formula to compute Basal Metabolic Rate (BMR) first, then multiplies by an activity factor. TDEE is the number you should eat at to maintain your current weight. To lose 0.5 kg/week, eat at a 500 kcal/day deficit. To gain muscle, eat at a 300–500 kcal/day surplus.

The ideal weight range shows the weight range at which your BMI falls within the "Normal" category (18.5–24.9) for your height. This is a useful goal-setting anchor when starting a fitness journey.

All inputs are accepted in both metric (kg/cm) and imperial (lbs/ft) units.`,
    faqs: [
      { q: 'Is BMI an accurate measure of health?', a: 'BMI is a useful population-level screening tool but has limitations for individuals. It doesn\'t distinguish between muscle and fat (athletes can have "overweight" BMI despite low body fat). For most adults, BMI combined with waist circumference and TDEE gives a much clearer health picture. Use BMI as a starting point, not the final word.' },
      { q: 'How many calories should I eat to lose weight?', a: 'Start with your TDEE from the calculator. To lose 0.5 kg/week, subtract 500 kcal/day from your TDEE. To lose 1 kg/week, subtract 1,000 kcal/day (this is the maximum recommended safe deficit). Going below 1,200 kcal/day for women or 1,500 kcal/day for men is not recommended without medical supervision.' },
      { q: 'What is a healthy BMI range for Indians?', a: 'The WHO BMI scale uses 18.5–24.9 as "Normal" for all ethnicities. However, some studies suggest South Asians face higher metabolic risk at lower BMI values — some Indian health bodies recommend 18.5–22.9 as the optimal range for Indians. Our calculator shows both WHO classification and your numeric BMI.' },
    ],
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

/** Build static metadata for a category route (evaluated at build time). */
export function buildCategoryMetadata(slug: string): Metadata {
  const meta = CATEGORIES.find((c) => c.slug === slug);
  if (!meta) return {};
  return {
    title: meta.name,
    description: `${meta.tagline}. Free, accurate ${meta.name.toLowerCase()} for India — no sign-up required.`,
    alternates: { canonical: `/calculators/${meta.slug}/` },
  };
}

/* ── Category page view (shared by the 6 static category routes) ─────────── */

export function CategoryPageView({ slug }: { slug: string }) {
  const meta = CATEGORIES.find((c) => c.slug === slug);
  if (!meta) return null;

  const categoryCalcs = calculators.filter((c) => c.category === meta.category);
  const pageUrl = `${BASE_URL}/calculators/${meta.slug}/`;

  return (
    <>
      {/* ── JSON-LD ── */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta.name,
        description: meta.tagline,
        url: pageUrl,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: categoryCalcs.map((calc, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: calc.title,
            url: `${BASE_URL}${calc.href}/`,
          })),
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: meta.name, item: pageUrl },
        ],
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: meta.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-medium">{meta.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            {meta.name}
          </h1>
          <p className="text-base text-slate-500">{meta.tagline}</p>
        </div>

        {/* Intro */}
        <div className="mb-8 prose prose-slate max-w-none">
          {meta.intro.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3">{para}</p>
          ))}
        </div>

        {/* Calculator grid */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          All {meta.name} ({categoryCalcs.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {categoryCalcs.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {meta.faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none">
                  <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
