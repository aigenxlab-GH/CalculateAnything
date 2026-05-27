import { BadgeCheck } from 'lucide-react';
import { calculators } from '@/lib/calculators-registry';

interface Props {
  slug: string;
  reviewer?: string;
  reviewerCredential?: string;
}

/** Category-specific reviewer metadata for E-E-A-T signals */
const CATEGORY_REVIEWERS: Record<string, { reviewer: string; credential: string }> = {
  tax:        { reviewer: 'CalculateToday Editorial',  credential: 'FY 2025-26 tax slabs · Informational only' },
  investment: { reviewer: 'CalculateToday Editorial',  credential: 'Public fund data · Informational only' },
  savings:    { reviewer: 'CalculateToday Editorial',  credential: 'Govt-declared rates · Informational only' },
  loans:      { reviewer: 'CalculateToday Editorial',  credential: 'Current market rates · Informational only' },
  business:   { reviewer: 'CalculateToday Editorial',  credential: 'GST slabs updated 2025 · Informational only' },
  health:     { reviewer: 'CalculateToday Editorial',  credential: 'WHO BMI classification · Informational only' },
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
        <span className="font-semibold text-slate-600">{resolvedReviewer}</span>
        {resolvedCredential && (
          <span className="text-slate-500"> · {resolvedCredential}</span>
        )}
      </span>
      {lastUpdated && (
        <>
          <span className="text-slate-300">·</span>
          <span>Last updated {formatDate(lastUpdated)}</span>
        </>
      )}
    </div>
  );
}
