import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

// Called once per route by scripts/prerender.mjs. Never shipped to the
// browser — this only exists to produce the static HTML files in dist/.
export function render(url) {
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return { html, helmet: helmetContext.helmet };
}
