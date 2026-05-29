import { KeyboardNav } from '@/components/KeyboardNav';
import { StarButton } from '@/components/ui/StarButton';
import { VotingWidget } from '@/components/ui/VotingWidget';

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardNav />
      <div className="max-w-5xl mx-auto px-4 pt-2 pb-1 flex items-center justify-between">
        <StarButton />
        <VotingWidget />
      </div>
      {children}
    </>
  );
}
