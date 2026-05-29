'use client';

import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from '@/lib/firebase';

/* ── Per-calculator seed counts (displayed as base before real Firebase votes add on top) ──
   Tier 1 — highest traffic calculators  ≈ 1000 likes / 45–55 dislikes
   Tier 2 — high traffic                 ≈ 650–850 likes / 30–45 dislikes
   Tier 3 — medium traffic               ≈ 380–580 likes / 18–30 dislikes
   Tier 4 — lower traffic                ≈ 190–340 likes / 9–17 dislikes
   Fallback (unknown pageId)             ≈ 312 likes / 14 dislikes
   ─────────────────────────────────────────────────────────────────── */
const VOTE_SEEDS: Record<string, { likes: number; dislikes: number }> = {
  /* ── Tier 1 ─────────────────────────────────────────── */
  'sip-calculator':        { likes: 1247, dislikes: 52 },
  'emi-calculator':        { likes: 1189, dislikes: 61 },
  'salary-calculator':     { likes: 1156, dislikes: 67 },
  'old-vs-new-regime':     { likes: 1312, dislikes: 73 },
  'new-income-tax-2526':   { likes: 1198, dislikes: 58 },
  'fd-calculator':         { likes: 1043, dislikes: 48 },
  'gst-calculator':        { likes:  987, dislikes: 43 },

  /* ── Tier 2 ─────────────────────────────────────────── */
  'home-loan':             { likes:  823, dislikes: 39 },
  'ppf-calculator':        { likes:  764, dislikes: 34 },
  'lumpsum-calculator':    { likes:  712, dislikes: 38 },
  'hra-exemption':         { likes:  743, dislikes: 42 },
  'car-loan':              { likes:  698, dislikes: 36 },
  'goal-sip':              { likes:  689, dislikes: 31 },
  'compounding-calculator':{ likes:  671, dislikes: 29 },
  'new-income-tax-2425':   { likes:  656, dislikes: 33 },

  /* ── Tier 3 ─────────────────────────────────────────── */
  'step-up-sip':           { likes:  542, dislikes: 24 },
  'epf-calculator':        { likes:  521, dislikes: 28 },
  'personal-loan':         { likes:  534, dislikes: 29 },
  'cagr-calculator':       { likes:  487, dislikes: 21 },
  'old-income-tax':        { likes:  489, dislikes: 31 },
  'nps-calculator':        { likes:  498, dislikes: 26 },
  'rd-calculator':         { likes:  467, dislikes: 23 },
  'inflation-calculator':  { likes:  456, dislikes: 19 },
  'swp-calculator':        { likes:  412, dislikes: 22 },
  'home-loan-eligibility': { likes:  389, dislikes: 18 },

  /* ── Tier 4 ─────────────────────────────────────────── */
  'bmi-calculator':         { likes: 334, dislikes: 15 },
  'retirement-fire':        { likes: 334, dislikes: 15 },
  'loan-prepayment':        { likes: 312, dislikes: 14 },
  'educational-loan':       { likes: 298, dislikes: 13 },
  'brokerage-calculator':   { likes: 287, dislikes: 13 },
  'gratuity-calculator':    { likes: 278, dislikes: 15 },
  'break-even':             { likes: 267, dislikes: 12 },
  'interest-free-home-loan':{ likes: 256, dislikes: 14 },
  'simple-interest':        { likes: 245, dislikes: 11 },
  'profit-margin':          { likes: 243, dislikes: 12 },
  'nsc-calculator':         { likes: 234, dislikes: 10 },
  'working-capital':        { likes: 223, dislikes: 11 },
  'ppc-calculator':         { likes: 212, dislikes: 11 },
  'dscr-calculator':        { likes: 198, dislikes:  9 },

  /* ── Category landing pages ──────────────────────────── */
  'investment':  { likes: 423, dislikes: 19 },
  'tax':         { likes: 398, dislikes: 21 },
  'savings':     { likes: 376, dislikes: 17 },
  'loans':       { likes: 354, dislikes: 16 },
  'business':    { likes: 289, dislikes: 13 },
  'health':      { likes: 267, dislikes: 11 },
};

const DEFAULT_SEED = { likes: 312, dislikes: 14 };

function getSeed(pageId: string) {
  return VOTE_SEEDS[pageId] ?? DEFAULT_SEED;
}

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
  const [loading,    setLoading]    = useState(false);

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

  const seed = getSeed(pageId);
  return {
    likes:    seed.likes    + fbLikes,
    dislikes: seed.dislikes + fbDislikes,
    userVote,
    vote,
    loading,
  };
}
