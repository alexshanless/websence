import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';

const OG_IMAGE = `${site.url}/assets/og-default.jpg`;

// Renders through react-helmet-async rather than patching document.head
// directly. A useEffect-based patch never runs during server rendering, so a
// crawler that does not execute JavaScript — most AI answer-engine fetchers,
// including ChatGPT's and Claude's — saw only the static tags baked into
// index.html, whatever page it actually requested. Helmet collects tags
// during render, so the prerender step (scripts/prerender.mjs) can read them
// straight out of the render and bake per-page tags into the HTML it writes.
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
    <Helmet>
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
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}
    </Helmet>
  );
}

export default Seo;
