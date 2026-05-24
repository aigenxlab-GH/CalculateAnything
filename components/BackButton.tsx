'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Back
    </button>
  );
}
