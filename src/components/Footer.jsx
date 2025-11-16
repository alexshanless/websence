import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>WEBSENCE</h3>
            <p className={styles.tagline}>Crafting digital experiences</p>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Navigation</h4>
              <ul className={styles.linkList}>
                <li><a href='#hero' className={styles.link}>Home</a></li>
                <li><a href='#works' className={styles.link}>Works</a></li>
                <li><a href='#about' className={styles.link}>About</a></li>
                <li><a href='#all-projects' className={styles.link}>Projects</a></li>
                <li><a href='#services' className={styles.link}>Services</a></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><a href='#services' className={styles.link}>Web Design</a></li>
                <li><a href='#services' className={styles.link}>Development</a></li>
                <li><a href='#services' className={styles.link}>Branding</a></li>
                <li><a href='#services' className={styles.link}>UX/UI</a></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Connect</h4>
              <ul className={styles.linkList}>
                <li><a href='#' className={styles.link}>Instagram</a></li>
                <li><a href='#' className={styles.link}>LinkedIn</a></li>
                <li><a href='#' className={styles.link}>Twitter</a></li>
                <li><a href='#contact' className={styles.link}>Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} WEBSENCE. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to='/privacy-policy' className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.separator}>|</span>
            <Link to='/terms-of-service' className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
