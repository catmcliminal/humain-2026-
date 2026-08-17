/**
 * The three ticket tiers.
 *
 * Single source of truth: `src/components/Tickets.astro` renders the full
 * pricing table from this, and the session pages (`/programme/[slug]`) read the
 * tier that covers the day a session runs on, so a price change lands in both
 * places at once. Prices exclude GST; `TICKET_URL` and `EARLY_BIRD_NOTE` live in
 * `src/config.ts`.
 *
 * `day` is which conference day the tier admits you to — used to pick the right
 * tier to show alongside a session. The both-days tier covers both.
 */
export interface Ticket {
  name: string;
  days: string;
  earlyPrice: string;
  standardPrice: string;
  saving: string;
  color: string;
  featured: boolean;
  /** Conference day(s) this tier admits you to. */
  covers: ('2026-10-13' | '2026-10-14')[];
}

export const TICKETS: Ticket[] = [
  {
    name: 'Conference only',
    days: 'Day one only',
    earlyPrice: '$595',
    standardPrice: '$745',
    saving: '$150',
    color: 'var(--blue)',
    featured: false,
    covers: ['2026-10-13'],
  },
  {
    name: 'Conference + Workshop',
    days: 'Both days',
    earlyPrice: '$795',
    standardPrice: '$995',
    saving: '$200',
    color: 'var(--pink)',
    featured: true,
    covers: ['2026-10-13', '2026-10-14'],
  },
  {
    name: 'Workshop only',
    days: 'Day two only',
    earlyPrice: '$475',
    standardPrice: '$595',
    saving: '$120',
    color: 'var(--orange)',
    featured: false,
    covers: ['2026-10-14'],
  },
];

/**
 * The cheapest tier that gets you into a given day — what a session page shows
 * as its entry price.
 */
export const ticketForDay = (day: string): Ticket =>
  TICKETS.filter((t) => t.covers.includes(day as Ticket['covers'][number])).sort(
    (a, b) => Number(a.earlyPrice.slice(1)) - Number(b.earlyPrice.slice(1))
  )[0] ?? TICKETS[0];
