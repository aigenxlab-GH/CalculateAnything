'use client';

import { useState } from 'react';
import { ExternalLink, TrendingDown, Trophy } from 'lucide-react';
import { calculateEMI } from '@/lib/calculators/emi';
import { AFFILIATE } from '@/lib/affiliate-links';

/* ─── Types ─── */
type LoanType = 'home' | 'car' | 'personal' | 'education';

interface BankEntry {
  name: string;
  shortName: string;
  rate: number;          // base/starting rate shown
  maxRate: number;
  applyUrl: string;      // BankBazaar affiliate link
  color: string;         // accent color for logo bg
  initials: string;
  socialProof?: string;
}

/* ─── Bank data (rates as of May 2025) ─── */
const BANKS: Record<LoanType, BankEntry[]> = {
  home: [
    { name: 'Bank of Baroda',        shortName: 'BoB',    rate: 8.40, maxRate: 10.65, initials: 'BoB', color: '#f97316', applyUrl: AFFILIATE.emi.banks.home.bob,   socialProof: 'Lowest starting rate' },
    { name: 'Punjab National Bank',  shortName: 'PNB',    rate: 8.45, maxRate: 10.25, initials: 'PNB', color: '#8b5cf6', applyUrl: AFFILIATE.emi.banks.home.pnb,   socialProof: 'PSB with fast approval' },
    { name: 'State Bank of India',   shortName: 'SBI',    rate: 8.50, maxRate: 10.15, initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.emi.banks.home.sbi,   socialProof: 'India\'s largest bank' },
    { name: 'LIC Housing Finance',   shortName: 'LIC HF', rate: 8.50, maxRate: 10.50, initials: 'LIC', color: '#16a34a', applyUrl: AFFILIATE.emi.banks.home.lic,   socialProof: '40 L+ homes financed' },
    { name: 'Bajaj Housing Finance', shortName: 'Bajaj',  rate: 8.55, maxRate: 15.00, initials: 'BHF', color: '#dc2626', applyUrl: AFFILIATE.emi.banks.home.bajaj, socialProof: '3-min online approval' },
    { name: 'HDFC Bank',             shortName: 'HDFC',   rate: 8.75, maxRate:  9.65, initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.emi.banks.home.hdfc,  socialProof: 'Lowest max rate' },
    { name: 'ICICI Bank',            shortName: 'ICICI',  rate: 8.75, maxRate:  9.80, initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.emi.banks.home.icici, socialProof: 'Instant sanction letter' },
    { name: 'Kotak Mahindra Bank',   shortName: 'Kotak',  rate: 8.75, maxRate:  9.60, initials: 'KMB', color: '#dc2626', applyUrl: AFFILIATE.emi.banks.home.kotak, socialProof: 'Doorstep documentation' },
    { name: 'Axis Bank',             shortName: 'Axis',   rate: 8.75, maxRate:  9.80, initials: 'AXS', color: '#7c3aed', applyUrl: AFFILIATE.emi.banks.home.axis  },
    { name: 'Tata Capital',          shortName: 'Tata',   rate: 8.75, maxRate: 12.00, initials: 'TAT', color: '#0891b2', applyUrl: AFFILIATE.emi.banks.home.tata  },
  ],
  car: [
    { name: 'State Bank of India',   shortName: 'SBI',    rate: 8.75, maxRate: 12.25, initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.emi.banks.car.sbi   },
    { name: 'Punjab National Bank',  shortName: 'PNB',    rate: 8.75, maxRate: 10.35, initials: 'PNB', color: '#8b5cf6', applyUrl: AFFILIATE.emi.banks.car.pnb   },
    { name: 'HDFC Bank',             shortName: 'HDFC',   rate: 8.80, maxRate: 10.00, initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.emi.banks.car.hdfc  },
    { name: 'Bank of Baroda',        shortName: 'BoB',    rate: 8.90, maxRate: 11.35, initials: 'BoB', color: '#f97316', applyUrl: AFFILIATE.emi.banks.car.bob   },
    { name: 'Kotak Mahindra Bank',   shortName: 'Kotak',  rate: 8.99, maxRate: 14.00, initials: 'KMB', color: '#dc2626', applyUrl: AFFILIATE.emi.banks.car.kotak },
    { name: 'ICICI Bank',            shortName: 'ICICI',  rate: 9.00, maxRate: 14.00, initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.emi.banks.car.icici },
    { name: 'Axis Bank',             shortName: 'Axis',   rate: 9.00, maxRate: 13.50, initials: 'AXS', color: '#7c3aed', applyUrl: AFFILIATE.emi.banks.car.axis  },
    { name: 'Tata Capital',          shortName: 'Tata',   rate: 9.50, maxRate: 15.00, initials: 'TAT', color: '#0891b2', applyUrl: AFFILIATE.emi.banks.car.tata  },
  ],
  personal: [
    { name: 'IndusInd Bank',         shortName: 'IndusInd', rate: 10.49, maxRate: 26.00, initials: 'IND', color: '#0891b2', applyUrl: AFFILIATE.emi.banks.personal.indusind },
    { name: 'HDFC Bank',             shortName: 'HDFC',     rate: 10.75, maxRate: 24.00, initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.emi.banks.personal.hdfc     },
    { name: 'ICICI Bank',            shortName: 'ICICI',    rate: 10.85, maxRate: 22.00, initials: 'ICI', color: '#f59e0b', applyUrl: AFFILIATE.emi.banks.personal.icici    },
    { name: 'Bajaj Finance',         shortName: 'Bajaj',    rate: 11.00, maxRate: 35.00, initials: 'BAJ', color: '#dc2626', applyUrl: AFFILIATE.emi.banks.personal.bajaj    },
    { name: 'Kotak Mahindra Bank',   shortName: 'Kotak',    rate: 10.99, maxRate: 36.00, initials: 'KMB', color: '#dc2626', applyUrl: AFFILIATE.emi.banks.personal.kotak    },
    { name: 'State Bank of India',   shortName: 'SBI',      rate: 11.15, maxRate: 14.55, initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.emi.banks.personal.sbi      },
    { name: 'Axis Bank',             shortName: 'Axis',     rate: 11.25, maxRate: 22.00, initials: 'AXS', color: '#7c3aed', applyUrl: AFFILIATE.emi.banks.personal.axis     },
    { name: 'Tata Capital',          shortName: 'Tata',     rate: 11.49, maxRate: 35.00, initials: 'TAT', color: '#0891b2', applyUrl: AFFILIATE.emi.banks.personal.tata     },
  ],
  education: [
    { name: 'PNB Saraswati',         shortName: 'PNB',      rate:  8.40, maxRate: 11.00, initials: 'PNB', color: '#8b5cf6', applyUrl: AFFILIATE.educationLoan.banks.sbi      },
    { name: 'State Bank of India',   shortName: 'SBI',      rate:  8.55, maxRate: 11.65, initials: 'SBI', color: '#2563eb', applyUrl: AFFILIATE.educationLoan.banks.sbi      },
    { name: 'Bank of Baroda',        shortName: 'BoB',      rate:  8.55, maxRate: 11.45, initials: 'BoB', color: '#f97316', applyUrl: AFFILIATE.educationLoan.banks.sbi      },
    { name: 'HDFC Credila',          shortName: 'Credila',  rate: 10.50, maxRate: 12.50, initials: 'HDF', color: '#be185d', applyUrl: AFFILIATE.educationLoan.banks.credila  },
    { name: 'Avanse Financial',      shortName: 'Avanse',   rate: 11.00, maxRate: 14.00, initials: 'AVN', color: '#dc2626', applyUrl: AFFILIATE.educationLoan.banks.avanse   },
    { name: 'InCred',                shortName: 'InCred',   rate: 11.50, maxRate: 14.00, initials: 'INC', color: '#0891b2', applyUrl: AFFILIATE.educationLoan.banks.incred   },
    { name: 'Auxilo',                shortName: 'Auxilo',   rate: 11.00, maxRate: 14.00, initials: 'AUX', color: '#7c3aed', applyUrl: AFFILIATE.educationLoan.banks.auxilo   },
  ],
};

