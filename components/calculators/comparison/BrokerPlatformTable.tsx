'use client';

import { ExternalLink, TrendingUp, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

interface BrokerEntry {
  name: string;
  commission: string;     // brokerage on equity / MF
  mfCount: string;        // # of mutual funds available
  feature: string;        // 1-line USP
  rating: 3 | 4 | 5;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: 'TOP' | 'FREE';
  socialProof?: string;
}

const BROKERS: BrokerEntry[] = [
  { name: 'Groww',             commission: 'Free MF',  mfCount: '5,000+', feature: 'Simplest UI for beginners',          rating: 5, initials: 'GRW', color: '#00d09c', applyUrl: AFFILIATE.sip.brokers.groww,         badge: 'TOP',  socialProof: '5 Cr+ investors' },
  { name: 'Zerodha Coin',      commission: 'Free',     mfCount: '2,200+', feature: 'India\'s largest broker',            rating: 5, initials: 'ZER', color: '#387ed1', applyUrl: AFFILIATE.sip.brokers.zerodhaCoin,   badge: 'FREE', socialProof: '1.3 Cr active clients' },
  { name: 'Angel One MF',      commission: 'Free MF',  mfCount: '4,000+', feature: 'Free demat + AI-led research',        rating: 4, initials: 'AGN', color: '#0066cc', applyUrl: AFFILIATE.sip.brokers.angelOneMf,                  socialProof: '2 Cr+ users' },
  { name: 'Paytm Money',       commission: 'Free MF',  mfCount: '4,500+', feature: 'Built-in goal planning',              rating: 4, initials: 'PYT', color: '#00b9f1', applyUrl: AFFILIATE.sip.brokers.paytmMoney,                  socialProof: '1 Cr+ SIP accounts' },
  { name: 'ET Money',          commission: 'Free MF',  mfCount: '3,000+', feature: 'Smart Deposit + tax-saver flows',     rating: 4, initials: 'ETM', color: '#ff5722', applyUrl: AFFILIATE.sip.brokers.etMoney,                     socialProof: '50 L+ investors' },
  { name: 'Kuvera',            commission: 'Free',     mfCount: '6,000+', feature: 'Family portfolio tracking',           rating: 4, initials: 'KUV', color: '#1a73e8', applyUrl: AFFILIATE.sip.brokers.kuvera,                      socialProof: '100% direct funds' },
  { name: 'Upstox MF',         commission: 'Free MF',  mfCount: '2,000+', feature: 'Combined stocks + MF in 1 app',       rating: 4, initials: 'UPS', color: '#722ed1', applyUrl: AFFILIATE.sip.brokers.upstoxMf,                    socialProof: '1.5 Cr+ investors' },
  { name: 'ICICI Direct MF',   commission: '₹0 MF',    mfCount: '5,000+', feature: 'Bank-backed, trusted by HNIs',        rating: 3, initials: 'ICD', color: '#f59e0b', applyUrl: AFFILIATE.sip.brokers.iciciDirectMf,               socialProof: 'Bank-backed security' },
];

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

interface Props {
  /** Optional — when given, headline interpolates user's monthly SIP value. */
  monthly?: number;
  /** Optional — appears in subline alongside monthly. */
  years?: number;
}

export function BrokerPlatformTable({ monthly, years }: Props) {
  const headline = monthly
    ? <>Where to start your <span className="text-emerald-700">{fmtINR(monthly)}/mo</span> SIP — top 8 platforms</>
    : <>All 8 platforms charge ₹0 commission — which one grows your money fastest?</>;

  const subline = monthly && years
    ? <>All offer free direct mutual funds. Choose the platform that fits your style — and watch that money grow.</>
    : 'Zero commission on direct mutual funds. Compare fund choice, features and ratings before you pick.';

  return (
    <TableShell
      headline={headline}
      subline={subline}
      headerIcon={<TrendingUp className="w-4 h-4" />}
      iconColorClass="text-emerald-600"
      gradientClass="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50"
      footerNote={<>Affiliate links — we may earn a commission at no cost to you. Mutual fund investments are subject to market risk.</>}
      browseAllUrl={AFFILIATE.sip.primary}
      browseAllLabel="Browse all funds on Groww"
      browseAllColorClass="text-emerald-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Platform</th>
              <th className="px-4 py-3 text-center font-semibold">MF Commission</th>
              <th className="px-4 py-3 text-center font-semibold">Funds</th>
              <th className="px-4 py-3 text-left font-semibold">Key Feature</th>
              <th className="px-4 py-3 text-center font-semibold">Rating</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {BROKERS.map((b, idx) => (
              <tr key={b.name} className={`transition-colors ${idx === 0 ? 'bg-emerald-50 hover:bg-emerald-100/60' : 'hover:bg-slate-50'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                      style={{ backgroundColor: b.color }}
                    >
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
                <td className="px-4 py-3 text-center text-xs font-bold text-emerald-700">{b.commission}</td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">{b.mfCount}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{b.feature}</td>
                <td className="px-4 py-3 text-center text-[10px] text-amber-500 tracking-tight">
                  {'★'.repeat(b.rating)}{'☆'.repeat(5 - b.rating)}
                </td>
                <td className="px-4 py-3 pr-5 text-right">
                  <a
                    href={b.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      idx === 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white'
                    }`}
                  >
                    Sign Up
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
