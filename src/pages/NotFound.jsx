import CtaButton from '../components/CtaButton';
import Seo from '../components/Seo';
import page from '../components/Page.module.css';

// Unknown URLs used to redirect silently to the home page, which reads to a
// crawler as every wrong URL being a real page with the home page's content.
// This answers with a real page instead, marked noindex, and offers the way
// back. Nothing else: follow up 11 asked for the line and a link home.
function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | Websence"
        description="That page does not exist. Head back to the home page for website design in Tacoma, or see the work and pricing."
        path="/404"
        noindex
      />
      <main className={`${page.page} ${page.light}`}>
        <div className={page.container}>
          <span className={page.kicker}>404</span>
          <h1 className={page.headline}>This page does not exist</h1>
          <p className={page.lede}>
            Which is embarrassing, given what I do for a living.
          </p>
          <div className={page.ctaRow}>
            <CtaButton to="/" variant="dark">
              Back to home
            </CtaButton>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
