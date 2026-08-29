import { site } from '../config/site';
import PhoneLink from '../components/PhoneLink';
import QuoteForm from '../components/QuoteForm';
import Seo from '../components/Seo';
import Steps from '../components/Steps';
import page from '../components/Page.module.css';
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
      <main className={styles.contactPage}>
        <section className={`${page.page} ${page.light} ${styles.intro}`}>
          <div className={page.container}>
            <span className={page.kicker}>Contact</span>
            <div className={styles.introGrid}>
              <h1 className={page.headline}>Contact Websence in Tacoma</h1>
              <div className={styles.introSide}>
                <p className={styles.lede}>
                  Tell me about the business and the jobs you want more of. You
                  get a straight answer on scope, price, and timeline. No pitch
                  deck.
                </p>
              </div>
            </div>

            {/* The two ways to reach a person, above the form, because a
                local buyer often wants to call rather than type. */}
            <dl className={styles.direct}>
              <div className={styles.directCell}>
                <dt className={styles.directLabel}>Call</dt>
                <dd className={styles.directValue}>
                  <PhoneLink className={styles.directLink} />
                </dd>
              </div>
              <div className={styles.directCell}>
                <dt className={styles.directLabel}>Email</dt>
                <dd className={styles.directValue}>
                  <a href={`mailto:${site.email}`} className={styles.directLink}>
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <section className={styles.stepsSection}>
              <h2 className={styles.stepsTitle}>How it goes</h2>
              <Steps items={steps} />
            </section>
          </div>
        </section>

        <section
          className={styles.quoteSection}
          aria-labelledby="quote-heading"
        >
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
      </main>
    </>
  );
}

export default ContactPage;
