/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║           AFFILIATE LINKS — SINGLE SOURCE OF TRUTH                      ║
 * ║  Edit ONE key here → every page that shows that brand updates instantly  ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ── AFFILIATE PROGRAM STATUS ────────────────────────────────────────────────
 *  ✅ CUELINK APPROVED    →  app.cuelink.in        (covers most investment links)
 *  ⏳ BANKBAZAAR PENDING  →  bankbazaar.com/affiliate.html  (covers all loan/FD links)
 *  ⏳ SEMRUSH / IMPACT    →  semrush.com/affiliate          ($200/sale commission)
 *  ⏳ ZOHO AFFILIATE      →  zoho.com/affiliate             (15% recurring)
 *  ⏳ HEALTHKART          →  healthkart.com/affiliate
 *  ⏳ AMAZON ASSOCIATES   →  affiliate-program.amazon.in
 *
 * ── HOW TO REPLACE A LINK ───────────────────────────────────────────────────
 *  CUELINK (for investment / broker links):
 *    1. Log in → app.cuelink.in
 *    2. Brands → search brand name → Generate Link → Copy URL
 *    3. Paste into the matching key(s) listed in each section below
 *
 *  BANKBAZAAR (for loan / FD / RD links — once approved):
 *    1. Log in → bankbazaar.com/publisher
 *    2. Get your publisher tracking URL format:
 *       https://track.bankbazaar.com/[path]?src=YOUR_PUBLISHER_ID
 *    3. Replace each URL that says "REPLACE → BankBazaar affiliate"
 *
 * ── WHAT NEEDS REPLACING (priority order) ──────────────────────────────────
 *  🔴 HIGH  — Cuelink already approved, do these NOW:
 *     • sip.primary, sip.brokers.groww, sip.brokers.zerodhaCoin
 *     • sip.brokers.angelOneMf, sip.brokers.paytmMoney, sip.brokers.etMoney
 *     • sip.funds.* (all 10 fund deep links via Groww)
 *     • trading.primary, trading.brokers.zerodha, trading.brokers.groww
 *     • trading.brokers.upstox, trading.brokers.angelOne
 *     • pension.nps.groww, pension.nps.etMoney
 *     • pension.retirement.groww, pension.retirement.zerodha, pension.retirement.etMoney
 *     • tax.primary, tax.services.cleartax, gst.primary, gst.software.cleartax
 *     • business.accounting.vyapar, business.accounting.khatabook
 *     • business.loans.bajaj, business.loans.lendingkart
 *     • health.primary, health.apps.healthifyMe, health.apps.cultFit
 *
 *  🟡 MEDIUM — Once BankBazaar approved:
 *     • ALL emi.banks.home.*, emi.banks.car.*, emi.banks.personal.*
 *     • educationLoan.banks.bob, .sbi, .pnb, .credila
 *     • homeLoan.primary, carLoan.primary, personalLoan.primary, educationLoan.primary
 *     • fdRd.primary, fdRd.banks.*, fdRd.rdBanks.*
 *
 *  🟢 LOW — Specialist programs:
 *     • business.adTools.semrush → Impact.com
 *     • gst.software.zohoBooks, business.accounting.zohoBooks → Zoho Affiliate
 *     • health.massGainers.*, health.weightLoss.healthKartSlim → HealthKart / Amazon
 */

