'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { calculatePPF } from '@/lib/calculators/savings';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { Shield } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function PPFCalc() {
  const [yearly, setYearly]   = useState(150000);
  const [years, setYears]     = useState(15);
  const [rate, setRate]       = useState(7.1);
  const [result, setResult]   = useState<ReturnType<typeof calculatePPF> | null>(null);
  const [history, addRecord] = useCalculationHistory('ppf-calculator');

  const handle = () => {
    const res = calculatePPF(yearly, years, rate);
    setResult(res);
    addRecord({
      label: `${fmtL(yearly)}/yr · ${years}yr · ${rate}%`,
      metrics: [
        { key: 'Maturity', value: fmtL(res.maturityAmount) },
        { key: 'Interest', value: fmtL(res.totalInterest) },
        { key: 'Invested', value: fmtL(res.totalDeposited) },
        { key: 'Rate',     value: `${rate}%` },
      ],
    });
  };

  const chartData = result?.yearlyBreakdown.map(r => ({
    year: `Y${r.year}`, deposit: Math.round(r.deposit), balance: Math.round(r.balance),
  })) ?? [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Yearly Deposit (max ₹1.5L)', value: yearly, set: setYearly, min: 500, max: 150000, step: 500, display: fmtINR(yearly) },
          { label: 'Investment Period (min 15yr)', value: years, set: setYears, min: 15, max: 50, step: 5, display: `${years} yrs` },
          { label: 'PPF Interest Rate', value: rate, set: setRate, min: 6, max: 10, step: 0.1, display: `${rate}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-green-700">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-green-700 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate PPF Maturity
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-green-700 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-green-100 mb-1">Maturity Amount</p>
                <p className="text-2xl font-bold">{fmtL(result.maturityAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-green-300">Interest Earned</p>
                <p className="text-lg font-bold text-green-100">{fmtL(result.totalInterest)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Deposited', value: fmtL(result.totalDeposited) },
                { label: 'Interest',  value: fmtL(result.totalInterest) },
                { label: 'Maturity',  value: fmtL(result.maturityAmount) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">Year-wise Balance</p>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 9 }} interval={Math.floor(years / 4)} />
                  <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
                  <Area type="monotone" dataKey="balance" stroke="#15803d" fill="#bbf7d0" name="Balance" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter details and click<br /><strong>Calculate PPF Maturity</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare PPF for different deposit amounts." />
    </div>

    {/* Where to open / track PPF */}
    <PensionProviderTable scheme="ppf" contribution={yearly} projectedValue={result?.maturityAmount} />
    </>
  );
}
