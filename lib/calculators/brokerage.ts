/**
 * Brokerage charge calculations.
 * All rates verified against Zerodha's published charge sheet (2025-05).
 * Source: https://zerodha.com/charges/
 *
 * Definitions:
 *   - STT/CTT  = Securities/Commodities Transaction Tax (govt)
 *   - SEBI charges    = ₹10 per crore turnover = 0.0001%
 *   - Stamp duty      = State govt — charged on BUY side only
 *   - GST (18%)       = on (brokerage + exchange txn + SEBI charges).
 *                       For MTF, also on interest charges.
 *   - Exchange txn    = NSE / BSE / MCX transaction charges (varies)
 */

export type Exchange = 'NSE' | 'BSE';
export type Mcx      = 'MCX';
export type AnyExchange = Exchange | Mcx;

export interface SegmentInput {
  buy: number;
  sell: number;
  quantity: number;
  exchange: Exchange;
}

export interface SegmentResult {
  turnover: number;
  brokerage: number;
  stt: number;              // STT for equities, CTT for commodities, 0 for currency
  exchangeTxnCharge: number;
  gst: number;
  sebiCharges: number;
  stampDuty: number;
  totalCharges: number;
  pointsToBreakeven: number;
  netPnL: number;
  /** Optional — only populated for MTF (interest on funded portion) */
  interestCharges?: number;
  /** Optional — only populated for MTF (amount funded by broker) */
  fundedAmount?: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/* ═════════════════════════════════════════════════════════════
   EQUITIES — Intraday / Delivery / F&O Futures / F&O Options
   ═════════════════════════════════════════════════════════════ */

/* ─── Intraday Equity ─────────────────────────────────────────
   Brokerage: 0.03% or ₹20 per order (lower)
   STT: 0.025% on sell side
   NSE: 0.00307%   BSE: 0.00375%
   Stamp duty: 0.003% buy
*/
export function calcIntraday(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage = r2(
    Math.min(buyVal * 0.0003, 20) + Math.min(sellVal * 0.0003, 20)
  );
  const stt            = r2(sellVal * 0.00025);
  const exchRate       = exchange === 'NSE' ? 0.0000307 : 0.0000375;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00003);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ─── Delivery Equity ─────────────────────────────────────────
   Brokerage: ZERO
   STT: 0.1% both buy and sell
   NSE: 0.00307%   BSE: 0.00375%
   Stamp duty: 0.015% buy
*/
export function calcDelivery(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage      = 0;
  const stt            = r2(turnover * 0.001);
  const exchRate       = exchange === 'NSE' ? 0.0000307 : 0.0000375;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00015);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ─── F&O Futures ─────────────────────────────────────────────
   Brokerage: 0.03% or ₹20 per order (lower)
   STT: 0.05% on sell side  ← INCREASED from 0.02% in 2024
   NSE: 0.00183%   BSE: 0% (BSE doesn't charge for futures)
   Stamp duty: 0.002% buy
*/
export function calcFutures(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage      = r2(
    Math.min(buyVal * 0.0003, 20) + Math.min(sellVal * 0.0003, 20)
  );
  const stt            = r2(sellVal * 0.0005);
  const exchRate       = exchange === 'NSE' ? 0.0000183 : 0;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00002);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ─── F&O Options ─────────────────────────────────────────────
   Brokerage: flat ₹20 per order (₹40 round trip)
   STT: 0.15% on sell premium  ← INCREASED from 0.1% in late 2024
   NSE: 0.03553% on premium   BSE: 0.0325% on premium
   Stamp duty: 0.003% buy
*/
export function calcOptions(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;     // premium × qty
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage      = 40;
  const stt            = r2(sellVal * 0.0015);
  const exchRate       = exchange === 'NSE' ? 0.0003553 : 0.000325;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00003);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ═════════════════════════════════════════════════════════════
   CURRENCY — Futures / Options (NSE & BSE)
   No STT/CTT on currency segment.
   ═════════════════════════════════════════════════════════════ */

/* ─── Currency Futures ────────────────────────────────────────
   Brokerage: 0.03% or ₹20 per order (lower)
   STT/CTT: None
   NSE: 0.00035%   BSE: 0.00045%
   Stamp duty: 0.0001% buy
*/
export function calcCurrencyFutures(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage = r2(
    Math.min(buyVal * 0.0003, 20) + Math.min(sellVal * 0.0003, 20)
  );
  const stt            = 0;
  const exchRate       = exchange === 'NSE' ? 0.0000035 : 0.0000045;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.000001);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ─── Currency Options ────────────────────────────────────────
   Brokerage: ₹20 per order (₹40 round trip)
   STT/CTT: None
   NSE: 0.0311%   BSE: 0.001%
   Stamp duty: 0.0001% buy
*/
export function calcCurrencyOptions(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity, exchange } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage      = 40;
  const stt            = 0;
  const exchRate       = exchange === 'NSE' ? 0.000311 : 0.00001;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.000001);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ═════════════════════════════════════════════════════════════
   COMMODITIES (MCX) — Futures / Options
   "stt" field here represents CTT (Commodities Transaction Tax)
   for non-agri products.
   ═════════════════════════════════════════════════════════════ */

/* ─── Commodity Futures (non-agri) ────────────────────────────
   Brokerage: 0.03% or ₹20 per order (lower)
   CTT: 0.01% on sell side (non-agri only)
   MCX: 0.0021%
   Stamp duty: 0.002% buy
*/
export function calcCommodityFutures(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage = r2(
    Math.min(buyVal * 0.0003, 20) + Math.min(sellVal * 0.0003, 20)
  );
  const stt            = r2(sellVal * 0.0001);
  const exchangeTxnCharge = r2(turnover * 0.000021);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00002);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ─── Commodity Options ───────────────────────────────────────
   Brokerage: ₹20 per order (₹40 round trip)
   CTT: 0.05% on sell premium
   MCX: 0.0418% on premium
   Stamp duty: 0.003% buy
*/
export function calcCommodityOptions(input: SegmentInput): SegmentResult {
  const { buy, sell, quantity } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  const brokerage      = 40;
  const stt            = r2(sellVal * 0.0005);
  const exchangeTxnCharge = r2(turnover * 0.000418);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00003);
  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return { turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty, totalCharges, pointsToBreakeven, netPnL };
}

