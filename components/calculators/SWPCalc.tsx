'use client';

import { useState } from 'react';
import { calculateSWP } from '@/lib/calculators/sip';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { BrokerPlatformTable } from '@/components/calculators/comparison/BrokerPlatformTable';
import { ArrowDownCircle } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function SWPCalc() {
  const [corpus, setCorpus]       = useState(5000000);
  const [monthly, setMonthly]     = useState(30000);
  const [rate, setRate]           = useState(8);
  const [result, setResult]       = useState<ReturnType<typeof calculateSWP> | null>(null);
  const [history, addRecord] = useCalculationHistory('swp-calculator');

  const computeAndStore = (c: number, mo: number, r: number) => {
    const res = calculateSWP(c, mo, r);
    setResult(res);
    addRecord({
      label: `${fmtL(c)} · ${fmtINR(mo)}/mo`,
      metrics: [
        { key: 'Duration',  value: `${Math.floor(res.monthsLasting / 12)}y ${res.monthsLasting % 12}m` },
        { key: 'Withdrawn', value: fmtL(res.totalWithdrawn) },
        { key: 'Remaining', value: fmtL(res.remainingCorpus) },
        { key: 'Rate',      value: `${r}%` },
      ],
    });
  };

  const handle = () => { computeAndStore(corpus, monthly, rate); trackCalculate('swp-calculator'); };

  const tryExample = () => {
    const c = 5000000, mo = 30000, r = 8;
    setCorpus(c); setMonthly(mo); setRate(r);
    computeAndStore(c, mo, r);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {([
          { label: 'Investment Corpus', value: corpus, set: setCorpus, min: 500000, max: 50000000, step: 100000, display: fmtL(corpus) },
          { label: 'Monthly Withdrawal', value: monthly, set: setMonthly, min: 5000, max: 500000, step: 5000, display: fmtINR(monthly) },
          { label: 'Expected Return (p.a.)', value: rate, set: setRate, min: 1, max: 20, step: 0.5, display: `${rate}%` },
        ]).map(({ label, value, set, min, max, step, display }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={value} onChange={set} min={min} max={max} step={step} />
                <span className="text-sm font-bold text-cyan-700 w-20 text-right">{display}</span>
              </div>
            </div>
            <input type="range" value={value} onChange={(e) => set(+e.target.value)}
              min={min} max={max} step={step} aria-label={label}
              className="w-full h-1.5 accent-cyan-600 rounded-full" />
          </div>
        ))}
        <button type="button" onClick={handle} className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate SWP Duration
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className={`rounded-2xl p-4 text-white ${result.monthsLasting >= 600 ? 'bg-green-600' : 'bg-cyan-600'}`}>
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Corpus Lasts For</p>
              <p className="text-2xl font-bold">
                {result.monthsLasting >= 600
                  ? 'Indefinitely (50+ yrs)'
                  : `${Math.floor(result.monthsLasting / 12)} yrs ${result.monthsLasting % 12} mo`}
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                {result.monthsLasting >= 600
                  ? 'Corpus grows faster than withdrawals!'
                  : `Total withdrawn: ${fmtL(result.totalWithdrawn)}`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Starting Corpus', value: fmtL(corpus) },
                { label: 'Monthly Withdrawal', value: fmtINR(monthly) },
                { label: 'Total Withdrawn', value: fmtL(result.totalWithdrawn) },
                { label: 'Remaining Corpus', value: fmtL(result.remainingCorpus) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-cyan-50 rounded-xl p-3 text-xs text-cyan-800">
              <p className="font-medium">Monthly Interest Earned on Corpus:</p>
              <p className="mt-1">{fmtINR(corpus * rate / 12 / 100)} (at {rate}% return)</p>
              <p className="mt-1 text-cyan-700">
                {corpus * rate / 12 / 100 >= monthly
                  ? '✓ Returns exceed withdrawals — corpus grows forever!'
                  : `Monthly deficit: ${fmtINR(monthly - corpus * rate / 12 / 100)} drawn from corpus`}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter details and click<br /><strong>Calculate SWP Duration</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-lg transition-colors border border-cyan-200">
              Try: ₹50L corpus · ₹30K/mo · 8%
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare different withdrawal amounts." />
    </div>

    {/* Where to invest — broker platform comparison */}
    <BrokerPlatformTable monthly={monthly} />
    </>
  );
}
