'use client';

/**
 * NumericStepper — pair of − / + tap buttons that sits next to each slider label
 * on mobile so users can increment/decrement values precisely without dragging.
 *
 * Usage (inside a calculator slider row):
 *
 *   <div className="flex justify-between items-baseline mb-0.5">
 *     <label className="text-xs font-medium text-slate-600">{label}</label>
 *     <div className="flex items-center gap-2">
 *       <NumericStepper value={value} onChange={setter} min={min} max={max} step={step} />
 *       <span className="text-sm font-bold text-primary w-20 text-right">{display}</span>
 *     </div>
 *   </div>
 *   <input type="range" value={value} onChange={(e) => setter(+e.target.value)} ... />
 */

interface Props {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export function NumericStepper({ value, onChange, min, max, step, className = '' }: Props) {
  const decrement = () => onChange(Math.max(min, +(value - step).toFixed(10)));
  const increment = () => onChange(Math.min(max, +(value + step).toFixed(10)));

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease value"
        className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-700/60 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:border dark:border-slate-600 disabled:opacity-35 text-slate-700 dark:text-slate-400 text-sm font-bold flex items-center justify-center transition-colors select-none"
      >
        −
      </button>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase value"
        className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-700/60 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:border dark:border-slate-600 disabled:opacity-35 text-slate-700 dark:text-slate-400 text-sm font-bold flex items-center justify-center transition-colors select-none"
      >
        +
      </button>
    </div>
  );
}
