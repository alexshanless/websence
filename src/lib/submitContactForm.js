import { site } from '../config/site';
import { trackQuoteRequest } from './analytics';

function buildPayload(formData, estimate) {
  const addOnNames = estimate.selected.map((addOn) => addOn.name);
  const packageLabel = estimate.tier ? estimate.tier.name : 'Not sure yet';

  return {
    name: formData.name,
    businessName: formData.businessName,
    email: formData.email,
    phone: formData.phone,
    package: packageLabel,
    addOns: addOnNames.join(', '),
    businessDescription: formData.businessDescription,
    liveBy: formData.liveBy,
    // Recorded so a request can be read back against what the visitor saw.
    // It is a floor, not an agreed figure.
    estimatedStartingPoint: estimate.oneTime,
    estimatedMonthly: estimate.monthly,
    _subject: `Websence quote request from ${formData.name}`,
  };
}

export async function submitQuoteRequest(formData, estimate) {
  const payload = buildPayload(formData, estimate);

  try {
    const response = await fetch(site.contactFormEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // The function replies with a readable message; fall back if it did not.
      const detail = await response.json().catch(() => null);
      throw new Error(detail?.error || 'Unable to send your request right now.');
    }

    trackQuoteRequest(payload);
  } catch (error) {
    // Surface the real reason rather than silently doing something else.
    throw error instanceof Error
      ? error
      : new Error('Unable to send your request right now.');
  }
}
