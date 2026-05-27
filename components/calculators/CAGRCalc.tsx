'use client';

import { useState } from 'react';
import { calculateCAGR } from '@/lib/calculators/sip';
import { StockBrokerTable } from '@/components/calculators/comparison/StockBrokerTable';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BarChart2 } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';

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
  const [history, addRecord] = useCalculationHistory('cagr-calculator');

  const computeAndStore = (ini: number, fin: number, y: number) => {
    const cagr = calculateCAGR(ini, fin, y);
    setResult(cagr);
    addRecord({
      label: `${fmtL(ini)} → ${fmtL(fin)}`,
      metrics: [
        { key: 'CAGR',     value: `${cagr.toFixed(2)}%` },
        { key: 'Years',    value: `${y} yr` },
        { key: 'Gain',     value: fmtL(fin - ini) },
        { key: 'Abs Ret',  value: `${((fin / ini - 1) * 100).toFixed(0)}%` },
      ],
    });
  };

  const handle = () => computeAndStore(initial, final, years);

  const tryExample = () => {
    const ini = 100000, fin = 250000, y = 5;
    setInitial(ini); setFinal(fin); setYears(y);
    computeAndStore(ini, fin, y);
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
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-blue-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
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
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
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
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter values and click<br /><strong>Calculate CAGR</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors border border-blue-200">
              Try: ₹1L → ₹2.5L · 5 yrs
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare CAGR for different investments." />
    </div>
    <StockBrokerTable tradeValue={initial} />
</>
  );
}
