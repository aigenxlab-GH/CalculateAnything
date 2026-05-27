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
  title: 'Brokerage Calculator — Calculate Stock Trading Charges Instantly',
  description:
    'Free brokerage calculator for Indian stock markets. Calculate brokerage, STT, GST, stamp duty and net P&L for Intraday, Delivery, F&O Futures and Options trades on NSE and BSE.',
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
  { q: 'What are Zerodha brokerage charges for intraday and delivery trades?', a: 'Zerodha charges: Intraday equity - 0.03% or Rs 20 whichever is lower. Delivery equity - zero brokerage. F&O - Rs 20 flat per order. Plus STT (0.025% intraday, 0.1% delivery on sell), exchange fees (0.00335%), SEBI turnover fee (0.0001%), and 18% GST on brokerage. The brokerage calculator computes total charges for any Zerodha trade.' },
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

      {/* Calculator */}
      <BrokerageCalcClient />

      {/* FAQ */}
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
