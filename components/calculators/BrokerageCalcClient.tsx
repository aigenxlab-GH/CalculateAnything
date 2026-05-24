'use client';

import dynamic from 'next/dynamic';

const BrokerageCalcNoSSR = dynamic(
  () => import('./BrokerageCalc').then((m) => m.BrokerageCalc),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[520px] rounded-2xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    ),
  },
);

export function BrokerageCalcClient() {
  return <BrokerageCalcNoSSR />;
}
