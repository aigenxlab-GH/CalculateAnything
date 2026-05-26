'use client';

import { useState } from 'react';
import { calculateGoalSIP, calculateSIP } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { Target } from 'lucide-react';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function GoalSIPCalc() {
  const [goal, setGoal]   = useState(5000000);
  const [rate, setRate]   = useState(12);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState<{ required: number; totalInvested: number; totalValue: number } | null>(null);
  const [history, addRecord] = useCalculationHistory('goal-sip');

  const handle = () => {
    const required = calculateGoalSIP(goal, rate, years);
    const { investedAmount, totalValue } = calculateSIP(required, rate, years);
    setResult({ required, totalInvested: investedAmount, totalValue });
    addRecord({
      label: `Goal ${fmtL(goal)} · ${years}yr`,
      metrics: [
        { key: 'Monthly SIP', value: fmtINR(required) },
        { key: 'Invested',    value: fmtL(investedAmount) },
        { key: 'Target',      value: fmtL(goal) },
        { key: 'Rate',        value: `${rate}%` },
      ],
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Target Goal Amount', value: goal, set: setGoal, min: 100000, max: 50000000, step: 100000, display: fmtL(goal) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Horizon', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <span className="text-sm font-bold text-green-600">{display}</span>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step}
              className="w-full h-1.5 accent-green-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Required SIP
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-green-600 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Monthly SIP Required</p>
              <p className="text-2xl font-bold">{fmtINR(result.required)}</p>
              <p className="text-xs opacity-90 mt-0.5">To reach {fmtL(goal)} in {years} years</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Monthly SIP', value: fmtINR(result.required) },
                { label: 'Total Invested', value: fmtL(result.totalInvested) },
                { label: 'Goal Amount', value: fmtL(goal) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-sm">
              <p className="text-green-700 font-medium">
                Invest <strong>{fmtINR(result.required)}/month</strong> for <strong>{years} years</strong> at <strong>{rate}%</strong> p.a. to accumulate <strong>{fmtL(goal)}</strong>.
              </p>
              <p className="text-green-600 text-xs mt-2">
                Returns contribute: {fmtL(result.totalValue - result.totalInvested)} ({((result.totalValue - result.totalInvested) / result.totalValue * 100).toFixed(0)}% of corpus)
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Set your goal and click<br /><strong>Calculate Required SIP</strong></p>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Plan different goals to compare SIP amounts." />
    </div>

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable monthly={result?.required} years={years} />
    </>
  );
}
