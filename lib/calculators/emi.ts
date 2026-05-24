export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface EMIResult {
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
  amortization: AmortizationRow[];
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const monthlyRate = annualRate / 12 / 100;

  let monthlyEMI: number;
  if (monthlyRate === 0) {
    monthlyEMI = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEMI = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = monthlyEMI * tenureMonths;
  const totalInterest = totalPayment - principal;

  const amortization: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= Math.min(tenureMonths, 360); month++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyEMI - interest;
    balance = balance - principalPaid;

    amortization.push({
      month,
      emi: monthlyEMI,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return { monthlyEMI, totalPayment, totalInterest, amortization };
}
