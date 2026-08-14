import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CURRENT_EDITION_YEAR } from './config';

/*
 * Content collections for the humAIn site.
 *
 * IMPORTANT (handover): these Zod schemas are one of TWO sources of truth.
 * The Keystatic field schemas in `keystatic.config.ts` (Phase 5) must mirror
 * these exactly. When you change a field here, change it there too.
 *
 * Conventions (see CLAUDE.md):
 *  - Markdown (frontmatter + body) for body-text collections: `news`, `faq`.
 *  - YAML data files for structured collections: `speakers`, `advisory`,
 *    `schedule`, `gallery`, `sponsors`.
 *  - Every collection has an `order` number so editors control display
 *    sequence without touching code. `news` also sorts by `publishDate`.
 *  - Image fields are repo-relative URL strings under `public/images/...`
 *    (e.g. `/images/speakers/jane-doe.jpg`). Keystatic stores uploads there
 *    and writes back the path, so the value is render-ready as an <img src>.
 *    We intentionally do NOT use Astro's `image()` helper: it expects local
 *    imports and would fight Keystatic's path-based image handling, adding
 *    handover fragility for no visual gain on this static site.
 */

// Reusable: an optional repo-relative image path under /images/...
const imagePath = z
  .string()
  .startsWith('/images/', { message: 'Image path must start with /images/' });

/*
 * Edition fields, shared by the collections that rotate year to year
 * (speakers, schedule, sponsors). The live site shows only entries that are
 * `active` AND whose `year` is the current edition (src/config.ts). Retiring
 * content for next year is therefore lossless: bump CURRENT_EDITION_YEAR and/or
 * uncheck `active` — the entry stays in the repo as data, just stops rendering.
 */
const editionFields = {
  active: z.boolean().default(true),
  year: z.number().default(CURRENT_EDITION_YEAR),
};

// 05 — Speakers ("The voices.") — structured, YAML, one file per speaker.
const speakers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/speakers' }),
  schema: z.object({
    name: z.string(),
    // e.g. "Creative Director, an agency exploring generative workflows"
    role: z.string(),
    photo: imagePath.optional(),
    bio: z.string().optional(),
    // Keynote speakers lead the /voices lineup (pulled above the rest of the
    // `order` and shown larger). Independent of `featured` — a speaker can be
    // a keynote, homepage-featured, both, or neither.
    keynote: z.boolean().default(false),
    // Advisory panel members get a pink tag on the Voices page; speakers get yellow.
    advisory: z.boolean().default(false),
    // Surface on the homepage lineup vs. only on the full-lineup page.
    featured: z.boolean().default(false),
    order: z.number(),
    ...editionFields,
  }),
});

// Advisory Panel ("The people behind the programme.") — structured, YAML,
// one file per member. Independent of `speakers`: a person can be a speaker,
// an advisory panel member, or both — each collection is edited separately.
const advisory = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/advisory' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: imagePath.optional(),
    bio: z.string().optional(),
    order: z.number(),
    ...editionFields,
  }),
});

// Schedule / agenda — structured, YAML, one file per session. Powers the
// "Sessions announced" section on /programme, grouped by `day`.
const schedule = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/schedule' }),
  schema: z.object({
    title: z.string(),
    // The two conference days: 13–14 Oct 2026, Sydney.
    day: z.enum(['2026-10-13', '2026-10-14']),
    // Optional until the time slot is confirmed — leave blank rather than guessing.
    startTime: z.string().optional(), // "09:30"
    endTime: z.string().optional(),
    stage: z.string().optional(), // e.g. "Main stage", "Workshop room"
    // Free-text speaker name(s) for now; can become a reference later.
    speaker: z.string().optional(),
    // One photo per speaker on the session — supports solo talks and panels alike.
    photos: z.array(imagePath).optional(),
    description: z.string().optional(),
    order: z.number(),
    ...editionFields,
  }),
});

// 04 — Media & articles ("Thinking out loud.") — body text, Markdown.
const news = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    // e.g. "Essay · The Taste Gap" — shown as the card category line.
    category: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('the humAIn desk'),
    // e.g. "9 min read" / "Podcast · 41 min" — free text from the design.
    readingTime: z.string().optional(),
    coverImage: imagePath.optional(),
    // Pin to the homepage Media section. Unflagged articles still appear there
    // (newest first) until the three slots are full, and always on /news.
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// 06 — Gallery ("Scenes from the floor.") — structured, YAML, one file per image.
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/gallery' }),
  schema: z.object({
    image: imagePath,
    alt: z.string(),
    caption: z.string().optional(), // overlaid label, e.g. "Main stage · 2025"
    // Pin to the homepage gallery (the 7-tile bento). Unflagged images fill any
    // remaining slots by `order`, and all images appear on /gallery.
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

// Sponsors / partners — structured, YAML, one file per sponsor.
// (No section in the Pulse design yet; markup arrives with a later phase.)
const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    logo: imagePath,
    url: z.string().url().optional(),
    tier: z.enum(['headline', 'partner', 'supporter', 'community']),
    order: z.number(),
    ...editionFields,
  }),
});

// FAQ — body text (the answer is Markdown), one file per question.
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    category: z.string().optional(), // e.g. "Tickets", "Travel"
    order: z.number(),
  }),
});

/*
 * Gift register — the public record promised on /about/editorial-standards
 * ("Staff gifts are recorded in a gift register"). One YAML file per entry.
 *
 * No `order` field: a register is chronological, so `dateReceived` drives the
 * sequence (newest first). Declined and returned offers belong here too — the
 * point of the record is what was offered, not only what was kept.
 */
const gifts = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/gifts' }),
  schema: z.object({
    // What the gift was, e.g. "Dinner and drinks" or "Noise-cancelling headphones".
    gift: z.string(),
    dateReceived: z.coerce.date(),
    // Who it was offered to, e.g. "Cat McGinn".
    recipient: z.string(),
    // Who offered it — person and/or organisation.
    from: z.string(),
    // Free text, not a number: editors rarely know the exact figure and an
    // honest "approx. $150" beats a false precision. e.g. "approx. $150".
    estimatedValue: z.string().optional(),
    outcome: z.enum(['Retained', 'Declined', 'Returned', 'Donated', 'Shared with the team']),
    notes: z.string().optional(),
    // Lets an entry be drafted before it goes on the public record.
    published: z.boolean().default(true),
  }),
});

export const collections = { speakers, advisory, schedule, news, gallery, sponsors, faq, gifts };
