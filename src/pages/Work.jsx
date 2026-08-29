import {
  workFeatured,
  archiveProjects,
  getProjectMedia,
} from '../data/projects';
import { site } from '../config/site';
import CtaButton from '../components/CtaButton';
import ProjectImage from '../components/ProjectImage';
import Seo from '../components/Seo';
import page from '../components/Page.module.css';
import styles from './Work.module.css';

function WorkPage() {
  return (
    <>
      <Seo
        title="Web Design Work | Websence, Tacoma WA"
        description="Recent websites built by a web designer in Tacoma WA, for a guide service, a sauna studio, a restaurant, an engineering firm, and an online store."
        path="/work"
      />
      <main className={`${page.page} ${page.light}`}>
        <div className={page.container}>
          <span className={page.kicker}>Work</span>
          <h1 className={page.headline}>Web design work for small businesses</h1>
          <p className={page.lede}>
            Real sites for real businesses. Every one is custom, built to bring
            in calls and quote requests. Screenshot, one sentence, no thousand
            word case study.
          </p>

          <div className={styles.grid}>
            {workFeatured.map((project, index) => {
              const media = (
                <>
                  <div className={styles.imageWrapper}>
                    <ProjectImage
                      src={getProjectMedia(project)}
                      alt={project.name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.index}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className={styles.name}>{project.name}</h2>
                    {project.outcome ? (
                      <p className={styles.outcome}>{project.outcome}</p>
                    ) : null}
                  </div>
                </>
              );

              if (!project.link) {
                return (
                  <article key={project.id} className={styles.card}>
                    {media}
                  </article>
                );
              }

              return (
                <a
                  key={project.id}
                  href={project.link}
                  className={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {media}
                  <span className={styles.visit} aria-hidden="true">
                    Visit site &rarr;
                  </span>
                </a>
              );
            })}
          </div>

          {/* Name and industry only. No screenshots, no descriptions, no
              logos, and nothing is linked until the URLs are confirmed. */}
          <section className={styles.archive} aria-labelledby="archive-heading">
            <div className={styles.archiveHead}>
              <h2 id="archive-heading" className={styles.archiveHeading}>
                Also built
              </h2>
              <p className={styles.archiveNote}>Name and industry</p>
            </div>
            <ul className={styles.archiveList}>
              {archiveProjects.map((project) => (
                <li key={project.id} className={styles.archiveItem}>
                  <span className={styles.archiveName}>{project.name}</span>
                  <span className={styles.archiveIndustry}>
                    {project.industry}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className={page.ctaBand}>
            <div>
              <h2 className={page.ctaBandTitle}>
                Want one of these for your business?
              </h2>
              <p className={page.priceNote}>
                Tell me the trade and the jobs you want more of.
              </p>
            </div>
            <div className={page.ctaRow}>
              <CtaButton to="/contact" variant="dark">
                {site.ctaLabel}
              </CtaButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default WorkPage;
