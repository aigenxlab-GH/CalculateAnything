'use client';

import { useState } from 'react';
import { calcOldRegime, type OldRegimeDeductions } from '@/lib/calculators/tax';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { FileText } from 'lucide-react';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';
import { NumericStepper } from '@/components/ui/NumericStepper';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const defaultDed: OldRegimeDeductions = {
  section80C: 150000, section80D: 25000, hra: 0,
  lta: 0, npsEmployer: 0, homeLoanInterest: 0, otherDeductions: 0,
};

export function OldTax() {
  const [income, setIncome] = useState(1000000);
  const [ded, setDed] = useState<OldRegimeDeductions>(defaultDed);
  const [result, setResult] = useState<ReturnType<typeof calcOldRegime> | null>(null);
  const [history, addRecord] = useCalculationHistory('old-income-tax');

  const setDedField = (key: keyof OldRegimeDeductions, val: number) =>
    setDed(prev => ({ ...prev, [key]: val }));

  const computeAndStore = (inc: number, d: OldRegimeDeductions) => {
    const res = calcOldRegime(inc, d);
    setResult(res);
    addRecord({
      label: `${fmtL(inc)} income`,
      metrics: [
        { key: 'Total Tax', value: fmtINR(res.totalTax) },
        { key: 'Monthly',   value: fmtINR(res.monthlyTax) },
        { key: 'Eff. Rate', value: `${res.effectiveRate.toFixed(2)}%` },
        { key: 'Taxable',   value: fmtL(res.taxableIncome) },
      ],
    });
  };

  const handle = () => computeAndStore(income, ded);

  const tryExample = () => {
    const exIncome = 1200000;
    const exDed: OldRegimeDeductions = {
      section80C: 150000, section80D: 25000, hra: 0,
      lta: 0, npsEmployer: 0, homeLoanInterest: 0, otherDeductions: 0,
    };
    setIncome(exIncome);
    setDed(exDed);
    computeAndStore(exIncome, exDed);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-xs font-medium text-slate-600">Annual Income</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={income} onChange={setIncome} min={300000} max={10000000} step={50000} />
              <span className="text-sm font-bold text-green-600 w-20 text-right">{fmtL(income)}</span>
            </div>
          </div>
          <input type="range" value={income} onChange={(e) => setIncome(+e.target.value)}
            min={300000} max={10000000} step={50000} aria-label="Annual Income"
            className="w-full h-1.5 accent-green-600 rounded-full" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pt-0.5">Deductions</p>

        {([
          ['Section 80C (max ₹1.5L)', 'section80C', 150000],
          ['Section 80D (max ₹25K)', 'section80D', 25000],
          ['HRA Exemption', 'hra', 300000],
          ['Home Loan Interest (max ₹2L)', 'homeLoanInterest', 200000],
          ['LTA', 'lta', 100000],
          ['Other Deductions', 'otherDeductions', 200000],
        ] as [string, keyof OldRegimeDeductions, number][]).map(([label, key, maxVal]) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={ded[key]} onChange={(v) => setDedField(key, v)} min={0} max={maxVal} step={5000} />
                <span className="text-xs font-bold text-slate-700 w-20 text-right">{fmtL(ded[key])}</span>
              </div>
            </div>
            <input type="range" value={ded[key]} onChange={(e) => setDedField(key, +e.target.value)}
              min={0} max={maxVal} step={5000} aria-label={label}
              className="w-full h-1 accent-green-400 rounded-full" />
          </div>
        ))}

        <button type="button" onClick={handle} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Tax
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-green-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Total Tax Payable</p>
              <p className="text-2xl font-bold">{fmtINR(result.totalTax)}</p>
              <p className="text-xs opacity-90 mt-0.5">Monthly TDS: {fmtINR(result.monthlyTax)}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Taxable Income', value: fmtL(result.taxableIncome) },
                { label: 'Effective Rate', value: `${result.effectiveRate.toFixed(2)}%` },
                { label: 'Basic Tax',      value: fmtINR(result.basicTax) },
                { label: '87A Rebate',     value: fmtINR(result.rebate87A) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 px-4 pt-3 pb-2">Breakdown</p>
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
                      <td className="px-3 py-2 font-semibold">{v}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-50">
                    <td className="px-3 py-2 font-bold text-green-700">Total Tax</td>
                    <td className="px-3 py-2 font-bold text-green-700">{fmtINR(result.totalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter income & deductions and click<br /><strong>Calculate Tax</strong></p>
            <button type="button" onClick={tryExample}
              className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors font-medium">
              Try: ₹12L income, 80C + 80D
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare old regime tax at different income levels." />
    </div>
    <TaxFilingTable income={income} />
    </>
  );
}
