import { KeyboardNav } from '@/components/KeyboardNav';
import { VotingWidget } from '@/components/ui/VotingWidget';

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      <div className="max-w-5xl mx-auto px-4 pt-2 pb-1 flex justify-end">
        <VotingWidget />
      </div>
      {children}
    </>
  );
}
