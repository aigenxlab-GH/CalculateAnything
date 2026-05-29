'use client';

import { ExternalLink, Receipt, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

interface Props { gstAmount?: number; }

interface SoftwareEntry {
  name: string;
  monthlyCost: string;
  einvoicing: boolean;
  multiGstin: boolean;
  freeTrial: string;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: string;
  socialProof?: string;
}

const SOFTWARE: SoftwareEntry[] = [
  { name: 'ClearTax GST',    monthlyCost: '₹250',  einvoicing: true,  multiGstin: true,  freeTrial: '14 days', initials: 'CT',  color: '#0066cc', applyUrl: AFFILIATE.gst.software.cleartax,  badge: 'TOP', socialProof: '1M+ GST filings' },
  { name: 'Zoho Books',      monthlyCost: '₹749',  einvoicing: true,  multiGstin: true,  freeTrial: '14 days', initials: 'ZB',  color: '#dc2626', applyUrl: AFFILIATE.gst.software.zohoBooks,              socialProof: '1.5L+ Indian SMBs' },
  { name: 'Tally Prime',     monthlyCost: '₹675',  einvoicing: true,  multiGstin: true,  freeTrial: '7 days',  initials: 'TLY', color: '#7c3aed', applyUrl: AFFILIATE.gst.software.tally,                  socialProof: '75L+ businesses use Tally' },
  { name: 'MARG ERP',        monthlyCost: '₹462',  einvoicing: true,  multiGstin: true,  freeTrial: 'Demo',    initials: 'MRG', color: '#16a34a', applyUrl: AFFILIATE.gst.software.marg,                   socialProof: 'Popular in manufacturing' },
  { name: 'Busy Accounting', monthlyCost: '₹833',  einvoicing: true,  multiGstin: true,  freeTrial: '15 days', initials: 'BSY', color: '#f59e0b', applyUrl: AFFILIATE.gst.software.busy,                   socialProof: '1L+ active businesses' },
];

export function GstSoftwareTable({ gstAmount }: Props = {}) {
  const headline = gstAmount
    ? <>Managing {fmtINR(gstAmount)} in GST — automate with top 5 tools</>
    : <>₹50/day late fee after due date — file GST now with top 5 tools</>;

  return (
    <TableShell
      headline={headline}
      subline={<>GSTR-1, GSTR-3B, e-invoicing and reconciliation — all in one place. Free trials available.</>}
      headerIcon={<Receipt className="w-4 h-4" />}
      iconColorClass="text-teal-600"
      gradientClass="bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50"
      footerNote={<>Pricing reflects entry plan with single-user license. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={AFFILIATE.gst.primary}
      browseAllLabel="Try ClearTax GST"
      browseAllColorClass="text-teal-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Software</th>
              <th className="px-4 py-3 text-center font-semibold">Monthly Cost</th>
              <th className="px-4 py-3 text-center font-semibold">E-invoicing</th>
              <th className="px-4 py-3 text-center font-semibold">Multi-GSTIN</th>
              <th className="px-4 py-3 text-center font-semibold">Free Trial</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {SOFTWARE.map((s, idx) => (
              <tr key={s.name} className={`transition-colors ${idx === 0 ? 'bg-teal-50 hover:bg-teal-100/60' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: s.color }}>
                      {s.initials}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 text-xs leading-tight">
                        {s.name}
                        {s.badge && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5 bg-teal-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                            <Trophy className="w-2.5 h-2.5" /> {s.badge}
                          </span>
                        )}
                      </span>
                      {s.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{s.socialProof}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{s.monthlyCost}</td>
                <td className="px-4 py-3 text-center text-xs">
                  {s.einvoicing ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-500">—</span>}
                </td>
                <td className="px-4 py-3 text-center text-xs">
                  {s.multiGstin ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-slate-500">—</span>}
                </td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">{s.freeTrial}</td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a href={s.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                        : 'bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white'
                    }`}>
                    Try Now
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
