/**
 * Partner and supporting-association listings.
 *
 * Single source of truth for both the /partners page (full cards, with copy)
 * and the homepage "Our partners." strip (logo and name only). Add or edit a
 * partner here once and both places update together.
 *
 * `accent` must be one of the palette variables in src/styles/global.css
 * (--pink, --orange, --blue, --green, --yellow). `url` is optional — when set,
 * the /partners page card shows a "Visit …" link.
 *
 * `logo` and `copy` are optional so a listing can go up as soon as it is
 * confirmed, before the logo file and the write-up arrive. The card drops the
 * logo panel and the paragraphs rather than rendering a broken image or an
 * empty space. The homepage strip is logos only, so it lists just the entries
 * that have one.
 */
export type Partner = {
  role: string;
  name: string;
  logo?: string;
  url?: string;
  accent: string;
  copy?: string;
};

export const partners: Partner[] = [
  {
    role: 'Content Partner',
    name: 'R/GA',
    logo: '/images/logos/RGA.png',
    url: 'https://rga.com/',
    accent: 'var(--blue)',
    copy: `R/GA is an independent creative innovation company for the intelligence age. We design intelligent brand systems that help businesses get ahead.`,
  },
  {
    role: 'Ecosystem Partner',
    name: 'Stone & Chalk',
    logo: '/images/logos/Stone_and_Chalk.png',
    url: 'https://www.stoneandchalk.com.au/',
    accent: 'var(--pink)',
    copy: `Stone & Chalk is the largest innovation community in Australia. Operating the Tech Central Innovation Hub in Sydney, with further hubs in Melbourne and Adelaide, it brings together founders, corporates and government to connect emerging tech companies with the people, capital and knowledge they need to grow.

As humAIn's Ecosystem Partner, Stone & Chalk hosts the 2026 flagship event within Tech Central's Collider space — placing its resident and alumni founder community in front of the senior marketing and creative leaders actively evaluating and buying AI tools. The partnership extends beyond the two-day conference into a regular programme of boardroom sessions at Tech Central, pairing founders building AI products with the marketers and creatives deploying them.

Together, humAIn and Stone & Chalk are building a direct line between the people building Australia's AI economy and the people putting it to work — ideating, innovating and creating impact with the country's emerging tech founders.`,
  },
  {
    role: 'Media Partner',
    name: 'B&T',
    logo: '/images/logos/BandT.png',
    url: 'https://www.bandt.com.au/',
    accent: 'var(--orange)',
    copy: `B&T is Australia's leading news publisher and magazine for the advertising, marketing, media and PR industries. Founded in 1950 — originally standing for Broadcast & Television — and headquartered in Surry Hills, NSW, B&T has spent over seven decades as the industry's daily read.

It provides daily intelligence, expert analysis and career updates across the entire media landscape, covering everything from campaign launches and agency moves to the technology reshaping how brands reach audiences. For senior marketing, media and creative leaders, B&T is where the industry goes to understand what's happening and why it matters.

As humAIn's media partner, B&T brings that reach and credibility to the conversation happening on stage — covering the flagship event, amplifying the speakers and ideas, and connecting humAIn's programming with the wider industry audience that reads B&T every day. It's a natural fit: two independent voices, both built on editorial trust, both focused on what's actually changing in marketing, media and creative work.`,
  },
];

/**
 * Supporting associations render as a separate group below the partners above,
 * under their own heading. Add further associations here — the group heading
 * appears automatically.
 */
export const associations: Partner[] = [
  {
    role: 'Supporting Association',
    name: 'ACAM — Australian Centre for AI in Marketing',
    logo: '/images/logos/Australian_Centre_for_AI_in_Marketing.png',
    accent: 'var(--green)',
    copy: `The Australian Centre for AI in Marketing (ACAM) helps marketers and organisations turn AI ambition into practical action.

Through research, benchmarking, executive education and transformation programs, ACAM builds the insight, capability and confidence needed to adopt AI responsibly and create measurable value.

ACAM connects leading marketers, technology partners, researchers and practitioners to help shape the future of AI in marketing.`,
  },
  {
    role: 'Supporting Association',
    name: 'IAB Australia',
    logo: '/images/logos/IAB_Australia.png',
    url: 'https://www.iabaustralia.com.au/',
    accent: 'var(--yellow)',
    copy: `IAB Australia is the industry body for digital advertising, committed to growing sustainable and diverse investment in digital advertising in Australia.

We comprise industry experts across research and measurement, policy and regulation, technology and standards, and the current economics of the advertising industry. We produce a variety of resources to improve the foundations of digital advertising and strengthen the supply chain for advertisers.

As well as driving local initiatives, we are a part of a network of 46 international IAB organisations setting global standards for digital advertising.`,
  },
];

/**
 * Supporters render as their own group below the associations. No write-ups
 * yet, so their cards are logo and name only; add `copy` when it arrives.
 */
export const supporters: Partner[] = [
  {
    role: 'Supporter',
    name: 'Man of Many',
    logo: '/images/logos/Man_of_Many.png',
    accent: 'var(--blue)',
  },
  {
    role: 'Supporter',
    name: 'Trinity P3',
    logo: '/images/logos/TrinityP3.png',
    accent: 'var(--orange)',
  },
  {
    role: 'Supporter',
    name: 'Creative Natives',
    logo: '/images/logos/Creative_Natives.png',
    accent: 'var(--pink)',
  },
];
