'use client';

import { useState } from 'react';
import { calculateFD } from '@/lib/calculators/fd-rd';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';
import { Landmark } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const FREQ_OPTIONS = [
  { label: 'Monthly', value: 12 as 1 | 2 | 4 | 12 },
  { label: 'Quarterly', value: 4 as 1 | 2 | 4 | 12 },
  { label: 'Semi-Ann.', value: 2 as 1 | 2 | 4 | 12 },
  { label: 'Annual', value: 1 as 1 | 2 | 4 | 12 },
];

export function FDCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate]           = useState(7.5);
  const [months, setMonths]       = useState(12);
  const [freq, setFreq]           = useState<1 | 2 | 4 | 12>(4);
  const [result, setResult]       = useState<ReturnType<typeof calculateFD> | null>(null);
  const [history, setHistory]     = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]             = useState(0);

  const handle = () => {
    const res = calculateFD(principal, rate, months, freq);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtL(principal)} · ${rate}% · ${months}mo`,
      metrics: [
        { key: 'Maturity',  value: fmtINR(res.maturityAmount) },
        { key: 'Interest',  value: fmtINR(res.interestEarned) },
        { key: 'Eff. Rate', value: `${res.effectiveAnnualRate.toFixed(2)}%` },
        { key: 'Freq',      value: FREQ_OPTIONS.find(f => f.value === freq)?.label ?? '' },
      ],
    }, ...prev].slice(0, 3));
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Principal Amount', value: principal, set: setPrincipal, min: 1000, max: 10000000, step: 1000, display: fmtL(principal) },
          { label: 'Annual Interest Rate', value: rate, set: setRate, min: 3, max: 12, step: 0.05, display: `${rate}%` },
          { label: 'Tenure (Months)', value: months, set: setMonths, min: 1, max: 120, step: 1, display: `${months} mo (${(months / 12).toFixed(1)} yr)` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-blue-700">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-blue-700 rounded-full" />
          </div>
        ))}
        <div>
          <p className="text-xs font-medium text-slate-600 mb-1.5">Compounding Frequency</p>
          <div className="grid grid-cols-4 gap-1">
            {FREQ_OPTIONS.map(({ label, value }) => (
              <button key={value} onClick={() => setFreq(value)}
                className={`py-1 rounded-lg text-[10px] font-semibold transition-colors ${freq === value ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={handle} className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate FD Returns
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-blue-700 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-blue-100 mb-1">Maturity Amount</p>
                <p className="text-2xl font-bold">{fmtINR(result.maturityAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-300">Interest</p>
                <p className="text-lg font-bold text-blue-100">{fmtINR(result.interestEarned)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Principal', value: fmtINR(principal) },
                { label: 'Interest Earned', value: fmtINR(result.interestEarned) },
                { label: 'Effective Rate', value: `${result.effectiveAnnualRate.toFixed(2)}%` },
                { label: 'Total Return', value: `${(result.interestEarned / principal * 100).toFixed(1)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-2">Frequency Comparison (same rate)</p>
              {FREQ_OPTIONS.map(({ label, value }) => {
                const { maturityAmount } = calculateFD(principal, rate, months, value);
                return (
                  <div key={value} className={`flex justify-between py-1.5 border-b border-slate-100 last:border-0 ${value === freq ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                    <span>{label}</span><span>{fmtINR(maturityAmount)}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter FD details and click<br /><strong>Calculate FD Returns</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare FD returns at different banks/rates." />
    </div>

    {/* Personalised bank FD rate comparison */}
    <FdRateTable principal={principal} tenureYears={Math.max(1, months / 12)} mode="fd" />
    </>
  );
}
