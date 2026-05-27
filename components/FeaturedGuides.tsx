import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { guides } from '@/lib/guides-data';

/**
 * Compact "Featured Guides" strip for the homepage. Shows the 6 most
 * recently updated guides so individual guide pages get direct PageRank
 * from the homepage — currently only the /guides/ index is linked.
 */
export function FeaturedGuides() {
  const featured = [...guides]
    .sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())
    .slice(0, 6);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-slate-800">Featured Guides</h2>
        </div>
        <Link
          href="/guides/"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featured.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="group block bg-white rounded-xl border border-slate-100 p-4 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <h3 className="font-semibold text-sm text-slate-800 group-hover:text-primary transition-colors leading-snug mb-1.5 line-clamp-2">
              {g.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">
              {g.description}
            </p>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {g.readingTime} min read
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
