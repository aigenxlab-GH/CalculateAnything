'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const INTEREST_COLOR = '#fbbf24';

interface Props {
  data: { name: string; value: number }[];
  primaryColor: string;
}

export function LoanPieChart({ data, primaryColor }: Props) {
  return (
    <ResponsiveContainer width="100%" height={110}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={3} dataKey="value">
          {data.map((_, i) => <Cell key={i} fill={i === 0 ? primaryColor : INTEREST_COLOR} />)}
        </Pie>
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtINR(v) : String(v))} />
        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
