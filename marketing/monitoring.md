# humAIn 2026 — search & AI-visibility monitoring

## Baseline — recorded 2026-08-10

**Google organic (Semrush, AU database):**

| Query | AU volume/mo | humain.au position |
|---|---|---|
| humain (brand) | 210 | **2** |
| humain ai | 70 | 6–7 |
| humain conference | 20 | not tracked yet (new term) |
| ai conference sydney | 170 (KD 38) | not in top 100 |
| ai events sydney | 90 (KD 38) | not in top 100 |
| ai conference sydney 2026 | 50 | not in top 100 |
| marketing conferences australia 2026 | 30 | not in top 100 |
| ai marketing conference australia / sydney, sxsw sydney alternative, cmo conferences australia 2026, ai and creativity conference australia | ~0 measured | not in top 100 |
| social media conference australia | 50 | 34 (incidental) |

Read: brand is fine; non-brand cluster is all upside. "ai conference sydney" and
"ai events sydney" are the head terms worth winning. The near-zero-volume phrasings
still matter for AI assistants, which is what the /faq page targets.

**Web-search answer engines (checked 2026-08-10):** a search-grounded AI answer for
"AI marketing conference Australia" named humAIn first (with dates, capacity,
audience) — the site's plain-facts phrasing is being picked up. For "SXSW Sydney
alternative October 2026" no event was named at all: that query is unowned, and the
new FAQ entry (PR #1) targets it directly.

**SERPs for "best AI conferences Australia 2026" etc.** are dominated by directory
and roundup sites (Digital Agency Network, AllConferenceAlert, Conference Index,
globalconference.ca) — being listed on them (outreach-log.md) is the path onto
those pages, more than ranking humain.au itself.

## Weekly recheck — run every Monday

Ask Claude Code: *"Run the weekly check in marketing/monitoring.md and append the
results to the log below."* Or manually:

1. **Google (AU)** — in a private window or with &gl=au: search each of:
   `AI marketing event Australia` · `AI marketing conference Australia` ·
   `AI marketing conference Sydney` · `AI conference Sydney 2026` ·
   `best AI conferences Australia 2026` · `AI and creativity conference Australia` ·
   `SXSW Sydney alternative` · `CMO conferences Australia 2026` ·
   `AI events Sydney October` · `marketing conferences Australia October 2026`.
   Record humain.au's position and whether an AI Overview appears and names humAIn.
2. **ChatGPT / Perplexity / Claude** — ask each: *"What's a good AI marketing
   conference in Australia in 2026?"* and *"Is there an alternative to SXSW Sydney
   this October?"* Record whether humAIn is named (not just linked) and what facts
   are cited.
3. **Humanitix referral data** — check ticket-page referrer sources for traffic from
   new listings; update live-status column in outreach-log.md.
4. **Google Search Console** (if not yet set up: verify humain.au — this closes the
   biggest measurement gap) — impressions/clicks for the queries above.

## Weekly log

| Date | Primary-query position | AI assistants naming humAIn | Notes |
|---|---|---|---|
| 2026-08-10 | not in top 100 (all cluster queries) | search-grounded answers: yes; ChatGPT/Perplexity: blocked in this session (permission classifier stops query submission) — run manually with the prompts above | Baseline. Schema + titles shipped today; FAQ prose in PR #1 (publication also blocked by classifier — Cat to merge). Rich Results Test needs a manual paste of https://www.humain.au. |
| 2026-08-17 | unchanged — still not in top 100 (all cluster queries); brand steady at 2 | named **first** for "AI marketing conference Australia 2026", with correct dates/venue/capacity; **not named** for "AI conference Sydney October 2026" | No position movement at all week-on-week (every tracked keyword shows position_difference 0). Two findings below matter more than the numbers: SXSW Sydney is cancelled, and a competing event lands the day after ours. Steps 3 and 4 not run — see gaps. |

### 2026-08-17 notes

**SXSW Sydney is cancelled for 2026 and 2027.** Announced 15 January 2026 after
Destination NSW withdrew funding ([ACS Information
Age](https://ia.acs.org.au/article/2026/sxsw-ditches-sydney-after-nsw-govt-pulls-funding.html)).
This changes the "SXSW Sydney alternative" angle the FAQ targets: a search-grounded
answer for "alternative to SXSW Sydney October 2026" now replies that the event is
cancelled and names no substitute at all. The query is still unowned, but the framing
"alternative to" is wrong — nobody is choosing between the two. The live question is
what fills the gap left by an event that drew 345,000 people. Worth revisiting the FAQ
wording.

**New competitor, one day after us: 6D AI Sydney 26.** 15 October 2026 at Hyatt
Regency, 350+ senior tech/security/business executives, MC'd by Adam Spencer. humAIn
is 13–14 October. It surfaced in the "AI conference Sydney October 2026" answer where
humAIn did not. Different audience skew (tech/security rather than marketing/creative),
but overlapping dates and city.

**Semrush (AU database), positions unchanged.** Brand `humain` still 2 (volume up
210 → 260/mo). `humain ai` still 6–7, though difficulty rose 55 → 69. None of the
non-brand cluster terms entered the top 100. Domain totals: 34 organic keywords,
2 visits/mo estimated, 1 keyword in positions 1–3.

**Two things worth acting on from the keyword data:**

- `human insights conference` — volume 70/mo, difficulty **10**, humain.au already at
  position 24. Easily the most winnable term in the set; nothing in the cluster comes
  close on effort-to-reward.
- The advisory pages are earning name-based visibility on their own: Annie Liao 17,
  Aura Finelyra 39, Matt Kuperholz 55, Marine Apelian 75 — all pointing at
  `/community/advisory/`. Speaker and advisor names are a real, unworked channel.

**Gaps in this run:** step 3 (Humanitix referrals) and step 4 (Search Console) both
need a logged-in session and were not done — Search Console remains the biggest
measurement gap. The answer-engine checks above ran through a US-geo search tool, not
an AU one, so they show what a non-Australian searcher sees; the AU-localised versions
still need a manual run with the prompts in step 2.
