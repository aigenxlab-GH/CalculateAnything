'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-3">
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">

          {/* Label */}
          <div className="flex items-center gap-1.5 mr-1 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              Was this helpful?
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
              Your feedback is very important to us 🙏
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Vote buttons — compact inline */}
          <div className="flex items-center gap-2">

            {/* 👍 */}
            <button
              type="button"
              onClick={() => handleVote('like')}
              aria-label={`Mark as helpful — ${fmt(likes)} votes`}
              aria-pressed={userVote === 'like'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 active:scale-95 ${
                userVote === 'like'
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="tabular-nums font-bold">{fmt(likes)}</span>
              <span className="hidden sm:inline opacity-75">Helpful</span>
            </button>

            {/* 👎 */}
            <button
              type="button"
              onClick={() => handleVote('dislike')}
              aria-label={`Mark as not helpful — ${fmt(dislikes)} votes`}
              aria-pressed={userVote === 'dislike'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 active:scale-95 ${
                userVote === 'dislike'
                  ? 'bg-red-500 border-red-500 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-red-400 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span className="tabular-nums font-bold">{fmt(dislikes)}</span>
              <span className="hidden sm:inline opacity-75">Not Helpful</span>
            </button>

          </div>

          {/* Thank-you — inline */}
          {thanked && (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              ✓ Thank you!
            </span>
          )}

        </div>
      </div>
    </div>
  );
}
