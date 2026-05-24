import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', '..', '..', 'CalculateToday_Affiliate_Map.xlsx');

// ── Helpers ─────────────────────────────────────────────────────────────────
const HDR_BG  = '1E3A5F';
const T1_BG   = 'FFE0E0';
const T2_BG   = 'FFF9C4';
const T3_BG   = 'E3F2FD';
const YES_FG  = '1B5E20';
const NO_FG   = '9E9E9E';
const P1_BG   = 'FFCDD2';
const P2_BG   = 'FFF9C4';
const P3_BG   = 'E8F5E9';

const hdrFont  = (sz=11) => ({ name:'Arial', bold:true, color:{argb:'FF'+('FFFFFF')}, size:sz });
const bodyFont = (sz=10) => ({ name:'Arial', size:sz });
const catFont  = ()      => ({ name:'Arial', bold:true, color:{argb:'FFFFFFFF'}, size:10 });
const yesFont  = ()      => ({ name:'Arial', bold:true, color:{argb:'FF'+YES_FG}, size:10 });
const noFont   = ()      => ({ name:'Arial', color:{argb:'FF'+NO_FG}, size:10 });
const argb     = hex     => 'FF'+hex;
const fill     = hex     => ({ type:'pattern', pattern:'solid', fgColor:{argb:argb(hex)} });
const wrap     = ()      => ({ wrapText:true, vertical:'top' });
const center   = ()      => ({ horizontal:'center', vertical:'middle', wrapText:true });
const thinBorder = () => {
  const s = { style:'thin', color:{argb:'FFCCCCCC'} };
  return { top:s, left:s, bottom:s, right:s };
};

