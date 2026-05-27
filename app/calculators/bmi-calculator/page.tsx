import type { Metadata } from 'next';
import { Activity, Apple } from 'lucide-react';
import { BMICalculator } from '@/components/calculators/BMICalculator';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';

export const metadata: Metadata = {
  title: 'BMI & Calorie Calculator — Body Mass Index + TDEE',
  description:
    'Free BMI Calculator — find your Body Mass Index category, daily calorie needs (TDEE), and ideal weight range. Based on the Harris-Benedict formula.',
  keywords: ['BMI calculator', 'calorie calculator', 'TDEE calculator', 'body mass index', 'ideal weight calculator'],
  alternates: { canonical: '/calculators/bmi-calculator/' },
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
  { q: 'Is BMI an accurate indicator of health for South Asians?', a: 'BMI has known limitations for South Asians. Studies show metabolic risk (diabetes, cardiovascular disease) starts at lower BMI than in Caucasian populations. WHO recommends BMI 23+ as overweight risk for Asians vs 25 for Caucasians. Indian organisations suggest BMI 18.5-22.9 as the optimal range. Use BMI alongside waist circumference (below 90cm for men, below 80cm for women) for a more complete health picture.' },
  { q: 'How accurate is the Harris-Benedict formula for estimating calorie needs?', a: 'The Harris-Benedict equation may slightly underestimate BMR for some South Asians. Use the calculated TDEE as a starting point and adjust by 100-150 kcal based on observed weight change over 3-4 weeks. If your weight is stable at the calculated TDEE, the estimate is accurate for you. If weight is changing, adjust up or down accordingly.' },
  { q: 'What BMI is considered healthy for Indian children?', a: 'For children aged 5-18 years, WHO and IAP use age- and gender-specific BMI-for-age charts rather than adult BMI cutoffs. A child is overweight if BMI-for-age is above the 85th percentile and obese if above the 95th percentile for their age group. The adult BMI calculator on this page is intended for individuals 18 years and older only.' },
  { q: 'What is the difference between BMI and body fat percentage?', a: 'BMI = Weight divided by Height squared - a proxy for body composition. Body Fat % directly measures the proportion of fat mass. BMI can misclassify muscular individuals as overweight and skinny-fat individuals as healthy. Healthy body fat: men 10-20%, women 18-28%. If you have access to body fat measurement (via DEXA scan or bioelectrical impedance), it is more informative than BMI alone.' },
];

const related = calculators.filter((c) => ['emi', 'gst'].includes(c.id));

export default function BMICalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="BMI Calculator" slug="bmi-calculator" />

      <CalculatorByline slug="bmi-calculator" />
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'BMI & Calorie Calculator',
        url: 'https://calculate-today.com/calculators/bmi-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'BMI and calorie calculator — find BMI category, TDEE and ideal weight range.',
      }} />
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
      <NewsletterCapture />
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
