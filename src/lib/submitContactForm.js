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

  if (site.contactFormEndpoint) {
    const response = await fetch(site.contactFormEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to send your request right now.');
    }

    trackQuoteRequest(payload);
    return;
  }

  if (!site.email) {
    throw new Error('Contact is not configured yet.');
  }

  // Fallback only. This hands the request to the visitor's mail client, so
  // nothing is stored on our side — the endpoint above is the real path.
  const subject = encodeURIComponent(payload._subject);
  const body = encodeURIComponent(
    [
      payload.businessDescription,
      '',
      `Name: ${payload.name}`,
      `Business: ${payload.businessName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Package: ${payload.package}`,
      `Add-ons: ${payload.addOns}`,
      `Live by: ${payload.liveBy}`,
    ].join('\n')
  );
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  trackQuoteRequest(payload);
}
