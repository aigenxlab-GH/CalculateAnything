import type { Metadata } from 'next';
import { BarChart2 } from 'lucide-react';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { BrokerageCalcClient } from '@/components/calculators/BrokerageCalcClient';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Brokerage Calculator — Calculate Stock Trading Brokerage & Charges India',
  description:
    'Free brokerage calculator India — calculate total brokerage, STT, GST, stamp duty and net P&L for intraday, delivery and F&O trades. Compare broker charges 2026.',
  keywords: [
    'brokerage calculator',
    'stock brokerage calculator India',
    'zerodha brokerage calculator',
    'intraday brokerage calculator',
    'F&O charges calculator',
    'NSE BSE trading charges',
  ],
  alternates: { canonical: '/calculators/brokerage-calculator/' },
};

const faqs = [
  {
    q: 'What is included in brokerage charges for intraday trading?',
    a: 'For intraday equity trades, brokerage is charged at 0.03% of the trade value or ₹20 per executed order, whichever is lower (Zerodha flat-fee model). Additional statutory charges include STT (0.025% on sell side), exchange transaction charges, GST at 18% on brokerage, SEBI charges of ₹10 per crore, and stamp duty at 0.003% on buy side.',
  },
  {
    q: 'Is there brokerage for delivery equity trades?',
    a: 'Under Zerodha\'s pricing model, delivery equity trades are completely free — zero brokerage. However, STT is higher at 0.1% on both buy and sell sides, stamp duty is 0.015% on buy value, and exchange transaction charges and SEBI fees still apply.',
  },
  {
    q: 'How are F&O brokerage charges calculated?',
    a: 'For F&O Futures, Zerodha charges 0.03% or ₹20 per order (whichever is lower). For F&O Options, brokerage is a flat ₹20 per order (₹40 round trip). STT was increased in 2024 — futures STT is 0.05% on sell side, options STT is 0.15% on sell premium. Exchange transaction charges differ for NSE vs BSE.',
  },
  {
    q: 'What is the points to breakeven figure?',
    a: 'Points to breakeven shows how many price points the stock/contract must move in your favour just to cover all charges. If total charges are ₹200 and you traded 100 shares, the breakeven movement is 2 points (₹2 per share). Any gain beyond this is your actual profit.',
  },
  {
    q: 'How are MTF (Margin Trading Facility) charges calculated?',
    a: 'MTF lets you buy stocks with broker funding (typically 25% margin + 75% funded). Zerodha charges 0.3% or ₹20 per order brokerage, plus interest of 0.04% per day (14.6% annualised) on the funded portion. So a ₹4L trade held 30 days at 25% margin = ₹3L funded × 0.04% × 30 days = ₹3,600 interest, on top of regular delivery charges (STT, exchange, stamp duty).',
  },
  {
    q: 'Does NSE or BSE have lower transaction charges?',
    a: 'For equity (intraday and delivery), NSE charges 0.00307% and BSE charges 0.00375% of turnover. For futures, NSE is 0.00183% — BSE charges nothing for futures. For options, NSE charges 0.03553% of premium turnover vs BSE\'s 0.0325%. NSE is generally cheaper for derivatives trading.',
  },
  {
    q: 'What are the charges for Currency and Commodity trading?',
    a: 'Currency has NO STT/CTT (govt tax) — only brokerage (0.03% or ₹20 lower for futures, flat ₹20 for options), exchange charges (NSE 0.00035% futures / 0.0311% options), SEBI, stamp duty (0.0001%) and 18% GST. Commodities on MCX have CTT (0.01% futures, 0.05% options sell side) plus MCX charges (0.0021% futures, 0.0418% options) and standard brokerage/GST.',
  },
  { q: 'How to calculate total intraday brokerage charges with STT and taxes?', a: 'For an intraday trade, total charges = Brokerage (0.03% or Rs 20 per order lower) + STT on sell (0.025% of sell price × quantity) + Exchange transaction charges (0.00335% turnover) + SEBI turnover fee (0.0001%) + Stamp duty (0.003% on buy) + GST 18% on brokerage only. Use our intraday brokerage calculator to enter your buy/sell price and quantity, and it instantly shows all charges and net profit/loss. This prevents surprise charges after trading.' },
  { q: 'What are Zerodha brokerage charges for intraday and delivery trades?', a: 'Zerodha charges: Intraday equity - 0.03% or Rs 20 whichever is lower. Delivery equity - zero brokerage. F&O - Rs 20 flat per order. Plus STT (0.025% intraday, 0.1% delivery on sell), exchange fees (0.00335%), SEBI turnover fee (0.0001%), and 18% GST on brokerage. The brokerage calculator computes total charges for any Zerodha trade.' },
  { q: 'What is commodity brokerage and how is it charged?', a: 'Commodity trading (gold, crude oil, natural gas on MCX) has brokerage typically at 0.03% or Rs 20-30 per contract for futures. CTT (Commodity Transaction Tax) replaces STT: 0.01% on sell for futures, 0.05% on sell for options. Commodity exchanges charge 0.002-0.005% turnover fees. Total commodity trading cost is typically 0.15-0.25% round-trip vs 0.1-0.15% for equity delivery. Use the commodity option in the brokerage calculator for exact MCX charges.' },
  { q: 'What is STT and who pays it?', a: 'STT (Securities Transaction Tax) is a government tax on every equity transaction. Rates: Delivery buy and sell = 0.1% each. Intraday sell = 0.025%. F&O Options sell = 0.1% on premium. F&O Futures sell = 0.02% on price. STT is deducted at source by the broker and visible in your contract note. It is not deductible as a business expense for retail investors.' },
  { q: 'What is the breakeven price after brokerage for an intraday trade?', a: 'For an intraday trade at Rs 100/share, breakeven = buy price plus (total charges divided by quantity). With typical charges of 0.05-0.07% round-trip, you need the stock to move at least Rs 0.05-0.07 per share just to break even. The brokerage calculator shows the exact breakeven price for your specific trade size and quantity.' },
  { q: 'Are F&O charges higher than equity delivery charges?', a: 'F&O brokerage is typically Rs 20 flat vs percentage for equity delivery, so F&O is cheaper for large trades. But F&O has additional STT on options at 0.1% of premium - which can be 10-20% of the premium value for OTM options. The overall charge-to-profit ratio depends on the option premium, quantity and whether the option expires worthless.' },
];

