'use client';

import { useState } from 'react';
import { calculateLoanEligibility } from '@/lib/calculators/loans-extended';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BankRateTable } from '@/components/calculators/BankRateTable';
import { CheckCircle } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function LoanEligibility() {
  const [income, setIncome]         = useState(80000);
  const [existing, setExisting]     = useState(15000);
  const [rate, setRate]             = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [foir, setFoir]             = useState(50);
  const [result, setResult]         = useState<ReturnType<typeof calculateLoanEligibility> | null>(null);
  const [history, addRecord]        = useCalculationHistory('home-loan-eligibility');

  const computeAndStore = (inc: number, ex: number, r: number, ty: number, f: number) => {
    const res = calculateLoanEligibility(inc, ex, r, ty * 12, f);
    setResult(res);
    addRecord({
      label: `Inc ${fmtINR(inc)} · FOIR ${f}%`,
      metrics: [
        { key: 'Max Loan', value: fmtL(res.maxLoanAmount) },
        { key: 'Max EMI',  value: fmtINR(res.maxEMI) },
        { key: 'Avail EMI', value: fmtINR(res.availableForEMI) },
        { key: 'Rate',      value: `${r}%` },
      ],
    });
  };

  const handle = () => {
    computeAndStore(income, existing, rate, tenureYears, foir);
  };

  const tryExample = () => {
    const inc = 80000, ex = 15000, r = 8.5, ty = 20, f = 50;
    setIncome(inc); setExisting(ex); setRate(r); setTenureYears(ty); setFoir(f);
    computeAndStore(inc, ex, r, ty, f);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Monthly Income (Net)', value: income, set: setIncome, min: 20000, max: 500000, step: 5000, display: fmtINR(income) },
          { label: 'Existing Monthly EMIs', value: existing, set: setExisting, min: 0, max: 200000, step: 1000, display: fmtINR(existing) },
          { label: 'Loan Interest Rate', value: rate, set: setRate, min: 5, max: 20, step: 0.1, display: `${rate}%` },
          { label: 'Desired Tenure', value: tenureYears, set: setTenureYears, min: 1, max: 30, step: 1, display: `${tenureYears} yrs` },
          { label: 'FOIR %', value: foir, set: setFoir, min: 30, max: 70, step: 5, display: `${foir}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-primary w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-primary rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors">
          Check Eligibility
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className={`rounded-2xl p-4 text-white ${result.maxLoanAmount > 0 ? 'bg-primary' : 'bg-red-500'}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Maximum Loan Amount</p>
              <p className="text-2xl font-bold">{result.maxLoanAmount > 0 ? fmtL(result.maxLoanAmount) : 'Not Eligible'}</p>
              <p className="text-xs opacity-90 mt-0.5">Max EMI: {fmtINR(result.maxEMI)}/month</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 px-4 pt-3 pb-2">Eligibility Breakdown</p>
              <div className="divide-y divide-slate-100">
                {[
                  { label: 'Monthly Income', value: fmtINR(result.monthlyIncome), note: '100%' },
                  { label: 'FOIR Limit', value: fmtINR(result.monthlyIncome * foir / 100), note: `${foir}% of income` },
                  { label: 'Existing EMIs', value: fmtINR(result.existingEMIs), note: 'Already committed', red: true },
                  { label: 'Available for EMI', value: fmtINR(result.availableForEMI), note: 'FOIR limit – existing EMIs', green: true },
                  { label: 'Max Loan (30yr)', value: fmtL(result.maxLoanAmount), note: `At ${rate}%`, green: true },
                ].map(({ label, value, note, red, green }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-2.5">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{label}</p>
                      <p className="text-[10px] text-slate-500">{note}</p>
                    </div>
                    <span className={`text-sm font-bold ${red ? 'text-red-500' : green ? 'text-green-600' : 'text-slate-800'}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter income details and click<br /><strong>Check Eligibility</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary text-xs font-medium rounded-lg transition-colors">
              Try: ₹80K income · 50% FOIR · 8.5% · 20 yrs
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare eligibility at different income levels." />
    </div>

    {/* Bank rate comparison — once you know your eligibility */}
    <BankRateTable
      principal={result?.maxLoanAmount || 5000000}
      tenureMonths={tenureYears * 12}
      lockedLoanType="home"
    />
    </>
  );
}
