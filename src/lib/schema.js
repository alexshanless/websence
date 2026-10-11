import { site } from '../config/site';
import { faqItems } from '../data/faq';

// LocalBusiness, home page only.
//
// Deliberately NOT here, and not to be re-added without a decision from Alex:
//   aggregateRating / review  — there are no reviews yet
//   openingHours              — not set
//   Person                    — the team is named in copy only, never marked up
//   Service / Offer / BreadcrumbList / WebPage / WebSite
//
// `name` and `telephone` must match the Google Business Profile listing
// exactly. The phone renders only once site.phone is filled, so a placeholder
// can never reach the markup.
export function localBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.legalName,
    url: `${site.url}/`,
    description: site.tagline,
    areaServed: site.serviceArea.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    // Not in the spec's field list, but not on its exclusion list either, and
    // it is the same locality/region shown in the footer NAP block. Included
    // so the schema and the visible NAP agree. Remove if unwanted.
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    // A floor, not a band. See priceRange() below.
    priceRange: priceRange(),
  };

  if (site.phone) {
    schema.telephone = site.phone;
  }

  // Google Business Profile first, then any social profiles that exist. An
  // empty list is left off entirely rather than marked up as nothing.
  const sameAs = [site.googleBusinessProfile, ...site.socialProfiles].filter(
    Boolean
  );
  if (sameAs.length) {
    schema.sameAs = sameAs;
  }

  if (site.address.street) {
    schema.address.streetAddress = site.address.street;
  }
  if (site.address.postalCode) {
    schema.address.postalCode = site.address.postalCode;
  }

  return schema;
}

// "From $1,500": the lowest published price, and no top. Schema.org takes
// free text here, so this is as valid as a band or the conventional "$$".
//
// It states no ceiling because there is not one. The Custom tier is quoted
// after a call and carries no amount, so any figure derived from the tiers is
// the top of the tiers that happen to have numbers — $6,500 — not the top of
// the work. Publishing that as a range would put a cap in the one field an
// answer engine quotes when asked what this studio charges.
//
// Do not turn this back into a range without a real ceiling to put in it.
function priceRange() {
  const lowest = Math.min(
    ...site.pricing.tiers
      .map((entry) => entry.amount)
      .filter((amount) => amount !== null)
  );

  return `From ${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(lowest)}`;
}

// FAQPage, for the questions rendered by src/components/Faq.jsx. Google no
// longer shows FAQ rich results for a site like this one, so this is not
// there for the snippet: it is there because an answer engine parsing the
// page gets the question and its answer already paired.
//
// The answers come from the same source as the visible copy. Marking up an
// answer the visitor cannot see on the page is a guidelines violation, so
// this must never be called with items the page does not render.
export function faqSchema(items = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default localBusinessSchema;
