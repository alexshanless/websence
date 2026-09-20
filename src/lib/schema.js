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
    // Derived from the published tiers rather than typed, so it cannot end up
    // claiming a band the pricing page does not show. Previously left out for
    // want of a confirmed band; the tiers are the band.
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

// "$1,500-$6,500". Schema.org wants text, and a real band is more use to a
// machine reading the page than the conventional "$$".
function priceRange() {
  const amounts = site.pricing.tiers
    .map((entry) => entry.amount)
    .filter((amount) => amount !== null);

  const format = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);

  return `${format(Math.min(...amounts))}-${format(Math.max(...amounts))}`;
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
