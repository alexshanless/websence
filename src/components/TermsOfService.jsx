import React from 'react';
import styles from './LegalPage.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <section className={styles.section}>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using WEBSENCE's services, you agree to be bound by these Terms of Service and all applicable laws and
            regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on WEBSENCE's website for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license
            you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on WEBSENCE's website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Services Description</h2>
          <p>
            WEBSENCE provides web design, development, and digital marketing services. We reserve the right to modify, suspend, or
            discontinue any aspect of our services at any time without notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times.
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions
            under your password.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of WEBSENCE
            and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign
            countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior
            written consent.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Client Content and Ownership</h2>
          <p>
            For services provided to clients, ownership of deliverables will be transferred to the client upon full payment, unless
            otherwise specified in a separate agreement. Clients grant us permission to showcase completed work in our portfolio and
            marketing materials unless a non-disclosure agreement specifies otherwise.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Payment Terms</h2>
          <p>
            Payment terms will be specified in individual project agreements. Generally:
          </p>
          <ul>
            <li>An initial deposit is required before work begins</li>
            <li>Payment milestones will be outlined in the project agreement</li>
            <li>Final payment is due upon project completion</li>
            <li>Late payments may incur additional fees</li>
            <li>We reserve the right to withhold deliverables until full payment is received</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Refund Policy</h2>
          <p>
            Due to the nature of our services, deposits are generally non-refundable once work has commenced. Refund eligibility will
            be determined on a case-by-case basis and outlined in individual project agreements.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall WEBSENCE, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data,
            use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>10. Disclaimer</h2>
          <p>
            Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service
            is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties
            of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its
            conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver
            of those rights.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material,
            we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
            will be determined at our sole discretion.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul>
            <li>By email: legal@websence.com</li>
            <li>By visiting the contact page on our website</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these
            Terms will remain in effect.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
