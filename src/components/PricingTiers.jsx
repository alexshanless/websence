import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { formatPrice } from '../lib/formatPrice';
import styles from './PricingTiers.module.css';

const {
  tiers,
  carePlan,
  ownershipHandoff,
  addOns,
  timeline,
  timelineQualifier,
  revisions,
} = site.pricing;

// The three main tiers carry the grid. Anything flagged secondary renders
// below them, lighter, never alongside.
const mainTiers = tiers.filter((tier) => !tier.isSecondary);
const secondaryTier = tiers.find((tier) => tier.isSecondary) ?? null;

// Single Page and Ownership Handoff share this shape: a lighter block with a
// name, a price, a positioning line, an inclusions list, and optional
// exclusions and closing line. Rendered by one component so the two can never
// drift apart visually.
function SecondaryProduct({ product, prefix, excludesLabel, closingLine }) {
  return (
    <div className={styles.secondary}>
      <div className={styles.secondaryHead}>
        <h3 className={styles.secondaryName}>{product.name}</h3>
        <p className={styles.secondaryPrice}>
          {prefix ? (
            <span className={styles.secondaryPrefix}>{prefix}</span>
          ) : null}
          {formatPrice(product.amount)}
        </p>
        <p className={styles.secondaryPositioning}>{product.positioning}</p>
      </div>
      <div className={styles.secondaryDetail}>
        <ul className={styles.secondaryIncludes}>
          {product.includes.map((item) => (
            <li key={item} className={styles.include}>
              {item}
            </li>
          ))}
        </ul>
        {product.excludes ? (
          <p className={styles.secondaryExcludes}>
            <span className={styles.secondaryExcludesLabel}>
              {excludesLabel}
            </span>
            {product.excludes.join(', ')}
          </p>
        ) : null}
        {closingLine ? (
          <p className={styles.secondaryUpgrade}>{closingLine}</p>
        ) : null}
      </div>
    </div>
  );
}

function TierPrice({ tier }) {
  if (tier.amount === null) {
    return <p className={styles.price}>{tier.priceText}</p>;
  }

  return (
    <p className={styles.price}>
      {tier.prefix ? <span className={styles.prefix}>{tier.prefix}</span> : null}
      {formatPrice(tier.amount)}
    </p>
  );
}

// Rendered from one source so the home page, /services, and the construction
// page can never disagree on a number. `showCarePlanTerms` splits the two
// placements: /services gets the full Care Plan terms and the Ownership
// Handoff below it, the home page gets a single line and no handoff at all.
function PricingTiers({
  variant = 'light',
  showAddOns = false,
  showCarePlanTerms = false,
}) {
  return (
    <div className={`${styles.pricing} ${styles[variant]}`}>
      <ul className={styles.tierGrid}>
        {mainTiers.map((tier) => (
          <li
            key={tier.id}
            className={`${styles.tier} ${tier.isDefault ? styles.tierDefault : ''}`}
          >
            <h3 className={styles.tierName}>{tier.name}</h3>
            <TierPrice tier={tier} />
            {tier.body ? (
              <p className={styles.tierBody}>{tier.body}</p>
            ) : (
              <ul className={styles.includes}>
                {tier.includes.map((item) => (
                  <li key={item} className={styles.include}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {tier.showRevisions ? (
              <p className={styles.revisions}>{revisions}</p>
            ) : null}
          </li>
        ))}
      </ul>

      {secondaryTier ? (
        <SecondaryProduct
          product={secondaryTier}
          excludesLabel="Not included"
          closingLine={secondaryTier.upgradeLine}
        />
      ) : null}

      {showCarePlanTerms ? (
        <>
          <div className={styles.carePlan}>
            <div className={styles.carePlanHead}>
              <h3 className={styles.tierName}>{carePlan.name}</h3>
              <p className={styles.price}>
                <span className={styles.prefix}>{carePlan.prefix}</span>
                {formatPrice(carePlan.amount)}
                <span className={styles.suffix}> {carePlan.suffix}</span>
              </p>
              {/* Terms, rendered with the product rather than in a footer. */}
              <ul className={styles.terms}>
                {carePlan.terms.map((term) => (
                  <li key={term} className={styles.term}>
                    {term}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.carePlanDetail}>
              <ul className={styles.carePlanIncludes}>
                {carePlan.includes.map((item) => (
                  <li key={item} className={styles.include}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.carePlanNote}>
                {carePlan.contentUpdatesNote}
              </p>
              <p className={styles.carePlanExcludes}>
                <span className={styles.secondaryExcludesLabel}>
                  Not included, quoted separately
                </span>
                {carePlan.excludes.join(', ')}
              </p>
              <p className={styles.carePlanNote}>{carePlan.editing}</p>
              <p className={styles.carePlanNote}>{carePlan.hosting}</p>
            </div>
          </div>

          <SecondaryProduct
            product={ownershipHandoff}
            prefix={ownershipHandoff.prefix}
            closingLine={ownershipHandoff.note}
          />
        </>
      ) : (
        // Home page: one short line, no terms, no handoff.
        <p className={styles.carePlanLine}>{carePlan.homeLine}</p>
      )}

      {showAddOns ? (
        <div className={styles.addOns}>
          <h3 className={styles.addOnsTitle}>Add-ons</h3>
          <ul className={styles.addOnList}>
            {addOns.map((addOn) => (
              <li key={addOn.id} className={styles.addOn}>
                <span className={styles.addOnName}>{addOn.name}</span>
                <span className={styles.addOnPrice}>
                  {addOn.prefix ? `${addOn.prefix} ` : ''}
                  {formatPrice(addOn.amount)}
                  {addOn.suffix ? ` ${addOn.suffix}` : ''}
                </span>
                <span className={styles.addOnDescription}>
                  {addOn.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className={styles.timeline}>{timeline}</p>
      <p className={styles.qualifier}>{timelineQualifier}</p>

      <Link to="/contact" className={styles.quoteLink}>
        Build an estimate with the quote form &rarr;
      </Link>
    </div>
  );
}

export default PricingTiers;
