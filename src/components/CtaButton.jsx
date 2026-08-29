import { Link } from 'react-router-dom';
import styles from './CtaButton.module.css';

function CtaButton({ to, href, children, variant = 'dark', onClick }) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default CtaButton;
