/**
 * The 2026 venue, as a schema.org Place.
 *
 * Single source of truth for structured data: the conference Event JSON-LD in
 * `BaseLayout.astro` and the per-session Event JSON-LD on `/programme/[slug]`
 * both use this, so a venue change lands in both at once.
 *
 * Prose mentions of the venue (the FAQ entries, `/faq`, the meta descriptions,
 * the partners copy) are deliberately NOT generated from this — they are
 * written sentences, not data — but they do need updating by hand if the venue
 * moves. Search for "Stone & Chalk" to find them.
 */
export const VENUE = {
  '@type': 'Place',
  name: 'Stone & Chalk Tech Central (The Collider)',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '477 Pitt St',
    addressLocality: 'Haymarket',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
} as const;
