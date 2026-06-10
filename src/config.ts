/**
 * Site-wide configuration constants.
 *
 * TICKET_URL — the off-site ticketing page (e.g. Humanitix / Eventbrite).
 * Not finalised yet, so it currently points at the on-page pricing section
 * (#conference). When the real URL is known, set it here (a full https://…
 * link) and every "Get tickets" / "Secure your seat" CTA across the site
 * updates at once and opens off-site in a new tab.
 */
export const TICKET_URL = '#conference';

/** True when TICKET_URL is an external link (so we add target/rel). */
export const TICKET_IS_EXTERNAL = /^https?:\/\//.test(TICKET_URL);
