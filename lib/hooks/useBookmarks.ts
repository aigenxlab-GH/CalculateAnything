'use client';

import { useEffect, useState, useCallback } from 'react';

const KEY = 'calc-bookmarks';
const MAX  = 20;

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  /* Hydrate from localStorage after mount (SSR-safe) */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch { /* private browsing / quota */ }
  }, []);

  const toggle = useCallback((slug: string) => {
    setBookmarks(prev => {
      const next = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug].slice(-MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* noop */ }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks],
  );

  const clearAll = useCallback(() => {
    setBookmarks([]);
    try { localStorage.removeItem(KEY); } catch { /* noop */ }
  }, []);

  return { bookmarks, toggle, isBookmarked, clearAll };
}
