import Link from 'next/link';
import {
  CreditCard, TrendingUp, Receipt, Activity, BarChart2, PiggyBank, Landmark,
  Calculator, Percent, RefreshCw, Target, TrendingDown, DollarSign,
  Shield, Briefcase, FileText, Home, Car, GraduationCap, User,
  Building2, Scale, Wallet, type LucideIcon,
} from 'lucide-react';
import { type Calculator as CalcType } from '@/lib/calculators-registry';

const iconMap: Record<string, LucideIcon> = {
  CreditCard, TrendingUp, Receipt, Activity, BarChart2, PiggyBank, Landmark,
  Calculator, Percent, RefreshCw, Target, TrendingDown, DollarSign,
  Shield, Briefcase, FileText, Home, Car, GraduationCap, User,
  Building2, Scale, Wallet,
};

export function CalculatorCard({ calculator }: { calculator: CalcType }) {
  const Icon = iconMap[calculator.icon] ?? Calculator;

  return (
    <Link
      href={calculator.href}
      className="group flex items-start gap-5 bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-md hover:border-primary/30 transition-all duration-200"
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mt-0.5"
        style={{ backgroundColor: calculator.bgColor }}
      >
        <Icon className="w-7 h-7" style={{ color: calculator.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h2 className="font-semibold text-slate-900 text-base group-hover:text-primary transition-colors">
            {calculator.title}
          </h2>
          {calculator.isNew && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-accent text-amber-900 rounded-full uppercase tracking-wide">
              NEW
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {calculator.description}
        </p>
      </div>
    </Link>
  );
}
