'use client';

import { useState, useCallback } from 'react';
import type { ComparisonRecord } from '@/components/ComparisonPanel';

/**
 * Persists calculator comparison history in localStorage.
 * Falls back silently to in-memory state on SSR or quota errors.
 *
 * @param storageKey  Unique key per calculator (e.g. 'sip-calculator')
 * @param max         Max entries to keep (default 3)
 */
export function useCalculationHistory(storageKey: string, max = 3) {
  const [records, setRecords] = useState<ComparisonRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(`calc-history:${storageKey}`);
      return raw ? (JSON.parse(raw) as ComparisonRecord[]) : [];
    } catch {
      return [];
    }
  });

  const addRecord = useCallback(
    (entry: Omit<ComparisonRecord, 'id'>) => {
      setRecords((prev) => {
        const next = [{ id: Date.now(), ...entry }, ...prev].slice(0, max);
        try {
          localStorage.setItem(`calc-history:${storageKey}`, JSON.stringify(next));
        } catch {
          // ignore quota / private-browsing errors
        }
        return next;
      });
    },
    [storageKey, max],
  );

  return [records, addRecord] as const;
}
