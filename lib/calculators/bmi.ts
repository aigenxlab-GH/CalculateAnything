export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

export interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
  bmr: number;
  tdee: number;
  idealWeightMin: number;
  idealWeightMax: number;
}

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  light: 'Lightly active (1–3 days/week)',
  moderate: 'Moderately active (3–5 days/week)',
  active: 'Very active (6–7 days/week)',
  very_active: 'Extra active (physical job or 2x training)',
};

export function calculateBMI(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activity: ActivityLevel
): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  let categoryColor: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#3B82F6';
  } else if (bmi < 25) {
    category = 'Normal weight';
    categoryColor = '#22C55E';
  } else if (bmi < 30) {
    category = 'Overweight';
    categoryColor = '#F59E0B';
  } else {
    category = 'Obese';
    categoryColor = '#EF4444';
  }

  // Harris-Benedict BMR formula
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  const tdee = bmr * activityMultipliers[activity];

  // Ideal weight range based on healthy BMI (18.5–24.9)
  const idealWeightMin = 18.5 * heightM * heightM;
  const idealWeightMax = 24.9 * heightM * heightM;

  return { bmi, category, categoryColor, bmr, tdee, idealWeightMin, idealWeightMax };
}