// ── Data ─────────────────────────────────────────────────────────────────────
// Category | ID | Name | Table | Cuelink | Direct | BankBazaar | PolicyBazaar | Commission | Tier | Notes
const ROWS = [
  // LOANS & EMI
  ['Loans & EMI','home-loan','Home Loan EMI','BankRateTable (home)',
   'HDFC Home Loan, SBI Home Loan rows','--','Yes — Compare All Lenders CTA','--',
   'Rs.2,000–Rs.5,000 / lead','Tier 1','BOTH: Cuelink for each bank row + BankBazaar footer CTA'],
  ['Loans & EMI','home-loan-eligibility','Home Loan Eligibility','BankRateTable (home)',
   '--','--','Yes — Only','--',
   'Rs.2,000–Rs.5,000 / lead','Tier 1','BankBazaar only — user has not picked a bank yet'],
  ['Loans & EMI','loan-prepayment','Loan Prepayment','BankRateTable (home)',
   '--','--','Yes — Balance Transfer comparison','--',
   'Rs.1,000–Rs.3,000 / lead','Tier 1','BankBazaar balance-transfer page works best'],
  ['Loans & EMI','interest-free-home-loan','Interest-Free Home Loan','BrokerPlatformTable',
   'Groww, Zerodha Coin, Angel One MF','--','--','--',
   'Rs.200–Rs.500 / account','Tier 2','SIP-focused page — Cuelink brokers only'],
  ['Loans & EMI','car-loan','Car Loan EMI','BankRateTable (car)',
   'HDFC Car Loan, SBI Car Loan rows','--','Yes — Compare All CTA','--',
   'Rs.500–Rs.2,000 / lead','Tier 1','BOTH: Cuelink rows + BankBazaar footer'],
  ['Loans & EMI','personal-loan','Personal Loan EMI','BankRateTable (personal)',
   'Bajaj Finserv row only','--','Yes — Other banks + CTA','--',
   'Rs.300–Rs.1,500 / lead','Tier 1','Split: Cuelink for Bajaj, BankBazaar for rest'],
  ['Loans & EMI','educational-loan','Education Loan EMI','BankRateTable (education)',
   '--','--','Yes — Only','--',
   'Rs.500–Rs.2,000 / lead','Tier 1','Cuelink has limited edu-loan brands; BankBazaar best'],
  ['Loans & EMI','emi-calculator','EMI Calculator','BankRateTable (home)',
   '--','--','Yes — Only','--',
   'Rs.300–Rs.2,000 / lead','Tier 1','Generic user — BankBazaar only'],
  // TAX
  ['Tax','old-vs-new-regime','Old vs New Regime','TaxFilingTable',
   'ClearTax','TaxBuddy, Quicko','--','--',
   'Rs.100–Rs.300 / ITR','Tier 1','High filing intent — use all 3 tax filers'],
  ['Tax','new-income-tax-2526','New Tax FY 2025-26','TaxFilingTable',
   'ClearTax','TaxBuddy','--','--',
   'Rs.100–Rs.300 / ITR','Tier 1','Same as regime calculator'],
  ['Tax','new-income-tax-2425','New Tax FY 2024-25','TaxFilingTable',
   'ClearTax','TaxBuddy','--','--',
   'Rs.100–Rs.300 / ITR','Tier 1','Same as regime calculator'],
  ['Tax','old-income-tax','Old Regime Tax','TaxFilingTable',
   'ClearTax','TaxBuddy','--','--',
   'Rs.100–Rs.300 / ITR','Tier 1','Same as regime calculator'],
  ['Tax','salary-calculator','Salary / Take-Home','TaxFilingTable',
   'ClearTax (salary ITR)','Fi Money, Jupiter (salary account)','--','--',
   'Rs.200–Rs.500 / account','Tier 1','Cross-sell neobank salary account opening'],
  ['Tax','hra-exemption','HRA Exemption','TaxFilingTable',
   'ClearTax','TaxBuddy','--','--',
   'Rs.100–Rs.300','Tier 1','Standard tax-filing links'],
  ['Tax','gratuity-calculator','Gratuity','TaxFilingTable',
   'Groww, ETMoney (invest gratuity)','--','--','--',
   'Rs.200–Rs.400 / account','Tier 2','User received gratuity — redirect to investment'],
  // INVESTMENT
  ['Investment','sip-calculator','SIP Calculator','BrokerPlatformTable',
   'Groww, Zerodha Coin, Angel One, Upstox','Groww Partner (backup CTA)','--','--',
   'Rs.200–Rs.700 / account','Tier 2','Most important investment page — use BOTH'],
  ['Investment','goal-sip','Goal SIP','BrokerPlatformTable',
   'Groww, Zerodha','Groww Partner','--','--',
   'Rs.200–Rs.700','Tier 2','High intent — user has a specific goal'],
  ['Investment','step-up-sip','Step-Up SIP','BrokerPlatformTable',
   'Groww, Zerodha, Kuvera','--','--','--',
   'Rs.200–Rs.700','Tier 2','Standard broker links'],
  ['Investment','lumpsum-calculator','Lumpsum Investment','BrokerPlatformTable',
   'Groww, Angel One','Angel One Partner','--','--',
   'Rs.200–Rs.700','Tier 2','Lumpsum = demat/stock intent'],
  ['Investment','compounding-calculator','Compounding','BrokerPlatformTable',
   'Groww (MF side)','--','Yes — FD comparison (savings side)','--',
   'Rs.100–Rs.500','Tier 2','Dual table opportunity: MF + FD'],
  ['Investment','cagr-calculator','CAGR','BrokerPlatformTable',
   'Zerodha, Angel One, Upstox','Zerodha Refer','--','--',
   'Rs.300–Rs.700','Tier 2','CAGR user = stock analysis — demat intent'],
  ['Investment','swp-calculator','SWP','BrokerPlatformTable',
   'ETMoney, Groww','--','--','--',
   'Rs.200–Rs.500','Tier 2','Retiree / senior user — ETMoney resonates'],
  ['Investment','inflation-calculator','Inflation','BrokerPlatformTable',
   'Groww Gold, SGB platform','--','--','--',
   'Rs.200–Rs.500','Tier 2','Inflation hedge = gold ETF / SGB intent'],
  ['Investment','brokerage-calculator','Brokerage','StockBrokerTable',
   'Zerodha, Upstox, Angel One','Zerodha Refer, Upstox Refer','--','--',
   'Rs.300–Rs.700 / demat','Tier 2','Stock trader — direct demat links'],
  ['Investment','simple-interest','Simple Interest','FdRateTable',
   '--','--','Yes — FD comparison','--',
   'Rs.100–Rs.300','Tier 3','FD/savings intent — BankBazaar only'],
  // RETIREMENT
  ['Retirement','ppf-calculator','PPF','PensionProviderTable (ppf)',
   'SBI PPF, HDFC PPF','--','Yes — PPF comparison','--',
   'Rs.100–Rs.300 / account','Tier 2','BOTH — Cuelink bank rows + BankBazaar CTA'],
  ['Retirement','nsc-calculator','NSC','PensionProviderTable (nsc)',
   '--','--','Yes — Only','--',
   'Rs.100–Rs.200','Tier 3','India Post = no direct affiliate; use BankBazaar'],
  ['Retirement','nps-calculator','NPS','PensionProviderTable (nps)',
   'Groww NPS, ETMoney NPS','ETMoney NPS Direct','--','--',
   'Rs.300–Rs.600 / account','Tier 2','NPS account opening via Groww/ETMoney'],
  ['Retirement','epf-calculator','EPF','PensionProviderTable (epf)',
   '--','--','--','Yes — Term insurance cross-sell',
   'Rs.300–Rs.1,000 / policy','Tier 2','EPF = salaried user — cross-sell term life insurance'],
  ['Retirement','fd-calculator','FD','FdRateTable',
   '--','--','Yes — FD comparison (all 8 banks)','--',
   'Rs.100–Rs.500','Tier 2','BankBazaar FD comparison page'],
  ['Retirement','rd-calculator','RD','FdRateTable (rd)',
   '--','--','Yes — RD comparison','--',
   'Rs.100–Rs.300','Tier 2','Same as FD'],
  ['Retirement','retirement-fire','Retirement FIRE','PensionProviderTable (retirement)',
   'Groww, Zerodha, ETMoney, Kuvera','--','--','--',
   'Rs.300–Rs.700 / account','Tier 2','High-intent FIRE user — Cuelink only'],
  // BUSINESS
  ['Business','gst-calculator','GST','GstSoftwareTable',
   'ClearTax GST','Zoho Books, Tally Prime','--','--',
   'Rs.300–Rs.2,000 / subscription','Tier 2','Cuelink for ClearTax; direct for Zoho/Tally'],
  ['Business','ppc-calculator','PPC / Google Ads','BusinessToolTable (ads)',
   '--','Semrush (up to $200/sale), Ahrefs','--','--',
   'Up to $200 / sale (USD)','Tier 2','Semrush is the star — digital marketer audience'],
  ['Business','break-even','Break-Even','BusinessToolTable (accounting)',
   '--','Zoho Books, QuickBooks India','--','--',
   'Rs.500–Rs.2,000 / subscription','Tier 3','Accounting software focus'],
  ['Business','profit-margin','Profit Margin','BusinessToolTable (accounting)',
   '--','Zoho Books, Vyapar','--','--',
   'Rs.500–Rs.2,000 / subscription','Tier 3','Same as break-even'],
  ['Business','working-capital','Working Capital','BusinessToolTable (loans)',
   'Lendingkart, HDFC Business Loan','Lendingkart Direct','--','--',
   'Rs.1,000–Rs.5,000 / B2B lead','Tier 1','High-ticket B2B loan — both Cuelink + direct'],
  ['Business','dscr-calculator','DSCR','BusinessToolTable (loans)',
   'Lendingkart, HDFC Business Loan','Lendingkart Direct','--','--',
   'Rs.1,000–Rs.5,000 / B2B lead','Tier 1','Same as working-capital'],
  // HEALTH
  ['Health','bmi-calculator','BMI & Calorie','HealthAppTable',
   '--','Amazon Associates, HealthKart, HealthifyMe','--','--',
   'Rs.100–Rs.500 + 3–8% on supplements','Tier 3','All 3 direct programs — BMI result drives recommendation'],
];

