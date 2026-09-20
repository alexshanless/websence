// The real, indexable routes. Plain JS (no JSX) so scripts/prerender.mjs can
// import it directly under plain Node, without going through Vite. App.jsx
// builds its <Route> tree from the same list, so a route can never be added
// in one place and forgotten in the other.
export const staticRoutes = [
  '/',
  '/services',
  '/work',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
];