export const AFFILIATE = {

  /* ══════════════════════════════════════════════════════════════════════════
     LOANS — BankRateTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES:
       • /calculators/home-loan/               (tab: home)
       • /calculators/car-loan/                (tab: car)
       • /calculators/personal-loan/           (tab: personal)
       • /calculators/educational-loan/        (tab: education)
       • /calculators/emi-calculator/          (all 4 tabs)
       • /calculators/home-loan-eligibility/   (tab: home)
       • /calculators/loan-prepayment/         (tab: home)
       • /calculators/interest-free-home-loan/ (tab: home)
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE: Log in to bankbazaar.com/publisher
       Get your tracking URL → replace each placeholder below
     ══════════════════════════════════════════════════════════════════════════ */
  emi: {
    banks: {

      /* ── Home Loan tab ── shown on: home-loan, emi-calculator, home-loan-eligibility, loan-prepayment, interest-free-home-loan */
      home: {
        sbi:   'https://ajiio.in/tZtHWkw',                                              // ⏳ REPLACE → BankBazaar affiliate (SBI Home Loan)
        hdfc:  'https://www.bankbazaar.com/home-loan/hdfc-home-loan.html',              // ⏳ REPLACE → BankBazaar affiliate (HDFC Home Loan)
        icici: 'https://www.bankbazaar.com/home-loan/icici-home-loan.html',             // ⏳ REPLACE → BankBazaar affiliate (ICICI Home Loan)
        kotak: 'https://www.bankbazaar.com/home-loan/kotak-mahindra-home-loan.html',    // ⏳ REPLACE → BankBazaar affiliate (Kotak Home Loan)
        axis:  'https://www.bankbazaar.com/home-loan/axis-bank-home-loan.html',         // ⏳ REPLACE → BankBazaar affiliate (Axis Home Loan)
        bob:   'https://www.bankbazaar.com/home-loan/bank-of-baroda-home-loan.html',    // ⏳ REPLACE → BankBazaar affiliate (BoB Home Loan)
        pnb:   'https://www.bankbazaar.com/home-loan/pnb-home-loan.html',               // ⏳ REPLACE → BankBazaar affiliate (PNB Home Loan)
        lic:   'https://www.bankbazaar.com/home-loan/lic-hfl-home-loan.html',           // ⏳ REPLACE → BankBazaar affiliate (LIC Housing Finance)
        bajaj: 'https://www.bankbazaar.com/home-loan/bajaj-finserv-home-loan.html',     // ⏳ REPLACE → BankBazaar OR Cuelink (Bajaj Finserv)
        tata:  'https://www.bankbazaar.com/home-loan/tata-capital-home-loan.html',      // ⏳ REPLACE → BankBazaar affiliate (Tata Capital)
      },

      /* ── Car Loan tab ── shown on: car-loan, emi-calculator */
      car: {
        sbi:   'https://www.bankbazaar.com/car-loan/sbi-car-loan.html',                 // ⏳ REPLACE → BankBazaar affiliate (SBI Car Loan)
        hdfc:  'https://www.bankbazaar.com/car-loan/hdfc-bank-car-loan.html',           // ⏳ REPLACE → BankBazaar affiliate (HDFC Car Loan)
        icici: 'https://www.bankbazaar.com/car-loan/icici-bank-car-loan.html',          // ⏳ REPLACE → BankBazaar affiliate (ICICI Car Loan)
        kotak: 'https://www.bankbazaar.com/car-loan/kotak-mahindra-car-loan.html',      // ⏳ REPLACE → BankBazaar affiliate (Kotak Car Loan)
        axis:  'https://www.bankbazaar.com/car-loan/axis-bank-car-loan.html',           // ⏳ REPLACE → BankBazaar affiliate (Axis Car Loan)
        bob:   'https://www.bankbazaar.com/car-loan/bank-of-baroda-car-loan.html',      // ⏳ REPLACE → BankBazaar affiliate (BoB Car Loan)
        pnb:   'https://www.bankbazaar.com/car-loan/pnb-car-loan.html',                 // ⏳ REPLACE → BankBazaar affiliate (PNB Car Loan)
        tata:  'https://www.bankbazaar.com/car-loan/tata-capital-car-loan.html',        // ⏳ REPLACE → BankBazaar affiliate (Tata Car Loan)
      },

      /* ── Personal Loan tab ── shown on: personal-loan, emi-calculator */
      personal: {
        sbi:      'https://www.bankbazaar.com/personal-loan/sbi-personal-loan.html',            // ⏳ REPLACE → BankBazaar affiliate
        hdfc:     'https://www.bankbazaar.com/personal-loan/hdfc-personal-loan.html',           // ⏳ REPLACE → BankBazaar affiliate
        icici:    'https://www.bankbazaar.com/personal-loan/icici-bank-personal-loan.html',     // ⏳ REPLACE → BankBazaar affiliate
        kotak:    'https://www.bankbazaar.com/personal-loan/kotak-mahindra-personal-loan.html', // ⏳ REPLACE → BankBazaar affiliate
        axis:     'https://www.bankbazaar.com/personal-loan/axis-bank-personal-loan.html',      // ⏳ REPLACE → BankBazaar affiliate
        bajaj:    'https://www.bankbazaar.com/personal-loan/bajaj-finserv-personal-loan.html',  // ⏳ REPLACE → BankBazaar OR Cuelink (Bajaj Finserv)
        tata:     'https://www.bankbazaar.com/personal-loan/tata-capital-personal-loan.html',   // ⏳ REPLACE → BankBazaar affiliate
        indusind: 'https://www.bankbazaar.com/personal-loan/indusind-bank-personal-loan.html',  // ⏳ REPLACE → BankBazaar affiliate
      },
    },
  },

  /* "Browse All Loans" CTA button at the bottom of BankRateTable per tab
     Each .primary is the "See All [Loan Type] Offers" link                    */
  homeLoan: {
    primary: 'https://www.bankbazaar.com/home-loan.html',     // ⏳ REPLACE → BankBazaar affiliate  | shown on: home-loan, emi-calculator, home-loan-eligibility, loan-prepayment, interest-free-home-loan
  },
  carLoan: {
    primary: 'https://www.bankbazaar.com/car-loan.html',      // ⏳ REPLACE → BankBazaar affiliate  | shown on: car-loan, emi-calculator
  },
  personalLoan: {
    primary: 'https://www.bankbazaar.com/personal-loan.html', // ⏳ REPLACE → BankBazaar affiliate  | shown on: personal-loan, emi-calculator
  },

  /* ── Education Loan tab ── shown on: educational-loan, emi-calculator */
  educationLoan: {
    primary: 'https://www.bankbazaar.com/education-loan.html',                               // ⏳ REPLACE → BankBazaar affiliate  | "Browse All Education Loans" CTA
    banks: {
      bob:     'https://www.bankbazaar.com/education-loan/bank-of-baroda-education-loan.html', // ⏳ REPLACE → BankBazaar affiliate (Bank of Baroda)
      sbi:     'https://www.bankbazaar.com/education-loan/sbi-education-loan.html',            // ⏳ REPLACE → BankBazaar affiliate (SBI)
      pnb:     'https://www.bankbazaar.com/education-loan/pnb-saraswati-education-loan.html',  // ⏳ REPLACE → BankBazaar affiliate (PNB Saraswati)
      credila: 'https://www.bankbazaar.com/education-loan/hdfc-credila.html',                  // ⏳ REPLACE → BankBazaar affiliate (HDFC Credila)
      avanse:  'https://www.avanse.com/',               // ✅ No affiliate program — keep as-is (Avanse)
      incred:  'https://www.incred.com/education-loan/', // ✅ No affiliate program — keep as-is (InCred)
      auxilo:  'https://www.auxilo.com/',                // ✅ No affiliate program — keep as-is (Auxilo)
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     SIP / MUTUAL FUNDS — MutualFundTable + BrokerPlatformTable
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (via component):
       • /calculators/sip-calculator/           (MutualFundTable + BrokerPlatformTable)
       • /calculators/goal-sip/                 (BrokerPlatformTable only)
       • /calculators/step-up-sip/              (BrokerPlatformTable only)
       • /calculators/lumpsum-calculator/       (BrokerPlatformTable only)
       • /calculators/swp-calculator/           (BrokerPlatformTable only)
       • /calculators/interest-free-home-loan/  (BrokerPlatformTable only)
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE (Cuelink already approved ✅):
       app.cuelink.in → Brands → search brand → Generate Link → copy URL
     ══════════════════════════════════════════════════════════════════════════ */
  sip: {
    primary: 'https://groww.in/mutual-funds', // ✅ REPLACE → Cuelink Groww tracking URL  | "Browse All Mutual Funds" button on BrokerPlatformTable

    /* ── MutualFundTable (inside sip-calculator only) ──
       ACTIVE in table — top 5 by 3Y/5Y returns (replace all 5 via Cuelink → Groww):
       RESERVED — ready when table expands to top 10 (still replace, just not shown yet): */
    funds: {
      hdfcMid:     'https://groww.in/mutual-funds/hdfc-mid-cap-opportunities-fund-direct-growth',          // ✅ REPLACE → Cuelink Groww deep link  ← ACTIVE in table
      nipponSmall: 'https://groww.in/mutual-funds/nippon-india-small-cap-fund-direct-growth',              // ✅ REPLACE → Cuelink Groww deep link  ← ACTIVE in table
      sbiSmall:    'https://groww.in/mutual-funds/sbi-small-cap-fund-direct-growth',                       // ✅ REPLACE → Cuelink Groww deep link  ← ACTIVE in table
      paragParikh: 'https://groww.in/mutual-funds/parag-parikh-flexi-cap-fund-direct-growth',              // ✅ REPLACE → Cuelink Groww deep link  ← ACTIVE in table
      quantActive: 'https://groww.in/mutual-funds/quant-active-fund-direct-growth',                        // ✅ REPLACE → Cuelink Groww deep link  ← ACTIVE in table
      miraeLarge:  'https://groww.in/mutual-funds/mirae-asset-large-cap-fund-direct-growth',               // ✅ REPLACE → Cuelink Groww deep link  ← RESERVED (not in table yet)
      axisBlue:    'https://groww.in/mutual-funds/axis-bluechip-fund-direct-growth',                       // ✅ REPLACE → Cuelink Groww deep link  ← RESERVED
      iciciBlue:   'https://groww.in/mutual-funds/icici-prudential-bluechip-fund-direct-growth',           // ✅ REPLACE → Cuelink Groww deep link  ← RESERVED
      miraeElss:   'https://groww.in/mutual-funds/mirae-asset-elss-tax-saver-fund-direct-growth',          // ✅ REPLACE → Cuelink Groww deep link  ← RESERVED
      utiIndex:    'https://groww.in/mutual-funds/uti-nifty-50-index-fund-direct-growth',                  // ✅ REPLACE → Cuelink Groww deep link  ← RESERVED
    },

    /* ── BrokerPlatformTable (sip-calculator, goal-sip, step-up-sip, lumpsum, swp, interest-free-home-loan) ──
       ACTIVE in table (5 shown — replace all 5 via Cuelink):
       RESERVED (not in table yet — replace when table is expanded):                                        */
    brokers: {
      groww:         'https://groww.in/',                               // ✅ REPLACE → Cuelink Groww URL      ← ACTIVE in table
      zerodhaCoin:   'https://zerodha.com/?c=YZ7367&s=CONSOLE',        // ✅ REPLACE → Cuelink Zerodha URL    ← ACTIVE in table
      angelOneMf:    'https://www.angelone.in/mutual-funds',            // ✅ REPLACE → Cuelink Angel One URL  ← ACTIVE in table
      paytmMoney:    'https://www.paytmmoney.com/mutual-funds',         // ✅ REPLACE → Cuelink Paytm Money URL ← ACTIVE in table
      etMoney:       'https://www.etmoney.com/mutual-funds',            // ✅ REPLACE → Cuelink ETMoney URL    ← ACTIVE in table
      upstoxMf:      'https://upstox.com/mutual-funds/',                // ✅ REPLACE → Cuelink Upstox URL     ← RESERVED
      kuvera:        'https://kuvera.in/',                               // ✅ No Cuelink affiliate — keep as-is ← RESERVED
      iciciDirectMf: 'https://www.icicidirect.com/mutual-funds',        // ✅ No Cuelink affiliate — keep as-is ← RESERVED
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     FD / RD / SAVINGS — FdRateTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (via component):
       • /calculators/fd-calculator/            (mode="fd")
       • /calculators/rd-calculator/            (mode="rd")
       • /calculators/simple-interest/          (mode="fd")
       • /calculators/compounding-calculator/   (mode="fd", on page — no internal calc component)
       • /calculators/inflation-calculator/     (mode="fd", on page)
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE: Once BankBazaar approved → replace all ⏳ below
     ══════════════════════════════════════════════════════════════════════════ */
  fdRd: {
    primary: 'https://www.bankbazaar.com/fixed-deposit.html', // ⏳ REPLACE → BankBazaar affiliate  | "Browse All FDs" button on FdRateTable

    /* ── FD banks (mode="fd") ──
       ACTIVE in table — top 5 by interest rate (auSfb, kotak, indusind, icici, idfcFirst)
       RESERVED — ready to add to table when expanded (sbi, hdfc, axis)               */
    banks: {
      auSfb:     'https://www.bankbazaar.com/fixed-deposit/au-small-finance-bank-fixed-deposit.html', // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      kotak:     'https://www.bankbazaar.com/fixed-deposit/kotak-bank-fd-rates.html',                 // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      indusind:  'https://www.bankbazaar.com/fixed-deposit/indusind-bank-fd-rates.html',              // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      icici:     'https://www.bankbazaar.com/fixed-deposit/icici-fd-rates.html',                      // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      idfcFirst: 'https://www.bankbazaar.com/fixed-deposit/idfc-first-bank-fixed-deposit.html',       // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      sbi:       'https://www.bankbazaar.com/fixed-deposit/sbi-fd-rates.html',                        // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
      hdfc:      'https://www.bankbazaar.com/fixed-deposit/hdfc-fd-rates.html',                       // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
      axis:      'https://www.bankbazaar.com/fixed-deposit/axis-bank-fixed-deposit.html',             // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
    },

    /* ── RD banks (mode="rd") ──
       Same 5 ACTIVE / 3 RESERVED as FD above                                          */
    rdBanks: {
      auSfb:     'https://www.bankbazaar.com/recurring-deposit/au-small-finance-bank-recurring-deposit.html', // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      kotak:     'https://www.bankbazaar.com/recurring-deposit/kotak-recurring-deposit.html',                 // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      indusind:  'https://www.bankbazaar.com/recurring-deposit/indusind-bank-recurring-deposit.html',         // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      icici:     'https://www.bankbazaar.com/recurring-deposit/icici-recurring-deposit.html',                 // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      idfcFirst: 'https://www.bankbazaar.com/recurring-deposit/idfc-first-bank-recurring-deposit.html',       // ⏳ REPLACE → BankBazaar affiliate  ← ACTIVE
      sbi:       'https://www.bankbazaar.com/recurring-deposit/sbi-recurring-deposit.html',                   // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
      hdfc:      'https://www.bankbazaar.com/recurring-deposit/hdfc-recurring-deposit.html',                  // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
      axis:      'https://www.bankbazaar.com/recurring-deposit/axis-bank-recurring-deposit.html',             // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     PENSION / GOVERNMENT SAVINGS — PensionProviderTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (via component):
       • /calculators/ppf-calculator/     (scheme="ppf")
       • /calculators/nsc-calculator/     (scheme="nsc")
       • /calculators/nps-calculator/     (scheme="nps")
       • /calculators/epf-calculator/     (scheme="epf")
       • /calculators/retirement-fire/    (scheme="retirement")
       • /calculators/gratuity-calculator/(scheme="retirement")
     ══════════════════════════════════════════════════════════════════════════ */
  pension: {

    /* scheme="ppf" — shown on: ppf-calculator */
    ppf: {
      sbi:        'https://www.onlinesbi.sbi/sbicollect/',                                                 // ✅ Official SBI portal — no affiliate (keep)
      icici:      'https://www.icicibank.com/personal-banking/investments/ppf-account',                   // ✅ Official ICICI portal — no affiliate (keep)
      hdfc:       'https://www.hdfcbank.com/personal/save/accounts/ppf-account',                          // ✅ Official HDFC portal — no affiliate (keep)
      axis:       'https://www.axisbank.com/retail/accounts/public-provident-fund-account',               // ✅ Official Axis portal — no affiliate (keep)
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx', // ✅ Government — no affiliate (keep)
    },

    /* scheme="nsc" — shown on: nsc-calculator */
    nsc: {
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx', // ✅ Government — no affiliate (keep)
      sbi:        'https://sbi.co.in/web/personal-banking/investments-deposits/govt-schemes/nsc',          // ✅ Official SBI — no affiliate (keep)
      bob:        'https://www.bankofbaroda.in/personal-banking/investments/national-savings-certificate', // ✅ Official BoB — no affiliate (keep)
    },

    /* scheme="nps" — shown on: nps-calculator */
    nps: {
      groww:       'https://groww.in/nps',                                  // ✅ REPLACE → Cuelink Groww tracking URL
      etMoney:     'https://www.etmoney.com/nps',                           // ✅ REPLACE → Cuelink ETMoney tracking URL
      nsdlEnps:    'https://enps.nsdl.com/eNPS/NationalPensionSystem.html', // ✅ Government NSDL portal — no affiliate (keep)
      kfintech:    'https://enps.kfintech.com/login.html',                  // ✅ Government-linked CRA — no affiliate (keep)
      hdfcPension: 'https://www.hdfcpension.com/',                          // ✅ No major affiliate — direct link (keep)
    },

    /* scheme="epf" — shown on: epf-calculator */
    epf: {
      epfoPortal: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', // ✅ Government EPFO — no affiliate (keep)
      umang:      'https://web.umang.gov.in/web_new/home',                      // ✅ Government app — no affiliate (keep)
      passbook:   'https://passbook.epfindia.gov.in/MemberPassBook/Login',      // ✅ Government — no affiliate (keep)
    },

    /* scheme="retirement" — shown on: retirement-fire, gratuity-calculator */
    retirement: {
      groww:   'https://groww.in/mutual-funds/category/retirement-fund', // ✅ REPLACE → Cuelink Groww tracking URL
      zerodha: 'https://zerodha.com/coin/',                              // ✅ REPLACE → Cuelink Zerodha tracking URL
      etMoney: 'https://www.etmoney.com/mutual-funds/retirement',        // ✅ REPLACE → Cuelink ETMoney tracking URL
      kuvera:  'https://kuvera.in/',                                     // ✅ No Cuelink affiliate — direct link (keep)
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     TAX FILING — TaxFilingTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (component rendered on page):
       • /calculators/old-vs-new-regime/
       • /calculators/new-income-tax-2526/
       • /calculators/new-income-tax-2425/
       • /calculators/old-income-tax/
       • /calculators/salary-calculator/
       • /calculators/hra-exemption/
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE: Cuelink ✅ → search "ClearTax" → Generate Link
     ══════════════════════════════════════════════════════════════════════════ */
  tax: {
    primary:  'https://cleartax.in/s/income-tax-return', // ✅ REPLACE → Cuelink ClearTax URL  | "File ITR" button on TaxFilingTable
    services: {
      cleartax:   'https://cleartax.in/s/income-tax-return', // ✅ REPLACE → Cuelink ClearTax URL
      taxbuddy:   'https://www.taxbuddy.com/',               // ✅ No Cuelink affiliate — keep as-is
      myitreturn: 'https://www.myitreturn.com/',             // ✅ No Cuelink affiliate — keep as-is
      quicko:     'https://quicko.com/',                     // ✅ No Cuelink affiliate — keep as-is
      taxspanner: 'https://www.taxspanner.com/',             // ✅ No Cuelink affiliate — keep as-is
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     GST SOFTWARE — GstSoftwareTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES:
       • /calculators/gst-calculator/
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE:
       cleartax  → Cuelink ✅ → search "ClearTax" → Generate Link
       zohoBooks → Zoho Affiliate ⏳ → zoho.com/affiliate (15% recurring)
     ══════════════════════════════════════════════════════════════════════════ */
  gst: {
    primary:  'https://cleartax.in/s/gst-software', // ✅ REPLACE → Cuelink ClearTax URL  | "Browse GST Software" button
    software: {
      cleartax:  'https://cleartax.in/s/gst-software',         // ✅ REPLACE → Cuelink ClearTax URL
      zohoBooks: 'https://www.zoho.com/in/books/gst-software/', // ⏳ REPLACE → Zoho Affiliate URL (15% recurring commission)
      tally:     'https://tallysolutions.com/gst/',             // ✅ No affiliate program — keep as-is
      marg:      'https://www.margerp.com/',                    // ✅ No affiliate program — keep as-is
      busy:      'https://busy.in/',                            // ✅ No affiliate program — keep as-is
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     STOCK BROKERS — StockBrokerTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (component rendered on page):
       • /calculators/brokerage-calculator/
       • /calculators/cagr-calculator/
     ─────────────────────────────────────────────────────────────────────────
     HOW TO REPLACE: Cuelink ✅ → search each broker → Generate Link
     ══════════════════════════════════════════════════════════════════════════ */
  trading: {
    primary: 'https://zerodha.com/open-account', // ✅ REPLACE → Cuelink Zerodha URL  | "Open Demat Account" button on StockBrokerTable
    brokers: {
      zerodha:     'https://zerodha.com/open-account',                           // ✅ REPLACE → Cuelink Zerodha URL
      groww:       'https://groww.in/open-demat-account',                        // ✅ REPLACE → Cuelink Groww URL
      upstox:      'https://upstox.com/open-account/',                           // ✅ REPLACE → Cuelink Upstox URL
      angelOne:    'https://www.angelone.in/open-demat-account',                 // ✅ REPLACE → Cuelink Angel One URL
      iciciDirect: 'https://secure.icicidirect.com/Customer/CustomerLogin.aspx', // ✅ No Cuelink affiliate — keep as-is
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     BUSINESS TOOLS — BusinessToolTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (component rendered on page):
       variant="ads"        → /calculators/ppc-calculator/
       variant="accounting" → /calculators/break-even/, /calculators/profit-margin/
       variant="loans"      → /calculators/working-capital/, /calculators/dscr-calculator/
     ══════════════════════════════════════════════════════════════════════════ */
  business: {

    /* variant="ads" — ppc-calculator only */
    adTools: {
      googleAds:   'https://ads.google.com/intl/en_in/home/',   // ✅ No affiliate — direct link (keep)
      metaAds:     'https://www.facebook.com/business/ads',     // ✅ No affiliate — direct link (keep)
      semrush:     'https://www.semrush.com/',                   // ⏳ REPLACE → Impact.com Semrush tracking URL (up to $200/sale) | Sign up: semrush.com/affiliate
      ahrefs:      'https://ahrefs.com/',                        // ✅ No India affiliate — keep as-is
      ubersuggest: 'https://neilpatel.com/ubersuggest/',         // ✅ No affiliate program — keep as-is
    },

    /* variant="accounting" — break-even, profit-margin */
    accounting: {
      zohoBooks:  'https://www.zoho.com/in/books/',              // ⏳ REPLACE → Zoho Affiliate URL (15% recurring) | Sign up: zoho.com/affiliate
      tally:      'https://tallysolutions.com/',                 // ✅ No affiliate program — keep as-is
      quickbooks: 'https://quickbooks.intuit.com/in/',          // ✅ No India affiliate — keep as-is
      vyapar:     'https://vyaparapp.in/',                       // ✅ REPLACE → Cuelink Vyapar URL
      khatabook:  'https://khatabook.com/',                      // ✅ REPLACE → Cuelink Khatabook URL
    },

    /* variant="loans" — working-capital, dscr-calculator */
    loans: {
      bajaj:       'https://www.bajajfinserv.in/business-loan',              // ✅ REPLACE → Cuelink Bajaj Finserv URL
      hdfc:        'https://www.hdfcbank.com/sme/borrow/business-loans',     // ✅ No Cuelink affiliate — keep as-is
      lendingkart: 'https://www.lendingkart.com/',                           // ✅ REPLACE → Cuelink Lendingkart URL
      indifi:      'https://www.indifi.com/',                                // ✅ No affiliate program — keep as-is
      flexiloans:  'https://flexiloans.com/',                                // ✅ No affiliate program — keep as-is
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     HEALTH & FITNESS — HealthAppTable component
     ─────────────────────────────────────────────────────────────────────────
     APPEARS ON PAGES (via component):
       • /calculators/bmi-calculator/
         - BMI < 18.5 (underweight) → shows apps + massGainers section
         - BMI 18.5–25 (normal)     → shows apps section only
         - BMI > 25 (overweight)    → shows apps + weightLoss section
     ══════════════════════════════════════════════════════════════════════════ */
  health: {
    primary: 'https://www.healthifyme.com/', // ✅ REPLACE → Cuelink HealthifyMe URL  | "Browse All Apps" button on HealthAppTable

    /* Fitness apps — shown for ALL BMI ranges */
    apps: {
      healthifyMe:  'https://www.healthifyme.com/',           // ✅ REPLACE → Cuelink HealthifyMe URL
      cultFit:      'https://cult.fit/',                      // ✅ REPLACE → Cuelink Cult.fit URL
      myFitnessPal: 'https://www.myfitnesspal.com/',         // ✅ No India affiliate — keep as-is
      strava:       'https://www.strava.com/',                // ✅ No India affiliate — keep as-is
      fitbit:       'https://www.fitbit.com/global/in/home',  // ✅ No India affiliate — keep as-is
    },

    /* Mass gainers — shown ONLY when BMI < 18.5 (underweight) */
    massGainers: {
      muscleBlazeBeast: 'https://www.muscleblaze.com/mass-gainer/muscleblaze-beast-mass-gainer',   // ⏳ REPLACE → Amazon Associates OR HealthKart affiliate
      optimumSerious:   'https://www.healthkart.com/on-optimum-nutrition-serious-mass/SKU-MFP9990', // ⏳ REPLACE → HealthKart affiliate
      labradaMass:      'https://www.healthkart.com/labrada-muscle-mass-gainer/SKU-MFP9999',        // ⏳ REPLACE → HealthKart affiliate
      myProtein:        'https://www.myprotein.co.in/sports-nutrition/weight-gainers.list',         // ✅ No India affiliate — keep as-is
    },

    /* Weight loss — shown ONLY when BMI > 25 (overweight/obese) */
    weightLoss: {
      healthKartSlim: 'https://www.healthkart.com/slim-fit/c/MC30',  // ⏳ REPLACE → HealthKart affiliate tracking URL
      saffolaFittify: 'https://www.saffolafittify.com/',              // ✅ No major affiliate — keep as-is
      mbProtein:      'https://www.muscleblaze.com/whey-protein',     // ⏳ REPLACE → Amazon Associates OR HealthKart affiliate
      patanjaliDivya: 'https://www.patanjaliayurved.net/',            // ✅ No affiliate program — keep as-is
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     GENERAL / RESERVED — not rendered on any page yet
     Placeholders for future "Check Free Credit Score" CTA banner
     or footer-level promotional links.
     ══════════════════════════════════════════════════════════════════════════ */
  general: {
    creditScore: 'https://www.bankbazaar.com/free-credit-score.html', // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED (not on any page yet)
    bankbazaar:  'https://www.bankbazaar.com/',                        // ⏳ REPLACE → BankBazaar affiliate  ← RESERVED
    paisabazaar: 'https://www.paisabazaar.com/',                       // ✅ No Cuelink affiliate — keep as-is ← RESERVED
  },
};

/* ════════════════════════════════════════════════════════════════════════════
   QUICK-REFERENCE: CALCULATOR PAGE → AFFILIATE KEYS USED
   ════════════════════════════════════════════════════════════════════════════

   /calculators/sip-calculator/         sip.funds.* (top 5) + sip.brokers.* (top 5) + sip.primary
   /calculators/goal-sip/               sip.brokers.* + sip.primary
   /calculators/step-up-sip/            sip.brokers.* + sip.primary
   /calculators/lumpsum-calculator/     sip.brokers.* + sip.primary
   /calculators/swp-calculator/         sip.brokers.* + sip.primary
   /calculators/fd-calculator/          fdRd.banks.* (top 5) + fdRd.primary
   /calculators/rd-calculator/          fdRd.rdBanks.* (top 5) + fdRd.primary
   /calculators/simple-interest/        fdRd.banks.* (top 5) + fdRd.primary
   /calculators/compounding-calculator/ fdRd.banks.* (top 5) + fdRd.primary
   /calculators/inflation-calculator/   fdRd.banks.* (top 5) + fdRd.primary
   /calculators/ppf-calculator/         pension.ppf.*
   /calculators/nsc-calculator/         pension.nsc.*
   /calculators/nps-calculator/         pension.nps.*
   /calculators/epf-calculator/         pension.epf.*
   /calculators/retirement-fire/        pension.retirement.*
   /calculators/gratuity-calculator/    pension.retirement.*
   /calculators/bmi-calculator/         health.apps.* + health.massGainers.* OR health.weightLoss.*
   /calculators/home-loan/              emi.banks.home.* + homeLoan.primary
   /calculators/car-loan/               emi.banks.car.* + carLoan.primary
   /calculators/personal-loan/          emi.banks.personal.* + personalLoan.primary
   /calculators/educational-loan/       educationLoan.banks.* + educationLoan.primary
   /calculators/emi-calculator/         emi.banks.* (all 4 tabs) + homeLoan.primary + carLoan.primary + personalLoan.primary + educationLoan.primary
   /calculators/home-loan-eligibility/  emi.banks.home.* + homeLoan.primary
   /calculators/loan-prepayment/        emi.banks.home.* + homeLoan.primary
   /calculators/interest-free-home-loan/emi.banks.home.* + sip.brokers.*
   /calculators/brokerage-calculator/   trading.brokers.* + trading.primary
   /calculators/cagr-calculator/        trading.brokers.* + trading.primary
   /calculators/old-vs-new-regime/      tax.services.* + tax.primary
   /calculators/new-income-tax-2526/    tax.services.* + tax.primary
   /calculators/new-income-tax-2425/    tax.services.* + tax.primary
   /calculators/old-income-tax/         tax.services.* + tax.primary
   /calculators/salary-calculator/      tax.services.* + tax.primary
   /calculators/hra-exemption/          tax.services.* + tax.primary
   /calculators/gst-calculator/         gst.software.* + gst.primary
   /calculators/ppc-calculator/         business.adTools.*
   /calculators/break-even/             business.accounting.*
   /calculators/profit-margin/          business.accounting.*
   /calculators/working-capital/        business.loans.*
   /calculators/dscr-calculator/        business.loans.*

   ════════════════════════════════════════════════════════════════════════════
   AFFILIATE PROGRAM CHECKLIST — tick off as you get each program approved
   ════════════════════════════════════════════════════════════════════════════
   [✅] Cuelink        → replace: sip.*, trading.*, pension.nps.groww/.etMoney,
                                   pension.retirement.groww/.zerodha/.etMoney,
                                   tax.primary + tax.services.cleartax,
                                   gst.primary + gst.software.cleartax,
                                   business.accounting.vyapar/.khatabook,
                                   business.loans.bajaj/.lendingkart,
                                   health.primary + health.apps.healthifyMe/.cultFit
                          Sign up: app.cuelink.in

   [⏳] BankBazaar    → replace: ALL emi.banks.*, educationLoan.banks.*,
                                   homeLoan.primary, carLoan.primary,
                                   personalLoan.primary, educationLoan.primary,
                                   fdRd.primary, fdRd.banks.*, fdRd.rdBanks.*,
                                   general.creditScore, general.bankbazaar
                          Sign up: bankbazaar.com/affiliate.html

   [⏳] Semrush        → replace: business.adTools.semrush
                          Sign up: semrush.com/affiliate  (up to $200/sale)

   [⏳] Zoho           → replace: gst.software.zohoBooks, business.accounting.zohoBooks
                          Sign up: zoho.com/affiliate  (15% recurring)

   [⏳] HealthKart     → replace: health.weightLoss.healthKartSlim,
                                   health.massGainers.optimumSerious, .labradaMass
                          Sign up: healthkart.com/affiliate

   [⏳] Amazon Assoc.  → replace: health.massGainers.muscleBlazeBeast,
                                   health.weightLoss.mbProtein
                          Sign up: affiliate-program.amazon.in
   ════════════════════════════════════════════════════════════════════════════ */
