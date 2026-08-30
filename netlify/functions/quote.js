import { getStore } from '@netlify/blobs';

// Quote form backend. Runs on Netlify, so there is no third party quota to
// burn through and no monthly ceiling on leads.
//
// Order matters here: the submission is stored before the email is sent, so a
// mail failure can never lose a lead. If email fails the visitor still gets a
// success response, because their request genuinely was received; telling them
// otherwise just produces duplicate submissions.

const FIELDS = [
  'name',
  'businessName',
  'email',
  'phone',
  'package',
  'addOns',
  'businessDescription',
  'liveBy',
  'estimatedStartingPoint',
  'estimatedMonthly',
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ok(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function bad(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async (req) => {
  if (req.method !== 'POST') {
    return bad('Method not allowed', 405);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return bad('Could not read that request.');
  }

  // Honeypot. Accept it so the bot sees success and does not retry, but do
  // not store or forward anything.
  if (payload.companyWebsite) {
    return ok({ received: true });
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();

  if (!name || !email) {
    return bad('Add your name and email so I can reply.');
  }
  if (!EMAIL.test(email)) {
    return bad('That email does not look right. Check it and try again.');
  }

  const record = { receivedAt: new Date().toISOString() };
  for (const key of FIELDS) {
    if (payload[key] !== undefined && payload[key] !== '') {
      record[key] = payload[key];
    }
  }

  // Stored first, and independently of email, so the lead survives a mail
  // outage or a bad API key.
  let stored = false;
  try {
    const store = getStore('quote-requests');
    const id = `${record.receivedAt}-${Math.random().toString(36).slice(2, 10)}`;
    await store.setJSON(id, record);
    stored = true;
  } catch (error) {
    console.error('quote: could not store submission', error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  let emailed = false;
  if (apiKey && to && from) {
    const lines = Object.entries(record)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `Quote request from ${name}`,
          text: lines,
        }),
      });
      if (res.ok) {
        emailed = true;
      } else {
        console.error('quote: resend rejected', res.status, await res.text());
      }
    } catch (error) {
      console.error('quote: could not send email', error);
    }
  } else {
    console.warn('quote: email not configured, submission stored only');
  }

  // Only a storage failure with no email configured is a real loss.
  if (!stored && !apiKey) {
    return bad('Unable to send your request right now.', 500);
  }

  return ok({ received: true, stored, emailed });
};
