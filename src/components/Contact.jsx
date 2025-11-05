import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id='contact' className={styles.contact}>
      <div className={styles.backgroundText}>LET'S TALK</div>

      <div className={styles.container}>
        <div className={styles.ctaSection}>
          <h2 className={styles.headline}>
            READY TO ELEVATE YOUR DIGITAL PRESENCE?
          </h2>
          <p className={styles.subheadline}>
            Let's create something extraordinary together.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name='message'
              placeholder='Tell us about your project'
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows='6'
              required
            />
          </div>

          <button type='submit' className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
