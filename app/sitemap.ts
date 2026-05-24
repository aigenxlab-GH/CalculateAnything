import { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculators-registry';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calculateanything.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorRoutes = calculators.map((calc) => ({
    url: `${BASE_URL}${calc.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...calculatorRoutes,
  ];
}
