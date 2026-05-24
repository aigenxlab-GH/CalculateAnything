// ── Salary / HRA / Gratuity ──────────────────────────────────────────────────

export interface SalaryBreakup {
  ctc: number;
  basic: number;
  hra: number;
  specialAllowance: number;
  pfEmployee: number;      // 12% of basic, employee share
  pfEmployer: number;      // 12% of basic, employer share (part of CTC)
  professionalTax: number; // state-wise, default ₹200/month
  grossSalary: number;     // before PF & PT deductions
  totalDeductions: number;
  netTakeHome: number;
  annualTakeHome: number;
}

export function calculateTakeHomeSalary(annualCTC: number): SalaryBreakup {
  // Typical Indian CTC breakup structure
  const pfEmployer = Math.min(annualCTC * 0.12 * 0.5, 21_600); // employer PF capped
  const netCTC = annualCTC - pfEmployer;

  const basic = netCTC * 0.4;                        // 40% of net CTC
  const hra   = basic * 0.5;                         // 50% of basic (metro)
  const specialAllowance = netCTC - basic - hra;

  const pfEmployee = Math.min(basic * 0.12, 21_600); // employee PF capped at ₹1800/month
  const professionalTax = 2400;                      // ₹200/month
  const grossSalary = basic + hra + specialAllowance;
  const totalDeductions = pfEmployee + professionalTax;
  const netTakeHome = grossSalary - totalDeductions;

  return {
    ctc: annualCTC,
    basic,
    hra,
    specialAllowance,
    pfEmployee,
    pfEmployer,
    professionalTax,
    grossSalary,
    totalDeductions,
    netTakeHome,
    annualTakeHome: netTakeHome,
  };
}

export interface HRAResult {
  actualHRA: number;
  rentPaid: number;
  basicSalary: number;
  exemption1: number; // Actual HRA received
  exemption2: number; // Rent paid – 10% of basic
  exemption3: number; // 50/40% of basic (metro/non-metro)
  hraExemption: number; // min of 3
  taxableHRA: number;
}

export function calculateHRAExemption(
  annualHRA: number,
  annualBasic: number,
  annualRent: number,
  isMetro: boolean
): HRAResult {
  const exemption1 = annualHRA;
  const exemption2 = Math.max(0, annualRent - annualBasic * 0.1);
  const exemption3 = annualBasic * (isMetro ? 0.5 : 0.4);
  const hraExemption = Math.min(exemption1, exemption2, exemption3);

  return {
    actualHRA: annualHRA,
    rentPaid: annualRent,
    basicSalary: annualBasic,
    exemption1,
    exemption2,
    exemption3,
    hraExemption,
    taxableHRA: annualHRA - hraExemption,
  };
}

export interface GratuityResult {
  gratuityAmount: number;
  taxFreeLimit: number;
  taxableGratuity: number;
}

/** As per Payment of Gratuity Act 1972 */
export function calculateGratuity(
  lastDrawnBasic: number,     // monthly basic + DA
  yearsOfService: number,
  isCoveredUnderAct: boolean  // 10+ employees
): GratuityResult {
  const roundedYears = Math.floor(yearsOfService);
  let gratuityAmount: number;

  if (isCoveredUnderAct) {
    // Formula: (Basic + DA) × 15/26 × years of service
    gratuityAmount = (lastDrawnBasic * 15 * roundedYears) / 26;
  } else {
    // For employees not covered: (Basic + DA) × 15/30 × years
    gratuityAmount = (lastDrawnBasic * 15 * roundedYears) / 30;
  }

  const taxFreeLimit = 20_00_000; // Max ₹20L tax-free
  const taxableGratuity = Math.max(0, gratuityAmount - taxFreeLimit);

  return { gratuityAmount, taxFreeLimit, taxableGratuity };
}
