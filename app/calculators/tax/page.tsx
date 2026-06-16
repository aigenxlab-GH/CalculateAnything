import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('tax');

export default function TaxCategoryPage() {
  return <CategoryPageView slug="tax" />;
}
