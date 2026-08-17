# PLAN — humAIn Astro + Keystatic rebuild

Living tracker for the migration of the Pulse (06) static HTML design into
Astro + Keystatic. Claude Code updates this file as work progresses — keep the
checkboxes, decision log, and open questions current. One phase per session.

**Source design:** `humAIn - 06 Pulse.html` (hand-built single page, committed
at `_source/humAIn - 06 Pulse.html`).

---

## Phases

- [x] **Phase 0 — Repo + tracking setup** *(2026-06-10)*
  - Blank repo connected (`rightothen/humain-site`), `CLAUDE.md` + `PLAN.md` created.
  - Deviation from original plan: repo is in Paul's account, not the site
    owner's; hosting starts on Vercel, not Netlify. See Decision Log.
- [x] **Phase 1 — Scaffold Astro** *(2026-06-10)* — Minimal template, Astro
  5.18.2 (later upgraded to 6.x). TypeScript strict, no UI framework. Dev
  server and production build verified.
- [x] **Phase 2 — Port the Pulse design** *(2026-06-10)* — BaseLayout + 14
  section components + global stylesheet; hero waveform PNG extracted to
  `public/images/humain-waveform.png`. Design confirmed good by Paul.
- [x] **Phase 3 — Content collections** *(2026-06-10)* — Six collections
  (speakers, schedule, news, gallery, sponsors, faq) defined in
  `src/content.config.ts` with Zod schemas and one example entry each.
- [x] **Phase 4 — Wire collections into the page** *(2026-06-10)* — Voices,
  Articles and Gallery render from `getCollection()`. Full-list pages
  (`/voices`, `/news`, `/gallery`) and news article pages (`/news/[slug]`)
  built. Featured curation helper, keynote badges, edition/archive fields,
  `TICKET_URL` constant, footer links all wired.
- [x] **Phase 5 — Keystatic admin** *(2026-06-10)* — `keystatic.config.ts`
  mirroring all six Zod collections. Astro 6 upgrade. Build green.
- [x] **Phase 6 — Forms** *(2026-06-12)* — Contact form (`src/components/Contact.astro`)
  built with Web3Forms (host-agnostic). Four enquiry types: Suggest a speaker,
  Join the advisory panel, Become a commercial partner, Subscribe to newsletter.
  Selected option becomes email subject; submissions go to `admin@humain.au`.
  `WEB3FORMS_ACCESS_KEY` env var required (set in Netlify).
- [x] **Phase 7 — SEO + deploy** *(2026-06-14)* — `@astrojs/sitemap` installed,
  `site: 'https://www.humain.au'` set in `astro.config.mjs`. `BaseLayout.astro`
  updated with canonical, OG/Twitter card meta, JSON-LD Event schema. Article
  pages pass per-article description/ogImage/publishDate. `public/robots.txt`
  added. OG default image placeholder at `/images/og-default.jpg` (needs real
  image uploaded to `public/images/`).
- [x] **Phase 8 — Handover hardening** *(2026-06-14)* — `EDITING.md` written
  for the owners: covers Keystatic login, all six collections, deploy cycle,
  image uploads, draft/active flags, ticketing URL, and troubleshooting.
- [x] **Phase 9 — Migration to owner's accounts** *(2026-06-12)* — Repo copied
  (mirror push) to `catmcliminal/humain-2026-`. Adapter swapped from
  `@astrojs/vercel` to `@astrojs/netlify` (v7). Keystatic GitHub App
  (`humainCat-keystatic`) created manually and installed on the new repo.
  Netlify project `humain2026v2` connected to `catmcliminal/humain-2026-`,
  all five env vars set, site deployed and live at
  https://humain2026v2.netlify.app. `.npmrc` added with `legacy-peer-deps=true`
  to resolve adapter peer dep conflict on Netlify's npm.
  **Remaining:** finalise domain, update Keystatic GitHub App callback URL
  to the real domain, remove Paul's Vercel project.

## Design additions (2026-06-12)

- **Audience section** updated with real delegate personas (CMOs & marketing
  leaders, Founders, Researchers, Creative directors) + past-delegate stats
  (56% marketing leaders, 81% senior decision-makers).
