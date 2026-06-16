import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('health');

export default function HealthCategoryPage() {
  return <CategoryPageView slug="health" />;
}
