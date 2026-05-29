import { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculators-registry';
import { guides } from '@/lib/guides-data';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculate-today.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorRoutes = calculators.map((calc) => ({
    url: `${BASE_URL}${calc.href}/`,
    lastModified: calc.lastUpdated ? new Date(calc.lastUpdated) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Category landing pages
    ...(['tax', 'investment', 'savings', 'loans', 'business', 'health'] as const).map((slug) => ({
      url: `${BASE_URL}/calculators/${slug}/`,
      lastModified: new Date('2026-05-26'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Guides index
    {
      url: `${BASE_URL}/guides/`,
      lastModified: new Date('2026-05-26'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Individual guide pages
    ...guides.map((guide) => ({
      url: `${BASE_URL}/guides/${guide.slug}/`,
      lastModified: new Date(guide.updatedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...calculatorRoutes,
  ];
}