- **Tickets section** added (`src/components/Tickets.astro`) — three early-bird
  tiers (Conference $595, Workshop $475, Conference+Workshop $795, all +gst)
  with 25 August deadline callout. All link to Humanitix.
- **Conference section** tiers updated with correct pricing to match.
- **Speaker role tags** — yellow "Speaker" / pink "Advisory panel" tag on all
  voice cards, driven by `advisory` boolean in the speakers schema.
- **Nav logo** links to `/`.
- **`TICKET_URL`** set to `https://events.humanitix.com/humain/tickets`.

## Decision log

| Date | Decision | Why |
|------|----------|-----|
| 2026-06-09 | Stack: Astro + Keystatic (GitHub mode), content in repo, images in repo | Clean non-technical handover; no extra services |
| 2026-06-10 | Start in `rightothen/humain-site` under Paul's account; copy to owner later | Owner hadn't set up accounts yet |
| 2026-06-10 | Deploy to Vercel in the interim; Netlify remains the intended final host | Owner hadn't provided Netlify details |
| 2026-06-10 | Image fields are repo-relative `/images/...` string paths, not Astro `image()` imports | Keystatic stores uploads to `public/images/` and writes back the path |
| 2026-06-10 | Schedule `speaker` is free-text, not a `reference('speakers')` | Keeps schema simple; can upgrade later |
| 2026-06-10 | Homepage curation = "featured first, then fill" (news→3, gallery→7, speakers→4) | Owner wants to pin items; homepage must never look empty |
| 2026-06-10 | Reordering via numeric `order` field, not drag-and-drop | One-file-per-entry collections can't be drag-reordered in Keystatic |
| 2026-06-10 | `TICKET_URL` constant in `src/config.ts` | Owner confirmed ticketing is external; one-line swap when URL known |
| 2026-06-10 | `keynote` flag on speakers, separate from `featured` | Keynotes shown larger + atop /voices, independent of homepage curation |
| 2026-06-10 | `active` + `year` fields on speakers/schedule/sponsors | Lossless yearly content swaps; `CURRENT_EDITION_YEAR` is the roll-over switch |
| 2026-06-10 | Upgrade to Astro 6 (6.4.5) | Security advisories patched only in 6; Keystatic supports 6 |
| 2026-06-10 | Keystatic rich-text uses `fields.markdoc` with `extension: 'md'` | Writes plain `.md` files matching the glob loader |
| 2026-06-12 | Forms use Web3Forms, not Netlify Forms | Host-agnostic; works on both Vercel and Netlify; no backend needed |
| 2026-06-12 | Repo copied (mirror push) rather than transferred | Paul not available; copy is lower risk; original stays as backup |
| 2026-06-12 | `legacy-peer-deps=true` in `.npmrc` | `@astrojs/netlify` v7 peer dep conflict with npm's strict resolver on Netlify CI |
| 2026-06-12 | `advisory` boolean on speakers (separate from `keynote`) | Owner wants advisory panel members visually distinguished from speakers |
| 2026-08-05 | New `advisory` content collection, independent of `speakers` | Owner wants Speakers and Advisory Panel edited as fully separate pages/collections, not one shared record with a flag. `/community/advisory` now reads its own `src/content/advisory/*.yaml` files (own Keystatic collection, own `public/images/advisory/` directory). The `advisory` boolean on `speakers` is kept as-is — it only drives the pink/yellow tag on `/voices` and is unrelated to which page's content an editor manages. The 9 people who are both speaking and advising now have two independent entries (one per collection); editing one does not affect the other. |
| 2026-08-12 | Editorial standards published as its own page at `/about/editorial-standards`, not a section of `/about` | It's a trust document people link to and arrive at directly (sources, PR contacts, partners), and a discoverable editorial policy is an E-E-A-T signal for a publisher. Nesting under `/about` (following the `/community/advisory` precedent) leaves room for a corrections policy or ownership statement later. Hard-coded like `/privacy` and `/terms` rather than a Keystatic collection — a one-entry collection adds handover clutter for a page that changes rarely. |
| 2026-08-12 | Gift register is a Keystatic collection (`gifts`), not a hard-coded page like editorial standards | A register is a living record maintained by whoever receives the gift, so it has to be editable without code — the opposite of the editorial standards page, which is fixed prose. Sorted by `dateReceived` (newest first) with no `order` field, since a register is chronological. Recording threshold is $50, stated on the page. Fields are deliberately minimal (no outcome/status field) — Cat's call. |
| 2026-08-18 | `/programme` rebuilt to the wireframe; each session gets its own page at `/programme/[slug]` | The programme index was one long list with full descriptions inline, which neither scanned nor gave a session anywhere to be linked to. Traffic from a speaker's own post or an ad lands on one session, cold, with no idea what the event costs — so each session now has a page carrying its own title, hook, portraits, JSON-LD and a price for the day it runs on. Descriptions moved off the index onto those pages so the copy isn't duplicated across two URLs. Rows on the index are links, not expanders. |
| 2026-08-18 | Themes are a filter over the running order, not a separate track structure | Delegates browse by interest, not by track. Tagging sessions with `themes` and filtering the real running order keeps one source of truth for the schedule, and gives the four themes somewhere to lead to. Filtering is client-side progressive enhancement — all sessions render server-side, so the page is complete with JS off and fully crawlable. |
| 2026-08-18 | Ticket tiers extracted to `src/data/tickets.ts` | Session pages show the entry price for their day, so the prices existed in two places the moment those pages were built. One module, read by both `Tickets.astro` and `/programme/[slug]`, means a price change lands everywhere at once — same reasoning as `TICKET_URL`. |
| 2026-08-06 | Confirmed 2026 Speakers roster: Pip Bingemann, James Caldwell, Tea Uglow, Marie-Céline Merret, Vinne Schifferstein, Bridget Cleary, Kent Boswell, Marcus Tesoriero | Owner confirmed these 8 as the actual speaker lineup. Set `active: false` on the other 6 speaker entries (Annie Liao, Dave King, Karen Powell, Joana Barros, Jeremy Somers, Sarah Yassien) — they were advisory-panel-only, not speaking. Data kept, not deleted; they remain live on `/community/advisory` via their separate `advisory` collection entries. |

