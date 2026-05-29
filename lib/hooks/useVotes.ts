'use client';

import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from '@/lib/firebase';

/* ── Seed counts — displayed before / without real Firebase data ── */
const LIKE_SEED    = 1051;
const DISLIKE_SEED = 113;

export type VoteType = 'like' | 'dislike' | null;

export interface VotesState {
  likes:    number;
  dislikes: number;
  userVote: VoteType;
  vote:     (type: 'like' | 'dislike') => Promise<void>;
  loading:  boolean;
}

export function useVotes(pageId: string): VotesState {
  const [fbLikes,    setFbLikes]    = useState(0);
  const [fbDislikes, setFbDislikes] = useState(0);
  const [userVote,   setUserVote]   = useState<VoteType>(null);
  const [loading,    setLoading]    = useState(true);

  /* Hydrate user's stored vote from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`voted-${pageId}`) as VoteType;
      if (stored === 'like' || stored === 'dislike') setUserVote(stored);
    } catch { /* localStorage unavailable (SSR guard) */ }
  }, [pageId]);

  /* Subscribe to Firebase real-time counts */
  useEffect(() => {
    if (!db || !pageId) { setLoading(false); return; }

    const votesRef = ref(db, `votes/${pageId}`);
    const unsub = onValue(
      votesRef,
      (snap) => {
        const data = snap.val() ?? {};
        setFbLikes(Number(data.likes) || 0);
        setFbDislikes(Number(data.dislikes) || 0);
        setLoading(false);
      },
      () => { setLoading(false); }, // on error: show seed counts
    );
    return () => unsub();
  }, [pageId]);

  const vote = useCallback(async (type: 'like' | 'dislike') => {
    if (!db || !pageId) return;

    const prev = userVote;

    if (prev === type) {
      /* Un-vote */
      const fieldRef = ref(db, `votes/${pageId}/${type}s`);
      await runTransaction(fieldRef, (cur) => Math.max(0, (cur ?? 0) - 1));
      try { localStorage.removeItem(`voted-${pageId}`); } catch { /* noop */ }
      setUserVote(null);
    } else {
      /* Switching vote — decrement previous first */
      if (prev) {
        const prevRef = ref(db, `votes/${pageId}/${prev}s`);
        await runTransaction(prevRef, (cur) => Math.max(0, (cur ?? 0) - 1));
      }
      /* Increment new vote */
      const newRef = ref(db, `votes/${pageId}/${type}s`);
      await runTransaction(newRef, (cur) => (cur ?? 0) + 1);
      try { localStorage.setItem(`voted-${pageId}`, type); } catch { /* noop */ }
      setUserVote(type);
    }
  }, [pageId, userVote]);

  return {
    likes:    LIKE_SEED    + fbLikes,
    dislikes: DISLIKE_SEED + fbDislikes,
    userVote,
    vote,
    loading,
  };
}
