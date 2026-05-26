'use client';

import { useState } from 'react';
import { calculateNSC } from '@/lib/calculators/savings';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { BookOpen } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function NSCCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate]           = useState(7.7);
  const [result, setResult]       = useState<ReturnType<typeof calculateNSC> | null>(null);
  const [history, addRecord] = useCalculationHistory('nsc-calculator');

  const handle = () => {
    const res = calculateNSC(principal, rate);
    setResult(res);
    addRecord({
      label: `${fmtL(principal)} · ${rate}%`,
      metrics: [
        { key: 'Maturity', value: fmtINR(res.maturityAmount) },
        { key: 'Interest', value: fmtINR(res.interestEarned) },
        { key: 'Rate',     value: `${rate}%` },
        { key: 'Gain',     value: `${(res.interestEarned / principal * 100).toFixed(1)}%` },
      ],
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Investment Amount</label>
            <span className="text-sm font-bold text-orange-600">{fmtL(principal)}</span>
          </div>
          <input type="range" value={principal} onChange={(e) => setPrincipal(+e.target.value)}
            min={1000} max={5000000} step={1000}
            className="w-full h-1.5 accent-orange-600 rounded-full" />
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">NSC Interest Rate</label>
            <span className="text-sm font-bold text-orange-600">{rate}%</span>
          </div>
          <input type="range" value={rate} onChange={(e) => setRate(+e.target.value)}
            min={5} max={10} step={0.1}
            className="w-full h-1.5 accent-orange-600 rounded-full" />
        </div>
        <button type="button" onClick={handle} className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate NSC Maturity
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-orange-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Maturity Amount (5 Years)</p>
              <p className="text-2xl font-bold">{fmtINR(result.maturityAmount)}</p>
              <p className="text-xs opacity-90 mt-0.5">Interest earned: {fmtINR(result.interestEarned)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 px-4 pt-3 pb-2">Year-wise Interest Accrual</p>
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>{['Year', 'Interest', 'Balance'].map(h =>
                    <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {result.yearlyAccrual.map(r => (
                    <tr key={r.year} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-500">Year {r.year}</td>
                      <td className="px-3 py-2 font-medium text-orange-600">{fmtINR(r.interest)}</td>
                      <td className="px-3 py-2 font-semibold">{fmtINR(r.cumulativeBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-xs text-orange-800">
              <p className="font-medium">Key NSC Features:</p>
              <ul className="mt-1 space-y-0.5 text-orange-700">
                <li>• 80C deduction on principal invested</li>
                <li>• Interest auto-reinvested (taxable each year)</li>
                <li>• Available at any Post Office</li>
                <li>• Can be pledged as collateral</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter amount and click<br /><strong>Calculate NSC Maturity</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare NSC investments at different amounts." />
    </div>

    {/* Where to open / track NSC */}
    <PensionProviderTable scheme="nsc" projectedValue={result?.maturityAmount} />
    </>
  );
}
