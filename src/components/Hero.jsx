import React from 'react';
import styles from './Hero.module.css';

function Hero({ isSticky }) {
  const containerClasses = `
    ${styles.heroContainer}
    ${isSticky ? styles.heroSticky : styles.heroNotSticky}
  `;
  return (
    <section id='hero' className={containerClasses}>
      <div className={styles.contentWrapper}>
        <span className={`${styles.annotation} ${styles.annotationAbove}`}>
          we are
        </span>
        <h1 className={styles.mainHeadline}>WEBSENCE.</h1>
        <span className={`${styles.annotation} ${styles.annotationBelow}`}>
          a web <br></br> design agency
        </span>
      </div>
    </section>
  );
}

export default Hero;
