import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import { CURRENT_EDITION_YEAR } from './src/config';

/*
 * Keystatic admin configuration (the /keystatic editing UI).
 *
 * IMPORTANT (handover): these field schemas are one of TWO sources of truth.
 * They must mirror the Zod schemas in `src/content.config.ts` exactly — same
 * collections, same fields, same defaults. When you change a field there,
 * change it here too.
 *
 * Storage is GitHub mode: edits made in the admin are committed straight to
 * this repo, which triggers a rebuild/redeploy. Phase 9 (transfer to the
 * owner's GitHub account) must update `storage.repo` below and re-install the
 * Keystatic GitHub App on the transferred repo.
 *
 * Conventions mirrored from src/content.config.ts:
 *  - YAML data files for structured collections (speakers, schedule, gallery,
 *    sponsors); Markdown w/ frontmatter for body-text ones (news, faq).
 *  - Images upload to `public/images/<collection>/` and the stored value is
 *    the render-ready `/images/...` path.
 *  - `order` controls display sequence; news sorts by publish date instead.
 */

export default config({
  storage: {
    kind: 'github',
    repo: 'catmcliminal/humain-2026-',
    branchPrefix: 'keystatic/',
  },
  ui: {
    brand: { name: 'humAIn' },
  },
  collections: {
    speakers: collection({
      label: 'Speakers',
      slugField: 'name',
      path: 'src/content/speakers/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({
          label: 'Role',
          description:
            'Shown under the name, e.g. "Creative Director, an agency exploring generative workflows"',
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/speakers',
          publicPath: '/images/speakers/',
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
          description:
            'To add a link, write it as [the words you want linked](https://the-address.com)',
        }),
        keynote: fields.checkbox({
          label: 'Keynote',
          description:
            'Keynote speakers appear above the rest of the lineup on the Voices page, larger and badged.',
          defaultValue: false,
        }),
        advisory: fields.checkbox({
          label: 'Advisory panel member',
          description:
            'Advisory panel members get a pink "Advisory panel" tag on the Voices page; speakers get a yellow "Speaker" tag.',
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: 'Featured on homepage',
          description:
            'Pin to the homepage lineup (4 slots — unpinned speakers fill any remaining slots by order).',
          defaultValue: false,
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first.',
          validation: { isRequired: true },
        }),
        active: fields.checkbox({
          label: 'Active',
          description: 'Untick to retire this entry without deleting it.',
          defaultValue: true,
        }),
        year: fields.number({
          label: 'Edition year',
          description:
            'The site only shows entries for the current edition year.',
          defaultValue: CURRENT_EDITION_YEAR,
          validation: { isRequired: true },
        }),
      },
    }),

    advisory: collection({
      label: 'Advisory Panel',
      slugField: 'name',
      path: 'src/content/advisory/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({
          label: 'Role',
          description: 'Shown under the name on the Advisory Panel page.',
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/advisory',
          publicPath: '/images/advisory/',
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
          description:
            'To add a link, write it as [the words you want linked](https://the-address.com)',
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first.',
          validation: { isRequired: true },
        }),
        active: fields.checkbox({
          label: 'Active',
          description: 'Untick to retire this entry without deleting it.',
          defaultValue: true,
        }),
        year: fields.number({
          label: 'Edition year',
          description:
            'The site only shows entries for the current edition year.',
          defaultValue: CURRENT_EDITION_YEAR,
          validation: { isRequired: true },
        }),
      },
    }),

    schedule: collection({
      label: 'Schedule',
      slugField: 'title',
      path: 'src/content/schedule/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Session title' } }),
        day: fields.select({
          label: 'Day',
          options: [
            { label: 'Day 1 — Tue 13 Oct 2026', value: '2026-10-13' },
            { label: 'Day 2 — Wed 14 Oct 2026', value: '2026-10-14' },
          ],
          defaultValue: '2026-10-13',
        }),
        startTime: fields.text({
          label: 'Start time',
          description: 'Optional — 24-hour time, e.g. 09:30. Leave blank until confirmed.',
        }),
        endTime: fields.text({
          label: 'End time',
          description: 'Optional — 24-hour time, e.g. 10:15',
        }),
        stage: fields.text({
          label: 'Stage / room',
          description: 'e.g. "Main stage", "Workshop room"',
        }),
        speaker: fields.text({
          label: 'Speaker(s)',
          description: 'Free text — name one or more speakers.',
        }),
        photos: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'public/images/schedule',
            publicPath: '/images/schedule/',
          }),
          {
            label: 'Speaker photo(s)',
            description: 'Optional — one photo per speaker on this session.',
            itemLabel: () => 'Photo',
          }
        ),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.number({
          label: 'Order',
          description: 'Sorts sessions within a day; lower numbers first.',
          validation: { isRequired: true },
        }),
        active: fields.checkbox({
          label: 'Active',
          description: 'Untick to retire this entry without deleting it.',
          defaultValue: true,
        }),
        year: fields.number({
          label: 'Edition year',
          description:
            'The site only shows entries for the current edition year.',
          defaultValue: CURRENT_EDITION_YEAR,
          validation: { isRequired: true },
        }),
      },
    }),

    news: collection({
      label: 'News & media',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({
          label: 'Category',
          description:
            'The card\'s category line, e.g. "Essay · The Taste Gap"',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary shown on the article cards.',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: 'Publish date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'the humAIn desk',
        }),
        readingTime: fields.text({
          label: 'Reading time',
          description: 'Free text, e.g. "9 min read" or "Podcast · 41 min"',
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/news',
          publicPath: '/images/news/',
        }),
        featured: fields.checkbox({
          label: 'Featured on homepage',
          description:
            'Pin to the homepage Media section (3 slots — unpinned articles fill remaining slots, newest first).',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are never shown on the site.',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Article body',
          options: {
            image: {
              directory: 'public/images/news',
              publicPath: '/images/news/',
            },
          },
          components: {
            video: block({
              label: 'Video embed',
              description: 'Embed a YouTube or Vimeo video',
              schema: {
                url: fields.text({
                  label: 'Video URL',
                  description: 'Paste a YouTube (youtu.be / watch?v=) or Vimeo URL',
                  validation: { isRequired: true },
                }),
              },
            }),
          },
        }),
      },
    }),

    gallery: collection({
      label: 'Gallery',
      slugField: 'alt',
      path: 'src/content/gallery/*',
      format: { data: 'yaml' },
      schema: {
        alt: fields.slug({
          name: {
            label: 'Alt text',
            description:
              'Describe the image for screen readers, e.g. "Speakers in conversation on the main stage".',
          },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
          validation: { isRequired: true },
        }),
        caption: fields.text({
          label: 'Caption',
          description: 'Optional overlaid label, e.g. "Main stage · 2025"',
        }),
        featured: fields.checkbox({
          label: 'Featured on homepage',
          description:
            'Pin to the homepage gallery (7 tiles — unpinned images fill remaining tiles by order).',
          defaultValue: false,
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first.',
          validation: { isRequired: true },
        }),
      },
    }),

    sponsors: collection({
      label: 'Sponsors',
      slugField: 'name',
      path: 'src/content/sponsors/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/sponsors',
          publicPath: '/images/sponsors/',
          validation: { isRequired: true },
        }),
        url: fields.url({ label: 'Website' }),
        tier: fields.select({
          label: 'Tier',
          options: [
            { label: 'Headline', value: 'headline' },
            { label: 'Partner', value: 'partner' },
            { label: 'Supporter', value: 'supporter' },
            { label: 'Community', value: 'community' },
          ],
          defaultValue: 'partner',
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first (within a tier).',
          validation: { isRequired: true },
        }),
        active: fields.checkbox({
          label: 'Active',
          description: 'Untick to retire this entry without deleting it.',
          defaultValue: true,
        }),
        year: fields.number({
          label: 'Edition year',
          description:
            'The site only shows entries for the current edition year.',
          defaultValue: CURRENT_EDITION_YEAR,
          validation: { isRequired: true },
        }),
      },
    }),

    faq: collection({
      label: 'FAQ',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { contentField: 'answer' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        category: fields.text({
          label: 'Category',
          description: 'Optional grouping, e.g. "Tickets", "Travel"',
        }),
        order: fields.number({
          label: 'Order',
          description: 'Lower numbers appear first.',
          validation: { isRequired: true },
        }),
        answer: fields.markdoc({ label: 'Answer', extension: 'md' }),
      },
    }),

    gifts: collection({
      label: 'Gift Register',
      slugField: 'gift',
      path: 'src/content/gifts/*',
      format: { data: 'yaml' },
      schema: {
        gift: fields.slug({
          name: {
            label: 'Gift',
            description:
              'What was offered, e.g. "Dinner and drinks" or "Conference ticket".',
          },
        }),
        dateReceived: fields.date({
          label: 'Date received',
          validation: { isRequired: true },
        }),
        recipient: fields.text({
          label: 'Received by',
          description: 'Who it was offered to, e.g. "Cat McGinn".',
          validation: { isRequired: true },
        }),
        from: fields.text({
          label: 'Offered by',
          description: 'The person and/or organisation who offered it.',
          validation: { isRequired: true },
        }),
        estimatedValue: fields.text({
          label: 'Approximate value',
          description:
            'A rough figure is fine — write it how you would say it, e.g. "approx. $150". Leave blank if you genuinely do not know.',
        }),
        outcome: fields.select({
          label: 'Outcome',
          description: 'What happened to it.',
          options: [
            { label: 'Retained', value: 'Retained' },
            { label: 'Declined', value: 'Declined' },
            { label: 'Returned', value: 'Returned' },
            { label: 'Donated', value: 'Donated' },
            { label: 'Shared with the team', value: 'Shared with the team' },
          ],
          defaultValue: 'Retained',
        }),
        notes: fields.text({
          label: 'Notes',
          multiline: true,
          description: 'Optional. Any context a reader would need.',
        }),
        published: fields.checkbox({
          label: 'Published',
          description:
            'Untick to keep an entry off the public register while you check the details.',
          defaultValue: true,
        }),
      },
    }),
  },
});
