/**
 * Homepage selection rule shared by Voices, Articles and Gallery:
 * show flagged ("featured") entries first, then fill any remaining slots from
 * the rest, capped at `limit`. The caller passes items already sorted in their
 * natural display order (by `order`, or by date) — this preserves that order
 * within both the featured and the fill groups.
 */
export function featuredFirst<T extends { data: { featured?: boolean } }>(
  items: T[],
  limit: number
): T[] {
  const featured = items.filter((i) => i.data.featured);
  const rest = items.filter((i) => !i.data.featured);
  return [...featured, ...rest].slice(0, limit);
}
