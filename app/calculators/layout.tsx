import { KeyboardNav } from '@/components/KeyboardNav';

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      {children}
    </>
  );
}
