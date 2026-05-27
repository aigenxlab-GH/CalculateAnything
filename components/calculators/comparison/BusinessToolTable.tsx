'use client';

import { ExternalLink, Briefcase, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

type Variant = 'ads' | 'accounting' | 'loans';

const fmtL = (n: number) => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

interface ToolEntry {
  name: string;
  pricing: string;
  feature: string;
  bestFor: string;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: string;
  socialProof?: string;
}

const TOOLS: Record<Variant, ToolEntry[]> = {
  ads: [
    { name: 'Google Ads',   pricing: 'Pay per click', feature: 'India\'s largest search ad network', bestFor: 'Capture buying-intent searches', initials: 'GAD', color: '#4285f4', applyUrl: AFFILIATE.business.adTools.googleAds,   badge: 'TOP', socialProof: '77% of search traffic' },
    { name: 'Meta Ads',     pricing: 'Pay per click', feature: 'Facebook + Instagram reach',         bestFor: 'Visual brand awareness',         initials: 'MTA', color: '#1877f2', applyUrl: AFFILIATE.business.adTools.metaAds,               socialProof: '50 Cr+ Indian users' },
    { name: 'SEMrush',      pricing: '$139/mo',       feature: 'Keyword + competitor research',       bestFor: 'SEO + paid keyword discovery',  initials: 'SEM', color: '#ff5722', applyUrl: AFFILIATE.business.adTools.semrush,               socialProof: '10M+ marketing pros' },
    { name: 'Ahrefs',       pricing: '$129/mo',       feature: 'Backlinks + content gap analysis',    bestFor: 'Content marketing strategy',    initials: 'AHR', color: '#0066cc', applyUrl: AFFILIATE.business.adTools.ahrefs,                socialProof: 'Industry SEO gold standard' },
    { name: 'Ubersuggest',  pricing: '$29/mo',        feature: 'Affordable Ahrefs alternative',       bestFor: 'Budget-conscious marketers',    initials: 'UBR', color: '#7c3aed', applyUrl: AFFILIATE.business.adTools.ubersuggest,           socialProof: 'Best value for SMBs' },
  ],
  accounting: [
    { name: 'Zoho Books',    pricing: '₹749/mo',    feature: 'India-focused — GST-ready',           bestFor: 'SMB invoicing + inventory',     initials: 'ZB',  color: '#dc2626', applyUrl: AFFILIATE.business.accounting.zohoBooks,  badge: 'TOP', socialProof: '1.5L+ Indian SMBs' },
    { name: 'Tally Prime',   pricing: '₹750/mo',    feature: 'Industry-standard desktop software',  bestFor: 'Traditional businesses',        initials: 'TLY', color: '#7c3aed', applyUrl: AFFILIATE.business.accounting.tally,               socialProof: '75L+ businesses' },
    { name: 'QuickBooks',    pricing: '₹500/mo',    feature: 'Global brand · 7M+ users',            bestFor: 'Service businesses',            initials: 'QBK', color: '#2ca01c', applyUrl: AFFILIATE.business.accounting.quickbooks,          socialProof: '7M+ global users' },
    { name: 'Vyapar App',    pricing: 'Free + paid', feature: 'Mobile-first billing for shopkeepers', bestFor: 'Retail + manufacturers',       initials: 'VYP', color: '#f59e0b', applyUrl: AFFILIATE.business.accounting.vyapar,              socialProof: 'Free to start' },
    { name: 'Khatabook',     pricing: 'Free',        feature: 'Digital udhar-bahi for small shops',  bestFor: 'Micro businesses',             initials: 'KHA', color: '#16a34a', applyUrl: AFFILIATE.business.accounting.khatabook,           socialProof: '1 Cr+ shopkeepers' },
  ],
  loans: [
    { name: 'Bajaj Finserv',  pricing: '14% onwards', feature: 'Loan up to ₹50L · 96-hr disbursal',   bestFor: 'Established SMBs',              initials: 'BAJ', color: '#dc2626', applyUrl: AFFILIATE.business.loans.bajaj,        badge: 'TOP', socialProof: '96-hr disbursal' },
    { name: 'HDFC Bank',      pricing: '15.75% onwards', feature: 'Up to ₹40L · doorstep service',    bestFor: 'Salaried + business owners',    initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.business.loans.hdfc,                    socialProof: 'Instant sanction letter' },
    { name: 'Lendingkart',    pricing: '12-27%',      feature: 'Online · 3-day disbursal',           bestFor: 'Working capital top-ups',       initials: 'LDK', color: '#0891b2', applyUrl: AFFILIATE.business.loans.lendingkart,             socialProof: '1.3L+ businesses funded' },
    { name: 'Indifi',         pricing: '15-24%',      feature: 'Industry-specific loans',             bestFor: 'Travel/restaurant SMBs',        initials: 'IND', color: '#7c3aed', applyUrl: AFFILIATE.business.loans.indifi,                  socialProof: 'Sector-specific products' },
    { name: 'FlexiLoans',     pricing: '14-30%',      feature: 'Flexible repayment terms',            bestFor: 'Quick capital needs',           initials: 'FLX', color: '#f59e0b', applyUrl: AFFILIATE.business.loans.flexiloans,              socialProof: 'No foreclosure charges' },
  ],
};

const HEADLINES: Record<Variant, { headline: string; subline: string; ctaLabel: string; browseLabel: string; gradientClass: string; iconColor: string; rowAccent: string; btnPrimary: string; btnSecondary: string }> = {
  ads: {
    headline:     'Cut wasted ad spend — right tool drops CPC by up to 40%',
    subline:      'From search intent capture to competitor research — pick the tool that pays for itself.',
    ctaLabel:     'Start Free',
    browseLabel:  'Compare all ad tools',
    gradientClass:'bg-gradient-to-r from-cyan-50 via-sky-50 to-cyan-50',
    iconColor:    'text-cyan-600',
    rowAccent:    'bg-cyan-50 hover:bg-cyan-100/60',
    btnPrimary:   'bg-cyan-600 hover:bg-cyan-700 text-white',
    btnSecondary: 'bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white',
  },
  accounting: {
    headline:     '1 GST error = ₹10,000 notice — use the right software',
    subline:      'GST-ready, auto-reconciliation, e-invoicing — pick software that keeps you compliant automatically.',
    ctaLabel:     'Try Free',
    browseLabel:  'Compare all software',
    gradientClass:'bg-gradient-to-r from-indigo-50 via-violet-50 to-indigo-50',
    iconColor:    'text-indigo-600',
    rowAccent:    'bg-indigo-50 hover:bg-indigo-100/60',
    btnPrimary:   'bg-indigo-600 hover:bg-indigo-700 text-white',
    btnSecondary: 'bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white',
  },
  loans: {
    headline:     'Loan up to ₹50L in 3 days — compare rates before you apply',
    subline:      'Rates from 12% p.a. · online application · no branch visit needed. Pick the cheapest option.',
    ctaLabel:     'Apply Now',
    browseLabel:  'Compare all business loans',
    gradientClass:'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50',
    iconColor:    'text-amber-600',
    rowAccent:    'bg-amber-50 hover:bg-amber-100/60',
    btnPrimary:   'bg-amber-600 hover:bg-amber-700 text-white',
    btnSecondary: 'bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white',
  },
};

const BROWSE_URLS: Record<Variant, string> = {
  ads:        AFFILIATE.business.adTools.googleAds,
  accounting: AFFILIATE.business.accounting.zohoBooks,
  loans:      AFFILIATE.business.loans.bajaj,
};

export function BusinessToolTable({ variant, contextValue }: { variant: Variant; contextValue?: number }) {
  const rows = TOOLS[variant];
  const meta = HEADLINES[variant];

  const headline = contextValue
    ? (variant === 'ads'
        ? `Your $${contextValue.toLocaleString('en-US')} ad budget — right tools cut CPC by 40%`
        : variant === 'accounting'
          ? `Revenue ${fmtL(contextValue)} — 1 GST error = ₹10,000 notice`
          : `Working capital ${fmtL(contextValue)} — compare business loan rates`)
    : meta.headline;

  return (
    <TableShell
      headline={headline}
      subline={meta.subline}
      headerIcon={<Briefcase className="w-4 h-4" />}
      iconColorClass={meta.iconColor}
      gradientClass={meta.gradientClass}
      footerNote={<>Pricing is indicative. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={BROWSE_URLS[variant]}
      browseAllLabel={meta.browseLabel}
      browseAllColorClass={meta.iconColor.replace('text-', 'text-').replace('-600', '-700')}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Tool</th>
              <th className="px-4 py-3 text-center font-semibold">Pricing</th>
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Best For</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((t, idx) => (
              <tr key={t.name} className={`transition-colors ${idx === 0 ? meta.rowAccent : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 text-xs leading-tight">
                        {t.name}
                        {t.badge && (
                          <span className={`ml-1.5 inline-flex items-center gap-0.5 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold ${meta.btnPrimary.split(' ')[0]}`}>
                            <Trophy className="w-2.5 h-2.5" /> {t.badge}
                          </span>
                        )}
                      </span>
                      {t.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{t.socialProof}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{t.pricing}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{t.feature}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{t.bestFor}</td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a href={t.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0 ? meta.btnPrimary + ' shadow-sm' : meta.btnSecondary
                    }`}>
                    {meta.ctaLabel}
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
