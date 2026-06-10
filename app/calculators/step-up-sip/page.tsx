import type { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { StepUpSIPCalc } from '@/components/calculators/StepUpSIPCalc';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Step-Up SIP: 10% Annual Increase Doubles Corpus vs Flat SIP?',
  description: 'Free step-up SIP calculator — ₹5K/month increased 10%/year for 20 yrs = ₹1.3Cr vs flat ₹5K = ₹49.9L. That\'s 2.6× more wealth. Calculate your step-up now.',
  keywords: ['step-up SIP calculator', 'increasing SIP', 'top-up SIP calculator', 'SIP with annual increase'],
  alternates: { canonical: '/calculators/step-up-sip/' },
};

const faqs = [
  { q: 'What is a step-up or top-up SIP?', a: 'A step-up SIP (also called top-up SIP) automatically increases your SIP amount by a fixed percentage every year. This aligns with your salary hikes, helping you invest more as you earn more.' },
  { q: 'How to use a step-up SIP calculator?', a: 'Enter your starting monthly SIP amount, expected annual return rate, annual step-up percentage (usually 10% aligned with salary growth), and investment tenure in years. The step-up SIP calculator will instantly show: total monthly invested, total corpus at maturity, wealth gained, and comparison with flat SIP. This helps you visualize how much extra money step-up generates vs keeping SIP flat.' },
  { q: 'By how much should I step up my SIP?', a: 'A 10–15% annual step-up is generally recommended, aligned with typical salary hike percentages. Even a 10% step-up can significantly boost your final corpus compared to a flat SIP.' },
  { q: 'How much extra does step-up SIP earn compared to flat SIP?', a: 'A step-up SIP of ₹5,000/month with 10% annual increase, at 12% return over 15 years, creates about 40% more wealth than a flat ₹5,000 SIP over the same period. Use the step-up SIP calculator to see exact wealth difference for your starting amount, step-up % and tenure.' },
  { q: 'What step-up percentage should I use in the calculator?', a: 'Use your expected annual salary increment percentage - typically 8-12% for most salaried employees in India. A 10% step-up is a conservative and realistic default. If you are in a high-growth career like tech or consulting, 15% may be appropriate. Never use a step-up higher than your expected income growth rate.' },
  { q: 'How much more does a 10% step-up SIP earn vs a flat SIP?', a: 'On a Rs 5,000/month SIP at 12% over 20 years: flat SIP = Rs 49.9 lakh corpus. With 10% annual step-up = Rs 1.01 crore - more than double. Step-up SIP is the single most impactful change to any long-term SIP strategy.' },
  { q: 'Can I pause the step-up if I face financial difficulty?', a: 'Yes. Most mutual fund platforms allow you to modify or pause the step-up at any time. If you face a financial crunch, simply stop the step-up for that year and resume the next year. Even a flat year in the middle reduces the final corpus by only 5-8% vs continuous step-up.' },
  { q: 'Is step-up SIP available for all mutual fund schemes?', a: 'Most equity, hybrid, and debt funds from all major AMCs support step-up SIP. You can set it up on platforms like Groww, Zerodha Coin, or ET Money. The step-up is typically applied annually on the SIP anniversary. Verify that your chosen fund supports top-up SIP before investing.' },
  { q: 'How should I use step-up SIP to plan for a specific goal like retirement or child education?', a: 'Work backwards: identify your target corpus, expected return rate, and years available. Use the step-up SIP calculator to find the starting monthly amount at your expected step-up %. Example: For Rs 2 crore in 20 years at 12% returns with 10% annual step-up, you only need to start with Rs 13,500/month — far less than the Rs 22,500 flat SIP needed for the same goal. Pair this with goal-based SIP accounts on platforms like Groww or Coin to separate goals.' },
  { q: 'What is the formula for calculating step-up SIP returns?', a: 'Formula: A = P × [((1+r)^n - (1+s)^n) / (r - s)] where P is initial SIP, r is monthly return rate (annual return / 12), s is monthly step-up rate (annual step-up / 12), n is total months. Our step-up SIP calculator uses this formula to compute exact maturity amounts without manual calculations.' },
];

