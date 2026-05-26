'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateNPS } from '@/lib/calculators/savings';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { Umbrella } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function NPSCalc() {
  const [monthly, setMonthly]   = useState(5000);
  const [years, setYears]       = useState(30);
  const [retRate, setRetRate]   = useState(10);
  const [annuityRate, setAnnuityRate] = useState(6);
  const [result, setResult]     = useState<ReturnType<typeof calculateNPS> | null>(null);
  const [history, addRecord] = useCalculationHistory('nps-calculator');

  const handle = () => {
    const res = calculateNPS(monthly, years, retRate, annuityRate);
    setResult(res);
    addRecord({
      label: `₹${monthly.toLocaleString('en-IN')}/mo · ${years}yr`,
      metrics: [
        { key: 'Corpus',    value: fmtL(res.totalCorpus) },
        { key: 'Lumpsum',   value: fmtL(res.lumpsum) },
        { key: 'Pension',   value: fmtINR(res.estimatedMonthlyPension) + '/mo' },
        { key: 'Annuity',   value: fmtL(res.annuityCorpus) },
      ],
    });
  };

  const chartData = result ? [
    { name: 'Lumpsum (60%)', value: Math.round(result.lumpsum) },
    { name: 'Annuity (40%)', value: Math.round(result.annuityCorpus) },
  ] : [];
  const PIE_COLORS = ['#0284c7', '#7c3aed'];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Monthly Contribution', value: monthly, set: setMonthly, min: 500, max: 100000, step: 500, display: fmtINR(monthly) },
          { label: 'Investment Period (Years)', value: years, set: setYears, min: 5, max: 40, step: 1, display: `${years} yrs` },
          { label: 'Expected Return (p.a.)', value: retRate, set: setRetRate, min: 5, max: 20, step: 0.5, display: `${retRate}%` },
          { label: 'Annuity Rate', value: annuityRate, set: setAnnuityRate, min: 4, max: 10, step: 0.5, display: `${annuityRate}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-sky-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-sky-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate NPS Corpus
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-sky-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Total NPS Corpus</p>
              <p className="text-2xl font-bold">{fmtL(result.totalCorpus)}</p>
              <p className="text-xs opacity-90 mt-0.5">Monthly Pension: <strong>{fmtINR(result.estimatedMonthlyPension)}</strong></p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Lumpsum (60%)', value: fmtL(result.lumpsum), color: 'text-sky-600' },
                { label: 'Annuity (40%)', value: fmtL(result.annuityCorpus), color: 'text-violet-600' },
                { label: 'Total Invested', value: fmtL(result.totalInvested), color: 'text-slate-800' },
                { label: 'Monthly Pension', value: fmtINR(result.estimatedMonthlyPension), color: 'text-green-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-1">Corpus Split</p>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
                    {chartData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter contribution and click<br /><strong>Calculate NPS Corpus</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare NPS scenarios at different rates." />
    </div>

    {/* Where to open / track NPS */}
    <PensionProviderTable scheme="nps" contribution={monthly} projectedValue={result?.totalCorpus} />
    </>
  );
}
