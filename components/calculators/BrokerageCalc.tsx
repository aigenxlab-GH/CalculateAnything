'use client';

import { useState, useCallback } from 'react';
import { StockBrokerTable } from '@/components/calculators/comparison/StockBrokerTable';
import {
  calcIntraday,
  calcDelivery,
  calcFutures,
  calcOptions,
  calcCurrencyFutures,
  calcCurrencyOptions,
  calcCommodityFutures,
  calcCommodityOptions,
  calcMTF,
  type Exchange,
  type SegmentInput,
  type SegmentResult,
} from '@/lib/calculators/brokerage';

/* ─── helpers ─── */
const r2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (n: number) =>
  '₹ ' +
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(r2(Math.abs(n)));

/* ─── Types ─── */
type SegmentKey =
  | 'intraday'   | 'delivery'  | 'futures'  | 'options'
  | 'curFutures' | 'curOptions'
  | 'comFutures' | 'comOptions'
  | 'mtf';

type TopTab = 'equities' | 'currency' | 'commodities' | 'mtf';

interface SegmentState {
  buy: string;
  sell: string;
  quantity: string;
  exchange: Exchange;
  /** MTF-only: holding days */
  holdingDays?: string;
}

const DEFAULT_STATE: SegmentState = { buy: '', sell: '', quantity: '', exchange: 'NSE' };
const DEFAULT_MTF_STATE: SegmentState = { ...DEFAULT_STATE, holdingDays: '30' };

/* Calc function dispatcher — uses MTF input shape for MTF, regular for others. */
function runCalc(segKey: SegmentKey, input: SegmentInput, holdingDays: number): SegmentResult {
  switch (segKey) {
    case 'intraday':    return calcIntraday(input);
    case 'delivery':    return calcDelivery(input);
    case 'futures':     return calcFutures(input);
    case 'options':     return calcOptions(input);
    case 'curFutures':  return calcCurrencyFutures(input);
    case 'curOptions':  return calcCurrencyOptions(input);
    case 'comFutures':  return calcCommodityFutures(input);
    case 'comOptions':  return calcCommodityOptions(input);
    case 'mtf':         return calcMTF({ ...input, holdingDays });
  }
}

const LABELS: Record<SegmentKey, string> = {
  intraday:   'Intraday Equity',
  delivery:   'Delivery Equity',
  futures:    'F&O - Futures',
  options:    'F&O - Options',
  curFutures: 'Currency Futures',
  curOptions: 'Currency Options',
  comFutures: 'Commodity Futures',
  comOptions: 'Commodity Options',
  mtf:        'MTF (Margin Trade)',
};

/* Which segments show for each top tab */
const TAB_SEGMENTS: Record<TopTab, SegmentKey[]> = {
  equities:    ['intraday', 'delivery', 'futures', 'options'],
  currency:    ['curFutures', 'curOptions'],
  commodities: ['comFutures', 'comOptions'],
  mtf:         ['mtf'],
};

const TOP_TAB_LABELS: Record<TopTab, string> = {
  equities:    'Equities - F&O',
  currency:    'Currency',
  commodities: 'Commodities',
  mtf:         'MTF',
};

/* Whether the segment uses MCX (no NSE/BSE choice) */
function isMcx(segKey: SegmentKey) {
  return segKey === 'comFutures' || segKey === 'comOptions';
}

