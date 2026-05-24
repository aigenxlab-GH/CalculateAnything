'use client';

import { useEffect, useRef } from 'react';

const formatHeight: Record<string, string> = {
  horizontal: 'h-[90px]',
  rectangle: 'h-[250px]',
  vertical: 'h-[600px]',
  auto: 'h-[90px]',
};

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: boolean;
}

export function AdSlot({ slot, format = 'auto', className = '', label = true }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
  const height = formatHeight[format];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p className="text-center text-xs text-slate-400 mb-1 uppercase tracking-widest">
          Advertisement
        </p>
      )}
      <div className={`relative bg-slate-100 border border-slate-200 rounded-xl overflow-hidden w-full ${height}`}>
        <ins
          ref={adRef}
          className="adsbygoogle absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Dev placeholder — hidden in production once AdSense script is loaded */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 font-medium bg-slate-200 px-3 py-1 rounded-full">
              Ad ({format} · {slot})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
