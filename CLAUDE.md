# CalculateAnything — Project Context

Indian personal finance calculator website.
**Live:** https://calculate-today.com
**GitHub:** aigenxlab-GH/CalculateAnything (main branch)
**Deploy:** `git push origin main` → GitHub Actions → Cloudflare Workers (auto)

---

## Tech Stack
- Next.js 16.2.6, App Router, TypeScript strict, `output: 'export'` (static site)
- Tailwind CSS v4 — config is CSS-based (`@theme {}` in `app/globals.css`), no `tailwind.config.js`
- Dark mode: manual `.dark {}` overrides in `globals.css` — **never** use Tailwind `dark:` variants
- Recharts (lazy-loaded via `next/dynamic`), Lucide React icons
- `next-themes` for dark mode toggle (`attribute="class"`)

## Architecture
| Layer | Location |
|---|---|
| Math logic | `lib/calculators/*.ts` — pure functions, no React |
| Calculator UI | `components/calculators/*.tsx` — `'use client'`, useState |
| Page files | `app/calculators/[slug]/page.tsx` — SSG, exports `Metadata` |
| Calculator registry | `lib/calculators-registry.ts` — master list of all 43 calculators |
| Guides data | `lib/guides-data.ts` — 29 guide pages with cross-links |
| Affiliate links | `lib/affiliate-links.ts` — all affiliate URLs |
| Navigation | `components/layout/Header.tsx` + `Footer.tsx` |
| Homepage search | `components/HomepageGrid.tsx` |

## Hard Rules
- All internal hrefs **must** have trailing slashes: `/calculators/sip-calculator/`
- **Never** use bare `>` in JSX text — use `&gt;` (Turbopack breaks the build otherwise)
- All `<button>` elements need `type="button"`
- Auto-calculate on load: `useState(() => calcFn(defaults))` lazy init — not `useEffect`

## 43 Calculators
**Income Tax (8):** old-vs-new-regime, old-vs-new-tax-regime, new-income-tax-2526, new-income-tax-2425, old-income-tax, salary-calculator, hra-exemption, gratuity-calculator

**Investment (11):** sip-calculator, goal-sip, step-up-sip, lumpsum-calculator, sip-vs-lumpsum, brokerage-calculator, compounding-calculator, cagr-calculator, swp-calculator, inflation-calculator, simple-interest

**Retirement & Savings (9):** ppf-calculator, nsc-calculator, nps-calculator, epf-calculator, epf-vs-nps-ppf, nsc-vs-ppf-fd, fd-calculator, rd-calculator, retirement-fire

**Loans & EMI (8):** emi-calculator, home-loan, interest-free-home-loan, loan-prepayment, home-loan-eligibility, car-loan, educational-loan, personal-loan

**Business (6):** gst-calculator, ppc-calculator, break-even, profit-margin, working-capital, dscr-calculator

**Health (1):** bmi-calculator

## Monetization
- **AdSense:** Publisher ID `ca-pub-9203095207294518`, slots via `InContentAd` component. Not yet approved — targeting July 2026.
- **Affiliate:** `lib/affiliate-links.ts`. Cuelink approved, BankBazaar pending.

## Build & Deploy
```bash
npm run build        # generates out/ directory
git push origin main # triggers auto-deploy to Cloudflare
```
Required env vars (set in GitHub Actions secrets + `.env.local`):
- `NEXT_PUBLIC_SITE_URL=https://calculate-today.com`
- `NEXT_PUBLIC_ADSENSE_ID=ca-pub-9203095207294518`
- `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=8027761888`
- `NEXT_PUBLIC_ADSENSE_SLOT_FAQ=1186726216`