/* ─── Row inside breakdown ─── */
function Row({ label, value, bold, green, muted, indent }: {
  label: string; value: string; bold?: boolean; green?: boolean; muted?: boolean; indent?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-1.5 ${bold ? '' : 'border-b border-slate-100 last:border-0'}`}>
      <span className={`text-xs ${muted ? 'text-slate-500' : 'text-slate-600'} ${indent ? 'pl-3' : ''}`}>{label}</span>
      <span className={`text-xs font-semibold tabular-nums ${
        green ? 'text-emerald-600' : bold ? 'text-slate-800' : 'text-slate-700'
      }`}>{value}</span>
    </div>
  );
}

/* ─── Individual segment card ─── */
function SegmentCard({ segKey }: { segKey: SegmentKey }) {
  const isMtf = segKey === 'mtf';
  const [state, setState] = useState<SegmentState>(isMtf ? DEFAULT_MTF_STATE : DEFAULT_STATE);

  const update = useCallback(
    (field: keyof SegmentState, val: string | Exchange) =>
      setState((prev) => ({ ...prev, [field]: val })),
    [],
  );

  const buy  = parseFloat(state.buy)  || 0;
  const sell = parseFloat(state.sell) || 0;
  const qty  = parseInt(state.quantity, 10) || 0;
  const days = parseInt(state.holdingDays || '0', 10) || 0;

  const result: SegmentResult = runCalc(
    segKey,
    { buy, sell, quantity: qty, exchange: state.exchange },
    days,
  );
  const hasData = buy > 0 || sell > 0 || qty > 0;
  const pnlPositive = result.netPnL >= 0;

  /* Currency uses STT/CTT label differently */
  const sttLabel = isMcx(segKey)
    ? 'CTT'
    : (segKey === 'curFutures' || segKey === 'curOptions')
      ? 'STT/CTT'
      : 'STT / CTT';

  /* Quantity label changes per segment (Lots vs Qty vs Shares) */
  const qtyLabel = (() => {
    if (segKey === 'futures' || segKey === 'options' || segKey === 'comFutures' || segKey === 'comOptions') return 'Lot Size × Lots';
    if (segKey === 'curFutures' || segKey === 'curOptions') return 'Lot Size × Lots';
    return 'Quantity';
  })();

  /* Premium vs price label for options */
  const priceLabels = (() => {
    if (segKey === 'options' || segKey === 'curOptions' || segKey === 'comOptions') {
      return { buy: 'Buy Premium', sell: 'Sell Premium' };
    }
    return { buy: 'Buy Price', sell: 'Sell Price' };
  })();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-col gap-2.5 min-w-[220px]">
      {/* Header */}
      <div className="pb-2 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">{LABELS[segKey]}</h3>
      </div>

      {/* Inputs */}
      <div className="space-y-2">
        {(['buy', 'sell', 'quantity'] as const).map((field) => (
          <div key={field}>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
              {field === 'buy' ? priceLabels.buy : field === 'sell' ? priceLabels.sell : qtyLabel}
            </label>
            <input
              type="number"
              min="0"
              placeholder={field === 'quantity' ? '0' : '0.00'}
              value={state[field]}
              onChange={(e) => update(field, e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        ))}

        {/* MTF only: holding days input */}
        {isMtf && (
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
              Holding Days
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={state.holdingDays}
              onChange={(e) => update('holdingDays', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
            <p className="text-[10px] text-slate-500 mt-0.5">Interest @ 14.6% p.a. (0.04%/day) on 75% funded</p>
          </div>
        )}

        {/* Exchange toggle — skip for MCX (commodities) */}
        {!isMcx(segKey) && (
          <div className="flex gap-2 pt-1">
            {(['NSE', 'BSE'] as Exchange[]).map((ex) => (
              <label key={ex} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name={`exchange-${segKey}`}
                  value={ex}
                  checked={state.exchange === ex}
                  onChange={() => update('exchange', ex)}
                  className="accent-primary w-3.5 h-3.5"
                />
                <span className="text-xs font-medium text-slate-600">{ex}</span>
              </label>
            ))}
          </div>
        )}
        {isMcx(segKey) && (
          <div className="pt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
              MCX
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-200" />

      {/* Breakdown */}
      <div className="space-y-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Charges</p>
        <Row label="Turnover"         value={hasData ? fmt(result.turnover)         : '₹ 0.00'} />
        <Row label="Brokerage"        value={hasData ? fmt(result.brokerage)        : '₹ 0.00'} />
        <Row label={sttLabel}         value={hasData ? fmt(result.stt)              : '₹ 0.00'} />
        <Row label="Exchange Txn"     value={hasData ? fmt(result.exchangeTxnCharge): '₹ 0.00'} />
        <Row label="GST (18%)"        value={hasData ? fmt(result.gst)              : '₹ 0.00'} />
        <Row label="SEBI Charges"     value={hasData ? fmt(result.sebiCharges)      : '₹ 0.00'} />
        <Row label="Stamp Duty"       value={hasData ? fmt(result.stampDuty)        : '₹ 0.00'} />

        {/* MTF-specific: funding interest */}
        {isMtf && (
          <Row
            label={`Interest (${days}d)`}
            value={hasData ? fmt(result.interestCharges ?? 0) : '₹ 0.00'}
          />
        )}

        <div className="border-t border-slate-200 mt-1 pt-2">
          <Row label="Total Charges"  value={hasData ? fmt(result.totalCharges)     : '₹ 0.00'} bold />
        </div>

        <div className="border-t border-slate-200 mt-1 pt-2">
          <Row label="Breakeven (pts)" value={hasData ? `${result.pointsToBreakeven}` : '0'}  />
        </div>
      </div>

      {/* Net P&L — hero */}
      <div className={`rounded-xl px-4 py-3 text-center mt-1 ${
        !hasData ? 'bg-slate-50' : pnlPositive ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
      }`}>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Net P&amp;L</p>
        <p className={`text-xl font-extrabold tabular-nums ${
          !hasData ? 'text-slate-300' : pnlPositive ? 'text-emerald-600' : 'text-red-500'
        }`}>
          {hasData ? (pnlPositive ? '+' : '') + fmt(result.netPnL) : '₹ 0.00'}
        </p>
      </div>
    </div>
  );
}

/* ─── Tab bar + main ─── */
export function BrokerageCalc() {
  const [activeTab, setActiveTab] = useState<TopTab>('equities');
  const segments = TAB_SEGMENTS[activeTab];

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(TOP_TAB_LABELS) as TopTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
            }`}
          >
            {TOP_TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Segment cards — layout adapts to count */}
      <div
        className={`grid gap-4 ${
          segments.length === 1
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl'
            : segments.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl'
              : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
        }`}
      >
        {segments.map((seg) => (
          <SegmentCard key={`${activeTab}-${seg}`} segKey={seg} />
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-slate-500 text-center pt-1">
        Charges are indicative and based on Zerodha&rsquo;s published fee structure (May 2025). Actual charges may vary by
        broker, segment and SEBI rate updates.
      </p>
      <StockBrokerTable />
    </div>
  );
}
