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

export function LumpsumChart({ data, years }: Props) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={data}>
        <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={Math.floor(years / 4)} />
        <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
        <Area type="monotone" dataKey="invested" stackId="0" stroke="#e0e7ff" fill="#e0e7ff" name="Invested" />
        <Area type="monotone" dataKey="value" stackId="1" stroke="#4f46e5" fill="#a5b4fc" name="Maturity Value" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
