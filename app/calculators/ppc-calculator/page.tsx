import type { Metadata } from 'next';
import { TrendingUp, Megaphone } from 'lucide-react';
import { PPCCalculator } from '@/components/calculators/PPCCalculator';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'PPC Calculator: What Does ₹50K Google Ads Budget Actually Get?',
  description:
    'Free PPC calculator — ₹50K budget at ₹50 CPC = 1,000 clicks, 30 leads at 3% CVR. Calculate conversions, cost-per-lead, ROAS and break-even CPC for any campaign.',
  keywords: ['PPC calculator', 'Google Ads calculator', 'CPC calculator', 'ROAS calculator', 'ad spend calculator'],
  alternates: { canonical: '/calculators/ppc-calculator/' },
};

const faqs = [
  {
    q: 'What is PPC (Pay Per Click)?',
    a: 'PPC is an online advertising model where advertisers pay each time a user clicks on their ad. Google Ads is the most popular PPC platform. Advertisers bid on keywords and pay per click received.',
  },
  {
    q: 'How to calculate PPC budget for a Google Ads campaign?',
    a: 'Formula: Monthly Budget = (Target monthly revenue goal / Avg order value) × CPC × (1 / Conversion rate). Example: Goal Rs 10 lakh revenue, AOV Rs 5,000, CPC Rs 50, Conv. rate 3% = (200,000 × 50 × 100/3) = Rs 3.3 lakh budget needed. Use our PPC budget calculator to instantly compute required budget, expected clicks, and projected conversions for your campaign.',
  },
  {
    q: 'What is ROAS?',
    a: 'ROAS (Return on Ad Spend) measures how much revenue you earn for every dollar spent on advertising. A ROAS of 4x means you earn $4 in revenue for every $1 spent. A ROAS above 1x is profitable.',
  },
  {
    q: 'How do I estimate PPC campaign cost and ROI?',
    a: 'Enter your total budget, CPC (Cost Per Click), CTR (Click-Through Rate), and conversion rate into the PPC cost estimator. The calculator will instantly show: total clicks, impressions needed, cost per conversion, total conversions, revenue generated, and ROAS. This helps you understand if your budget is sufficient for your revenue target before launching the campaign.',
  },
  {
    q: 'What is a good CTR for Google Ads?',
    a: 'The average CTR for Google Search Ads is 2–5%. Display ads have much lower CTR (typically 0.1–0.5%). Higher CTR usually indicates better ad relevance and quality score.',
  },
  {
    q: 'What is a good conversion rate for PPC?',
    a: 'Average PPC conversion rates vary by industry — typically 2–5% for e-commerce, and up to 10–15% for high-intent lead generation. Optimizing your landing page is the fastest way to improve conversions.',
  },
  { q: 'How does Google Ads Quality Score affect my cost per click?', a: 'Quality Score (1-10) impacts effective CPC: a score of 10 means you pay approximately 50% less than a score of 5 at the same ad rank. Quality Score depends on Expected CTR, Ad Relevance, and Landing Page Experience. A 7+ Quality Score typically reduces your CPC by 20-40%. Improve Quality Score first and then recalculate with your actual CPC from the Google Ads dashboard.' },
  { q: 'What is a typical CPC for Google Ads in India by industry?', a: 'Average Google Ads CPC in India (2025): Finance/banking Rs 50-200, Education Rs 30-100, Legal Rs 80-250, E-commerce Rs 10-40, Healthcare Rs 20-80, B2B SaaS Rs 50-150, Real estate Rs 30-120. CPC varies widely by keyword competition and quality score. Input your actual CPC from Google Keyword Planner for accurate projections in the PPC calculator.' },
  { q: 'What ROAS should I target for a profitable Google Ads campaign?', a: 'Minimum ROAS = 1 divided by Gross Margin. If your gross margin is 40%, minimum ROAS for break-even = 2.5 (every Rs 1 on ads must return Rs 2.50 in revenue). Target 4-6x ROAS for profitability after operational costs. For e-commerce, 4x is commonly cited as the baseline. Below break-even ROAS, every rupee spent loses money regardless of click volume.' },
  { q: 'Facebook Ads vs Google Ads - which is better for Indian SMBs?', a: 'Google Ads: best for high-intent buying searches. Users are actively searching - higher conversion rates but higher CPC. Facebook and Instagram Ads: best for brand awareness and interest-based audiences. Lower CPC but lower intent. For Indian SMBs with limited budgets: start with Google Search Ads for high-intent keywords, then add Facebook for remarketing to website visitors.' },
];

const related = calculators.filter((c) => ['emi', 'gst'].includes(c.id));

