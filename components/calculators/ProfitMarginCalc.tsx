'use client';

import { useState } from 'react';
import { calculateProfitMargin } from '@/lib/calculators/business';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { PieChart as PieIcon } from 'lucide-react';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function ProfitMarginCalc() {
  const [revenue, setRevenue]   = useState(1000000);
  const [cogs, setCogs]         = useState(600000);
  const [opex, setOpex]         = useState(150000);
  const [other, setOther]       = useState(50000);
  const [result, setResult]     = useState<ReturnType<typeof calculateProfitMargin> | null>(null);
  const [history, addRecord]    = useCalculationHistory('profit-margin');

  const computeAndStore = (rev: number, c: number, op: number, ot: number) => {
    const res = calculateProfitMargin(rev, c, op, ot);
    setResult(res);
    addRecord({
      label: `Revenue ${fmtL(rev)}`,
      metrics: [
        { key: 'Gross',   value: `${res.grossMargin.toFixed(1)}%` },
        { key: 'Oper.',   value: `${res.operatingMargin.toFixed(1)}%` },
        { key: 'Net',     value: `${res.netMargin.toFixed(1)}%` },
        { key: 'Markup',  value: `${res.markupPercent.toFixed(1)}%` },
      ],
    });
  };

  const handle = () => { computeAndStore(revenue, cogs, opex, other); trackCalculate('profit-margin'); };

  const tryExample = () => {
    const exRev = 1000000; const exCogs = 600000; const exOpex = 150000; const exOther = 50000;
    setRevenue(exRev); setCogs(exCogs); setOpex(exOpex); setOther(exOther);
    computeAndStore(exRev, exCogs, exOpex, exOther);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Total Revenue', value: revenue, set: setRevenue, min: 10000, max: 100000000, step: 10000, display: fmtL(revenue) },
          { label: 'Cost of Goods Sold (COGS)', value: cogs, set: setCogs, min: 0, max: 100000000, step: 10000, display: fmtL(cogs) },
          { label: 'Operating Expenses', value: opex, set: setOpex, min: 0, max: 10000000, step: 5000, display: fmtL(opex) },
          { label: 'Other Expenses (Tax/Interest)', value: other, set: setOther, min: 0, max: 10000000, step: 5000, display: fmtL(other) },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-violet-700 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-violet-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Margins
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Gross Margin', value: `${result.grossMargin.toFixed(1)}%`, color: result.grossMargin > 30 ? 'bg-green-500' : result.grossMargin > 15 ? 'bg-amber-500' : 'bg-red-500' },
                { label: 'Operating', value: `${result.operatingMargin.toFixed(1)}%`, color: result.operatingMargin > 15 ? 'bg-green-500' : result.operatingMargin > 5 ? 'bg-amber-500' : 'bg-red-500' },
                { label: 'Net Margin', value: `${result.netMargin.toFixed(1)}%`, color: result.netMargin > 10 ? 'bg-green-500' : result.netMargin > 3 ? 'bg-amber-500' : 'bg-red-500' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`${color} text-white rounded-xl p-3 text-center`}>
                  <p className="text-[10px] opacity-80 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 px-4 pt-3 pb-2">P&L Summary</p>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Item', 'Amount', 'Margin'].map(h =>
                    <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Revenue', revenue, '100%'],
                    ['COGS', -cogs, `–${(cogs / revenue * 100).toFixed(1)}%`],
                    ['Gross Profit', result.grossProfit, `${result.grossMargin.toFixed(1)}%`],
                    ['Operating Exp.', -opex, `–${(opex / revenue * 100).toFixed(1)}%`],
                    ['Operating Profit', result.operatingProfit, `${result.operatingMargin.toFixed(1)}%`],
                    ['Other Expenses', -other, `–${(other / revenue * 100).toFixed(1)}%`],
                    ['Net Profit', result.netProfit, `${result.netMargin.toFixed(1)}%`],
                  ].map(([k, v, m]) => (
                    <tr key={String(k)} className={`hover:bg-slate-50 ${String(k) === 'Net Profit' ? 'font-bold' : ''}`}>
                      <td className="px-3 py-2 text-slate-700">{k}</td>
                      <td className={`px-3 py-2 ${Number(v) < 0 ? 'text-red-600' : 'text-slate-800'}`}>{Number(v) < 0 ? `–${fmtINR(-Number(v))}` : fmtINR(Number(v))}</td>
                      <td className={`px-3 py-2 ${Number(v) < 0 ? 'text-red-400' : 'text-green-700'}`}>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700">
              <p className="font-semibold text-slate-600">Markup: <span className="text-violet-700">{result.markupPercent.toFixed(1)}%</span></p>
              <p className="text-slate-500 text-[10px] mt-0.5">Gross Profit / COGS × 100</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter financials and click<br /><strong>Calculate Margins</strong></p>
            <button type="button" onClick={tryExample}
              className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition-colors font-medium">
              Try: ₹10L revenue, ₹6L COGS
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare margins across different revenue levels." />
    </div>
    <BusinessToolTable variant="accounting" contextValue={revenue} />
    </>
  );
}
