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
    <div className="max-w-5xl mx-auto px-4 pb-8">
      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-7 text-center shadow-sm">

        {/* Header message */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Was this calculator helpful?
          </h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-md mx-auto">
          Your feedback is{' '}
          <strong className="text-slate-700 dark:text-slate-300">very important to us</strong>{' '}
          — it helps us keep improving for you! 🙏
        </p>

        {/* Vote buttons */}
        <div className="flex items-center justify-center gap-5">

          {/* 👍 Helpful */}
          <button
            type="button"
            onClick={() => handleVote('like')}
            aria-label={`Mark as helpful — ${loading ? '…' : fmt(likes)} votes`}
            aria-pressed={userVote === 'like'}
            className={`group flex flex-col items-center gap-2 px-10 py-4 rounded-2xl border-2 font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              userVote === 'like'
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-400 dark:hover:text-emerald-400 hover:shadow-sm'
            }`}
          >
            <ThumbsUp className="w-6 h-6" />
            <span className="text-xl font-bold tabular-nums leading-none">
              {loading ? '—' : fmt(likes)}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide opacity-75">
              Helpful
            </span>
          </button>

          {/* 👎 Not Helpful */}
          <button
            type="button"
            onClick={() => handleVote('dislike')}
            aria-label={`Mark as not helpful — ${loading ? '…' : fmt(dislikes)} votes`}
            aria-pressed={userVote === 'dislike'}
            className={`group flex flex-col items-center gap-2 px-10 py-4 rounded-2xl border-2 font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              userVote === 'dislike'
                ? 'bg-red-500 border-red-500 text-white shadow-md'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-red-400 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 hover:shadow-sm'
            }`}
          >
            <ThumbsDown className="w-6 h-6" />
            <span className="text-xl font-bold tabular-nums leading-none">
              {loading ? '—' : fmt(dislikes)}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide opacity-75">
              Not Helpful
            </span>
          </button>

        </div>

        {/* Thank-you confirmation */}
        {thanked && (
          <p className="mt-5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Thank you for your feedback!
          </p>
        )}

      </div>
    </div>
  );
}
