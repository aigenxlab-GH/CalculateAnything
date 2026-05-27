import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { guides } from '@/lib/guides-data';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Financial Guides — Personal Finance Explained',
  description:
    'In-depth guides on income tax saving, SIP vs lumpsum, home loan vs rent, PPF vs ELSS vs NPS, and business loan eligibility in India.',
  alternates: { canonical: '/guides/' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function GuidesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-12">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Financial Guides — CalculateToday',
        url: 'https://calculate-today.com/guides/',
        description: 'In-depth personal finance guides covering tax saving, SIP, home loans, PPF, ELSS, NPS, and business loans.',
      }} />

      {/* Header */}
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-3">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">Guides</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Financial Guides</h1>
        </div>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Numbers-first guides on the personal finance decisions that matter most — tax saving, investments, home loans, and business finance.
        </p>
      </div>

      {/* Guide cards */}
      <div className="space-y-5">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group block bg-white rounded-2xl border border-slate-100 p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {guide.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors mb-1.5 leading-snug">
                  {guide.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{guide.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readingTime} min read
                  </span>
                  <span>Updated {formatDate(guide.updatedDate)}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
