// ── PPF / NSC / NPS / EPF / FIRE ─────────────────────────────────────────────

export interface PPFResult {
  totalDeposited: number;
  totalInterest: number;
  maturityAmount: number;
  yearlyBreakdown: { year: number; deposit: number; interest: number; balance: number }[];
}

/** PPF: 15-year lock-in, 7.1% PA, compounded annually */
export function calculatePPF(yearlyDeposit: number, years: number = 15, rate: number = 7.1): PPFResult {
  const breakdown: PPFResult['yearlyBreakdown'] = [];
  let balance = 0;
  let totalDeposited = 0;
  let totalInterest = 0;

  for (let y = 1; y <= years; y++) {
    balance += yearlyDeposit;
    const interest = (balance * rate) / 100;
    balance += interest;
    totalDeposited += yearlyDeposit;
    totalInterest += interest;
    breakdown.push({ year: y, deposit: yearlyDeposit, interest, balance });
  }

  return { totalDeposited, totalInterest, maturityAmount: balance, yearlyBreakdown: breakdown };
}

export interface NSCResult {
  principal: number;
  maturityAmount: number;
  interestEarned: number;
  yearlyAccrual: { year: number; interest: number; cumulativeBalance: number }[];
}

/** NSC: 5-year, 7.7% compounded annually but paid at maturity */
export function calculateNSC(principal: number, rate: number = 7.7): NSCResult {
  const yearlyAccrual: NSCResult['yearlyAccrual'] = [];
  let balance = principal;

  for (let y = 1; y <= 5; y++) {
    const interest = balance * (rate / 100);
    balance += interest;
    yearlyAccrual.push({ year: y, interest, cumulativeBalance: balance });
  }

  return {
    principal,
    maturityAmount: balance,
    interestEarned: balance - principal,
    yearlyAccrual,
  };
}

export interface NPSResult {
  totalCorpus: number;
  annuityCorpus: number;   // 40% compulsory annuity
  lumpsum: number;          // 60% withdrawal
  estimatedMonthlyPension: number;
  totalInvested: number;
}

/** NPS simplified projection */
export function calculateNPS(
  monthlyContribution: number,
  years: number,
  expectedReturnRate: number,
  annuityRate: number = 6
): NPSResult {
  const n = years * 12;
  const r = expectedReturnRate / 12 / 100;
  const totalCorpus = r === 0
    ? monthlyContribution * n
    : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  const annuityCorpus = totalCorpus * 0.4;
  const lumpsum = totalCorpus * 0.6;
  const estimatedMonthlyPension = (annuityCorpus * annuityRate) / 100 / 12;
  const totalInvested = monthlyContribution * n;

  return { totalCorpus, annuityCorpus, lumpsum, estimatedMonthlyPension, totalInvested };
}

export interface EPFResult {
  employeeContribution: number;
  employerContribution: number;
  totalCorpus: number;
  interestEarned: number;
}

/** EPF: 8.15% PA, employee 12% of basic, employer 3.67% to EPF (rest to EPS) */
export function calculateEPF(
  monthlyBasic: number,
  years: number,
  rate: number = 8.15
): EPFResult {
  const employeeMonthly = monthlyBasic * 0.12;
  const employerMonthly = monthlyBasic * 0.0367; // 3.67% of basic to EPF
  const totalMonthly = employeeMonthly + employerMonthly;
  const monthlyRate = rate / 12 / 100;
  const n = years * 12;

  const totalCorpus =
    totalMonthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvested = totalMonthly * n;

  return {
    employeeContribution: employeeMonthly * n,
    employerContribution: employerMonthly * n,
    totalCorpus,
    interestEarned: totalCorpus - totalInvested,
  };
}

export interface FIREResult {
  requiredCorpus: number;
  yearsToFIRE: number;
  monthlyInvestmentNeeded: number;
  currentSavings: number;
}

/** FIRE: 4% safe withdrawal rule */
export function calculateFIRE(
  monthlyExpenses: number,
  currentSavings: number,
  monthlySavings: number,
  expectedReturn: number,
  inflationRate: number
): FIREResult {
  const annualExpenses = monthlyExpenses * 12;
  const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;
  // 4% rule: corpus = 25× annual expenses
  const requiredCorpus = annualExpenses * 25;

  const monthlyRate = expectedReturn / 12 / 100;
  let balance = currentSavings;
  let months = 0;

  while (balance < requiredCorpus && months < 600) {
    balance = balance * (1 + monthlyRate) + monthlySavings;
    months++;
  }

  const monthlyInvestmentNeeded = requiredCorpus > currentSavings
    ? (requiredCorpus - currentSavings * Math.pow(1 + monthlyRate, months)) /
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    : 0;

  return {
    requiredCorpus,
    yearsToFIRE: Math.round(months / 12),
    monthlyInvestmentNeeded: Math.max(0, monthlyInvestmentNeeded),
    currentSavings,
  };
}
