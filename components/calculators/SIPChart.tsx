'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

interface Props {
  data: { year: string; invested: number; value: number }[];
  years: number;
}

export function SIPChart({ data, years }: Props) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data}>
        <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={Math.floor(years / 4)} />
        <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
        <Area type="monotone" dataKey="invested" stackId="1" stroke="#e2e8f0" fill="#e2e8f0" name="Invested" />
        <Area type="monotone" dataKey="value" stackId="0" stroke="#16a34a" fill="#bbf7d0" name="Total Value" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
