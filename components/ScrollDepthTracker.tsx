'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires scroll_depth GA events at 25 / 50 / 75 / 90 % scroll depth.
 * Resets per-page so navigating to a new calculator starts fresh.
 * Renders nothing — drop it once in layout.tsx.
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  // Reset fired thresholds on each page navigation
  useEffect(() => {
    fired.current = new Set();
  }, [pathname]);

  useEffect(() => {
    const THRESHOLDS = [25, 50, 75, 90];

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackEvent('scroll_depth', { percent: t, page: pathname });
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
