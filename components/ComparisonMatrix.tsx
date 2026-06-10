'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface ComparisonItem {
  id: string;
  name: string;
  color: string;
  badge?: string;
}

export interface ComparisonFeature {
  id: string;
  name: string;
  category: string;
  values: Record<string, string | number>;
  highlight?: 'best' | 'worst' | 'none';
  bestId?: string;
  worstId?: string;
}

interface Props {
  items: ComparisonItem[];
  features: ComparisonFeature[];
  title: string;
  description?: string;
}

export function ComparisonMatrix({ items, features, title, description }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>(items.map((i) => i.id));
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(
      Array.from(new Set(features.map((f) => f.category))).map((cat) => [cat, true]),
    ),
  );

  const visibleFeatures = features.filter((f) =>
    selectedItems.length > 0 ? true : false,
  );

  const categories = Array.from(new Set(visibleFeatures.map((f) => f.category)));

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  if (selectedItems.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-4">Select at least one instrument to compare</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        )}
      </div>

      {/* Item Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Toggle to compare:</p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                selectedItems.includes(item.id)
                  ? `${item.color} text-white shadow-md`
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {item.name}
              {item.badge && <span className="ml-2 text-xs opacity-75">({item.badge})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 min-w-[160px]">
                Feature
              </th>
              {selectedItems.map((itemId) => {
                const item = items.find((i) => i.id === itemId);
                if (!item) return null;
                return (
                  <th
                    key={itemId}
                    className={`px-4 py-3 text-center font-semibold text-white min-w-[140px] ${item.color}`}
                  >
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const categoryFeatures = visibleFeatures.filter((f) => f.category === category);
              const isExpanded = expandedCategories[category];

              return (
                <tbody key={category}>
                  {/* Category Header */}
                  <tr
                    className="bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-150 dark:hover:bg-slate-700 cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          isExpanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                      {category}
                    </td>
                    {selectedItems.map((itemId) => (
                      <td
                        key={itemId}
                        className="px-4 py-3 text-center bg-slate-100 dark:bg-slate-700/50"
                      />
                    ))}
                  </tr>

                  {/* Feature Rows */}
                  {isExpanded &&
                    categoryFeatures.map((feature, idx) => {
                      const isBestWorst = feature.highlight === 'best' || feature.highlight === 'worst';
                      return (
                        <tr
                          key={feature.id}
                          className={`border-b border-slate-150 dark:border-slate-700 ${
                            idx % 2 === 0
                              ? 'bg-white dark:bg-slate-800'
                              : 'bg-slate-50 dark:bg-slate-800/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                            {feature.name}
                          </td>
                          {selectedItems.map((itemId) => {
                            const value = feature.values[itemId];
                            const isBest = isBestWorst && feature.bestId === itemId;
                            const isWorst = isBestWorst && feature.worstId === itemId;

                            return (
                              <td
                                key={itemId}
                                className={`px-4 py-3 text-center text-slate-700 dark:text-slate-300 font-medium ${
                                  isBest
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                    : isWorst
                                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                      : ''
                                }`}
                              >
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div>
          <span>Best value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border border-red-500 rounded"></div>
          <span>Worst value</span>
        </div>
      </div>
    </div>
  );
}
