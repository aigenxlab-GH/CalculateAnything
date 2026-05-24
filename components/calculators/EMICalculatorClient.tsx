'use client';

/* Thin re-export. The EMICalculator now uses an internal `mounted` flag
   to defer Intl.NumberFormat + Recharts to client-side, so we no longer
   need `dynamic({ ssr: false })` (which caused chunk-load failures in
   Edge incognito → auto-redirect to homepage). */
export { EMICalculator as EMICalculatorClient } from './EMICalculator';
