'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

interface Props {
  data: { name: string; value: number }[];
}

export function PPCBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtUSD(v) : String(v))} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={i === 0 ? '#7c3aed' : '#fbbf24'} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
