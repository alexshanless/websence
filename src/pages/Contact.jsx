import { site } from '../config/site';
import PhoneLink from '../components/PhoneLink';
import QuoteForm from '../components/QuoteForm';
import Seo from '../components/Seo';
import Steps from '../components/Steps';
import styles from '../components/Contact.module.css';

const steps = [
  'You send a few lines about the business.',
  'We talk about the work you want the site to bring in.',
  'You get a price and a timeline before anything gets built.',
];

function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Websence | Custom Website Design Tacoma"
        description="Ask about custom website design in Tacoma. Pick a package, see an estimate as you go, and get a price and timeline before anything gets built."
        path="/contact"
      />
      <section className={styles.contact}>
        <div className={styles.backgroundText}>LET&apos;S TALK</div>

        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h1 className={styles.headline}>Contact Websence in Tacoma</h1>
            <p className={styles.subheadline}>
              Tell me about the business and the jobs you want more of. You get a
              straight answer on scope, price, and timeline. No pitch deck.
            </p>
            <Steps items={steps} />
            <div className={styles.contactMeta}>
              <PhoneLink className={styles.emailLink} />
              <a href={`mailto:${site.email}`} className={styles.emailLink}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.quoteSection} aria-labelledby="quote-heading">
        <div className={styles.quoteInner}>
          <h2 id="quote-heading" className={styles.quoteHeading}>
            Request a quote
          </h2>
          <p className={styles.quoteLede}>
            Pick a package and any add-ons and the estimate updates as you go.
            Nothing is committed by sending this.
          </p>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

export default ContactPage;
