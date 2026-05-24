'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateEMI, type EMIResult } from '@/lib/calculators/emi';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { BankRateTable } from '@/components/calculators/BankRateTable';
import { IndianRupee } from 'lucide-react';

export interface LoanConfig {
  principalLabel: string;
  principalMin: number;
  principalMax: number;
  defaultPrincipal: number;
  defaultRate: number;
  defaultTenureYears: number;
  rateMin: number;
  rateMax: number;
  tenureMax: number;
  color: string;
  buttonLabel: string;
  /** Pins the bank-comparison table to this loan type (hides tab switcher). */
  loanType?: 'home' | 'car' | 'personal' | 'education';
}

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const PIE_COLORS = ['#1d4ed8', '#fbbf24'];

export function LoanCalcPage({ config }: { config: LoanConfig }) {
  const [principal, setPrincipal]   = useState(config.defaultPrincipal);
  const [rate, setRate]             = useState(config.defaultRate);
  const [tenure, setTenure]         = useState(config.defaultTenureYears);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult]         = useState<EMIResult>(() =>
    calculateEMI(config.defaultPrincipal, config.defaultRate, config.defaultTenureYears * 12)
  );
  const [showTable, setShowTable]   = useState(false);
  const [history, setHistory]       = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]               = useState(0);

  const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;

  const handle = () => {
    const res = calculateEMI(principal, rate, tenureMonths);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtL(principal)} · ${rate}% · ${tenure}${tenureType[0]}`,
      metrics: [
        { key: 'EMI',   value: fmtINR(res.monthlyEMI) },
        { key: 'Int.',  value: fmtL(res.totalInterest) },
        { key: 'Total', value: fmtL(res.totalPayment) },
        { key: 'Tenure',value: `${tenureMonths} mo` },
      ],
    }, ...prev].slice(0, 3));
  };

  const chartData = result
    ? [{ name: 'Principal', value: principal }, { name: 'Interest', value: Math.round(result.totalInterest) }]
    : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {[
          { label: config.principalLabel, value: principal, set: setPrincipal, min: config.principalMin, max: config.principalMax, step: config.principalMin, display: fmtL(principal) },
        ].map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold" style={{ color: config.color }}>{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)} min={min} max={max} step={step}
              className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
          </div>
        ))}

        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Interest Rate</label>
            <span className="text-sm font-bold" style={{ color: config.color }}>{rate}%</span>
          </div>
          <input type="range" value={rate} onChange={(e) => setRate(+e.target.value)} min={config.rateMin} max={config.rateMax} step={0.1}
            className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-xs font-medium text-slate-600">Tenure</label>
            <span className="text-sm font-bold" style={{ color: config.color }}>{tenure} {tenureType === 'years' ? 'Yrs' : 'Mo'}</span>
          </div>
          <div className="flex gap-1.5 mb-1.5">
            {(['years', 'months'] as const).map((t) => (
              <button key={t} type="button" onClick={() => setTenureType(t)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors capitalize ${tenureType === t ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                style={tenureType === t ? { backgroundColor: config.color } : {}}>
                {t}
              </button>
            ))}
          </div>
          <input type="range" value={tenure} onChange={(e) => setTenure(+e.target.value)}
            min={1} max={tenureType === 'years' ? config.tenureMax : config.tenureMax * 12} step={1}
            className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
        </div>

        <button type="button" onClick={handle}
          className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          style={{ backgroundColor: config.color }}>
          {config.buttonLabel}
        </button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Monthly EMI',    value: fmtINR(result.monthlyEMI), hl: true },
                { label: 'Total Interest', value: fmtL(result.totalInterest) },
                { label: 'Total Payment',  value: fmtL(result.totalPayment) },
                { label: 'Tenure',         value: `${tenureMonths} months` },
              ].map(({ label, value, hl }) => (
                <div key={label} className={`rounded-xl p-3 ${hl ? 'text-white' : 'bg-slate-50 border border-slate-100'}`}
                  style={hl ? { backgroundColor: config.color } : {}}>
                  <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${hl ? 'text-blue-100' : 'text-slate-400'}`}>{label}</p>
                  <p className={`text-base font-bold leading-tight ${hl ? 'text-white' : 'text-slate-800'}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-2">Principal vs Interest</p>
              <ResponsiveContainer width="100%" height={110}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={3} dataKey="value">
                    {chartData.map((_, i) => <Cell key={i} fill={i === 0 ? config.color : PIE_COLORS[1]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => (typeof v === 'number' ? fmtINR(v) : String(v))} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button type="button" onClick={() => setShowTable(!showTable)}
                className="w-full flex justify-between items-center px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                <span>Amortization Schedule</span><span>{showTable ? '▲' : '▼'}</span>
              </button>
              {showTable && (
                <div className="overflow-x-auto border-t border-slate-100">
                  <table className="w-full text-[11px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>{['Mo', 'EMI', 'Principal', 'Interest', 'Balance'].map(h =>
                        <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {result.amortization.slice(0, 24).map(r => (
                        <tr key={r.month} className="hover:bg-slate-50">
                          <td className="px-3 py-2 text-slate-500">{r.month}</td>
                          <td className="px-3 py-2 font-medium">{fmtINR(r.emi)}</td>
                          <td className="px-3 py-2 text-blue-600">{fmtINR(r.principal)}</td>
                          <td className="px-3 py-2 text-amber-600">{fmtINR(r.interest)}</td>
                          <td className="px-3 py-2">{fmtINR(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
        </>
      </div>

      <ComparisonPanel records={history} />
    </div>

    {/* Personalised bank rate comparison */}
    <BankRateTable
      principal={principal}
      tenureMonths={tenureMonths}
      lockedLoanType={config.loanType ?? 'home'}
    />
    </>
  );
}
