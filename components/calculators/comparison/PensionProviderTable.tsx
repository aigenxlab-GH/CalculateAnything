'use client';

import { ExternalLink, Shield } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return fmtINR(n);
};

type Scheme = 'ppf' | 'nsc' | 'nps' | 'epf' | 'retirement';

interface ProviderEntry {
  name: string;
  type: string;
  feature: string;
  initials: string;
  color: string;
  applyUrl: string;
  cta: string;
}

const PROVIDERS: Record<Scheme, ProviderEntry[]> = {
  ppf: [
    { name: 'State Bank of India',  type: 'Bank',        feature: '7.1% p.a. · open online with SBI YONO',          initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.pension.ppf.sbi,        cta: 'Open PPF' },
    { name: 'ICICI Bank',           type: 'Bank',        feature: '7.1% p.a. · instant account via iMobile',        initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.pension.ppf.icici,      cta: 'Open PPF' },
    { name: 'HDFC Bank',            type: 'Bank',        feature: '7.1% p.a. · easy net-banking setup',             initials: 'HDF', color: '#dc2626', applyUrl: AFFILIATE.pension.ppf.hdfc,       cta: 'Open PPF' },
    { name: 'Axis Bank',            type: 'Bank',        feature: '7.1% p.a. · seamless online opening',            initials: 'AXS', color: '#be185d', applyUrl: AFFILIATE.pension.ppf.axis,       cta: 'Open PPF' },
    { name: 'India Post',           type: 'Post Office', feature: '7.1% p.a. · pan-India branch network',           initials: 'IPS', color: '#7c3aed', applyUrl: AFFILIATE.pension.ppf.postOffice, cta: 'Visit Post Office' },
  ],
  nsc: [
    { name: 'India Post Office',    type: 'Government',  feature: '7.7% p.a. · 5-year lock-in · tax saver',          initials: 'IPS', color: '#7c3aed', applyUrl: AFFILIATE.pension.nsc.postOffice, cta: 'Buy NSC' },
    { name: 'State Bank of India',  type: 'Bank',        feature: 'NSC services via SBI branch network',             initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.pension.nsc.sbi,        cta: 'Visit SBI' },
    { name: 'Bank of Baroda',       type: 'Bank',        feature: 'NSC purchase + custody services',                 initials: 'BoB', color: '#f97316', applyUrl: AFFILIATE.pension.nsc.bob,        cta: 'Visit BoB' },
  ],
  nps: [
    { name: 'Groww NPS',            type: 'Online',      feature: 'Easiest NPS UI · invest in 5 mins',               initials: 'GRW', color: '#00d09c', applyUrl: AFFILIATE.pension.nps.groww,       cta: 'Open NPS' },
    { name: 'ET Money NPS',         type: 'Online',      feature: 'Zero commission · scheme switch in-app',          initials: 'ETM', color: '#ff5722', applyUrl: AFFILIATE.pension.nps.etMoney,     cta: 'Open NPS' },
    { name: 'NSDL eNPS',            type: 'Official',    feature: 'Government portal — direct registration',         initials: 'NSD', color: '#1e40af', applyUrl: AFFILIATE.pension.nps.nsdlEnps,    cta: 'Visit NSDL' },
    { name: 'KFintech NPS',         type: 'Official',    feature: 'Alternative CRA · cheaper account ops',           initials: 'KFI', color: '#dc2626', applyUrl: AFFILIATE.pension.nps.kfintech,    cta: 'Visit KFintech' },
    { name: 'HDFC Pension',         type: 'PFM',         feature: 'Top-performing equity-fund pension manager',      initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.pension.nps.hdfcPension, cta: 'View HDFC' },
  ],
  epf: [
    { name: 'EPFO Member Portal',   type: 'Official',    feature: 'Check balance · download passbook · file claims', initials: 'EPF', color: '#1e40af', applyUrl: AFFILIATE.pension.epf.epfoPortal, cta: 'Login EPFO' },
    { name: 'UMANG App',            type: 'Government',  feature: 'EPF + 100s of govt services in 1 app',            initials: 'UMG', color: '#dc2626', applyUrl: AFFILIATE.pension.epf.umang,      cta: 'Download UMANG' },
    { name: 'EPF Passbook',         type: 'Official',    feature: 'Download monthly contribution passbook',          initials: 'EPB', color: '#16a34a', applyUrl: AFFILIATE.pension.epf.passbook,   cta: 'Get Passbook' },
  ],
  retirement: [
    { name: 'Groww Retirement',     type: 'Platform',    feature: 'Curated retirement-focused MF baskets',           initials: 'GRW', color: '#00d09c', applyUrl: AFFILIATE.pension.retirement.groww,    cta: 'Start SIP' },
    { name: 'Zerodha Coin',         type: 'Platform',    feature: 'Direct MFs — zero commission for life',           initials: 'ZER', color: '#387ed1', applyUrl: AFFILIATE.pension.retirement.zerodha,  cta: 'Open Account' },
    { name: 'ET Money Retirement',  type: 'Platform',    feature: 'Goal-based retirement planner built-in',          initials: 'ETM', color: '#ff5722', applyUrl: AFFILIATE.pension.retirement.etMoney,  cta: 'Plan FIRE' },
    { name: 'Kuvera',               type: 'Platform',    feature: 'Family portfolio + tax harvesting',               initials: 'KUV', color: '#1a73e8', applyUrl: AFFILIATE.pension.retirement.kuvera,   cta: 'Open Kuvera' },
  ],
};

