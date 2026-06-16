import { buildCategoryMetadata, CategoryPageView } from '@/components/CategoryPageView';

export const metadata = buildCategoryMetadata('investment');

export default function InvestmentCategoryPage() {
  return <CategoryPageView slug="investment" />;
}
