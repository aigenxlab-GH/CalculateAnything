'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateEMI, type EMIResult } from '@/lib/calculators/emi';
import { NumericStepper } from '@/components/ui/NumericStepper';

const LoanPieChart = dynamic(() => import('./LoanPieChart').then((m) => m.LoanPieChart), {
  ssr: false,
  loading: () => <div className="h-[110px] bg-slate-50 animate-pulse rounded-xl" />,
});
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
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

export function LoanCalcPage({ config }: { config: LoanConfig }) {
  const [principal, setPrincipal]   = useState(config.defaultPrincipal);
  const [rate, setRate]             = useState(config.defaultRate);
  const [tenure, setTenure]         = useState(config.defaultTenureYears);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult]         = useState<EMIResult>(() =>
    calculateEMI(config.defaultPrincipal, config.defaultRate, config.defaultTenureYears * 12)
  );
  const [showTable, setShowTable]   = useState(false);
  const [history, addRecord]        = useCalculationHistory(config.loanType ? `${config.loanType}-loan` : 'loan-calculator');

  const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;

  const computeAndStore = (p: number, r: number, tMonths: number, t: number, tType: 'years' | 'months') => {
    const res = calculateEMI(p, r, tMonths);
    setResult(res);
    addRecord({
      label: `${fmtL(p)} · ${r}% · ${t}${tType[0]}`,
      metrics: [
        { key: 'EMI',   value: fmtINR(res.monthlyEMI) },
        { key: 'Int.',  value: fmtL(res.totalInterest) },
        { key: 'Total', value: fmtL(res.totalPayment) },
        { key: 'Tenure',value: `${tMonths} mo` },
      ],
    });
  };

  const handle = () => {
    computeAndStore(principal, rate, tenureMonths, tenure, tenureType);
  };

  const tryExample = () => {
    const p = config.defaultPrincipal, r = config.defaultRate, t = config.defaultTenureYears;
    const tType: 'years' | 'months' = 'years';
    setPrincipal(p); setRate(r); setTenure(t); setTenureType(tType);
    computeAndStore(p, r, t * 12, t, tType);
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
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold w-20 text-right" style={{ color: config.color }}>{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)} min={min} max={max} step={step}
              aria-label={label}
              className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
          </div>
        ))}

        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-xs font-medium text-slate-600">Interest Rate</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={rate} onChange={setRate} min={config.rateMin} max={config.rateMax} step={0.1} />
              <span className="text-sm font-bold w-20 text-right" style={{ color: config.color }}>{rate}%</span>
            </div>
          </div>
          <input type="range" value={rate} onChange={(e) => setRate(+e.target.value)} min={config.rateMin} max={config.rateMax} step={0.1}
            aria-label="Interest Rate"
            className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-600">Tenure</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={tenure} onChange={setTenure} min={1} max={tenureType === 'years' ? config.tenureMax : config.tenureMax * 12} step={1} />
              <span className="text-sm font-bold w-20 text-right" style={{ color: config.color }}>{tenure} {tenureType === 'years' ? 'Yrs' : 'Mo'}</span>
            </div>
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
            aria-label="Tenure"
            className="w-full h-1.5 rounded-full" style={{ accentColor: config.color }} />
        </div>

        <button type="button" onClick={handle}
          className="w-full py-2 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          style={{ backgroundColor: config.color }}>
          {config.buttonLabel}
        </button>
        <button type="button" onClick={tryExample}
          className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-xl transition-colors">
          Try: {fmtL(config.defaultPrincipal)} · {config.defaultRate}% · {config.defaultTenureYears} yrs
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
                  <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${hl ? 'text-blue-100' : 'text-slate-500'}`}>{label}</p>
                  <p className={`text-base font-bold leading-tight ${hl ? 'text-white' : 'text-slate-800'}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 text-center mb-2">Principal vs Interest</p>
              <LoanPieChart data={chartData} primaryColor={config.color} />
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
