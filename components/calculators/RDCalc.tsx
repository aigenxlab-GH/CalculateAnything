'use client';

import { useState } from 'react';
import { calculateRD } from '@/lib/calculators/fd-rd';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { FdRateTable } from '@/components/calculators/comparison/FdRateTable';
import { PiggyBank } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function RDCalc() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate]       = useState(7.0);
  const [months, setMonths]   = useState(24);
  const [result, setResult]   = useState<ReturnType<typeof calculateRD> | null>(null);
  const [history, addRecord]  = useCalculationHistory('rd-calculator');

  const computeAndStore = (mo: number, r: number, mn: number) => {
    const res = calculateRD(mo, r, mn);
    setResult(res);
    addRecord({
      label: `${fmtINR(mo)}/mo · ${r}% · ${mn}mo`,
      metrics: [
        { key: 'Maturity',  value: fmtINR(res.maturityAmount) },
        { key: 'Interest',  value: fmtINR(res.interestEarned) },
        { key: 'Deposited', value: fmtINR(res.totalDeposited) },
        { key: 'Gain',      value: `${(res.interestEarned / res.totalDeposited * 100).toFixed(1)}%` },
      ],
    });
  };

  const handle = () => computeAndStore(monthly, rate, months);

  const tryExample = () => {
    const mo = 5000, r = 7.0, mn = 24;
    setMonthly(mo); setRate(r); setMonths(mn);
    computeAndStore(mo, r, mn);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Monthly Deposit', value: monthly, set: setMonthly, min: 100, max: 100000, step: 100, display: fmtINR(monthly) },
          { label: 'Annual Interest Rate', value: rate, set: setRate, min: 3, max: 12, step: 0.05, display: `${rate}%` },
          { label: 'Tenure (Months)', value: months, set: setMonths, min: 6, max: 120, step: 6, display: `${months} mo (${(months / 12).toFixed(1)} yr)` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-pink-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-pink-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate RD Returns
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-pink-600 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-pink-100 mb-1">Maturity Amount</p>
                <p className="text-2xl font-bold">{fmtINR(result.maturityAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-pink-300">Interest</p>
                <p className="text-lg font-bold text-pink-100">{fmtINR(result.interestEarned)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Total Deposited', value: fmtL(result.totalDeposited) },
                { label: 'Interest Earned', value: fmtINR(result.interestEarned) },
                { label: 'Gain %', value: `${(result.interestEarned / result.totalDeposited * 100).toFixed(1)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-pink-50 rounded-xl p-3 text-xs text-pink-800">
              <p className="font-medium">RD Details:</p>
              <p className="mt-1">Monthly Deposit: <strong>{fmtINR(monthly)}</strong></p>
              <p>For {months} months = Total: <strong>{fmtINR(result.totalDeposited)}</strong></p>
              <p className="mt-1 text-pink-600">Compounded quarterly per Indian bank standard</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter RD details and click<br /><strong>Calculate RD Returns</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold rounded-lg transition-colors border border-pink-200">
              Try: ₹5K/mo · 7% · 24 mo
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare RD returns at different rates." />
    </div>

    {/* Personalised bank RD rate comparison */}
    <FdRateTable principal={monthly} tenureYears={Math.max(1, months / 12)} mode="rd" />
    </>
  );
}
