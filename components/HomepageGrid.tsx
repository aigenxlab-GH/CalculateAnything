'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Clock, Calculator } from 'lucide-react';
import { CalculatorCard, iconMap } from '@/components/CalculatorCard';
import { calculators, type Category } from '@/lib/calculators-registry';
import { useRecentCalculators } from '@/lib/hooks/useRecentCalculators';

const POPULAR_IDS = [
  'emi-calculator',
  'sip-calculator',
  'home-loan',
  'new-income-tax-2526',
  'salary-calculator',
  'old-vs-new-regime',
  'gst-calculator',
  'fd-calculator',
  'ppf-calculator',
  'personal-loan',
  'epf-calculator',
  'brokerage-calculator',
  'car-loan',
  'lumpsum-calculator',
  'nps-calculator',
  'hra-exemption',
  'rd-calculator',
  'gratuity-calculator',
];

const popular = POPULAR_IDS.map((id) => calculators.find((c) => c.id === id)!).filter(Boolean);

const TABS: { label: string; value: 'all' | Category; href?: string }[] = [
  { label: 'Popular',           value: 'all' },
  { label: 'Income Tax',        value: 'tax',        href: '/calculators/tax/' },
  { label: 'Investment',        value: 'investment', href: '/calculators/investment/' },
  { label: 'Savings',           value: 'savings',    href: '/calculators/savings/' },
  { label: 'Loans & EMI',       value: 'loans',      href: '/calculators/loans/' },
  { label: 'Business',          value: 'business',   href: '/calculators/business/' },
  { label: 'Health',            value: 'health',     href: '/calculators/health/' },
];

export function HomepageGrid() {
  const [active, setActive] = useState<'all' | Category>('all');
  const [query, setQuery]   = useState('');
  const recents             = useRecentCalculators();

  /* Search overrides the category filter — when the user is typing,
     we search across ALL calculators, not just the active category. */
  const trimmed = query.trim().toLowerCase();

  const displayed = useMemo(() => {
    if (trimmed) {
      return calculators.filter((c) =>
        c.title.toLowerCase().includes(trimmed) ||
        c.shortTitle.toLowerCase().includes(trimmed) ||
        c.description.toLowerCase().includes(trimmed) ||
        (c.keywords?.some((k) => k.toLowerCase().includes(trimmed)) ?? false)
      );
    }
    return active === 'all' ? popular : calculators.filter((c) => c.category === active);
  }, [trimmed, active]);

  return (
    <section>
      {/* Semantic H2 for heading hierarchy: H1 → H2 → H3 (calculator cards) */}
      <h2 className="sr-only">Browse Calculators</h2>
      {/* Recently Used strip — hidden during search and on first visit */}
      {!trimmed && recents.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Recently Used
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recents.map((calc) => {
              const Icon = iconMap[calc.icon] ?? Calculator;
              return (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-primary/50 hover:text-primary transition-all duration-150 shadow-sm"
                >
                  <span
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: calc.bgColor }}
                  >
                    <Icon className="w-2.5 h-2.5" style={{ color: calc.color }} />
                  </span>
                  {calc.shortTitle}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Search + tabs row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        {/* Search box */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators..."
            aria-label="Search calculators"
            role="searchbox"
            className="w-full pl-8 pr-8 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-600 transition"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category tabs (hidden when searching) */}
        {!trimmed && (
          <div role="tablist" aria-label="Calculator categories" className="flex flex-wrap gap-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active === tab.value}
                onClick={() => setActive(tab.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
                  active === tab.value
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-primary/50 hover:text-primary dark:hover:border-primary/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* "View all in this category" link — shown when a non-Popular tab is active */}
      {!trimmed && active !== 'all' && (() => {
        const tab = TABS.find((t) => t.value === active);
        return tab?.href ? (
          <div className="mb-2">
            <Link
              href={tab.href}
              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
            >
              View all {tab.label} calculators →
            </Link>
          </div>
        ) : null;
      })()}

      {/* Result counter — only shown when searching */}
      {trimmed && (
        <p className="text-xs text-slate-500 mb-3">
          {displayed.length === 0
            ? <>No calculators match <strong className="text-slate-700">&ldquo;{query}&rdquo;</strong></>
            : <>{displayed.length} {displayed.length === 1 ? 'result' : 'results'} for <strong className="text-slate-700">&ldquo;{query}&rdquo;</strong></>}
        </p>
      )}

      {/* Grid */}
      <div
        role="tabpanel"
        aria-live="polite"
        aria-atomic="true"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {displayed.map((calc) => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>

      {/* Empty state */}
      {trimmed && displayed.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Try searching for <em>EMI</em>, <em>SIP</em>, <em>tax</em>, <em>FD</em>, or <em>loan</em>
        </div>
      )}
    </section>
  );
}
