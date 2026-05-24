'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateTakeHomeSalary } from '@/lib/calculators/salary';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { Wallet } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const COLOR = '#7c3aed';

export function SalaryCalc() {
  const [ctc, setCtc] = useState(1200000);
  const [result, setResult] = useState<ReturnType<typeof calculateTakeHomeSalary> | null>(null);
  const [history, setHistory] = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr] = useState(0);

  const handle = () => {
    const res = calculateTakeHomeSalary(ctc);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtL(ctc)} CTC`,
      metrics: [
        { key: 'Take Home', value: fmtL(res.netTakeHome) },
        { key: 'Monthly',   value: fmtINR(res.netTakeHome / 12) },
        { key: 'PF (Emp)',  value: fmtINR(res.pfEmployee) },
        { key: 'Gross',     value: fmtL(res.grossSalary) },
      ],
    }, ...prev].slice(0, 3));
  };

  const chartData = result ? [
    { name: 'Basic', value: Math.round(result.basic) },
    { name: 'HRA', value: Math.round(result.hra) },
    { name: 'Special Allow.', value: Math.round(result.specialAllowance) },
    { name: 'PF & PT', value: Math.round(result.totalDeductions) },
  ] : [];
  const COLORS = [COLOR, '#a78bfa', '#c4b5fd', '#e2e8f0'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Annual CTC</label>
            <span className="text-sm font-bold" style={{ color: COLOR }}>{fmtL(ctc)}</span>
          </div>
          <input type="range" value={ctc} onChange={(e) => setCtc(+e.target.value)}
            min={300000} max={10000000} step={50000}
            className="w-full h-1.5 rounded-full" style={{ accentColor: COLOR }} />
        </div>
        <button type="button" onClick={handle} className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors"
          style={{ backgroundColor: COLOR }}>
          Calculate Take Home
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="rounded-2xl p-4 text-white" style={{ backgroundColor: COLOR }}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Annual Take Home</p>
              <p className="text-2xl font-bold">{fmtL(result.netTakeHome)}</p>
              <p className="text-sm opacity-90 mt-0.5">Monthly: <strong>{fmtINR(result.netTakeHome / 12)}</strong></p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 px-4 pt-3 pb-2">Salary Structure</p>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Component', 'Annual', 'Monthly'].map(h =>
                    <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Basic Salary', result.basic, result.basic / 12],
                    ['HRA', result.hra, result.hra / 12],
                    ['Special Allowance', result.specialAllowance, result.specialAllowance / 12],
                    ['Gross Salary', result.grossSalary, result.grossSalary / 12],
                    ['PF (Employee)', -result.pfEmployee, -result.pfEmployee / 12],
                    ['Professional Tax', -result.professionalTax, -result.professionalTax / 12],
                  ].map(([k, a, m]) => (
                    <tr key={String(k)} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-600">{k}</td>
                      <td className={`px-3 py-2 font-semibold ${Number(a) < 0 ? 'text-red-500' : 'text-slate-800'}`}>{fmtINR(Math.abs(Number(a)))}</td>
                      <td className={`px-3 py-2 font-semibold ${Number(m) < 0 ? 'text-red-500' : 'text-slate-800'}`}>{fmtINR(Math.abs(Number(m)))}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#f5f3ff' }}>
                    <td className="px-3 py-2 font-bold" style={{ color: COLOR }}>Net Take Home</td>
                    <td className="px-3 py-2 font-bold" style={{ color: COLOR }}>{fmtINR(result.netTakeHome)}</td>
                    <td className="px-3 py-2 font-bold" style={{ color: COLOR }}>{fmtINR(result.netTakeHome / 12)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">CTC Composition</p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtINR(v) : String(v))} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter CTC and click<br /><strong>Calculate Take Home</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare take home for different CTC levels." />
    </div>
  );
}
