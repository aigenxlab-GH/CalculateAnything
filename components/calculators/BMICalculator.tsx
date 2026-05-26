'use client';

import { useState } from 'react';
import { calculateBMI, activityLabels, type ActivityLevel, type BMIResult } from '@/lib/calculators/bmi';
import { Activity } from 'lucide-react';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { HealthAppTable } from '@/components/calculators/comparison/HealthAppTable';

const activityOptions: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const BMI_RANGES = [
  { label: 'Underweight', max: 18.5, color: '#3b82f6' },
  { label: 'Normal',      max: 25,   color: '#22c55e' },
  { label: 'Overweight',  max: 30,   color: '#f59e0b' },
  { label: 'Obese',       max: 45,   color: '#ef4444' },
];

function BMIGauge({ bmi }: { bmi: number }) {
  const clamped = Math.min(Math.max(bmi, 10), 45);
  const pct = ((clamped - 10) / 35) * 100;
  const active = BMI_RANGES.find((r) => bmi < r.max) ?? BMI_RANGES[3];
  return (
    <div className="mb-3">
      <div className="relative h-4 rounded-full overflow-hidden flex mb-1">
        {BMI_RANGES.map((r, i) => {
          const prev = i === 0 ? 10 : BMI_RANGES[i - 1].max;
          return <div key={r.label} className="h-full" style={{ width: `${((r.max - prev) / 35) * 100}%`, background: r.color }} />;
        })}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md -translate-x-1/2 transition-all duration-500" style={{ left: `${pct}%` }} />
      </div>
      <div className="flex justify-between">
        {BMI_RANGES.map((r) => (
          <span key={r.label} className="text-[9px] font-medium" style={{ color: r.color }}>{r.label}</span>
        ))}
      </div>
      <div className="mt-2 py-2 rounded-xl text-center text-white font-bold" style={{ background: active.color }}>
        <span className="text-xl">{bmi.toFixed(1)}</span>
        <span className="text-xs ml-2 opacity-90">— {active.label}</span>
      </div>
    </div>
  );
}

function StatRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-xs font-medium text-slate-700">{label}</p>
        {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
      </div>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

export function BMICalculator() {
  const [weight, setWeight]   = useState(70);
  const [height, setHeight]   = useState(170);
  const [age, setAge]         = useState(28);
  const [gender, setGender]   = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [result, setResult]   = useState<BMIResult | null>(null);
  const [history, addRecord]  = useCalculationHistory('bmi-calculator');

  const handleCalculate = () => {
    const res = calculateBMI(weight, height, age, gender, activity);
    setResult(res);
    addRecord({
      label: `${weight}kg · ${height}cm · ${age}yr`,
      metrics: [
        { key: 'BMI',         value: `${res.bmi.toFixed(1)} — ${res.category}` },
        { key: 'TDEE',        value: `${Math.round(res.tdee)} kcal` },
        { key: 'Ideal Wt',   value: `${res.idealWeightMin.toFixed(0)}–${res.idealWeightMax.toFixed(0)} kg` },
        { key: 'BMR',         value: `${Math.round(res.bmr)} kcal` },
      ],
    });
  };

  /* Map calculator's BMI string category to HealthAppTable's enum */
  const bmiCat: 'underweight' | 'normal' | 'overweight' | 'obese' = !result
    ? 'normal'
    : result.category === 'Underweight'  ? 'underweight'
    : result.category === 'Overweight'   ? 'overweight'
    : result.category === 'Obese'        ? 'obese'
    :                                      'normal';

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-4 items-start">

      {/* ── Inputs ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2.5">
        {/* Gender */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            {(['male', 'female'] as const).map((g) => (
              <button key={g} onClick={() => setGender(g)}
                className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${gender === g ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Weight */}
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Weight</label>
            <span className="text-sm font-bold text-primary">{weight} kg</span>
          </div>
          <input type="range" min={20} max={200} value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full h-1.5 accent-red-500" />
        </div>

        {/* Height */}
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Height</label>
            <span className="text-sm font-bold text-primary">{height} cm</span>
          </div>
          <input type="range" min={100} max={250} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full h-1.5 accent-red-500" />
        </div>

        {/* Age */}
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <label className="text-xs font-medium text-slate-600">Age</label>
            <span className="text-sm font-bold text-primary">{age} yrs</span>
          </div>
          <input type="range" min={10} max={100} value={age} onChange={(e) => setAge(+e.target.value)} className="w-full h-1.5 accent-red-500" />
        </div>

        {/* Activity */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1 block">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
            {activityOptions.map((o) => <option key={o} value={o}>{activityLabels[o]}</option>)}
          </select>
        </div>

        <button type="button" onClick={handleCalculate}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          Calculate BMI
        </button>
      </div>

      {/* ── Results ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3">
        {result ? (
          <>
            <BMIGauge bmi={result.bmi} />
            <div className="divide-y divide-slate-50">
              <StatRow label="Daily Calories (TDEE)" value={`${Math.round(result.tdee)} kcal`} sub="To maintain weight" />
              <StatRow label="To Lose Weight"         value={`${Math.round(result.tdee - 500)} kcal`} sub="500 kcal deficit" />
              <StatRow label="To Gain Weight"         value={`${Math.round(result.tdee + 500)} kcal`} sub="500 kcal surplus" />
              <StatRow label="Ideal Weight"           value={`${result.idealWeightMin.toFixed(1)}–${result.idealWeightMax.toFixed(1)} kg`} sub="BMI 18.5–24.9" />
              <StatRow label="BMR"                    value={`${Math.round(result.bmr)} kcal`} sub="Calories at rest" />
            </div>
          </>
        ) : (
          <div className="h-52 flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">Fill in your details and click<br /><strong>Calculate BMI</strong></p>
          </div>
        )}
      </div>

      {/* ── Comparison ── */}
      <ComparisonPanel records={history} emptyText="Calculate BMI to compare different profiles." />
    </div>

    {/* Fitness apps + category-specific products (mass gainers / weight loss) */}
    <HealthAppTable category={bmiCat} bmiValue={result?.bmi} />
    </>
  );
}
