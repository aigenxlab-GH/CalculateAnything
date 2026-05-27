'use client';

import { useState } from 'react';
import { calculateDSCR } from '@/lib/calculators/business';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { ShieldCheck } from 'lucide-react';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function DSCRCalc() {
  const [noi, setNoi]           = useState(5000000);
  const [principal, setPrincipal] = useState(2000000);
  const [interest, setInterest] = useState(1000000);
  const [result, setResult]     = useState<ReturnType<typeof calculateDSCR> | null>(null);
  const [history, addRecord]    = useCalculationHistory('dscr-calculator');

  const handle = () => {
    const res = calculateDSCR(noi, principal, interest);
    setResult(res);
    addRecord({
      label: `NOI ${fmtL(noi)}`,
      metrics: [
        { key: 'DSCR',    value: res.dscr.toFixed(2) + 'x' },
        { key: 'Rating',  value: res.rating },
        { key: 'Debt Svc', value: fmtL(res.annualDebtService) },
        { key: 'Surplus', value: fmtL(Math.abs(res.surplusDeficit)) },
      ],
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Net Operating Income (Annual)', value: noi, set: setNoi, min: 100000, max: 100000000, step: 100000, display: fmtL(noi) },
          { label: 'Annual Principal Repayment', value: principal, set: setPrincipal, min: 0, max: 50000000, step: 100000, display: fmtL(principal) },
          { label: 'Annual Interest Payment', value: interest, set: setInterest, min: 0, max: 50000000, step: 100000, display: fmtL(interest) },
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
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          <p className="font-semibold mb-1.5">DSCR Benchmarks:</p>
          {[['≥ 2.0x', 'Excellent — strong creditworthiness', '#22c55e'],
            ['1.5–2.0x', 'Good — comfortable coverage', '#84cc16'],
            ['1.25–1.5x', 'Acceptable — normal lending zone', '#f59e0b'],
            ['1.0–1.25x', 'Marginal — lenders may hesitate', '#f97316'],
            ['< 1.0x', 'Poor — default risk', '#ef4444'],
          ].map(([range, label, color]) => (
            <div key={range} className="flex gap-2 mb-1">
              <span className="font-semibold w-20 shrink-0" style={{ color }}>{range}</span>
              <span className="text-slate-500">{label}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={handle} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate DSCR
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="rounded-2xl p-4 text-white" style={{ backgroundColor: result.ratingColor }}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">DSCR</p>
              <p className="text-3xl font-bold">{result.dscr.toFixed(2)}x</p>
              <p className="text-sm font-semibold mt-0.5 opacity-95">{result.rating}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Net Operating Income', value: fmtL(noi) },
                { label: 'Annual Debt Service', value: fmtL(result.annualDebtService) },
                { label: result.surplusDeficit >= 0 ? 'Surplus' : 'Deficit', value: fmtL(Math.abs(result.surplusDeficit)), color: result.surplusDeficit >= 0 ? 'text-green-600' : 'text-red-500' },
                { label: 'DSCR', value: `${result.dscr.toFixed(2)}x`, color: 'text-indigo-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`text-sm font-bold ${color ?? 'text-slate-800'}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 px-4 pt-3 pb-2">Calculation</p>
              <div className="divide-y divide-slate-100 px-4 py-2 text-xs">
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Net Operating Income</span>
                  <span className="font-semibold">{fmtL(noi)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Annual Principal</span>
                  <span className="font-semibold text-red-400">–{fmtL(principal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Annual Interest</span>
                  <span className="font-semibold text-red-400">–{fmtL(interest)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t border-slate-200">
                  <span className="text-slate-700">DSCR = {fmtL(noi)} ÷ {fmtL(result.annualDebtService)}</span>
                  <span style={{ color: result.ratingColor }}>{result.dscr.toFixed(2)}x</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-500 text-center">Enter values and click<br /><strong>Calculate DSCR</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare DSCR for different debt structures." />
    </div>
    <BusinessToolTable variant="loans" contextValue={noi} />
    </>
  );
}
