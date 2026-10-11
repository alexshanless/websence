import { site } from '../config/site';
import CtaButton from './CtaButton';
import PhoneLink from './PhoneLink';
import styles from './QuoteActions.module.css';

// Quote stays the primary action. The call sits beside it, with no second
// paragraph explaining the call. `tone` is the background it sits on.
function QuoteActions({ tone = 'onLight', children }) {
  const onDark = tone === 'onDark';

  return (
    <div className={styles.row}>
      <CtaButton to="/contact" variant={onDark ? 'light' : 'dark'}>
        {site.ctaLabel}
      </CtaButton>
      <PhoneLink
        className={onDark ? styles.linkOnDark : styles.linkOnLight}
        prefix="Call"
      />
      {children}
    </div>
  );
}

export default QuoteActions;