const PROGRAMS = [
  ['P1','Cuelink','Network Aggregator',
   'Groww, Zerodha, ClearTax, Bajaj, HDFC, SBI + 200 brands',
   'app.cuelink.in','Rs.200–Rs.5,000 / conversion',
   'Tax, Loans, Investment, Retirement, Business',
   'Most important — join first. Covers 80% of all calculators in one dashboard.'],
  ['P1','BankBazaar Affiliate','Loan/FD Aggregator',
   'All loan types, FD, PPF, NSC comparison',
   'bankbazaar.com/affiliate.html','Rs.300–Rs.5,000 / lead',
   'Loans, Retirement, Investment',
   'Best for calculators where user is still comparing lenders.'],
  ['P1','Amazon Associates','Marketplace',
   'Health supplements, fitness gear',
   'affiliate-program.amazon.in','3–8% on product sales',
   'Health (bmi-calculator)',
   'For BMI calculator supplement recommendations.'],
  ['P2','Semrush Affiliate','Direct SaaS',
   'SEO and PPC tools',
   'semrush.com/affiliate','Up to $200 / sale (USD)',
   'Business (ppc-calculator)',
   'Highest per-sale commission. Pays in USD via Impact network.'],
  ['P2','Zoho Affiliate','Direct SaaS',
   'Zoho Books, Zoho GST',
   'zoho.com/affiliate','15% recurring commission',
   'Business (gst, break-even, profit-margin)',
   'Recurring revenue — great for long-term income.'],
  ['P2','PolicyBazaar Affiliate','Insurance Aggregator',
   'Term insurance, health insurance',
   'policybazaar.com/affiliate','Rs.300–Rs.2,000 / policy',
   'Retirement (epf-calculator cross-sell)',
   'Cross-sell term life to EPF/salaried users.'],
  ['P2','ETMoney Partner','Direct Investment App',
   'SIP, NPS, retirement planning',
   'etmoney.com/partner','Rs.200–Rs.600 / account',
   'Investment, Retirement',
   'Good for SWP, NPS, and Retirement FIRE calculators.'],
  ['P2','HealthKart Affiliate','Health Marketplace',
   'Protein supplements, vitamins',
   'healthkart.com/affiliate','5–10% on sales',
   'Health (bmi-calculator)',
   'Indian supplement brand — high conversion for fitness users.'],
  ['P2','Lendingkart Partner','Direct NBFC',
   'Business loans, working capital',
   'lendingkart.com/partner','Rs.1,000–Rs.5,000 / lead',
   'Business (working-capital, dscr)',
   'High-ticket B2B leads from business calculator users.'],
  ['P3','Groww Partner','Direct Broker',
   'Mutual funds, stocks, gold',
   'groww.in/partner','Rs.100–Rs.500 / account',
   'Investment, Retirement',
   'Backup to Cuelink; sometimes higher payout for MF.'],
  ['P3','Zerodha Refer','Direct Broker',
   'Stock trading, Coin MF',
   'zerodha.com/refer','Rs.300 / funded account',
   'Investment (brokerage, cagr, sip)',
   'High-trust brand; funded account = verified conversion.'],
  ['P3','Upstox Partner','Direct Broker',
   'Stock trading, demat',
   'upstox.com/partner','Rs.300–Rs.700 / demat',
   'Investment (brokerage, cagr)',
   'Good alternative to Zerodha.'],
  ['P3','Angel One Partner','Direct Broker',
   'Stock trading, mutual funds',
   'angelone.in/refer-and-earn','Rs.300–Rs.600 / account',
   'Investment (lumpsum, brokerage)',
   'Strong brand in Tier-2/3 cities.'],
  ['P3','TaxBuddy Direct','Direct SaaS',
   'ITR filing, tax advisory',
   'taxbuddy.com (contact for affiliate)','Rs.100–Rs.300 / ITR',
   'Tax','Good supplement to ClearTax on tax pages.'],
  ['P3','Quicko Direct','Direct SaaS',
   'ITR filing',
   'quicko.com (contact for affiliate)','Rs.100–Rs.300 / ITR',
   'Tax','Niche but growing — tech-savvy filer audience.'],
  ['P3','HealthifyMe Affiliate','Direct Health App',
   "India's #1 diet & calorie tracker",
   'healthifyme.com/affiliate','Rs.100–Rs.500 / premium subscription',
   'Health (bmi-calculator)',
   'High relevance for BMI users.'],
  ['P3','Fi Money / Jupiter','Neobank',
   'Salary account opening',
   'fi.money/refer  |  jupiter.money/refer','Rs.200–Rs.500 / account',
   'Tax (salary-calculator)',
   'Cross-sell salary account to take-home salary users.'],
];

