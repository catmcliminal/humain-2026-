/**
 * The rows on the running order that are not sessions: the breaks, and the
 * headings that sit over a block of sessions.
 *
 * Kept here rather than in the `schedule` collection because a break is not a
 * session — giving it a collection entry would hand it a page at
 * `/programme/[slug]`, a themes field, a speaker field and a portrait grid it
 * has no use for, and would put "Morning tea" in Keystatic's session list
 * alongside the talks. Same reasoning as `roundtables.ts` and `days.ts`: a
 * fixed set that frames the programme, not a list an editor grows.
 *
 * `order` shares one scale with the schedule collection's `order`, so the
 * programme page can merge markers and sessions into a single running order.
 */
export interface ScheduleMarker {
  day: '2026-10-13' | '2026-10-14';
  /** Position in the day's running order — same scale as a session's `order`. */
  order: number;
  /** 24-hour start time, e.g. "10:40". */
  startTime?: string;
  label: string;
  /**
   * `break` is a gap in the programme; `group` is a heading over the sessions
   * that follow it, which carry no individual times of their own.
   */
  type: 'break' | 'group';
  /** Optional in-page link — the lunch break points at the round tables. */
  href?: string;
  /** Shown beside the label, e.g. the round tables that run through lunch. */
  note?: string;
}

export const SCHEDULE_MARKERS: ScheduleMarker[] = [
  { day: '2026-10-13', order: 3, startTime: '09:40', label: 'Creative Megathread', type: 'group' },
  { day: '2026-10-13', order: 8, startTime: '10:40', label: 'Morning tea', type: 'break' },
  {
    day: '2026-10-13',
    order: 13,
    startTime: '12:25',
    label: 'Lunch',
    type: 'break',
    note: 'Round tables',
    href: '#round-tables',
  },
  { day: '2026-10-13', order: 17, startTime: '15:40', label: 'Afternoon break', type: 'break' },
  {
    day: '2026-10-13',
    order: 20,
    startTime: '17:05',
    label: 'Networking drinks and human connection',
    type: 'break',
  },
];

/** The markers on one day, in running order. */
export const markersForDay = (date: string): ScheduleMarker[] =>
  SCHEDULE_MARKERS.filter((m) => m.day === date).sort((a, b) => a.order - b.order);
