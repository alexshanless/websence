import { marqueeClients } from '../data/projects';
import styles from './ClientMarquee.module.css';

// One continuous scrolling row of client marks. The list is rendered twice and
// the track translates by exactly -50%, so the second copy lands where the
// first started and the loop has no visible seam.
//
// A client with no logo file renders its name as a wordmark instead, so a
// missing asset degrades to type rather than leaving a hole in the row.
function Mark({ client }) {
  if (!client.logo) {
    return <span className={styles.wordmark}>{client.name}</span>;
  }

  return (
    <img
      src={client.logo}
      alt={client.name}
      className={styles.logo}
      width={client.logoWidth || 300}
      height={client.logoHeight || 100}
      // Not lazy. The track is wider than the viewport, so marks near the end
      // of the row sit permanently off-screen to the right, and a viewport
      // based lazy load never fires for them. The whole set is about 100KB.
      loading="eager"
      decoding="async"
    />
  );
}

function ClientMarquee() {
  if (!marqueeClients.length) {
    return null;
  }

  return (
    <div className={styles.marquee}>
      {/* The row is decorative repetition of names already listed on /work,
          so it is hidden from assistive tech to avoid reading them twice. */}
      <div className={styles.track} aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.row}>
            {marqueeClients.map((client) => (
              <li key={client.id} className={styles.item}>
                <Mark client={client} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ClientMarquee;
