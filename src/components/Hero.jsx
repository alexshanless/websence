import { site } from '../config/site';
import styles from './Hero.module.css';

function Hero({ isSticky }) {
  const containerClasses = `
    ${styles.heroContainer}
    ${isSticky ? styles.heroSticky : styles.heroNotSticky}
  `;

  return (
    <section id="hero" className={containerClasses} aria-label={site.name}>
      <div className={styles.contentWrapper}>
        <span className={`${styles.annotation} ${styles.annotationAbove}`}>
          this is
        </span>
        <p className={styles.mainHeadline}>{site.name}.</p>
        <span className={`${styles.annotation} ${styles.annotationBelow}`}>
          a web <br />
          design studio
        </span>
      </div>
    </section>
  );
}

export default Hero;
