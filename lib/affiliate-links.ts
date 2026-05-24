/**
 * AFFILIATE LINKS — Single source of truth
 * ─────────────────────────────────────────
 * All affiliate/partner URLs for every calculator live here.
 * To update a link: change it in this file only — nowhere else.
 *
 * HOW TO USE IN A COMPONENT:
 *   import { AFFILIATE } from '@/lib/affiliate-links';
 *   <a href={AFFILIATE.emi.banks.home.sbi}>Apply</a>
 */

export const AFFILIATE = {

  /* ═════════════════════════════════════════════════════════════
     LOANS — EMI / Home / Car / Personal / Education
     ═════════════════════════════════════════════════════════════ */
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

  homeLoan: {
    primary:     'https://www.bankbazaar.com/home-loan.html',
    sbi:         'https://www.bankbazaar.com/home-loan/sbi-home-loan.html',
    hdfc:        'https://www.bankbazaar.com/home-loan/hdfc-home-loan.html',
    icici:       'https://www.bankbazaar.com/home-loan/icici-home-loan.html',
  },

  carLoan: {
    primary:     'https://www.bankbazaar.com/car-loan.html',
    hdfc:        'https://www.bankbazaar.com/car-loan/hdfc-bank-car-loan.html',
    sbi:         'https://www.bankbazaar.com/car-loan/sbi-car-loan.html',
  },

  personalLoan: {
    primary:     'https://www.bankbazaar.com/personal-loan.html',
    hdfc:        'https://www.bankbazaar.com/personal-loan/hdfc-personal-loan.html',
    bajaj:       'https://www.bankbazaar.com/personal-loan/bajaj-finserv-personal-loan.html',
  },

  educationLoan: {
    primary:     'https://www.bankbazaar.com/education-loan.html',
    banks: {
      sbi:       'https://www.bankbazaar.com/education-loan/sbi-education-loan.html',
      credila:   'https://www.bankbazaar.com/education-loan/hdfc-credila.html',
      avanse:    'https://www.avanse.com/',
      incred:    'https://www.incred.com/education-loan/',
      auxilo:    'https://www.auxilo.com/',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     SIP / MUTUAL FUNDS / INVESTMENT PLATFORMS
     ═════════════════════════════════════════════════════════════ */
  sip: {
    groww:       'https://groww.in/mutual-funds',
    zerodha:     'https://zerodha.com/coin/',
    paytmMoney:  'https://www.paytmmoney.com/mutual-funds',
    etMoney:     'https://www.etmoney.com/mutual-funds',
    primary:     'https://groww.in/mutual-funds',

    /* Top mutual funds — for SIP calculator's MutualFundTable */
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

    /* Investment platforms — for BrokerPlatformTable on SIP/Lumpsum/Goal-SIP etc. */
    brokers: {
      groww:        'https://groww.in/',
      zerodhaCoin:  'https://zerodha.com/coin/',
      angelOneMf:   'https://www.angelone.in/mutual-funds',
      paytmMoney:   'https://www.paytmmoney.com/mutual-funds',
      etMoney:      'https://www.etmoney.com/mutual-funds',
      kuvera:       'https://kuvera.in/',
      upstoxMf:     'https://upstox.com/mutual-funds/',
      iciciDirectMf:'https://www.icicidirect.com/mutual-funds',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     FD / RD / SIMPLE INTEREST — Bank deposits
     ═════════════════════════════════════════════════════════════ */
  fdRd: {
    primary:  'https://www.bankbazaar.com/fixed-deposit.html',

    banks: {
      sbi:        'https://www.bankbazaar.com/fixed-deposit/sbi-fd-rates.html',
      hdfc:       'https://www.bankbazaar.com/fixed-deposit/hdfc-fd-rates.html',
      icici:      'https://www.bankbazaar.com/fixed-deposit/icici-fd-rates.html',
      axis:       'https://www.bankbazaar.com/fixed-deposit/axis-bank-fixed-deposit.html',
      kotak:      'https://www.bankbazaar.com/fixed-deposit/kotak-bank-fd-rates.html',
      idfcFirst:  'https://www.bankbazaar.com/fixed-deposit/idfc-first-bank-fixed-deposit.html',
      indusind:   'https://www.bankbazaar.com/fixed-deposit/indusind-bank-fd-rates.html',
      auSfb:      'https://www.bankbazaar.com/fixed-deposit/au-small-finance-bank-fixed-deposit.html',
    },

    rdBanks: {
      sbi:        'https://www.bankbazaar.com/recurring-deposit/sbi-recurring-deposit.html',
      hdfc:       'https://www.bankbazaar.com/recurring-deposit/hdfc-recurring-deposit.html',
      icici:      'https://www.bankbazaar.com/recurring-deposit/icici-recurring-deposit.html',
      axis:       'https://www.bankbazaar.com/recurring-deposit/axis-bank-recurring-deposit.html',
      kotak:      'https://www.bankbazaar.com/recurring-deposit/kotak-recurring-deposit.html',
      idfcFirst:  'https://www.bankbazaar.com/recurring-deposit/idfc-first-bank-recurring-deposit.html',
      indusind:   'https://www.bankbazaar.com/recurring-deposit/indusind-bank-recurring-deposit.html',
      auSfb:      'https://www.bankbazaar.com/recurring-deposit/au-small-finance-bank-recurring-deposit.html',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     PENSION / GOVERNMENT SAVINGS (PPF, NSC, NPS, EPF, Retirement)
     ═════════════════════════════════════════════════════════════ */
  pension: {
    /* PPF — top providers (account opening) */
    ppf: {
      sbi:        'https://www.onlinesbi.sbi/sbicollect/',
      icici:      'https://www.icicibank.com/personal-banking/investments/ppf-account',
      hdfc:       'https://www.hdfcbank.com/personal/save/accounts/ppf-account',
      axis:       'https://www.axisbank.com/retail/accounts/public-provident-fund-account',
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
    },

    /* NSC — primarily through India Post */
    nsc: {
      postOffice: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx',
      sbi:        'https://sbi.co.in/web/personal-banking/investments-deposits/govt-schemes/nsc',
      bob:        'https://www.bankofbaroda.in/personal-banking/investments/national-savings-certificate',
    },

    /* NPS — Points of Presence (PoPs) for NPS account opening */
    nps: {
      groww:      'https://groww.in/nps',
      etMoney:    'https://www.etmoney.com/nps',
      nsdlEnps:   'https://enps.nsdl.com/eNPS/NationalPensionSystem.html',
      kfintech:   'https://enps.kfintech.com/login.html',
      hdfcPension:'https://www.hdfcpension.com/',
    },

    /* EPF — official + tracking tools */
    epf: {
      epfoPortal: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      umang:      'https://web.umang.gov.in/web_new/home',
      passbook:   'https://passbook.epfindia.gov.in/MemberPassBook/Login',
    },

    /* Retirement / FIRE — long-term MF platforms */
    retirement: {
      groww:      'https://groww.in/mutual-funds/category/retirement-fund',
      zerodha:    'https://zerodha.com/coin/',
      etMoney:    'https://www.etmoney.com/mutual-funds/retirement',
      kuvera:     'https://kuvera.in/',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     TAX — ITR filing services
     ═════════════════════════════════════════════════════════════ */
  tax: {
    primary:    'https://cleartax.in/s/income-tax-return',
    services: {
      cleartax:    'https://cleartax.in/s/income-tax-return',
      taxbuddy:    'https://www.taxbuddy.com/',
      myitreturn:  'https://www.myitreturn.com/',
      quicko:      'https://quicko.com/',
      taxspanner:  'https://www.taxspanner.com/',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     GST — accounting/filing software
     ═════════════════════════════════════════════════════════════ */
  gst: {
    primary:    'https://cleartax.in/s/gst-software',
    software: {
      cleartax:   'https://cleartax.in/s/gst-software',
      zohoBooks:  'https://www.zoho.com/in/books/gst-software/',
      tally:      'https://tallysolutions.com/gst/',
      marg:       'https://www.margerp.com/',
      busy:       'https://busy.in/',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     STOCK MARKET / TRADING — Brokerage account opening
     ═════════════════════════════════════════════════════════════ */
  trading: {
    primary:    'https://zerodha.com/open-account',
    brokers: {
      zerodha:    'https://zerodha.com/open-account',
      groww:      'https://groww.in/open-demat-account',
      upstox:     'https://upstox.com/open-account/',
      angelOne:   'https://www.angelone.in/open-demat-account',
      iciciDirect:'https://secure.icicidirect.com/Customer/CustomerLogin.aspx',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     BUSINESS — Ads, Accounting, Business Loans
     ═════════════════════════════════════════════════════════════ */
  business: {
    /* PPC / ad tools */
    adTools: {
      googleAds:    'https://ads.google.com/intl/en_in/home/',
      semrush:      'https://www.semrush.com/',
      ahrefs:       'https://ahrefs.com/',
      metaAds:      'https://www.facebook.com/business/ads',
      ubersuggest:  'https://neilpatel.com/ubersuggest/',
    },

    /* Accounting software (break-even, profit-margin) */
    accounting: {
      zohoBooks:    'https://www.zoho.com/in/books/',
      quickbooks:   'https://quickbooks.intuit.com/in/',
      tally:        'https://tallysolutions.com/',
      vyapar:       'https://vyaparapp.in/',
      khatabook:    'https://khatabook.com/',
    },

    /* Business loans (working-capital, DSCR) */
    loans: {
      hdfc:         'https://www.hdfcbank.com/sme/borrow/business-loans',
      bajaj:        'https://www.bajajfinserv.in/business-loan',
      lendingkart:  'https://www.lendingkart.com/',
      indifi:       'https://www.indifi.com/',
      flexiloans:   'https://flexiloans.com/',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     HEALTH — Fitness apps + protein/weight loss products
     ═════════════════════════════════════════════════════════════ */
  health: {
    primary:    'https://www.healthifyme.com/',

    apps: {
      healthifyMe:  'https://www.healthifyme.com/',
      cultFit:      'https://cult.fit/',
      myFitnessPal: 'https://www.myfitnesspal.com/',
      strava:       'https://www.strava.com/',
      fitbit:       'https://www.fitbit.com/global/in/home',
    },

    /* Mass gainers — recommended when BMI is low (underweight) */
    massGainers: {
      muscleBlazeBeast:   'https://www.muscleblaze.com/mass-gainer/muscleblaze-beast-mass-gainer',
      myProtein:          'https://www.myprotein.co.in/sports-nutrition/weight-gainers.list',
      labradaMass:        'https://www.healthkart.com/labrada-muscle-mass-gainer/SKU-MFP9999',
      optimumSerious:     'https://www.healthkart.com/on-optimum-nutrition-serious-mass/SKU-MFP9990',
    },

    /* Weight-loss products — recommended when BMI is high (overweight/obese) */
    weightLoss: {
      healthKartSlim:     'https://www.healthkart.com/slim-fit/c/MC30',
      saffolaFittify:     'https://www.saffolafittify.com/',
      patanjaliDivya:     'https://www.patanjaliayurved.net/',
      mbProtein:          'https://www.muscleblaze.com/whey-protein',
    },
  },

  /* ═════════════════════════════════════════════════════════════
     CREDIT SCORE / GENERAL FINANCIAL (fallback)
     ═════════════════════════════════════════════════════════════ */
  general: {
    creditScore: 'https://www.bankbazaar.com/free-credit-score.html',
    bankbazaar:  'https://www.bankbazaar.com/',
    paisabazaar: 'https://www.paisabazaar.com/',
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   QUICK REFERENCE — which calculator uses which section
   ─────────────────────────────────────────────────────────────────────────────
   emi-calculator            → AFFILIATE.emi (BankRateTable)
   home-loan                 → AFFILIATE.emi.banks.home (BankRateTable lockedLoanType=home)
   interest-free-home-loan   → AFFILIATE.emi.banks.home
   loan-prepayment           → AFFILIATE.emi.banks.home
   home-loan-eligibility     → AFFILIATE.emi.banks.home
   car-loan                  → AFFILIATE.emi.banks.car
   personal-loan             → AFFILIATE.emi.banks.personal
   educational-loan          → AFFILIATE.educationLoan.banks

   sip-calculator            → AFFILIATE.sip.funds + AFFILIATE.sip.brokers
   step-up-sip               → AFFILIATE.sip.brokers
   goal-sip                  → AFFILIATE.sip.brokers
   lumpsum-calculator        → AFFILIATE.sip.brokers
   swp-calculator            → AFFILIATE.sip.brokers
   compounding-calculator    → AFFILIATE.sip.brokers
   cagr-calculator           → AFFILIATE.sip.brokers
   inflation-calculator      → AFFILIATE.sip.brokers

   fd-calculator             → AFFILIATE.fdRd.banks
   rd-calculator             → AFFILIATE.fdRd.rdBanks
   simple-interest           → AFFILIATE.fdRd.banks

   ppf-calculator            → AFFILIATE.pension.ppf
   nsc-calculator            → AFFILIATE.pension.nsc
   nps-calculator            → AFFILIATE.pension.nps
   epf-calculator            → AFFILIATE.pension.epf
   retirement-fire           → AFFILIATE.pension.retirement

   old-vs-new-regime,
   new-income-tax-2526,
   new-income-tax-2425,
   old-income-tax,
   salary-calculator,
   hra-exemption,
   gratuity-calculator       → AFFILIATE.tax.services

   gst-calculator            → AFFILIATE.gst.software
   brokerage-calculator      → AFFILIATE.trading.brokers

   ppc-calculator            → AFFILIATE.business.adTools
   break-even, profit-margin → AFFILIATE.business.accounting
   working-capital, dscr     → AFFILIATE.business.loans

   bmi-calculator            → AFFILIATE.health.apps + (massGainers|weightLoss based on BMI)
   ─────────────────────────────────────────────────────────────────────────── */
