import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { VotingWidget } from '@/components/ui/VotingWidget';

interface Props {
  name: string;  // e.g. "SIP Calculator"
  slug: string;  // e.g. "sip-calculator"
}

export function CalculatorBreadcrumb({ name, slug }: Props) {
  const url = `https://calculate-today.com/calculators/${slug}/`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculate-today.com/' },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
        }}
      />
      <div className="flex items-center justify-between mb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-slate-500">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <span className="text-slate-700 dark:text-slate-300 font-medium" aria-current="page">{name}</span>
        </nav>
        <VotingWidget />
      </div>
    </>
  );
}
