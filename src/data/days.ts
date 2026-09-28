/**
 * The two conference days.
 *
 * Single source of truth for how a day is labelled: `/programme` groups its
 * sessions by these, and each session page (`/programme/[slug]`) reads the one
 * its session runs on. Previously both pages carried their own copy of the
 * labels, which is exactly the kind of duplication that drifts.
 *
 * `kind` is what the day *is* — the conference proper, or the workshop day.
 * The dates themselves are fixed by `day` in the schedule schema
 * (`src/content.config.ts`), so this list must stay in step with that enum.
 */
export interface Day {
  date: '2026-10-13' | '2026-10-14';
  /** Short running label, e.g. "Day 01". */
  label: string;
  /** Human date shown beside it, e.g. "13 October 2026". */
  dateLabel: string;
  /** What runs that day — "Conference" or "Masterclasses and Workshops". */
  kind: string;
  /** Anchor id for the day's block on /programme, so it can be linked to. */
  anchor: string;
}

export const DAYS: Day[] = [
  {
    date: '2026-10-13',
    label: 'Day 01',
    dateLabel: '13 October 2026',
    kind: 'Conference',
    anchor: 'day-01',
  },
  {
    date: '2026-10-14',
    label: 'Day 02',
    dateLabel: '14 October 2026',
    kind: 'Masterclasses and Workshops',
    anchor: 'day-02',
  },
];

/** The day a session runs on, or undefined if the date isn't one of the two. */
export const dayByDate = (date: string): Day | undefined =>
  DAYS.find((d) => d.date === date);
