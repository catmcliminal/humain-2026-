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

## Open questions

1. **Domain** — domain confirmed as `www.humain.au` (2026-06-14). Still need to:
   - Add custom domain in Netlify dashboard (Site settings → Domain management → Add domain → `www.humain.au`). Netlify will give you DNS records to add.
   - Update Keystatic GitHub App callback URL at github.com/settings/apps/humaincat-keystatic from `https://humain2026v2.netlify.app/api/keystatic/github/oauth/callback` to `https://www.humain.au/api/keystatic/github/oauth/callback`.
   - Upload a real OG share image to `public/images/og-default.jpg` (1200×630px).
2. **Real speakers** — placeholder entries still in `src/content/speakers/`. Add real speaker YAMLs (or use Keystatic admin once domain is live).
3. **Real gallery photos** — only a placeholder gallery entry exists. Upload actual event photos.
4. **Paul's Vercel project** — still running at humain-site-seven.vercel.app. Decommission once the Netlify site is confirmed stable on the real domain.

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
