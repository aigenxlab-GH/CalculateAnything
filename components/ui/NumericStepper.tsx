'use client';
import { useEffect, useState } from 'react';

interface Props {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export function NumericStepper({ value, onChange, min, max, step, className = '' }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const decrement = () => onChange(Math.max(min, +(value - step).toFixed(10)));
  const increment = () => onChange(Math.min(max, +(value + step).toFixed(10)));

  const btnStyle = isDark
    ? { backgroundColor: '#334155', color: '#f1f5f9', border: '1px solid #475569' }
    : {};

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease value"
        style={btnStyle}
        className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 disabled:opacity-35 text-slate-700 text-sm font-bold flex items-center justify-center transition-colors select-none"
      >
        −
      </button>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase value"
        style={btnStyle}
        className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 disabled:opacity-35 text-slate-700 text-sm font-bold flex items-center justify-center transition-colors select-none"
      >
        +
      </button>
    </div>
  );
}
