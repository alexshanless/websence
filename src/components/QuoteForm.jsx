import { useState } from 'react';
import { site } from '../config/site';
import { formatPrice } from '../lib/formatPrice';
import { calculateEstimate } from '../lib/estimate';
import { submitQuoteRequest } from '../lib/submitContactForm';
import styles from './QuoteForm.module.css';

const { packageOptions, addOns, estimateLabel, estimateQualifier } =
  site.pricing;

const initialFormData = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  packageId: '',
  addOnIds: [],
  businessDescription: '',
  liveBy: '',
  // Honeypot. Must stay empty; anything here means a bot filled it.
  companyWebsite: '',
};

// The running estimate. Never a total, never a price — a floor, with the
// qualifier attached to it so the two can never be rendered apart.
function Estimate({ estimate }) {
  const showsNothing = !estimate.oneTime && !estimate.monthly;

  return (
    <div className={styles.estimate} aria-live="polite">
      <p className={styles.estimateLabel}>{estimateLabel}</p>
      {showsNothing ? (
        <p className={styles.estimateEmpty}>
          Pick a package or an add-on and the estimate appears here.
        </p>
      ) : (
        <>
          {estimate.oneTime > 0 ? (
            <p className={styles.estimateValue}>
              {estimate.isFloor ? (
                <span className={styles.estimatePrefix}>From</span>
              ) : null}
              {formatPrice(estimate.oneTime)}
            </p>
          ) : null}
          {estimate.monthly > 0 ? (
            <p className={styles.estimateMonthly}>
              {estimate.oneTime > 0 ? 'plus ' : ''}
              {formatPrice(estimate.monthly)} per month
            </p>
          ) : null}
          {!estimate.hasBase && estimate.oneTime > 0 ? (
            <p className={styles.estimateNote}>
              Add-ons only. No package selected yet, so this carries no base
              build figure.
            </p>
          ) : null}
        </>
      )}
      <p className={styles.estimateQualifier}>{estimateQualifier}</p>
    </div>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const estimate = calculateEstimate({
    packageId: formData.packageId,
    addOnIds: formData.addOnIds,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const toggleAddOn = (addOnId) => {
    setFormData((current) => ({
      ...current,
      addOnIds: current.addOnIds.includes(addOnId)
        ? current.addOnIds.filter((id) => id !== addOnId)
        : [...current.addOnIds, addOnId],
    }));
  };

  // No <form> element, per the standing convention, so submission and
  // validation are both explicit handlers.
  const handleSubmit = async () => {
    // Silently succeed for bots: telling them why they failed helps them.
    if (formData.companyWebsite) {
      setFormData(initialFormData);
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Add your name and email so I can reply.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitQuoteRequest(formData, estimate);
      setFormData(initialFormData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your request right now.'
      );
    }
  };

  return (
    <div className={styles.quote}>
      <div className={styles.fields}>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              autoComplete="name"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Business name</span>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={styles.input}
              autoComplete="organization"
            />
          </label>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              autoComplete="email"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Phone <span className={styles.optional}>optional</span>
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              autoComplete="tel"
            />
          </label>
        </div>

        <fieldset className={styles.group}>
          <legend className={styles.label}>Which package fits best</legend>
          <div className={styles.choices}>
            {packageOptions.map((option) => (
              <label key={option.id} className={styles.choice}>
                <input
                  type="radio"
                  name="packageId"
                  value={option.id}
                  checked={formData.packageId === option.id}
                  onChange={handleChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.label}>Add-ons</legend>
          <div className={styles.addOnList}>
            {addOns.map((addOn) => (
              <label key={addOn.id} className={styles.addOn}>
                <input
                  type="checkbox"
                  checked={formData.addOnIds.includes(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                />
                <span className={styles.addOnName}>{addOn.name}</span>
                <span className={styles.addOnPrice}>
                  {addOn.prefix ? `${addOn.prefix} ` : ''}
                  {formatPrice(addOn.amount)}
                  {addOn.suffix ? ` ${addOn.suffix}` : ''}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className={styles.field}>
          <span className={styles.label}>What does your business do</span>
          <textarea
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            className={`${styles.input} ${styles.textarea}`}
            rows="4"
          />
        </label>

        {/* Honeypot. Hidden from sight and from assistive tech, and skipped
            by the tab order, so only an automated filler ever reaches it. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="company-website">Company website</label>
          <input
            id="company-website"
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className={styles.field}>
          <span className={styles.label}>When do you want to be live</span>
          <input
            type="text"
            name="liveBy"
            value={formData.liveBy}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.side}>
        <Estimate estimate={estimate} />

        <button
          type="button"
          className={styles.submit}
          onClick={handleSubmit}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Request a quote'}
        </button>

        {status === 'success' && (
          <p className={styles.success} role="status">
            Thanks. I will get back to you.
          </p>
        )}
        {status === 'error' && (
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuoteForm;
