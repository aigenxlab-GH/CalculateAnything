'use client';

import { useState } from 'react';
import { compareRegimes, type OldRegimeDeductions } from '@/lib/calculators/tax';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Scale } from 'lucide-react';
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

export function OldVsNewTax() {
  const [income, setIncome]     = useState(1000000);
  const [ded, setDed]           = useState<OldRegimeDeductions>(defaultDed);
  const [result, setResult]     = useState<ReturnType<typeof compareRegimes> | null>(null);
  const [history, addRecord] = useCalculationHistory('old-vs-new-regime');

  const computeAndStore = (inc: number, d: OldRegimeDeductions) => {
    const res = compareRegimes(inc, d, '2526');
    setResult(res);
    addRecord({
      label: `${fmtL(inc)} income`,
      metrics: [
        { key: 'New Tax',  value: fmtINR(res.newRegime.totalTax) },
        { key: 'Old Tax',  value: fmtINR(res.oldRegime.totalTax) },
        { key: 'Better',   value: res.betterRegime === 'new' ? 'New' : 'Old' },
        { key: 'Saves',    value: fmtINR(res.savings) },
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

  const setDedField = (key: keyof OldRegimeDeductions, val: number) =>
    setDed(prev => ({ ...prev, [key]: val }));

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-xs font-medium text-slate-600">Annual Income</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={income} onChange={setIncome} min={300000} max={5000000} step={50000} />
              <span className="text-sm font-bold text-primary w-20 text-right">{fmtL(income)}</span>
            </div>
          </div>
          <input type="range" value={income} onChange={(e) => setIncome(+e.target.value)} min={300000} max={5000000} step={50000}
            aria-label="Annual Income"
            className="w-full h-1.5 accent-primary rounded-full" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">Old Regime Deductions</p>

        {([
          ['Section 80C', 'section80C', 150000],
          ['Section 80D', 'section80D', 50000],
          ['HRA Exemption', 'hra', 200000],
          ['Home Loan Interest', 'homeLoanInterest', 200000],
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
              className="w-full h-1 accent-slate-400 rounded-full" />
          </div>
        ))}

        <button type="button" onClick={handle} className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors">
          Compare Regimes
        </button>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {result ? (
          <>
            {/* Winner banner */}
            <div className={`rounded-2xl p-4 text-white ${result.betterRegime === 'new' ? 'bg-primary' : 'bg-green-600'}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Better Regime for You</p>
              <p className="text-xl font-bold">{result.betterRegime === 'new' ? 'New Regime 2025-26' : 'Old Regime'}</p>
              <p className="text-sm opacity-90 mt-0.5">Saves you <strong>{fmtINR(result.savings)}</strong> in taxes</p>
            </div>

            {/* Side-by-side */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Regime', data: result.newRegime, color: '#1d4ed8' },
                { label: 'Old Regime', data: result.oldRegime, color: '#16a34a' },
              ].map(({ label, data, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color }}>{label}</p>
                  {[
                    ['Taxable Income', fmtL(data.taxableIncome)],
                    ['Basic Tax',      fmtINR(data.basicTax)],
                    ['87A Rebate',     fmtINR(data.rebate87A)],
                    ['Surcharge',      fmtINR(data.surcharge)],
                    ['Cess (4%)',      fmtINR(data.cess)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="text-[10px] text-slate-500">{k}</span>
                      <span className="text-[10px] font-semibold text-slate-700">{v}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-700">Total Tax</span>
                      <span className="text-sm font-bold" style={{ color }}>{fmtINR(data.totalTax)}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[10px] text-slate-500">Eff. Rate</span>
                      <span className="text-[10px] font-semibold text-slate-500">{data.effectiveRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter income &amp; deductions and click<br /><strong>Compare Regimes</strong></p>
            <button type="button" onClick={tryExample}
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors font-medium">
              Try: ₹12L income, 80C + 80D
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare regimes to track different income scenarios." />
    </div>
    <TaxFilingTable income={income} />
    </>
  );
}
