import { site } from '../config/site';

// LocalBusiness, home page only, per the SEO spec in follow up 10.
//
// Deliberately NOT here, and not to be re-added without a decision from Alex:
//   aggregateRating / review  — there are no reviews yet
//   priceRange                — no confirmed band
//   openingHours              — not set
//   Person                    — the team is named in copy only, never marked up
//   FAQPage / Service / Offer / BreadcrumbList / WebPage / WebSite
//                             — the spec is LocalBusiness on the home page only
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
  };

  if (site.phone) {
    schema.telephone = site.phone;
  }
  if (site.address.street) {
    schema.address.streetAddress = site.address.street;
  }
  if (site.address.postalCode) {
    schema.address.postalCode = site.address.postalCode;
  }

  return schema;
}

export default localBusinessSchema;
