'use client';

import { useState } from 'react';
import { Mail, Gift, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const CK_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
const CK_API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

type State = 'idle' | 'loading' | 'success' | 'error';

/**
 * NewsletterCapture — email opt-in with free lead magnet.
 *
 * Renders ONLY when both env vars are set:
 *   NEXT_PUBLIC_CONVERTKIT_FORM_ID   — from ConvertKit form URL
 *   NEXT_PUBLIC_CONVERTKIT_API_KEY   — public API key (safe to expose client-side)
 *
 * Placement: after FAQ section, before Related Calculators, on every calculator page.
 *
 * Setup steps:
 *   1. Sign up at convertkit.com → create a Form → copy Form ID from URL
 *   2. Account Settings → API Keys → copy Public API Key
 *   3. Add both to .env.local (and Netlify env vars for production)
 */
export function NewsletterCapture() {
  const [email, setEmail]   = useState('');
  const [state, setState]   = useState<State>('idle');
  const [errMsg, setErrMsg] = useState('');

  // Silent no-op if not configured — safe to add to all pages
  if (!CK_FORM_ID || !CK_API_KEY) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    setErrMsg('');

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ api_key: CK_API_KEY, email: email.trim() }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? 'Subscription failed');
      }

      setState('success');
    } catch (err) {
      setState('error');
      setErrMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  /* ── Success state ───────────────────────────────────────────── */
  if (state === 'success') {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-emerald-800">You&rsquo;re in! Check your inbox 📬</p>
          <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
            We&rsquo;ve sent the <strong>Tax-Saving Checklist 2025-26</strong> to{' '}
            <strong>{email}</strong>. Check your spam folder if it doesn&rsquo;t arrive in 2 minutes.
          </p>
        </div>
      </div>
    );
  }

  /* ── Default / loading / error state ────────────────────────── */
  return (
    <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <Gift className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">
            Free: Tax-Saving Checklist 2025-26 📋
          </p>
          <p className="text-xs text-slate-500 mt-0.5 leading-snug">
            80C, 80D, HRA, NPS — 12 deductions most people miss. One-page PDF, free forever.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address for free tax-saving checklist"
            disabled={state === 'loading'}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 bg-white transition disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap"
        >
          {state === 'loading' ? (
            <span className="animate-pulse">Sending…</span>
          ) : (
            <>
              Send me the PDF
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Error message */}
      {state === 'error' && (
        <div role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          {errMsg}
        </div>
      )}

      {/* Fine print */}
      <p className="mt-2.5 text-[10px] text-slate-500 leading-relaxed">
        No spam. Unsubscribe anytime.{' '}
        By subscribing you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-slate-600 transition-colors">
          Privacy Policy
        </a>.
      </p>
    </div>
  );
}
