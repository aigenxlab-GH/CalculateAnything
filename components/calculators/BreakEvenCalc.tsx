'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateBreakEven } from '@/lib/calculators/business';

const BreakEvenBarChart = dynamic(
  () => import('./BreakEvenBarChart').then((m) => m.BreakEvenBarChart),
  {
    ssr: false,
    loading: () => <div className="h-[130px] bg-slate-50 animate-pulse rounded-xl" />,
  }
);
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Activity } from 'lucide-react';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';
import { NumericStepper } from '@/components/ui/NumericStepper';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);
const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (!isFinite(n)) return '∞';
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function BreakEvenCalc() {
  const [fixedCosts, setFixedCosts]   = useState(500000);
  const [varCost, setVarCost]         = useState(500);
  const [sellPrice, setSellPrice]     = useState(1000);
  const [capacity, setCapacity]       = useState(2000);
  const [result, setResult]           = useState<ReturnType<typeof calculateBreakEven> | null>(null);
  const [history, addRecord]          = useCalculationHistory('break-even');

  const computeAndStore = (fc: number, vc: number, sp: number, cap: number) => {
    const res = calculateBreakEven(fc, vc, sp, cap);
    setResult(res);
    addRecord({
      label: `FC ${fmtL(fc)} · Price ${fmtINR(sp)}`,
      metrics: [
        { key: 'BEP Units', value: fmt(Math.ceil(res.breakEvenUnits)) },
        { key: 'BEP Rev',   value: fmtL(res.breakEvenRevenue) },
        { key: 'CM',        value: fmtINR(res.contributionMargin) },
        { key: 'CM Ratio',  value: `${res.contributionMarginRatio.toFixed(1)}%` },
      ],
    });
  };

  const handle = () => computeAndStore(fixedCosts, varCost, sellPrice, capacity);

  const tryExample = () => {
    const exFc = 500000; const exVc = 500; const exSp = 1000; const exCap = 2000;
    setFixedCosts(exFc); setVarCost(exVc); setSellPrice(exSp); setCapacity(exCap);
    computeAndStore(exFc, exVc, exSp, exCap);
  };

  const chartData = result ? [
    { name: 'Fixed Costs', value: fixedCosts, fill: '#f87171' },
    { name: 'BEP Revenue', value: Math.round(result.breakEvenRevenue), fill: '#fbbf24' },
    { name: 'Profit at Cap', value: Math.max(0, result.profitAtCapacity), fill: '#4ade80' },
  ] : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Fixed Costs (monthly/annual)', value: fixedCosts, set: setFixedCosts, min: 10000, max: 10000000, step: 10000, display: fmtL(fixedCosts) },
          { label: 'Variable Cost per Unit', value: varCost, set: setVarCost, min: 1, max: 50000, step: 10, display: fmtINR(varCost) },
          { label: 'Selling Price per Unit', value: sellPrice, set: setSellPrice, min: 1, max: 100000, step: 10, display: fmtINR(sellPrice) },
          { label: 'Production Capacity (units)', value: capacity, set: setCapacity, min: 100, max: 100000, step: 100, display: fmt(capacity) + ' units' },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-amber-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-amber-500 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Break-Even
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-amber-500 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Break-Even Point</p>
              <p className="text-2xl font-bold">{isFinite(result.breakEvenUnits) ? fmt(Math.ceil(result.breakEvenUnits)) + ' units' : 'Not achievable'}</p>
              <p className="text-xs opacity-90 mt-0.5">Revenue needed: {fmtL(result.breakEvenRevenue)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'BEP Units', value: isFinite(result.breakEvenUnits) ? fmt(Math.ceil(result.breakEvenUnits)) : '∞' },
                { label: 'BEP Revenue', value: fmtL(result.breakEvenRevenue) },
                { label: 'Contribution Margin', value: fmtINR(result.contributionMargin) },
                { label: 'CM Ratio', value: `${result.contributionMarginRatio.toFixed(1)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 text-center mb-2">Financial Overview</p>
              <BreakEvenBarChart data={chartData} />
            </div>
            {result.profitAtCapacity > 0 && (
              <div className="bg-green-50 rounded-xl p-3 text-xs text-green-800">
                <p className="font-medium">At Full Capacity ({fmt(capacity)} units):</p>
                <p className="mt-0.5">Revenue: {fmtL(capacity * sellPrice)} · Profit: <strong>{fmtL(result.profitAtCapacity)}</strong></p>
                <p className="mt-0.5 text-green-600">Utilization needed for BEP: {((result.breakEvenUnits / capacity) * 100).toFixed(1)}%</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter costs and click<br /><strong>Calculate Break-Even</strong></p>
            <button type="button" onClick={tryExample}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors font-medium">
              Try: ₹5L fixed, ₹500 var, ₹1000 price
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare break-even at different price points." />
    </div>
    <BusinessToolTable variant="accounting" contextValue={result?.breakEvenRevenue} />
    </>
  );
}