## Programme rebuild (2026-08-18)

Rebuilt `/programme` from Cat's wireframe and added a page per session.

- **`src/data/themes.ts`** (new) — the four themes as data (`id`, `num`, `name`,
  `short`, `hook`). Tags sessions and drives the theme filter. The long-form
  theme copy in `Themes.astro` is deliberately **not** generated from this file
  (that wording is approved and hand-edited), but the four `name` values and its
  `<h3>`s must be renamed together.
- **`src/data/tickets.ts`** (new) — the three tiers, extracted out of
  `Tickets.astro`, which now renders from it. Session pages call `ticketForDay()`
  to show the cheapest tier admitting that day, so prices can't drift between the
  pricing table and a session page. Also carries the per-tier `label`,
  `dateLabel`, `features`, `cta` and `eyebrow` used by the programme ticket
  section.
- **`src/components/TicketsProgramme.astro`** (new) — the ticket section at the
  foot of `/programme`, built to Cat's wireframe: three cards showing what each
  tier includes, "Most booked" on the both-days card, and the group-rate and
  association-code notes. Same data and prices as the homepage `Tickets.astro`,
  different layout, because someone reading the programme is choosing between
  the days rather than just learning tickets exist. The generic "Get tickets"
  button that used to close the page was dropped — each card now has its own CTA.
  **Note the two different savings:** the card reads "Saves $275", which is
  against buying both single days at early bird ($595 + $475 − $795), while the
  tier's `saving` field is $200, against its own standard price ($995). Both are
  true and answer different questions, so they are kept separate; the $275 is
  derived by `bothDaysBundleSaving()` rather than hard-coded.
- **`schedule` schema gained `format`, `hook`, `themes`** — mirrored in
  `keystatic.config.ts` (`themes` is a multiselect).
