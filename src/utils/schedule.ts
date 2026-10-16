import type { CollectionEntry } from 'astro:content';
import { markersForDay, type ScheduleMarker } from '../data/markers';

export type ScheduleSession = CollectionEntry<'schedule'>;

/*
 * The running order for a day is sessions *and* the rows between them — the
 * breaks, and the heading over the Creative Megathread block. Markers live in
 * `src/data/markers.ts` (not the schedule collection) and share one `order`
 * scale with it, so the two merge into a single ordered list per day. Shared
 * by /programme (all days) and /workshops (day two only) so both read the
 * same running order.
 */
export type ScheduleRow =
  | { kind: 'session'; order: number; session: ScheduleSession }
  | { kind: 'marker'; order: number; marker: ScheduleMarker };

export const rowsForDay = (sessions: ScheduleSession[], date: string): ScheduleRow[] =>
  [
    ...sessions
      .filter((s) => s.data.day === date)
      .map((s): ScheduleRow => ({ kind: 'session', order: s.data.order, session: s })),
    ...markersForDay(date).map((m): ScheduleRow => ({ kind: 'marker', order: m.order, marker: m })),
  ].sort((a, b) => a.order - b.order);
