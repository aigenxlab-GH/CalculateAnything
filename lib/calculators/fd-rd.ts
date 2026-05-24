// ── Fixed Deposit / Recurring Deposit ────────────────────────────────────────

export interface FDResult {
  principal: number;
  maturityAmount: number;
  interestEarned: number;
  effectiveAnnualRate: number;
}

/** compoundFreq: 1=annual, 2=semi, 4=quarterly, 12=monthly */
export function calculateFD(
  principal: number,
  annualRate: number,
  months: number,
  compoundFreq: 1 | 2 | 4 | 12 = 4
): FDResult {
  const years = months / 12;
  const maturityAmount =
    principal * Math.pow(1 + annualRate / 100 / compoundFreq, compoundFreq * years);
  const effectiveAnnualRate = (Math.pow(1 + annualRate / 100 / compoundFreq, compoundFreq) - 1) * 100;

  return {
    principal,
    maturityAmount,
    interestEarned: maturityAmount - principal,
    effectiveAnnualRate,
  };
}

export interface RDResult {
  totalDeposited: number;
  maturityAmount: number;
  interestEarned: number;
}

/** RD compounded quarterly (standard Indian bank formula) */
export function calculateRD(
  monthlyDeposit: number,
  annualRate: number,
  months: number
): RDResult {
  const r = annualRate / 400; // quarterly rate
  let maturityAmount = 0;

  for (let n = months; n >= 1; n--) {
    // Each installment compounded quarterly for remaining quarters
    const quarters = n / 3;
    maturityAmount += monthlyDeposit * Math.pow(1 + r, quarters);
  }

  const totalDeposited = monthlyDeposit * months;
  return { totalDeposited, maturityAmount, interestEarned: maturityAmount - totalDeposited };
}
