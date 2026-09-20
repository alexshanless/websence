import './App.css';
import Layout from './components/Layout';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactPage from './pages/Contact';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import ServicesPage from './pages/Services';
import WorkPage from './pages/Work';
import { Navigate, Route, Routes } from 'react-router-dom';

// The paths below are also listed in src/routes.js, which is what
// scripts/prerender.mjs renders to static HTML. Add a route in one and it
// needs adding in the other, or the new page ships without prerendered HTML.

// No Router here: entry-client.jsx wraps this in a BrowserRouter for the
// browser, entry-server.jsx wraps it in a StaticRouter for prerendering, and
// both need the exact same routes underneath.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/portfolio" element={<Navigate to="/work" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
