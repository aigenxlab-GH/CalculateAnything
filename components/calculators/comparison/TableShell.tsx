'use client';

import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Shared visual shell for all comparison tables on calculator pages.
 *
 * Matches the proven BankRateTable / MutualFundTable design:
 *   - rounded-2xl container with subtle shadow
 *   - gradient header (color per category) with punchy headline + sub-line
 *   - scroll-x table area
 *   - footer with disclaimer + "Browse all" link
 *
 * Each specialised table renders its own <table> body inside `children`.
 */
export function TableShell({
  headline,
  subline,
  headerIcon,
  gradientClass = 'bg-gradient-to-r from-slate-50 via-white to-slate-50',
  iconColorClass = 'text-slate-600',
  children,
  footerNote,
  browseAllUrl,
  browseAllLabel = 'Browse all',
  browseAllColorClass = 'text-primary',
  className = 'mt-3',
}: {
  headline:          ReactNode;
  subline?:          ReactNode;
  headerIcon?:       ReactNode;
  gradientClass?:    string;
  iconColorClass?:   string;
  children:          ReactNode;
  footerNote:        ReactNode;
  browseAllUrl?:     string;
  browseAllLabel?:   string;
  browseAllColorClass?: string;
  className?:        string;
}) {
  return (
    <div className={`${className} rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm`}>
      {/* Header — gradient in light mode, flat dark surface in dark mode */}
      <div className={`px-5 py-4 ${gradientClass} dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700`}>
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 flex-wrap">
          {headerIcon && <span className={iconColorClass}>{headerIcon}</span>}
          {headline}
        </h2>
        {subline && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subline}</p>
        )}
      </div>

      {/* Table body */}
      {children}

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">{footerNote}</p>
        {browseAllUrl && (
          <a
            href={browseAllUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`text-[10px] font-semibold ${browseAllColorClass} hover:underline whitespace-nowrap flex items-center gap-0.5`}
          >
            {browseAllLabel} <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
}
