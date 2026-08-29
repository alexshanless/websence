import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Analytics from './Analytics';
import BackLink from './BackLink';
import Footer from './Footer';
import Navbar from './Navbar';

const SiteFrame = () => (
  <>
    <div className="frame frame-top"></div>
    <div className="frame frame-bottom"></div>
    <div className="frame frame-left"></div>
    <div className="frame frame-right"></div>
  </>
);

function Layout() {
  const location = useLocation();
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    // Only jump to the top on an actual navigation. On a reload the path has
    // not changed, so leave the browser to restore where the visitor was.
    if (lastPath.current === location.pathname) {
      return;
    }
    lastPath.current = location.pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <>
      <Analytics />
      <SiteFrame />
      <Navbar />
      <BackLink />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
