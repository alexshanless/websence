import React from 'react';
import styles from './LegalPage.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to WEBSENCE ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website and tell you
            about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
          <ul>
            <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
            <li><strong>Contact Data:</strong> Email address, telephone numbers, and mailing address</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
            <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and your communication preferences</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How We Use Your Information</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our services</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To send you marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or
            accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents,
            contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookies</h2>
          <p>
            Our website may use cookies to distinguish you from other users of our website. This helps us to provide you with a
            good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse
            all or some browser cookies, or to alert you when websites set or access cookies.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Third-Party Links</h2>
          <p>
            Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling
            those connections may allow third parties to collect or share data about you. We do not control these third-party websites
            and are not responsible for their privacy statements.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including
            for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: privacy@websence.com</li>
            <li>By visiting the contact page on our website</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
            on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