- **`/programme`** — filter chips over day-grouped session rows. Filtering is
  progressive enhancement: every session is in the HTML and visible with JS off.
  An at-a-glance stats panel, a themes card grid and a "The running order."
  heading were built and then **removed at Cat's direction (2026-08-18)** — they
  were not in her wireframe. They existed only because the programme wireframe
  artifact could never be fetched (403 on every attempt), so the page was
  inferred from the session-page wireframe instead. The theme links on session
  pages therefore point at the homepage `#themes` section, not `/programme`.
- **`/programme/[slug]`** (new) — a page per session: day/format/theme tags,
  hook as lede, speaker portraits, description, ticket aside priced off the
  session's day, and up to three related sessions sharing a theme. Carries
  BreadcrumbList + Event JSON-LD with `superEvent` pointing at humAIn 2026.
  Session descriptions now live here only, so they aren't duplicated on the index.

**The wireframe's six extra sessions were deliberately not added** (Cat's call,
2026-08-18): AI Upfronts, Round tables at lunch, Fork This Industry, When the
budget ceiling disappears (AiCandy), Screen Swap, Build Club. The page ships
with the five confirmed sessions only. The copy for the six was transcribed
from the wireframe and briefly committed, so it remains recoverable in this
branch's history at `f669283` if any of them are confirmed later. This also
means **Ashlea Vallance no longer needs a `speakers` entry** — Screen Swap was
the only thing referencing her.

Consequence worth knowing: **"Culture as Training Data" now has no sessions**,
so it renders on neither the theme cards nor the filter chips on `/programme`.
That is the `themesInUse` guard working as intended — a filter that matches
nothing is worse than a missing one — and it will reappear on its own the
moment a session is tagged `culture`. The homepage `Themes.astro` section still
shows all four, which is correct: that section describes the programme's
subject matter, not what has been scheduled.

**Both open questions closed by Cat (2026-08-18):**

1. **Venue** — Stone & Chalk Sydney, 477 Pitt St, is correct. No prose needed
   changing: the site already stated it correctly everywhere (the FAQ entries,
   `/faq`, the meta descriptions and the conference JSON-LD). An earlier note in
   this file recording "venue TBA" as a *fixed* stale fact was misread as the
   venue still being unknown — it was not.
   The real gap was in the new per-session `Event` JSON-LD, which carried a
   generic `Sydney, Australia` Place. The venue is now `src/data/venue.ts`, used
   by both `BaseLayout.astro` and `/programme/[slug]`, so the two can't drift.
   Prose mentions are deliberately not generated from it — search for
   "Stone & Chalk" if the venue ever moves.
2. **Theme 02 naming** — "Brand Discovery in the AI Age" is correct, which is
   what the code already used. No change.

**Unrelated problem found:** `.npmrc` is **missing from the repo** — untracked,
not in `.gitignore`, and absent from git history. CLAUDE.md documents it as
required at repo root (`legacy-peer-deps=true`) for Netlify's npm install to
resolve the `@astrojs/netlify` peer-dep conflict. Local `npm install` currently
succeeds without it, so this may no longer bite, but the documented setup and
the actual repo disagree. `node_modules` was also corrupted (truncated `shiki`
and `@rollup/rollup-darwin-arm64` binaries) and had to be reinstalled from the
lockfile before the build would run; `package-lock.json` was left untouched.

## Open questions

1. **OG share image** — upload a real one to `public/images/og-default.jpg` (1200×630px). Currently a placeholder, so link previews on LinkedIn/Slack/X are weak.
2. **Real gallery photos** — only a placeholder gallery entry exists. Upload actual event photos.
3. **Paul's Vercel project** — still running at humain-site-seven.vercel.app. Decommission once the Netlify site is confirmed stable on the real domain.

## Session notes

