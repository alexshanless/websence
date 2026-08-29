import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { navItems } from '../config/site';
import styles from './Navbar.module.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}
    >
      <div className={styles.navContent}>
        <ul className={styles.navMenu}>
          {navItems.map((item) => (
            <li key={item.to} className={styles.navItem}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
