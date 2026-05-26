'use client';

import { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateEMI, type EMIResult } from '@/lib/calculators/emi';
import { IndianRupee } from 'lucide-react';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BankRateTable } from '@/components/calculators/BankRateTable';

/* Defers rendering Recharts until the parent container has a real width,
   eliminating the "width(-1) and height(-1)" warning that Recharts logs when
   ResponsiveContainer mounts before CSS grid columns have laid out. */
function SafePie({ data, colors, formatter }: {
  data: { name: string; value: number }[];
  colors: string[];
  formatter: (v: number) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const w = ref.current?.clientWidth ?? 0;
      if (w > 10) setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: 110 }}>
      {ready && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={3} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => (typeof v === 'number' ? formatter(v) : String(v))} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* NOTE: Uses a `mounted` flag instead of dynamic({ ssr:false }) to avoid
   Turbopack chunk-loading issues in Edge incognito (which caused the
   "auto redirect to homepage" bug). On first server render and the initial
   hydration we show a skeleton; after `useEffect` fires we render the real
   calculator. No separate JS chunk to fail-to-load. */

const PIE_COLORS = ['#1d4ed8', '#fbbf24'];

function SliderInput({ label, value, onChange, min, max, step, display }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; display: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-0.5">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <span className="text-sm font-bold text-primary">{display}</span>
      </div>
      <input type="range" value={value} onChange={(e) => onChange(+e.target.value)}
        min={min} max={max} step={step}
        className="w-full h-1.5 accent-primary rounded-full" />
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-2 ${highlight ? 'bg-primary text-white' : 'bg-slate-50 border border-slate-100'}`}>
      <p className={`text-[9px] uppercase tracking-wider mb-0.5 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{label}</p>
      <p className={`text-sm font-bold leading-tight ${highlight ? 'text-white' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

/* Skeleton shown during SSR + first hydration (no Intl, no Recharts) */
function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4 items-start">
      <div className="h-[260px] rounded-2xl bg-slate-100 animate-pulse" />
      <div className="h-[260px] rounded-2xl bg-slate-100 animate-pulse" />
      <div className="h-[260px] rounded-2xl bg-slate-100 animate-pulse" />
    </div>
  );
}

export function EMICalculator() {
  /* Defer browser-only APIs (Intl.NumberFormat, Recharts/ResizeObserver) */
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [principal, setPrincipal]   = useState(500000);
  const [rate, setRate]             = useState(8.5);
  const [tenure, setTenure]         = useState(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult]         = useState<EMIResult>(() => calculateEMI(500000, 8.5, 60));
  const [showTable, setShowTable]   = useState(false);
  const [history, addRecord]        = useCalculationHistory('emi-calculator');

  const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;

  /* Safe formatters — only call Intl after mount; before mount use plain strings */
  const fmtINR = (n: number) => mounted
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
    : `₹${Math.round(n)}`;

  const fmtL = (n: number) => {
    if (!mounted) return `₹${Math.round(n)}`;
    if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
    if (n >= 100_000)    return `₹${(n / 100_000).toFixed(2)} L`;
    return fmtINR(n);
  };

  const handleCalculate = () => {
    const res = calculateEMI(principal, rate, tenureMonths);
    setResult(res);
    addRecord({
      label: `${fmtL(principal)} · ${rate}% · ${tenure}${tenureType === 'years' ? 'yr' : 'mo'}`,
      metrics: [
        { key: 'Monthly EMI',    value: fmtINR(res.monthlyEMI) },
        { key: 'Total Interest', value: fmtL(res.totalInterest) },
        { key: 'Total Payment',  value: fmtL(res.totalPayment) },
        { key: 'Tenure',         value: `${tenureMonths} mo` },
      ],
    });
  };

  /* Show skeleton until client has fully mounted */
  if (!mounted) return <Skeleton />;

  const chartData = [
    { name: 'Principal', value: principal },
    { name: 'Interest',  value: Math.round(result.totalInterest) },
  ];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4 items-start">

      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <SliderInput label="Loan Amount" value={principal} onChange={setPrincipal}
          min={50000} max={10000000} step={50000} display={fmtL(principal)} />
        <SliderInput label="Annual Interest Rate" value={rate} onChange={setRate}
          min={1} max={30} step={0.1} display={`${rate}%`} />
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-xs font-medium text-slate-600">Loan Tenure</label>
            <span className="text-sm font-bold text-primary">{tenure} {tenureType === 'years' ? 'Yrs' : 'Mo'}</span>
          </div>
          <div className="flex gap-1.5 mb-1.5">
            {(['years', 'months'] as const).map((t) => (
              <button key={t} type="button" onClick={() => setTenureType(t)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors capitalize ${tenureType === t ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {t}
              </button>
            ))}
          </div>
          <input type="range" value={tenure} onChange={(e) => setTenure(+e.target.value)}
            min={1} max={tenureType === 'years' ? 30 : 360} step={1}
            className="w-full h-1.5 accent-primary rounded-full" />
        </div>
        <button type="button" onClick={handleCalculate}
          className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          Calculate EMI
        </button>
      </div>

      {/* Results */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Monthly EMI"    value={fmtINR(result.monthlyEMI)}   highlight />
          <StatCard label="Total Interest" value={fmtL(result.totalInterest)} />
          <StatCard label="Total Payment"  value={fmtL(result.totalPayment)} />
          <StatCard label="Tenure"         value={`${tenureMonths} months`} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-2">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-1">Principal vs Interest</p>
          <SafePie data={chartData} colors={PIE_COLORS} formatter={fmtINR} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <button type="button" onClick={() => setShowTable(!showTable)}
            className="w-full flex justify-between items-center px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <span>Amortization Schedule</span>
            <span>{showTable ? '▲' : '▼'}</span>
          </button>
          {showTable && (
            <div className="overflow-x-auto border-t border-slate-100">
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Mo', 'EMI', 'Principal', 'Interest', 'Balance'].map(h =>
                    <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {result.amortization.slice(0, 24).map(r => (
                    <tr key={r.month} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-500">{r.month}</td>
                      <td className="px-3 py-2 font-medium text-slate-700">{fmtINR(r.emi)}</td>
                      <td className="px-3 py-2 text-primary">{fmtINR(r.principal)}</td>
                      <td className="px-3 py-2 text-amber-600">{fmtINR(r.interest)}</td>
                      <td className="px-3 py-2 text-slate-600">{fmtINR(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Comparison */}
      <ComparisonPanel records={history} emptyText="Calculate an EMI to start comparing scenarios." />
    </div>

    {/* Bank rate comparison — full width below the 3-col grid */}
    <BankRateTable principal={principal} tenureMonths={tenureMonths} />
    </>
  );
}
