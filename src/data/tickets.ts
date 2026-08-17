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
  /** Saving against this tier's own standard price (standard − early bird). */
  saving: string;
  color: string;
  featured: boolean;
  /** Conference day(s) this tier admits you to. */
  covers: ('2026-10-13' | '2026-10-14')[];

  /* --- used by the ticket section on /programme --- */
  /** Card title, e.g. "Conference, day one". */
  label: string;
  /** Date line under the title, e.g. "Tuesday 13 October". */
  dateLabel: string;
  /** What the tier includes, one line each. */
  features: string[];
  /** Button text, e.g. "Get day one". */
  cta: string;
  /** Optional eyebrow above the title on the highlighted card. */
  eyebrow?: string;
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
    label: 'Conference, day one',
    dateLabel: 'Tuesday 13 October',
    features: [
      'Full main stage programme',
      'Hosted round table at lunch',
      'AI Upfronts showcase',
      'Networking drinks',
    ],
    cta: 'Get day one',
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
    label: 'Both days',
    dateLabel: '13 and 14 October',
    features: [
      'Everything in day one',
      'Your pick of workshop tracks',
      'Priority round table seating',
      'Session recordings',
    ],
    cta: 'Get both days',
    eyebrow: 'Most booked',
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
    label: 'Workshops, day two',
    dateLabel: 'Wednesday 14 October',
    features: [
      'Three workshop tracks',
      'Ninety minutes each, hands on',
      'Capped room sizes',
      'Lunch included',
    ],
    cta: 'Get day two',
  },
];

const dollars = (s: string) => Number(s.replace(/[^0-9.]/g, ''));

/**
 * What the both-days tier saves against buying the two single days separately
 * at early-bird prices ($595 + $475 − $795 = $275).
 *
 * Deliberately NOT the same number as that tier's `saving` field, which is
 * $200 — the discount against its own standard price ($995). Both are true and
 * they answer different questions, so they are kept apart rather than reconciled.
 * Derived rather than hard-coded so it follows any price change.
 */
export const bothDaysBundleSaving = (): string | null => {
  const both = TICKETS.find((t) => t.covers.length === 2);
  const singles = TICKETS.filter((t) => t.covers.length === 1);
  if (!both || singles.length !== 2) return null;
  const diff =
    singles.reduce((sum, t) => sum + dollars(t.earlyPrice), 0) - dollars(both.earlyPrice);
  return diff > 0 ? `$${diff}` : null;
};

/**
 * The cheapest tier that gets you into a given day — what a session page shows
 * as its entry price.
 */
export const ticketForDay = (day: string): Ticket =>
  TICKETS.filter((t) => t.covers.includes(day as Ticket['covers'][number])).sort(
    (a, b) => Number(a.earlyPrice.slice(1)) - Number(b.earlyPrice.slice(1))
  )[0] ?? TICKETS[0];
