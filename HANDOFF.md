# humAIn 2026 — Handoff Document

**Date:** 14 June 2026  
**Live site:** https://www.humain.au  
**Keystatic admin:** https://www.humain.au/keystatic  
**GitHub repo:** https://github.com/catmcliminal/humain-2026-  
**Netlify project:** humain2026v2 (in Cat's Netlify account)

---

## What's built

A conference website for humAIn 2026 built with Astro + Keystatic. All content is edited through the Keystatic admin at `/keystatic` — no code changes needed for day-to-day updates.

**Sections on the homepage:**
- Hero (dates, CTA)
- About
- Audience stats
- Conference / Tickets
- Themes
- News & Media (Articles)
- Voices (Speakers)
- Gallery
- Praise / Testimonials
- Contact form
- Community
- Newsletter
- Footer

**Full-list pages:** `/voices`, `/news`, `/gallery`  
**Individual article pages:** `/news/[slug]`

---

## Editing content

See **EDITING.md** for the full owner's guide. Short version:

1. Go to https://www.humain.au/keystatic
2. Sign in with GitHub (`catmcliminal` account)
3. Edit Speakers, News, Gallery, FAQ, Schedule, Sponsors
4. Save → commits to GitHub → Netlify rebuilds in ~2 min

---

## Credentials and services

### GitHub
- **Repo:** `catmcliminal/humain-2026-` (owned by Cat)
- **GitHub App:** `humainCat-keystatic` (under Cat's developer settings)
  - Installed on `catmcliminal/humain-2026-`
  - Permissions: Contents read/write, Metadata read

### Netlify
- **Project:** `humain2026v2`
- **Account:** Cat's Netlify account
- **Deploys from:** `catmcliminal/humain-2026-` `main` branch
- **Custom domain:** `www.humain.au` (primary), `humain.au` (redirects to www)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Environment variables (set in Netlify)
| Variable | Purpose |
|----------|---------|
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub App OAuth client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub App OAuth client secret |
| `KEYSTATIC_SECRET` | Random secret for Keystatic sessions |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | `humaincat-keystatic` |
| `WEB3FORMS_ACCESS_KEY` | Contact form submissions to admin@humain.au |

### DNS (GoDaddy)
| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `75.2.60.5` (Netlify load balancer) |
| `CNAME` | `www` | `humain2026v2.netlify.app` |

### Ticketing
All "Get tickets" buttons point to: `https://events.humanitix.com/humain/tickets`  
To update: change `TICKET_URL` in `src/config.ts`

### Contact form
Submissions go to `admin@humain.au` via Web3Forms. No action needed unless the email address changes.

---

## What still needs doing

### Content (do via Keystatic)
- [ ] Replace placeholder speakers with real speaker profiles + photos
- [ ] Add real gallery photos from past events
- [ ] Add more news/media articles
- [ ] Fill in the full FAQ
- [ ] Add schedule sessions once programme is confirmed
- [ ] Add sponsors once confirmed

### Design asset
- [ ] Upload an OG share image to `public/images/og-default.jpg` (1200×630px) — this is what appears when someone shares the site on social media. Currently falls back to a missing image.

### When the programme is ready
- Add schedule entries via Keystatic (Schedule collection)
- A schedule section component will need to be built (code change required)

---

## How deploys work

Every save in Keystatic commits to the `main` branch on GitHub. Netlify detects the push and rebuilds automatically. The build takes about 1–2 minutes. Hard refresh (`Cmd+Shift+R`) to bust the browser cache after a deploy.

Manual deploy: Netlify dashboard → humain2026v2 → Deploys → Trigger deploy.

---

## If something breaks

1. Check **Netlify → Deploys** for a red build — click it to see the error
2. If a Keystatic edit caused it, revert the commit on GitHub (find it in the repo's commit history, click the `...` menu → Revert)
3. Keystatic login stops working → check that the GitHub App is still installed on the repo (GitHub → Settings → Applications → Installed GitHub Apps → humainCat-keystatic → Configure)
4. For code changes, contact your developer

---

## Legacy / backup

- **Paul's Vercel project:** `humain-site-seven.vercel.app` — still running, safe to decommission once the live site is confirmed stable
- **Paul's repo:** `rightothen/humain-site` — kept as reference backup, no longer active
