/**
 * Analytics helpers — thin wrappers around window.gtag
 * Safe to call during SSR (no-ops). If gtag hasn't loaded yet,
 * the event is queued via dataLayer and will fire once GA initialises.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>,
) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
  } else if (Array.isArray(window.dataLayer)) {
    // Queue before gtag initialises
    window.dataLayer.push({ event: eventName, ...(params ?? {}) });
  }
}

/** Fire when user clicks the Calculate / Compute button. */
export function trackCalculate(calculatorId: string) {
  trackEvent('calculate_clicked', { calculator_id: calculatorId });
}

/** Fire when a results section is rendered/shown to the user. */
export function trackResultView(calculatorId: string) {
  trackEvent('result_viewed', { calculator_id: calculatorId });
}

/**
 * Fire when a user clicks an outbound affiliate link.
 * brand      — display name of the brand (e.g. "HDFC Bank", "Groww")
 * calculatorId — slug of the calculator page it was clicked on
 */
export function trackAffiliateClick(brand: string, calculatorId: string) {
  trackEvent('affiliate_click', { brand, calculator_id: calculatorId });
}