const LOAN_LABELS: Record<LoanType, string> = {
  home: 'Home Loan',
  car: 'Car Loan',
  personal: 'Personal Loan',
  education: 'Education Loan',
};

const fmtINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
const fmtL = (n: number) => {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)}Cr`;
  if (n >= 100_000)    return `₹${(n / 100_000).toFixed(1)}L`;
  return fmtINR(n);
};

/* ─── Props ─── */
interface Props {
  principal: number;
  tenureMonths: number;
  /** Lock to a single loan type (hides the tab switcher). Used by the
   *  dedicated home/car/personal/education loan calculators. */
  lockedLoanType?: LoanType;
}

export function BankRateTable({ principal, tenureMonths, lockedLoanType }: Props) {
  const [loanType, setLoanType] = useState<LoanType>(lockedLoanType ?? 'home');
  const showTabs = !lockedLoanType;

  const banks = [...BANKS[loanType]].sort((a, b) => a.rate - b.rate);
  const bestRate = banks[0].rate;
  const worstEMI = calculateEMI(principal, banks[banks.length - 1].rate, tenureMonths).monthlyEMI;
  const bestEMI  = calculateEMI(principal, bestRate, tenureMonths).monthlyEMI;
  const totalSavings = (worstEMI - bestEMI) * tenureMonths;

  return (
    <div className="mt-3 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Header — punchy headline */}
      <div className="px-5 py-2 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 flex-wrap">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              {totalSavings > 1000 ? (
                <>You could save <span className="text-amber-700">{fmtL(totalSavings)}</span> — pick the right lender</>
              ) : (
                <>Lowest rate today: <span className="text-amber-700">{bestRate}%</span> p.a. — which lender wins for you?</>
              )}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalised EMI for <strong>{fmtL(principal)}</strong> over <strong>{tenureMonths} months</strong>.
              Rates as of May 2025.
            </p>
          </div>
          {/* Loan type tabs — hidden when lockedLoanType is set */}
          {showTabs && (
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
              {(Object.keys(LOAN_LABELS) as LoanType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLoanType(t)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    loanType === t
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {LOAN_LABELS[t]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs">
              <th className="px-4 py-2 text-left font-semibold">Bank / NBFC</th>
              <th className="px-4 py-2 text-center font-semibold">Interest Rate</th>
              <th className="px-4 py-2 text-center font-semibold">
                Your EMI
                <span className="block font-normal text-[10px] text-slate-500 leading-none mt-0.5">at starting rate</span>
              </th>
              <th className="px-4 py-2 text-center font-semibold">Monthly Savings</th>
              <th className="px-4 py-2 text-right font-semibold pr-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {banks.map((bank, idx) => {
              const emi = calculateEMI(principal, bank.rate, tenureMonths).monthlyEMI;
              const saving = worstEMI - emi;
              const isBest = idx === 0;

              return (
                <tr
                  key={bank.name}
                  className={`transition-colors ${
                    isBest ? 'bg-emerald-50 hover:bg-emerald-100/60' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Bank name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Logo placeholder */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ backgroundColor: bank.color }}
                      >
                        {bank.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 text-xs leading-tight block">
                          {bank.name}
                          {isBest && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                              <Trophy className="w-2.5 h-2.5" /> BEST
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {bank.socialProof ?? `up to ${bank.maxRate}%`}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${isBest ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {bank.rate.toFixed(2)}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">p.a.</span>
                  </td>

                  {/* EMI */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold tabular-nums ${isBest ? 'text-emerald-600' : 'text-slate-700'}`}>
                      {fmtINR(emi)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">/month</span>
                  </td>

                  {/* Savings */}
                  <td className="px-4 py-3 text-center">
                    {saving > 0 ? (
                      <div>
                        <span className="text-xs font-semibold text-emerald-600 tabular-nums">
                          + {fmtINR(saving)}/mo
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {fmtL(saving * tenureMonths)} total
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        Lowest Rate 🏆
                      </span>
                    )}
                  </td>

                  {/* CTA */}
                  <td className="px-4 py-3 pr-5 text-right">
                    <a
                      href={bank.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isBest
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-primary/10 hover:bg-primary text-primary hover:text-white'
                      }`}
                    >
                      Apply
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Rates shown are indicative starting rates (best-case, salaried applicants). Actual rate depends on credit score &amp; eligibility.
          Affiliate links — we may earn a commission at no cost to you.
        </p>
        <a
          href={
            loanType === 'personal'  ? AFFILIATE.personalLoan.primary :
            loanType === 'car'       ? AFFILIATE.carLoan.primary :
            loanType === 'education' ? AFFILIATE.educationLoan.primary :
                                       AFFILIATE.homeLoan.primary
          }
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-[10px] font-semibold text-primary hover:underline whitespace-nowrap flex items-center gap-0.5"
        >
          Compare all 50+ banks <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
