import React from 'react';
import styles from './Works.module.css';

function Works() {
  return (
    <section id='works' className={styles.worksContainer}>
      <div className={styles.content}>
        <h2>Our Work</h2>
        <p>Showcase of amazing projects coming soon...</p>

        <div
          style={{
            height: '800px',
            background: 'rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Placeholder for project grid / content
        </div>
      </div>
    </section>
  );
}

export default Works;
