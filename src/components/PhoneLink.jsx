import { site, telHref, phoneFormat } from '../config/site';
import { trackClickToCall } from '../lib/analytics';

if (import.meta.env.DEV && site.phone && !phoneFormat.test(site.phone)) {
  // One format everywhere. See the note on `phone` in src/config/site.js.
  console.warn(
    `site.phone is "${site.phone}". Expected the format (564) 123-4567.`
  );
}

// Until the 564 line is supplied, this renders a marked placeholder instead of a
// number, so nothing fake ships and there is no dead click to call link.
function PhoneLink({ className }) {
  // Nothing renders until the number exists. A visible "coming soon" reads
  // as an unfinished site; an absent line is simply not noticed.
  if (!site.phone) {
    return null;
  }

  return (
    <a
      href={telHref(site.phone)}
      className={className}
      onClick={trackClickToCall}
    >
      {site.phone}
    </a>
  );
}

export default PhoneLink;