const ACTION_STEPS = [
  { section: 'Step 1 — Join Platforms (priority order)', item:'', action:'', detail:'' },
  { section:'', item:'1', action:'Join Cuelink  ›  app.cuelink.in', detail:'Covers 80% of all calculators in one dashboard' },
  { section:'', item:'2', action:'Join BankBazaar  ›  bankbazaar.com/affiliate.html', detail:'All loan + FD comparison pages' },
  { section:'', item:'3', action:'Join Amazon Associates  ›  affiliate-program.amazon.in', detail:'BMI calculator supplement links' },
  { section:'', item:'4', action:'Join Semrush  ›  semrush.com/affiliate', detail:'ppc-calculator — up to $200/sale in USD' },
  { section:'', item:'5', action:'Join Zoho  ›  zoho.com/affiliate', detail:'GST + business calculators, 15% recurring' },
  { section:'', item:'6', action:'Join PolicyBazaar  ›  policybazaar.com/affiliate', detail:'EPF calculator insurance cross-sell' },
  { section:'', item:'7', action:'Join ETMoney  ›  etmoney.com/partner', detail:'SWP, NPS, Retirement FIRE calculators' },
  { section:'', item:'8', action:'Join HealthKart  ›  healthkart.com/affiliate', detail:'BMI supplement sales' },
  { section: 'Step 2 — Update lib/affiliate-links.ts', item:'', action:'', detail:'' },
  { section:'', item:'home-loan', action:'Cuelink: HDFC Home Loan deep link  |  BankBazaar: /home-loan.html?ref=YOURID', detail:'Replace placeholder URLs with personal tracking links' },
  { section:'', item:'sip-calculator', action:'Cuelink: Groww MF deep link  |  Zerodha Coin deep link', detail:'From each program dashboard' },
  { section:'', item:'ppc-calculator', action:'Semrush Impact affiliate link', detail:'From Semrush affiliate dashboard' },
  { section:'', item:'gst-calculator', action:'Cuelink: ClearTax GST deep link  |  Zoho Books affiliate link', detail:'' },
  { section: 'Step 3 — Add Dual Tables (2 tables per page = extra revenue)', item:'', action:'', detail:'' },
  { section:'', item:'compounding-calculator', action:'Add FdRateTable (conservative) + BrokerPlatformTable (growth)', detail:'Rs.100–Rs.500 extra per visit' },
  { section:'', item:'interest-free-home-loan', action:'Add BankRateTable (loan rates) alongside BrokerPlatformTable (SIP)', detail:'Dual monetisation' },
  { section:'', item:'swp-calculator', action:'Add PensionProviderTable alongside BrokerPlatformTable', detail:'Rs.200–Rs.700 extra' },
  { section: 'Step 4 — Focus on Highest Earning Pages First', item:'', action:'', detail:'' },
  { section:'', item:'#1', action:'home-loan + home-loan-eligibility', detail:'Rs.2,000–Rs.5,000 per lead — highest ticket' },
  { section:'', item:'#2', action:'working-capital + dscr-calculator', detail:'Rs.1,000–Rs.5,000 B2B loan leads' },
  { section:'', item:'#3', action:'ppc-calculator', detail:'Up to $200 per Semrush signup' },
  { section:'', item:'#4', action:'brokerage-calculator + sip-calculator', detail:'Rs.300–Rs.700 per demat account' },
  { section:'', item:'#5', action:'gst-calculator + break-even', detail:'Rs.500–Rs.2,000 per software subscription' },
];

