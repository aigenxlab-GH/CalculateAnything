'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { calculatePPC, type PPCResult } from '@/lib/calculators/ppc';
import { TrendingUp } from 'lucide-react';
import { BusinessToolTable } from '@/components/calculators/comparison/BusinessToolTable';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
const fmtNum = (n: number) => new Intl.NumberFormat('en-US').format(Math.round(n));

function NumInput({ label, value, onChange, min, max, step, prefix, suffix, hint }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-1 mb-1">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        {hint && <span className="text-[10px] text-slate-400">({hint})</span>}
      </div>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-slate-400 text-xs">{prefix}</span>}
        <input type="number" value={value} onChange={(e) => onChange(+e.target.value)}
          min={min} max={max} step={step}
          className={`w-full border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'}`} />
        {suffix && <span className="absolute right-3 text-slate-400 text-xs">{suffix}</span>}
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? 'bg-purple-600 text-white' : 'bg-slate-50 border border-slate-100'}`}>
      <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${highlight ? 'text-purple-200' : 'text-slate-400'}`}>{label}</p>
      <p className={`text-base font-bold leading-tight ${highlight ? 'text-white' : 'text-slate-800'}`}>{value}</p>
      {sub && <p className={`text-[10px] mt-0.5 ${highlight ? 'text-purple-200' : 'text-slate-400'}`}>{sub}</p>}
    </div>
  );
}

export function PPCCalculator() {
  const [budget, setBudget]       = useState(1000);
  const [cpc, setCpc]             = useState(2.5);
  const [ctr, setCtr]             = useState(3);
  const [convRate, setConvRate]   = useState(2);
  const [revPerConv, setRevPerConv] = useState(50);
  const [result, setResult]       = useState<PPCResult | null>(null);
  const [history, addRecord]      = useCalculationHistory('ppc-calculator');

  const handleCalculate = () => {
    const res = calculatePPC(budget, cpc, ctr, convRate, revPerConv);
    setResult(res);
    addRecord({
      label: `$${budget} · $${cpc} CPC · ${ctr}% CTR`,
      metrics: [
        { key: 'Clicks',      value: fmtNum(res.clicks) },
        { key: 'Conversions', value: fmtNum(res.conversions) },
        { key: 'Revenue',     value: fmtUSD(res.revenue) },
        { key: 'ROAS',        value: `${res.roas.toFixed(2)}x` },
      ],
    });
  };

  const chartData = result
    ? [{ name: 'Budget', value: budget }, { name: 'Revenue', value: +result.revenue.toFixed(2) }]
    : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4 items-start">

      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <NumInput label="Total Budget"     value={budget}    onChange={setBudget}    min={1}    max={100000} step={50}   prefix="$" />
        <NumInput label="Cost Per Click"   value={cpc}       onChange={setCpc}       min={0.01} max={500}    step={0.01} prefix="$" hint="avg CPC" />
        <NumInput label="Click-Through Rate" value={ctr}     onChange={setCtr}       min={0.01} max={100}    step={0.01} suffix="%" hint="2–5% typical" />
        <NumInput label="Conversion Rate"  value={convRate}  onChange={setConvRate}  min={0.01} max={100}    step={0.01} suffix="%" hint="landing page" />
        <NumInput label="Revenue / Conv."  value={revPerConv} onChange={setRevPerConv} min={0}  max={100000} step={1}    prefix="$" />

        <button type="button" onClick={handleCalculate}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          Calculate PPC
        </button>
      </div>

      {/* ── Results ── */}
      <div className="space-y-3">
        {result ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <MetricCard label="Clicks"         value={fmtNum(result.clicks)}         highlight />
              <MetricCard label="Impressions"    value={fmtNum(result.impressions)} />
              <MetricCard label="Conversions"    value={fmtNum(result.conversions)} />
              <MetricCard label="Cost / Conv."   value={result.conversions > 0 ? fmtUSD(result.costPerConversion) : '—'} />
              <MetricCard label="Revenue"        value={fmtUSD(result.revenue)} />
              <MetricCard label="ROAS"           value={`${result.roas.toFixed(2)}x`}
                sub={result.roas >= 1 ? '✓ Profitable' : '✗ Loss'} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">Budget vs Revenue</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtUSD(v) : String(v))} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={i === 0 ? '#7c3aed' : '#fbbf24'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Fill in campaign details and click<br /><strong>Calculate PPC</strong></p>
          </div>
        )}
      </div>

      {/* ── Comparison ── */}
      <ComparisonPanel records={history} emptyText="Calculate a campaign to compare budget scenarios." />
    </div>
    <BusinessToolTable variant="ads" contextValue={budget} />
    </>
  );
}
