'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

const PIE_COLORS = ['#0284c7', '#7c3aed'];

interface Props {
  data: { name: string; value: number }[];
}

export function NPSPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={130}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
          {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
        </Pie>
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtL(v) : String(v))} />
      </PieChart>
    </ResponsiveContainer>
  );
}
