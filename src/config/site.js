const contactFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '';
const gaMeasurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '';

export const site = {
  name: 'WEBSENCE',
  // Must match the Google Business Profile listing exactly. The profile does
  // not carry "LLC", so neither does the NAP block or the schema name.
  legalName: 'Websence',
  tagline: 'Custom websites for Tacoma businesses. Built to make the phone ring.',
  url: 'https://websencestudio.com',
  email: 'hello@websencestudio.com',
  // The business line. A 564 number, supplied before launch.
  // Fill this one value and every place the number appears follows it: the footer
  // NAP block on every page, the contact page, LocalBusiness schema, click to call.
  // Use this format and only this format: (564) 123-4567
  phone: '(564) 225-2639',
  // The studio section, home page only. Render order is Alex, Anna, Stan.
  //
  // Role words: follow up 3 approved "developer", "client support", "design"
  // and banned Head of / Lead / Senior / Director / Manager / Chief. So
  // "lead dev" became "founder" (a fact about the business, not a seniority
  // title) and "frontend dev" became "developer".
  team: [
    {
      id: 'alex',
      name: 'Alex B',
      role: 'founder',
      line:
        'Runs the studio and works on every project from first call to launch.',
      photo: '/assets/team/alex.jpg',
      photoWidth: 230,
      photoHeight: 288,
    },
    {
      id: 'anna',
      name: 'Anna E',
      role: 'client support',
      line:
        'First point of contact for client questions and content updates after launch.',
      photo: '/assets/team/anna.jpg',
      photoWidth: 653,
      photoHeight: 816,
    },
    {
      id: 'stan',
      name: 'Stan P',
      role: 'developer',
      line:
        'Handles front end development across the builds.',
      photo: '/assets/team/stan.jpg',
      photoWidth: 800,
      photoHeight: 1000,
    },
  ],
  address: {
    street: '',
    locality: 'Tacoma',
    region: 'WA',
    postalCode: '',
    country: 'US',
  },
  // Named towns, used for both the footer service-area line and the
  // LocalBusiness areaServed. Keeping one list means the copy and the schema
  // can never name different places.
  serviceArea: ['Tacoma', 'Puyallup', 'Lakewood', 'Gig Harbor', 'South Sound'],
  serviceAreaLine:
    'Serving Tacoma, Puyallup, Lakewood, Gig Harbor, and the South Sound',
  // Published pricing. Real numbers, shown everywhere pricing appears.
  // Three tiers plus maintenance. No fourth tier, no free option, no
  // comparison matrix, no calculator. Starter is the visual default and
  // Standard is never flagged "most popular" — there is no data behind that.
  // Inclusions are exactly what Alex specified. Do not pad a thin tier.
  pricing: {
    // Never write the duration without "from kickoff".
    timeline: 'Live in 2 to 4 weeks from kickoff.',
    timelineQualifier:
      'Timeline assumes photos, logo, and business details are delivered in the first week.',
    revisions:
      'Two rounds of revisions included. Additional rounds are quoted separately.',
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        amount: 3500,
        // "From" stays on Starter.
        prefix: 'From',
        isDefault: true,
        includes: [
          'Five pages, custom built',
          'Mobile first',
          'Contact and quote forms',
          'Basic SEO setup',
          'Launch support',
        ],
        showRevisions: true,
      },
      {
        id: 'standard',
        name: 'Standard',
        amount: 6500,
        // Flat number. No "from" on this one.
        prefix: '',
        isDefault: false,
        includes: [
          'Everything in Starter',
          'Additional pages',
          'Service area pages',
          'Copywriting',
          'Conversion tracking',
        ],
        showRevisions: true,
      },
      {
        id: 'custom',
        name: 'Custom',
        amount: null,
        priceText: 'Quoted',
        isDefault: false,
        // Prose rather than a bullet list: this tier is defined by the
        // conversation, not by a feature count.
        body:
          'Bigger than a website. Web apps, internal tools, integrations. Tell me what you are trying to build.',
        includes: [],
        showRevisions: false,
      },
      // Secondary product. Renders last and lighter than the three above it,
      // never first, never in the hero, title, or meta. Framed by fit, not by
      // price: it is for a smaller need, not a smaller wallet. Never call it a
      // deal, offer, promo, intro price, or entry level.
      {
        id: 'single-page',
        name: 'Single Page',
        amount: 1500,
        // Flat price. Never "from".
        prefix: '',
        isDefault: false,
        isSecondary: true,
        positioning:
          'One page, done properly. For businesses that need to be findable and reachable, without a full site yet.',
        includes: [
          'One page, custom built',
          'Mobile first',
          'Contact or quote form',
          'Basic SEO setup',
          'Google Business Profile linked correctly',
          'One revision round',
          'Live in one week from kickoff',
        ],
        // Stated plainly in the copy, not buried.
        excludes: ['Additional pages', 'Copywriting', 'Branding'],
        upgradeLine:
          'Outgrown it later, and the work carries over into a full site.',
        // Carries its own revision terms in `includes`, so the two-round line
        // that applies to Starter and Standard must not render here.
        showRevisions: false,
      },
    ],
    // The one ongoing product. There are no Care Plan tiers, no annual prepay
    // discount, no 24/7 or emergency support, no uptime percentages or SLAs —
    // none of that is decided, so none of it is claimed.
    carePlan: {
      id: 'care-plan',
      name: 'Care Plan',
      amount: 150,
      prefix: 'From',
      suffix: 'per month',
      includes: [
        'Hosting, included in the price',
        'SSL, backups, and platform updates',
        'Up to 3 hours of content updates per month',
        'Uptime monitoring',
      ],
      contentUpdatesNote:
        'Content updates means text changes, image swaps, hours, staff, contact details, new project photos, and adding items to existing lists.',
      excludes: [
        'New pages',
        'Design changes',
        'New features or integrations',
        'Copywriting',
        'SEO work beyond keeping existing pages intact',
      ],
      // These are terms, not footnotes. They render with the product.
      terms: [
        'Turnaround is 3 to 5 business days',
        'Hours do not roll over month to month',
        'Month to month, cancel any time',
      ],
      // Hosting sits on my account. Never say the client owns it, and never
      // suggest they are locked in — the exit is stated plainly, not dressed
      // up. The domain is always theirs.
      hosting:
        'Hosting is included in the price and runs on my account. Your domain stays in your name. If you cancel, I hand over the site files and help you move.',
      // Clients do not edit the site. Never promise a CMS, dashboard, editor
      // login, or self-serve editing anywhere on the site.
      editing:
        'You do not edit the site yourself. You send the change, it is done within 3 to 5 business days, and you never touch a CMS.',
      homeLine:
        'Care Plan from $150 per month. Hosting and content updates included.',
    },
    // Secondary to the Care Plan, on /services only. Never on the home page,
    // never in the quote form — it is a sales conversation, not an option.
    // Positioned by fit, not as a way to dodge the monthly cost.
    ownershipHandoff: {
      name: 'Ownership Handoff',
      amount: 500,
      prefix: 'From',
      positioning:
        'Best if you have someone technical, or a developer you work with.',
      includes: [
        'All site files and the repository',
        'Deploy and hosting setup instructions',
        'Documentation of the site structure',
        'A walkthrough call covering how to make changes yourself, including with an AI assistant like Claude or ChatGPT',
      ],
      // Never claim anyone can maintain a custom site with an AI tool, and
      // never present AI as the mechanism — it is mentioned once, above.
      note: 'Available at any time, not only at project close. Ongoing support is not included. Further help is quoted separately.',
    },
    // Add-ons, not tiers. Shown on /services below the tiers and as options in
    // the quote form. "From" stays on every one that has it — it is what makes
    // the estimate a floor rather than a fixed sum. Do not add to this list.
    // `recurring` keeps monthly money out of the one-time subtotal.
    addOns: [
      {
        id: 'brand-basics',
        name: 'Brand basics',
        amount: 1500,
        prefix: 'From',
        description: 'Logo, color palette, type, simple usage guidance',
      },
      {
        id: 'copywriting',
        name: 'Copywriting',
        amount: 600,
        prefix: 'From',
        description:
          'Written page copy, based on a call and your existing material',
      },
      {
        id: 'photography',
        name: 'Photography',
        amount: 800,
        prefix: 'From',
        description:
          'Coordinated local shoot for your team, space, or finished work',
      },
      {
        id: 'service-area-pages',
        name: 'Extra service area pages',
        amount: 350,
        prefix: '',
        suffix: 'each',
        description: 'A page targeting one additional town or service',
      },
      {
        id: 'conversion-tracking',
        name: 'Conversion tracking setup',
        amount: 450,
        prefix: '',
        description: 'Analytics, call tracking, and form reporting',
      },
      {
        id: 'care-plan',
        name: 'Care Plan',
        amount: 150,
        prefix: 'From',
        suffix: 'per month',
        // Monthly. Never folded into the one-time estimate.
        recurring: true,
        description:
          'Hosting, SSL, backups, uptime monitoring, and up to 3 hours of content updates a month',
      },
    ],
    // Package options in the quote form. "Not sure yet" carries no base figure.
    packageOptions: [
      { id: 'starter', label: 'Starter' },
      { id: 'standard', label: 'Standard' },
      { id: 'single-page', label: 'Single Page' },
      { id: 'not-sure', label: 'Not sure yet' },
    ],
    // Required wherever the estimate is shown. Never label the number "Total",
    // "Your price", or "Quote".
    estimateLabel: 'Estimated starting point',
    estimateQualifier:
      'This is a starting estimate. Final pricing depends on scope, and we confirm it on a call before anything is committed.',
  },
  ctaLabel: 'Get a quote',
  contactFormEndpoint: contactFormEndpoint.trim(),
  gaMeasurementId: gaMeasurementId.trim(),
  legalUpdated: 'August 25, 2026',
  // Google Business Profile URL, linked from the footer once supplied.
  googleBusinessProfile: '',
  // Google Search Console verification. Verification method still to be
  // confirmed with Alex; a DNS TXT record needs nothing here, the HTML tag
  // method needs the token pasted below.
  searchConsoleToken: '',
};

// The anchor number. Derived so the hero, the tier block, and the construction
// page can never drift apart.
export const startingPrice = site.pricing.tiers[0].amount;

// The one phone format used across the site: (564) 123-4567
export const phoneFormat = /^\(\d{3}\) \d{3}-\d{4}$/;

export function telHref(phone) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    return '';
  }
  // E.164. A bare ten digit string dials on a US handset but is ambiguous to
  // some dialers and to anyone calling from abroad.
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`;
}

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
];