- **2026-06-10** — Phases 0–5 completed. See original session notes for detail.
- **2026-06-12** — Design updates (Audience, Tickets, Contact form, speaker tags,
  nav logo, ticket URL). Phase 9 migration: repo copied to `catmcliminal/humain-2026-`,
  Netlify adapter swapped, Keystatic GitHub App created manually (auto-onboarding
  failed due to OAuth callback timing issues), site live on Netlify.
  Branch for this session: `claude/gracious-feynman-c1oyzc` (Paul's repo).
  Next session should use `catmcliminal/humain-2026-` directly.
- **2026-06-14** — Domain confirmed `www.humain.au`. Phases 7 and 8 complete.
  SEO: sitemap, canonical, OG/Twitter meta, JSON-LD Event schema, robots.txt.
  EDITING.md written. FAQ content added (6 real entries). Real speakers and
  gallery images still pending — add via Keystatic once domain is connected.
- **2026-08-10** — Search & AI-visibility workstream. Shipped on main: rebuilt
  Event JSON-LD (three named Humanitix offers, date-aware early-bird flip after
  25 Aug, timezone-correct dates, audience/capacity/venue), new `/faq` page
  rendering the faq collection with FAQPage JSON-LD (nav + footer links),
  cluster-targeted page titles, default meta updated, stale FAQ facts fixed
  (venue TBA, conference-pass day scope), banned-word cleanup in bios.
  PR #1 (five answer-engine FAQ entries + plain-facts intro on /faq) —
  **merged and live 2026-08-12**, see the session note below. New `marketing/`
  folder: outreach-log.md
  (directory/press targets with status), listing-copy.md, pitches.md (for Cat
  to send), monitoring.md (ranking baseline + weekly check). Weekly cloud
  routine created to append to monitoring.md's log (Mon 9am Sydney).
  Directory submissions need Cat (account/form sign-ups). Pricing note: goal
  brief said standard pricing from 8 Aug, but Humanitix still sells early bird
  to 25 Aug — site matches Humanitix; reconcile if unintended.
- **2026-08-10 (speakers)** — Roster additions since the 2026-08-06 confirmed
  eight: Matt Jones (MC), Tara Iwamoto, Julia Vargiu, and Dr Patrick Aouad
  (Founder & CEO, CU Health). Active 2026 speaker count is now 12. Alphabetical
  -by-first-name `order` maintained on each insert — adding a speaker mid-list
  means renumbering everyone after them. **Check:** Patrick's headshot was taken
  from `Dr Pat headshot.png` in the shared assets folder on the assumption that
  "Dr Pat" is him — Cat to confirm, and swap
  `public/images/speakers/patrick-aouad/photo.png` if not.
- **2026-08-11** — Arum Nixon (Chapter Lead, Ad Net Zero Australia) added to the
  speakers collection at `order: 1`, renumbering Bridget through Vinne. Active
  2026 speaker count is now 13. Arum renders first on `/voices` because Annie
  Liao holds `order: 0` but is `active: false` (advisory-panel-only) — if Annie
  is ever confirmed as speaking, flip her `active`, don't reorder Arum.
  Founder photos added to `/about`: the `founders` array in
  `src/pages/about.astro` now takes an optional `photo`, with the `ImageSlot`
  empty state as the fallback, and both Cat McGinn and Belinda Cusack have
  images in `public/images/team/`. Belinda's source is only 346×443, so it is
  slightly soft on retina in the 249px slot — replace with a larger original
  when one exists.
- **2026-08-12** — Editorial standards page added at
  `/about/editorial-standards` (`src/pages/about/editorial-standards.astro`).
  Copy supplied by Cat and rendered verbatim — the wording is not to be edited;
  the page only adds structure (statement lines in the display font, the six
  editorial-test questions as pink-ruled blocks, section rules, sign-off).
  Verified token-for-token against the supplied source, including the
  unclosed parenthesis in "Is it generous?" and the mixed straight/curly
  apostrophes — fix those only if Cat asks. Supporting changes: About is now a
  nav group (About / Editorial Standards) in `Nav.astro`, the page is linked in
  the footer's Company column, `/about` ends with a cross-link, and the
  Organization JSON-LD in `BaseLayout.astro` now carries
  `publishingPrinciples` pointing at the new URL.
- **2026-08-14 (domain live)** — `www.humain.au` is connected and serving.
  Apex `humain.au` A → 75.2.60.5 (Netlify), `www` CNAME →
  `humain2026v2.netlify.app`; nameservers at GoDaddy (`domaincontrol.com`).
  Apex 301s to `www`, http 301s to https, SSL valid. No code change was
  needed — `site` in `astro.config.mjs` and `SITE` in `src/config.ts` were set
  to the final domain back in June, so canonicals, robots.txt and the sitemap
  were already correct. The Keystatic GitHub App's redirect URI is updated and
  verified: `/api/keystatic/github/login` hands off to GitHub with
  `redirect_uri=https://www.humain.au/api/keystatic/github/oauth/callback`,
  and `/keystatic` returns 200. Confirmed it is a **GitHub App**, not an OAuth
  App. The netlify.app URL still serves the same build.
- **2026-08-14 (speakers)** — Neil Ackland (Founder, Lokol) added at
  `order: 13`, renumbering Patrick through Vinne (14–19). Active 2026 speaker
  count is now 14. Bio supplied by Cat, used verbatim. Headshot from the shared
  assets folder (`Neil Profile Headshot 2026.png`) — a 1684×1353 PNG at 2.2MB,
  the largest image on the site — since compressed with the rest (below).
- **2026-08-14 (speaker photo compression)** — All 20 speaker photos resized to
  a 1000px long edge and re-encoded as progressive JPEG q82:
  **14.6MB → 1.6MB (89% smaller)**. Cards render at 273px (546px at 2× DPR), so
  1000px keeps headroom for the single-column keynote layout on mobile. Four
  PNGs and one `.jpeg` became `.jpg`, so their `photo:` paths were updated in
  `src/content/speakers/*.yaml` **and** in
  `src/content/schedule/james-caldwell-keynote.yaml`, which carries its own
  `photos` array — check that file whenever a speaker image is renamed.
  The three RGBA PNGs were flattened onto the card background (`#1c1714`);
  none had real transparency (Patrick's alpha was near-opaque editor noise).
  Originals remain in git history and in the shared assets folder.
  Same pass then run on `public/images/advisory/` (6.1MB → 844KB) and
  `public/images/team/` (0.9MB → 176KB). Path updates followed in the advisory
  YAML (dave-king `.png`, joana-barros `.jpeg`) and in `src/pages/about.astro`
  (cat-mcginn `.png` → `.jpg`). Nofil's advisory photo carried EXIF
  orientation 8; the rotation is now baked into the pixels, so it no longer
  depends on the browser honouring EXIF. Belinda's team photo was left
  untouched — at 346×443 it is already the softest image on the site and
  re-encoding would cost more than the 18KB saved; replace with a larger
  original when one exists. **Site image weight overall: 21.6MB → 2.6MB.**
- **2026-08-12 (answer-engine FAQ merged)** — `content/answer-engine-faq`
  merged to main and deployed. The five entries (orders 4–8: AI marketing
  conference Australia, SXSW Sydney gap, best AI marketing event Sydney 2026,
  how humAIn differs, fourth-edition provenance) and the plain-facts intro on
  `/faq` shipped **verbatim** — Cat reviewed and approved the copy as drafted,
  so the deliberately flat, answer-engine register is intentional and should
  not be "fixed" to match site voice. `/faq` now renders 12 questions, all 12
  in the FAQPage JSON-LD. The branch also carried an older
  `src/content/speakers/matt-jones.yaml` (order 15) which conflicted with
  main's (order 12); main's was kept, since 12 is his correct alphabetical
  slot between Marie-Céline and Patrick.
  Speaker roster audited at the same time: orders 0–18, no gaps or duplicates,
  alphabetical by first name with honorifics ignored (Dr Patrick Aouad files
  under P, not D).
- **2026-08-12 (advisory)** — Nofil Khan (Founder, Avicenna) added to the
  advisory collection at `order: 7`, renumbering Pip through Tea (8–11). The
  panel is ordered alphabetically by first name, so inserting mid-list means
  renumbering everyone after. Advisory panel count is now 12.
- **2026-08-12 (gift register)** — `/about/gift-register` added, backed by a new
  `gifts` content collection (Zod in `src/content.config.ts`, mirrored in
  `keystatic.config.ts`, documented in `EDITING.md`). Page copy is Cat's,
  verbatim. Cat maintains entries through the Keystatic admin. Linked from the
  "Staff gifts are recorded in a gift register" line on the editorial standards
  page (the words are untouched — only the link is new) and from the footer's
  legal row. First entry recorded: AiCandy branded Frank Green drink bottle,
  24 July 2026, Cat McGinn, from Kent Boswell (AiCandy), RRP $59.99.
  Threshold confirmed by Cat: **anything over $50 is recorded**, stated on the
  page and repeated in `EDITING.md`. Also on Cat's instruction: no `outcome`
  field (declines/returns go in Notes if needed), and no note flagging that a
  giver is also a speaker.
- **2026-08-17 (ad tracking pixels)** — Meta Pixel and LinkedIn Insight Tag
  installed via a new `src/components/TrackingPixels.astro`, rendered once at
  the top of `<body>` by `BaseLayout.astro` (so every page is covered). Both IDs
  come from env vars — `PUBLIC_META_PIXEL_ID` and `PUBLIC_LINKEDIN_PARTNER_ID`,
  documented in `.env.example` — rather than being hardcoded like the GA
  measurement ID, because the ad accounts didn't exist when the code was
  written. **Neither pixel renders until those vars are set in Netlify**: an
  unset ID emits no script, no `<noscript>` image and no requests, verified in
  the build output. Snippets are Meta's and LinkedIn's official ones, unchanged
  except that LinkedIn's bare `_linkedin_partner_id` global is written as
  `window._linkedin_partner_id`, because Astro's `define:vars` wraps inline
  scripts in an IIFE and a bare assignment would have been function-scoped.
  **`netlify.toml`'s CSP had to be widened** — `script-src` now allows
  `https://connect.facebook.net` and `https://snap.licdn.com`, and `connect-src`
  allows `https://www.facebook.com` and `https://px.ads.linkedin.com`. Without
  this the pixels are blocked in production while still working locally, and
  they fail *silently* — the only symptom is no data in Events Manager. Any
  future third-party script needs the same treatment. (Note: `astro dev` serves
  the netlify.toml headers, so CSP problems are reproducible locally — restart
  the dev server after editing them.)
- **2026-08-17 (ticket-click conversions)** — Both pixels report a ticket-click
  conversion, not just page views. Implemented as **one delegated click listener**
  in `TrackingPixels.astro` that matches any `<a>` resolving to `TICKET_URL`,
  rather than tagging the 16–18 individual "Get tickets" CTAs — new ticket CTAs
  are therefore tracked automatically with no extra code, and there is nothing
  to keep in sync. Meta fires the standard **`InitiateCheckout`** event (not
  `Purchase`: the sale completes on Humanitix, which we don't control, so the
  click-through is the deepest step measurable from this site — true purchase
  tracking would need the pixel installed inside Humanitix). LinkedIn needs a
  numeric conversion ID from Campaign Manager, in
  `PUBLIC_LINKEDIN_TICKET_CONVERSION_ID`; it must be an event-based conversion,
  not a URL rule, since the destination is off-site. A `fired` flag stops a
  double-click counting twice. Verified in the browser against the real markup:
  clicking the nested `<span class="dot">` inside a CTA still fires (the
  listener uses `closest()`), the second click is ignored, and non-ticket links
  don't fire. Ticket links open in a new tab, so the page is never unloaded and
  the beacons always have time to send.
- **2026-08-17 (privacy policy)** — Section 8 gained a paragraph naming Google
  Analytics, Meta and LinkedIn as measurement providers, describing what they
  collect (pages viewed plus the ticket click-through), with opt-out links and a
  pointer to the overseas-disclosure clause (6.5) — APP 5 needs the providers
  named once the pixels are live. **This is the one place the legal copy has been
  changed without Cat supplying the words**; if conversion tracking is ever
  widened, this paragraph needs widening with it. Dates updated on Cat's
  instruction: last reviewed **17 August 2026**, in both the eyebrow and the
  foot of the page. The eyebrow's "Scheduled Review" was 19 May 2026 — already
  in the past — and has been rolled to 17 August 2027; effective date stays
  19 May 2025.
  **No consent banner, by Cat's decision (2026-08-17): the site targets the
  Australian market only**, where the pixels firing on load with a disclosed
  policy and browser-level controls is the standard pattern. If humAIn ever
  advertises into the EU or UK, a consent gate becomes necessary before the
  pixels may fire.
