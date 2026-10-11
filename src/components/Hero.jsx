import { site, startingPrice } from '../config/site';
import { formatPrice } from '../lib/formatPrice';
import QuoteActions from './QuoteActions';
import styles from './Hero.module.css';

function Hero({ isSticky }) {
  const containerClasses = `
    ${styles.heroContainer}
    ${isSticky ? styles.heroSticky : styles.heroNotSticky}
  `;

  return (
    <section id="hero" className={containerClasses} aria-label={site.name}>
      {/* Fills the space above the offer, so the lockup sits centred in what
          is left rather than in the whole screen. */}
      <div className={styles.lockupArea}>
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
      </div>

      {/* The offer, in the same screen as the name. In normal flow, so a
          short window pushes the hero taller instead of overlapping the two. */}
      <div className={styles.offer}>
        <p className={styles.offerLine}>
          Websites for Tacoma businesses. From {formatPrice(startingPrice)}.
        </p>
        <QuoteActions />
      </div>
    </section>
  );
}

export default Hero;
