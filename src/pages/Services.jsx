import { site } from '../config/site';
import CtaButton from '../components/CtaButton';
import PricingTiers from '../components/PricingTiers';
import Seo from '../components/Seo';
import page from '../components/Page.module.css';
import styles from './Services.module.css';

function ServicesPage() {
  return (
    <>
      <Seo
        title="Website Design for Service Businesses, Tacoma | Websence"
        description="Website design packages for local service businesses in Tacoma. Published prices, a two to four week build, and a care plan that keeps the site current."
        path="/services"
      />
      <main className={styles.services}>
        {/* Light opening band, same 1100px grid as the home page intro. */}
        <section className={`${page.page} ${page.light} ${styles.intro}`}>
          <div className={page.container}>
            <span className={page.kicker}>Services</span>
            <h1 className={page.headline}>
              Website design for local service businesses in Tacoma
            </h1>
            <p className={page.lede}>
              Every trade is different. The job of the site is the same. Take
              the call, capture the lead, show the work, and get found by the
              people nearby who are ready to hire.
            </p>
            <p className={`${page.body} ${styles.also}`}>
              I also build for restaurants, shops, and service businesses around
              Tacoma and Pierce County. More pages go up as I write them. If
              your trade is not listed yet, the work is the same. Ask.
            </p>
          </div>
        </section>

        {/* Dark band, matching the home page pricing section. Same component,
            same dark variant, so the two pages show pricing identically. */}
        <section className={styles.pricing} aria-labelledby="pricing-heading">
          <div className={styles.pricingInner}>
            <p className={styles.kicker}>Tacoma, WA</p>
            <h2 id="pricing-heading" className={styles.pricingHeading}>
              What it costs
            </h2>
            <p className={styles.pricingSubhead}>
              No &ldquo;contact us for pricing.&rdquo; You get a price and a
              timeline before anything gets built.
            </p>
            <PricingTiers variant="dark" showAddOns showCarePlanTerms />
          </div>
        </section>

        <section className={`${page.page} ${page.light} ${styles.closing}`}>
          <div className={page.container}>
            <div className={page.ctaBand}>
              <div>
                <h2 className={page.ctaBandTitle}>
                  Tell me what you want the phone to do
                </h2>
              </div>
              <div className={page.ctaRow}>
                <CtaButton to="/contact" variant="dark">
                  {site.ctaLabel}
                </CtaButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ServicesPage;
