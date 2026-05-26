'use client';

import { useState } from 'react';
import { calculateInflation } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { TrendingDown } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function InflationCalc() {
  const [amount, setAmount]       = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears]         = useState(10);
  const [result, setResult]       = useState<ReturnType<typeof calculateInflation> | null>(null);
  const [history, addRecord] = useCalculationHistory('inflation-calculator');

  const handle = () => {
    const res = calculateInflation(amount, inflation, years);
    setResult(res);
    addRecord({
      label: `${fmtL(amount)} · ${inflation}% · ${years}yr`,
      metrics: [
        { key: 'Future Cost', value: fmtL(res.futureValue) },
        { key: 'Loss',        value: fmtL(res.purchasingPowerLoss) },
        { key: 'Pwr Today',  value: `${(amount / res.futureValue * 100).toFixed(0)}%` },
        { key: 'Rate',        value: `${inflation}%` },
      ],
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Present Value / Amount', value: amount, set: setAmount, min: 10000, max: 10000000, step: 10000, display: fmtL(amount) },
          { label: 'Expected Inflation Rate', value: inflation, set: setInflation, min: 1, max: 20, step: 0.5, display: `${inflation}%` },
          { label: 'Number of Years', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-red-500">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-red-500 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Inflation Impact
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-red-500 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Future Cost in {years} Years</p>
              <p className="text-2xl font-bold">{fmtL(result.futureValue)}</p>
              <p className="text-xs opacity-90 mt-0.5">Today&apos;s {fmtL(amount)} will cost this much</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Today\'s Value',    value: fmtL(amount), color: 'text-slate-800' },
                { label: 'Future Value',      value: fmtL(result.futureValue), color: 'text-red-500' },
                { label: 'Purchasing Power',  value: `${(amount / result.futureValue * 100).toFixed(1)}%`, color: 'text-amber-600' },
                { label: 'Power Loss',        value: fmtL(result.purchasingPowerLoss), color: 'text-red-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700">
              <p className="font-semibold text-slate-600 mb-2">What {fmtL(amount)} buys over time:</p>
              {[0, Math.floor(years/2), years].map(y => {
                const { futureValue } = calculateInflation(amount, inflation, y || 0);
                const power = y === 0 ? 100 : (amount / futureValue * 100);
                return (
                  <div key={y} className="flex items-center gap-2 mb-1.5">
                    <span className="text-slate-500 w-16">Year {y}</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-400" style={{ width: `${power}%` }} />
                    </div>
                    <span className="font-semibold text-slate-700 w-10 text-right">{power.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter values and click<br /><strong>Calculate Inflation Impact</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare inflation impact at different rates." />
    </div>

</>
  );
}