// ── Category colours ─────────────────────────────────────────────────────────
const CAT_COLORS = {
  'Loans & EMI': '1B4F72',
  'Tax':         '1E8449',
  'Investment':  '6C3483',
  'Retirement':  '922B21',
  'Business':    'B7770D',
  'Health':      '117A65',
};
const TIER_BG = { 'Tier 1': T1_BG, 'Tier 2': T2_BG, 'Tier 3': T3_BG };
const TIER_FC = { 'Tier 1': 'C0392B', 'Tier 2': 'D35400', 'Tier 3': '1A5276' };
const PRI_BG  = { P1: P1_BG, P2: P2_BG, P3: P3_BG };
const PRI_SEP = {
  P1: ['37474F', 'Priority 1 — Join First  (covers 80% of all calculators)'],
  P2: ['546E7A', 'Priority 2 — High Value Niche Programs'],
  P3: ['78909C', 'Priority 3 — Direct Broker / Niche / Backup'],
};

// ── Build workbook ───────────────────────────────────────────────────────────
const wb = new ExcelJS.Workbook();
wb.creator = 'CalculateToday';
wb.created = new Date();

// ══════════════ SHEET 1: MASTER ══════════════════════════════════════════════
const ws1 = wb.addWorksheet('All 41 Calculators', { views:[{ state:'frozen', ySplit:2 }] });

ws1.getRow(1).height = 30;
ws1.mergeCells('A1:K1');
const t1 = ws1.getCell('A1');
t1.value = 'CalculateToday — Affiliate Monetization Map  |  All 41 Calculators';
t1.font  = { name:'Arial', bold:true, size:14, color:{argb:'FFFFFFFF'} };
t1.fill  = fill(HDR_BG);
t1.alignment = center();