const related = calculators.filter((c) =>
  ['sip-calculator', 'cagr-calculator', 'lumpsum-calculator'].includes(c.id),
);

export default function BrokerageCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="Brokerage Calculator" slug="brokerage-calculator" />

      <CalculatorByline slug="brokerage-calculator" />
      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Brokerage Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Calculate exact trading charges — brokerage, STT, GST, exchange fees, stamp duty and net P&amp;L
          for Intraday, Delivery, F&amp;O Futures and Options trades on NSE and BSE.
        </p>
      </div>

      {/* Featured Snippet Section - Quick Answer */}
      <section className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-bold text-emerald-900 mb-2">Quick Answer: Intraday Brokerage Calculator</h2>
        <p className="text-sm text-slate-700 mb-3">
          <strong>Total Brokerage</strong> = Brokerage + STT + Exchange Fees + SEBI + Stamp Duty + GST (18% on brokerage)
        </p>
        <div className="bg-white rounded p-3 mb-3">
          <p className="text-xs text-slate-600 mb-2"><strong>Example:</strong> Buy 100 shares @ Rs 100, sell @ Rs 105 (Zerodha):</p>
          <ul className="text-xs text-slate-700 space-y-1 ml-4">
            <li>• Brokerage (0.03%): Rs 3</li>
            <li>• STT on sell (0.025%): Rs 26.25</li>
            <li>• Exchange + SEBI: Rs 5-10</li>
            <li>• GST (18% on brokerage): Rs 0.54</li>
            <li>• <strong>Total charges: Rs 35-40</strong></li>
            <li>• Gross profit: Rs 500, Net profit: Rs 460-465</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600">
          Use the brokerage calculator to compute exact charges including STT, GST, exchange fees for intraday, delivery, and F&O trades.
        </p>
      </section>

      {/* Calculator */}
      <BrokerageCalcClient />

      {/* Real Trading Examples */}
      <section className="mt-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Real Trading Examples (Zerodha)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-bold text-slate-800 mb-2">Intraday: 100 shares @ Rs 100</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Buy value: <strong>Rs 10,000</strong></p>
              <p>Sell @ Rs 105: <strong>Rs 10,500</strong></p>
              <p className="mt-2 pt-2 border-t border-slate-200">
                <strong>Gross profit: Rs 500</strong><br/>
                Brokerage: Rs 3<br/>
                STT: Rs 26<br/>
                Charges: Rs 6<br/>
                <span className="font-bold">Net: Rs 465</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-bold text-slate-800 mb-2">Delivery: 10 shares @ Rs 500</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Buy value: <strong>Rs 5,000</strong></p>
              <p>Hold 1 day, sell @ Rs 550</p>
              <p className="mt-2 pt-2 border-t border-slate-200">
                <strong>Gross profit: Rs 500</strong><br/>
                Brokerage: Rs 0<br/>
                STT: Rs 55<br/>
                Charges: Rs 2<br/>
                <span className="font-bold">Net: Rs 443</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <p className="text-xs font-bold text-slate-800 mb-2">F&O: 1 Nifty Future</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Sell @ 25,000, buy @ 24,900</p>
              <p className="mt-2 pt-2 border-t border-slate-200">
                <strong>Gross profit: Rs 100</strong><br/>
                Brokerage: Rs 20<br/>
                STT: Rs 10<br/>
                Charges: Rs 5<br/>
                <span className="font-bold text-red-600">Loss: -Rs 35</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="mt-6 mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-red-900 mb-3">❌ Common Trading Charge Mistakes</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span className="font-bold text-red-600">1.</span> <span><strong>Ignoring STT completely:</strong> STT can be 50% of profit on intraday trades. A Rs 500 profit trade with Rs 250 STT becomes Rs 250 net. Plan accordingly.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">2.</span> <span><strong>Thinking delivery = no charges:</strong> Zerodha has zero brokerage on delivery but STT (0.1%), exchange fees, and stamp duty still apply. Expect Rs 50-150 charges per trade.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">3.</span> <span><strong>Using wrong broker for your style:</strong> Intraday traders should compare brokers on charges (Zerodha Rs 20 flat best). MTF/leverage traders should compare interest rates.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">4.</span> <span><strong>Not understanding bracket orders:</strong> Bracket orders have 2 charges: entry order + stop-loss order. Total cost is Rs 40 (2 × Rs 20 Zerodha) not Rs 20.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">5.</span> <span><strong>Forgetting GST on brokerage:</strong> GST 18% on brokerage is often missed. Rs 20 brokerage = Rs 23.60 with GST included.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">6.</span> <span><strong>Comparing gross % charges instead of absolute cost:</strong> 0.03% on Rs 500 trade = Rs 0.15 vs 0.05% on Rs 50,000 = Rs 25. At small sizes, flat fees are better.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">7.</span> <span><strong>Switching brokers for Rs 2 fee difference:</strong> Switching costs: learning new platform (1 week), missed trades, account opening. Save switching unless saving &gt;30%.</span></li>
          <li className="flex gap-2"><span className="font-bold text-red-600">8.</span> <span><strong>Not accounting for slippage in profit targets:</strong> Slippage (actual execute price vs expected) can be Rs 2-5 per share. Plan profits with Rs 5-10 margin for safety.</span></li>
        </ul>
      </section>

      {/* Content Depth: Broker Comparison & Advanced Strategies */}
      <section className="mt-6 mb-6 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Top 5 Brokers Compared (May 2026)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Zerodha (Most Popular):</strong> Intraday 0.03% or Rs 20 (flat fee model). Delivery zero brokerage. Best for high-frequency traders wanting lowest per-trade cost. Downside: Zero brokerage on delivery with high platform complexity. 5.2M+ users.
            </p>
            <p>
              <strong>Angel One:</strong> Intraday 0.03% or Rs 20. Delivery Rs 20 flat. Better for delivery traders. User-friendly mobile app. Margin available at 11% p.a. vs Zerodha 14.6%. Good for beginners.
            </p>
            <p>
              <strong>Shoonya (IIFL):</strong> Intraday 0.03% or Rs 20. Delivery Rs 0. MTF interest 12% p.a. Best for low-cost MTF (margin) users. Platform less responsive than Zerodha.
            </p>
            <p>
              <strong>Alice Blue:</strong> Intraday 0.02% or Rs 15 (cheaper than Zerodha). Delivery zero. Good for swing traders holding 1-3 days. Execution quality matters more on intraday; Alice Blue slightly slower during volatile markets.
            </p>
            <p>
              <strong>5Paisa:</strong> Intraday 0.04% or Rs 20. Delivery Rs 20. Cheapest MTF interest at 9.5% p.a. Good for MTF heavy traders willing to pay delivery brokerage. Less liquidity than top 3.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">Advanced Charge Optimization Strategies</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Strategy 1: Batch Trades to Hit Breakeven Earlier:</strong> Instead of 10 separate Rs 1,000 trades (each with Rs 20 brokerage + Rs 25 STT = Rs 45 charges), combine to 1 × Rs 10,000 trade (Rs 30 brokerage + Rs 250 STT = Rs 280 total). Per-trade cost drops 40%. Trade 5-10 setups together once daily instead of throughout day.
            </p>
            <p>
              <strong>Strategy 2: Delivery {`>`} Intraday for Holding 2+ Days:</strong> Intraday STT 0.025% + brokerage rounds to 0.05% total. Delivery STT 0.1% but zero brokerage = 0.1% total + Rs 100-200 fixed charges. At Rs 50,000 trade: Intraday Rs 25 charges, Delivery Rs 500-550 STT. But holding 3+ days, intraday loses 0.05% daily = 0.15% vs delivery 0.1% one-time. Breakeven: 2-day hold.
            </p>
            <p>
              <strong>Strategy 3: Use Futures Instead of Options for Small Moves:</strong> 1-lot Nifty Future (Rs 25,000 notional) has Rs 20 brokerage. 1-lot Nifty Call (Rs 1,000 premium) has Rs 20 brokerage + 0.15% STT = Rs 36.50 charges. If expecting 50-point move = Rs 50 profit on future vs Rs 50 on call premium. Future costs Rs 20 + ~Rs 10 charges = Rs 30. Call costs Rs 36.50 + Rs 0 (0.15% on premium not notional) = Rs 36.50. For 50-point moves, futures cheaper.
            </p>
            <p>
              <strong>Strategy 4: Choose NSE over BSE for F&O:</strong> NSE futures transaction charge 0.00183%, BSE charges nothing but NSE is faster, more liquid (better execution = lower slippage). Slippage difference (Rs 5-10 per trade) {`>`} exchange fee difference (Rs 1-2). NSE better for frequent traders.
            </p>
            <p>
              <strong>Strategy 5: Track Charge Impact on Win Rate:</strong> If your average trade profit = Rs 300 and charges = Rs 50 per trade, you need 17% win rate just to break even (vs 14% without charges). Track charges month-wise. If charges {`>`} 10% of profits, switch brokers. If charges {`<`} 5% of profits, focus on strategy not broker-shopping.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">When Each Segment Makes Sense (Cost Analysis)</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Intraday Equity:</strong> Best if you trade same stock 3-5x/week with avg trade value Rs 5,000+. Charges ~0.05% round-trip. Profit potential needs to justify daily research. Breakeven move: Rs 2-3 per share at Rs 100. Unsuitable: Low trade frequency (&lt;3x/month) = high cost per trade.
            </p>
            <p>
              <strong>Delivery (Long-term Hold 3+ Months):</strong> Zero brokerage = 0.1% STT cost is rock-bottom. Best cost structure. Hold Rs 50,000 → only Rs 500 STT (one-time). No other charges. Perfect for SIP mindset into stocks. Downside: Can't exit quickly (STT 0.1% on sell too = 0.2% round-trip cost).
            </p>
            <p>
              <strong>F&O Futures (Directional Bets 1-7 Days):</strong> Rs 20 flat brokerage regardless of notional (brilliant for large notionals). Nifty 1-lot = Rs 25,000 notional, Rs 20 brokerage = 0.08%. But STT 0.05% on sell = 0.13% total. Good for intraday where you make 100+ point moves (Rs 100 profit {`>>`} Rs 30 charges). Unsuitable: Directional bets expecting 10-20 point moves only.
            </p>
            <p>
              <strong>F&O Options (Premium Decay Plays 1-30 Days):</strong> Rs 20 per order brokerage + 0.15% STT on premium. If buying 1-lot Nifty 24500 Call at Rs 200 premium → cost = Rs 20 + Rs 30 (0.15% STT) = Rs 50 for Rs 20,000 notional exposure. Breakeven: premium must move Rs 50 = 25% move. Only viable if premium decay expected faster than time decay loss. Buying naked options has 5-10% breakeven cost before directional move matters.
            </p>
            <p>
              <strong>MTF (Margin Trading):</strong> Cost: Rs 20 brokerage + interest on 75% funded portion (14.6% p.a. = 0.04% per day). 10-day hold on Rs 4L trade (₹3L funded) = Rs 120 interest + Rs 20 brokerage = Rs 140 = 0.035% cost. Only makes sense if you expect 1-2% move within hold period AND need leverage (can't afford full Rs 4L). Better: Save up and use delivery instead.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Calculator',
        name: 'Brokerage Calculator India',
        description: 'Calculate total trading charges including brokerage, STT, GST, exchange fees, stamp duty and net profit/loss for intraday, delivery and F&O trades.',
        url: 'https://calculate-today.com/calculators/brokerage-calculator/',
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
        name: 'Brokerage Calculator India',
        url: 'https://calculate-today.com/calculators/brokerage-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Brokerage calculator India — compute intraday, delivery and F&O charges including STT, GST, exchange fees and net P&L.',
      }} />
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

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This Brokerage Calculator</h2>
        <ol className="space-y-3">
          {[
            'Select the segment — Intraday Equity, Delivery Equity, F&O Futures, or F&O Options.',
            'Enter the buy price and sell price of the stock or contract.',
            'Enter the quantity (number of shares or lots).',
            'Choose the exchange — NSE or BSE (affects transaction charges).',
            'All charges and Net P&L are calculated instantly as you type.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Charge reference table */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Charge Reference Table (Zerodha, May 2025)</h2>
        <p className="text-xs text-slate-500 mb-3">Latest rates after the 2024 STT hike on F&amp;O. NSE / BSE differ for some segments.</p>
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500">
              {['Charge', 'Intraday', 'Delivery', 'F&O Fut', 'F&O Opt', 'Cur Fut', 'Cur Opt', 'Com Fut', 'Com Opt', 'MTF'].map((h) => (
                <th key={h} className="px-2 py-2 font-semibold border border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {[
              ['Brokerage',  '0.03% or ₹20', 'Zero',         '0.03% or ₹20', '₹20/order',  '0.03% or ₹20', '₹20/order',    '0.03% or ₹20',  '₹20/order',    '0.3% or ₹20'],
              ['STT/CTT',    '0.025% sell',   '0.1% both',    '0.05% sell',   '0.15% sell prem', 'None',     'None',         '0.01% sell',    '0.05% sell',   '0.1% both'],
              ['Exch (NSE)', '0.00307%',     '0.00307%',     '0.00183%',     '0.03553%',    '0.00035%',  '0.0311%',      '—',             '—',            '0.00307%'],
              ['Exch (BSE)', '0.00375%',     '0.00375%',     '0%',           '0.0325%',     '0.00045%',  '0.001%',       '—',             '—',            '0.00375%'],
              ['Exch (MCX)', '—',            '—',            '—',            '—',           '—',         '—',            '0.0021%',       '0.0418%',      '—'],
              ['GST',        '18% on brokerage + exch + SEBI (+ interest for MTF)', '', '', '', '', '', '', '', ''],
              ['SEBI',       '₹10 / crore turnover (all segments)', '', '', '', '', '', '', '', ''],
              ['Stamp Duty', '0.003% buy',   '0.015% buy',   '0.002% buy',   '0.003% buy',  '0.0001% buy','0.0001% buy',  '0.002% buy',    '0.003% buy',   '0.015% buy'],
              ['Interest',   '—',            '—',            '—',            '—',           '—',         '—',            '—',             '—',            '14.6% p.a. on 75% funded'],
            ].map((row, ridx) => {
              const isMergedRow = row.slice(2).every((v) => v === '');
              if (isMergedRow) {
                return (
                  <tr key={ridx} className="border-b border-slate-50 bg-slate-25">
                    <td className="px-2 py-2 font-medium border border-slate-100 text-slate-800">{row[0]}</td>
                    <td colSpan={9} className="px-2 py-2 border border-slate-100 text-slate-600">{row[1]}</td>
                  </tr>
                );
              }
              const [charge, ...vals] = row;
              return (
                <tr key={ridx} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-2 py-2 font-medium border border-slate-100 text-slate-800">{charge}</td>
                  {vals.map((v, i) => <td key={i} className="px-2 py-2 border border-slate-100 text-[11px]">{v}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Related */}
      <RelatedGuides calculatorId="brokerage-calculator" />
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
    </div>
  );
}
