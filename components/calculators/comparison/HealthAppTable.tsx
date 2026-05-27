'use client';

import { ExternalLink, Activity, Trophy, Dumbbell, Heart } from 'lucide-react';
import { AFFILIATE } from '@/lib/affiliate-links';
import { TableShell } from './TableShell';

type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface AppEntry {
  name: string;
  pricing: string;
  feature: string;
  initials: string;
  color: string;
  applyUrl: string;
  badge?: string;
  socialProof?: string;
}

interface ProductEntry {
  name: string;
  type: string;
  feature: string;
  initials: string;
  color: string;
  applyUrl: string;
  socialProof?: string;
}

const APPS: AppEntry[] = [
  { name: 'HealthifyMe',    pricing: '₹399/mo',       feature: 'India\'s #1 — AI coach + dietitian + workouts', initials: 'HM',  color: '#16a34a', applyUrl: AFFILIATE.health.apps.healthifyMe,  badge: 'TOP', socialProof: '3 Cr+ users in India' },
  { name: 'Cult.fit',       pricing: '₹2,499/qt',     feature: 'At-home + studio workouts · live trainers',     initials: 'CFT', color: '#dc2626', applyUrl: AFFILIATE.health.apps.cultFit,                    socialProof: '1,000+ studio classes/day' },
  { name: 'MyFitnessPal',   pricing: 'Free + ₹659/mo', feature: '14M+ food database · macro tracking',          initials: 'MFP', color: '#1565c0', applyUrl: AFFILIATE.health.apps.myFitnessPal,               socialProof: '200M+ users worldwide' },
  { name: 'Strava',         pricing: '₹950/mo',       feature: 'Best for runners & cyclists',                   initials: 'STR', color: '#fc4c02', applyUrl: AFFILIATE.health.apps.strava,                     socialProof: '100M+ athletes' },
  { name: 'Fitbit Premium', pricing: '₹999/mo',       feature: 'Sleep + stress + readiness scores',             initials: 'FBT', color: '#00b0b9', applyUrl: AFFILIATE.health.apps.fitbit,                     socialProof: 'Deep sleep analytics' },
];

const MASS_GAINERS: ProductEntry[] = [
  { name: 'MuscleBlaze Beast Mass Gainer', type: 'Mass Gainer',  feature: '500 kcal · 60g protein · Indian-made', initials: 'MB',  color: '#dc2626', applyUrl: AFFILIATE.health.massGainers.muscleBlazeBeast, socialProof: '#1 in India' },
  { name: 'ON Serious Mass',               type: 'Mass Gainer',  feature: 'Trusted global brand · 50g protein',   initials: 'ON',  color: '#000000', applyUrl: AFFILIATE.health.massGainers.optimumSerious,   socialProof: 'Global best-seller' },
  { name: 'Labrada Muscle Mass Gainer',    type: 'Mass Gainer',  feature: '52g protein · 1000+ kcal / serving',   initials: 'LB',  color: '#7c3aed', applyUrl: AFFILIATE.health.massGainers.labradaMass,      socialProof: 'Max calorie density' },
  { name: 'MyProtein Weight Gainer',       type: 'Mass Gainer',  feature: 'Customisable flavors · UK brand',      initials: 'MP',  color: '#00b9f1', applyUrl: AFFILIATE.health.massGainers.myProtein,         socialProof: 'Customisable macros' },
];

const WEIGHT_LOSS: ProductEntry[] = [
  { name: 'HealthKart Slim Range',    type: 'Weight Loss',      feature: 'Curated fat-burners + protein powders', initials: 'HK',  color: '#dc2626', applyUrl: AFFILIATE.health.weightLoss.healthKartSlim,   socialProof: 'Most-reviewed on HK' },
  { name: 'Saffola Fittify',          type: 'Meal Replacement', feature: 'High-protein shakes · low-carb',        initials: 'SAF', color: '#16a34a', applyUrl: AFFILIATE.health.weightLoss.saffolaFittify,   socialProof: 'Trusted Indian brand' },
  { name: 'MuscleBlaze Whey Protein', type: 'Protein',          feature: '24g protein/scoop · supports lean cuts',initials: 'MB',  color: '#7c3aed', applyUrl: AFFILIATE.health.weightLoss.mbProtein,        socialProof: '4.4★ on Amazon' },
  { name: 'Patanjali Divya products', type: 'Ayurvedic',        feature: 'Natural slimming herbal supplements',   initials: 'PAT', color: '#f59e0b', applyUrl: AFFILIATE.health.weightLoss.patanjaliDivya,   socialProof: 'Natural ingredients' },
];

