/**
 * AFFILIATE LINKS — Single source of truth
 * ─────────────────────────────────────────
 * Replace every placeholder URL below with your real tracking link
 * once approved by each program. The table components read directly
 * from this file — update here and every page updates automatically.
 *
 * WHERE TO GET LINKS:
 *   🟢 Cuelink (app.cuelink.in)      — Groww, Zerodha, Upstox, Angel One,
 *                                       ETMoney, ClearTax, SBI, HDFC, Bajaj,
 *                                       Cult.fit, Vyapar, Khatabook, Lendingkart
 *   🟡 BankBazaar (affiliate program) — All loan banks + FD/RD banks
 *   🟡 Impact.com (Semrush program)   — Semrush tracking link
 *   🟡 Zoho Affiliate Program         — Zoho Books (GST + accounting)
 *   🟡 HealthKart Affiliate           — HealthKart weight-loss products
 *   🟡 Amazon Associates              — MuscleBlaze, ON, Labrada (mass gainers)
 *
 * HOW TO REPLACE:
 *   Find the key (e.g. AFFILIATE.trading.brokers.zerodha)
 *   Replace the URL string with your tracking URL from the program dashboard
 *   Save — the change applies to every page that uses that brand instantly
 */

export const AFFILIATE = {

  /* ═══════════════════════════════════════════════════════════════════
     LOANS — BankRateTable (home-loan, car-loan, personal-loan,
     educational-loan, emi-calculator, home-loan-eligibility,
     loan-prepayment)
     Source: BankBazaar Affiliate Program
     ═══════════════════════════════════════════════════════════════════ */
  emi: {
    banks: {
      home: {
        sbi:    'https://www.bankbazaar.com/home-loan/sbi-home-loan.html',
        hdfc:   'https://www.bankbazaar.com/home-loan/hdfc-home-loan.html',
        icici:  'https://www.bankbazaar.com/home-loan/icici-home-loan.html',
        kotak:  'https://www.bankbazaar.com/home-loan/kotak-mahindra-home-loan.html',
        axis:   'https://www.bankbazaar.com/home-loan/axis-bank-home-loan.html',
        bob:    'https://www.bankbazaar.com/home-loan/bank-of-baroda-home-loan.html',
        pnb:    'https://www.bankbazaar.com/home-loan/pnb-home-loan.html',
        lic:    'https://www.bankbazaar.com/home-loan/lic-hfl-home-loan.html',
        bajaj:  'https://www.bankbazaar.com/home-loan/bajaj-finserv-home-loan.html',
        tata:   'https://www.bankbazaar.com/home-loan/tata-capital-home-loan.html',
      },
      car: {
        sbi:    'https://www.bankbazaar.com/car-loan/sbi-car-loan.html',
        hdfc:   'https://www.bankbazaar.com/car-loan/hdfc-bank-car-loan.html',
        icici:  'https://www.bankbazaar.com/car-loan/icici-bank-car-loan.html',
        kotak:  'https://www.bankbazaar.com/car-loan/kotak-mahindra-car-loan.html',
        axis:   'https://www.bankbazaar.com/car-loan/axis-bank-car-loan.html',
        bob:    'https://www.bankbazaar.com/car-loan/bank-of-baroda-car-loan.html',
        pnb:    'https://www.bankbazaar.com/car-loan/pnb-car-loan.html',
        tata:   'https://www.bankbazaar.com/car-loan/tata-capital-car-loan.html',
      },
      personal: {
        sbi:      'https://www.bankbazaar.com/personal-loan/sbi-personal-loan.html',
        hdfc:     'https://www.bankbazaar.com/personal-loan/hdfc-personal-loan.html',
        icici:    'https://www.bankbazaar.com/personal-loan/icici-bank-personal-loan.html',
        kotak:    'https://www.bankbazaar.com/personal-loan/kotak-mahindra-personal-loan.html',
        axis:     'https://www.bankbazaar.com/personal-loan/axis-bank-personal-loan.html',
        bajaj:    'https://www.bankbazaar.com/personal-loan/bajaj-finserv-personal-loan.html',
        tata:     'https://www.bankbazaar.com/personal-loan/tata-capital-personal-loan.html',
        indusind: 'https://www.bankbazaar.com/personal-loan/indusind-bank-personal-loan.html',
      },
    },
    compareAll: 'https://www.bankbazaar.com/home-loan.html',
  },

  /* "Apply now" CTA button URLs (shown in BankRateTable footer per tab) */
  homeLoan: {
    primary: 'https://www.bankbazaar.com/home-loan.html',
    sbi:     'https://www.bankbazaar.com/home-loan/sbi-home-loan.html',
    hdfc:    'https://www.bankbazaar.com/home-loan/hdfc-home-loan.html',
    icici:   'https://www.bankbazaar.com/home-loan/icici-home-loan.html',
  },

  carLoan: {
    primary: 'https://www.bankbazaar.com/car-loan.html',
    hdfc:    'https://www.bankbazaar.com/car-loan/hdfc-bank-car-loan.html',
    sbi:     'https://www.bankbazaar.com/car-loan/sbi-car-loan.html',
  },

  personalLoan: {
    primary: 'https://www.bankbazaar.com/personal-loan.html',
    hdfc:    'https://www.bankbazaar.com/personal-loan/hdfc-personal-loan.html',
    bajaj:   'https://www.bankbazaar.com/personal-loan/bajaj-finserv-personal-loan.html',
  },

  educationLoan: {
    primary: 'https://www.bankbazaar.com/education-loan.html',
    banks: {
      sbi:     'https://www.bankbazaar.com/education-loan/sbi-education-loan.html',
      credila: 'https://www.bankbazaar.com/education-loan/hdfc-credila.html',
      avanse:  'https://www.avanse.com/',
      incred:  'https://www.incred.com/education-loan/',
      auxilo:  'https://www.auxilo.com/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     SIP / MUTUAL FUNDS / INVESTMENT PLATFORMS — BrokerPlatformTable
     Used by: sip-calculator, step-up-sip, goal-sip, lumpsum-calculator,
              swp-calculator, interest-free-home-loan
     Source: Cuelink
     ═══════════════════════════════════════════════════════════════════ */
  sip: {
    primary:    'https://groww.in/mutual-funds',

    /* Top mutual funds — SIP calculator fund table */
    funds: {
      paragParikh: 'https://groww.in/mutual-funds/parag-parikh-flexi-cap-fund-direct-growth',
      quantActive: 'https://groww.in/mutual-funds/quant-active-fund-direct-growth',
      nipponSmall: 'https://groww.in/mutual-funds/nippon-india-small-cap-fund-direct-growth',
      hdfcMid:     'https://groww.in/mutual-funds/hdfc-mid-cap-opportunities-fund-direct-growth',
      miraeLarge:  'https://groww.in/mutual-funds/mirae-asset-large-cap-fund-direct-growth',
      axisBlue:    'https://groww.in/mutual-funds/axis-bluechip-fund-direct-growth',
      sbiSmall:    'https://groww.in/mutual-funds/sbi-small-cap-fund-direct-growth',
      iciciBlue:   'https://groww.in/mutual-funds/icici-prudential-bluechip-fund-direct-growth',
      miraeElss:   'https://groww.in/mutual-funds/mirae-asset-elss-tax-saver-fund-direct-growth',
      utiIndex:    'https://groww.in/mutual-funds/uti-nifty-50-index-fund-direct-growth',
    },

    /* MF investment platforms — BrokerPlatformTable */
    brokers: {
      groww:         'https://groww.in/',
      zerodhaCoin:   'https://zerodha.com/coin/',
      angelOneMf:    'https://www.angelone.in/mutual-funds',
      paytmMoney:    'https://www.paytmmoney.com/mutual-funds',
      etMoney:       'https://www.etmoney.com/mutual-funds',
      kuvera:        'https://kuvera.in/',
      upstoxMf:      'https://upstox.com/mutual-funds/',
      iciciDirectMf: 'https://www.icicidirect.com/mutual-funds',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     FD / RD / SAVINGS — FdRateTable
     Used by: fd-calculator, rd-calculator, simple-interest,
              compounding-calculator, inflation-calculator
     Source: BankBazaar Affiliate Program
     ═══════════════════════════════════════════════════════════════════ */
  fdRd: {
    primary: 'https://www.bankbazaar.com/fixed-deposit.html',

    /* FD banks — FdRateTable (mode="fd") */
    banks: {
      sbi:       'https://www.bankbazaar.com/fixed-deposit/sbi-fd-rates.html',
      hdfc:      'https://www.bankbazaar.com/fixed-deposit/hdfc-fd-rates.html',
      icici:     'https://www.bankbazaar.com/fixed-deposit/icici-fd-rates.html',
      axis:      'https://www.bankbazaar.com/fixed-deposit/axis-bank-fixed-deposit.html',
      kotak:     'https://www.bankbazaar.com/fixed-deposit/kotak-bank-fd-rates.html',
      idfcFirst: 'https://www.bankbazaar.com/fixed-deposit/idfc-first-bank-fixed-deposit.html',
      indusind:  'https://www.bankbazaar.com/fixed-deposit/indusind-bank-fd-rates.html',
      auSfb:     'https://www.bankbazaar.com/fixed-deposit/au-small-finance-bank-fixed-deposit.html',
    },

    /* RD banks — FdRateTable (mode="rd") */
    rdBanks: {
      sbi:       'https://www.bankbazaar.com/recurring-deposit/sbi-recurring-deposit.html',
      hdfc:      'https://www.bankbazaar.com/recurring-deposit/hdfc-recurring-deposit.html',
      icici:     'https://www.bankbazaar.com/recurring-deposit/icici-recurring-deposit.html',
      axis:      'https://www.bankbazaar.com/recurring-deposit/axis-bank-recurring-deposit.html',
      kotak:     'https://www.bankbazaar.com/recurring-deposit/kotak-recurring-deposit.html',
      idfcFirst: 'https://www.bankbazaar.com/recurring-deposit/idfc-first-bank-recurring-deposit.html',
      indusind:  'https://www.bankbazaar.com/recurring-deposit/indusind-bank-recurring-deposit.html',
      auSfb:     'https://www.bankbazaar.com/recurring-deposit/au-small-finance-bank-recurring-deposit.html',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     PENSION / GOVERNMENT SAVINGS — PensionProviderTable
     Used by: ppf-calculator, nsc-calculator, nps-calculator,
              epf-calculator, retirement-fire, gratuity-calculator
     Source: Cuelink (SBI, ICICI, HDFC, Axis, Groww, ETMoney, Zerodha)
     ═══════════════════════════════════════════════════════════════════ */
  pension: {
    /* PPF — scheme="ppf" */
    ppf: {
      sbi:        'https://www.onlinesbi.sbi/sbicollect/',
      icici:      'https://www.icicibank.com/personal-banking/investments/ppf-account',
      hdfc:       'https://www.hdfcbank.com/personal/save/accounts/ppf-account',
      axis:       'https://www.axisbank.com/retail/accounts/public-provident-fund-account',
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
    },

    /* NSC — scheme="nsc" */
    nsc: {
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
      sbi:        'https://sbi.co.in/web/personal-banking/investments-deposits/govt-schemes/nsc',
      bob:        'https://www.bankofbaroda.in/personal-banking/investments/national-savings-certificate',
    },

    /* NPS — scheme="nps" */
    nps: {
      groww:       'https://groww.in/nps',
      etMoney:     'https://www.etmoney.com/nps',
      nsdlEnps:    'https://enps.nsdl.com/eNPS/NationalPensionSystem.html',
      kfintech:    'https://enps.kfintech.com/login.html',
      hdfcPension: 'https://www.hdfcpension.com/',
    },

    /* EPF — scheme="epf" */
    epf: {
      epfoPortal: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      umang:      'https://web.umang.gov.in/web_new/home',
      passbook:   'https://passbook.epfindia.gov.in/MemberPassBook/Login',
    },

    /* Retirement / FIRE / Gratuity invest — scheme="retirement" */
    retirement: {
      groww:   'https://groww.in/mutual-funds/category/retirement-fund',
      zerodha: 'https://zerodha.com/coin/',
      etMoney: 'https://www.etmoney.com/mutual-funds/retirement',
      kuvera:  'https://kuvera.in/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     TAX FILING — TaxFilingTable
     Used by: old-vs-new-regime, new-income-tax-2526, new-income-tax-2425,
              old-income-tax, salary-calculator, hra-exemption
     Source: Cuelink (ClearTax) + direct for others
     ═══════════════════════════════════════════════════════════════════ */
  tax: {
    primary: 'https://cleartax.in/s/income-tax-return',
    services: {
      cleartax:   'https://cleartax.in/s/income-tax-return',
      taxbuddy:   'https://www.taxbuddy.com/',
      myitreturn: 'https://www.myitreturn.com/',
      quicko:     'https://quicko.com/',
      taxspanner: 'https://www.taxspanner.com/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     GST SOFTWARE — GstSoftwareTable
     Used by: gst-calculator
     Source: Cuelink (ClearTax) + Zoho Affiliate (Zoho Books)
     ═══════════════════════════════════════════════════════════════════ */
  gst: {
    primary: 'https://cleartax.in/s/gst-software',
    software: {
      cleartax:  'https://cleartax.in/s/gst-software',
      zohoBooks: 'https://www.zoho.com/in/books/gst-software/',
      tally:     'https://tallysolutions.com/gst/',
      marg:      'https://www.margerp.com/',
      busy:      'https://busy.in/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     STOCK BROKERS — StockBrokerTable
     Used by: brokerage-calculator, cagr-calculator
     Source: Cuelink
     ═══════════════════════════════════════════════════════════════════ */
  trading: {
    primary: 'https://zerodha.com/open-account',
    brokers: {
      zerodha:    'https://zerodha.com/open-account',
      groww:      'https://groww.in/open-demat-account',
      upstox:     'https://upstox.com/open-account/',
      angelOne:   'https://www.angelone.in/open-demat-account',
      iciciDirect:'https://secure.icicidirect.com/Customer/CustomerLogin.aspx',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     BUSINESS TOOLS — BusinessToolTable
     Used by: ppc-calculator (ads), break-even (accounting),
              profit-margin (accounting), working-capital (loans),
              dscr-calculator (loans)
     Source: Impact.com/Semrush, Zoho Affiliate, Cuelink
     ═══════════════════════════════════════════════════════════════════ */
  business: {
    /* variant="ads" — ppc-calculator */
    adTools: {
      googleAds:   'https://ads.google.com/intl/en_in/home/',
      metaAds:     'https://www.facebook.com/business/ads',
      semrush:     'https://www.semrush.com/',       /* ← Replace with Impact.com tracking URL */
      ahrefs:      'https://ahrefs.com/',
      ubersuggest: 'https://neilpatel.com/ubersuggest/',
    },

    /* variant="accounting" — break-even, profit-margin */
    accounting: {
      zohoBooks:  'https://www.zoho.com/in/books/',  /* ← Replace with Zoho Affiliate tracking URL */
      tally:      'https://tallysolutions.com/',
      quickbooks: 'https://quickbooks.intuit.com/in/',
      vyapar:     'https://vyaparapp.in/',
      khatabook:  'https://khatabook.com/',
    },

    /* variant="loans" — working-capital, dscr-calculator */
    loans: {
      bajaj:       'https://www.bajajfinserv.in/business-loan',
      hdfc:        'https://www.hdfcbank.com/sme/borrow/business-loans',
      lendingkart: 'https://www.lendingkart.com/',
      indifi:      'https://www.indifi.com/',
      flexiloans:  'https://flexiloans.com/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     HEALTH & FITNESS — HealthAppTable
     Used by: bmi-calculator
     Source: HealthKart Affiliate, Amazon Associates, Cuelink (Cult.fit)
     ═══════════════════════════════════════════════════════════════════ */
  health: {
    primary: 'https://www.healthifyme.com/',

    /* Fitness apps */
    apps: {
      healthifyMe:  'https://www.healthifyme.com/',
      cultFit:      'https://cult.fit/',
      myFitnessPal: 'https://www.myfitnesspal.com/',
      strava:       'https://www.strava.com/',
      fitbit:       'https://www.fitbit.com/global/in/home',
    },

    /* Shown when BMI < 18.5 (underweight) — Amazon Associates */
    massGainers: {
      muscleBlazeBeast: 'https://www.muscleblaze.com/mass-gainer/muscleblaze-beast-mass-gainer',
      optimumSerious:   'https://www.healthkart.com/on-optimum-nutrition-serious-mass/SKU-MFP9990',
      labradaMass:      'https://www.healthkart.com/labrada-muscle-mass-gainer/SKU-MFP9999',
      myProtein:        'https://www.myprotein.co.in/sports-nutrition/weight-gainers.list',
    },

    /* Shown when BMI > 25 (overweight/obese) — HealthKart Affiliate */
    weightLoss: {
      healthKartSlim:  'https://www.healthkart.com/slim-fit/c/MC30',
      saffolaFittify:  'https://www.saffolafittify.com/',
      mbProtein:       'https://www.muscleblaze.com/whey-protein',
      patanjaliDivya:  'https://www.patanjaliayurved.net/',
    },
  },

  /* ═══════════════════════════════════════════════════════════════════
     GENERAL / FALLBACK
     ═══════════════════════════════════════════════════════════════════ */
  general: {
    creditScore: 'https://www.bankbazaar.com/free-credit-score.html',
    bankbazaar:  'https://www.bankbazaar.com/',
    paisabazaar: 'https://www.paisabazaar.com/',
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   COMPLETE CALCULATOR → AFFILIATE KEY MAP  (all 39 calculators)
   ═══════════════════════════════════════════════════════════════════════

   LOANS & EMI (7 pages)
   ──────────────────────────────────────────────────────────────────────
   home-loan              BankRateTable (home)     → emi.banks.home.*         [via LoanCalcPage]
   car-loan               BankRateTable (car)      → emi.banks.car.*          [via LoanCalcPage]
   personal-loan          BankRateTable (personal) → emi.banks.personal.*     [via LoanCalcPage]
   educational-loan       BankRateTable (education)→ educationLoan.banks.*    [via LoanCalcPage]
   emi-calculator         BankRateTable (all tabs) → emi.banks.*              [via EMICalculator]
   home-loan-eligibility  BankRateTable (home)     → emi.banks.home.*
   loan-prepayment        BankRateTable (home)     → emi.banks.home.*
   interest-free-home-loan BrokerPlatformTable     → sip.brokers.*

   INVESTMENTS (8 pages)
   ──────────────────────────────────────────────────────────────────────
   sip-calculator         BrokerPlatformTable      → sip.brokers.* + sip.funds.*
   step-up-sip            BrokerPlatformTable      → sip.brokers.*
   goal-sip               BrokerPlatformTable      → sip.brokers.*
   lumpsum-calculator     BrokerPlatformTable      → sip.brokers.*
   swp-calculator         BrokerPlatformTable      → sip.brokers.*
   compounding-calculator FdRateTable (fd)         → fdRd.banks.*
   cagr-calculator        StockBrokerTable         → trading.brokers.*
   brokerage-calculator   StockBrokerTable         → trading.brokers.*

   SAVINGS & FIXED INCOME (8 pages)
   ──────────────────────────────────────────────────────────────────────
   fd-calculator          FdRateTable (fd)         → fdRd.banks.*
   rd-calculator          FdRateTable (rd)         → fdRd.rdBanks.*
   simple-interest        FdRateTable (fd)         → fdRd.banks.*
   ppf-calculator         PensionProviderTable     → pension.ppf.*
   nsc-calculator         PensionProviderTable     → pension.nsc.*
   nps-calculator         PensionProviderTable     → pension.nps.*
   epf-calculator         PensionProviderTable     → pension.epf.*
   inflation-calculator   FdRateTable (fd)         → fdRd.banks.*

   RETIREMENT & PLANNING (2 pages)
   ──────────────────────────────────────────────────────────────────────
   retirement-fire        PensionProviderTable     → pension.retirement.*
   gratuity-calculator    PensionProviderTable     → pension.retirement.*

   TAX (6 pages)
   ──────────────────────────────────────────────────────────────────────
   old-vs-new-regime      TaxFilingTable           → tax.services.*
   new-income-tax-2526    TaxFilingTable           → tax.services.*
   new-income-tax-2425    TaxFilingTable           → tax.services.*
   old-income-tax         TaxFilingTable           → tax.services.*
   salary-calculator      TaxFilingTable           → tax.services.*
   hra-exemption          TaxFilingTable           → tax.services.*

   BUSINESS (6 pages)
   ──────────────────────────────────────────────────────────────────────
   gst-calculator         GstSoftwareTable         → gst.software.*
   ppc-calculator         BusinessToolTable (ads)  → business.adTools.*
   break-even             BusinessToolTable (acct) → business.accounting.*
   profit-margin          BusinessToolTable (acct) → business.accounting.*
   working-capital        BusinessToolTable (loans)→ business.loans.*
   dscr-calculator        BusinessToolTable (loans)→ business.loans.*

   HEALTH (1 page)
   ──────────────────────────────────────────────────────────────────────
   bmi-calculator         HealthAppTable           → health.apps.* + (massGainers|weightLoss)

   ═══════════════════════════════════════════════════════════════════════
   LINKS TO REPLACE AFTER PROGRAM APPROVALS:
   ═══════════════════════════════════════════════════════════════════════
   ✅ Cuelink approved  → replace: sip.brokers.*, trading.brokers.*,
                          pension.nps.groww, pension.nps.etMoney,
                          pension.retirement.*, tax.services.cleartax,
                          business.loans.bajaj, business.accounting.vyapar,
                          business.accounting.khatabook, health.apps.cultFit
   ✅ BankBazaar approved → replace: emi.banks.*, homeLoan.*, carLoan.*,
                          personalLoan.*, educationLoan.banks.*,
                          fdRd.banks.*, fdRd.rdBanks.*
   ✅ Semrush approved   → replace: business.adTools.semrush
   ✅ Zoho approved      → replace: gst.software.zohoBooks,
                          business.accounting.zohoBooks
   ✅ HealthKart approved→ replace: health.weightLoss.healthKartSlim
   ✅ Amazon Associates  → replace: health.massGainers.*
   ═══════════════════════════════════════════════════════════════════════ */
