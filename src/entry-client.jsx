import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// hydrateRoot, not createRoot().render(): the markup already exists, written
// by scripts/prerender.mjs at build time, and this attaches event handlers to
// it rather than throwing it away and rendering fresh.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
