/**
 * AFFILIATE LINKS — Single source of truth
 * ─────────────────────────────────────────
 * All comparison table components read URLs from this file.
 * Update ONE key here → every page that shows that brand updates instantly.
 *
 * PROGRAM STATUS
 * ─────────────────────────────────────────────────────────────────────────
 * ✅ CUELINK APPROVED       →  app.cuelink.in  (replace all Cuelink keys below)
 * ⏳ BANKBAZAAR PENDING     →  bankbazaar.com/affiliate.html
 * ⏳ IMPACT.COM (Semrush)   →  semrush.com/affiliate  (up to $200/sale)
 * ⏳ ZOHO AFFILIATE         →  zoho.com/affiliate  (15% recurring)
 * ⏳ HEALTHKART AFFILIATE   →  healthkart.com/affiliate
 * ⏳ AMAZON ASSOCIATES      →  affiliate-program.amazon.in
 *
 * ═══════════════════════════════════════════════════════════════════════
 * CUELINKS REPLACEMENT GUIDE — Do this first (covers most of the site)
 * ═══════════════════════════════════════════════════════════════════════
 * Log in → app.cuelink.in → Brands → search each name → copy tracking URL
 *
 * INVESTMENT / SIP PLATFORMS  (keys: sip.brokers.*)
 *   Search "Groww"       → paste into: sip.primary, sip.brokers.groww, pension.nps.groww, pension.retirement.groww, trading.brokers.groww
 *   Search "Zerodha"     → paste into: sip.brokers.zerodhaCoin, trading.primary, trading.brokers.zerodha, pension.retirement.zerodha
 *   Search "Upstox"      → paste into: sip.brokers.upstoxMf, trading.brokers.upstox
 *   Search "Angel One"   → paste into: sip.brokers.angelOneMf, trading.brokers.angelOne
 *   Search "Paytm Money" → paste into: sip.brokers.paytmMoney
 *   Search "ETMoney"     → paste into: sip.brokers.etMoney, pension.nps.etMoney, pension.retirement.etMoney
 *
 *   MUTUAL FUND DEEP LINKS  (keys: sip.funds.*)
 *   For each fund below, search "Groww" on Cuelink and use the Groww tracking
 *   base URL, then append the fund path — OR use direct Groww deep links if
 *   Cuelink tracks all Groww pages with one domain-level cookie:
 *     sip.funds.paragParikh, sip.funds.quantActive, sip.funds.nipponSmall,
 *     sip.funds.hdfcMid, sip.funds.miraeLarge, sip.funds.axisBlue,
 *     sip.funds.sbiSmall, sip.funds.iciciBlue, sip.funds.miraeElss, sip.funds.utiIndex
 *
 * TAX FILING  (keys: tax.services.cleartax, tax.primary)
 *   Search "ClearTax"    → paste into: tax.primary, tax.services.cleartax
 *
 * GST SOFTWARE  (keys: gst.software.cleartax, gst.primary)
 *   Search "ClearTax"    → paste into: gst.primary, gst.software.cleartax
 *
 * BUSINESS TOOLS
 *   Search "Vyapar"      → paste into: business.accounting.vyapar
 *   Search "Khatabook"   → paste into: business.accounting.khatabook
 *   Search "Bajaj Finserv" → paste into: business.loans.bajaj, emi.banks.personal.bajaj, emi.banks.home.bajaj, personalLoan.bajaj
 *   Search "Lendingkart" → paste into: business.loans.lendingkart
 *
 * HEALTH
 *   Search "HealthifyMe" → paste into: health.primary, health.apps.healthifyMe
 *   Search "Cult.fit"    → paste into: health.apps.cultFit
 *
 * HOW TO REPLACE:
 *   1. Log in to app.cuelink.in
 *   2. Go to Brands → search the brand → click Generate Link
 *   3. Copy the tracking URL
 *   4. Paste it as the string value for the matching key below
 *   5. Save — the change propagates to every page automatically
 * ═══════════════════════════════════════════════════════════════════════
 */

