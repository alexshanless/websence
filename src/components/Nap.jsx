import { site } from '../config/site';
import PhoneLink from './PhoneLink';
import styles from './Nap.module.css';

// The single source of the name/address/phone block. It renders from
// src/config/site.js and is used everywhere the NAP appears, so the string is
// byte identical on every page by construction rather than by discipline.
//
// This must match the Google Business Profile listing exactly: same name, same
// abbreviations, same punctuation, same phone format. Change it here only.
function Nap({ className }) {
  return (
    <address className={`${styles.nap} ${className || ''}`}>
      <span className={styles.name}>{site.legalName}</span>
      {site.address.street ? <span>{site.address.street}</span> : null}
      <span>
        {site.address.locality}, {site.address.region}
        {site.address.postalCode ? ` ${site.address.postalCode}` : ''}
      </span>
      <PhoneLink className={styles.link} />
      <a href={`mailto:${site.email}`} className={styles.link}>
        {site.email}
      </a>
      <span className={styles.serviceArea}>{site.serviceAreaLine}</span>
    </address>
  );
}

export default Nap;
