/**
 * Site-wide configuration constants.
 *
 * TICKET_URL — the off-site ticketing page (e.g. Humanitix / Eventbrite).
 * Not finalised yet, so it currently points at the on-page pricing section
 * (#conference). When the real URL is known, set it here (a full https://…
 * link) and every "Get tickets" / "Secure your seat" CTA across the site
 * updates at once and opens off-site in a new tab.
 */
export const TICKET_URL = 'https://events.humanitix.com/humain/tickets';

/** Canonical site origin — used for canonical tags, structured data and OG URLs. */
export const SITE = 'https://www.humain.au';

/** True when TICKET_URL is an external link (so we add target/rel). */
export const TICKET_IS_EXTERNAL = /^https?:\/\//.test(TICKET_URL);

/**
 * The edition currently being promoted. The live site shows only entries whose
 * `year` matches this (and that are `active`); past years stay in the repo as
 * data and can power archive views later. Bump this one number to roll the
 * site over to the next edition — new entries default to this year.
 */
export const CURRENT_EDITION_YEAR = 2026;
