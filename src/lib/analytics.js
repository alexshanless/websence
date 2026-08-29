import { site } from '../config/site';

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

// Conversion event. The package and add-ons ride along so the configuration
// people actually pick is visible in GA4.
export function trackQuoteRequest(payload) {
  trackEvent('generate_lead', {
    event_category: 'contact',
    event_label: 'quote_form',
    selected_package: payload.package,
    selected_add_ons: payload.addOns,
    estimated_starting_point: payload.estimatedStartingPoint,
    estimated_monthly: payload.estimatedMonthly,
  });
}

export function trackClickToCall() {
  trackEvent('click_to_call', {
    event_category: 'engagement',
    event_label: site.phone,
  });
}
