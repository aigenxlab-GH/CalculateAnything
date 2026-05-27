'use client';

import { useEffect, useRef } from 'react';

interface Props {
  /** AdSense ad-slot ID from your AdSense account */
  slot: string;
  /** Ad format — defaults to 'auto' for responsive */
  format?: string;
  /** CSS class for the wrapper div */
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * In-content AdSense slot. Only renders when NEXT_PUBLIC_ADSENSE_ID is set.
 * Place between the calculator result and the affiliate comparison table.
 *
 * Usage:
 *   <AdSlot slot="1234567890" className="my-4" />
 *
 * Replace slot="1234567890" with your actual ad slot ID from AdSense.
 */
export function AdSlot({ slot, format = 'auto', className = '' }: Props) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const pushed = useRef(false);

  useEffect(() => {
    if (!publisherId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ignore
    }
  }, [publisherId]);

  if (!publisherId) return null;

  return (
    <div className={`overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
