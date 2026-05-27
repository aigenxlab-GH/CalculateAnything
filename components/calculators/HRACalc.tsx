'use client';

import { useState } from 'react';
import { calculateHRAExemption } from '@/lib/calculators/salary';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { Home } from 'lucide-react';
import { TaxFilingTable } from '@/components/calculators/comparison/TaxFilingTable';
import { NumericStepper } from '@/components/ui/NumericStepper';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

export function HRACalc() {
  const [annualHRA, setAnnualHRA] = useState(240000);
  const [annualBasic, setAnnualBasic] = useState(480000);
  const [annualRent, setAnnualRent] = useState(300000);
  const [isMetro, setIsMetro] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof calculateHRAExemption> | null>(null);
  const [history, addRecord] = useCalculationHistory('hra-exemption');

  const computeAndStore = (hra: number, basic: number, rent: number, metro: boolean) => {
    const res = calculateHRAExemption(hra, basic, rent, metro);
    setResult(res);
    addRecord({
      label: `Rent ${fmtL(rent)} · ${metro ? 'Metro' : 'Non-Metro'}`,
      metrics: [
        { key: 'Exemption', value: fmtINR(res.hraExemption) },
        { key: 'Taxable',   value: fmtINR(res.taxableHRA) },
        { key: 'Exc. Cond', value: `Cond ${[res.exemption1, res.exemption2, res.exemption3].indexOf(res.hraExemption) + 1}` },
        { key: 'Saved',     value: fmtINR(res.hraExemption * 0.3) },
      ],
    });
  };

  const handle = () => computeAndStore(annualHRA, annualBasic, annualRent, isMetro);

  const tryExample = () => {
    const exHRA = 240000;
    const exBasic = 480000;
    const exRent = 300000;
    const exMetro = true;
    setAnnualHRA(exHRA);
    setAnnualBasic(exBasic);
    setAnnualRent(exRent);
    setIsMetro(exMetro);
    computeAndStore(exHRA, exBasic, exRent, exMetro);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4 items-start">
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div className="flex gap-2">
          {[true, false].map((metro) => (
            <button key={String(metro)} onClick={() => setIsMetro(metro)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-colors ${isMetro === metro ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {metro ? 'Metro City (50%)' : 'Non-Metro (40%)'}
            </button>
          ))}
        </div>

        {([
          ['Annual HRA Received', annualHRA, setAnnualHRA, 600000],
          ['Annual Basic Salary', annualBasic, setAnnualBasic, 2000000],
          ['Annual Rent Paid', annualRent, setAnnualRent, 600000],
        ] as [string, number, (v: number) => void, number][]).map(([label, val, setter, max]) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-slate-600">{label}</label>
              <div className="flex items-center gap-1.5">
                <NumericStepper value={val} onChange={setter} min={0} max={max} step={12000} />
                <span className="text-sm font-bold text-orange-500 w-20 text-right">{fmtL(val)}</span>
              </div>
            </div>
            <input type="range" value={val} onChange={(e) => setter(+e.target.value)}
              min={0} max={max} step={12000} aria-label={label}
              className="w-full h-1.5 accent-orange-500 rounded-full" />
          </div>
        ))}

        <button type="button" onClick={handle} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
          Calculate HRA Exemption
        </button>
      </div>

      <div className="space-y-3">
        {result ? (
          <>
            <div className="bg-orange-500 text-white rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">HRA Exemption Allowed</p>
              <p className="text-2xl font-bold">{fmtINR(result.hraExemption)}</p>
              <p className="text-xs opacity-90 mt-0.5">Taxable HRA: {fmtINR(result.taxableHRA)}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 px-4 pt-3 pb-2">3-Condition Test (Minimum Applies)</p>
              <div className="divide-y divide-slate-100">
                {[
                  { label: 'Condition 1', desc: 'Actual HRA received', value: result.exemption1 },
                  { label: 'Condition 2', desc: `Rent – 10% of Basic (${fmtINR(annualBasic * 0.1)})`, value: result.exemption2 },
                  { label: 'Condition 3', desc: `${isMetro ? '50' : '40'}% of Basic Salary`, value: result.exemption3 },
                ].map(({ label, desc, value }) => {
                  const isMin = value === result!.hraExemption;
                  return (
                    <div key={label} className={`px-4 py-3 flex justify-between items-start ${isMin ? 'bg-orange-50' : ''}`}>
                      <div>
                        <p className={`text-xs font-semibold ${isMin ? 'text-orange-600' : 'text-slate-700'}`}>
                          {label} {isMin && <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full ml-1">✓ Applied</span>}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                      </div>
                      <span className={`text-sm font-bold ${isMin ? 'text-orange-600' : 'text-slate-700'}`}>{fmtINR(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">HRA Exempt</p>
                <p className="text-sm font-bold text-green-600">{fmtINR(result.hraExemption)}</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Taxable HRA</p>
                <p className="text-sm font-bold text-red-500">{fmtINR(result.taxableHRA)}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 h-64 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter HRA details and click<br /><strong>Calculate HRA Exemption</strong></p>
            <button type="button" onClick={tryExample}
              className="text-xs px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors font-medium">
              Try: ₹2.4L HRA, ₹4.8L Basic, ₹3L Rent
            </button>
          </div>
        )}
      </div>

      <ComparisonPanel records={history} emptyText="Compare HRA exemption for different rent levels." />
    </div>
    <TaxFilingTable income={annualBasic} />
    </>
  );
}
