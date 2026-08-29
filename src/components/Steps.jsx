import styles from './Contact.module.css';

// Numbered steps. The numbering is derived from the array order rather than
// typed into each item, so reordering cannot leave 01, 02, 02 behind.
function Steps({ items }) {
  return (
    <ul className={styles.nextSteps}>
      {items.map((body, index) => (
        <li key={body} className={styles.step}>
          <span className={styles.stepNum}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className={styles.stepBody}>{body}</p>
        </li>
      ))}
    </ul>
  );
}

export default Steps;
