'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateSIP } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { MutualFundTable } from '@/components/calculators/MutualFundTable';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { TrendingUp } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function SIPCalc() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate]       = useState(12);
  const [years, setYears]     = useState(10);
  const [result, setResult]   = useState<ReturnType<typeof calculateSIP> | null>(null);
  const [history, addRecord]  = useCalculationHistory('sip-calculator');

  const handle = () => {
    const res = calculateSIP(monthly, rate, years);
    setResult(res);
    addRecord({
      label: `₹${monthly.toLocaleString('en-IN')}/mo · ${rate}% · ${years}yr`,
      metrics: [
        { key: 'Invested',  value: fmtL(res.investedAmount) },
        { key: 'Returns',   value: fmtL(res.estimatedReturns) },
        { key: 'Total',     value: fmtL(res.totalValue) },
        { key: 'Gain',      value: `${((res.estimatedReturns / res.investedAmount) * 100).toFixed(0)}%` },
      ],
    });
  };

  // Chart data: year-by-year growth
  const chartData = result ? Array.from({ length: years + 1 }, (_, y) => {
    const { investedAmount, totalValue } = calculateSIP(monthly, rate, y || 0.001);
    return { year: `${y}y`, invested: Math.round(y > 0 ? investedAmount : 0), value: Math.round(y > 0 ? totalValue : 0) };
  }) : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {[
          { label: 'Monthly Investment', value: monthly, set: setMonthly, min: 500, max: 100000, step: 500, display: fmtINR(monthly) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ].map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-green-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)} min={min} max={max} step={step}
              className="w-full h-1.5 rounded-full accent-green-600" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate SIP Returns
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-green-600 text-white rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-100 mb-1">Total Maturity Value</p>
                  <p className="text-2xl font-bold">{fmtL(result.totalValue)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-green-200">Wealth Gain</p>
                  <p className="text-lg font-bold text-green-100">{fmtL(result.estimatedReturns)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Amount Invested</p>
                  <p className="text-sm font-bold text-slate-800">{fmtL(result.investedAmount)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Returns</p>
                  <p className="text-sm font-bold text-slate-800">{fmtL(result.estimatedReturns)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">Growth Over Time</p>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={Math.floor(years / 4)} />
                  <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
                  <Area type="monotone" dataKey="invested" stackId="1" stroke="#e2e8f0" fill="#e2e8f0" name="Invested" />
                  <Area type="monotone" dataKey="value" stackId="0" stroke="#16a34a" fill="#bbf7d0" name="Total Value" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter SIP details and click<br /><strong>Calculate SIP Returns</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Run a SIP calculation to compare scenarios." />
    </div>

    {/* Personalized mutual fund comparison table */}
    <MutualFundTable monthly={monthly} years={years} />

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable monthly={monthly} years={years} />
    </>
  );
}