const related = calculators.filter(c => ['sip-calculator', 'goal-sip', 'lumpsum-calculator'].includes(c.id));

export default function StepUpSIPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Step-Up SIP" slug="step-up-sip" />
      <CalculatorByline slug="step-up-sip" />
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Step-Up SIP Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">Calculate how much more wealth you create by increasing your SIP amount by a fixed percentage every year — aligned with salary hikes.</p>
      </div>

      {/* Featured Snippet Section - Quick Answer */}
      <section className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-emerald-900 mb-2">Quick Answer: Step-Up SIP Calculator</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>Step-Up SIP</strong> = Starting SIP + Annual increase percentage compounded over investment period at expected return rate.
        </p>
        <div className="bg-white rounded p-3 mb-3">
          <p className="text-xs text-slate-600 mb-2"><strong>Example:</strong> Rs 5,000/month SIP, 10% annual increase, 12% returns, 20 years:</p>
          <ul className="text-xs text-slate-700 space-y-1 ml-4">
            <li>• Flat SIP (no increase): Rs 49.9 lakh corpus</li>
            <li>• Step-Up SIP (10% increase): Rs 1.01 crore corpus</li>
            <li>• <strong>Extra wealth from step-up: Rs 51 lakh (100% more!)</strong></li>
            <li>• Average SIP grows from Rs 5K to Rs 27K by year 20</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600">
          Use the step-up SIP calculator to see how annual salary increases can double your retirement corpus vs flat SIP.
        </p>
      </section>
      <StepUpSIPCalc />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Calculator',
        name: 'Step-Up SIP Calculator',
        description: 'Calculate wealth creation from step-up SIP where monthly investment increases by a fixed percentage every year, aligned with salary growth.',
        url: 'https://calculate-today.com/calculators/step-up-sip/',
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
        name: 'Step-Up SIP Calculator',
        url: 'https://calculate-today.com/calculators/step-up-sip/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Step-up SIP calculator — compute maturity value when SIP amount increases every year.',
      }} />
      {/* Common Mistakes Section */}
      <section className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-900 mb-3">❌ Common Step-Up SIP Mistakes</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="font-bold text-red-600">1.</span> <span><strong>Step-up percentage too high:</strong> Using 20-30% annual increase beyond income growth means you'll miss targets. Use 8-12% aligned with salary growth.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">2.</span> <span><strong>Stopping step-up mid-journey:</strong> One bad year and skipping step-up reduces final corpus by 15-20%. Plan for consistency.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">3.</span> <span><strong>Setting initial SIP too low:</strong> Starting at Rs 500/month with 10% step-up means you're still at Rs 1,300/month by year 10. Start higher if possible.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">4.</span> <span><strong>Not confirming fund supports step-up:</strong> Not all funds support automated step-up. Check with your AMC before investing.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">5.</span> <span><strong>Forgetting to track step-up dates:</strong> If step-up happens on 15th but salary comes on 20th, funding fails. Sync dates with pay cycle.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">6.</span> <span><strong>Comparing with flat SIP incorrectly:</strong> Step-up SIP compounds faster but requires discipline. Don't switch mid-journey to flat SIP.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">7.</span> <span><strong>Not re-calculating step-up on job change:</strong> If you jump companies and salary changes 30%, step-up percentage might be obsolete. Recalibrate.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">8.</span> <span><strong>Assuming fixed 12% market returns:</strong> Markets don't return 12% every year. Some years 5%, some 20%. Step-up strategy still works but corpus varies.</span></li>
        </ul>
      </section>

      {/* Content Depth: Step-Up Strategy & Comparison */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Step-Up SIP vs Flat SIP vs Lumpsum: Which Wins?</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Step-Up SIP (Best for Salary Growth):</strong> Rs 5K/month starting, 10% annual increase, 12% returns, 20 years = Rs 1.01 crore. Mirrors real income growth. Works best if you expect regular salary hikes. Superior to flat SIP because you invest more when you earn more.
            </p>
            <p>
              <strong>Flat SIP (Safe & Simple):</strong> Rs 5K/month consistent, 12% returns, 20 years = Rs 49.9 lakh. Easy to follow, no calculation changes. Problem: your purchasing power increases but SIP amount stays same. By year 10, Rs 5K feels negligible. Best if: salary doesn{`'`}t grow much or you want simplicity.
            </p>
            <p>
              <strong>Lumpsum (For Tax Refunds/Bonuses):</strong> Rs 60L invested once, 12% returns, 20 years = Rs 3.65 crore. Beats both SIPs if market timing is lucky. But requires discipline not to touch the money. Higher volatility risk. Best if: you already have the cash AND won{`'`}t need it for emergencies.
            </p>
            <p>
              <strong>Winner for Most Indians:</strong> Step-Up SIP. Combines discipline of SIP with growth of salary increases. Your Rs 5K investment becomes Rs 27K by year 20 (your actual earning power growth). Creates 2x more wealth than flat SIP with minimal extra effort (one instruction to your AMC).
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">How to Set Up Step-Up SIP on Popular Platforms</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Groww App:</strong> Open fund → SIP tab → Toggle {`'`}Top-Up SIP{`'`} → Set starting amount (Rs 5K) and step-up percentage (10%) → Select anniversary date (choose salary date) → Confirm. No additional cost. Groww calculates step-up automatically. Can pause anytime.
            </p>
            <p>
              <strong>Zerodha Coin:</strong> New SIP → Fund selection → Tick {`'`}Step-Up{`'`} → Enter monthly amount and step-up % → Confirm. Zerodha auto-increases on anniversary. You receive SMS notification before every step-up. Can modify step-up % later if salary growth changes.
            </p>
            <p>
              <strong>ET Money:</strong> Create SIP → Advanced options → Enable {`'`}Step-up{`'`} → Set percentage and start date → Confirm. ET Money supports 1-30% annual step-up. Dashboard shows projected corpus at maturity with step-up included. Easy modification on app.
            </p>
            <p>
              <strong>Direct from AMC Website:</strong> Some AMCs (ICICI Pru, Axis MF) allow step-up SIP registration on their website. Need to fill step-up authorization form. Takes 2-3 days to activate. Best to use apps (Groww/Coin) instead for instant activation and easy management.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Real-Life Step-Up SIP Examples (Different Income Profiles)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Example 1: Software Engineer (High Growth):</strong> Age 25, salary Rs 20L/year (Rs 1.67L/month). Start SIP Rs 20K/month at 15% annual step-up (typical tech industry hike). At 12% returns, 20-year retirement goal (age 45) = Rs 3.2 crore. Same flat SIP = Rs 1.5 crore. Step-up advantage = Rs 1.7 crore extra (113% more). Software engineers should maximize step-up as careers compound faster.
            </p>
            <p>
              <strong>Example 2: Government Employee (Modest Growth):</strong> Age 30, salary Rs 15L/year (Rs 1.25L/month). Start SIP Rs 10K/month at 7% annual step-up (typical govt salary progression). At 11% returns (conservative for debt-heavy allocation), 15-year goal = Rs 54 lakh. Same flat SIP = Rs 35 lakh. Step-up advantage = Rs 19 lakh (54% more). Lower salary growth means lower step-up %, but still powerful.
            </p>
            <p>
              <strong>Example 3: Entrepreneur (Volatile Income):</strong> Age 35, business income Rs 40L/year (Rs 3.33L/month). Start SIP Rs 50K/month at 10% annual step-up. But: some years make Rs 60L, some years Rs 25L. Best approach: Start with Rs 50K at 0% step-up (flat SIP). Add bonus/profit money as one-time lumpsum in good years. This gives flexibility without forcing step-up in down years.
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
      <RelatedGuides calculatorId="step-up-sip" />
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
