import { Link } from 'react-router-dom';
import { navItems, site } from '../config/site';
import Nap from './Nap';
import styles from './Footer.module.css';

// The NAP block is the one place the phone and email appear. The old layout
// repeated both in a third "Contact" column, and listed Contact twice more in
// the link lists, which made the mobile footer a full screen of duplicates.
const footerLinks = navItems;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <h2 className={styles.brandName}>{site.name}</h2>
            <p className={styles.tagline}>{site.tagline}</p>
            <Nap className={styles.nap} />
            {site.googleBusinessProfile ? (
              <a
                href={site.googleBusinessProfile}
                className={styles.gbpLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Websence on Google
              </a>
            ) : null}
          </div>

          <nav className={styles.linksSection} aria-label="Footer">
            <h3 className={styles.columnTitle}>Pages</h3>
            <ul className={styles.linkList}>
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} {site.legalName}. {site.address.locality},{' '}
            {site.address.region}.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <span className={styles.separator} aria-hidden="true">
              |
            </span>
            <Link to="/terms-of-service" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
