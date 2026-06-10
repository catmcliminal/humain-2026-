# humAIn Conference Site

Single-page conference site for **humAIn**, being rebuilt from a hand-built static
HTML design (the "Pulse 06" variant, previously deployed at
https://gorgeous-kitsune-b00abd.netlify.app/) into Astro + Keystatic.

**Read `PLAN.md` first in every session.** It tracks which phase we're in, the
decision log, and open questions. When you complete work or a decision is made,
update `PLAN.md` — the user will ask you to update it rather than editing it
manually. Keep its checkboxes and decision log current.

## Goal

Clean handover to a non-technical owner and her partner. They will edit content
(Speakers, Schedule, News, Gallery, Sponsors, FAQ) through the hosted Keystatic
admin (GitHub storage mode) without touching code. Avoid anything that adds
handover fragility: no hosted databases, no separate CMS services, no second
image store. One repo, one host, one admin.

## Stack

- **Astro 5.x** — static-first, TypeScript strict, no UI framework integration.
- **Astro Content Collections** — schemas in `src/content.config.ts`, entries
  under `src/content/`. Six collections: `speakers`, `schedule`, `news`,
  `gallery`, `sponsors`, `faq`. Markdown for body-text collections (news, faq);
  YAML/JSON data files for structured ones (speakers, schedule, gallery,
  sponsors). `order` (number) fields control display sequence so editors never
  touch code.
- **Keystatic** — GitHub storage mode (edits commit to this repo and trigger a
  rebuild). Keystatic field schemas must mirror the Zod schemas in
  `src/content.config.ts`; they are two sources of truth kept in sync manually —
  when changing a collection, change both. Images stored in the repo.
- **Hosting** — Vercel for now (interim, user's account); the intended final
  host is Netlify in the site owner's account, pending her details. The
  Keystatic admin routes need a server adapter, so the project uses
  `@astrojs/vercel` today and will swap to `@astrojs/netlify` at migration.
  Keep host-specific code confined to `astro.config.mjs` so the swap is small.
- **Forms** — the original design has enquiry form(s). Final implementation is
  Netlify Forms, which does not work on Vercel — see PLAN.md before wiring
  anything up. Until the host is final, build form markup only, not submission.

## Project layout (target)

- `src/layouts/BaseLayout.astro` — owns `<head>`, fonts, meta/SEO, global CSS.
- `src/pages/index.astro` — the single landing page, composed of section
  components.
- `src/components/` — one component per major page section (Hero, Conference,
  Themes, Media/Articles, Voices/Speakers, Gallery, Community, Nav, Footer).
- `src/pages/news/[slug].astro` — individual news article pages.
- `src/content/` — collection entries (committed content lives here).
- `public/images/` — static image assets extracted from the original HTML
  (the source design inlines base64 images; those become real files here).

## Conventions

- The ported design must stay visually identical to the original Pulse HTML.
  Fix visual drift before content modelling, never after.
- Sort collections by `order` where present; news by publish date, newest
  first; schedule grouped by day.
- Don't invent secret values. Env vars (Keystatic GitHub App credentials etc.)
  get placeholders in `.env.example` with a note on where each comes from.
- Develop on the branch the session designates; never force-push.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build

## Handover artefacts (Phase 8)

- This file: context for future Claude Code sessions making structural changes.
- `EDITING.md` (to be written): plain-language editor guide for the owners —
  logging into Keystatic, editing each content type, publish times. No jargon.
