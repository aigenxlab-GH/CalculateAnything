'use client';

import { useState } from 'react';
import { calculateGratuity } from '@/lib/calculators/salary';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Award } from 'lucide-react';
import { NumericStepper } from '@/components/ui/NumericStepper';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function GratuityCalc() {
  const [basic, setBasic] = useState(50000);
  const [years, setYears] = useState(10);
  const [isCovered, setIsCovered] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof calculateGratuity> | null>(null);
  const [history, addRecord] = useCalculationHistory('gratuity-calculator');

  const computeAndStore = (b: number, y: number, cov: boolean) => {
    const res = calculateGratuity(b, y, cov);
    setResult(res);
    addRecord({
      label: `${fmtINR(b)}/mo · ${y}yr`,
      metrics: [
        { key: 'Gratuity',  value: fmtL(res.gratuityAmount) },
        { key: 'Tax Free',  value: fmtINR(res.taxFreeLimit) },
        { key: 'Taxable',   value: fmtINR(res.taxableGratuity) },
        { key: 'Act Cov',   value: cov ? 'Yes' : 'No' },
      ],
    });
  };

  const handle = () => { computeAndStore(basic, years, isCovered); trackCalculate('gratuity-calculator'); };

  const tryExample = () => {
    const b = 50000, y = 10, cov = true;
    setBasic(b); setYears(y); setIsCovered(cov);
    computeAndStore(b, y, cov);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div className="flex gap-2">
          {[true, false].map((covered) => (
            <button key={String(covered)} onClick={() => setIsCovered(covered)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-colors ${isCovered === covered ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {covered ? 'Covered Under Act' : 'Not Covered'}
            </button>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-xs font-medium text-slate-600">Last Drawn Basic + DA (Monthly)</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={basic} onChange={setBasic} min={10000} max={500000} step={5000} />
              <span className="text-sm font-bold text-amber-600 w-20 text-right">{fmtINR(basic)}</span>
            </div>
          </div>
          <input type="range" value={basic} onChange={(e) => setBasic(+e.target.value)}
            min={10000} max={500000} step={5000} aria-label="Last Drawn Basic + DA (Monthly)"
            className="w-full h-1.5 accent-amber-500 rounded-full" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-xs font-medium text-slate-600">Years of Service</label>
            <div className="flex items-center gap-1.5">
              <NumericStepper value={years} onChange={setYears} min={5} max={40} step={1} />
              <span className="text-sm font-bold text-amber-600 w-20 text-right">{years} years</span>
            </div>
          </div>
          <input type="range" value={years} onChange={(e) => setYears(+e.target.value)}
            min={5} max={40} step={1} aria-label="Years of Service"
            className="w-full h-1.5 accent-amber-500 rounded-full" />
        </div>

        <button type="button" onClick={handle} className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate Gratuity
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-amber-500 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">Gratuity Amount</p>
              <p className="text-2xl font-bold">{fmtL(result.gratuityAmount)}</p>
              <p className="text-xs opacity-90 mt-0.5">
                Formula: Basic × 15/{isCovered ? '26' : '30'} × {years} years
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Gratuity Amount', value: fmtL(result.gratuityAmount), sub: 'Calculated gratuity' },
                { label: 'Tax-Free Limit', value: fmtINR(result.taxFreeLimit), sub: 'Max ₹20L under Section 10(10)' },
                { label: 'Taxable Gratuity', value: fmtINR(result.taxableGratuity), sub: 'Amount above ₹20L' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
                  </div>
                  <span className={`text-sm font-bold ${label === 'Taxable Gratuity' && result.taxableGratuity > 0 ? 'text-red-500' : 'text-slate-800'}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
              <p className="font-semibold mb-1">Formula Used:</p>
              <p>{isCovered ? 'Covered: Basic × 15 × Years ÷ 26' : 'Not Covered: Basic × 15 × Years ÷ 30'}</p>
              <p className="mt-1">= {fmtINR(basic)} × 15 × {years} ÷ {isCovered ? 26 : 30}</p>
              <p className="font-bold mt-1">= {fmtL(result.gratuityAmount)}</p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter details and click<br /><strong>Calculate Gratuity</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg transition-colors border border-amber-200">
              Try: ₹50K basic · 10 yrs · Covered
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare gratuity at different salary levels." />
    </div>
  );
}
