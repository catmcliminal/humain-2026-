# Editing the humAIn site

This is the guide for Cat and anyone else editing the humAIn conference site.
You do not need to touch code. Everything is edited through the **Keystatic admin**.

---

## Getting into the admin

1. Go to **https://www.humain.au/keystatic**
2. Click **"Sign in with GitHub"** — use your `catmcliminal` GitHub account.
3. The first time, GitHub will ask you to authorise the `humainCat-keystatic` app. Click Allow.
4. You're in. Changes you make here are saved as commits to the GitHub repo and trigger a redeploy automatically (takes about 1–2 minutes).

---

## What you can edit

### Speakers
Add or update speaker profiles. Each speaker has:
- **Name** — also becomes the URL slug (e.g. `/voices/jane-doe`)
- **Role** — shown under the name, e.g. `Chief Marketing Officer, Acme Co`
- **Photo** — upload a square or portrait image (JPG/PNG, at least 600×600px)
- **Bio** — 2–4 sentences. Can be left blank if not confirmed yet.
- **Keynote** — tick if this person is a keynote speaker (shown larger, at the top of the lineup)
- **Advisory panel** — tick to show a pink "Advisory panel" tag on their speaker card instead of the yellow "Speaker" tag. This is just a label — it doesn't add them to the Advisory Panel page below.
- **Featured** — tick to show on the homepage; untick to keep them on the full Voices page only
- **Order** — lower number = shown first. Use gaps (10, 20, 30) so you can insert someone in between later.
- **Active / Year** — leave both as-is for 2026 speakers. Untick Active to hide someone without deleting them.

### Advisory Panel
Separate from Speakers — this is its own list, for the `/community/advisory` page. If
someone is both speaking and on the advisory panel, add them in **both** places
(Speakers and Advisory Panel are edited independently, so a photo/bio change in one
doesn't update the other). Each entry has:
- **Name**, **Role**, **Photo**, **Bio** — same as Speakers above
- **Order** — lower number = shown first
- **Active / Year** — untick Active to hide someone without deleting them

### News & Media
Articles that appear in the "Thinking out loud" section. Each article has:
- **Title**, **Category** (e.g. `Essay · The Taste Gap`), **Description** (1–2 sentence teaser)
- **Publish date**, **Author**, **Reading time** (e.g. `9 min read`)
- **Cover image** — optional; shown on the article page
- **Featured** — tick to pin to the homepage media section (max 3 show there)
- **Draft** — tick to hide the article from the live site while you're still writing it
- **Body** — the full article text, written in the rich-text editor. Supports headings, bold, italics, links, and lists.

### Gallery
Photos from past events. Each entry has:
- **Image** — upload your photo (JPG/PNG)
- **Alt text** — a short description for accessibility (required)
- **Caption** — overlaid label on the image, e.g. `Main stage · 2025`
- **Featured** — tick to include in the 7-tile homepage gallery
- **Order** — controls display order

### FAQ
Questions and answers shown in the FAQ section. Each entry has:
- **Question**, **Category** (e.g. `Tickets`, `Travel`, `Program`)
- **Order** — controls the order they appear in
- **Body** — the answer, written in Markdown (supports bold, links, lists)

### Schedule
The conference agenda. Each session has:
- **Title**, **Day** (13 Oct or 14 Oct 2026), **Start time**, **End time**
- **Stage** — e.g. `Main stage`, `Workshop room`
- **Speaker** — free text name(s)
- **Description** — optional session summary
- **Order** — controls order within the day

### Sponsors
Sponsor logos and links. Each sponsor has:
- **Name**, **Logo** (upload), **URL** (their website)
- **Tier** — `headline`, `partner`, `supporter`, or `community`
- **Order** — controls display order within the tier

---

## Things to know

### Saves trigger a rebuild
Every time you save a change in Keystatic, it commits to GitHub and Netlify rebuilds the site. The rebuild takes about **1–2 minutes**. Refresh the live site after that.

### Images go in the repo
Photos and images you upload through Keystatic are stored in the GitHub repo under `public/images/`. This keeps everything in one place — no separate image host to manage.

### Drafts
Any news article with **Draft** ticked is invisible on the live site. Use this to prepare articles in advance.

### Hiding without deleting
For speakers, schedule, and sponsors: untick **Active** to hide an entry without deleting it. The content stays in the repo and can be restored by ticking Active again. This is also how you roll over to a new year — bump the `year` field to 2027 and only entries matching the current year appear.

### The homepage is curated
The homepage shows a selection of content — it doesn't show everything. Use the **Featured** tick on speakers, news articles, and gallery photos to control what appears on the homepage.

---

## Ticketing

The "Get tickets" buttons across the site all point to:
`https://events.humanitix.com/humain/tickets`

If the ticketing URL changes, ask your developer to update `TICKET_URL` in `src/config.ts` — one change updates every button at once.

---

## Contact form

The contact form on the site submits to **admin@humain.au** via Web3Forms.
The access key is set in Netlify's environment variables (`WEB3FORMS_ACCESS_KEY`).
No action needed unless you change the email address.

---

## If something breaks

1. Check the **Netlify deploy log** — go to app.netlify.com, find the `humain2026v2` project, click **Deploys**. A red deploy means a build error; click it to see what went wrong.
2. If a bad edit caused the break, go to **GitHub → catmcliminal/humain-2026- → commits** and click **Revert** on the offending commit.
3. If you're unsure, contact your developer.
