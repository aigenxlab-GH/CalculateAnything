// ── Indian Income Tax calculations ───────────────────────────────────────────

export interface TaxResult {
  grossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  basicTax: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  monthlyTax: number;
  rebate87A: number;
  slabBreakdown: { slab: string; rate: number; tax: number }[];
}

function computeSurcharge(tax: number, income: number): number {
  if (income > 50_00_00_000) return tax * 0.37; // >₹5Cr: 37%
  if (income > 2_00_00_000)  return tax * 0.25; // >₹2Cr: 25%
  if (income > 1_00_00_000)  return tax * 0.15; // >₹1Cr: 15%
  if (income > 50_00_000)    return tax * 0.10; // >₹50L: 10%
  return 0;
}

function applySlabs(
  taxableIncome: number,
  slabs: { limit: number; rate: number }[]
): { basicTax: number; breakdown: { slab: string; rate: number; tax: number }[] } {
  let basicTax = 0;
  const breakdown: { slab: string; rate: number; tax: number }[] = [];
  let prev = 0;

  for (const { limit, rate } of slabs) {
    if (taxableIncome <= prev) break;
    const slice = Math.min(taxableIncome, limit) - prev;
    const tax = (slice * rate) / 100;
    basicTax += tax;
    if (rate > 0 || taxableIncome > prev) {
      const lo = (prev / 100_000).toFixed(0);
      const hi = limit === Infinity ? 'Above' : (limit / 100_000).toFixed(0);
      breakdown.push({
        slab: limit === Infinity ? `Above ₹${lo}L` : `₹${lo}L – ₹${hi}L`,
        rate,
        tax,
      });
    }
    prev = limit;
  }
  return { basicTax, breakdown };
}

/** New regime FY 2025-26 */
export function calcNewRegime2526(grossIncome: number): TaxResult {
  const SD = 75_000;
  const taxableIncome = Math.max(0, grossIncome - SD);

  const slabs = [
    { limit: 4_00_000,   rate: 0  },
    { limit: 8_00_000,   rate: 5  },
    { limit: 12_00_000,  rate: 10 },
    { limit: 16_00_000,  rate: 15 },
    { limit: 20_00_000,  rate: 20 },
    { limit: 24_00_000,  rate: 25 },
    { limit: Infinity,   rate: 30 },
  ];

  const { basicTax, breakdown } = applySlabs(taxableIncome, slabs);

  // Rebate u/s 87A: if net taxable income ≤ ₹12L, full rebate (effectively 0 tax up to ₹12.75L gross)
  const rebate87A = taxableIncome <= 12_00_000 ? basicTax : 0;
  const taxAfterRebate = Math.max(0, basicTax - rebate87A);

  const surcharge = computeSurcharge(taxAfterRebate, grossIncome);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    grossIncome, standardDeduction: SD, taxableIncome, basicTax,
    rebate87A, surcharge, cess, totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    monthlyTax: totalTax / 12,
    slabBreakdown: breakdown,
  };
}

/** New regime FY 2024-25 */
export function calcNewRegime2425(grossIncome: number): TaxResult {
  const SD = 75_000;
  const taxableIncome = Math.max(0, grossIncome - SD);

  const slabs = [
    { limit: 3_00_000,   rate: 0  },
    { limit: 7_00_000,   rate: 5  },
    { limit: 10_00_000,  rate: 10 },
    { limit: 12_00_000,  rate: 15 },
    { limit: 15_00_000,  rate: 20 },
    { limit: Infinity,   rate: 30 },
  ];

  const { basicTax, breakdown } = applySlabs(taxableIncome, slabs);
  const rebate87A = taxableIncome <= 7_00_000 ? basicTax : 0;
  const taxAfterRebate = Math.max(0, basicTax - rebate87A);
  const surcharge = computeSurcharge(taxAfterRebate, grossIncome);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    grossIncome, standardDeduction: SD, taxableIncome, basicTax,
    rebate87A, surcharge, cess, totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    monthlyTax: totalTax / 12,
    slabBreakdown: breakdown,
  };
}

export interface OldRegimeDeductions {
  section80C: number;      // max 1,50,000
  section80D: number;      // max 25,000
  hra: number;             // HRA exemption amount
  lta: number;
  npsEmployer: number;     // 80CCD(2) - employer NPS (no limit for employee)
  homeLoanInterest: number; // Section 24 - max 2,00,000
  otherDeductions: number;
}

/** Old regime with deductions */
export function calcOldRegime(grossIncome: number, deductions: OldRegimeDeductions): TaxResult {
  const SD = 50_000;
  const totalDed =
    Math.min(deductions.section80C, 1_50_000) +
    Math.min(deductions.section80D, 25_000) +
    deductions.hra +
    deductions.lta +
    deductions.npsEmployer +
    Math.min(deductions.homeLoanInterest, 2_00_000) +
    deductions.otherDeductions;

  const taxableIncome = Math.max(0, grossIncome - SD - totalDed);

  const slabs = [
    { limit: 2_50_000,  rate: 0  },
    { limit: 5_00_000,  rate: 5  },
    { limit: 10_00_000, rate: 20 },
    { limit: Infinity,  rate: 30 },
  ];

  const { basicTax, breakdown } = applySlabs(taxableIncome, slabs);
  const rebate87A = taxableIncome <= 5_00_000 ? basicTax : 0;
  const taxAfterRebate = Math.max(0, basicTax - rebate87A);
  const surcharge = computeSurcharge(taxAfterRebate, grossIncome);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    grossIncome, standardDeduction: SD, taxableIncome, basicTax,
    rebate87A, surcharge, cess, totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    monthlyTax: totalTax / 12,
    slabBreakdown: breakdown,
  };
}

export interface RegimeComparison {
  newRegime: TaxResult;
  oldRegime: TaxResult;
  betterRegime: 'new' | 'old';
  savings: number;
}

export function compareRegimes(
  grossIncome: number,
  deductions: OldRegimeDeductions,
  year: '2526' | '2425' = '2526'
): RegimeComparison {
  const newRegime = year === '2526' ? calcNewRegime2526(grossIncome) : calcNewRegime2425(grossIncome);
  const oldRegime = calcOldRegime(grossIncome, deductions);
  const betterRegime = newRegime.totalTax <= oldRegime.totalTax ? 'new' : 'old';
  const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax);
  return { newRegime, oldRegime, betterRegime, savings };
}
