'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PIE_COLORS = ['#1d4ed8', '#fbbf24'];

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

interface Props {
  chartData: { name: string; value: number }[];
}

export function EMIPieChart({ chartData }: Props) {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%" cy="50%"
          innerRadius={45} outerRadius={68}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => (typeof v === 'number' ? fmtINR(v) : String(v))} />
        <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