const HEADERS1 = ['Category','Calculator ID','Calculator Name','Current Table',
  'Cuelink — Which Links','Direct Program','BankBazaar','PolicyBazaar',
  'Est. Commission','Tier','Action Notes'];
ws1.getRow(2).height = 34;
HEADERS1.forEach((h, i) => {
  const c = ws1.getCell(2, i+1);
  c.value = h; c.font = hdrFont(); c.fill = fill(HDR_BG);
  c.alignment = center(); c.border = thinBorder();
});

const COL_W1 = [14,23,22,22,34,30,26,20,24,8,44];
COL_W1.forEach((w, i) => { ws1.getColumn(i+1).width = w; });

let rn = 3;
let currentCat = null;
for (const row of ROWS) {
  const [cat] = row;
  if (cat !== currentCat) {
    currentCat = cat;
    ws1.mergeCells(`A${rn}:K${rn}`);
    const cc = ws1.getCell(`A${rn}`);
    cc.value = `  ${cat.toUpperCase()}`;
    cc.font  = catFont();
    cc.fill  = fill(CAT_COLORS[cat] || '2E86AB');
    cc.alignment = { horizontal:'left', vertical:'middle' };
    ws1.getRow(rn).height = 20;
    rn++;
  }
  const tier = row[9];
  const bg   = TIER_BG[tier] || 'FFFFFF';
  ws1.getRow(rn).height = 38;
  row.forEach((val, i) => {
    const c = ws1.getCell(rn, i+1);
    c.value = val; c.fill = fill(bg); c.border = thinBorder(); c.alignment = wrap();
    if (i === 9) {
      c.font = { name:'Arial', bold:true, size:10, color:{argb:'FF'+(TIER_FC[tier]||'000000')} };
    } else if ([4,5,6,7].includes(i) && val !== '--') {
      c.font = yesFont();
    } else if (val === '--') {
      c.font = noFont();
    } else {
      c.font = bodyFont();
    }
  });
  rn++;
}

// ══════════════ SHEET 2: SIGN-UP CHECKLIST ════════════════════════════════════
const ws2 = wb.addWorksheet('Sign-Up Checklist', { views:[{ state:'frozen', ySplit:2 }] });

ws2.getRow(1).height = 30;
ws2.mergeCells('A1:H1');
const t2 = ws2.getCell('A1');
t2.value = 'CalculateToday — Affiliate Programs Sign-Up Checklist';
t2.font  = { name:'Arial', bold:true, size:14, color:{argb:'FFFFFFFF'} };
t2.fill  = fill(HDR_BG);
t2.alignment = center();

const HEADERS2 = ['Priority','Platform','Type','What It Covers',
  'Sign-Up URL','Est. Payout','Best For Calculators','Notes'];
ws2.getRow(2).height = 34;
HEADERS2.forEach((h, i) => {
  const c = ws2.getCell(2, i+1);
  c.value = h; c.font = hdrFont(); c.fill = fill(HDR_BG);
  c.alignment = center(); c.border = thinBorder();
});
[8,22,18,38,34,24,34,46].forEach((w, i) => { ws2.getColumn(i+1).width = w; });

rn = 3;
let currentP = null;
for (const prog of PROGRAMS) {
  const [p] = prog;
  if (p !== currentP) {
    currentP = p;
    const [sepCol, sepLabel] = PRI_SEP[p];
    ws2.mergeCells(`A${rn}:H${rn}`);
    const sc = ws2.getCell(`A${rn}`);
    sc.value = `  ${sepLabel}`;
    sc.font  = { name:'Arial', bold:true, size:10, color:{argb:'FFFFFFFF'} };
    sc.fill  = fill(sepCol);
    sc.alignment = { horizontal:'left', vertical:'middle' };
    ws2.getRow(rn).height = 18;
    rn++;
  }
  const bg = PRI_BG[p] || 'FFFFFF';
  ws2.getRow(rn).height = 42;
  prog.forEach((val, i) => {
    const c = ws2.getCell(rn, i+1);
    c.value = val; c.fill = fill(bg); c.border = thinBorder(); c.alignment = wrap();
    c.font = { name:'Arial', bold:(i===1), size:10 };
  });
  rn++;
}

