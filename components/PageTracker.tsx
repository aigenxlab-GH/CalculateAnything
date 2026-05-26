'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackCalculatorVisit } from '@/lib/hooks/useRecentCalculators';

/**
 * Invisible client component — tracks calculator page visits in localStorage.
 * Mounted once in the root layout so it covers all routes automatically.
 */
export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/^\/calculators\/([^/]+)\/?$/);
    if (match) trackCalculatorVisit(match[1]);
  }, [pathname]);

  return null;
}
