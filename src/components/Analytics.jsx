import { useEffect } from 'react';
import { site } from '../config/site';

function Analytics() {
  const id = site.gaMeasurementId;

  useEffect(() => {
    if (!id || document.getElementById('ga4-src')) {
      return undefined;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);

    const script = document.createElement('script');
    script.id = 'ga4-src';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    return undefined;
  }, [id]);

  return null;
}

export default Analytics;
