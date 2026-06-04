'use client';

import { useState } from 'react';
import { calculateGST, GST_RATES } from '@/lib/calculators/gst';
import { GstSoftwareTable } from '@/components/calculators/comparison/GstSoftwareTable';
import { Receipt, ArrowRight } from 'lucide-react';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { trackCalculate } from '@/lib/analytics';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

function Row({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 px-3 rounded-xl ${highlight ? 'bg-primary text-white' : 'bg-slate-50'}`}>
      <div>
        <p className={`text-xs font-medium ${highlight ? 'text-white' : 'text-slate-700'}`}>{label}</p>
        {sub && <p className={`text-[10px] mt-0.5 ${highlight ? 'text-blue-200' : 'text-slate-500'}`}>{sub}</p>}
      </div>
      <p className={`text-sm font-bold ${highlight ? 'text-white' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

export function GSTCalculator() {
  const [amount, setAmount]   = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode]       = useState<'add' | 'remove'>('add');
  const [result, setResult]   = useState<ReturnType<typeof calculateGST> | null>(null);
  const [history, addRecord]  = useCalculationHistory('gst-calculator');

  const computeAndStore = (a: number, r: number, m: 'add' | 'remove') => {
    const res = calculateGST(a, r, m);
    setResult(res);
    addRecord({
      label: `₹${a.toLocaleString('en-IN')} · ${r}% · ${m === 'add' ? '+GST' : '-GST'}`,
      metrics: [
        { key: 'GST Amt',   value: fmtINR(res.gstAmount) },
        { key: 'Pre-GST',   value: fmtINR(res.preTaxAmount) },
        { key: 'Total',     value: fmtINR(res.postTaxAmount) },
        { key: 'CGST/SGST', value: fmtINR(res.cgst) },
      ],
    });
  };

  const handleCalculate = () => { computeAndStore(amount, gstRate, mode); trackCalculate('gst-calculator'); };

  const tryExample = () => {
    setAmount(10000); setGstRate(18); setMode('add');
    computeAndStore(10000, 18, 'add');
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4 items-start">

      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Mode</label>
          <div className="grid grid-cols-2 gap-2">
            {([['add', 'Add GST'], ['remove', 'Remove GST']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setMode(v)}
                className={`py-1.5 rounded-xl text-xs font-semibold transition-colors ${mode === v ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">
            {mode === 'add' ? 'Amount (excl. GST)' : 'GST-Inclusive Amount'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
            <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} min={0} step={100}
              className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">GST Rate</label>
          <div className="grid grid-cols-4 gap-1">
            {GST_RATES.map((r) => (
              <button key={r} onClick={() => setGstRate(r)}
                className={`py-1.5 rounded-xl text-xs font-bold transition-colors ${gstRate === r ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {r}%
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleCalculate}
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          Calculate GST
        </button>
      </div>

      {/* ── Results ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3">
        <div className="text-sm font-bold text-slate-700 mb-3">Breakdown</div>

        {result ? (
          <>
            {/* Flow */}
            <div className="flex items-center justify-center gap-2 mb-4 py-3 bg-slate-50 rounded-xl">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 mb-0.5">Pre-GST</p>
                <p className="text-sm font-bold text-slate-800">{fmtINR(result.preTaxAmount)}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <div className="text-center">
                <p className="text-[10px] text-green-600 mb-0.5">+GST {gstRate}%</p>
                <p className="text-sm font-bold text-green-600">{fmtINR(result.gstAmount)}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <div className="text-center">
                <p className="text-[10px] text-slate-500 mb-0.5">Total</p>
                <p className="text-sm font-bold text-slate-800">{fmtINR(result.postTaxAmount)}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <Row label="Pre-GST Amount"   value={fmtINR(result.preTaxAmount)} />
              <Row label="GST Amount"       value={fmtINR(result.gstAmount)} sub={`${gstRate}% applied`} />
              <Row label="CGST"             value={fmtINR(result.cgst)} sub={`${gstRate / 2}%`} />
              <Row label="SGST / UTGST"     value={fmtINR(result.sgst)} sub={`${gstRate / 2}%`} />
              <Row label="Total (incl. GST)" value={fmtINR(result.postTaxAmount)} highlight />
            </div>
          </>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center gap-3">
            <p className="text-xs text-slate-500 text-center">Enter details and click<br /><strong>Calculate GST</strong></p>
            <button type="button" onClick={tryExample}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold rounded-lg transition-colors border border-green-200">
              Try: ₹10,000 + 18% GST
            </button>
          </div>
        )}
      </div>

      {/* ── Comparison ── */}
      <ComparisonPanel records={history} emptyText="Calculate GST to compare different rates or amounts." />
    </div>
    <GstSoftwareTable gstAmount={result?.gstAmount} />
    </>
  );
}
