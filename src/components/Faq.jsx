import { faqItems } from '../data/faq';
import styles from './Faq.module.css';

// Real headings and real paragraphs, not an accordion. A <details> element
// hides the answer behind a click, and while a crawler can still read it, an
// answer nobody scrolls past is also an answer nobody reads. The question is
// an <h3> so the page outline carries the question text itself.
function Faq({ items = faqItems, headingId = 'faq-heading', title = 'Questions people ask' }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className={styles.faq} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.heading}>
          {title}
        </h2>
        <div className={styles.list}>
          {items.map((item) => (
            <article key={item.id} className={styles.item}>
              <h3 className={styles.question}>{item.question}</h3>
              <p className={styles.answer}>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
