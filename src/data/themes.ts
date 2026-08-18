/**
 * The four programme themes.
 *
 * These are the canonical ids and names used to tag sessions (the `themes`
 * field on the `schedule` collection) and to drive the theme filter on
 * /programme.
 *
 * The long-form theme copy lives in `src/components/Themes.astro`, which is
 * the homepage section and is deliberately NOT generated from this file — that
 * copy is approved wording and is edited by hand. What must stay in step is the
 * `name` below and the `<h3>` in that component: they are the same four themes
 * shown to the same reader, so a rename needs doing in both places.
 *
 * `short` is used only where space is tight (the tag on each session row).
 */
export type ThemeId = 'creative' | 'search' | 'taste' | 'culture';

export interface Theme {
  id: ThemeId;
  /** Display number, matching "Theme 01"–"Theme 04" on the homepage. */
  num: string;
  name: string;
  /** Abbreviated label for dense rows where the full name would wrap. */
  short: string;
  /** One line on what the theme covers — used under the theme name on /programme. */
  hook: string;
}

export const THEMES: Theme[] = [
  {
    id: 'creative',
    num: '01',
    name: 'AI & Creative Work',
    short: 'Creative Work',
    hook: 'How AI is changing who makes creative work, how it gets made, and what it is worth.',
  },
  {
    id: 'search',
    num: '02',
    name: 'Brand Discovery in the AI Age',
    short: 'Brand Discovery',
    hook: 'What happens to visibility and customer choice when machines sit between brands and people?',
  },
  {
    id: 'taste',
    num: '03',
    name: 'The Taste Gap',
    short: 'Taste Gap',
    hook: "As the cost of making falls, the value of knowing what's worth making rises.",
  },
  {
    id: 'culture',
    num: '04',
    name: 'Culture as Training Data',
    short: 'Culture',
    hook: 'AI learned from us. Now it shapes what audiences see, and whether they believe any of it.',
  },
];

export const THEME_IDS = THEMES.map((t) => t.id) as [ThemeId, ...ThemeId[]];

export const themeById = (id: string): Theme | undefined =>
  THEMES.find((t) => t.id === id);
