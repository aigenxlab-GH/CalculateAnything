import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, BadgeCheck, AlertCircle, Lightbulb, Info } from 'lucide-react';
import { guides, getGuide } from '@/lib/guides-data';
import { calculators } from '@/lib/calculators-registry';
import { CalculatorCard } from '@/components/CalculatorCard';
import { JsonLd } from '@/components/JsonLd';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.tags,
    alternates: { canonical: `/guides/${guide.slug}/` },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function CalloutBox({ type, text }: { type: 'tip' | 'info' | 'warning'; text: string }) {
  const styles = {
    tip: { bg: 'bg-green-50 border-green-200', icon: Lightbulb, iconColor: 'text-green-600', label: 'Tip' },
    info: { bg: 'bg-blue-50 border-blue-200', icon: Info, iconColor: 'text-blue-600', label: 'Note' },
    warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertCircle, iconColor: 'text-amber-600', label: 'Important' },
  };
  const { bg, icon: Icon, iconColor, label } = styles[type];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${bg} my-4`}>
      <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div>
        <span className={`text-xs font-bold uppercase tracking-wide ${iconColor} block mb-0.5`}>{label}</span>
        <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const relatedCalcs = calculators.filter((c) => guide.relatedCalculatorIds.includes(c.id));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: `https://calculate-today.com/guides/${guide.slug}/`,
    datePublished: guide.publishDate,
    dateModified: guide.updatedDate,
    author: {
      '@type': 'Organization',
      name: 'CalculateToday Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalculateToday',
      url: 'https://calculate-today.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://calculate-today.com/guides/${guide.slug}/`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculate-today.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://calculate-today.com/guides/' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://calculate-today.com/guides/${guide.slug}/` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-12">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-3">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/guides/" className="hover:text-primary">Guides</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-medium truncate max-w-[200px]">{guide.title}</span>
      </nav>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {guide.tags.map((tag) => (
          <span key={tag} className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">{guide.title}</h1>

      {/* Meta bar */}
      <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-100">
        <BadgeCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span>
          <span className="font-semibold text-slate-600">CalculateToday Editorial</span>
          <span className="text-slate-400"> · Finance Team</span>
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {guide.readingTime} min read
        </span>
        <span className="text-slate-300">·</span>
        <span>Updated {formatDate(guide.updatedDate)}</span>
      </div>

      {/* Intro */}
      <p className="text-base text-slate-700 leading-relaxed mb-8 font-medium">{guide.intro}</p>

      {/* Sections */}
      <div className="space-y-8">
        {guide.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-slate-800 mb-3">{section.heading}</h2>
            <div className="space-y-3">
              {section.content.map((para, j) => (
                <p key={j} className="text-sm text-slate-600 leading-relaxed">{para}</p>
              ))}
              {section.callout && <CalloutBox type={section.callout.type} text={section.callout.text} />}
            </div>
          </section>
        ))}
      </div>

      {/* Related calculators */}
      {relatedCalcs.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-bold text-slate-800">Related Calculators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedCalcs.map((c) => (
              <CalculatorCard key={c.id} calculator={c} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {guide.faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {guide.faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to guides */}
      <div className="mt-10 pt-6 border-t border-slate-100">
        <Link
          href="/guides/"
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          All Financial Guides
        </Link>
      </div>
    </div>
  );
}
