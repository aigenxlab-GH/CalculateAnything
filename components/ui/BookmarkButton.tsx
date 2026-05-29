'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/lib/hooks/useBookmarks';

export function BookmarkButton() {
  const pathname  = usePathname();
  const slug      = pathname?.split('/').filter(Boolean).pop() ?? '';
  const { toggle, isBookmarked } = useBookmarks();
  const saved     = isBookmarked(slug);
  const [flash, setFlash] = useState<'saved' | 'removed' | null>(null);

  const handleClick = () => {
    toggle(slug);
    setFlash(saved ? 'removed' : 'saved');
    setTimeout(() => setFlash(null), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this calculator'}
      aria-pressed={saved}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all duration-150 active:scale-95 ${
        saved
          ? 'border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950'
          : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-amber-300 hover:text-amber-500 dark:hover:border-amber-600 dark:hover:text-amber-400'
      }`}
    >
      {saved
        ? <BookmarkCheck className="w-3.5 h-3.5" />
        : <Bookmark      className="w-3.5 h-3.5" />
      }
      <span>
        {flash === 'saved'   ? 'Saved!'   :
         flash === 'removed' ? 'Removed'  :
         saved               ? 'Bookmarked' : 'Bookmark'}
      </span>
    </button>
  );
}
