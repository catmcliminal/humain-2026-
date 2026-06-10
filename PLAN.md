# PLAN — humAIn Astro + Keystatic rebuild

Living tracker for the migration of the Pulse (06) static HTML design into
Astro + Keystatic. Claude Code updates this file as work progresses — keep the
checkboxes, decision log, and open questions current. One phase per session.

**Source design:** `humAIn - 06 Pulse.html` (hand-built single page, previously
at https://gorgeous-kitsune-b00abd.netlify.app/). The HTML file must be provided
in the session that runs Phase 2 — the live URL is not reachable from the
remote build environment (403 / network allowlist).

---

## Phases

- [x] **Phase 0 — Repo + tracking setup** *(2026-06-10)*
  - Blank repo connected (`rightothen/humain-site`), `CLAUDE.md` + `PLAN.md` created.
  - Deviation from original plan: repo is in Paul's account, not the site
    owner's; hosting starts on Vercel, not Netlify. See Decision Log.
- [ ] **Phase 1 — Scaffold Astro** — Empty template, TypeScript strict, no UI
  framework. Confirm dev server boots.
- [ ] **Phase 2 — Port the Pulse design** — Requires the original HTML file
  uploaded to the session. BaseLayout + section components + extract base64
  images to `public/images/`. Must be visually identical before moving on.
- [ ] **Phase 3 — Content collections** — Six collections (speakers, schedule,
  news, gallery, sponsors, faq) in `src/content.config.ts` with Zod schemas
  and one example entry each. Get schemas right here; backtracking later is
  the main time sink.
- [ ] **Phase 4 — Wire collections into the page** — Replace hardcoded section
  content with `getCollection()`. Hero/Themes stay static.
- [ ] **Phase 4b — News article pages** — `/news/[slug]` dynamic route, link
  homepage news cards.
- [ ] **Phase 5 — Keystatic admin** — GitHub storage mode, `/keystatic` route,
  schemas mirroring the Zod ones. Needs server adapter (`@astrojs/vercel` for
  now). Keystatic GitHub App install + env vars (placeholders only).
- [ ] **Phase 6 — Forms** — ⚠ Blocked on final-host decision. Netlify Forms
  don't work on Vercel. Build markup only until the host is settled, or pick a
  host-agnostic provider (see Open Questions).
- [ ] **Phase 7 — SEO + deploy** — Per-page meta via BaseLayout, OG/Twitter
  tags, `@astrojs/sitemap`, robots.txt, JSON-LD (Event + Person). Deploy to
  Vercel (interim).
- [ ] **Phase 8 — Handover hardening** — Finalise `CLAUDE.md`, write
  `EDITING.md` for the owners.
- [ ] **Phase 9 — Migration to owner's accounts** *(added; not in original
  plan)* — Transfer repo to owner's GitHub, re-install Keystatic GitHub App on
  the transferred repo, move hosting to her Netlify account, swap
  `@astrojs/vercel` → `@astrojs/netlify`, wire Netlify Forms, update env vars.

## Decision log

| Date | Decision | Why |
|------|----------|-----|
| 2026-06-09 | Stack: Astro + Keystatic (GitHub mode), content in repo, images in repo | Clean non-technical handover; no extra services (original plan) |
| 2026-06-10 | Start in `rightothen/humain-site` under Paul's account; transfer to owner later | Owner hasn't set up accounts yet; don't block progress. Adds Phase 9 |
| 2026-06-10 | Deploy to Vercel in the interim; Netlify remains the intended final host | Owner hasn't provided Netlify details; Paul happy to proceed on Vercel |
| 2026-06-10 | Defer form *submission* wiring until final host confirmed | Netlify Forms (planned) don't function on Vercel; avoid building twice |

## Open questions

1. **Final host** — Netlify in owner's account (assumed) or stay on Vercel? If
   Vercel becomes permanent, Phase 6 needs a form solution (e.g. Formspree /
   Web3Forms / an Astro action) instead of Netlify Forms.
2. **Repo transfer timing** — transfer before or after Keystatic setup? The
   Keystatic GitHub App is installed per-repo, so transferring after Phase 5
   means re-doing that install (small, but must be remembered — captured in
   Phase 9).
3. **Default branch** — work is on `claude/kind-volta-cdf749`; once merged,
   confirm `main` is the default branch, since Keystatic commits to and the
   host deploys from the default branch.
4. **Original HTML file** — Paul to upload `humAIn - 06 Pulse.html` (plus any
   separate image assets) at the start of the Phase 2 session.

## Session notes

- **2026-06-10** — Reviewed plan, created CLAUDE.md/PLAN.md. Live Netlify URL
  returns 403 to non-browser clients from this environment, so design fidelity
  checks (Phase 2) depend on the source HTML file and Paul eyeballing the dev
  server/preview against the original in his browser.
