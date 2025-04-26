import React from 'react';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id='hero' className={styles.heroContainer}>
      <div className={styles.contentWrapper}>
        <span className={`${styles.annotation} ${styles.annotationAbove}`}>
          we are
        </span>
        <h1 className={styles.mainHeadline}>WEBSENCE.</h1>
        <span className={`${styles.annotation} ${styles.annotationBelow}`}>
          a web <br></br> design agency
        </span>
      </div>
      Hero
    </section>
  );
}

export default Hero;
