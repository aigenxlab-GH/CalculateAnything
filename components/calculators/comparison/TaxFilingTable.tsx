'use client';

import { ExternalLink, FileText, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

interface Props { income?: number; }

interface ServiceEntry {
  name: string;
  freePlan: string;
  paidFrom: string;
  caAssist: boolean;
  bestFor: string;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: string;
  socialProof?: string;
}

const SERVICES: ServiceEntry[] = [
  { name: 'ClearTax',     freePlan: 'Yes',   paidFrom: '₹399',  caAssist: true,  bestFor: 'Most popular — all-in-one ITR',     initials: 'CT',  color: '#0066cc', applyUrl: AFFILIATE.tax.services.cleartax,    badge: 'TOP', socialProof: '9 Cr+ ITRs filed' },
  { name: 'TaxBuddy',     freePlan: 'No',    paidFrom: '₹499',  caAssist: true,  bestFor: 'Best for capital-gains & crypto',   initials: 'TB',  color: '#dc2626', applyUrl: AFFILIATE.tax.services.taxbuddy,          socialProof: 'CA-assisted filing' },
  { name: 'Quicko',       freePlan: 'Yes',   paidFrom: '₹599',  caAssist: true,  bestFor: 'F&O traders + business income',     initials: 'QK',  color: '#7c3aed', applyUrl: AFFILIATE.tax.services.quicko,            socialProof: 'Best for F&O traders' },
  { name: 'MyITReturn',   freePlan: 'Yes',   paidFrom: '₹399',  caAssist: true,  bestFor: 'Simple salaried ITR — fastest',     initials: 'MIT', color: '#0891b2', applyUrl: AFFILIATE.tax.services.myitreturn,        socialProof: '25 L+ users' },
  { name: 'TaxSpanner',   freePlan: 'No',    paidFrom: '₹449',  caAssist: true,  bestFor: 'NRI & foreign-income filing',       initials: 'TS',  color: '#f59e0b', applyUrl: AFFILIATE.tax.services.taxspanner,        socialProof: 'Specialist for NRIs' },
];

export function TaxFilingTable({ income }: Props = {}) {
  const headline = income
    ? <>File your {fmtL(income)} ITR — these 5 services make it easy</>
    : <>Late ITR = ₹5,000 fine — file today with top 5 services</>;

  return (
    <TableShell
      headline={headline}
      subline={<>Pre-filled data from income tax portal, e-verification in seconds — no CA needed for most salaried filers.</>}
      headerIcon={<FileText className="w-4 h-4" />}
      iconColorClass="text-rose-600"
      gradientClass="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50"
      footerNote={<>Pricing reflects entry-level paid plans for salaried filers. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={AFFILIATE.tax.primary}
      browseAllLabel="File on ClearTax"
      browseAllColorClass="text-rose-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Service</th>
              <th className="px-4 py-3 text-center font-semibold">Free Plan</th>
              <th className="px-4 py-3 text-center font-semibold">Paid From</th>
              <th className="px-4 py-3 text-center font-semibold">CA Help</th>
              <th className="px-4 py-3 text-left font-semibold">Best For</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {SERVICES.map((s, idx) => (
              <tr key={s.name} className={`transition-colors ${idx === 0 ? 'bg-rose-50 hover:bg-rose-100/60' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: s.color }}>
                      {s.initials}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 text-xs leading-tight">
                        {s.name}
                        {s.badge && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5 bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                            <Trophy className="w-2.5 h-2.5" /> {s.badge}
                          </span>
                        )}
                      </span>
                      {s.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{s.socialProof}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-xs font-semibold">
                  {s.freePlan === 'Yes'
                    ? <span className="text-emerald-600">✓ Yes</span>
                    : <span className="text-slate-400">— No</span>}
                </td>
                <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{s.paidFrom}</td>
                <td className="px-4 py-3 text-center text-xs">
                  {s.caAssist ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{s.bestFor}</td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a href={s.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                        : 'bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white'
                    }`}>
                    File Now
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
