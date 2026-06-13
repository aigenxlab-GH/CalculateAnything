'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  {
    label: 'Income Tax',
    items: [
      { label: 'Old vs New Regime', href: '/calculators/old-vs-new-regime' },
      { label: 'New Income Tax 2025-26', href: '/calculators/new-income-tax-2526' },
      { label: 'New Income Tax 2024-25', href: '/calculators/new-income-tax-2425' },
      { label: 'Old Income Tax', href: '/calculators/old-income-tax' },
      { label: 'Salary Calculator', href: '/calculators/salary-calculator' },
      { label: 'HRA Exemption', href: '/calculators/hra-exemption' },
      { label: 'Gratuity Calculator', href: '/calculators/gratuity-calculator' },
    ],
  },
  {
    label: 'Investment & Savings',
    items: [
      { label: 'SIP Calculator', href: '/calculators/sip-calculator' },
      { label: 'Goal SIP Calculator', href: '/calculators/goal-sip' },
      { label: 'Step-Up SIP', href: '/calculators/step-up-sip' },
      { label: 'Lumpsum Calculator', href: '/calculators/lumpsum-calculator' },
      { label: 'Compounding Calculator', href: '/calculators/compounding-calculator' },
      { label: 'CAGR Calculator', href: '/calculators/cagr-calculator' },
      { label: 'SWP Calculator', href: '/calculators/swp-calculator' },
      { label: 'Inflation Calculator', href: '/calculators/inflation-calculator' },
      { label: 'Simple Interest', href: '/calculators/simple-interest' },
    ],
  },
  {
    label: 'Retirement & Savings',
    items: [
      { label: 'PPF Calculator', href: '/calculators/ppf-calculator' },
      { label: 'NSC Calculator', href: '/calculators/nsc-calculator' },
      { label: 'NPS Calculator', href: '/calculators/nps-calculator' },
      { label: 'EPF Calculator', href: '/calculators/epf-calculator' },
      { label: 'FD Calculator', href: '/calculators/fd-calculator' },
      { label: 'RD Calculator', href: '/calculators/rd-calculator' },
      { label: 'Retirement / FIRE', href: '/calculators/retirement-fire' },
    ],
  },
  {
    label: 'Loans & EMI',
    items: [
      { label: 'Home Loan EMI', href: '/calculators/home-loan' },
      { label: 'Interest-Free Home Loan', href: '/calculators/interest-free-home-loan' },
      { label: 'Loan Prepayment', href: '/calculators/loan-prepayment' },
      { label: 'Home Loan Eligibility', href: '/calculators/home-loan-eligibility' },
      { label: 'Car Loan EMI', href: '/calculators/car-loan' },
      { label: 'Education Loan EMI', href: '/calculators/educational-loan' },
      { label: 'Personal Loan EMI', href: '/calculators/personal-loan' },
      { label: 'EMI Calculator', href: '/calculators/emi-calculator' },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Break-Even Calculator', href: '/calculators/break-even' },
      { label: 'Profit Margin', href: '/calculators/profit-margin' },
      { label: 'Working Capital', href: '/calculators/working-capital' },
      { label: 'DSCR Calculator', href: '/calculators/dscr-calculator' },
      { label: 'GST Calculator', href: '/calculators/gst-calculator' },
      { label: 'PPC Calculator', href: '/calculators/ppc-calculator' },
    ],
  },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-primary rounded-lg hover:bg-primary-light/50 transition-colors"
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[220px] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-primary hover:bg-primary-light/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">
              Calculate<span className="text-primary italic">Today</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((nav) => (
              <Dropdown key={nav.label} label={nav.label} items={nav.items} />
            ))}
            <Link
              href="/calculators/bmi-calculator"
              aria-label="Health — BMI & Calorie Calculator"
              className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-primary hover:bg-primary-light/50 rounded-lg transition-colors"
            >
              Health
            </Link>
            <Link
              href="/guides/"
              className="px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary-light/50 rounded-lg transition-colors"
            >
              Guides
            </Link>
          </nav>

          {/* Theme toggle (desktop + mobile) + Mobile hamburger */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="lg:hidden p-1.5 text-slate-500 hover:text-primary hover:bg-primary-light dark:text-slate-400 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 max-h-[80vh] overflow-y-auto">
          {navItems.map((nav) => (
            <div key={nav.label}>
              <button
                type="button"
                onClick={() => setMobileCategory(mobileCategory === nav.label ? null : nav.label)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700"
              >
                {nav.label}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCategory === nav.label ? 'rotate-180' : ''}`} />
              </button>
              {mobileCategory === nav.label && (
                <div className="bg-slate-50 dark:bg-slate-800">
                  {nav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-primary border-b border-slate-100 dark:border-slate-700 last:border-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/calculators/bmi-calculator"
            aria-label="Health — BMI & Calorie Calculator (mobile nav)"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700"
          >
            Health
          </Link>
          <Link
            href="/guides/"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-semibold text-primary border-b border-slate-50 dark:border-slate-700"
          >
            Guides
          </Link>
        </div>
      )}
    </header>
  );
}
