import React, { useEffect, useState, useRef } from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);

  const handleScrollTo = sectionId => {
    const element = document.getElementById(sectionId);
    console.log(`Attempting to scroll to: ${sectionId}`, element); // Add console log for debugging
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 'start' aligns top of section to top of viewport
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide navbar when footer is intersecting with viewport
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        // Add bottom margin to detect footer earlier (adjust as needed)
        rootMargin: '0px 0px -100px 0px',
        threshold: 0,
      }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' }, // Assuming your Hero section has id="hero"
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
  ];
  return (
    <nav ref={navRef} className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.navConent}>
        <ul className={styles.navMenu}>
          {navItems.map(item => (
            <li key={item.id} className={styles.navItem}>
              {item.id && (
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className={styles.navLink}
                >
                  {item.label}
                </button>
              )}
              {/* TODO: Later, add handling for item.path using React Router Link */}
              {/* {item.path && (
                <a href={item.path} className={styles.navLink}>{item.label}</a> // Placeholder Link
              )} */}
            </li>
          ))}
          <li className={styles.navItem}>
            <a href='/portfolio' className={styles.navLink}>
              Portfolio
            </a>
          </li>
          <li className={styles.navItem}>
            <a href='/contact' className={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
