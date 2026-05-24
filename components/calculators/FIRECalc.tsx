'use client';

import { useState } from 'react';
import { calculateFIRE } from '@/lib/calculators/savings';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { Flame } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function FIRECalc() {
  const [expenses, setExpenses]     = useState(50000);
  const [savings, setSavings]       = useState(500000);
  const [monthly, setMonthly]       = useState(30000);
  const [retRate, setRetRate]       = useState(12);
  const [inflation, setInflation]   = useState(6);
  const [result, setResult]         = useState<ReturnType<typeof calculateFIRE> | null>(null);
  const [history, setHistory]       = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]               = useState(0);

  const handle = () => {
    const res = calculateFIRE(expenses, savings, monthly, retRate, inflation);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `${fmtINR(expenses)}/mo exp`,
      metrics: [
        { key: 'FIRE Corpus', value: fmtL(res.requiredCorpus) },
        { key: 'Years',       value: `${res.yearsToFIRE} yrs` },
        { key: 'Req SIP',     value: fmtINR(res.monthlyInvestmentNeeded) },
        { key: '25× Rule',    value: fmtL(res.requiredCorpus) },
      ],
    }, ...prev].slice(0, 3));
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2">
        {([
          { label: 'Monthly Expenses', value: expenses, set: setExpenses, min: 10000, max: 500000, step: 5000, display: fmtINR(expenses) },
          { label: 'Current Savings', value: savings, set: setSavings, min: 0, max: 50000000, step: 100000, display: fmtL(savings) },
          { label: 'Monthly Savings / Investment', value: monthly, set: setMonthly, min: 1000, max: 500000, step: 1000, display: fmtINR(monthly) },
          { label: 'Expected Return (p.a.)', value: retRate, set: setRetRate, min: 5, max: 25, step: 0.5, display: `${retRate}%` },
          { label: 'Inflation Rate', value: inflation, set: setInflation, min: 2, max: 12, step: 0.5, display: `${inflation}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-rose-500">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1 accent-rose-500 rounded-full" />
          </div>
        ))}

        <button type="button" onClick={handle} className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate FIRE Date
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-rose-500 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Years to FIRE</p>
              <p className="text-3xl font-bold">{result.yearsToFIRE} Years</p>
              <p className="text-sm opacity-90 mt-0.5">Required corpus: <strong>{fmtL(result.requiredCorpus)}</strong></p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'FIRE Corpus (25×)', value: fmtL(result.requiredCorpus), sub: '4% withdrawal rule' },
                { label: 'Years to FIRE', value: `${result.yearsToFIRE} yrs`, sub: 'With current savings rate' },
                { label: 'Annual Expenses', value: fmtL(expenses * 12), sub: '× 25 = FIRE number' },
                { label: 'Min Monthly SIP', value: fmtINR(result.monthlyInvestmentNeeded), sub: 'To hit corpus in time' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
            <div className="bg-rose-50 rounded-xl p-3 text-xs text-rose-800">
              <p className="font-semibold mb-1">FIRE Calculation:</p>
              <p>Annual expenses: {fmtL(expenses * 12)}</p>
              <p>FIRE corpus = {fmtL(expenses * 12)} × 25 = <strong>{fmtL(result.requiredCorpus)}</strong></p>
              <p className="mt-1 text-rose-600">Monthly {fmtINR(monthly)} at {retRate}% for {result.yearsToFIRE} yrs gets you there!</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter your details and click<br /><strong>Calculate FIRE Date</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Plan different FIRE scenarios to compare." />
    </div>

    {/* Where to open / track RETIREMENT */}
    <PensionProviderTable scheme="retirement" />
    </>
  );
}
