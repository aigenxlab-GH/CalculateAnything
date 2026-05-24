'use client';

import { useState } from 'react';
import { calculateStepUpSIP, calculateSIP } from '@/lib/calculators/sip';
import { ComparisonPanel, type ComparisonRecord } from '@/components/ComparisonPanel';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { TrendingUp } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function StepUpSIPCalc() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate]       = useState(12);
  const [years, setYears]     = useState(10);
  const [stepUp, setStepUp]   = useState(10);
  const [result, setResult]   = useState<{ stepUp: ReturnType<typeof calculateStepUpSIP>; flat: ReturnType<typeof calculateSIP> } | null>(null);
  const [history, setHistory] = useState<ComparisonRecord[]>([]);
  const [ctr, setCtr]         = useState(0);

  const handle = () => {
    const su = calculateStepUpSIP(monthly, rate, years, stepUp);
    const flat = calculateSIP(monthly, rate, years);
    setResult({ stepUp: su, flat });
    const id = ctr + 1; setCtr(id);
    setHistory(prev => [{
      id,
      label: `₹${monthly.toLocaleString('en-IN')}/mo +${stepUp}%/yr`,
      metrics: [
        { key: 'Step-Up Value', value: fmtL(su.totalValue) },
        { key: 'Flat SIP Val',  value: fmtL(flat.totalValue) },
        { key: 'Extra Gains',   value: fmtL(su.totalValue - flat.totalValue) },
        { key: 'Invested',      value: fmtL(su.investedAmount) },
      ],
    }, ...prev].slice(0, 3));
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Initial Monthly SIP', value: monthly, set: setMonthly, min: 500, max: 100000, step: 500, display: fmtINR(monthly) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
          { label: 'Annual Step-Up %', value: stepUp, set: setStepUp, min: 1, max: 50, step: 1, display: `${stepUp}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-emerald-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-emerald-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Step-Up SIP
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-emerald-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Step-Up SIP Maturity Value</p>
              <p className="text-2xl font-bold">{fmtL(result.stepUp.totalValue)}</p>
              <p className="text-xs opacity-90 mt-0.5">
                vs Flat SIP: {fmtL(result.flat.totalValue)} · Extra: {fmtL(result.stepUp.totalValue - result.flat.totalValue)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Total Invested',   value: fmtL(result.stepUp.investedAmount), color: 'text-slate-800' },
                { label: 'Estimated Returns', value: fmtL(result.stepUp.estimatedReturns), color: 'text-emerald-600' },
                { label: 'Flat SIP Value',   value: fmtL(result.flat.totalValue), color: 'text-slate-600' },
                { label: 'Extra with Step-Up', value: fmtL(result.stepUp.totalValue - result.flat.totalValue), color: 'text-emerald-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-800">
              <p className="font-medium">SIP in year {years}: <strong>{fmtINR(monthly * Math.pow(1 + stepUp / 100, years - 1))}</strong></p>
              <p className="mt-1 text-emerald-600">Step-up boosts returns by {((result.stepUp.totalValue / result.flat.totalValue - 1) * 100).toFixed(0)}% vs flat SIP</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Enter details and click<br /><strong>Calculate Step-Up SIP</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare different step-up rates." />
    </div>

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable monthly={monthly} years={years} />
    </>
  );
}
