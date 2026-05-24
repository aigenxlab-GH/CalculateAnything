// ── Business calculators ──────────────────────────────────────────────────────

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  profitAtCapacity: number;
}

export function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  sellingPricePerUnit: number,
  capacityUnits?: number
): BreakEvenResult {
  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : Infinity;
  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;
  const contributionMarginRatio =
    sellingPricePerUnit > 0 ? (contributionMargin / sellingPricePerUnit) * 100 : 0;
  const profitAtCapacity = capacityUnits
    ? capacityUnits * contributionMargin - fixedCosts
    : 0;

  return { breakEvenUnits, breakEvenRevenue, contributionMargin, contributionMarginRatio, profitAtCapacity };
}

export interface ProfitMarginResult {
  grossProfit: number;
  operatingProfit: number;
  netProfit: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  markupPercent: number;
}

export function calculateProfitMargin(
  revenue: number,
  cogs: number,           // cost of goods sold
  operatingExpenses: number,
  otherExpenses: number
): ProfitMarginResult {
  const grossProfit = revenue - cogs;
  const operatingProfit = grossProfit - operatingExpenses;
  const netProfit = operatingProfit - otherExpenses;

  return {
    grossProfit,
    operatingProfit,
    netProfit,
    grossMargin: revenue > 0 ? (grossProfit / revenue) * 100 : 0,
    operatingMargin: revenue > 0 ? (operatingProfit / revenue) * 100 : 0,
    netMargin: revenue > 0 ? (netProfit / revenue) * 100 : 0,
    markupPercent: cogs > 0 ? (grossProfit / cogs) * 100 : 0,
  };
}

export interface WorkingCapitalResult {
  workingCapital: number;
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  workingCapitalTurnover?: number;
}

export function calculateWorkingCapital(
  currentAssets: number,
  currentLiabilities: number,
  inventory: number,
  cashAndEquivalents: number,
  annualRevenue?: number
): WorkingCapitalResult {
  const workingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
  const quickRatio = currentLiabilities > 0 ? (currentAssets - inventory) / currentLiabilities : 0;
  const cashRatio = currentLiabilities > 0 ? cashAndEquivalents / currentLiabilities : 0;
  const workingCapitalTurnover =
    annualRevenue && workingCapital > 0 ? annualRevenue / workingCapital : undefined;

  return { workingCapital, currentRatio, quickRatio, cashRatio, workingCapitalTurnover };
}

export interface DSCRResult {
  dscr: number;
  rating: string;
  ratingColor: string;
  annualDebtService: number;
  surplusDeficit: number;
}

export function calculateDSCR(
  netOperatingIncome: number,
  annualPrincipal: number,
  annualInterest: number
): DSCRResult {
  const annualDebtService = annualPrincipal + annualInterest;
  const dscr = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;
  const surplusDeficit = netOperatingIncome - annualDebtService;

  let rating: string;
  let ratingColor: string;
  if (dscr >= 2.0)       { rating = 'Excellent'; ratingColor = '#22c55e'; }
  else if (dscr >= 1.5)  { rating = 'Good';      ratingColor = '#84cc16'; }
  else if (dscr >= 1.25) { rating = 'Acceptable'; ratingColor = '#f59e0b'; }
  else if (dscr >= 1.0)  { rating = 'Marginal';  ratingColor = '#f97316'; }
  else                   { rating = 'Poor — Default Risk'; ratingColor = '#ef4444'; }

  return { dscr, rating, ratingColor, annualDebtService, surplusDeficit };
}
