'use client';

import { useState } from 'react';
import { calculatePrepayment } from '@/lib/calculators/loans-extended';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { BankRateTable } from '@/components/calculators/BankRateTable';
import { Scissors } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function LoanPrepayment() {
  const [principal, setPrincipal]         = useState(3000000);
  const [rate, setRate]                   = useState(8.5);
  const [originalTenure, setOriginalTenure] = useState(240);
  const [prepayAmount, setPrepayAmount]   = useState(500000);
  const [prepayMonth, setPrepayMonth]     = useState(24);
  const [result, setResult]               = useState<ReturnType<typeof calculatePrepayment> | null>(null);
  const [history, setHistory]             = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]                     = useState(0);

  const handle = () => {
    const res = calculatePrepayment(principal, rate, originalTenure, prepayAmount, prepayMonth);
    setResult(res);
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `Prepay ${fmtL(prepayAmount)} @ Mo${prepayMonth}`,
      metrics: [
        { key: 'Int. Saved',   value: fmtL(res.interestSaved) },
        { key: 'Mo. Saved',    value: `${res.monthsSaved} mo` },
        { key: 'New Tenure',   value: `${Math.floor(res.newTenureMonths / 12)}y ${res.newTenureMonths % 12}m` },
        { key: 'Prepayment',   value: fmtL(prepayAmount) },
      ],
    }, ...prev].slice(0, 3));
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Loan Amount', value: principal, set: setPrincipal, min: 100000, max: 20000000, step: 100000, display: fmtL(principal) },
          { label: 'Interest Rate (p.a.)', value: rate, set: setRate, min: 5, max: 20, step: 0.1, display: `${rate}%` },
          { label: 'Original Tenure (months)', value: originalTenure, set: setOriginalTenure, min: 12, max: 360, step: 12, display: `${Math.floor(originalTenure / 12)}y ${originalTenure % 12}m` },
          { label: 'Prepayment Amount', value: prepayAmount, set: setPrepayAmount, min: 10000, max: 10000000, step: 10000, display: fmtL(prepayAmount) },
          { label: 'Prepayment at Month', value: prepayMonth, set: setPrepayMonth, min: 1, max: originalTenure - 1, step: 1, display: `Month ${prepayMonth}` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-rose-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-rose-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Savings
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-rose-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Interest Saved</p>
              <p className="text-2xl font-bold">{fmtL(result.interestSaved)}</p>
              <p className="text-xs opacity-90 mt-0.5">Loan closes {Math.floor(result.monthsSaved / 12)} yrs {result.monthsSaved % 12} mo earlier!</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Original Interest', value: fmtL(result.originalTotalInterest), color: 'text-red-500' },
                { label: 'New Interest', value: fmtL(result.newTotalInterest), color: 'text-green-600' },
                { label: 'Original Tenure', value: `${Math.floor(result.originalTenureMonths / 12)}y ${result.originalTenureMonths % 12}m`, color: 'text-slate-800' },
                { label: 'New Tenure', value: `${Math.floor(result.newTenureMonths / 12)}y ${result.newTenureMonths % 12}m`, color: 'text-green-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-xs text-green-800">
              <p className="font-semibold mb-1">Prepayment Impact:</p>
              <p>Monthly EMI: <strong>{fmtINR(result.originalEMI)}</strong> (unchanged)</p>
              <p>Prepaid at Month {prepayMonth}: <strong>{fmtL(prepayAmount)}</strong></p>
              <p className="mt-1">Months saved: <strong>{result.monthsSaved}</strong> · Interest saved: <strong>{fmtL(result.interestSaved)}</strong></p>
              <p className="mt-1 text-green-600 font-medium">ROI on prepayment: {(result.interestSaved / prepayAmount * 100).toFixed(1)}%</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter details and click<br /><strong>Calculate Savings</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare prepayment scenarios." />
    </div>

    {/* Refinance / switch lenders — bank comparison */}
    <BankRateTable
      principal={principal}
      tenureMonths={originalTenure}
      lockedLoanType="home"
    />
    </>
  );
}
