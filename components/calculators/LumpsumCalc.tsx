'use client';

import { useState, useEffect } from 'react';
import { calculateLumpsum } from '@/lib/calculators/sip';
import { LumpsumChart } from './LumpsumChart';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { Layers } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function LumpsumCalc() {
  const [mounted, setMounted]     = useState(false);
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate]           = useState(12);
  const [years, setYears]         = useState(10);
  const [result, setResult]       = useState<ReturnType<typeof calculateLumpsum> | null>(null);
  const [history, addRecord]      = useCalculationHistory('lumpsum-calculator');

  useEffect(() => { setMounted(true); }, []);

  const computeAndStore = (p: number, r: number, y: number) => {
    const res = calculateLumpsum(p, r, y);
    setResult(res);
    addRecord({
      label: `${fmtL(p)} · ${r}% · ${y}yr`,
      metrics: [
        { key: 'Maturity',  value: fmtL(res.totalValue) },
        { key: 'Returns',   value: fmtL(res.estimatedReturns) },
        { key: 'Gain',      value: `${((res.estimatedReturns / p) * 100).toFixed(0)}%` },
        { key: 'Invested',  value: fmtL(p) },
      ],
    });
  };

  const handle = () => { computeAndStore(principal, rate, years); trackCalculate('lumpsum-calculator'); };

  const tryExample = () => {
    const p = 500000, r = 12, y = 10;
    setPrincipal(p); setRate(r); setYears(y);
    computeAndStore(p, r, y);
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
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-indigo-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
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
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 text-center mb-2">Growth Over Time</p>
              {mounted ? <LumpsumChart data={chartData} years={years} /> : <div className="h-[140px] bg-slate-50 animate-pulse rounded-xl" />}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter amount and click<br /><strong>Calculate Returns</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors border border-indigo-200">
              Try: ₹5L · 12% · 10 yrs
            </button>
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
