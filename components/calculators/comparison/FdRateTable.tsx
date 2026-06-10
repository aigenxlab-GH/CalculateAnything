'use client';

import { ExternalLink, Landmark, Trophy } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';
import { trackAffiliateClick } from '@/lib/analytics';

interface FdEntry {
  name: string;
  rate1y: number;
  rate5y: number;
  seniorBonus: number;
  initials: string;
  color: string;
  applyUrl: string;
  socialProof?: string;
}

const FD_BANKS: FdEntry[] = [
  { name: 'AU Small Finance Bank', rate1y: 7.10, rate5y: 6.75, seniorBonus: 0.50, initials: 'AU',  color: '#7c3aed', applyUrl: AFFILIATE.fdRd.banks.auSfb,       socialProof: 'Highest FD rate' },
  { name: 'Kotak Mahindra Bank',   rate1y: 7.10, rate5y: 6.20, seniorBonus: 0.50, initials: 'KMB', color: '#ea580c', applyUrl: AFFILIATE.fdRd.banks.kotak,       socialProof: 'Open FD online instantly' },
  { name: 'IndusInd Bank',         rate1y: 6.75, rate5y: 6.65, seniorBonus: 0.50, initials: 'IND', color: '#0891b2', applyUrl: AFFILIATE.fdRd.banks.indusind,    socialProof: 'Open FD online in 5 mins' },
  { name: 'ICICI Bank',            rate1y: 6.55, rate5y: 6.45, seniorBonus: 0.50, initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.fdRd.banks.icici,       socialProof: 'Instant redemption option' },
  { name: 'IDFC First Bank',       rate1y: 6.50, rate5y: 7.15, seniorBonus: 0.50, initials: 'IDF', color: '#dc2626', applyUrl: AFFILIATE.fdRd.banks.idfcFirst,   socialProof: 'Best 5yr rate' },
];

const RD_BANKS: FdEntry[] = [
  { name: 'AU Small Finance Bank', rate1y: 7.10, rate5y: 6.75, seniorBonus: 0.50, initials: 'AU',  color: '#7c3aed', applyUrl: AFFILIATE.fdRd.rdBanks.auSfb,      socialProof: 'Best SFB RD rate' },
  { name: 'Kotak Mahindra Bank',   rate1y: 7.10, rate5y: 6.20, seniorBonus: 0.50, initials: 'KMB', color: '#ea580c', applyUrl: AFFILIATE.fdRd.rdBanks.kotak,      socialProof: 'Highest RD rate' },
  { name: 'IndusInd Bank',         rate1y: 6.75, rate5y: 6.65, seniorBonus: 0.50, initials: 'IND', color: '#0891b2', applyUrl: AFFILIATE.fdRd.rdBanks.indusind,   socialProof: 'Auto-debit RD setup' },
  { name: 'ICICI Bank',            rate1y: 6.55, rate5y: 6.45, seniorBonus: 0.50, initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.fdRd.rdBanks.icici },
  { name: 'IDFC First Bank',       rate1y: 6.50, rate5y: 7.15, seniorBonus: 0.50, initials: 'IDF', color: '#dc2626', applyUrl: AFFILIATE.fdRd.rdBanks.idfcFirst,  socialProof: 'Best 5yr rate' },
];

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000)    return `₹${(n / 100_000).toFixed(2)} L`;
  return fmtINR(n);
};

/** Compute FD maturity using compound interest (quarterly compounding). */
function fdMaturity(principal: number, ratePct: number, years: number): number {
  const r = ratePct / 100;
  return principal * Math.pow(1 + r / 4, 4 * years);
}
/** Compute RD maturity (monthly deposits, quarterly compounding). */
function rdMaturity(monthly: number, ratePct: number, years: number): number {
  const n = years * 12;
  const r = ratePct / 100 / 4;
  // standard RD formula approximation
  return monthly * n * (1 + ((n + 1) / 24) * (ratePct / 100));
}

interface Props {
  /** For FD: total amount invested. For RD: monthly deposit. */
  principal: number;
  tenureYears: number;
  /** 'fd' (default) or 'rd' — chooses which bank list & formula */
  mode?: 'fd' | 'rd';
}