export const AFFILIATE = {

  /* ═══════════════════════════════════════════════════════════════════
     LOANS — BankRateTable
     Pages: home-loan, car-loan, personal-loan, educational-loan,
            emi-calculator (via EMICalculator component),
            home-loan-eligibility (via LoanEligibility component),
            loan-prepayment (via LoanPrepayment component),
            interest-free-home-loan (via InterestFreeHomeLoan component)
     ── Replace with BankBazaar Affiliate tracking URLs ──────────────
     Format: https://track.bankbazaar.com/...?src=YOUR_PUBLISHER_ID
     ═══════════════════════════════════════════════════════════════════ */
  emi: {
    banks: {
      home: {
        sbi:    'https://ajiio.in/tZtHWkw',       // REPLACE → BankBazaar affiliate
        hdfc:   'https://www.bankbazaar.com/home-loan/hdfc-home-loan.html',      // REPLACE → BankBazaar affiliate
        icici:  'https://www.bankbazaar.com/home-loan/icici-home-loan.html',     // REPLACE → BankBazaar affiliate
        kotak:  'https://www.bankbazaar.com/home-loan/kotak-mahindra-home-loan.html', // REPLACE → BankBazaar affiliate
        axis:   'https://www.bankbazaar.com/home-loan/axis-bank-home-loan.html', // REPLACE → BankBazaar affiliate
        bob:    'https://www.bankbazaar.com/home-loan/bank-of-baroda-home-loan.html', // REPLACE → BankBazaar affiliate
        pnb:    'https://www.bankbazaar.com/home-loan/pnb-home-loan.html',       // REPLACE → BankBazaar affiliate
        lic:    'https://www.bankbazaar.com/home-loan/lic-hfl-home-loan.html',   // REPLACE → BankBazaar affiliate
        bajaj:  'https://www.bankbazaar.com/home-loan/bajaj-finserv-home-loan.html', // REPLACE → BankBazaar affiliate or Cuelink
        tata:   'https://www.bankbazaar.com/home-loan/tata-capital-home-loan.html',  // REPLACE → BankBazaar affiliate
      },
      car: {
        sbi:    'https://www.bankbazaar.com/car-loan/sbi-car-loan.html',         // REPLACE → BankBazaar affiliate
        hdfc:   'https://www.bankbazaar.com/car-loan/hdfc-bank-car-loan.html',   // REPLACE → BankBazaar affiliate
        icici:  'https://www.bankbazaar.com/car-loan/icici-bank-car-loan.html',  // REPLACE → BankBazaar affiliate
        kotak:  'https://www.bankbazaar.com/car-loan/kotak-mahindra-car-loan.html', // REPLACE → BankBazaar affiliate
        axis:   'https://www.bankbazaar.com/car-loan/axis-bank-car-loan.html',   // REPLACE → BankBazaar affiliate
        bob:    'https://www.bankbazaar.com/car-loan/bank-of-baroda-car-loan.html', // REPLACE → BankBazaar affiliate
        pnb:    'https://www.bankbazaar.com/car-loan/pnb-car-loan.html',         // REPLACE → BankBazaar affiliate
        tata:   'https://www.bankbazaar.com/car-loan/tata-capital-car-loan.html', // REPLACE → BankBazaar affiliate
      },
      personal: {
        sbi:      'https://www.bankbazaar.com/personal-loan/sbi-personal-loan.html',       // REPLACE → BankBazaar affiliate
        hdfc:     'https://www.bankbazaar.com/personal-loan/hdfc-personal-loan.html',      // REPLACE → BankBazaar affiliate
        icici:    'https://www.bankbazaar.com/personal-loan/icici-bank-personal-loan.html', // REPLACE → BankBazaar affiliate
        kotak:    'https://www.bankbazaar.com/personal-loan/kotak-mahindra-personal-loan.html', // REPLACE → BankBazaar affiliate
        axis:     'https://www.bankbazaar.com/personal-loan/axis-bank-personal-loan.html', // REPLACE → BankBazaar affiliate
        bajaj:    'https://www.bankbazaar.com/personal-loan/bajaj-finserv-personal-loan.html', // REPLACE → Cuelink (Bajaj) or BankBazaar
        tata:     'https://www.bankbazaar.com/personal-loan/tata-capital-personal-loan.html', // REPLACE → BankBazaar affiliate
        indusind: 'https://www.bankbazaar.com/personal-loan/indusind-bank-personal-loan.html', // REPLACE → BankBazaar affiliate
      },
    },
  },

  /* "Browse All" CTA footer URLs — used in BankRateTable per loan-type tab */
  homeLoan: {
    primary: 'https://www.bankbazaar.com/home-loan.html',     // REPLACE → BankBazaar affiliate
  },

  carLoan: {
    primary: 'https://www.bankbazaar.com/car-loan.html',      // REPLACE → BankBazaar affiliate
  },

  personalLoan: {
    primary: 'https://www.bankbazaar.com/personal-loan.html', // REPLACE → BankBazaar affiliate
  },

  educationLoan: {
    primary: 'https://www.bankbazaar.com/education-loan.html', // REPLACE → BankBazaar affiliate
    banks: {
      bob:     'https://www.bankbazaar.com/education-loan/bank-of-baroda-education-loan.html', // REPLACE → BankBazaar affiliate
      sbi:     'https://www.bankbazaar.com/education-loan/sbi-education-loan.html',            // REPLACE → BankBazaar affiliate
      pnb:     'https://www.bankbazaar.com/education-loan/pnb-saraswati-education-loan.html',  // REPLACE → BankBazaar affiliate
      credila: 'https://www.bankbazaar.com/education-loan/hdfc-credila.html',                  // REPLACE → BankBazaar affiliate
      avanse:  'https://www.avanse.com/',              // No major affiliate — direct link (keep)
      incred:  'https://www.incred.com/education-loan/', // No major affiliate — direct link (keep)
      auxilo:  'https://www.auxilo.com/',               // No major affiliate — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     SIP / MUTUAL FUNDS / INVESTMENT PLATFORMS — BrokerPlatformTable
     Pages (via component): sip-calculator, goal-sip, step-up-sip,
            lumpsum-calculator, swp-calculator, interest-free-home-loan
     ── Replace with Cuelink tracking URLs for each brand ────────────
     Get links at: app.cuelink.in → Brands → search brand name → Generate
     ═══════════════════════════════════════════════════════════════════ */
  sip: {
    primary:    'https://groww.in/mutual-funds', // REPLACE → Cuelink Groww tracking URL

    /* Top mutual funds — MutualFundTable inside SIPCalc
       ACTIVE in table (top 5 by 3Y/5Y returns): hdfcMid, nipponSmall, sbiSmall, paragParikh, quantActive
       RESERVED (ready if table is expanded to top 10): miraeLarge, axisBlue, iciciBlue, miraeElss, utiIndex */
    funds: {
      hdfcMid:     'https://groww.in/mutual-funds/hdfc-mid-cap-opportunities-fund-direct-growth',    // REPLACE → Cuelink Groww deep link  ← ACTIVE
      nipponSmall: 'https://groww.in/mutual-funds/nippon-india-small-cap-fund-direct-growth',        // REPLACE → Cuelink Groww deep link  ← ACTIVE
      sbiSmall:    'https://groww.in/mutual-funds/sbi-small-cap-fund-direct-growth',                 // REPLACE → Cuelink Groww deep link  ← ACTIVE
      paragParikh: 'https://groww.in/mutual-funds/parag-parikh-flexi-cap-fund-direct-growth',        // REPLACE → Cuelink Groww deep link  ← ACTIVE
      quantActive: 'https://groww.in/mutual-funds/quant-active-fund-direct-growth',                  // REPLACE → Cuelink Groww deep link  ← ACTIVE
      miraeLarge:  'https://groww.in/mutual-funds/mirae-asset-large-cap-fund-direct-growth',         // REPLACE → Cuelink Groww deep link  ← RESERVED
      axisBlue:    'https://groww.in/mutual-funds/axis-bluechip-fund-direct-growth',                 // REPLACE → Cuelink Groww deep link  ← RESERVED
      iciciBlue:   'https://groww.in/mutual-funds/icici-prudential-bluechip-fund-direct-growth',     // REPLACE → Cuelink Groww deep link  ← RESERVED
      miraeElss:   'https://groww.in/mutual-funds/mirae-asset-elss-tax-saver-fund-direct-growth',    // REPLACE → Cuelink Groww deep link  ← RESERVED
      utiIndex:    'https://groww.in/mutual-funds/uti-nifty-50-index-fund-direct-growth',            // REPLACE → Cuelink Groww deep link  ← RESERVED
    },

    /* MF investment platforms — BrokerPlatformTable
       ACTIVE in table (5 shown): groww, zerodhaCoin, angelOneMf, paytmMoney, etMoney
       RESERVED (ready if table is expanded): upstoxMf, kuvera, iciciDirectMf            */
    brokers: {
      groww:         'https://groww.in/',                                    // REPLACE → Cuelink Groww tracking URL      ← ACTIVE
      zerodhaCoin:   'https://zerodha.com/?c=YZ7367&s=CONSOLE',             // REPLACE → Cuelink Zerodha tracking URL    ← ACTIVE
      angelOneMf:    'https://www.angelone.in/mutual-funds',                 // REPLACE → Cuelink Angel One tracking URL  ← ACTIVE
      paytmMoney:    'https://www.paytmmoney.com/mutual-funds',              // REPLACE → Cuelink Paytm Money tracking URL ← ACTIVE
      etMoney:       'https://www.etmoney.com/mutual-funds',                 // REPLACE → Cuelink ETMoney tracking URL    ← ACTIVE
      upstoxMf:      'https://upstox.com/mutual-funds/',                     // REPLACE → Cuelink Upstox tracking URL     ← RESERVED
      kuvera:        'https://kuvera.in/',                                    // No Cuelink affiliate — direct link        ← RESERVED
      iciciDirectMf: 'https://www.icicidirect.com/mutual-funds',             // No Cuelink affiliate — direct link        ← RESERVED
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     FD / RD / SAVINGS — FdRateTable
     Pages (via component): fd-calculator, rd-calculator, simple-interest,
            compounding-calculator (page only), inflation-calculator (page only)
     ── Replace with BankBazaar Affiliate tracking URLs ──────────────
     ═══════════════════════════════════════════════════════════════════ */
  fdRd: {
    primary: 'https://www.bankbazaar.com/fixed-deposit.html', // REPLACE → BankBazaar affiliate

    /* FD banks — FdRateTable (mode="fd")
       ACTIVE in table (top 5 by rate): auSfb, kotak, indusind, icici, idfcFirst
       RESERVED (ready if table is expanded): sbi, hdfc, axis                    */
    banks: {
      auSfb:     'https://www.bankbazaar.com/fixed-deposit/au-small-finance-bank-fixed-deposit.html', // REPLACE → BankBazaar affiliate  ← ACTIVE
      kotak:     'https://www.bankbazaar.com/fixed-deposit/kotak-bank-fd-rates.html',                 // REPLACE → BankBazaar affiliate  ← ACTIVE
      indusind:  'https://www.bankbazaar.com/fixed-deposit/indusind-bank-fd-rates.html',              // REPLACE → BankBazaar affiliate  ← ACTIVE
      icici:     'https://www.bankbazaar.com/fixed-deposit/icici-fd-rates.html',                      // REPLACE → BankBazaar affiliate  ← ACTIVE
      idfcFirst: 'https://www.bankbazaar.com/fixed-deposit/idfc-first-bank-fixed-deposit.html',       // REPLACE → BankBazaar affiliate  ← ACTIVE
      sbi:       'https://www.bankbazaar.com/fixed-deposit/sbi-fd-rates.html',                        // REPLACE → BankBazaar affiliate  ← RESERVED
      hdfc:      'https://www.bankbazaar.com/fixed-deposit/hdfc-fd-rates.html',                       // REPLACE → BankBazaar affiliate  ← RESERVED
      axis:      'https://www.bankbazaar.com/fixed-deposit/axis-bank-fixed-deposit.html',             // REPLACE → BankBazaar affiliate  ← RESERVED
    },

    /* RD banks — FdRateTable (mode="rd")
       ACTIVE in table: auSfb, kotak, indusind, icici, idfcFirst
       RESERVED: sbi, hdfc, axis                                                  */
    rdBanks: {
      auSfb:     'https://www.bankbazaar.com/recurring-deposit/au-small-finance-bank-recurring-deposit.html', // REPLACE → BankBazaar affiliate  ← ACTIVE
      kotak:     'https://www.bankbazaar.com/recurring-deposit/kotak-recurring-deposit.html',                 // REPLACE → BankBazaar affiliate  ← ACTIVE
      indusind:  'https://www.bankbazaar.com/recurring-deposit/indusind-bank-recurring-deposit.html',         // REPLACE → BankBazaar affiliate  ← ACTIVE
      icici:     'https://www.bankbazaar.com/recurring-deposit/icici-recurring-deposit.html',                 // REPLACE → BankBazaar affiliate  ← ACTIVE
      idfcFirst: 'https://www.bankbazaar.com/recurring-deposit/idfc-first-bank-recurring-deposit.html',       // REPLACE → BankBazaar affiliate  ← ACTIVE
      sbi:       'https://www.bankbazaar.com/recurring-deposit/sbi-recurring-deposit.html',                   // REPLACE → BankBazaar affiliate  ← RESERVED
      hdfc:      'https://www.bankbazaar.com/recurring-deposit/hdfc-recurring-deposit.html',                  // REPLACE → BankBazaar affiliate  ← RESERVED
      axis:      'https://www.bankbazaar.com/recurring-deposit/axis-bank-recurring-deposit.html',             // REPLACE → BankBazaar affiliate  ← RESERVED
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     PENSION / GOVERNMENT SAVINGS — PensionProviderTable
     Pages (via component): ppf-calculator, nsc-calculator, nps-calculator,
            epf-calculator, retirement-fire, gratuity-calculator
     ═══════════════════════════════════════════════════════════════════ */
  pension: {
    /* PPF — scheme="ppf" */
    ppf: {
      sbi:        'https://www.onlinesbi.sbi/sbicollect/',                                                   // No affiliate — official SBI link (keep)
      icici:      'https://www.icicibank.com/personal-banking/investments/ppf-account',                     // No affiliate — direct link (keep)
      hdfc:       'https://www.hdfcbank.com/personal/save/accounts/ppf-account',                            // No affiliate — direct link (keep)
      axis:       'https://www.axisbank.com/retail/accounts/public-provident-fund-account',                 // No affiliate — direct link (keep)
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',   // Government — no affiliate (keep)
    },

    /* NSC — scheme="nsc" */
    nsc: {
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',   // Government — no affiliate (keep)
      sbi:        'https://sbi.co.in/web/personal-banking/investments-deposits/govt-schemes/nsc',            // No affiliate — direct link (keep)
      bob:        'https://www.bankofbaroda.in/personal-banking/investments/national-savings-certificate',   // No affiliate — direct link (keep)
    },

    /* NPS — scheme="nps" */
    nps: {
      groww:       'https://groww.in/nps',                                // REPLACE → Cuelink Groww tracking URL
      etMoney:     'https://www.etmoney.com/nps',                         // REPLACE → Cuelink ETMoney tracking URL
      nsdlEnps:    'https://enps.nsdl.com/eNPS/NationalPensionSystem.html', // Government portal — no affiliate (keep)
      kfintech:    'https://enps.kfintech.com/login.html',                // Government-linked — no affiliate (keep)
      hdfcPension: 'https://www.hdfcpension.com/',                        // No major affiliate — direct link (keep)
    },

    /* EPF — scheme="epf" */
    epf: {
      epfoPortal: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/', // Government — no affiliate (keep)
      umang:      'https://web.umang.gov.in/web_new/home',                      // Government app — no affiliate (keep)
      passbook:   'https://passbook.epfindia.gov.in/MemberPassBook/Login',      // Government — no affiliate (keep)
    },

    /* Retirement / FIRE / Gratuity invest — scheme="retirement" */
    retirement: {
      groww:   'https://groww.in/mutual-funds/category/retirement-fund', // REPLACE → Cuelink Groww tracking URL
      zerodha: 'https://zerodha.com/coin/',                              // REPLACE → Cuelink Zerodha tracking URL
      etMoney: 'https://www.etmoney.com/mutual-funds/retirement',        // REPLACE → Cuelink ETMoney tracking URL
      kuvera:  'https://kuvera.in/',                                     // No Cuelink affiliate — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     TAX FILING — TaxFilingTable
     Pages: old-vs-new-regime, new-income-tax-2526, new-income-tax-2425,
            old-income-tax, salary-calculator, hra-exemption
     ── Replace with Cuelink ClearTax tracking URL ───────────────────
     ═══════════════════════════════════════════════════════════════════ */
  tax: {
    primary: 'https://cleartax.in/s/income-tax-return', // REPLACE → Cuelink ClearTax tracking URL
    services: {
      cleartax:   'https://cleartax.in/s/income-tax-return', // REPLACE → Cuelink ClearTax tracking URL
      taxbuddy:   'https://www.taxbuddy.com/',               // No Cuelink — direct link (keep)
      myitreturn: 'https://www.myitreturn.com/',             // No Cuelink — direct link (keep)
      quicko:     'https://quicko.com/',                     // No Cuelink — direct link (keep)
      taxspanner: 'https://www.taxspanner.com/',             // No Cuelink — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     GST SOFTWARE — GstSoftwareTable
     Pages: gst-calculator
     ── Replace cleartax & zohoBooks with affiliate tracking URLs ─────
     ═══════════════════════════════════════════════════════════════════ */
  gst: {
    primary: 'https://cleartax.in/s/gst-software', // REPLACE → Cuelink ClearTax tracking URL
    software: {
      cleartax:  'https://cleartax.in/s/gst-software',        // REPLACE → Cuelink ClearTax tracking URL
      zohoBooks: 'https://www.zoho.com/in/books/gst-software/', // REPLACE → Zoho Affiliate tracking URL
      tally:     'https://tallysolutions.com/gst/',            // No affiliate program — direct link (keep)
      marg:      'https://www.margerp.com/',                   // No major affiliate — direct link (keep)
      busy:      'https://busy.in/',                           // No major affiliate — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     STOCK BROKERS — StockBrokerTable
     Pages: brokerage-calculator, cagr-calculator
     ── Replace with Cuelink tracking URLs for each broker ───────────
     ═══════════════════════════════════════════════════════════════════ */
  trading: {
    primary: 'https://zerodha.com/open-account', // REPLACE → Cuelink Zerodha tracking URL
    brokers: {
      zerodha:     'https://zerodha.com/open-account',                               // REPLACE → Cuelink Zerodha tracking URL
      groww:       'https://groww.in/open-demat-account',                            // REPLACE → Cuelink Groww tracking URL
      upstox:      'https://upstox.com/open-account/',                               // REPLACE → Cuelink Upstox tracking URL
      angelOne:    'https://www.angelone.in/open-demat-account',                     // REPLACE → Cuelink Angel One tracking URL
      iciciDirect: 'https://secure.icicidirect.com/Customer/CustomerLogin.aspx',     // No Cuelink — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     BUSINESS TOOLS — BusinessToolTable
     Pages: ppc-calculator (ads), break-even (accounting),
            profit-margin (accounting), working-capital (loans),
            dscr-calculator (loans)
     ═══════════════════════════════════════════════════════════════════ */
  business: {
    /* variant="ads" — ppc-calculator */
    adTools: {
      googleAds:   'https://ads.google.com/intl/en_in/home/',  // No affiliate — direct link (keep)
      metaAds:     'https://www.facebook.com/business/ads',    // No affiliate — direct link (keep)
      semrush:     'https://www.semrush.com/',                  // REPLACE → Impact.com Semrush tracking URL (up to $200/sale)
      ahrefs:      'https://ahrefs.com/',                       // No Cuelink — direct link (keep)
      ubersuggest: 'https://neilpatel.com/ubersuggest/',        // No major affiliate — direct link (keep)
    },

    /* variant="accounting" — break-even, profit-margin */
    accounting: {
      zohoBooks:  'https://www.zoho.com/in/books/',             // REPLACE → Zoho Affiliate tracking URL (15% recurring)
      tally:      'https://tallysolutions.com/',                // No affiliate program — direct link (keep)
      quickbooks: 'https://quickbooks.intuit.com/in/',         // No India affiliate — direct link (keep)
      vyapar:     'https://vyaparapp.in/',                      // REPLACE → Cuelink Vyapar tracking URL
      khatabook:  'https://khatabook.com/',                     // REPLACE → Cuelink Khatabook tracking URL
    },

    /* variant="loans" — working-capital, dscr-calculator */
    loans: {
      bajaj:       'https://www.bajajfinserv.in/business-loan', // REPLACE → Cuelink Bajaj Finserv tracking URL
      hdfc:        'https://www.hdfcbank.com/sme/borrow/business-loans', // No Cuelink — direct link (keep)
      lendingkart: 'https://www.lendingkart.com/',              // REPLACE → Cuelink Lendingkart tracking URL
      indifi:      'https://www.indifi.com/',                   // No major affiliate — direct link (keep)
      flexiloans:  'https://flexiloans.com/',                   // No major affiliate — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     HEALTH & FITNESS — HealthAppTable
     Pages (via component): bmi-calculator
     ── Replace with HealthKart Affiliate + Amazon Associates ─────────
     ═══════════════════════════════════════════════════════════════════ */
  health: {
    primary: 'https://www.healthifyme.com/', // REPLACE → Cuelink HealthifyMe tracking URL

    /* Fitness apps */
    apps: {
      healthifyMe:  'https://www.healthifyme.com/',                 // REPLACE → Cuelink HealthifyMe tracking URL
      cultFit:      'https://cult.fit/',                            // REPLACE → Cuelink Cult.fit tracking URL
      myFitnessPal: 'https://www.myfitnesspal.com/',               // No India affiliate — direct link (keep)
      strava:       'https://www.strava.com/',                      // No India affiliate — direct link (keep)
      fitbit:       'https://www.fitbit.com/global/in/home',        // No India affiliate — direct link (keep)
    },

    /* Shown when BMI < 18.5 (underweight) — Amazon Associates */
    massGainers: {
      muscleBlazeBeast: 'https://www.muscleblaze.com/mass-gainer/muscleblaze-beast-mass-gainer', // REPLACE → Amazon Associates or HealthKart affiliate
      optimumSerious:   'https://www.healthkart.com/on-optimum-nutrition-serious-mass/SKU-MFP9990', // REPLACE → HealthKart affiliate
      labradaMass:      'https://www.healthkart.com/labrada-muscle-mass-gainer/SKU-MFP9999',     // REPLACE → HealthKart affiliate
      myProtein:        'https://www.myprotein.co.in/sports-nutrition/weight-gainers.list',      // No India affiliate — direct link (keep)
    },

    /* Shown when BMI > 25 (overweight/obese) — HealthKart Affiliate */
    weightLoss: {
      healthKartSlim:  'https://www.healthkart.com/slim-fit/c/MC30', // REPLACE → HealthKart affiliate tracking URL
      saffolaFittify:  'https://www.saffolafittify.com/',             // No major affiliate — direct link (keep)
      mbProtein:       'https://www.muscleblaze.com/whey-protein',    // REPLACE → Amazon Associates or HealthKart affiliate
      patanjaliDivya:  'https://www.patanjaliayurved.net/',           // No major affiliate — direct link (keep)
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     GENERAL / FALLBACK
     Reserved for future "Check Free Credit Score" CTA banner or
     footer-level BankBazaar / Paisabazaar promotional links.
     Not currently rendered in any component.
     ═══════════════════════════════════════════════════════════════════ */
  general: {
    creditScore: 'https://www.bankbazaar.com/free-credit-score.html', // REPLACE → BankBazaar affiliate  ← RESERVED
    bankbazaar:  'https://www.bankbazaar.com/',                        // REPLACE → BankBazaar affiliate  ← RESERVED
    paisabazaar: 'https://www.paisabazaar.com/',                       // No Cuelink — direct link        ← RESERVED
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   CALCULATOR → TABLE → AFFILIATE KEY MAP  (all 41 calculators)
   ═══════════════════════════════════════════════════════════════════════

   Table is rendered INSIDE the calculator component (not on the page)
   ──────────────────────────────────────────────────────────────────────
   sip-calculator          MutualFundTable + BrokerPlatformTable  → sip.funds.* + sip.brokers.*
   goal-sip                BrokerPlatformTable                    → sip.brokers.*
   step-up-sip             BrokerPlatformTable                    → sip.brokers.*
   lumpsum-calculator      BrokerPlatformTable                    → sip.brokers.*
   swp-calculator          BrokerPlatformTable                    → sip.brokers.*
   fd-calculator           FdRateTable (fd)                       → fdRd.banks.*
   rd-calculator           FdRateTable (rd)                       → fdRd.rdBanks.*
   simple-interest         FdRateTable (fd)                       → fdRd.banks.*
   ppf-calculator          PensionProviderTable (ppf)             → pension.ppf.*
   nsc-calculator          PensionProviderTable (nsc)             → pension.nsc.*
   nps-calculator          PensionProviderTable (nps)             → pension.nps.*
   epf-calculator          PensionProviderTable (epf)             → pension.epf.*
   retirement-fire         PensionProviderTable (retirement)      → pension.retirement.*
   bmi-calculator          HealthAppTable                         → health.apps.* + (massGainers|weightLoss)
   home-loan               BankRateTable (home)                   → emi.banks.home.*    [via LoanCalcPage]
   car-loan                BankRateTable (car)                    → emi.banks.car.*     [via LoanCalcPage]
   personal-loan           BankRateTable (personal)               → emi.banks.personal.* [via LoanCalcPage]
   educational-loan        BankRateTable (education)              → educationLoan.banks.* [via LoanCalcPage]
   emi-calculator          BankRateTable (all 4 tabs)             → emi.banks.*         [via EMICalculator]
   home-loan-eligibility   BankRateTable (home)                   → emi.banks.home.*    [via LoanEligibility]
   loan-prepayment         BankRateTable (home)                   → emi.banks.home.*    [via LoanPrepayment]
   interest-free-home-loan BankRateTable + BrokerPlatformTable    → emi.banks.home.* + sip.brokers.* [via InterestFreeHomeLoan]

   Table is on the page (these components have NO internal table)
   ──────────────────────────────────────────────────────────────────────
   cagr-calculator         StockBrokerTable                       → trading.brokers.*
   brokerage-calculator    StockBrokerTable                       → trading.brokers.*
   compounding-calculator  FdRateTable (fd)                       → fdRd.banks.*
   inflation-calculator    FdRateTable (fd)                       → fdRd.banks.*
   gratuity-calculator     PensionProviderTable (retirement)      → pension.retirement.*
   old-vs-new-regime       TaxFilingTable                         → tax.services.*
   new-income-tax-2526     TaxFilingTable                         → tax.services.*
   new-income-tax-2425     TaxFilingTable                         → tax.services.*
   old-income-tax          TaxFilingTable                         → tax.services.*
   salary-calculator       TaxFilingTable                         → tax.services.*
   hra-exemption           TaxFilingTable                         → tax.services.*
   gst-calculator          GstSoftwareTable                       → gst.software.*
   ppc-calculator          BusinessToolTable (ads)                → business.adTools.*
   break-even              BusinessToolTable (accounting)         → business.accounting.*
   profit-margin           BusinessToolTable (accounting)         → business.accounting.*
   working-capital         BusinessToolTable (loans)              → business.loans.*
   dscr-calculator         BusinessToolTable (loans)              → business.loans.*

   ═══════════════════════════════════════════════════════════════════════
   QUICK REPLACEMENT CHECKLIST (tick off after joining each program)
   ═══════════════════════════════════════════════════════════════════════
   [ ] Cuelink approved    → replace all keys marked "Cuelink" above
                             Sign up: app.cuelink.in
   [ ] BankBazaar approved → replace all keys marked "BankBazaar affiliate"
                             Sign up: bankbazaar.com/affiliate.html
   [ ] Semrush / Impact.com→ replace business.adTools.semrush
                             Sign up: semrush.com/affiliate (up to $200/sale)
   [ ] Zoho approved       → replace gst.software.zohoBooks + business.accounting.zohoBooks
                             Sign up: zoho.com/affiliate (15% recurring)
   [ ] HealthKart approved → replace health.weightLoss.healthKartSlim + health.massGainers.*
                             Sign up: healthkart.com/affiliate
   [ ] Amazon Associates   → replace health.massGainers.muscleBlazeBeast + .mbProtein
                             Sign up: affiliate-program.amazon.in
   ═══════════════════════════════════════════════════════════════════════ */
