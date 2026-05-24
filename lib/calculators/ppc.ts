export interface PPCResult {
  clicks: number;
  impressions: number;
  conversions: number;
  costPerConversion: number;
  roas: number;
  revenue: number;
}

export function calculatePPC(
  budget: number,
  cpc: number,
  ctrPercent: number,
  conversionRatePercent: number,
  revenuePerConversion: number
): PPCResult {
  const clicks = cpc > 0 ? Math.floor(budget / cpc) : 0;
  const ctr = ctrPercent / 100;
  const impressions = ctr > 0 ? Math.round(clicks / ctr) : 0;
  const conversionRate = conversionRatePercent / 100;
  const conversions = Math.round(clicks * conversionRate);
  const costPerConversion = conversions > 0 ? budget / conversions : 0;
  const revenue = conversions * revenuePerConversion;
  const roas = budget > 0 ? revenue / budget : 0;

  return { clicks, impressions, conversions, costPerConversion, roas, revenue };
}
