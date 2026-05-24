// ── Extended loan calculators ─────────────────────────────────────────────────
import { calculateEMI } from './emi';

export interface InterestFreeHomeLoanResult {
  emi: number;
  totalInterest: number;
  sipRequiredMonthly: number;
  sipMaturityValue: number;
  netEffectiveCost: number;       // totalInterest - sipMaturityValue
  isEffectivelyInterestFree: boolean;
}

/** Parallel SIP that can offset home loan interest */
export function calculateInterestFreeHomeLoan(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  sipReturnRate: number // expected annual return on SIP
): InterestFreeHomeLoanResult {
  const { monthlyEMI, totalInterest } = calculateEMI(principal, annualRate, tenureMonths);

  // How much SIP is needed so that maturity = totalInterest
  const r = sipReturnRate / 12 / 100;
  const n = tenureMonths;
  const sipRequired =
    r === 0
      ? totalInterest / n
      : totalInterest / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  // If you invest sipRequired monthly alongside EMI
  const sipMaturityValue =
    r === 0
      ? sipRequired * n
      : sipRequired * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  const netEffectiveCost = totalInterest - sipMaturityValue;

  return {
    emi: monthlyEMI,
    totalInterest,
    sipRequiredMonthly: sipRequired,
    sipMaturityValue,
    netEffectiveCost,
    isEffectivelyInterestFree: sipMaturityValue >= totalInterest,
  };
}

export interface PrepaymentResult {
  originalEMI: number;
  originalTotalInterest: number;
  originalTenureMonths: number;
  newTenureMonths: number;
  newTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
}

/** Impact of a lumpsum prepayment at a given month */
export function calculatePrepayment(
  principal: number,
  annualRate: number,
  originalTenureMonths: number,
  prepaymentAmount: number,
  prepaymentMonth: number
): PrepaymentResult {
  const { monthlyEMI, totalInterest: originalTotalInterest } =
    calculateEMI(principal, annualRate, originalTenureMonths);

  const r = annualRate / 12 / 100;
  let balance = principal;

  // Run loan to prepayment month
  for (let m = 1; m < prepaymentMonth; m++) {
    balance = balance * (1 + r) - monthlyEMI;
  }

  balance = Math.max(0, balance - prepaymentAmount);

  // Remaining tenure with same EMI
  let newTenureMonths = prepaymentMonth - 1;
  let newTotalInterest = (prepaymentMonth - 1) * (monthlyEMI - principal * r); // approx

  let b = balance;
  while (b > 0 && newTenureMonths < originalTenureMonths * 2) {
    const interest = b * r;
    const principalPaid = monthlyEMI - interest;
    newTotalInterest += interest;
    b -= principalPaid;
    newTenureMonths++;
  }

  return {
    originalEMI: monthlyEMI,
    originalTotalInterest,
    originalTenureMonths,
    newTenureMonths,
    newTotalInterest,
    interestSaved: originalTotalInterest - newTotalInterest,
    monthsSaved: originalTenureMonths - newTenureMonths,
  };
}

export interface LoanEligibilityResult {
  maxLoanAmount: number;
  maxEMI: number;
  monthlyIncome: number;
  existingEMIs: number;
  availableForEMI: number;
}

/** Max loan based on FOIR (Fixed Obligation to Income Ratio) — typically 40–50% */
export function calculateLoanEligibility(
  monthlyIncome: number,
  existingEMIs: number,
  annualRate: number,
  tenureMonths: number,
  foirPercent: number = 50
): LoanEligibilityResult {
  const availableForEMI = monthlyIncome * (foirPercent / 100) - existingEMIs;
  const r = annualRate / 12 / 100;
  const maxLoanAmount =
    availableForEMI > 0
      ? (availableForEMI * (Math.pow(1 + r, tenureMonths) - 1)) /
        (r * Math.pow(1 + r, tenureMonths))
      : 0;

  return {
    maxLoanAmount: Math.max(0, maxLoanAmount),
    maxEMI: Math.max(0, availableForEMI),
    monthlyIncome,
    existingEMIs,
    availableForEMI: Math.max(0, availableForEMI),
  };
}
