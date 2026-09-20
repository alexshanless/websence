import { site } from '../config/site';
import { formatPrice } from '../lib/formatPrice';

// Questions phrased the way someone actually types them into a search box or
// asks an assistant, each answered in one self-contained paragraph. That is
// the point: an answer engine quotes a passage, not a page, so an answer that
// only makes sense after reading the section above it cannot be quoted, and
// an answer that never states the number cannot be the answer to a question
// about the number.
//
// Every figure is read from src/config/site.js and every sentence is one the
// rest of the site already stands behind. Nothing here may claim work that
// has not been done, a turnaround that is not in the Care Plan terms, or a
// price that is fixed when the tier says "from".

const tier = (id) => site.pricing.tiers.find((entry) => entry.id === id);

const singlePage = tier('single-page');
const starter = tier('starter');
const standard = tier('standard');
const { carePlan, ownershipHandoff } = site.pricing;

// The service area as a sentence: "Tacoma, Puyallup, Lakewood, Gig Harbor,
// and the South Sound".
const areaSentence = `${site.serviceArea.slice(0, -1).join(', ')}, and the ${site.serviceArea.at(-1)}`;

const lowerFirst = (sentence) =>
  sentence.charAt(0).toLowerCase() + sentence.slice(1);

// "free", or "from $500" if it ever carries a price again.
const handoffPrice = ownershipHandoff.priceText
  ? ownershipHandoff.priceText.toLowerCase()
  : `${ownershipHandoff.prefix.toLowerCase()} ${formatPrice(ownershipHandoff.amount)}`.trim();

// The phone is omitted from the copy until it exists, the same way PhoneLink
// renders nothing rather than a placeholder.
const howToReach = site.phone
  ? `Call ${site.legalName} on ${site.phone} or email ${site.email}`
  : `Email ${site.legalName} at ${site.email}`;

export const faqItems = [
  {
    id: 'cost',
    question: 'How much does a small business website cost in Tacoma?',
    answer: `A custom small business website from ${site.legalName} in Tacoma is ${formatPrice(
      singlePage.amount
    )} for a single page, from ${formatPrice(
      starter.amount
    )} for a five page site, and ${formatPrice(
      standard.amount
    )} for a larger build with service area pages, copywriting, and conversion tracking. Anything bigger than a website is quoted after a call. These prices are published rather than hidden behind a contact form, and the final number depends on scope, which is confirmed on a call before anything is committed.`,
  },
  {
    id: 'timeline',
    question: 'How long does it take to build a small business website?',
    // The config sentence starts "Live in ...", which is a fragment on its
    // own. Lowercasing the first letter turns it into the tail of a sentence
    // that names the subject, and it survives the duration changing.
    answer: `A ${site.legalName} site is ${lowerFirst(site.pricing.timeline)} A single page site is live in one week from kickoff. ${site.pricing.timelineQualifier} Only one project runs at a time, so the build is not queued behind someone else's.`,
  },
  {
    id: 'included',
    question: 'What is included in a small business website?',
    // Semicolons, not commas: the first inclusion is "Five pages, custom
    // built", and a comma-joined list turns that one item into two.
    answer: `The five page ${starter.name} build from ${site.legalName} includes, as standard: ${starter.includes.join(
      '; '
    )}. ${site.pricing.revisions} Every site is custom built rather than assembled from a template or a page builder.`,
  },
  {
    id: 'hosting',
    question: 'Do you do website hosting and maintenance?',
    answer: `Yes. The ${site.legalName} ${carePlan.name} is ${carePlan.prefix.toLowerCase()} ${formatPrice(
      carePlan.amount
    )} ${carePlan.suffix} and covers hosting, SSL, backups, platform updates, uptime monitoring, and up to three hours of content updates a month, with a turnaround of three to five business days. ${carePlan.hosting}`,
  },
  {
    id: 'editing',
    question: 'Can I update the website myself after it launches?',
    // Reads the handoff price rather than naming it, so "free" here cannot
    // outlive the config saying it is free.
    answer: `${carePlan.editing} If you would rather run the site yourself, or hand it to a developer you already work with, the Ownership Handoff is ${handoffPrice} and includes all the site files, the repository, deploy instructions, and a walkthrough call.`,
  },
  {
    id: 'area',
    question: 'What areas around Tacoma do you serve?',
    answer: `${site.legalName} is based in ${site.address.locality}, ${site.address.region}, and builds websites for businesses in ${areaSentence}. Anywhere in Pierce County is straightforward, and the whole thing can be done without a single meeting if that suits you better.`,
  },
  {
    id: 'trades',
    question: 'Do you build websites for trades and contractors?',
    answer: `Yes. Trades and local service businesses are who these sites are built for, along with restaurants, shops, and small online stores. Recent builds include a guide service, a sauna studio, a restaurant, an engineering firm, and an online store. The site is built around the one job those businesses need it to do: turn a local search into a phone call or a quote request.`,
  },
  {
    id: 'quote',
    question: 'How do I get a quote for a website in Tacoma?',
    answer: `${howToReach} with a few lines about the business and the jobs you want more of. You get a price and a timeline before anything gets built, and nothing is committed by asking.`,
  },
];

export default faqItems;
