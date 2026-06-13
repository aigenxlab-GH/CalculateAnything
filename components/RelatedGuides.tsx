import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { getGuidesForCalculator } from '@/lib/guides-data';

interface Props {
  /** Calculator id (equals slug). Shows up to 3 matching guides. */
  calculatorId: string;
}

/**
 * "Related Reading" — links a calculator page to relevant long-form
 * guides that mention it. Closes the internal-linking loop and passes
 * SEO equity in both directions.
 *
 * Renders nothing if no guides match.
 */
export function RelatedGuides({ calculatorId }: Props) {
  const matches = getGuidesForCalculator(calculatorId).slice(0, 3);
  if (matches.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-primary" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Related Reading</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {matches.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors leading-snug mb-1.5 line-clamp-2">
              {g.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-2">
              {g.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {g.readingTime} min read
              </span>
              <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
