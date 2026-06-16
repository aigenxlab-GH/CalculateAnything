import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('savings');

export default function SavingsCategoryPage() {
  return <CategoryPageView slug="savings" />;
}
