'use client';

import { ExternalLink, BarChart2, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

interface Props { tradeValue?: number; }

interface BrokerEntry {
  name: string;
  openingFee: string;
  delivery: string;
  intradayFno: string;
  freeMf: boolean;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: string;
  socialProof?: string;
}

const BROKERS: BrokerEntry[] = [
  { name: 'Zerodha',      openingFee: '₹200',  delivery: '₹0',     intradayFno: '₹20 / order',  freeMf: true,  initials: 'ZER', color: '#387ed1', applyUrl: AFFILIATE.trading.brokers.zerodha,    badge: 'TOP',  socialProof: '#1 broker by active clients' },
  { name: 'Groww',        openingFee: '₹0',    delivery: '₹20',    intradayFno: '₹20 / order',  freeMf: true,  initials: 'GRW', color: '#00d09c', applyUrl: AFFILIATE.trading.brokers.groww,      badge: 'FREE', socialProof: 'Free account opening' },
  { name: 'Angel One',    openingFee: '₹0',    delivery: '₹0',     intradayFno: '₹20 / order',  freeMf: true,  initials: 'AGN', color: '#0066cc', applyUrl: AFFILIATE.trading.brokers.angelOne,               socialProof: 'Free equity delivery' },
  { name: 'Upstox',       openingFee: '₹0',    delivery: '₹20',    intradayFno: '₹20 / order',  freeMf: true,  initials: 'UPS', color: '#722ed1', applyUrl: AFFILIATE.trading.brokers.upstox,                 socialProof: '1.5 Cr+ active users' },
  { name: 'ICICI Direct', openingFee: '₹0',    delivery: '0.07%',  intradayFno: '₹20 / order',  freeMf: true,  initials: 'ICD', color: '#f59e0b', applyUrl: AFFILIATE.trading.brokers.iciciDirect,            socialProof: 'Bank-integrated demat' },
];

export function StockBrokerTable({ tradeValue }: Props = {}) {
  const headline = tradeValue
    ? <>Investing {fmtL(tradeValue)} — compare broker fees before you pick one</>
    : <>3 brokers here open free — compare fees before you invest a rupee</>;

  return (
    <TableShell
      headline={headline}
      subline={<>Zerodha, Angel One & Groww: ₹0 account opening. Paperless KYC, mobile trading & free MF investing.</>}
      headerIcon={<BarChart2 className="w-4 h-4" />}
      iconColorClass="text-emerald-600"
      gradientClass="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50"
      footerNote={<>Brokerage is indicative for equity segment. Charges may differ for currency / commodity. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={AFFILIATE.trading.primary}
      browseAllLabel="Open free demat"
      browseAllColorClass="text-emerald-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Broker</th>
              <th className="px-4 py-3 text-center font-semibold">Account Opening</th>
              <th className="px-4 py-3 text-center font-semibold">Equity Delivery</th>
              <th className="px-4 py-3 text-center font-semibold">Intraday / F&amp;O</th>
              <th className="px-4 py-3 text-center font-semibold">Free MF?</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {BROKERS.map((b, idx) => (
              <tr key={b.name} className={`transition-colors ${idx === 0 ? 'bg-emerald-50 hover:bg-emerald-100/60' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: b.color }}>
                      {b.initials}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 text-xs leading-tight">
                        {b.name}
                        {b.badge && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                            {b.badge === 'TOP' && <Trophy className="w-2.5 h-2.5" />} {b.badge}
                          </span>
                        )}
                      </span>
                      {b.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{b.socialProof}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-xs font-semibold text-slate-700">{b.openingFee}</td>
                <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{b.delivery}</td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">{b.intradayFno}</td>
                <td className="px-4 py-3 text-center text-xs">
                  {b.freeMf ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-500">—</span>}
                </td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a href={b.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white'
                    }`}>
                    Open Account
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableShell>
  );
}
