import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('business');

export default function BusinessCategoryPage() {
  return <CategoryPageView slug="business" />;
}
