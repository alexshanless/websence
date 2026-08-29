import { Link } from 'react-router-dom';
import { site } from '../config/site';
import Seo from './Seo';
import styles from './LegalPage.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.legalPage}>
      <Seo
        title="Terms of Service | Websence"
        description="The terms for using the Websence website and for commissioning custom website design work from this Tacoma studio, including scope and payment."
        path="/terms-of-service"
      />
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: {site.legalUpdated}</p>

        <section className={styles.section}>
          <h2>1. Agreement</h2>
          <p>
            By using this site you agree to these terms. If you do not agree,
            do not use the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Services</h2>
          <p>
            {site.legalName} provides custom website design and related work for
            small businesses. Project terms, price, and timeline are set in a
            separate agreement before work starts.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Ownership</h2>
          <p>
            Client work transfers after full payment, unless a separate
            agreement says otherwise. I may show completed work in my portfolio
            unless you and I agree in writing not to.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Site content</h2>
          <p>
            Do not copy or scrape this site for a competing product. The
            materials here are for viewing only.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Contact</h2>
          <p>
            Questions: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
