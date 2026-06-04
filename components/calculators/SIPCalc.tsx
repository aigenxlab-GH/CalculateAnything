'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateSIP } from '@/lib/calculators/sip';

const SIPChart = dynamic(() => import('./SIPChart').then((m) => m.SIPChart), {
  ssr: false,
  loading: () => <div className="h-[150px] bg-slate-50 animate-pulse rounded-xl" />,
});
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { MutualFundTable } from '@/components/calculators/MutualFundTable';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { TrendingUp } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function SIPCalc() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate]       = useState(12);
  const [years, setYears]     = useState(10);
  const [result, setResult]   = useState<ReturnType<typeof calculateSIP> | null>(null);
  const [history, addRecord]  = useCalculationHistory('sip-calculator');

  const computeAndStore = (m: number, r: number, y: number) => {
    const res = calculateSIP(m, r, y);
    setResult(res);
    addRecord({
      label: `₹${m.toLocaleString('en-IN')}/mo · ${r}% · ${y}yr`,
      metrics: [
        { key: 'Invested',  value: fmtL(res.investedAmount) },
        { key: 'Returns',   value: fmtL(res.estimatedReturns) },
        { key: 'Total',     value: fmtL(res.totalValue) },
        { key: 'Gain',      value: `${((res.estimatedReturns / res.investedAmount) * 100).toFixed(0)}%` },
      ],
    });
  };

  const handle = () => { computeAndStore(monthly, rate, years); trackCalculate('sip-calculator'); };

  const tryExample = () => {
    setMonthly(5000); setRate(12); setYears(10);
    computeAndStore(5000, 12, 10);
  };

  // Chart data: year-by-year growth
  const chartData = result ? Array.from({ length: years + 1 }, (_, y) => {
    const { investedAmount, totalValue } = calculateSIP(monthly, rate, y || 0.001);
    return { year: `${y}y`, invested: Math.round(y > 0 ? investedAmount : 0), value: Math.round(y > 0 ? totalValue : 0) };
  }) : [];

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {[
          { label: 'Monthly Investment', value: monthly, set: setMonthly, min: 500, max: 100000, step: 500, display: fmtINR(monthly) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 30, step: 0.5, display: `${rate}%` },
          { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, display: `${years} yrs` },
        ].map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-green-600 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)} min={min} max={max} step={step}
              className="w-full h-1.5 rounded-full accent-green-600" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate SIP Returns
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-green-600 text-white rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-100 mb-1">Total Maturity Value</p>
                  <p className="text-2xl font-bold">{fmtL(result.totalValue)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-green-200">Wealth Gain</p>
                  <p className="text-lg font-bold text-green-100">{fmtL(result.estimatedReturns)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Amount Invested</p>
                  <p className="text-sm font-bold text-slate-800">{fmtL(result.investedAmount)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Returns</p>
                  <p className="text-sm font-bold text-slate-800">{fmtL(result.estimatedReturns)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 text-center mb-2">Growth Over Time</p>
              <SIPChart data={chartData} years={years} />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter SIP details and click<br /><strong>Calculate SIP Returns</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-lg transition-colors border border-green-200">
              Try: ₹5,000/mo · 12% · 10 yrs
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Run a SIP calculation to compare scenarios." />
    </div>

    {/* Personalized mutual fund comparison table */}
    <MutualFundTable monthly={monthly} years={years} />

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable monthly={monthly} years={years} />
    </>
  );
}