interface Props {
  /** Compute BMI category from caller. If not given, defaults to 'normal'. */
  category?: BmiCategory;
  /** Optional BMI value for personalised headline */
  bmiValue?: number;
}

function categoryLabel(c: BmiCategory): string {
  return c === 'underweight' ? 'Underweight'
       : c === 'normal'       ? 'Normal weight'
       : c === 'overweight'   ? 'Overweight'
       :                        'Obese';
}

export function HealthAppTable({ category = 'normal', bmiValue }: Props) {
  const showMassGainers = category === 'underweight';
  const showWeightLoss  = category === 'overweight' || category === 'obese';
  const products = showMassGainers ? MASS_GAINERS : showWeightLoss ? WEIGHT_LOSS : null;

  const productHeadline = showMassGainers
    ? 'Underweight? 4 mass gainers that actually deliver calories + protein'
    : showWeightLoss
      ? 'Science-backed supplements to support your weight loss journey'
      : '';

  return (
    <div className="mt-3 space-y-3">
      {/* Apps table — always shown */}
      <TableShell
        headline={
          bmiValue
            ? <>BMI {bmiValue.toFixed(1)} ({categoryLabel(category)}) — <span className="text-pink-700">5 apps to hit your goal faster</span></>
            : <>Crush your fitness goal — India&apos;s top 5 rated apps compared</>
        }
        subline={<>Sync with your phone, track workouts, get personalised meal plans.</>}
        headerIcon={<Activity className="w-4 h-4" />}
        iconColorClass="text-pink-600"
        gradientClass="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50"
        footerNote={<>Pricing reflects subscription plans. Affiliate links — we may earn a commission at no cost to you.</>}
        browseAllUrl={AFFILIATE.health.primary}
        browseAllLabel="Try HealthifyMe free"
        browseAllColorClass="text-pink-700"
        className=""
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs">
                <th className="px-4 py-3 text-left font-semibold">App</th>
                <th className="px-4 py-3 text-center font-semibold">Pricing</th>
                <th className="px-4 py-3 text-left font-semibold">Best For</th>
                <th className="px-4 py-3 text-right font-semibold pr-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {APPS.map((a, idx) => (
                <tr key={a.name} className={`transition-colors ${idx === 0 ? 'bg-pink-50 hover:bg-pink-100/60' : 'hover:bg-slate-50'}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: a.color }}>
                        {a.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 text-xs leading-tight">
                          {a.name}
                          {a.badge && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 bg-pink-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                              <Trophy className="w-2.5 h-2.5" /> {a.badge}
                            </span>
                          )}
                        </span>
                        {a.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{a.socialProof}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs font-bold text-slate-800">{a.pricing}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{a.feature}</td>
                  <td className="px-4 py-3 pr-5 text-right">
                    <a href={a.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        idx === 0
                          ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm'
                          : 'bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white'
                      }`}>
                      Try App
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableShell>

      {/* Products table — conditional on BMI category */}
      {products && (
        <TableShell
          headline={productHeadline}
          subline={
            showMassGainers
              ? <>Pair with a calorie-surplus diet and resistance training for best results.</>
              : <>Pair with a calorie-deficit diet and regular cardio for best results.</>
          }
          headerIcon={showMassGainers ? <Dumbbell className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
          iconColorClass={showMassGainers ? 'text-amber-600' : 'text-emerald-600'}
          gradientClass={
            showMassGainers
              ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50'
              : 'bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50'
          }
          footerNote={<>Consult a doctor or nutritionist before starting supplements. Affiliate links — we may earn a commission at no cost to you.</>}
          className=""
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs">
                  <th className="px-4 py-3 text-left font-semibold">Product</th>
                  <th className="px-4 py-3 text-center font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Highlight</th>
                  <th className="px-4 py-3 text-right font-semibold pr-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((p) => {
                  const accent = showMassGainers
                    ? 'bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white'
                    : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white';
                  return (
                    <tr key={p.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: p.color }}>
                            {p.initials}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 text-xs leading-tight">{p.name}</span>
                            {p.socialProof && <span className="block text-[10px] text-slate-500 leading-snug">{p.socialProof}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">{p.type}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{p.feature}</td>
                      <td className="px-4 py-3 pr-5 text-right">
                        <a href={p.applyUrl} target="_blank" rel="noopener noreferrer sponsored"
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${accent}`}>
                          Buy Now
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TableShell>
      )}
    </div>
  );
}
