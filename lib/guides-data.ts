export interface GuideSection {
  heading: string;
  content: string[];
  callout?: { type: 'tip' | 'info' | 'warning'; text: string };
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string;
  readingTime: number;
  tags: string[];
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  relatedCalculatorIds: string[];
}

export const guides: Guide[] = [
  {
    slug: 'tax-saving-guide-2025-26',
    title: 'How to Save Tax in FY 2025-26: Complete Guide',
    description:
      'A practical, numbers-first guide to saving income tax in FY 2025-26 under both old and new regimes. Covers 80C, HRA, NPS, home loan, and the best deductions for salaried individuals.',
    publishDate: '2026-02-01',
    updatedDate: '2026-05-20',
    readingTime: 9,
    tags: ['income tax', 'tax saving', '80C', 'new regime', 'FY 2025-26'],
    intro:
      'With the Union Budget 2025-26 raising the new regime rebate limit to Rs 12 lakh, millions of salaried individuals now pay zero tax — yet many are still making suboptimal choices. This guide walks you through every major tax-saving instrument available in FY 2025-26, when to pick the old regime over the new one, and the exact calculations you need to decide.',
    sections: [
      {
        heading: 'Old Regime vs New Regime: The Break-Even Income',
        content: [
          'The new tax regime applies rates of 0% up to Rs 4 lakh, 5% (Rs 4-8 lakh), 10% (Rs 8-12 lakh), 15% (Rs 12-16 lakh), 20% (Rs 16-20 lakh), 25% (Rs 20-24 lakh), and 30% above Rs 24 lakh. The Rs 12 lakh rebate under Section 87A means zero tax liability up to Rs 12 lakh of taxable income.',
          'The old regime offers the same slab rates as before with a wider set of deductions. The regime that saves you more tax depends on the total value of deductions you can legitimately claim. For most people with a salary below Rs 10 lakh and limited deductions, the new regime wins outright. Above Rs 15 lakh, the decision requires a careful comparison.',
          'Rule of thumb: if your total deductions (80C + HRA + home loan interest + NPS + others) exceed Rs 3.5-4 lakh annually, the old regime is likely better. Use the Old vs New Regime calculator below to run your exact numbers.',
        ],
        callout: { type: 'tip', text: 'Use our Old vs New Regime Calculator to compare both regimes side-by-side with your actual salary and deductions before filing.' },
      },
      {
        heading: 'Section 80C — The Rs 1.5 Lakh Deduction',
        content: [
          'Section 80C allows a deduction of up to Rs 1.5 lakh per year from taxable income. This is only available under the old regime. The most popular 80C instruments are ELSS mutual funds (3-year lock-in, market-linked returns historically 12-15%), EPF employee contribution (mandatory for salaried), PPF (15-year tenure, 7.1% guaranteed), NSC (5-year lock-in, 7.7%), tax-saving FD (5-year lock-in, 6.5-7.5% from banks), and life insurance premium (LIC/term plans).',
          'ELSS is the preferred 80C option for most investors below 50 years because it has the shortest lock-in (3 years) and the highest expected returns. PPF suits risk-averse investors who want guaranteed returns. EPF contributions are already compulsory for most employees and should be counted toward the Rs 1.5 lakh limit before deciding on additional instruments.',
          'Important: If the standard deduction plus 80C plus HRA alone adds up to more than Rs 3.75 lakh, the old regime almost always beats the new regime for incomes up to Rs 20 lakh.',
        ],
      },
      {
        heading: 'HRA Exemption — Often the Biggest Deduction',
        content: [
          'House Rent Allowance (HRA) exemption is calculated as the minimum of: (i) actual HRA received from employer, (ii) 50% of basic salary (40% for non-metro cities), or (iii) actual rent paid minus 10% of basic salary.',
          'For a person with a basic salary of Rs 6 lakh/year living in Mumbai and paying Rs 25,000/month rent: HRA received = Rs 2.4 lakh; 50% of basic = Rs 3 lakh; rent - 10% basic = Rs 3 lakh - Rs 60,000 = Rs 2.4 lakh. The exemption is Rs 2.4 lakh (the minimum of the three). This is the single biggest deduction available to urban salaried employees.',
          'You cannot claim HRA exemption if you own a home in the city you live in, or if you live with your parents rent-free. If you are paying rent to a parent, ensure rent receipts are maintained and the parent declares the income.',
        ],
        callout: { type: 'info', text: 'Use our HRA Exemption Calculator to calculate your exact exempt HRA amount and the tax saved for FY 2025-26.' },
      },
      {
        heading: 'Section 80D — Health Insurance Deduction',
        content: [
          'Under the old regime, health insurance premiums are deductible up to Rs 25,000 per year for self, spouse and children (Rs 50,000 if you or your spouse is a senior citizen). An additional Rs 25,000 is allowed for premiums paid for parents (Rs 50,000 if parents are senior citizens). Maximum combined deduction: Rs 1 lakh for those with senior citizen parents.',
          'At a 30% tax bracket, Rs 1 lakh of 80D deduction saves Rs 30,900 (including 4% cess) in tax. Health insurance is a mandatory financial purchase regardless — the tax saving makes it even more compelling.',
        ],
      },
      {
        heading: 'NPS — Extra Rs 50,000 Under Section 80CCD(1B)',
        content: [
          'NPS (National Pension System) offers an additional deduction of Rs 50,000 per year under Section 80CCD(1B), over and above the Rs 1.5 lakh 80C limit. This is particularly powerful for those in the 30% bracket: Rs 50,000 deduction = Rs 15,450 tax saved annually.',
          'The employer contribution to NPS (up to 10% of basic salary) is deductible under 80CCD(2) even in the new regime — making NPS uniquely valuable regardless of which regime you choose. If your employer offers NPS as a CTC component, this is the single best tax optimisation available in FY 2025-26.',
          'Drawback: NPS has a longer lock-in (until age 60) and mandates annuitization of 40% of the corpus at maturity. Use our NPS calculator to model the corpus and pension you would receive.',
        ],
        callout: { type: 'tip', text: 'If your employer offers restructuring of CTC into NPS employer contribution, use it — it saves tax under both old and new regimes.' },
      },
      {
        heading: 'Home Loan Deductions',
        content: [
          'For self-occupied property, Section 24(b) allows deduction of up to Rs 2 lakh on home loan interest per year under the old regime. The principal repayment (up to Rs 1.5 lakh) is covered under Section 80C. Combined, a home loan with EMIs above Rs 40,000/month will likely generate deductions exceeding Rs 3.5 lakh annually.',
          'For a joint home loan, both co-borrowers can independently claim these deductions — effectively doubling the benefit for working couples. The property must be self-occupied or the full interest can be deducted for let-out property (with a cap on total loss set-off).',
          'Under the new regime, home loan interest deduction for self-occupied property is not available. This alone can make the old regime significantly better for home loan borrowers.',
        ],
      },
      {
        heading: 'Tax-Saving Checklist for FY 2025-26',
        content: [
          'Step 1: Determine your gross taxable salary after standard deduction of Rs 75,000. Step 2: List all available deductions — 80C investments, HRA, 80D premiums, NPS, home loan interest. Step 3: Run both regime comparisons using the calculator. Step 4: If old regime wins, ensure all instruments are fully invested by 31 March 2026. Step 5: Submit investment proofs to your employer by January-February 2026 to reduce TDS.',
          'Common mistakes: Not investing the full Rs 1.5 lakh 80C limit (EPF alone rarely fills it), not tracking HRA rent receipts, missing the 80CCD(1B) NPS Rs 50,000 deduction, and filing under the wrong regime after the year ends.',
        ],
        callout: { type: 'warning', text: 'The regime choice once made at the start of the year cannot be changed mid-year for salaried individuals. Choose carefully based on projected annual income and deductions.' },
      },
    ],
    faqs: [
      { q: 'Should I choose old or new regime for FY 2025-26?', a: 'If your total deductions (80C + HRA + home loan + 80D + NPS) exceed Rs 3.5 lakh, the old regime usually saves more tax. For income below Rs 12 lakh with few deductions, the new regime is simpler and tax-free due to the Section 87A rebate.' },
      { q: 'Can I claim both HRA and home loan deductions?', a: 'Yes — if you own a home in one city but work and rent in another city, you can claim both HRA exemption on rent paid and home loan interest deduction on the loan for the owned property. Both deductions are only available under the old regime.' },
      { q: 'Is ELSS better than PPF for 80C?', a: 'ELSS offers higher expected returns (12-15% historical) and a shorter 3-year lock-in, but returns are market-linked. PPF offers 7.1% guaranteed with 15-year tenure and is EEE-exempt (invest, grow, withdraw all tax-free). For someone under 45 with a long horizon, ELSS is usually the better choice for 80C investments.' },
      { q: 'What is the last date to make tax-saving investments for FY 2025-26?', a: '31 March 2026 is the last date. However, for PPF, the investment must be made before 5th of the month to earn interest for that month. For ELSS and NPS, transactions can be made until 31 March 2026 end of business.' },
    ],
    relatedCalculatorIds: ['old-vs-new-regime', 'new-income-tax-2526', 'old-income-tax', 'hra-exemption', 'salary-calculator', 'nps-calculator'],
  },

  {
    slug: 'sip-vs-lumpsum',
    title: 'SIP vs Lumpsum: Which Investment Strategy Builds More Wealth?',
    description:
      'A data-driven comparison of SIP and lumpsum mutual fund investments. Understand when each strategy wins, rupee cost averaging explained, and how to choose based on your income type.',
    publishDate: '2026-01-10',
    updatedDate: '2026-05-15',
    readingTime: 8,
    tags: ['SIP', 'lumpsum', 'mutual fund', 'rupee cost averaging', 'investment'],
    intro:
      'The Rs 58,000 crore monthly SIP flow into Indian mutual funds tells you one thing: systematic investment plans have become the default investment habit for Indian retail investors. But is SIP always the better strategy? The honest answer is — it depends entirely on market conditions, your income structure, and your investment timeline. This guide gives you the framework to decide.',
    sections: [
      {
        heading: 'The Core Difference: Timing vs Discipline',
        content: [
          'A lumpsum investment deploys all your capital at once. A SIP spreads it across equal instalments, monthly or quarterly. The mathematical difference is significant: a Rs 12 lakh lumpsum invested in January earns returns on the full Rs 12 lakh from day one. A SIP of Rs 1 lakh/month over 12 months earns returns progressively — the 12th instalment earns returns for only one month.',
          'In a market that rises consistently through the year, the lumpsum almost always wins — because it had more capital deployed for longer. In a volatile or declining market, SIP wins because you buy more units when prices fall (rupee cost averaging), lowering your average purchase price.',
          'Historical data from Indian equity markets suggests: lumpsum outperforms SIP in about 60% of rolling 3-year periods, SIP outperforms in approximately 40% — precisely the periods when the market fell after the lumpsum was deployed.',
        ],
        callout: { type: 'info', text: 'Use our SIP Calculator and Lumpsum Calculator side-by-side to compare the final corpus for different market return scenarios.' },
      },
      {
        heading: 'Rupee Cost Averaging: What It Actually Means',
        content: [
          'When you invest Rs 5,000/month and the NAV falls from Rs 50 to Rs 40, you buy 125 units in the cheaper month vs 100 units in the expensive month. Your average cost per unit is lower than if you had bought all units at Rs 50. This is rupee cost averaging.',
          'The benefit only materialises if prices recover after the dip. In a market that keeps falling (like a prolonged bear market), SIP still results in a loss — just a smaller one than a lumpsum. The advantage of SIP is not that it guarantees profits; it is that it reduces the impact of bad timing on large capital deployments.',
          'For this reason, a common strategy is SIP for regular income (monthly salary) and lumpsum for windfalls (bonus, inheritance, asset sale proceeds). This maximises deployment speed for large sums while building discipline for regular income.',
        ],
      },
      {
        heading: 'When Lumpsum Is Clearly Better',
        content: [
          'After a significant market correction (20%+ decline from peak), deploying a lumpsum has historically produced strong 3-5 year returns. In March 2020 (Covid crash), a lumpsum in Nifty 50 index funds returned approximately 105% in the following 2 years. A SIP over the same period returned approximately 75%.',
          'If you have a large investable surplus and a long time horizon (10+ years), a lumpsum removes timing risk through time itself — staying invested through multiple market cycles typically averages out entry point differences.',
          'Lumpsum also makes sense for debt funds, where market volatility is lower and rupee cost averaging provides minimal benefit. A large FD maturity, gratuity payout, or bonus is better deployed as a lumpsum in a liquid fund or a short-duration debt fund than spread over 12 months.',
        ],
        callout: { type: 'tip', text: 'If you have a large lumpsum but are nervous about market timing, consider a Systematic Transfer Plan (STP): invest the lumpsum in a liquid fund and automatically transfer a fixed amount monthly into an equity fund.' },
      },
      {
        heading: 'Step-Up SIP: The Best of Both Strategies',
        content: [
          'A step-up SIP (or top-up SIP) automatically increases your monthly SIP amount by a fixed percentage every year. A Rs 5,000/month SIP increased by 10% annually grows to Rs 8,053/month by year 6. The corpus at the end of 20 years is approximately 1.9x larger than a flat Rs 5,000 SIP at the same 12% return assumption.',
          'Step-up SIPs work for salaried individuals whose income grows annually. They match investment growth to income growth, preventing lifestyle inflation from eroding savings rate. Most AMCs and platforms (Groww, Zerodha Coin) allow step-up SIP setup at no extra cost.',
        ],
        callout: { type: 'tip', text: 'Use our Step-Up SIP Calculator to see how much extra corpus a 10% annual increase builds compared to a flat SIP.' },
      },
      {
        heading: 'SIP vs Lumpsum: Decision Framework',
        content: [
          'Choose SIP when: (1) your investable surplus comes as monthly salary; (2) you have no strong view on market levels; (3) you want to enforce investment discipline; (4) markets are near all-time highs (limited margin of safety for lumpsum).',
          'Choose lumpsum when: (1) you have received a large one-time amount (bonus, gratuity, inheritance); (2) the market has corrected significantly from recent highs; (3) you are investing in debt or hybrid funds; (4) you have a very long horizon (15+ years) and can stay invested through volatility.',
          'Combine both when: (1) you have a monthly salary and periodically receive bonuses; (2) you want to accelerate corpus building after a market correction; (3) you are nearing a financial goal and want to top up a SIP with a lumpsum to bridge the gap.',
        ],
      },
      {
        heading: 'The Numbers: Rs 1 Crore in 15 Years',
        content: [
          'To accumulate Rs 1 crore in 15 years at 12% CAGR: you need a monthly SIP of approximately Rs 25,000, a lumpsum today of approximately Rs 18.3 lakh, or a step-up SIP starting at Rs 14,000/month stepped up 10% annually.',
          'The lumpsum option requires the largest single payment but the smallest total outgo. The flat SIP requires the highest total outgo (Rs 45 lakh deployed). The step-up SIP is typically the most practical for salaried individuals whose income grows over time.',
        ],
      },
    ],
    faqs: [
      { q: 'Is SIP better than FD for long-term wealth creation?', a: 'For a 10+ year horizon, equity SIP has historically outperformed FDs significantly. Nifty 50 has delivered approximately 12% CAGR over the past 20 years vs FD rates of 6-7%. However, SIP returns are not guaranteed — in any given 3-year period, SIP can underperform FDs. For goals beyond 7 years, equity SIP is almost always the better choice historically.' },
      { q: 'Can I do both SIP and lumpsum in the same fund?', a: 'Yes, you can invest a lumpsum into a mutual fund and simultaneously run a SIP in the same scheme. Many investors do this — they invest their annual bonus as a lumpsum and continue monthly SIPs from salary. The fund does not differentiate between the two; units are simply added at prevailing NAV.' },
      { q: 'What is the minimum SIP amount?', a: 'Most large-cap and index funds allow SIPs starting at Rs 100-500/month. Platforms like Groww and Zerodha Coin allow Rs 100 minimums. There is no maximum limit. The minimum for a meaningful wealth accumulation goal is typically Rs 2,000-5,000/month.' },
      { q: 'How is SIP taxed compared to a lumpsum?', a: 'Each SIP instalment is treated as a separate investment with its own purchase date. For equity funds: units held over 1 year attract LTCG at 12.5% on gains above Rs 1.25 lakh/year; units held under 1 year attract STCG at 20%. For a lumpsum, all units share the same purchase date — so after 1 year, the entire gain may qualify for LTCG treatment. This gives lumpsum a slight tax-timing advantage in some cases.' },
    ],
    relatedCalculatorIds: ['sip-calculator', 'lumpsum-calculator', 'step-up-sip', 'goal-sip'],
  },

  {
    slug: 'home-loan-vs-rent',
    title: 'Home Loan vs Rent: The Numbers-Based Decision Guide',
    description:
      'Should you buy a home or keep renting? This guide uses actual numbers — EMI, rent, opportunity cost, appreciation, and tax savings — to give you a framework that works for your city and income.',
    publishDate: '2026-01-20',
    updatedDate: '2026-05-18',
    readingTime: 10,
    tags: ['home loan', 'rent vs buy', 'EMI', 'real estate', 'property'],
    intro:
      'Buying a home is the single largest financial decision most Indians make. Yet the "rent vs buy" debate is usually settled by emotion ("owning is better than throwing money on rent") rather than numbers. This guide builds the full financial picture — using actual costs, opportunity cost of capital, tax benefits, and realistic appreciation assumptions — so you can make an informed decision.',
    sections: [
      {
        heading: 'The True Cost of Owning a Home',
        content: [
          'The monthly EMI is only the beginning. The full cost of homeownership includes: (1) EMI (principal + interest), (2) property maintenance and repairs (budget 1-2% of property value per year), (3) property tax (0.1-0.5% of value per year in most Indian cities), (4) society maintenance charges (Rs 2,000-8,000/month for apartments), (5) registration and stamp duty paid upfront (5-7% of property value), and (6) the opportunity cost of the down payment.',
          'On a Rs 80 lakh apartment with 20% down payment: EMI on Rs 64 lakh at 8.5% for 20 years = Rs 56,100/month. Down payment = Rs 16 lakh. Stamp duty + registration + interior = approximately Rs 7-8 lakh. Total upfront cash outgo: Rs 24 lakh. Monthly outgo: Rs 56,100 EMI + Rs 3,000 maintenance = Rs 59,100/month.',
          'Compare this to renting a similar apartment in the same area. In most Indian tier-1 cities, a Rs 80 lakh apartment typically rents for Rs 18,000-28,000/month. The monthly cost difference (EMI + maintenance vs rent) is Rs 30,000-40,000/month for the owner.',
        ],
        callout: { type: 'info', text: 'Use our Home Loan EMI Calculator to compute your exact monthly EMI, total interest paid, and year-wise principal balance for any property price and loan amount.' },
      },
      {
        heading: 'Opportunity Cost: The Hidden Factor',
        content: [
          'The Rs 24 lakh down payment, if invested in equity mutual funds at 12% CAGR instead of the down payment, would grow to Rs 73 lakh in 10 years and Rs 2.2 crore in 20 years. This is the opportunity cost of buying.',
          'Similarly, the monthly cash flow difference (EMI + costs minus rent = approximately Rs 35,000/month in our example) invested in a SIP at 12% CAGR for 20 years would accumulate to approximately Rs 3.5 crore. The renter who deploys the savings into equity can theoretically be wealthier than the buyer.',
          'This calculation assumes property appreciation. If the Rs 80 lakh property appreciates at 6% CAGR, it is worth Rs 2.57 crore in 20 years. The owner pays off the loan, has Rs 2.57 crore in property (net of loan) plus the psychological security of ownership. The renter has Rs 3.5 crore in mutual funds (from monthly savings) plus the Rs 73 lakh from the down payment. The renter comes out financially ahead — but lives with rental insecurity.',
        ],
        callout: { type: 'tip', text: 'The rent vs buy decision is ultimately about whether property appreciation in your target area exceeds equity returns, plus the value you place on ownership stability.' },
      },
      {
        heading: 'Tax Benefits of Home Ownership',
        content: [
          'Under the old tax regime, a home loan provides: Section 24(b) deduction of up to Rs 2 lakh/year on interest, and Section 80C deduction of up to Rs 1.5 lakh/year on principal repayment. For a first-time home buyer with a loan up to Rs 35 lakh on a property below Rs 50 lakh, Section 80EEA allows an additional Rs 1.5 lakh on interest (though this benefit ended in FY 2022-23 and has not been renewed).',
          'On a Rs 64 lakh loan at 8.5%: year 1 interest = Rs 5.3 lakh. The tax deduction is capped at Rs 2 lakh. At 30% tax bracket, this saves Rs 62,400/year = Rs 5,200/month. Principal repayment in year 1 = Rs 1.2 lakh (below the Rs 1.5 lakh 80C cap). At 30%, saves another Rs 37,440/year.',
          'Combined tax saving: approximately Rs 1 lakh/year or Rs 8,300/month. This meaningfully reduces the effective cost of EMI but does not fully close the gap with rental costs in tier-1 cities.',
        ],
      },
      {
        heading: 'When Buying Makes More Sense',
        content: [
          'Buying is clearly better when: (1) you plan to stay in the same city for 10+ years; (2) property prices in your target area have historically appreciated at 7%+ CAGR; (3) the property is in a location with strong rental demand (in case you need to relocate); (4) the rent-to-price ratio is favourable (EMI not more than 1.5x the rent for comparable property); (5) you have a stable dual income that easily covers the EMI.',
          'In cities like Mumbai and Delhi where rent yields are 2-3% of property value, the math rarely favours buying purely on financial grounds. In cities like Hyderabad, Pune, or Chennai where rent yields are 3.5-4.5% and appreciation has been strong, the buy vs rent calculus is much closer.',
        ],
      },
      {
        heading: 'When Renting Makes More Sense',
        content: [
          'Renting is clearly better when: (1) your career may require relocation in the next 5 years; (2) you are early in your career and the EMI would strain monthly cash flow; (3) property prices in your target area are at historical highs with low rental yields; (4) your down payment can earn 12%+ in equity markets; (5) you are in a city primarily for work and not for long-term settlement.',
          'The Rs 24 lakh down payment diverted to equity SIP at 20 years generates wealth far exceeding what most mid-segment properties appreciate to in India. The psychological value of ownership is real, but so is financial flexibility.',
        ],
        callout: { type: 'warning', text: 'Never stretch your EMI to more than 35-40% of take-home salary. Overleveraging on property in early career years limits your ability to invest in other financial assets and builds wealth slower, not faster.' },
      },
      {
        heading: 'A Practical Framework for the Decision',
        content: [
          'Step 1: Calculate your realistic EMI at current rates (8.5-9% for home loans) using the EMI calculator. Ensure it is below 40% of take-home salary. Step 2: Find a comparable rental for the property you want to buy. Calculate the monthly gap (EMI + costs minus rent). Step 3: Estimate property appreciation at 5-7% CAGR over your intended horizon. Step 4: Calculate what the down payment and monthly savings gap would grow to if invested at 12% equity returns. Step 5: If property value at horizon > equity corpus at horizon, buying wins financially. Otherwise, consider your non-financial preference for stability.',
          'Most people underweight tenure. If you stay for 3-5 years, renting almost always wins. At 10-15 years in a growing Indian city, buying often wins — especially if the property was purchased at reasonable valuations.',
        ],
      },
    ],
    faqs: [
      { q: 'What is a good price-to-rent ratio for buying a home in India?', a: 'A price-to-rent ratio (annual rent divided by property value) of 3.5-4.5% is generally considered fair value in India. Below 2.5%, buying is expensive relative to renting (common in Mumbai and Delhi). Above 4%, buying offers better value. Calculate: if a property rents for Rs 25,000/month, a fair purchase price is Rs 25,000 x 12 / 0.04 = Rs 75 lakh.' },
      { q: 'Should I prepay my home loan or invest in SIP?', a: 'Compare your loan interest rate vs expected equity returns. If your home loan rate is 8.5% and you expect 12%+ from equity SIP, investing the surplus in SIP generates more wealth. But prepayment offers a guaranteed return equal to your loan rate and reduces EMI burden — psychologically valuable. A 50-50 split (half to prepayment, half to SIP) is a balanced approach. Use our Loan Prepayment Calculator to model how prepayments reduce tenure.' },
      { q: 'Can I claim both HRA and home loan deductions?', a: 'Yes, if you own a home in one city and rent in another (e.g., you own a flat in your hometown but rent in a city for work), you can claim both HRA exemption on rent paid and home loan deduction (Section 24b interest + 80C principal). Both benefits are only available under the old regime.' },
      { q: 'How much down payment should I make on a home?', a: 'The minimum is typically 20% of property value (banks fund up to 80%). A larger down payment reduces EMI and total interest paid. However, do not deplete your emergency fund or investment savings for a larger down payment. A practical target: 20-25% down payment, keeping 6 months of expenses as emergency fund, and a reasonable SIP running simultaneously.' },
    ],
    relatedCalculatorIds: ['home-loan', 'emi-calculator', 'loan-prepayment', 'home-loan-eligibility', 'sip-calculator'],
  },

  {
    slug: 'ppf-vs-elss-vs-nps',
    title: 'PPF vs ELSS vs NPS: Best Tax-Saving Investments in 2025-26',
    description:
      'A head-to-head comparison of PPF, ELSS, and NPS for tax saving under Section 80C and 80CCD. Includes returns, lock-in, tax treatment, and the right allocation strategy for different investor profiles.',
    publishDate: '2026-02-05',
    updatedDate: '2026-05-20',
    readingTime: 8,
    tags: ['PPF', 'ELSS', 'NPS', '80C', 'tax saving', 'investment'],
    intro:
      'Every salaried Indian has Rs 1.5 lakh of Section 80C space to fill. But with PPF, ELSS, NPS, EPF, NSC, tax-saving FDs and life insurance all competing for the same bucket, which combination actually builds the most wealth while saving the most tax? This guide compares the three most important instruments — PPF, ELSS, and NPS — with actual numbers for FY 2025-26.',
    sections: [
      {
        heading: 'Quick Comparison: PPF vs ELSS vs NPS',
        content: [
          'PPF (Public Provident Fund): Government-backed, 7.1% interest (reviewed quarterly), 15-year lock-in with partial withdrawals from year 7. Contributions up to Rs 1.5 lakh qualify for 80C. Interest and maturity amount are completely tax-free (EEE). Maximum Rs 1.5 lakh/year. Risk: zero.',
          'ELSS (Equity-Linked Saving Scheme): Market-linked mutual fund, historical CAGR 12-15% over 10+ years, 3-year lock-in (shortest among 80C options). 80C deduction on contribution up to Rs 1.5 lakh. Returns taxed as LTCG at 12.5% above Rs 1.25 lakh/year on redemption. Risk: high (equity).',
          'NPS (National Pension System): Market-linked (60-75% equity, 25-40% debt), historical returns 10-12% for equity allocation, lock-in until age 60. Section 80CCD(1B) allows Rs 50,000 extra deduction beyond 80C limit. At maturity: 60% can be withdrawn (partially taxable), 40% must be annuitised. Risk: medium (hybrid).',
        ],
        callout: { type: 'info', text: 'Use our PPF Calculator and NPS Calculator to model the exact corpus each instrument builds over your target horizon.' },
      },
      {
        heading: 'PPF: The Safe Anchor',
        content: [
          'Rs 1.5 lakh invested annually in PPF for 15 years at 7.1% grows to approximately Rs 40 lakh, entirely tax-free. This is the guaranteed, risk-free alternative to ELSS. The key advantage is the EEE status — even the interest income is tax-free, unlike FDs or bonds where interest is taxable.',
          'PPF is ideal for: investors with low risk tolerance, those within 15-20 years of a financial goal requiring capital safety, and as the debt allocation in a portfolio for those already investing in equity via ELSS or direct stocks.',
          'Limitation: the 15-year lock-in is long, and the account cannot be prematurely closed (only partial withdrawals from year 7). Interest rate is government-controlled and has been declining from 8.7% in 2013 to the current 7.1%. Future rate cuts remain a risk.',
        ],
      },
      {
        heading: 'ELSS: The Wealth Compounder',
        content: [
          'For an investor with a 10+ year horizon, ELSS historically generates the highest post-tax returns among all 80C instruments. Rs 1.5 lakh/year in a top ELSS fund over 15 years at 13% CAGR = approximately Rs 74 lakh (vs PPF Rs 40 lakh). Even after 12.5% LTCG tax on gains above Rs 1.25 lakh/year, ELSS significantly outperforms PPF for long-term investors.',
          'The 3-year lock-in is the shortest of any 80C instrument. After 3 years, you can redeem (though long-term holding maximises returns and tax efficiency). ELSS units redeemed at a loss can offset gains elsewhere — a tax loss harvesting advantage not available with PPF.',
          'Top ELSS funds (by consistency): Mirae Asset Tax Saver, Axis Long Term Equity, Canara Robeco Equity Tax Saver, Quant Tax Plan. Always check rolling 5-year and 10-year returns, not just 1-year returns.',
        ],
        callout: { type: 'tip', text: 'If you have 10+ years and moderate to high risk tolerance, allocate the majority of your 80C to ELSS. Keep PPF for the debt component or for risk-averse near-term goals.' },
      },
      {
        heading: 'NPS: The Retirement-Specific Tax Booster',
        content: [
          'NPS is not an 80C instrument — it operates under Sections 80CCD(1), 80CCD(1B), and 80CCD(2). The key feature is 80CCD(1B): an additional Rs 50,000 deduction per year, entirely outside the Rs 1.5 lakh 80C cap. At a 30% tax bracket, this saves Rs 15,450/year (Rs 1.55 lakh over 10 years, just on the tax saving).',
          'Employer NPS contributions under 80CCD(2) (up to 10% of basic + DA) are deductible even under the new regime — making NPS the only EEE-adjacent instrument that works for new regime taxpayers with high salaries.',
          'The downside: lock-in until 60, compulsory annuity on 40% of corpus, and the annuity income is taxable. For someone at age 30 investing in NPS, the money is locked for 30 years. ELSS with a 3-year lock-in offers far more flexibility for the same return profile.',
        ],
        callout: { type: 'warning', text: 'If you are below 40 and primarily investing for wealth creation (not specifically retirement), ELSS is usually the better choice over NPS because of liquidity. Use NPS specifically for the Rs 50,000 extra 80CCD(1B) deduction.' },
      },
      {
        heading: 'The Optimal 80C Strategy for Different Profiles',
        content: [
          'Conservative investor (age 50+, low risk): Max PPF (Rs 1.5 lakh) + NSC or tax-saving FD as backup. Avoid ELSS if within 5 years of major financial goal.',
          'Balanced investor (age 35-50): Rs 75,000 ELSS + Rs 75,000 PPF. Maintain equity growth with a safety buffer. Add NPS Rs 50,000 via 80CCD(1B) for extra deduction.',
          'Aggressive investor (age 25-35, long horizon): Rs 1.5 lakh ELSS for maximum equity exposure. Add NPS Rs 50,000 for the 80CCD(1B) benefit. Check whether EPF employer contribution already fills part of the Rs 1.5 lakh 80C space.',
          'Important: EPF mandatory contribution should always be counted first. If EPF already uses Rs 80,000 of your 80C space, only Rs 70,000 more is needed from ELSS/PPF to fill the limit.',
        ],
      },
      {
        heading: 'Post-Tax Return Comparison Over 15 Years',
        content: [
          'Assuming Rs 1.5 lakh/year: PPF at 7.1% for 15 years = Rs 40.7 lakh (fully tax-free). ELSS at 13% CAGR for 15 years = approximately Rs 74 lakh pre-tax, approximately Rs 67 lakh post-tax (estimate after 12.5% LTCG on gains). NPS equity allocation at 11% CAGR for 15 years = approximately Rs 58 lakh pre-withdrawal-tax, approximately Rs 50-55 lakh effective after annuity and tax rules.',
          'The wealth gap between ELSS and PPF over 15 years is approximately Rs 26 lakh on just Rs 1.5 lakh/year investment — compounded market returns clearly dominate for long-horizon investors willing to accept equity risk.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I invest in PPF, ELSS, and NPS simultaneously?', a: 'Yes. Many investors use all three: ELSS for the bulk of the Rs 1.5 lakh 80C allocation, PPF for safe long-term saving and emergency backup, and NPS for the additional Rs 50,000 80CCD(1B) deduction. The total potential tax deduction is Rs 2 lakh (1.5 lakh 80C + 50,000 80CCD(1B)), saving up to Rs 62,400/year at the 30% tax bracket.' },
      { q: 'Is PPF interest rate guaranteed for 15 years?', a: 'No. The PPF interest rate is reviewed by the government each quarter and can be changed. Historically it has ranged from 8.7% (2013) to the current 7.1% (2024-25). There is no contractual guarantee of any specific rate for the full 15-year term — only a government backing that the rate will not fall to zero.' },
      { q: 'What happens to NPS if I resign from a job that contributes to NPS?', a: 'Your NPS account is portable and continues to exist regardless of your employer. If you resign, the employer contribution stops but you can continue making voluntary contributions. The account number (PRAN) remains the same. NPS can be continued until age 60, and you can resume contributions or deductions through your new employer if they offer NPS.' },
      { q: 'Can NPS be withdrawn before 60?', a: 'Partial withdrawal is allowed after 3 years for specific purposes (children education, marriage, treatment of critical illness, home purchase). Premature full exit is allowed after 10 years if the corpus is below Rs 2.5 lakh (full amount paid as lump sum). For larger amounts, premature exit requires 80% to be used for annuity purchase. This illiquidity is why NPS should be considered a retirement-only vehicle.' },
    ],
    relatedCalculatorIds: ['ppf-calculator', 'nps-calculator', 'sip-calculator', 'epf-calculator', 'new-income-tax-2526'],
  },

  {
    slug: 'business-loan-eligibility-guide',
    title: 'Business Loan Eligibility in India: How to Qualify and What to Expect',
    description:
      'A practical guide to business loan eligibility in India — DSCR, working capital calculation, documentation checklist, and how to improve your approval chances for 2025-26.',
    publishDate: '2026-03-01',
    updatedDate: '2026-05-22',
    readingTime: 8,
    tags: ['business loan', 'DSCR', 'working capital', 'SME finance', 'eligibility'],
    intro:
      'Approximately 40% of Indian MSMEs that apply for business loans are rejected on their first application. The most common reasons are insufficient DSCR, inadequate collateral, poor documentation, or applying to the wrong lender for their business stage. This guide walks you through every eligibility criterion banks and NBFCs use in 2025-26, and what you can do to maximize your approval chances.',
    sections: [
      {
        heading: 'Types of Business Loans Available in India',
        content: [
          'Term loan: Fixed loan amount for a specific purpose (machinery, expansion, construction) with a defined repayment schedule over 1-7 years. Working capital loan: Revolving credit facility or overdraft for day-to-day operations. Cash credit (CC): Bank-sanctioned limit against stock/debtors; interest charged only on amount utilised. MUDRA loan: Government-backed loans under Pradhan Mantri MUDRA Yojana for micro-enterprises — Shishu (up to Rs 50,000), Kishor (Rs 50,000-5 lakh), Tarun (Rs 5-10 lakh).',
          'Business loan against property (LAP): Secured loan against commercial or residential property, typically at lower interest rates (9-12% vs 14-18% for unsecured). Invoice discounting / factoring: Advance against trade receivables — useful for businesses with long payment cycles. CGTMSE-backed loan: Collateral-free loans under Credit Guarantee Trust Fund for Micro and Small Enterprises, with guarantee cover up to Rs 5 crore.',
        ],
      },
      {
        heading: 'DSCR: The Most Important Metric for Loan Approval',
        content: [
          'Debt Service Coverage Ratio (DSCR) = Net Operating Income / Total Debt Service (principal + interest payments). A DSCR of 1.25 means your business generates Rs 125 for every Rs 100 of debt repayment — a 25% buffer. Banks typically require DSCR of at least 1.25 to 1.5 for new loans.',
          'Example: A business with annual net profit (before interest and depreciation) of Rs 30 lakh applying for a Rs 40 lakh loan at 14% for 5 years: Annual EMI = Rs 11.1 lakh. DSCR = Rs 30 lakh / Rs 11.1 lakh = 2.7. This is excellent and will easily qualify for the loan.',
          'Where most SMEs fail: DSCR below 1.25 because they show low profits for tax minimisation. Banks use ITR data to calculate DSCR — years of low declared income directly hurt loan eligibility. There is a direct trade-off between tax saving and loan eligibility.',
        ],
        callout: { type: 'info', text: 'Use our DSCR Calculator to compute your business debt service coverage ratio and understand how a new loan affects your DSCR before applying.' },
      },
      {
        heading: 'Working Capital Assessment',
        content: [
          'Working capital = Current Assets minus Current Liabilities. Banks assess working capital requirements using the following: Debtors outstanding (how many days of revenue tied up in unpaid invoices), inventory holding period, and creditor payment terms.',
          'Nayak Committee method (used by PSBs): Working capital limit = 20% of projected annual turnover. Turnover method: For businesses with up to Rs 7.5 crore turnover, working capital limit = 20-25% of next year projected turnover. Cash budget method: For seasonal or cyclical businesses, detailed month-by-month cash flow projections.',
          'The most important document for working capital loans is the CC/OD statement and the stock statement. Banks typically sanction 75-80% of eligible drawing power (stocks at cost + debtors up to 90 days minus creditors).',
        ],
        callout: { type: 'info', text: 'Use our Working Capital Calculator to determine how much working capital your business requires and the appropriate credit limit to apply for.' },
      },
      {
        heading: 'Documentation Checklist for Business Loans',
        content: [
          'Identity and address: PAN card, Aadhaar, GST registration certificate, partnership deed / MOA + AOA / LLP agreement.',
          'Financial documents: Last 3 years audited financial statements (P&L, balance sheet), last 3 years ITR with computation, last 12 months bank statements (business account), projected financials (CMA data — Credit Monitoring Arrangement) for new term loans.',
          'Business documents: Business plan or project report (for term loans above Rs 25 lakh), existing loan sanction letters and repayment schedule, property documents (for secured loans), MSME Udyam registration certificate, GST returns (last 12 months), trade licence, rent agreement for business premises.',
          'Common mistakes: Submitting ITR without CA certification, not aligning GST turnover with bank statement credits, providing hand-written balance sheets instead of CA-certified statements, or not having a business bank account separate from the personal account.',
        ],
      },
      {
        heading: 'How to Improve Business Loan Eligibility',
        content: [
          'Declare higher profit in ITR: The biggest leverage point. A business declaring Rs 5 lakh profit on Rs 1 crore turnover has very low loan eligibility. Progressive improvement in declared profits over 2-3 years dramatically improves the credit profile.',
          'Maintain a clean bank account: Ensure regular credits, minimal cheque returns, and no overdue EMIs. Banks look at 12-month bank statements carefully. An account with consistent inflows and outflows signals a healthy business.',
          'Build GST compliance history: Regular GSTR filing, consistent turnover declaration, and growing GST numbers demonstrate a legitimate, growing business. Banks have started using GST data for credit assessment via GSTN integration.',
          'Get Udyam registration: MSMEs with Udyam registration get access to priority sector lending, lower interest rates (CGTMSE-backed loans), and collateral-free credit via government schemes up to Rs 5 crore.',
          'Start small and build: A first-time borrower with a MUDRA Kishor loan of Rs 3-5 lakh, repaid on time, builds credit history that enables progressively larger loans. The CIBIL commercial credit report for a business follows the same credit-building principles as personal credit.',
        ],
        callout: { type: 'tip', text: 'Before applying for a business loan above Rs 25 lakh, hire a CA to prepare CMA data (Credit Monitoring Arrangement projections) — this single document dramatically improves the quality of your loan application.' },
      },
      {
        heading: 'Interest Rates and Where to Apply',
        content: [
          'PSB rates (SBI, PNB, Bank of Baroda): 10.5-14% for secured loans, 14-18% for unsecured MSME loans. Processing time: 3-8 weeks. Best for: Established businesses with 3+ years of audited financials and good DSCR.',
          'NBFC rates (Bajaj Finserv, Lendingkart, Indifi, FlexiLoans): 14-24% for unsecured, 12-16% for secured. Processing time: 3-7 working days. Best for: Newer businesses, those needing fast approval, businesses with thin documentation.',
          'Fintech lenders (NeoGrowth, Loanpro, SMECorner): 18-30% for very small ticket sizes. Processing time: 1-3 days. Best for: Micro-businesses needing Rs 1-20 lakh quickly with minimal documentation.',
          'Government schemes (MUDRA, CGTMSE, SIDBI): Best rates (7-12%) and collateral-free, but long processing time and eligibility criteria. Best for: MSMEs with Udyam registration willing to wait 4-8 weeks for approval.',
        ],
      },
    ],
    faqs: [
      { q: 'What is the minimum DSCR required for a business loan?', a: 'Most banks require a minimum DSCR of 1.25 (the business generates Rs 1.25 for every Rs 1 of debt repayment). Some private banks and NBFCs may accept 1.1-1.2 for lower loan amounts with strong collateral. Below 1.0 means the business cannot service the loan from current income — rejection is almost certain without significant collateral.' },
      { q: 'Can I get a business loan without collateral?', a: 'Yes, under the CGTMSE scheme, collateral-free loans up to Rs 5 crore are available for eligible MSMEs (Udyam-registered). The government provides guarantee cover to the lender. Interest rates are typically 1-2% higher than secured loans. PSBs (SBI, Bank of Baroda, Canara Bank) actively participate in CGTMSE. You need clean financials, 2+ years of business vintage, and good DSCR.' },
      { q: 'How does my personal CIBIL score affect business loan eligibility?', a: 'For proprietorships and partnerships, personal CIBIL score significantly impacts approval because the promoter is personally liable. A CIBIL score above 700 is needed for most banks; above 750 gets the best rates. For Pvt Ltd companies, the company credit report (CIBIL Commercial) is primary, but director scores above 700 are still checked. Any personal loan defaults reflect in business loan applications for smaller companies.' },
      { q: 'How long does it take to get a business loan approved?', a: 'PSBs: 3-8 weeks from complete application. Private banks (HDFC, ICICI): 7-14 days. NBFCs (Bajaj Finserv, Lendingkart): 3-7 working days. Fintech lenders: 1-3 days. Government scheme loans (MUDRA Tarun, CGTMSE): 4-8 weeks. Speed of approval depends on documentation completeness — a complete application with CMA data and clean financials cuts approval time by 50%.' },
    ],
    relatedCalculatorIds: ['dscr-calculator', 'working-capital', 'break-even', 'emi-calculator', 'profit-margin'],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