// ══════════════ SHEET 3: ACTION PLAN ══════════════════════════════════════════
const ws3 = wb.addWorksheet('Priority Action Plan');

ws3.getRow(1).height = 30;
ws3.mergeCells('A1:D1');
const t3 = ws3.getCell('A1');
t3.value = 'CalculateToday — Priority Action Plan';
t3.font  = { name:'Arial', bold:true, size:14, color:{argb:'FFFFFFFF'} };
t3.fill  = fill(HDR_BG);
t3.alignment = center();

const HEADERS3 = ['Step / Section','Item','Action','Detail / Expected Earnings'];
ws3.getRow(2).height = 30;
HEADERS3.forEach((h, i) => {
  const c = ws3.getCell(2, i+1);
  c.value = h; c.font = hdrFont(); c.fill = fill(HDR_BG);
  c.alignment = center(); c.border = thinBorder();
});
[32,22,58,36].forEach((w, i) => { ws3.getColumn(i+1).width = w; });

rn = 3;
for (const s of ACTION_STEPS) {
  const isSection = s.section.startsWith('Step');
  const bg = isSection ? 'EDE7F6' : 'FFFFFF';
  ws3.getRow(rn).height = 32;
  [s.section, s.item, s.action, s.detail].forEach((val, i) => {
    const c = ws3.getCell(rn, i+1);
    c.value = val; c.fill = fill(bg); c.border = thinBorder(); c.alignment = wrap();
    if (isSection && i === 0) {
      c.font = { name:'Arial', bold:true, size:11, color:{argb:'FF4A148C'} };
    } else if (i === 2) {
      c.font = { name:'Arial', bold:true, size:10 };
    } else {
      c.font = bodyFont();
    }
  });
  rn++;
}

// ══════════════ SHEET 4: QUICK REF ═══════════════════════════════════════════
const ws4 = wb.addWorksheet('Quick Ref by Category');

ws4.getRow(1).height = 30;
ws4.mergeCells('A1:E1');
const t4 = ws4.getCell('A1');
t4.value = 'Quick Reference — Which Platform per Calculator (all categories)';
t4.font  = { name:'Arial', bold:true, size:14, color:{argb:'FFFFFFFF'} };
t4.fill  = fill(HDR_BG);
t4.alignment = center();

[26,32,28,32,22].forEach((w, i) => { ws4.getColumn(i+1).width = w; });

const QR_HEADERS = ['Calculator','Cuelink','BankBazaar','Direct Program','Rule'];

