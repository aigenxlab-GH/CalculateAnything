import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Activity, Apple } from 'lucide-react';
import { BMICalculator } from '@/components/calculators/BMICalculator';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';

export const metadata: Metadata = {
  title: 'BMI & Calorie Calculator — Body Mass Index + TDEE',
  description:
    'Free BMI Calculator — find your Body Mass Index category, daily calorie needs (TDEE), and ideal weight range. Based on the Harris-Benedict formula.',
  keywords: ['BMI calculator', 'calorie calculator', 'TDEE calculator', 'body mass index', 'ideal weight calculator'],
};

const faqs = [
  {
    q: 'What is BMI?',
    a: 'Body Mass Index (BMI) is a measure of body fat based on height and weight. It is calculated by dividing weight in kilograms by the square of height in meters (kg/m²). BMI is used as a screening tool for underweight, overweight, and obesity.',
  },
  {
    q: 'What is TDEE?',
    a: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including all physical activity. To lose weight, eat below your TDEE; to gain weight, eat above it.',
  },
  {
    q: 'Is BMI always accurate?',
    a: 'BMI is a useful screening tool but has limitations. It does not distinguish between muscle and fat mass. Athletes may have a high BMI but low body fat. Always consult a healthcare professional for a complete health assessment.',
  },
  {
    q: 'How many calories should I eat to lose weight?',
    a: 'A deficit of 500 calories per day below your TDEE typically results in approximately 0.5 kg (1 lb) of weight loss per week. Avoid going below 1200 kcal/day for women or 1500 kcal/day for men without medical supervision.',
  },
];

const related = calculators.filter((c) => ['emi', 'gst'].includes(c.id));

export default function BMICalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/" className="hover:text-primary transition-colors">Calculators</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 font-medium">BMI Calculator</span>
      </nav>

      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-red-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">BMI & Calorie Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Calculate your Body Mass Index (BMI) category, daily calorie needs (TDEE), ideal weight
          range, and basal metabolic rate using the Harris-Benedict formula.
        </p>
      </div>
      {/* Calculator */}
      <BMICalculator />
      {/* FAQ */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          How to Use This BMI & Calorie Calculator
        </h2>
        <ol className="space-y-3">
          {[
            'Select your gender.',
            'Enter your weight in kilograms (use the slider or type directly).',
            'Enter your height in centimeters.',
            'Set your age.',
            'Choose your activity level — be honest for the most accurate TDEE.',
            'View your BMI score, category, daily calorie target, and ideal weight range.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
      </div>
  );
}
