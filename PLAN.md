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
- [x] **Phase 1 — Scaffold Astro** *(2026-06-10)* — Minimal template, Astro
  5.18.2 (pinned to 5.x per CLAUDE.md; create-astro now defaults to 6.x),
  TypeScript strict, no UI framework. Dev server and production build both
  verified.
- [x] **Phase 2 — Port the Pulse design** *(2026-06-10)* — BaseLayout + 14
  section components + global stylesheet; hero waveform PNG extracted to
  `public/images/humain-waveform.png`. Built output verified structurally
  identical to the source body (node-for-node) and all CSS rules present in
  the bundle. Two deliberate exclusions (see session notes): the fixed
  design-variant switcher and the interactive `<image-slot>` mockup tooling.
  **Pending: Paul's visual eyeball against the original in a browser.**
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
| 2026-06-10 | Working assumption: repo transfer happens *after* Keystatic setup (Phase 5); rework if needed | Transfer timing won't be known for a while; Phase 9 already captures the GitHub App re-install |
| 2026-06-10 | Stay on Astro 5.x even though create-astro scaffolds 6.x | CLAUDE.md targets 5.x; Keystatic compatibility planned against 5. Revisit only if a dependency forces it |

## Open questions

1. **Final host** — Netlify in owner's account (assumed) or stay on Vercel? If
   Vercel becomes permanent, Phase 6 needs a form solution (e.g. Formspree /
   Web3Forms / an Astro action) instead of Netlify Forms.
2. ~~**Repo transfer timing**~~ — *resolved 2026-06-10 as a working
   assumption*: transfer after Keystatic setup; Phase 9 covers re-installing
   the GitHub App on the transferred repo.
3. ~~**Default branch**~~ — *resolved 2026-06-10*: Paul set `main` as the
   default branch.
4. ~~**Original HTML file**~~ — *resolved 2026-06-10*: committed at
   `_source/humAIn - 06 Pulse.html`.

## Session notes

- **2026-06-10** — Reviewed plan, created CLAUDE.md/PLAN.md. Live Netlify URL
  returns 403 to non-browser clients from this environment, so design fidelity
  checks (Phase 2) depend on the source HTML file and Paul eyeballing the dev
  server/preview against the original in his browser.
- **2026-06-10 (Phase 1)** — Scaffolded Astro from the minimal template, pinned
  to `astro@^5.18.2` (the wizard now defaults to 6.x). Verified `npm run build`
  and the dev server serving on :4321. Resolved open questions 2–4 (see above).
  Branch: `claude/bold-feynman-r52x11`.
- **2026-06-10 (Phase 2)** — Ported the Pulse design. Layout:
  `src/layouts/BaseLayout.astro` owns head/fonts/global CSS and the two inline
  scripts from the source (ECG pulse-band generator + scroll-reveal).
  Components: Nav, Hero, About, Audience, PulseBand, Conference, Themes,
  Articles, Voices, Gallery, Praise, Community, Newsletter, Footer. CSS lives
  in `src/styles/global.css`, copied verbatim from the source style block.
  Deliberate deviations from the source HTML, all mockup-tool artifacts rather
  than site design:
  - The fixed bottom "DIRECTION 01–06" switcher (links to five other variant
    HTML files that aren't part of this project) was dropped, with its CSS.
  - The ~650-line interactive `<image-slot>` drag-and-drop element (an
    "omelette" design-tool component for filling mockup images) was replaced
    by a static `ImageSlot.astro` that reproduces its empty-state appearance
    (frame, icon, caption, dashed ring). Real images arrive via collections
    in Phase 4. The editor-only "or browse files" line was not reproduced.
  - The hero waveform (the page's only base64 image) is now
    `public/images/humain-waveform.png` (1205×533).
  Note: the source's reveal animation is effectively disabled (its CSS is
  gated on an `html.pre` class the source never sets — "reveal disabled for
  offline"); ported as-is. Verification: built body is node-for-node identical
  to the source after normalising the two deviations; all 174 CSS selectors
  and 3 keyframes present in the bundle; dev server + build green.
