import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section id='about' className={styles.about}>
      <div className={styles.backgroundText}>ABOUT US</div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <span className={styles.label}>About Us</span>

          <h2 className={styles.headline}>
            WE CRAFT DIGITAL EXPERIENCES THAT CAPTIVATE AND CONVERT.
          </h2>

          <div className={styles.textContent}>
            <p className={styles.paragraph}>
              At WEBSENCE, we believe great design is invisible—it just works.
              We partner with ambitious brands to create websites that don't just
              look beautiful, but drive real results.
            </p>

            <p className={styles.paragraph}>
              Our approach combines strategic thinking with pixel-perfect execution.
              From initial concept to final launch, we obsess over every detail to
              ensure your digital presence stands out in a crowded market.
            </p>
          </div>

          <div className={styles.services}>
            <span className={styles.serviceItem}>Web Design</span>
            <span className={styles.dot}>•</span>
            <span className={styles.serviceItem}>Development</span>
            <span className={styles.dot}>•</span>
            <span className={styles.serviceItem}>Branding</span>
            <span className={styles.dot}>•</span>
            <span className={styles.serviceItem}>UX/UI Strategy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
