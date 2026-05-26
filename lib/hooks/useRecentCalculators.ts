'use client';

import { useState, useEffect } from 'react';
import { calculators, type Calculator } from '@/lib/calculators-registry';

const KEY = 'recent-calculators';
const MAX = 6;

/**
 * Records a calculator page visit in localStorage.
 * Called by PageTracker on every /calculators/[slug]/ route.
 */
export function trackCalculatorVisit(slug: string) {
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // quota / private-browsing — ignore
  }
}

/**
 * Returns the most-recently visited Calculator objects (for the homepage strip).
 * Empty array on first visit or SSR; populates after hydration.
 */
export function useRecentCalculators(): Calculator[] {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      setSlugs(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
    } catch {
      setSlugs([]);
    }
  }, []);

  return slugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is Calculator => Boolean(c));
}
