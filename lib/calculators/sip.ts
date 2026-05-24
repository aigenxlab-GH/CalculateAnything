// ── SIP / Investment math ────────────────────────────────────────────────────

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

/** Standard monthly SIP future value */
export function calculateSIP(monthly: number, annualRate: number, years: number): SIPResult {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  const totalValue = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const investedAmount = monthly * n;
  return { investedAmount, estimatedReturns: totalValue - investedAmount, totalValue };
}

/** How much monthly SIP needed to reach a goal */
export function calculateGoalSIP(goalAmount: number, annualRate: number, years: number): number {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  if (r === 0) return goalAmount / n;
  return goalAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}

/** Step-up SIP: monthly SIP that increases by stepUpRate% every year */
export interface StepUpSIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

export function calculateStepUpSIP(
  initialMonthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
): StepUpSIPResult {
  const monthlyRate = annualRate / 12 / 100;
  let totalValue = 0;
  let investedAmount = 0;
  let monthly = initialMonthly;

  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      const monthsRemaining = (years - y) * 12 - m;
      totalValue += monthly * Math.pow(1 + monthlyRate, monthsRemaining);
      investedAmount += monthly;
    }
    monthly *= 1 + stepUpPercent / 100;
  }
  return { investedAmount, estimatedReturns: totalValue - investedAmount, totalValue };
}

/** Lumpsum future value */
export function calculateLumpsum(principal: number, annualRate: number, years: number): SIPResult {
  const totalValue = principal * Math.pow(1 + annualRate / 100, years);
  return { investedAmount: principal, estimatedReturns: totalValue - principal, totalValue };
}

/** SWP: how long corpus lasts with monthly withdrawal */
export interface SWPResult {
  monthsLasting: number;
  totalWithdrawn: number;
  remainingCorpus: number;
}

export function calculateSWP(
  corpus: number,
  monthlyWithdrawal: number,
  annualRate: number
): SWPResult {
  const r = annualRate / 12 / 100;
  let balance = corpus;
  let months = 0;
  while (balance > 0 && months < 600) {
    balance = balance * (1 + r) - monthlyWithdrawal;
    months++;
    if (balance <= 0) break;
  }
  const totalWithdrawn = Math.min(months, 600) * monthlyWithdrawal;
  return { monthsLasting: months, totalWithdrawn, remainingCorpus: Math.max(0, balance) };
}

/** CAGR from initial to final value */
export function calculateCAGR(initial: number, final: number, years: number): number {
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}

/** Future cost after inflation */
export function calculateInflation(
  presentValue: number,
  inflationRate: number,
  years: number
): { futureValue: number; purchasingPowerLoss: number } {
  const futureValue = presentValue * Math.pow(1 + inflationRate / 100, years);
  return { futureValue, purchasingPowerLoss: futureValue - presentValue };
}

/** Compound interest with frequency */
export function calculateCompounding(
  principal: number,
  annualRate: number,
  years: number,
  frequency: number // 1=annual, 2=semi, 4=quarterly, 12=monthly, 365=daily
): { maturityAmount: number; interestEarned: number } {
  const maturityAmount = principal * Math.pow(1 + annualRate / 100 / frequency, frequency * years);
  return { maturityAmount, interestEarned: maturityAmount - principal };
}

/** Simple interest */
export function calculateSimpleInterest(
  principal: number,
  rate: number,
  years: number
): { interest: number; totalAmount: number } {
  const interest = (principal * rate * years) / 100;
  return { interest, totalAmount: principal + interest };
}
