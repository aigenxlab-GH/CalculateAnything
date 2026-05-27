'use client';

import { useState } from 'react';
import { calculateInterestFreeHomeLoan } from '@/lib/calculators/loans-extended';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BankRateTable } from '@/components/calculators/BankRateTable';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { Sparkles } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function InterestFreeHomeLoan() {
  const [principal, setPrincipal]     = useState(5000000);
  const [loanRate, setLoanRate]       = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [sipRate, setSipRate]         = useState(12);
  const [result, setResult]           = useState<ReturnType<typeof calculateInterestFreeHomeLoan> | null>(null);
  const [history, addRecord]          = useCalculationHistory('interest-free-home-loan');

  const computeAndStore = (p: number, lr: number, ty: number, sr: number) => {
    const res = calculateInterestFreeHomeLoan(p, lr, ty * 12, sr);
    setResult(res);
    addRecord({
      label: `${fmtL(p)} · ${lr}%`,
      metrics: [
        { key: 'EMI',        value: fmtINR(res.emi) },
        { key: 'SIP Req',    value: fmtINR(res.sipRequiredMonthly) },
        { key: 'Net Cost',   value: fmtL(Math.max(0, res.netEffectiveCost)) },
        { key: 'Int. Free?', value: res.isEffectivelyInterestFree ? 'Yes!' : 'No' },
      ],
    });
  };

  const handle = () => {
    computeAndStore(principal, loanRate, tenureYears, sipRate);
  };

  const tryExample = () => {
    const p = 5000000, lr = 8.5, ty = 20, sr = 12;
    setPrincipal(p); setLoanRate(lr); setTenureYears(ty); setSipRate(sr);
    computeAndStore(p, lr, ty, sr);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Loan Amount', value: principal, set: setPrincipal, min: 500000, max: 20000000, step: 100000, display: fmtL(principal) },
          { label: 'Loan Interest Rate', value: loanRate, set: setLoanRate, min: 5, max: 18, step: 0.1, display: `${loanRate}%` },
          { label: 'Loan Tenure', value: tenureYears, set: setTenureYears, min: 5, max: 30, step: 1, display: `${tenureYears} yrs` },
          { label: 'SIP Expected Return', value: sipRate, set: setSipRate, min: 5, max: 20, step: 0.5, display: `${sipRate}%` },
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
          Calculate Strategy
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className={`rounded-2xl p-4 text-white ${result.isEffectivelyInterestFree ? 'bg-green-600' : 'bg-primary'}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">
                {result.isEffectivelyInterestFree ? '🎉 Effectively Interest-Free!' : 'Parallel SIP Strategy'}
              </p>
              <p className="text-xl font-bold">SIP of {fmtINR(result.sipRequiredMonthly)}/mo</p>
              <p className="text-xs opacity-90 mt-0.5">
                Alongside EMI of {fmtINR(result.emi)}/mo
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Monthly EMI', value: fmtINR(result.emi) },
                { label: 'Monthly SIP', value: fmtINR(result.sipRequiredMonthly) },
                { label: 'Total Interest', value: fmtL(result.totalInterest) },
                { label: 'SIP Maturity', value: fmtL(result.sipMaturityValue) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-xl p-3 text-xs ${result.isEffectivelyInterestFree ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
              <p className="font-semibold mb-1">Net Effective Cost:</p>
              <p>Total Interest Paid: {fmtL(result.totalInterest)}</p>
              <p>SIP Maturity Value: {fmtL(result.sipMaturityValue)}</p>
              <p className="mt-1 font-bold">
                {result.isEffectivelyInterestFree
                  ? `Net GAIN: ${fmtL(result.sipMaturityValue - result.totalInterest)} (SIP > Interest!)`
                  : `Net Cost: ${fmtL(result.netEffectiveCost)} after SIP offset`}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter details and click<br /><strong>Calculate Strategy</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary text-xs font-medium rounded-lg transition-colors">
              Try: ₹50L loan · 8.5% · 20 yrs · SIP 12%
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare loan strategies at different rates." />
    </div>

    {/* Two stacked tables: lowest-rate home loan banks + SIP broker platforms */}
    <BankRateTable
      principal={principal}
      tenureMonths={tenureYears * 12}
      lockedLoanType="home"
    />
    <BrokerPlatformTable
      monthly={result?.sipRequiredMonthly}
      years={tenureYears}
    />
    </>
  );
}
