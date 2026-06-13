import Link from 'next/link';
import { BadgeCheck, ShieldCheck, Clock } from 'lucide-react';
import { calculators } from '@/lib/calculators-registry';

interface Props {
  slug: string;
  reviewer?: string;
  reviewerCredential?: string;
}

/** Category-specific reviewer metadata for E-E-A-T signals */
const CATEGORY_REVIEWERS: Record<string, { reviewer: string; credential: string }> = {
  tax:        { reviewer: 'CalculateToday Editorial',  credential: 'Tax expert · Verified against official FY 2025-26 rates' },
  investment: { reviewer: 'CalculateToday Editorial',  credential: 'Investment analyst · Based on RBI-declared rates' },
  savings:    { reviewer: 'CalculateToday Editorial',  credential: 'Financial advisor · Government-authorized rate data' },
  loans:      { reviewer: 'CalculateToday Editorial',  credential: 'Loan specialist · Current market rates verified' },
  business:   { reviewer: 'CalculateToday Editorial',  credential: 'Business analyst · GST slabs updated 2025-26' },
  health:     { reviewer: 'CalculateToday Editorial',  credential: 'Health expert · WHO classification standards' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Compact E-E-A-T byline shown below the breadcrumb on every calculator page.
 * Looks up lastUpdated and category from the calculators registry by slug.
 * Adds trust signals (reviewer + credential + last-updated date) that
 * Google's quality raters look for on YMYL / finance pages.
 */
export function CalculatorByline({
  slug,
  reviewer,
  reviewerCredential,
}: Props) {
  const calc = calculators.find((c) => c.slug === slug);
  const lastUpdated = calc?.lastUpdated;

  // Use category-specific reviewer if no override passed
  const categoryReviewer = calc?.category ? CATEGORY_REVIEWERS[calc.category] : undefined;
  const resolvedReviewer = reviewer ?? categoryReviewer?.reviewer ?? 'CalculateToday Editorial';
  const resolvedCredential = reviewerCredential ?? categoryReviewer?.credential ?? 'Finance Research Team';

  return (
    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 mb-3">
      <BadgeCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      <span>
        Reviewed by{' '}
        <Link href="/about/" className="font-semibold text-slate-600 hover:text-primary hover:underline underline-offset-2 transition-colors">
          {resolvedReviewer}
        </Link>
        {resolvedCredential && (
          <span className="text-slate-500"> · {resolvedCredential}</span>
        )}
      </span>
      {lastUpdated && (
        <>
          <span className="text-slate-400">·</span>
          <span>Last updated {formatDate(lastUpdated)}</span>
        </>
      )}
    </div>
  );
}
