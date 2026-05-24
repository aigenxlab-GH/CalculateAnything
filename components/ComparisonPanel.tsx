'use client';

import { Clock } from 'lucide-react';

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

export function ComparisonPanel({ records, emptyText = 'Run a calculation to see comparison.' }: ComparisonPanelProps) {
  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Last {records.length > 0 ? records.length : 3} Calculations
        </span>
      </div>

      {records.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {records.map((rec, idx) => (
            <div
              key={rec.id}
              className={`rounded-xl p-3 border ${idx === 0 ? 'border-primary/30 bg-primary-light/40' : 'border-slate-100 bg-slate-50'}`}
            >
              {/* Calc label */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-[11px] font-bold ${idx === 0 ? 'text-primary' : 'text-slate-400'}`}>
                  {NUMBER_LABELS[idx]}
                </span>
                <span className={`text-[11px] font-semibold truncate ${idx === 0 ? 'text-primary' : 'text-slate-500'}`}>
                  {rec.label}
                </span>
                {idx === 0 && (
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 rounded-full shrink-0">
                    Latest
                  </span>
                )}
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {rec.metrics.map((m) => (
                  <div key={m.key}>
                    <p className="text-[9px] uppercase tracking-wider text-slate-400 leading-none mb-0.5">
                      {m.key}
                    </p>
                    <p className={`text-xs font-bold leading-none ${idx === 0 ? 'text-slate-800' : 'text-slate-600'}`}>
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
        <p className="mt-3 text-[9px] text-slate-300 text-center uppercase tracking-wider">
          Click Calculate to add a new entry
        </p>
      )}
    </aside>
  );
}
