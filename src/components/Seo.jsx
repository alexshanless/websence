import { site } from '../config/site';

const OG_IMAGE = `${site.url}/assets/og-default.jpg`;

// Plain <title>, <meta> and <link> elements, rendered in the tree. React 19
// hoists those three into <head> itself, wherever they are rendered, so no
// head-management library is involved and nothing is patched onto
// document.head after the fact.
//
// That last part is the point. The old version wrote these tags in a
// useEffect, which never runs for a crawler that does not execute JavaScript
// — most AI answer-engine fetchers — so every URL served the same static tags
// baked into index.html. Rendering them means scripts/prerender.mjs can lift
// them out of the render and into the <head> of each prerendered file.
//
// The JSON-LD stays where it renders, inside the page rather than the head.
// React does not hoist a script element, and schema.org markup is valid in
// either place.
function Seo({
  title,
  description,
  path = '/',
  schema,
  // Set on pages that must not be indexed, e.g. the 404.
  noindex = false,
  image = OG_IMAGE,
}) {
  // Trailing slash on the home URL only, matching sitemap.xml exactly so the
  // canonical and the sitemap never disagree about the same page.
  const url = path === '/' ? `${site.url}/` : `${site.url}${path}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
        }
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} — ${site.tagline}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      {/* Search Console site verification, when the HTML tag method is used. */}
      {site.searchConsoleToken ? (
        <meta name="google-site-verification" content={site.searchConsoleToken} />
      ) : null}

      {schema ? (
        <script
          type="application/ld+json"
          // Children would be escaped; the schema is generated from
          // src/config/site.js, never from anything a visitor can type.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </>
  );
}

export default Seo;
