export interface GSTResult {
  gstAmount: number;
  cgst: number;
  sgst: number;
  preTaxAmount: number;
  postTaxAmount: number;
}

export function calculateGST(
  amount: number,
  gstRate: number,
  mode: 'add' | 'remove'
): GSTResult {
  let preTaxAmount: number;
  let postTaxAmount: number;
  let gstAmount: number;

  if (mode === 'add') {
    preTaxAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    postTaxAmount = amount + gstAmount;
  } else {
    postTaxAmount = amount;
    preTaxAmount = (amount * 100) / (100 + gstRate);
    gstAmount = postTaxAmount - preTaxAmount;
  }

  return {
    gstAmount,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    preTaxAmount,
    postTaxAmount,
  };
}

export const GST_RATES = [5, 12, 18, 28] as const;
export type GSTRate = (typeof GST_RATES)[number];
