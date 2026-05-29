'use client';

import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

export function StarButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close popover on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Star button */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label="Bookmark this page"
        aria-expanded={open}
        className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 active:scale-95 ${
          open
            ? 'text-amber-500'
            : 'text-slate-400 dark:text-slate-500 hover:text-amber-400 dark:hover:text-amber-400'
        }`}
      >
        <Star className={`w-4 h-4 transition-all ${open ? 'fill-amber-400 text-amber-500' : ''}`} />
      </button>

      {/* Tooltip popover */}
      {open && (
        <div className="absolute left-0 top-9 z-50 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3.5">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
            🔖 Bookmark this page
          </p>
          <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-300">Ctrl+D</kbd>
              <span className="ml-1.5">on Windows / Linux</span>
            </p>
            <p>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-300">⌘+D</kbd>
              <span className="ml-1.5">on Mac</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
