'use client';

import { useState } from 'react';
import { calculateCompounding } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Zap } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const FREQ_OPTIONS = [
  { label: 'Annual',    value: 1 },
  { label: 'Semi-Ann.', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly',   value: 12 },
];

export function CompoundingCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate]           = useState(10);
  const [years, setYears]         = useState(10);
  const [freq, setFreq]           = useState(4);
  const [result, setResult]       = useState<ReturnType<typeof calculateCompounding> | null>(null);
  const [history, addRecord]      = useCalculationHistory('compounding-calculator');

  const computeAndStore = (p: number, r: number, y: number, fr: number) => {
    const res = calculateCompounding(p, r, y, fr);
    setResult(res);
    addRecord({
      label: `${fmtL(p)} · ${r}% · ${y}yr`,
      metrics: [
        { key: 'Maturity',  value: fmtL(res.maturityAmount) },
        { key: 'Interest',  value: fmtL(res.interestEarned) },
        { key: 'Freq',      value: FREQ_OPTIONS.find(f => f.value === fr)?.label ?? '' },
        { key: 'Gain',      value: `${(res.interestEarned / p * 100).toFixed(0)}%` },
      ],
    });
  };

  const handle = () => { computeAndStore(principal, rate, years, freq); trackCalculate('compounding-calculator'); };

  const tryExample = () => {
    const p = 100000, r = 10, y = 10, fr = 4;
    setPrincipal(p); setRate(r); setYears(y); setFreq(fr);
    computeAndStore(p, r, y, fr);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Principal Amount', value: principal, set: setPrincipal, min: 1000, max: 10000000, step: 1000, display: fmtL(principal) },
          { label: 'Annual Interest Rate', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-yellow-700 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-yellow-500 rounded-full" />
          </div>
        ))}

        <div>
          <p className="text-xs font-medium text-slate-600 mb-1.5">Compounding Frequency</p>
          <div className="grid grid-cols-4 gap-1">
            {FREQ_OPTIONS.map(({ label, value }) => (
              <button key={value} onClick={() => setFreq(value)}
                className={`py-1 rounded-lg text-[10px] font-semibold transition-colors ${freq === value ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={handle} className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Compound Interest
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-yellow-500 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-yellow-100 mb-1">Maturity Amount</p>
                <p className="text-2xl font-bold">{fmtL(result.maturityAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-yellow-200">Interest</p>
                <p className="text-lg font-bold text-yellow-100">{fmtL(result.interestEarned)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Principal', value: fmtL(principal) },
                { label: 'Interest Earned', value: fmtL(result.interestEarned) },
                { label: 'Total Amount', value: fmtL(result.maturityAmount) },
                { label: 'Effective Gain', value: `${(result.interestEarned / principal * 100).toFixed(1)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-xs">
              <p className="font-semibold text-slate-600 mb-2">Frequency Comparison (same rate)</p>
              {FREQ_OPTIONS.map(({ label, value }) => {
                const { maturityAmount } = calculateCompounding(principal, rate, years, value);
                return (
                  <div key={value} className={`flex justify-between py-1.5 border-b border-slate-100 last:border-0 ${value === freq ? 'font-bold text-yellow-700' : 'text-slate-600'}`}>
                    <span>{label}</span>
                    <span>{fmtL(maturityAmount)}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter values and click<br /><strong>Calculate Compound Interest</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-lg transition-colors border border-yellow-200">
              Try: ₹1L · 10% · 10 yrs · Quarterly
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare compound interest at different rates." />
    </div>

</>
  );
}
