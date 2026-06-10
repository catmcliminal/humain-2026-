import { CURRENT_EDITION_YEAR } from '../config';

/**
 * Filter rotating collections (speakers, schedule, sponsors) to what should
 * appear on the live site: entries that are `active` and belong to the current
 * edition year. Retired or past-year entries stay in the repo as data but are
 * excluded here. See src/config.ts CURRENT_EDITION_YEAR.
 */
export function currentEdition<T extends { data: { active?: boolean; year?: number } }>(
  items: T[]
): T[] {
  return items.filter((i) => i.data.active !== false && i.data.year === CURRENT_EDITION_YEAR);
}
