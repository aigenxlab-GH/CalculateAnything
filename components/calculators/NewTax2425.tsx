'use client';

import { useState } from 'react';
import { calcNewRegime2425 } from '@/lib/calculators/tax';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Receipt } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function NewTax2425() {
  const [income, setIncome] = useState(1000000);
  const [result, setResult] = useState<ReturnType<typeof calcNewRegime2425> | null>(null);
  const [history, addRecord] = useCalculationHistory('new-income-tax-2425');

  const handle = () => {
    const res = calcNewRegime2425(income);
    setResult(res);
    addRecord({
      label: `${fmtL(income)} income`,
      metrics: [
        { key: 'Total Tax', value: fmtINR(res.totalTax) },
        { key: 'Monthly',   value: fmtINR(res.monthlyTax) },
        { key: 'Eff. Rate', value: `${res.effectiveRate.toFixed(2)}%` },
        { key: '87A Rebate',value: fmtINR(res.rebate87A) },
      ],
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Annual Income (Gross)</label>
            <span className="text-sm font-bold text-primary">{fmtL(income)}</span>
          </div>
          <input type="range" value={income} onChange={(e) => setIncome(+e.target.value)}
            min={300000} max={10000000} step={50000}
            className="w-full h-1.5 accent-primary rounded-full" />
        </div>

        <div className="bg-slate-50 rounded-xl p-3 space-y-1 text-[11px]">
          <p className="font-bold text-slate-600 text-[10px] uppercase tracking-wider mb-1.5">Tax Slabs FY 2024-25</p>
          {[
            ['₹0 – ₹3L', '0%'], ['₹3L – ₹7L', '5%'], ['₹7L – ₹10L', '10%'],
            ['₹10L – ₹12L', '15%'], ['₹12L – ₹15L', '20%'], ['Above ₹15L', '30%'],
          ].map(([slab, rate]) => (
            <div key={slab} className="flex justify-between text-slate-600">
              <span>{slab}</span><span className="font-semibold">{rate}</span>
            </div>
          ))}
        </div>

        <button type="button" onClick={handle} className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Tax
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className={`rounded-2xl p-4 ${result.rebate87A > 0 ? 'bg-green-600' : 'bg-primary'} text-white`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Total Tax Payable</p>
              <p className="text-2xl font-bold">{fmtINR(result.totalTax)}</p>
              {result.rebate87A > 0 && (
                <p className="text-xs mt-1 opacity-90">87A Rebate applied · Zero tax up to ₹7.75L gross!</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Taxable Income', value: fmtL(result.taxableIncome) },
                { label: 'Monthly Tax',    value: fmtINR(result.monthlyTax) },
                { label: 'Effective Rate', value: `${result.effectiveRate.toFixed(2)}%` },
                { label: '87A Rebate',     value: fmtINR(result.rebate87A) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 px-4 pt-3 pb-2">Tax Breakdown</p>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Component', 'Amount'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ['Gross Income', fmtINR(result.grossIncome)],
                    ['Standard Deduction', `–${fmtINR(result.standardDeduction)}`],
                    ['Taxable Income', fmtINR(result.taxableIncome)],
                    ['Basic Tax', fmtINR(result.basicTax)],
                    ['87A Rebate', `–${fmtINR(result.rebate87A)}`],
                    ['Surcharge', fmtINR(result.surcharge)],
                    ['Cess (4%)', fmtINR(result.cess)],
                  ].map(([k, v]) => (
                    <tr key={k} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-600">{k}</td>
                      <td className="px-3 py-2 font-semibold text-slate-800">{v}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-light">
                    <td className="px-3 py-2 font-bold text-primary">Total Tax</td>
                    <td className="px-3 py-2 font-bold text-primary">{fmtINR(result.totalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter income and click<br /><strong>Calculate Tax</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare tax across different income levels." />
    </div>
  );
}
