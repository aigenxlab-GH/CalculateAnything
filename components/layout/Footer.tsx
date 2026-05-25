import Link from 'next/link';
import { Calculator } from 'lucide-react';

const footerCategories = [
  {
    heading: 'Income Tax',
    links: [
      { label: 'Old vs New Regime',       href: '/calculators/old-vs-new-regime' },
      { label: 'New Income Tax 2025-26',  href: '/calculators/new-income-tax-2526' },
      { label: 'New Income Tax 2024-25',  href: '/calculators/new-income-tax-2425' },
      { label: 'Old Income Tax',          href: '/calculators/old-income-tax' },
      { label: 'Salary Calculator',       href: '/calculators/salary-calculator' },
      { label: 'HRA Exemption',           href: '/calculators/hra-exemption' },
      { label: 'Gratuity Calculator',     href: '/calculators/gratuity-calculator' },
    ],
  },
  {
    heading: 'Investment',
    links: [
      { label: 'SIP Calculator',       href: '/calculators/sip-calculator' },
      { label: 'Goal SIP',             href: '/calculators/goal-sip' },
      { label: 'Step-Up SIP',          href: '/calculators/step-up-sip' },
      { label: 'Lumpsum Calculator',   href: '/calculators/lumpsum-calculator' },
      { label: 'Compounding',          href: '/calculators/compounding-calculator' },
      { label: 'CAGR Calculator',      href: '/calculators/cagr-calculator' },
      { label: 'SWP Calculator',       href: '/calculators/swp-calculator' },
      { label: 'Inflation Calculator', href: '/calculators/inflation-calculator' },
      { label: 'Simple Interest',      href: '/calculators/simple-interest' },
    ],
  },
  {
    heading: 'Retirement & Savings',
    links: [
      { label: 'PPF Calculator',    href: '/calculators/ppf-calculator' },
      { label: 'NSC Calculator',    href: '/calculators/nsc-calculator' },
      { label: 'NPS Calculator',    href: '/calculators/nps-calculator' },
      { label: 'EPF Calculator',    href: '/calculators/epf-calculator' },
      { label: 'FD Calculator',     href: '/calculators/fd-calculator' },
      { label: 'RD Calculator',     href: '/calculators/rd-calculator' },
      { label: 'Retirement / FIRE', href: '/calculators/retirement-fire' },
    ],
  },
  {
    heading: 'Loans & EMI',
    links: [
      { label: 'EMI Calculator',         href: '/calculators/emi-calculator' },
      { label: 'Home Loan EMI',          href: '/calculators/home-loan' },
      { label: 'Interest-Free Home Loan',href: '/calculators/interest-free-home-loan' },
      { label: 'Loan Prepayment',        href: '/calculators/loan-prepayment' },
      { label: 'Home Loan Eligibility',  href: '/calculators/home-loan-eligibility' },
      { label: 'Car Loan EMI',           href: '/calculators/car-loan' },
      { label: 'Education Loan EMI',     href: '/calculators/educational-loan' },
      { label: 'Personal Loan EMI',      href: '/calculators/personal-loan' },
    ],
  },
  {
    heading: 'Business',
    links: [
      { label: 'GST Calculator',    href: '/calculators/gst-calculator' },
      { label: 'PPC Calculator',    href: '/calculators/ppc-calculator' },
      { label: 'Break-Even',        href: '/calculators/break-even' },
      { label: 'Profit Margin',     href: '/calculators/profit-margin' },
      { label: 'Working Capital',   href: '/calculators/working-capital' },
      { label: 'DSCR Calculator',   href: '/calculators/dscr-calculator' },
    ],
  },
  {
    heading: 'Health',
    links: [
      { label: 'BMI & Calorie Calculator', href: '/calculators/bmi-calculator' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-600 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white">
            Calculate<span className="text-amber-400 italic">Today</span>
          </span>
        </div>

        {/* Category columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerCategories.map((cat) => (
            <div key={cat.heading}>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-3">
                {cat.heading}
              </h3>
              <ul className="space-y-2.5">
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-500 text-center space-y-2">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} Calculate<em>Today</em>. All calculators are for informational
            purposes only and do not constitute financial, tax, or legal advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
