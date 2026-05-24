'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateLumpsum } from '@/lib/calculators/sip';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { Layers } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function LumpsumCalc() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate]           = useState(12);
  const [years, setYears]         = useState(10);
  const [result, setResult]       = useState<ReturnType<typeof calculateLumpsum> | null>(null);
  const [history, setHistory]     = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]             = useState(0);

  const handle = () => {
    const res = calculateLumpsum(principal, rate, years);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtL(principal)} · ${rate}% · ${years}yr`,
      metrics: [
        { key: 'Maturity',  value: fmtL(res.totalValue) },
        { key: 'Returns',   value: fmtL(res.estimatedReturns) },
        { key: 'Gain',      value: `${((res.estimatedReturns / principal) * 100).toFixed(0)}%` },
        { key: 'Invested',  value: fmtL(principal) },
      ],
    }, ...prev].slice(0, 3));
  };

  const chartData = result ? Array.from({ length: years + 1 }, (_, y) => {
    const { totalValue } = calculateLumpsum(principal, rate, y || 0);
    return { year: `${y}y`, invested: principal, value: Math.round(y > 0 ? totalValue : principal) };
  }) : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Investment Amount', value: principal, set: setPrincipal, min: 10000, max: 10000000, step: 10000, display: fmtL(principal) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-indigo-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-indigo-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Returns
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-indigo-600 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-indigo-100 mb-1">Maturity Value</p>
                <p className="text-2xl font-bold">{fmtL(result.totalValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-indigo-200">Returns</p>
                <p className="text-lg font-bold text-indigo-100">{fmtL(result.estimatedReturns)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Invested',  value: fmtL(principal) },
                { label: 'Returns',   value: fmtL(result.estimatedReturns) },
                { label: 'Gain %',    value: `${((result.estimatedReturns / principal) * 100).toFixed(0)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">Growth Over Time</p>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={Math.floor(years / 4)} />
                  <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
                  <Area type="monotone" dataKey="invested" stackId="0" stroke="#e0e7ff" fill="#e0e7ff" name="Invested" />
                  <Area type="monotone" dataKey="value" stackId="1" stroke="#4f46e5" fill="#a5b4fc" name="Maturity Value" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter amount and click<br /><strong>Calculate Returns</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare lumpsum investments at different rates." />
    </div>

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable years={years} />
    </>
  );
}
