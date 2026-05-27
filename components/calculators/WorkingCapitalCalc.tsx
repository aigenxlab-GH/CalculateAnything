'use client';

import { useState } from 'react';
import { calculateWorkingCapital } from '@/lib/calculators/business';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BarChart3 } from 'lucide-react';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function WorkingCapitalCalc() {
  const [currentAssets, setCurrentAssets]   = useState(2000000);
  const [currentLiab, setCurrentLiab]       = useState(1000000);
  const [inventory, setInventory]           = useState(500000);
  const [cash, setCash]                     = useState(300000);
  const [annualRev, setAnnualRev]           = useState(10000000);
  const [result, setResult]                 = useState<ReturnType<typeof calculateWorkingCapital> | null>(null);
  const [history, addRecord]                = useCalculationHistory('working-capital');

  const handle = () => {
    const res = calculateWorkingCapital(currentAssets, currentLiab, inventory, cash, annualRev);
    setResult(res);
    addRecord({
      label: `CA ${fmtL(currentAssets)} / CL ${fmtL(currentLiab)}`,
      metrics: [
        { key: 'WC',          value: fmtL(res.workingCapital) },
        { key: 'Curr Ratio',  value: res.currentRatio.toFixed(2) },
        { key: 'Quick Ratio', value: res.quickRatio.toFixed(2) },
        { key: 'Cash Ratio',  value: res.cashRatio.toFixed(2) },
      ],
    });
  };

  const ratingColor = (ratio: number, good: number, warn: number) =>
    ratio >= good ? 'text-green-600' : ratio >= warn ? 'text-amber-600' : 'text-red-500';
  const ratingLabel = (ratio: number, good: number, warn: number) =>
    ratio >= good ? 'Healthy' : ratio >= warn ? 'Acceptable' : 'Weak';

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Current Assets', value: currentAssets, set: setCurrentAssets, min: 0, max: 100000000, step: 50000, display: fmtL(currentAssets) },
          { label: 'Current Liabilities', value: currentLiab, set: setCurrentLiab, min: 0, max: 100000000, step: 50000, display: fmtL(currentLiab) },
          { label: 'Inventory', value: inventory, set: setInventory, min: 0, max: 50000000, step: 50000, display: fmtL(inventory) },
          { label: 'Cash & Equivalents', value: cash, set: setCash, min: 0, max: 50000000, step: 50000, display: fmtL(cash) },
          { label: 'Annual Revenue', value: annualRev, set: setAnnualRev, min: 0, max: 1000000000, step: 500000, display: fmtL(annualRev) },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-cyan-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-cyan-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold rounded-xl transition-colors">
          Analyse Working Capital
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className={`rounded-2xl p-4 text-white ${result.workingCapital >= 0 ? 'bg-cyan-600' : 'bg-red-500'}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Working Capital</p>
              <p className="text-2xl font-bold">{fmtL(result.workingCapital)}</p>
              <p className="text-xs opacity-90 mt-0.5">
                {result.workingCapital >= 0 ? 'Positive — business can meet short-term obligations' : 'Negative — liquidity concern!'}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Current Ratio', value: result.currentRatio, desc: 'Current Assets / Current Liabilities', good: 2, warn: 1, suffix: 'x' },
                { label: 'Quick Ratio', value: result.quickRatio, desc: '(Current Assets – Inventory) / Current Liab.', good: 1.5, warn: 1, suffix: 'x' },
                { label: 'Cash Ratio', value: result.cashRatio, desc: 'Cash & Equiv / Current Liabilities', good: 1, warn: 0.5, suffix: 'x' },
              ].map(({ label, value, desc, good, warn, suffix }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${ratingColor(value, good, warn)}`}>
                      {ratingLabel(value, good, warn)}
                    </p>
                  </div>
                  <span className={`text-xl font-bold ${ratingColor(value, good, warn)}`}>{value.toFixed(2)}{suffix}</span>
                </div>
              ))}
              {result.workingCapitalTurnover && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">WC Turnover</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Revenue / Working Capital</p>
                  </div>
                  <span className="text-xl font-bold text-cyan-600">{result.workingCapitalTurnover.toFixed(2)}x</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-500 text-center">Enter balance sheet values and click<br /><strong>Analyse Working Capital</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare liquidity ratios across periods." />
    </div>
    <BusinessToolTable variant="loans" contextValue={result?.workingCapital} />
    </>
  );
}
