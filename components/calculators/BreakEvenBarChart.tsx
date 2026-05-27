'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (!isFinite(n)) return '∞';
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

interface Props {
  data: { name: string; value: number; fill: string }[];
}

export function BreakEvenBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={130}>
      <BarChart data={data} barSize={40}>
        <XAxis dataKey="name" tick={{ fontSize: 9 }} />
        <YAxis tickFormatter={(v) => fmtL(v)} tick={{ fontSize: 10 }} width={55} />
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
        <Bar dataKey="value" name="Amount">
          {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