const HEADLINES: Record<Scheme, { headline: string; subline: string; browseLabel: string; browseUrl: string }> = {
  ppf: {
    headline: '₹1.5L in PPF = ₹46,500 tax saved — open yours in 5 mins',
    subline:  'Same 7.1% government rate everywhere — pick the bank where it\'s easiest to deposit online.',
    browseLabel: 'Compare all PPF options',
    browseUrl:   AFFILIATE.pension.ppf.postOffice,
  },
  nsc: {
    headline: 'NSC beats most FDs: 7.7% guaranteed + Section 80C benefit',
    subline:  '5-year lock-in. Save up to ₹46,500 in tax. Buy at any post office or SBI branch.',
    browseLabel: 'Visit India Post',
    browseUrl:   AFFILIATE.pension.nsc.postOffice,
  },
  nps: {
    headline: 'Extra ₹50,000 deduction under 80CCD(1B) — open NPS today',
    subline:  'Most people miss this deduction. Equity NPS has historically returned 12–14% p.a. over 10 years.',
    browseLabel: 'Compare all NPS providers',
    browseUrl:   AFFILIATE.pension.nps.nsdlEnps,
  },
  epf: {
    headline: 'Is your employer depositing on time? Check in 60 seconds',
    subline:  'Many employers delay EPF deposits — use these tools to verify your balance, passbook, and claim status.',
    browseLabel: 'EPFO official portal',
    browseUrl:   AFFILIATE.pension.epf.epfoPortal,
  },
  retirement: {
    headline: '₹5,000/mo SIP at 25 = ₹3.5 Cr at 60 — start today',
    subline:  'Every month you delay costs you lakhs in compounding. Pick a platform and set up your first SIP now.',
    browseLabel: 'Browse retirement funds',
    browseUrl:   AFFILIATE.pension.retirement.groww,
  },
};

export function PensionProviderTable({ scheme, contribution, projectedValue }: {
  scheme: Scheme;
  contribution?: number;   // annual for PPF/NSC, monthly for NPS/retirement
  projectedValue?: number; // maturity / total corpus / target corpus
}) {
  const rows = PROVIDERS[scheme];
  const baseMeta = HEADLINES[scheme];

  const dynamicHeadline =
    contribution && projectedValue
      ? scheme === 'ppf'
        ? `${fmtINR(contribution)}/yr in PPF matures to ${fmtL(projectedValue)} — open yours in 5 mins`
        : scheme === 'nps'
          ? `${fmtINR(contribution)}/mo builds ${fmtL(projectedValue)} corpus — open NPS today`
          : scheme === 'retirement'
            ? `${fmtL(projectedValue)} target corpus — invest ${fmtINR(contribution)}/mo starting today`
            : null
      : projectedValue
        ? scheme === 'nsc'
          ? `NSC matures to ${fmtL(projectedValue)} — 7.7% guaranteed + Section 80C benefit`
          : scheme === 'epf'
            ? `Your EPF projection: ${fmtL(projectedValue)} — is your employer depositing on time?`
            : null
        : null;

  const meta = dynamicHeadline ? { ...baseMeta, headline: dynamicHeadline } : baseMeta;

  return (
    <TableShell
      headline={meta.headline}
      subline={meta.subline}
      headerIcon={<Shield className="w-4 h-4" />}
      iconColorClass="text-purple-600"
      gradientClass="bg-gradient-to-r from-purple-50 via-violet-50 to-purple-50"
      footerNote={<>Returns based on government-declared rates and historical performance. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={meta.browseUrl}
      browseAllLabel={meta.browseLabel}
      browseAllColorClass="text-purple-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Provider</th>
              <th className="px-4 py-3 text-center font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Why pick this</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((p, idx) => (
              <tr key={p.name} className={`transition-colors ${idx === 0 ? 'bg-purple-50 hover:bg-purple-100/60' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: p.color }}>
                      {p.initials}
                    </div>
                    <span className="font-semibold text-slate-800 text-xs leading-tight">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">{p.type}</span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{p.feature}</td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a href={p.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                        : 'bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white'
                    }`}>
                    {p.cta}
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
