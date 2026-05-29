'use client';

import Link from 'next/link';
import { Bookmark, X } from 'lucide-react';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { calculators } from '@/lib/calculators-registry';
import { iconMap } from '@/components/CalculatorCard';

export function BookmarkedCalculators() {
  const { bookmarks, clearAll } = useBookmarks();

  /* Resolve slugs → Calculator objects (preserve save order, skip unknowns) */
  const saved = bookmarks
    .map(slug => calculators.find(c => c.slug === slug))
    .filter(Boolean) as typeof calculators;

  if (saved.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
          My Bookmarks
        </h2>
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center gap-0.5 text-[11px] text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <X className="w-3 h-3" /> Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {saved.map(calc => {
          const Icon = iconMap[calc.icon];
          return (
            <Link
              key={calc.slug}
              href={calc.href}
              className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-amber-300 dark:hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm"
            >
              {Icon && (
                <span
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: calc.bgColor }}
                >
                  <Icon className="w-3 h-3" style={{ color: calc.color }} />
                </span>
              )}
              {calc.shortTitle}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
