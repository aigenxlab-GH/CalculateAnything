'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators, categories, categoryLabels } from '@/lib/calculators-registry';

const categoryColors: Record<string, string> = {
  all: 'bg-primary text-white',
  finance: 'bg-blue-100 text-blue-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-purple-100 text-purple-700',
  math: 'bg-green-100 text-green-700',
};

export function CalculatorGrid({ initialCategory = 'all' }: { initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  const filtered = calculators.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesQuery =
      query.trim() === '' ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.keywords?.some((k) => k.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="search"
          placeholder="Search calculators…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {filtered.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-base font-medium">No calculators found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
        </div>
      )}
    </section>
  );
}