const QR_SECTIONS = [
  { title:'LOANS & EMI', rows:[
    ['home-loan','YES — HDFC, SBI bank rows','YES — compare CTA footer','--','BOTH'],
    ['home-loan-eligibility','NO','YES — only','--','BankBazaar only'],
    ['loan-prepayment','NO','YES — balance transfer','--','BankBazaar only'],
    ['interest-free-home-loan','YES — Groww, Zerodha','NO','--','Cuelink only (SIP)'],
    ['car-loan','YES — HDFC, SBI bank rows','YES — compare CTA footer','--','BOTH'],
    ['personal-loan','YES — Bajaj row only','YES — other banks + CTA','--','Split'],
    ['educational-loan','NO','YES — only','--','BankBazaar only'],
    ['emi-calculator','NO','YES — only','--','BankBazaar only'],
  ]},
  { title:'TAX', rows:[
    ['old-vs-new-regime','YES — ClearTax','NO','YES — TaxBuddy, Quicko','Cuelink + Direct'],
    ['new-income-tax-2526','YES — ClearTax','NO','YES — TaxBuddy','Cuelink + Direct'],
    ['new-income-tax-2425','YES — ClearTax','NO','YES — TaxBuddy','Cuelink + Direct'],
    ['old-income-tax','YES — ClearTax','NO','YES — TaxBuddy','Cuelink + Direct'],
    ['salary-calculator','YES — ClearTax','NO','YES — Fi Money / Jupiter','Cuelink + Direct'],
    ['hra-exemption','YES — ClearTax','NO','YES — TaxBuddy','Cuelink + Direct'],
    ['gratuity-calculator','YES — Groww, ETMoney','NO','--','Cuelink only'],
  ]},
  { title:'INVESTMENT', rows:[
    ['sip-calculator','YES — Groww, Zerodha, Angel One','NO','YES — Groww Partner','BOTH'],
    ['goal-sip','YES — Groww, Zerodha','NO','YES — Groww Partner','BOTH'],
    ['step-up-sip','YES — Groww, Zerodha, Kuvera','NO','--','Cuelink only'],
    ['lumpsum-calculator','YES — Groww, Angel One','NO','YES — Angel One Partner','BOTH'],
    ['compounding-calculator','YES — Groww','YES — FD comparison','--','BOTH (dual table)'],
    ['cagr-calculator','YES — Zerodha, Upstox','NO','YES — Zerodha Refer','BOTH'],
    ['swp-calculator','YES — ETMoney, Groww','NO','--','Cuelink only'],
    ['inflation-calculator','YES — Groww Gold','NO','--','Cuelink only'],
    ['brokerage-calculator','YES — Zerodha, Upstox, Angel One','NO','YES — Zerodha/Upstox Refer','BOTH'],
    ['simple-interest','NO','YES — FD comparison','--','BankBazaar only'],
  ]},
  { title:'RETIREMENT', rows:[
    ['ppf-calculator','YES — SBI PPF, HDFC','YES — PPF comparison','--','BOTH'],
    ['nsc-calculator','NO','YES — only','--','BankBazaar only'],
    ['nps-calculator','YES — Groww NPS, ETMoney','NO','YES — ETMoney Direct','BOTH'],
    ['epf-calculator','NO','NO','YES — PolicyBazaar (term insurance)','PolicyBazaar only'],
    ['fd-calculator','NO','YES — FD comparison','--','BankBazaar only'],
    ['rd-calculator','NO','YES — RD comparison','--','BankBazaar only'],
    ['retirement-fire','YES — Groww, Zerodha, ETMoney','NO','--','Cuelink only'],
  ]},
  { title:'BUSINESS', rows:[
    ['gst-calculator','YES — ClearTax GST','NO','YES — Zoho, Tally','Cuelink + Direct'],
    ['ppc-calculator','NO','NO','YES — Semrush (up to $200/sale)','Direct only'],
    ['break-even','NO','NO','YES — Zoho, QuickBooks','Direct only'],
    ['profit-margin','NO','NO','YES — Zoho, Vyapar','Direct only'],
    ['working-capital','YES — Lendingkart, HDFC','NO','YES — Lendingkart Direct','BOTH'],
    ['dscr-calculator','YES — Lendingkart, HDFC','NO','YES — Lendingkart Direct','BOTH'],
  ]},
  { title:'HEALTH', rows:[
    ['bmi-calculator','NO','NO','YES — Amazon, HealthKart, HealthifyMe','Direct only'],
  ]},
];

rn = 2;
for (const sec of QR_SECTIONS) {
  // category header
  ws4.mergeCells(`A${rn}:E${rn}`);
  const ch = ws4.getCell(`A${rn}`);
  ch.value = `  ${sec.title}`;
  ch.font  = { name:'Arial', bold:true, size:10, color:{argb:'FFFFFFFF'} };
  ch.fill  = fill(CAT_COLORS[sec.title.split(' ')[0]] || HDR_BG);
  ch.alignment = { horizontal:'left', vertical:'middle' };
  ws4.getRow(rn).height = 22;
  rn++;

  // sub-header
  ws4.getRow(rn).height = 28;
  QR_HEADERS.forEach((h, i) => {
    const c = ws4.getCell(rn, i+1);
    c.value = h; c.font = hdrFont(10); c.fill = fill('2C3E50');
    c.alignment = center(); c.border = thinBorder();
  });
  rn++;

  // data rows
  for (const row of sec.rows) {
    ws4.getRow(rn).height = 28;
    row.forEach((val, i) => {
      const c = ws4.getCell(rn, i+1);
      c.value = val; c.fill = fill('FFFFFF'); c.border = thinBorder(); c.alignment = wrap();
      if (i === 0) {
        c.font = { name:'Arial', bold:true, size:10 };
      } else if (val.startsWith('YES')) {
        c.font = yesFont();
      } else if (val === 'NO' || val === '--') {
        c.font = noFont();
      } else {
        c.font = { name:'Arial', bold:true, size:10, color:{argb:'FF1A5276'} };
      }
    });
    rn++;
  }
  rn++; // spacer
}

// ── Save ──────────────────────────────────────────────────────────────────────
await wb.xlsx.writeFile(OUT);
console.log('✅  Saved:', OUT);
