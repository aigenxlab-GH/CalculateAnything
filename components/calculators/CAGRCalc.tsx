'use client';

import { useState } from 'react';
import { calculateCAGR } from '@/lib/calculators/sip';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { BarChart2 } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function CAGRCalc() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal]     = useState(250000);
  const [years, setYears]     = useState(5);
  const [result, setResult]   = useState<number | null>(null);
  const [history, setHistory] = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]         = useState(0);

  const handle = () => {
    const cagr = calculateCAGR(initial, final, years);
    setResult(cagr);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtL(initial)} → ${fmtL(final)}`,
      metrics: [
        { key: 'CAGR',     value: `${cagr.toFixed(2)}%` },
        { key: 'Years',    value: `${years} yr` },
        { key: 'Gain',     value: fmtL(final - initial) },
        { key: 'Abs Ret',  value: `${((final / initial - 1) * 100).toFixed(0)}%` },
      ],
    }, ...prev].slice(0, 3));
  };

  const ratingColor = result === null ? '' : result >= 20 ? 'text-green-600' : result >= 12 ? 'text-blue-600' : result >= 8 ? 'text-amber-600' : 'text-red-500';
  const ratingLabel = result === null ? '' : result >= 20 ? 'Excellent' : result >= 12 ? 'Good' : result >= 8 ? 'Moderate' : 'Low';

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Initial Investment / Value', value: initial, set: setInitial, min: 1000, max: 10000000, step: 1000, display: fmtL(initial) },
          { label: 'Final Value', value: final, set: setFinal, min: 1000, max: 50000000, step: 1000, display: fmtL(final) },
          { label: 'Number of Years', value: years, set: setYears, min: 1, max: 30, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-blue-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-blue-600 rounded-full" />
          </div>
        ))}

        <button type="button" onClick={handle} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate CAGR
        </button>
      </div>

      <div className="space-y-3">
        {result !== null ? (
          <>
            <div className="bg-blue-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">CAGR</p>
              <p className="text-3xl font-bold">{result.toFixed(2)}%</p>
              <p className="text-sm opacity-90 mt-0.5 font-medium">{ratingLabel} Return</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Initial Value', value: fmtL(initial) },
                { label: 'Final Value', value: fmtL(final) },
                { label: 'Total Gain', value: fmtL(final - initial) },
                { label: 'Absolute Return', value: `${((final / initial - 1) * 100).toFixed(1)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Benchmark Comparison</p>
              {[
                { label: 'FD Return', rate: 7.0, color: 'bg-slate-300' },
                { label: 'PPF Rate',  rate: 7.1, color: 'bg-amber-300' },
                { label: 'Nifty 50 (approx)', rate: 13.0, color: 'bg-blue-300' },
                { label: 'Your CAGR', rate: result, color: 'bg-green-400' },
              ].map(({ label, rate, color }) => (
                <div key={label} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-slate-500 w-32 shrink-0">{label}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min(100, (rate / 30) * 100)}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold w-12 text-right ${label === 'Your CAGR' ? ratingColor : 'text-slate-600'}`}>{rate.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter values and click<br /><strong>Calculate CAGR</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare CAGR for different investments." />
    </div>

</>
  );
}
