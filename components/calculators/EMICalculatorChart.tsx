'use client';

import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PIE_COLORS = ['#1d4ed8', '#fbbf24'];

interface Props {
  data: { name: string; value: number }[];
  formatter: (v: number) => string;
}

export function EMICalculatorChart({ data, formatter }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const w = ref.current?.clientWidth ?? 0;
      if (w > 10) setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: 110 }}>
      {ready && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={3} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => (typeof v === 'number' ? formatter(v) : String(v))} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