/* ═════════════════════════════════════════════════════════════
   MTF (Margin Trading Facility)
   Same charges as delivery equity + funding interest.
   Zerodha 2025: brokerage 0.3% or ₹20 per order (lower)
                 interest 0.04% per day = 14.6% p.a. on funded portion
                 funded = ~75% of buy value (margin = 25%)
   ═════════════════════════════════════════════════════════════ */

export interface MtfInput extends SegmentInput {
  /** Days the position was held with margin funding (1-365). */
  holdingDays: number;
  /** Margin contributed by user as % of buy value (typically 25%). */
  marginPct?: number;
  /** Annual interest rate on funded amount (Zerodha 2025: 14.6%). */
  interestRatePct?: number;
}

export function calcMTF(input: MtfInput): SegmentResult {
  const { buy, sell, quantity, exchange, holdingDays, marginPct = 25, interestRatePct = 14.6 } = input;
  const buyVal = buy * quantity;
  const sellVal = sell * quantity;
  const turnover = buyVal + sellVal;

  /* MTF Brokerage: 0.3% or ₹20 per order (lower) on both legs
     Note: 0.3% (not 0.03% like other segments) per Zerodha 2025 */
  const brokerage = r2(
    Math.min(buyVal * 0.003, 20) + Math.min(sellVal * 0.003, 20)
  );

  /* STT/Exchange/Stamp duty — same as delivery equity */
  const stt            = r2(turnover * 0.001);
  const exchRate       = exchange === 'NSE' ? 0.0000307 : 0.0000375;
  const exchangeTxnCharge = r2(turnover * exchRate);
  const sebiCharges    = r2(turnover * 0.000001);
  const stampDuty      = r2(buyVal * 0.00015);

  /* Funded amount = buyVal × (1 - margin%) */
  const fundedAmount   = r2(buyVal * (1 - marginPct / 100));
  /* Interest = funded × rate × days / 365 */
  const interestCharges = r2(fundedAmount * (interestRatePct / 100) * (holdingDays / 365));

  const gst            = r2((brokerage + exchangeTxnCharge + sebiCharges + interestCharges) * 0.18);
  const totalCharges   = r2(brokerage + stt + exchangeTxnCharge + gst + sebiCharges + stampDuty + interestCharges);
  const netPnL         = r2((sell - buy) * quantity - totalCharges);
  const pointsToBreakeven = quantity > 0 ? r2(totalCharges / quantity) : 0;

  return {
    turnover, brokerage, stt, exchangeTxnCharge, gst, sebiCharges, stampDuty,
    interestCharges, fundedAmount,
    totalCharges, pointsToBreakeven, netPnL
  };
}
