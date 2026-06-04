'use client';

import { useState } from 'react';
import { calculateEPF } from '@/lib/calculators/savings';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { PensionProviderTable } from '@/components/calculators/comparison/PensionProviderTable';
import { Briefcase } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function EPFCalc() {
  const [basic, setBasic]     = useState(30000);
  const [years, setYears]     = useState(20);
  const [rate, setRate]       = useState(8.15);
  const [result, setResult]   = useState<ReturnType<typeof calculateEPF> | null>(null);
  const [history, addRecord] = useCalculationHistory('epf-calculator');

  const computeAndStore = (b: number, y: number, r: number) => {
    const res = calculateEPF(b, y, r);
    setResult(res);
    addRecord({
      label: `₹${b.toLocaleString('en-IN')}/mo · ${y}yr`,
      metrics: [
        { key: 'Total Corpus', value: fmtL(res.totalCorpus) },
        { key: 'Emp Cont.',    value: fmtL(res.employeeContribution) },
        { key: 'Employer Cont.', value: fmtL(res.employerContribution) },
        { key: 'Interest',     value: fmtL(res.interestEarned) },
      ],
    });
  };

  const handle = () => { computeAndStore(basic, years, rate); trackCalculate('epf-calculator'); };

  const tryExample = () => {
    const b = 30000, y = 20, r = 8.15;
    setBasic(b); setYears(y); setRate(r);
    computeAndStore(b, y, r);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Monthly Basic Salary', value: basic, set: setBasic, min: 5000, max: 200000, step: 1000, display: fmtINR(basic) },
          { label: 'Years of Service', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
          { label: 'EPF Interest Rate', value: rate, set: setRate, min: 6, max: 10, step: 0.05, display: `${rate}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-teal-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-teal-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate EPF Corpus
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-teal-600 text-white rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-teal-100 mb-1">Total EPF Corpus</p>
                <p className="text-2xl font-bold">{fmtL(result.totalCorpus)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-teal-300">Interest Earned</p>
                <p className="text-lg font-bold text-teal-100">{fmtL(result.interestEarned)}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 px-4 pt-3 pb-2">Contribution Split</p>
              {[
                { label: 'Employee (12% of basic)', value: result.employeeContribution, color: 'text-teal-600', monthly: basic * 0.12 },
                { label: "Employer (3.67% to EPF)", value: result.employerContribution, color: 'text-blue-600', monthly: basic * 0.0367 },
                { label: 'Total Contributed', value: result.employeeContribution + result.employerContribution, color: 'text-slate-800', monthly: basic * 0.12 + basic * 0.0367 },
                { label: 'Interest Earned', value: result.interestEarned, color: 'text-green-600', monthly: null },
              ].map(({ label, value, color, monthly: m }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    {m !== null && <p className="text-[10px] text-slate-500">{fmtINR(m)}/mo</p>}
                  </div>
                  <span className={`text-sm font-bold ${color}`}>{fmtL(value)}</span>
                </div>
              ))}
            </div>
            <div className="bg-teal-50 rounded-xl p-3 text-xs text-teal-800">
              <p className="font-medium">Total Monthly EPF Deduction:</p>
              <p className="text-teal-700 mt-1">{fmtINR(basic * 0.12)} (employee) + {fmtINR(basic * 0.0367)} (employer) = <strong>{fmtINR(basic * 0.1567)}/month</strong></p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter salary and click<br /><strong>Calculate EPF Corpus</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold rounded-lg transition-colors border border-teal-200">
              Try: ₹30K basic · 20 yrs · 8.15%
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare EPF corpus at different salary levels." />
    </div>

    {/* Where to open / track EPF */}
    <PensionProviderTable scheme="epf" projectedValue={result?.totalCorpus} />
    </>
  );
}
