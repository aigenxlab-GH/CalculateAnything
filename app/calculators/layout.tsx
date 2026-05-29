import { KeyboardNav } from '@/components/KeyboardNav';
import { VotingWidget } from '@/components/ui/VotingWidget';

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      {children}
      <VotingWidget />
    </>
  );
}
