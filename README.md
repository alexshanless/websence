# Websence

Marketing site for Websence, a web design studio in Tacoma, WA.
React + Vite, deployed to Netlify at https://websencestudio.com.

## Running it

```
npm install
npm run dev      # local dev server
npm run build    # production build to dist/client/
npm run preview  # serve the production build
npm run lint
```

## How the build works

`npm run build` is three steps, and all three have to run:

1. `vite build` — the browser bundle, into `dist/client`.
2. `vite build --ssr` — `src/entry-server.jsx` into `dist/server`. Build-time
   only; step 3 deletes it.
3. `node scripts/prerender.mjs` — renders every route in `src/routes.js` to a
   real HTML file in `dist/client`, plus a `404.html`.

The site ships as static HTML with the page's text and head tags already in
it, and the bundle hydrates it in the browser. That is the point: most AI
answer-engine crawlers do not execute JavaScript, and before this they fetched
an empty `<div id="root">` on every URL. A route added to `src/App.jsx` must
also be added to `src/routes.js` or it ships without prerendered HTML.

## Where things live

`src/config/site.js` is the single source for business details, pricing, the
team, and the service area. The footer NAP block, the LocalBusiness schema,
the quote form, and every price on the site read from it, so a number is
changed in one place and follows everywhere.

- `src/data/projects.js` — portfolio entries, and which appear where
- `src/lib/estimate.js` — the only place the quote estimate is calculated
- `src/lib/schema.js` — LocalBusiness schema, home page only
- `src/routes.js` — the routes the build prerenders
- `src/components/Seo.jsx` — per-page head tags, via react-helmet-async so the
  prerender step can bake them into each file
- `src/components/Nap.jsx` — the name/address/phone block, used everywhere it
  appears so it stays byte identical across pages
- `netlify.toml` — build settings, redirects, cache and security headers
- `gbp/` — assets for the Google Business Profile. Not part of the build.

## Environment

Both are read at build time, so changing either needs a redeploy, not just a
restart.

```
VITE_CONTACT_FORM_ENDPOINT=   # Formspree/Web3Forms/Getform URL
VITE_GA4_MEASUREMENT_ID=      # G-XXXXXXXX
```

Without the first, the quote form falls back to opening the visitor's mail
client and nothing is stored. Without the second, nothing is tracked.

## Conventions worth knowing

- No `<form>` element. Submission and validation are explicit handlers, so
  Enter-to-submit and email checking are implemented rather than inherited.
- The quote estimate is always a floor, labelled "Estimated starting point"
  and never rendered without its qualifier.
- Schema carries nothing unverifiable: no ratings, reviews, price range, or
  opening hours.
- Placeholders are never shown to visitors. A missing photo renders a blank
  tile, a missing phone renders nothing at all.
