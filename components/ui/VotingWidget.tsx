'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useVotes } from '@/lib/hooks/useVotes';

/* Format like "1.1k" above 999 */
function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function VotingWidget() {
  const pathname = usePathname();
  /* Derive page ID from the URL slug: '/calculators/sip-calculator/' → 'sip-calculator' */
  const pageId = (pathname?.split('/').filter(Boolean).pop() ?? 'page');

  const { likes, dislikes, userVote, vote, loading } = useVotes(pageId);
  const [thanked, setThanked] = useState(false);

  const handleVote = async (type: 'like' | 'dislike') => {
    await vote(type);
    setThanked(true);
  };

  return (
    <div className="flex items-center gap-2">

        {/* 👍 */}
        <button
          type="button"
          onClick={() => handleVote('like')}
          aria-label={`Helpful — ${fmt(likes)}`}
          aria-pressed={userVote === 'like'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-150 active:scale-95 ${
            userVote === 'like'
              ? 'border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950'
              : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-400'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span className="text-xs tabular-nums font-medium">{fmt(likes)}</span>
        </button>

        {/* 👎 */}
        <button
          type="button"
          onClick={() => handleVote('dislike')}
          aria-label={`Not helpful — ${fmt(dislikes)}`}
          aria-pressed={userVote === 'dislike'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-150 active:scale-95 ${
            userVote === 'dislike'
              ? 'border-red-400 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950'
              : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:border-red-400 hover:text-red-500 dark:hover:text-red-400'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          <span className="text-xs tabular-nums font-medium">{fmt(dislikes)}</span>
        </button>

        {thanked && (
          <span className="text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">✓</span>
        )}

    </div>
  );
}
