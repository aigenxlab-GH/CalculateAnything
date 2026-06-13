'use client';

import { useState } from 'react';
import { Clock, Copy, Check, ChevronDown } from 'lucide-react';

export interface ComparisonRecord {
  id: number;
  label: string;           // short summary of inputs, e.g. "₹5L · 8.5% · 5yr"
  metrics: { key: string; value: string }[];
}

interface ComparisonPanelProps {
  records: ComparisonRecord[];
  emptyText?: string;
}

const NUMBER_LABELS = ['①', '②', '③'];

function copyRecord(rec: ComparisonRecord): Promise<void> {
  const text = [rec.label, '---', ...rec.metrics.map((m) => `${m.key}: ${m.value}`)].join('\n');
  return navigator.clipboard.writeText(text);
}

export function ComparisonPanel({ records, emptyText = 'Run a calculation to see comparison.' }: ComparisonPanelProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCopy = (rec: ComparisonRecord) => {
    copyRecord(rec).then(() => {
      setCopiedId(rec.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {/* ignore clipboard errors */});
  };

  return (
    <aside className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Header — mobile: tappable toggle; desktop: static */}
      <div className="flex items-center gap-1.5 px-4 py-3">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Last {records.length > 0 ? records.length : 3} Calculations
        </span>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden ml-auto p-1 rounded-md hover:bg-slate-50 transition-colors"
          aria-expanded={mobileOpen}
          aria-label="Toggle comparison panel"
        >
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Body — on mobile hidden until toggled; on desktop always visible */}
      <div className={`${mobileOpen ? 'flex' : 'hidden'} lg:flex flex-col flex-1 px-4 pb-4 gap-2`}>
        {records.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-4">
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">{emptyText}</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {records.map((rec, idx) => (
              <div
                key={rec.id}
                className={`rounded-xl p-3 border ${idx === 0 ? 'border-primary/30 dark:border-primary/60 bg-primary-light/40 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40'}`}
              >
                {/* Calc label + copy button */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-[11px] font-bold ${idx === 0 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                    {NUMBER_LABELS[idx]}
                  </span>
                  <span className={`text-[11px] font-semibold truncate ${idx === 0 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                    {rec.label}
                  </span>
                  {idx === 0 && (
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 rounded-full shrink-0">
                      Latest
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopy(rec)}
                    className={`${idx !== 0 ? 'ml-auto' : ''} p-0.5 rounded text-slate-400 hover:text-slate-600 transition-colors shrink-0`}
                    title="Copy result"
                  >
                    {copiedId === rec.id
                      ? <Check className="w-3 h-3 text-green-500" />
                      : <Copy className="w-3 h-3" />
                    }
                  </button>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {rec.metrics.map((m) => (
                    <div key={m.key}>
                      <p className="text-[9px] uppercase tracking-wider text-slate-500 leading-none mb-0.5">
                        {m.key}
                      </p>
                      <p className={`text-xs font-bold leading-none ${idx === 0 ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {records.length > 0 && (
          <p className="mt-1 text-[9px] text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider">
            Click Calculate to add a new entry
          </p>
        )}
      </div>
    </aside>
  );
}
