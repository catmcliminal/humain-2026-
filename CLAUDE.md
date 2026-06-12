# humAIn Conference Site

Single-page conference site for **humAIn**, being rebuilt from a hand-built static
HTML design (the "Pulse 06" variant, previously deployed at
https://gorgeous-kitsune-b00abd.netlify.app/) into Astro + Keystatic.

**Read `PLAN.md` first in every session.** It tracks which phase we're in, the
decision log, and open questions. When you complete work or a decision is made,
update `PLAN.md` — the user will ask you to update it rather than editing it
manually. Keep its checkboxes and decision log current.

## Goal

Clean handover to a non-technical owner (Cat / Belinda Cusack) and her partner.
They will edit content (Speakers, Schedule, News, Gallery, Sponsors, FAQ) through
the hosted Keystatic admin (GitHub storage mode) without touching code. Avoid
anything that adds handover fragility: no hosted databases, no separate CMS
services, no second image store. One repo, one host, one admin.

## Stack

- **Astro 6.x** — static-first, TypeScript strict, no UI framework beyond the
  React integration Keystatic's admin requires (the site itself ships no
  framework components). Originally scaffolded on 5.x; upgraded 2026-06-10 for
  security fixes only available in 6.
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
- **Hosting** — Netlify, in Cat's account (`catmcliminal`). The Keystatic admin
  routes need a server adapter; the project uses `@astrojs/netlify` (v7).
  Host-specific code is confined to `astro.config.mjs`.
- **Forms** — Contact form (`src/components/Contact.astro`) uses Web3Forms
  (host-agnostic, free). Submits to `admin@humain.au`. Requires
  `WEB3FORMS_ACCESS_KEY` env var in Netlify.
- **Adapter peer-dep workaround** — `.npmrc` at repo root sets
  `legacy-peer-deps=true` so Netlify's npm install resolves without conflict.

## Repos

- **Production repo (owner):** `catmcliminal/humain-2026-` — this is the source
  of truth. All future Claude Code sessions should be scoped here. Netlify
  deploys from this repo's `main` branch.
- **Original/backup repo (Paul):** `rightothen/humain-site` — kept as reference.
  No longer the active repo. Changes made here must be mirror-pushed to Cat's
  repo until sessions are re-scoped.

## Live URLs

- **Production (Netlify):** https://humain2026v2.netlify.app
- **Paul's Vercel (legacy):** humain-site-seven.vercel.app

## Keystatic GitHub App

- App name: `humainCat-keystatic`
- Installed on: `catmcliminal/humain-2026-`
- Callback URL: `https://humain2026v2.netlify.app/api/keystatic/github/oauth/callback`
- Env vars required (set in Netlify): `KEYSTATIC_GITHUB_CLIENT_ID`,
  `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
  `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- When the domain is finalised, update the callback URL in the GitHub App
  settings (github.com/settings/apps/humaincat-keystatic) and update
  Netlify's env vars if the slug changes.

## Project layout

- `src/layouts/BaseLayout.astro` — owns `<head>`, fonts, meta/SEO, global CSS.
- `src/pages/index.astro` — the single landing page, composed of section
  components.
- `src/components/` — one component per major page section:
  Nav, Hero, About, Audience, Tickets, Conference, Themes, Articles, Voices,
  Gallery, Praise, Contact, Community, Newsletter, Footer.
- `src/pages/news/[slug].astro` — individual news article pages.
- `src/pages/voices/`, `/news/`, `/gallery/` — full-list pages.
- `src/content/` — collection entries (committed content lives here).
- `src/config.ts` — `TICKET_URL`, `CURRENT_EDITION_YEAR` constants.
- `public/images/` — static image assets.

## Content schema notes

- `speakers` has: `name`, `role`, `photo`, `bio`, `keynote` (bool),
  `advisory` (bool — pink tag on Voices; non-advisory shows yellow "Speaker"
  tag), `featured`, `order`, `active`, `year`.
- `TICKET_URL` = `https://events.humanitix.com/humain/tickets` — all ticket
  CTAs read from this one constant.
- `CURRENT_EDITION_YEAR` = 2026 — bump this to roll the site to a new edition.

## Conventions

- Sort collections by `order` where present; news by publish date, newest first.
- Don't invent secret values. Env vars get placeholders in `.env.example`.
- Keystatic Zod schemas and `keystatic.config.ts` are two sources of truth —
  when changing a collection field, change both.
- Future Claude Code sessions should be scoped to `catmcliminal/humain-2026-`,
  not `rightothen/humain-site`.

## Commands (run locally in the `humain-2026-` folder)

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build

## Handover artefacts (Phase 8)

- This file: context for future Claude Code sessions making structural changes.
- `EDITING.md` (to be written): plain-language editor guide for the owners —
  logging into Keystatic, editing each content type, publish workflow. No jargon.
