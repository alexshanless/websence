import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { navItems } from '../config/site';
import styles from './Navbar.module.css';

// Desktop keeps the floating pill. Mobile gets a button and a drawer, which
// is the convention on the web; a bottom bar reads as an app tab bar.
function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  const drawerRef = useRef(null);
  const location = useLocation();

  // The pill hides once the footer is on screen, since the footer carries the
  // same links. The drawer button stays put.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0 }
    );

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
      observer.disconnect();
    };
  }, []);

  // Close on navigation, so tapping a link does not leave the drawer open
  // behind the new page.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    // Hold the page still behind the drawer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) {
        return;
      }
      // Keep tabbing inside the drawer while it is open.
      const focusable = drawerRef.current.querySelectorAll('a, button');
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}
        aria-label="Primary"
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

      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={`${styles.burger} ${isOpen ? styles.burgerOpen : ''}`}
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
        <span className={styles.menuLabel}>{isOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        // Removed from the tab order and the accessibility tree while closed.
        // React 19 renders inert="" for true and omits it for false.
        inert={!isOpen}
      >
        <ul className={styles.drawerMenu}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.drawerLink} ${isActive ? styles.drawerActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