export default function PPCCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="PPC Calculator" slug="ppc-calculator" />

      <CalculatorByline slug="ppc-calculator" />
      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-purple-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">PPC Ad Spend Calculator (Google Ads ROI Calculator)</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Plan your PPC campaign budget with our Google Ads calculator. Estimate clicks, impressions, conversions, cost per lead (CPL), and ROAS from your ad spend. Works for Google Ads, Facebook Ads, and any pay-per-click campaign.
        </p>
      </div>
      {/* Featured Snippet Section - Quick Answer */}
      <section className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-purple-900 mb-2">Quick Answer: PPC Budget Calculator</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>PPC Budget Required</strong> = (Revenue Goal / AOV) × CPC × (100 / Conversion Rate)
        </p>
        <div className="bg-white rounded p-3 mb-3">
          <p className="text-xs text-slate-600 mb-2"><strong>Example:</strong> Target Rs 10 lakh monthly revenue:</p>
          <ul className="text-xs text-slate-700 space-y-1 ml-4">
            <li>• Orders needed (Rs 5K AOV): 200 conversions</li>
            <li>• At 3% conversion rate: 6,667 clicks needed</li>
            <li>• At Rs 50 CPC: Rs 3,33,350 budget required</li>
            <li>• Expected ROAS: 3x return (profitable)</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600">
          Use the PPC calculator to estimate clicks, impressions, cost per conversion, and ROAS for any advertising budget and campaign metrics.
        </p>
      </section>

      {/* Calculator */}
      <PPCCalculator />

      <InContentAd format="rectangle" className="my-6" />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Calculator',
        name: 'PPC Ad Spend Calculator',
        description: 'Calculate Google Ads ROI, cost per conversion, conversions, impressions, and ROAS from your PPC advertising budget.',
        url: 'https://calculate-today.com/calculators/ppc-calculator/',
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
        name: 'PPC Ad Spend Calculator',
        url: 'https://calculate-today.com/calculators/ppc-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'PPC calculator — estimate clicks, conversions, cost per lead and ROAS from your Google Ads budget.',
      }} />
      {/* Real Examples Section */}
      <section className="mt-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Real Campaign Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <p className="text-sm font-bold text-slate-800 mb-3">Example 1: E-commerce Campaign</p>
            <div className="text-xs text-slate-600 space-y-2 mb-3">
              <p><strong>Budget:</strong> Rs 1 lakh/month</p>
              <p><strong>CPC:</strong> Rs 30 (e-commerce average)</p>
              <p><strong>CTR:</strong> 3%</p>
              <p><strong>Conversion:</strong> 2.5%</p>
            </div>
            <div className="bg-blue-50 rounded p-3">
              <p className="text-xs text-blue-900 mb-1"><strong>Results:</strong></p>
              <ul className="text-xs text-blue-800 space-y-0.5 ml-2">
                <li>• Clicks: 1,111 clicks</li>
                <li>• Conversions: 28 sales</li>
                <li>• Avg order: Rs 5,000</li>
                <li>• Revenue: Rs 1.4 lakh</li>
                <li>• ROAS: 1.4x (breakeven)</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <p className="text-sm font-bold text-slate-800 mb-3">Example 2: Lead Generation (B2B)</p>
            <div className="text-xs text-slate-600 space-y-2 mb-3">
              <p><strong>Budget:</strong> Rs 2 lakh/month</p>
              <p><strong>CPC:</strong> Rs 80 (B2B higher)</p>
              <p><strong>CTR:</strong> 2%</p>
              <p><strong>Conversion:</strong> 5% (leads)</p>
            </div>
            <div className="bg-green-50 rounded p-3">
              <p className="text-xs text-green-900 mb-1"><strong>Results:</strong></p>
              <ul className="text-xs text-green-800 space-y-0.5 ml-2">
                <li>• Clicks: 500 clicks</li>
                <li>• Leads: 25 qualified leads</li>
                <li>• Lead value: Rs 8,000</li>
                <li>• Revenue: Rs 2 lakh (leads)</li>
                <li>• ROAS: 1.0x (cost-neutral)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-900 mb-3">❌ Common PPC Campaign Mistakes</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="font-bold text-red-600">1.</span> <span><strong>Wrong ROAS target:</strong> Setting ROAS target without calculating break-even. If gross margin is 40%, minimum ROAS = 2.5x. Targeting 4x gives healthy profit.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">2.</span> <span><strong>Ignoring conversion rate:</strong> Many skip testing landing pages. A 1% → 2% conversion improvement doubles profitability without increasing ad spend.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">3.</span> <span><strong>Expecting Day 1 profitability:</strong> Most PPC campaigns need 2-4 weeks to optimize. Quitting after 1 week wastes learning data.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">4.</span> <span><strong>Not segmenting by device/geography:</strong> Mobile CPC is 30% lower but conversion is 50% lower. Should be separate campaigns.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">5.</span> <span><strong>Bidding on competitor brand names:</strong> High CPC for brand keywords often leads to low conversion. Own your brand, target long-tail keywords.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">6.</span> <span><strong>Copying competitor budgets:</strong> Competitor spends Rs 5L doesn't mean you should. Start at 10% and scale up as ROAS improves.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">7.</span> <span><strong>Setting daily budget too low:</strong> Budgets &lt;Rs 1000/day don't generate enough data for optimization. Minimum: Rs 2000-5000/day per campaign.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">8.</span> <span><strong>Not tracking actual revenue:</strong> Tracking clicks and conversions without revenue leads to wrong ROAS calculations. Use GA4 + UTM parameters.</span></li>
        </ul>
      </section>

      {/* Content Depth: PPC Platform Comparison & Advanced Strategies */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Google Ads vs Facebook Ads vs LinkedIn Ads (Comparison)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Google Search Ads (Highest Intent):</strong> Best for immediate purchases. User actively searching = highest conversion rates (4-8% for e-commerce). Average CPC Rs 30-200 depending on industry. Profit-focused advertisers start here. ROAS potential: 2-6x.
            </p>
            <p>
              <strong>Google Display Ads (Brand Awareness):</strong> Low CPC (Rs 2-10) but low conversion (0.5-2%). Best for retargeting website visitors (15-30% conversion rates) or building awareness. Use when search ads budget exhausted. ROAS potential: 1.5-3x for retargeting, 0.5-1x for new audience.
            </p>
            <p>
              <strong>Facebook/Instagram Ads (Interest-Based):</strong> Lowest CPC (Rs 5-50) but requires strong creative. Best for young audience (18-35 years) and e-commerce. Conversion rates 1-3% for cold audience, 8-15% for warm retargeting. Better than Google for fashion, lifestyle, apps. ROAS potential: 1-3x for cold, 3-8x for warm audience.
            </p>
            <p>
              <strong>LinkedIn Ads (B2B High-Value):</strong> Highest CPC (Rs 200-500) but sells high-ticket services (Rs 50k+). Best for SaaS, consulting, recruitment. Conversion rates 2-5% but lead value Rs 8,000-50,000. Small daily budgets fail (need min Rs 5,000+/day). ROAS potential: 2-4x when targeting decision-makers.
            </p>
            <p>
              <strong>Recommendation for Indian SMBs:</strong> Start with Google Search Ads (high intent, easy to measure) + Google Display Retargeting (low cost, easy wins). Add Facebook if product is lifestyle/fashion/beauty. Skip LinkedIn unless B2B SaaS with 50L+ deal sizes.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Advanced PPC ROI Optimization Strategies</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Strategy 1: Layering Audiences (Reduce CPC 30-40%):</strong> Instead of broad keyword match (high CPC, 30% waste), use phrase match + negative keywords. Then retarget non-converters within 7 days with lower-cost display ads at 50% CPC. Workflow: Rs 100K budget → Rs 70K search (warm up), Rs 30K retargeting (convert warm). Expected ROAS improvement: 1.8x → 2.4x.
            </p>
            <p>
              <strong>Strategy 2: Time-of-Day & Day-of-Week Bidding:</strong> Adjust bids by 30-50% based on conversion timing. Example: Finance products convert 2x better Monday-Wednesday (people planning) vs Friday. Reduce Friday bids -30%, increase Monday bids +30%. This improves ROAS from 2x to 2.3-2.5x with same budget.
            </p>
            <p>
              <strong>Strategy 3: Keyword Level Bidding (Maximize High-Converters):</strong> Most advertisers bid same on all keywords. Instead: track conversions by keyword. If "product comparison" keyword converts 5% but "product price" converts 2%, bid 2.5x higher on comparison. In 30 days, ROAS improves 15-25% as budget shifts to high-converting keywords.
            </p>
            <p>
              <strong>Strategy 4: Sequential Messaging (Increase Conversion 20-30%):</strong> Day 1: Show awareness ad (product benefits). Day 2-5: Show consideration ads (vs competitors, customer testimonials). Day 6-20: Show conversion ads (discounts, urgency). Users see all 3 before buying = 2-3x higher conversion vs single message. ROAS improvement: 2x → 2.5-2.8x.
            </p>
            <p>
              <strong>Strategy 5: Break-Even Analysis & Scaling:</strong> Calculate exact break-even ROAS (1 / gross margin). If margin 50%, break-even ROAS = 2x. If current ROAS = 3x, you have 1.5x profitability buffer. Now: increase daily budget 20-30%. Google will scale to similar high-converting audiences = you keep 3x ROAS at 2x budget = 2x profit. Works only if ROAS &gt; break-even + 50% safety margin.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">When Each Campaign Type Makes Financial Sense</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Search Ads (Immediate ROI):</strong> Best if: product is comparison-rich (people researching), CPC &lt; Rs 100, conversion rate &gt; 2%, margin &gt; 50%. Break-even budget = (target monthly revenue / AOV / conversion rate) × CPC. If target Rs 10L/month at 3% conversion, Rs 50 CPC, Rs 5K AOV → need Rs 3.3L budget. Minimum: Rs 1K/day minimum to get enough data (30 days = Rs 30K). Start here for Indian SMBs.
            </p>
            <p>
              <strong>Display Retargeting (High Conversion Cheaply):</strong> Best if: you already have website traffic (1000+ visitors/month). Conversion rate 5-20% (vs 2-5% cold search). CPC Rs 5-20 (vs Rs 30-100 search). Budget: Rs 500-1000/day enough for 50-100 retargeted visitors/day. ROAS typically 2-3x. Suitable for: all e-commerce, services, SaaS. Skip if: &lt; 300 website visitors/month.
            </p>
            <p>
              <strong>Facebook/Instagram Ads (Brand Building + Sales):</strong> Best if: budget Rs 2000+/day (need volume for FB algorithm), product is visually appealing, target age 18-45, comfortable with 2-3 week learning period. CPC Rs 5-20, conversion 1-3% cold (8-15% warm). Profitable at 1-2x ROAS if you can scale retargeting. Skip if: B2B lead gen, low visual appeal, budget &lt; Rs 1000/day.
            </p>
            <p>
              <strong>LinkedIn Ads (High-Value B2B Only):</strong> Best if: deal size &gt; Rs 50L, target decision-makers directly, have 50+ LinkedIn connections (credibility), budget Rs 5000+/day. CPC Rs 200-500, conversion 2-5%, but lead value Rs 20L+ means 2-4x ROAS expected. Skip if: SMB with &lt; Rs 10L deal size. Start with Google Search instead.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <InContentAd format="horizontal" className="mb-6" />

      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique content — India PPC benchmarks */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Google Ads Benchmarks for India (2026)</h2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 font-semibold text-slate-700">Industry</th>
                <th className="text-right py-2 font-semibold text-slate-700">Avg CPC (₹)</th>
                <th className="text-right py-2 font-semibold text-slate-700">Avg CTR</th>
                <th className="text-right py-2 font-semibold text-slate-700">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {([
                ['Finance &amp; Banking', '₹50–200', '3.5–5%', '4–8%'],
                ['Education / EdTech', '₹30–100', '3–5%', '5–10%'],
                ['Real Estate', '₹40–150', '2–4%', '2–4%'],
                ['E-commerce', '₹8–40', '2–4%', '2–5%'],
                ['Healthcare', '₹20–80', '3–5%', '3–6%'],
                ['B2B / SaaS', '₹60–200', '2–4%', '3–6%'],
                ['Legal Services', '₹100–300', '2–3%', '3–7%'],
              ] as [string, string, string, string][]).map(([ind, cpc, ctr, cvr]) => (
                <tr key={ind}>
                  <td className="py-2 font-medium text-slate-700" dangerouslySetInnerHTML={{ __html: ind }} />
                  <td className="py-2 text-right">{cpc}</td>
                  <td className="py-2 text-right">{ctr}</td>
                  <td className="py-2 text-right">{cvr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400">India Google Ads benchmarks 2025–26. Use Google Keyword Planner for exact CPC estimates for your keywords. Enter your actual CPC and CTR from Google Ads dashboard for most accurate ROAS projections.</p>
      </section>

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This PPC Calculator</h2>
        <ol className="space-y-3">
          {[
            'Enter your total ad budget for the campaign period.',
            'Set your average Cost Per Click (CPC) — check Google Keyword Planner for estimates.',
            'Enter your expected Click-Through Rate (CTR). Use 3% as a starting point for search ads.',
            'Set your landing page conversion rate (how many visitors become leads/customers).',
            'Enter the revenue value per conversion (average order value or lead value).',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <RelatedGuides calculatorId="ppc-calculator" />
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
      </div>
  );
}
