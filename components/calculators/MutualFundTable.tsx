'use client';

import { useState } from 'react';
import { ExternalLink, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import { calculateSIP } from '@/lib/calculators/sip';
import { AFFILIATE } from '@/lib/affiliate-links';

/* ─── Types ─── */
type Period = '3y' | '5y';

interface FundEntry {
  name: string;
  shortName: string;
  category: 'Flexi Cap' | 'Multi Cap' | 'Small Cap' | 'Mid Cap' | 'Large Cap' | 'ELSS' | 'Index';
  cagr3y: number;
  cagr5y: number;
  expenseRatio: number;
  rating: 4 | 5;
  applyUrl: string;
  color: string;
  initials: string;
  socialProof?: string;
}

/* ─── Top 5 funds (returns as of May 2026) ─── */
const FUNDS: FundEntry[] = [
  { name: 'HDFC Mid Cap Opportunities',     shortName: 'HDFC Mid',      category: 'Mid Cap',    cagr3y: 23.62, cagr5y: 21.37, expenseRatio: 0.73, rating: 5, initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.sip.funds.hdfcMid,      socialProof: '₹70,000 Cr+ AUM' },
  { name: 'Nippon India Small Cap Fund',    shortName: 'Nippon SC',     category: 'Small Cap',  cagr3y: 21.14, cagr5y: 22.05, expenseRatio: 0.65, rating: 5, initials: 'NIP', color: '#dc2626', applyUrl: AFFILIATE.sip.funds.nipponSmall,  socialProof: '₹30,000 Cr+ AUM' },
  { name: 'SBI Small Cap Fund',             shortName: 'SBI SC',        category: 'Small Cap',  cagr3y: 20.90, cagr5y: 21.85, expenseRatio: 0.68, rating: 5, initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.sip.funds.sbiSmall,     socialProof: 'Consistent top performer' },
  { name: 'Parag Parikh Flexi Cap',         shortName: 'PPFAS',         category: 'Flexi Cap',  cagr3y: 16.20, cagr5y: 15.80, expenseRatio: 0.63, rating: 5, initials: 'PPF', color: '#f59e0b', applyUrl: AFFILIATE.sip.funds.paragParikh,  socialProof: 'Global diversification' },
  { name: 'Quant Active Fund',              shortName: 'Quant Active',  category: 'Multi Cap',  cagr3y: 15.96, cagr5y: 23.10, expenseRatio: 0.77, rating: 5, initials: 'QNT', color: '#7c3aed', applyUrl: AFFILIATE.sip.funds.quantActive,  socialProof: 'Highest 5Y return' },
];

/* ─── Formatters ─── */
const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

/* Category badge colors — include dark: variants inline */
const CAT_COLORS: Record<FundEntry['category'], string> = {
  'Multi Cap':  'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
  'Small Cap':  'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300',
  'Mid Cap':    'bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-300',
  'Flexi Cap':  'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
  'ELSS':       'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/60 dark:text-cyan-300',
  'Large Cap':  'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
  'Index':      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
};

/* ─── Props ─── */
interface Props {
  monthly: number;
  years: number;
}

export function MutualFundTable({ monthly, years }: Props) {
  const [period, setPeriod] = useState<Period>('5y');

  /* Sort by selected period CAGR */
  const funds = [...FUNDS].sort((a, b) =>
    period === '5y' ? b.cagr5y - a.cagr5y : b.cagr3y - a.cagr3y
  );

  /* Compute SIP value at each fund's historical return */
  const bestRate  = period === '5y' ? funds[0].cagr5y : funds[0].cagr3y;
  const bestValue = calculateSIP(monthly, bestRate, years).totalValue;

  /* Compelling headline numbers */
  const monthlyDisplay = fmtINR(monthly);
  const bestValueDisplay = fmtL(bestValue);

  return (
    <div className="mt-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm">
      {/* Header — punchy headline */}
      <div className="px-5 py-4 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Your <span className="text-emerald-700 dark:text-emerald-400">{monthlyDisplay}/mo</span> SIP could be worth{' '}
              <span className="text-emerald-700 dark:text-emerald-400">{bestValueDisplay}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Top 5 mutual funds by {period === '5y' ? '5-year' : '3-year'} returns. Pick the one that beats inflation.
            </p>
          </div>
          {/* Period toggle */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg self-start sm:self-auto">
            {(['3y', '5y'] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  period === p
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white'
                }`}
              >
                {p.toUpperCase()} returns
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Fund</th>
              <th className="px-4 py-3 text-center font-semibold">Category</th>
              <th className="px-4 py-3 text-center font-semibold">
                {period === '5y' ? '5Y' : '3Y'} CAGR
              </th>
              <th className="px-4 py-3 text-center font-semibold">
                Your SIP Value
                <span className="block font-normal text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">at this fund&apos;s return</span>
              </th>
              <th className="px-4 py-3 text-center font-semibold">Expense</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {funds.map((fund, idx) => {
              const cagr = period === '5y' ? fund.cagr5y : fund.cagr3y;
              const sipValue = calculateSIP(monthly, cagr, years).totalValue;
              const isBest = idx === 0;

              return (
                <tr
                  key={fund.name}
                  className={`transition-colors ${
                    isBest
                      ? 'bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {/* Fund name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ backgroundColor: fund.color }}
                      >
                        {fund.initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 text-xs leading-tight block">
                          {fund.name}
                          {isBest && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">
                              <Trophy className="w-2.5 h-2.5" /> TOP
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {fund.socialProof ?? ('★'.repeat(fund.rating) + '☆'.repeat(5 - fund.rating))}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${CAT_COLORS[fund.category]}`}>
                      {fund.category}
                    </span>
                  </td>

                  {/* CAGR */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {cagr.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">p.a.</span>
                  </td>

                  {/* SIP value */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold tabular-nums ${isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {fmtL(sipValue)}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">in {years} yrs</span>
                  </td>

                  {/* Expense ratio */}
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{fund.expenseRatio}%</span>
                  </td>

                  {/* CTA */}
                  <td className="px-4 py-3 pr-5 text-right">
                    <a
                      href={fund.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isBest
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white'
                      }`}
                    >
                      Invest
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Past returns don&apos;t guarantee future performance. CAGR shown is historical data as of 2025.
          Affiliate links — we may earn a commission at no cost to you.
        </p>
        <a
          href={AFFILIATE.sip.primary}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap flex items-center gap-0.5"
        >
          Browse all funds <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
