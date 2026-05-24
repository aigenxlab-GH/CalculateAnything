import { BackButton } from '@/components/BackButton';

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 pt-2">
        <BackButton />
      </div>
      {children}
    </>
  );
}
