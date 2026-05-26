'use client';

import { useState } from 'react';
import { calculateSimpleInterest } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';
import { Calculator } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function SimpleInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate]           = useState(8);
  const [years, setYears]         = useState(5);
  const [result, setResult]       = useState<ReturnType<typeof calculateSimpleInterest> | null>(null);
  const [history, addRecord] = useCalculationHistory('simple-interest');

  const handle = () => {
    const res = calculateSimpleInterest(principal, rate, years);
    setResult(res);
    addRecord({
      label: `${fmtL(principal)} · ${rate}% · ${years}yr`,
      metrics: [
        { key: 'Total',    value: fmtINR(res.totalAmount) },
        { key: 'Interest', value: fmtINR(res.interest) },
        { key: 'Rate',     value: `${rate}%` },
        { key: 'Years',    value: `${years}` },
      ],
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Principal Amount', value: principal, set: setPrincipal, min: 1000, max: 10000000, step: 1000, display: fmtL(principal) },
          { label: 'Rate of Interest (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 30, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-slate-700">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-slate-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Simple Interest
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-slate-700 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-300 mb-1">Total Amount</p>
                <p className="text-2xl font-bold">{fmtINR(result.totalAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-300">Interest</p>
                <p className="text-lg font-bold text-slate-200">{fmtINR(result.interest)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Principal',  value: fmtINR(principal) },
                { label: 'SI Amount',  value: fmtINR(result.interest) },
                { label: 'Total',      value: fmtINR(result.totalAmount) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">Formula Breakdown</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">SI = P × R × T / 100</span>
                  <span className="font-bold text-slate-800">= {fmtINR(result.interest)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{fmtINR(principal)} × {rate}% × {years} / 100</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Total = P + SI</span>
                  <span className="font-bold text-slate-800">= {fmtINR(result.totalAmount)}</span>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
              <p className="font-medium">vs Compound Interest (Annual):</p>
              <p className="mt-1 text-amber-700">
                CI would give: <strong>{fmtINR(principal * Math.pow(1 + rate / 100, years))}</strong> —
                Extra: <strong>{fmtINR(principal * Math.pow(1 + rate / 100, years) - result.totalAmount)}</strong>
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter values and click<br /><strong>Calculate Simple Interest</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare simple interest at different rates." />
    </div>

    {/* Compare with bank FD compound interest (closest real-world fit) */}
    <FdRateTable principal={principal} tenureYears={years} mode="fd" />
    </>
  );
}
