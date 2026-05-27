'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Restores backspace-to-go-back navigation when focus is NOT on an
 * interactive element (input, textarea, select, contenteditable).
 * Guard: only fires when the current path is a /calculators/* route —
 * prevents accidental back-navigation on guide, about, or other pages.
 */
export function KeyboardNav() {
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only activate on calculator pages
    if (!pathname.startsWith('/calculators/')) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Backspace') return;

      const tag = (e.target as HTMLElement).tagName;
      const isEditable =
        tag === 'INPUT'    ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT'   ||
        (e.target as HTMLElement).isContentEditable;

      if (!isEditable) {
        e.preventDefault();
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname, router]);

  return null;
}