export function FdRateTable({ principal, tenureYears, mode = 'fd' }: Props) {
  const banks = mode === 'rd' ? RD_BANKS : FD_BANKS;
  const isFiveYr = tenureYears >= 5;

  // Sort by relevant rate (best maturity first)
  const sorted = [...banks].sort((a, b) => (isFiveYr ? b.rate5y - a.rate5y : b.rate1y - a.rate1y));
  const calc = mode === 'rd' ? rdMaturity : fdMaturity;

  const bestRate     = isFiveYr ? sorted[0].rate5y : sorted[0].rate1y;
  const worstRate    = isFiveYr ? sorted[sorted.length - 1].rate5y : sorted[sorted.length - 1].rate1y;
  const bestMaturity = calc(principal, bestRate, tenureYears);
  const worstMaturity = calc(principal, worstRate, tenureYears);
  const extraEarnings = bestMaturity - worstMaturity;

  const principalDisplay = fmtL(principal);
  const bestMaturityDisplay = fmtL(bestMaturity);

  const headline = (
    <>
      Your <span className="text-blue-700">{principalDisplay}</span>
      {mode === 'rd' ? <>/mo over {tenureYears} yrs</> : <> over {tenureYears} yrs</>}
      {' '}could grow to <span className="text-blue-700">{bestMaturityDisplay}</span>
    </>
  );

  return (
    <TableShell
      headline={headline}
      subline={
        extraEarnings > 500
          ? <>That&rsquo;s <strong className="text-blue-700">{fmtL(extraEarnings)}</strong> more than the lowest-yielding bank. Pick wisely.</>
          : <>{`Compare ${banks.length} top banks side-by-side. Rates as of May 2025.`}</>
      }
      headerIcon={<Landmark className="w-4 h-4" />}
      iconColorClass="text-blue-600"
      gradientClass="bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50"
      footerNote={<>Rates are indicative for general public. Add 0.5% for senior citizens. Subject to change. Affiliate links — we may earn a commission at no cost to you.</>}
      browseAllUrl={AFFILIATE.fdRd.primary}
      browseAllLabel="Compare all FD rates"
      browseAllColorClass="text-blue-700"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-3 text-left font-semibold">Bank</th>
              <th className="px-4 py-3 text-center font-semibold">1Y Rate</th>
              <th className="px-4 py-3 text-center font-semibold">5Y Rate</th>
              <th className="px-4 py-3 text-center font-semibold">
                Your Maturity
                <span className="block font-normal text-[10px] text-slate-500 leading-none mt-0.5">in {tenureYears} yrs</span>
              </th>
              <th className="px-4 py-3 text-center font-semibold">Senior Bonus</th>
              <th className="px-4 py-3 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((bank, idx) => {
              const rate = isFiveYr ? bank.rate5y : bank.rate1y;
              const maturity = calc(principal, rate, tenureYears);
              const isBest = idx === 0;

              return (
                <tr key={bank.name} className={`transition-colors ${isBest ? 'bg-emerald-50 hover:bg-emerald-100/60' : 'hover:bg-slate-50'}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ backgroundColor: bank.color }}
                      >
                        {bank.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 text-xs leading-tight">
                          {bank.name}
                          {isBest && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                              <Trophy className="w-2.5 h-2.5" /> BEST
                            </span>
                          )}
                        </span>
                        {bank.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{bank.socialProof}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${!isFiveYr && isBest ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {bank.rate1y.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${isFiveYr && isBest ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {bank.rate5y.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold tabular-nums ${isBest ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {fmtL(maturity)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-slate-600">
                    +{bank.seniorBonus}%
                  </td>
                  <td className="px-4 py-3 pr-5 text-right">
                    <a
                      href={bank.applyUrl}
              onClick={() => trackAffiliateClick(bank.name, 'fd-rate-table')}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isBest
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white'
                      }`}
                    >
                      Open {mode === 'rd' ? 'RD' : 'FD'}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TableShell>
  );
}
