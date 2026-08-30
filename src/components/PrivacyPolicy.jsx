import { Link } from 'react-router-dom';
import { site } from '../config/site';
import Seo from './Seo';
import styles from './LegalPage.module.css';

const PrivacyPolicy = () => {
  return (
    <main className={styles.legalPage}>
      <Seo
        title="Privacy Policy | Websence"
        description="How Websence collects, uses, and stores the information you send through the contact and quote forms on this Tacoma website design studio site."
        path="/privacy-policy"
      />
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {site.legalUpdated}</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            This site is run by {site.legalName} in {site.address.locality},{' '}
            {site.address.region}. This policy explains what I collect when you
            visit or send a message.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information I collect</h2>
          <p>If you use the quote form, I collect:</p>
          <ul>
            <li>Name</li>
            <li>Business name</li>
            <li>Email</li>
            <li>Phone, if you include it</li>
            <li>The package you select, and any add-ons you tick</li>
            <li>What you write about the business</li>
            <li>When you want to be live</li>
            <li>
              The estimate shown at the time you sent it, so the request can be
              read back against what you saw
            </li>
          </ul>
          <p>
            The site may also collect basic technical data such as browser type
            and pages viewed, through analytics if it is turned on.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. How I use it</h2>
          <p>I use that information to answer inquiries and improve the site.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Sharing</h2>
          <p>
            Form submissions go to my email and to the form provider I use to
            store messages if email fails. I do not sell this information.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Contact</h2>
          <p>
            Questions: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
