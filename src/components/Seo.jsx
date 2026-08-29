import { useEffect } from 'react';
import { site } from '../config/site';

const OG_IMAGE = `${site.url}/assets/og-default.jpg`;

function upsertMeta(key, attr, value) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

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
  const schemaJson = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    document.title = title;

    upsertMeta('description', 'name', description);
    upsertMeta(
      'robots',
      'name',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );

    upsertMeta('og:title', 'property', title);
    upsertMeta('og:description', 'property', description);
    upsertMeta('og:url', 'property', url);
    upsertMeta('og:type', 'property', 'website');
    upsertMeta('og:site_name', 'property', site.name);
    upsertMeta('og:locale', 'property', 'en_US');
    upsertMeta('og:image', 'property', image);
    upsertMeta('og:image:width', 'property', '1200');
    upsertMeta('og:image:height', 'property', '630');
    upsertMeta('og:image:alt', 'property', `${site.name} — ${site.tagline}`);

    upsertMeta('twitter:card', 'name', 'summary_large_image');
    upsertMeta('twitter:title', 'name', title);
    upsertMeta('twitter:description', 'name', description);
    upsertMeta('twitter:image', 'name', image);

    upsertLink('canonical', url);

    // Search Console site verification, when the HTML tag method is used.
    if (site.searchConsoleToken) {
      upsertMeta('google-site-verification', 'name', site.searchConsoleToken);
    }

    const schemaId = 'page-jsonld';
    let script = document.getElementById(schemaId);
    if (schemaJson) {
      if (!script) {
        script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = schemaJson;
    } else if (script) {
      script.remove();
    }
  }, [title, description, url, schemaJson, noindex, image]);

  return null;
}

export default Seo;
