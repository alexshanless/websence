import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site, startingPrice } from '../config/site';
import { proofNames } from '../data/projects';
import { formatPrice } from '../lib/formatPrice';
import { localBusinessSchema } from '../lib/schema';
import CtaButton from '../components/CtaButton';
import ClientMarquee from '../components/ClientMarquee';
import PricingTiers from '../components/PricingTiers';
import Hero from '../components/Hero';
import ProjectImage from '../components/ProjectImage';
import Seo from '../components/Seo';
import Works from '../components/Works';
import styles from './Home.module.css';

const outcomes = [
  {
    id: '01',
    title: 'Calls, not clicks',
    body: 'Click to call and a quote form on every page. The lead lands in your inbox and stays yours.',
  },
  {
    id: '02',
    title: 'Built for the phone',
    body: 'Most local searches happen on a phone in a truck. The site loads fast and works with one thumb.',
  },
  {
    id: '03',
    title: 'Found nearby',
    body: 'Set up to show for the work you actually do, in the cities you actually drive to.',
  },
  {
    id: '04',
    title: 'Proof on the page',
    body: 'Your finished jobs, sitting right next to the button that starts the next one.',
  },
];

function HomePage() {
  const [isHeroSticky, setIsHeroSticky] = useState(true);
  const worksEndRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroSticky(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    const currentRef = worksEndRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Seo
        title="Web Design Tacoma for Small Businesses | Websence"
        description="Custom web design in Tacoma for small businesses and trades. Sites built to bring in calls, quote requests, and booked jobs. From $3,500, live in weeks."
        path="/"
        schema={localBusinessSchema()}
      />
      <main>
        <Hero isSticky={isHeroSticky} />
        <section className={styles.intro} aria-labelledby="home-heading">
          <div className={styles.introInner}>
            <div className={styles.introGrid}>
              <h1 id="home-heading" className={styles.introHeadline}>
                Website design for Tacoma businesses
              </h1>
              <div className={styles.introSide}>
                <p className={styles.introBody}>
                  Custom sites that bring in calls, quote requests, and booked
                  jobs. Built in Tacoma by someone who answers the phone.
                </p>
                <div className={styles.introCta}>
                  <CtaButton to="/contact" variant="dark">
                    {site.ctaLabel}
                  </CtaButton>
                </div>
              </div>
            </div>

            {/* The price anchor. Above the fold, stated as a fact. */}
            <dl className={styles.anchor}>
              <div className={styles.anchorCell}>
                <dt className={styles.anchorLabel}>Price</dt>
                <dd className={styles.anchorValue}>
                  From {formatPrice(startingPrice)}
                </dd>
              </div>
              <div className={styles.anchorCell}>
                <dt className={styles.anchorLabel}>Timeline</dt>
                <dd className={styles.anchorValue}>{site.pricing.timeline}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className={styles.proof} aria-label="Recent clients">
          <div className={styles.proofInner}>
            <div className={styles.proofHead}>
              <p className={styles.proofLabel}>Recent work</p>
              <Link to="/work" className={styles.proofLink}>
                See the work
              </Link>
            </div>
            <ClientMarquee />
            {/* The marquee is decorative, so the names still exist as text. */}
            <p className={styles.visuallyHidden}>{proofNames.join(', ')}</p>
          </div>
        </section>

        <Works />
        <div
          ref={worksEndRef}
          style={{ height: '1px', pointerEvents: 'none' }}
        ></div>
      </main>

      <section className={styles.studio} aria-labelledby="studio-heading">
        <div className={styles.studioInner}>
          <h2 id="studio-heading" className={styles.studioHeading}>
            The whole company is on this page
          </h2>
          <p className={styles.studioLead}>
            You work with me directly, start to finish. No handoffs, no account
            manager you have never met.
          </p>
          <ul className={styles.teamGrid}>
            {site.team.map((member) => (
              <li key={member.id} className={styles.teamCard}>
                <div className={styles.teamPhotoWrap}>
                  <ProjectImage
                    src={member.photo}
                    alt={
                      member.photo
                        ? `${member.name}, ${member.role}`
                        : `Photo of ${member.name} coming soon`
                    }
                    className={styles.teamPhoto}
                    width={member.photoWidth}
                    height={member.photoHeight}
                    silentFallback
                  />
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamLine}>{member.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.pitch}>
        <div className={styles.pitchInner}>
          <div className={styles.pitchHead}>
            <p className={styles.kicker}>Tacoma, WA</p>
            <h2 className={styles.pitchHeadline}>
              Turn local searches into booked jobs.
            </h2>
            <p className={styles.pitchBody}>
              Most local sites are a brochure. Someone lands, reads three
              paragraphs, finds nothing to do, and goes back to the search
              results. That is a job you paid to lose.
            </p>
          </div>

          <ul className={styles.outcomeGrid}>
            {outcomes.map((item) => (
              <li key={item.id} className={styles.outcome}>
                <span className={styles.outcomeNum}>{item.id}</span>
                <h3 className={styles.outcomeTitle}>{item.title}</h3>
                <p className={styles.outcomeBody}>{item.body}</p>
              </li>
            ))}
          </ul>

          <div className={styles.pricingBlock}>
            <h3 className={styles.pricingTitle}>What it costs</h3>
            <p className={styles.pricingSubhead}>
              No &ldquo;contact us for pricing.&rdquo;
            </p>
            <PricingTiers variant="dark" />
          </div>

          <div className={styles.closer}>
            <div>
              <p className={styles.priceNote}>
                No templates. No page builders sold as the product. One project
                at a time, so yours is the one I am working on.
              </p>
            </div>
            <div className={styles.ctaRow}>
              <CtaButton to="/contact" variant="light">
                {site.ctaLabel}
              </CtaButton>
              <Link to="/work" className={styles.secondaryLink}>
                See work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
