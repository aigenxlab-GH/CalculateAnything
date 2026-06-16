import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('loans');

export default function LoansCategoryPage() {
  return <CategoryPageView slug="loans" />;
}
