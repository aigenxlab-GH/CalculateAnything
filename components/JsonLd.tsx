/**
 * JsonLd — Injects a JSON-LD structured data script tag.
 * Use on any page to add schema.org markup for SEO rich results.
 *
 * Usage:
 *   import { JsonLd } from '@/components/JsonLd';
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
