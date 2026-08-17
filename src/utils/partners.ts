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
 */
export type Partner = {
  role: string;
  name: string;
  logo: string;
  url?: string;
  accent: string;
  copy: string;
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
    name: 'IAB Australia',
    logo: '/images/logos/IAB_Australia.png',
    url: 'https://www.iabaustralia.com.au/',
    accent: 'var(--yellow)',
    copy: `Australia's peak digital advertising body. IAB Australia is the peak trade association for digital advertising, supporting diverse and sustainable investment across all platforms in Australia.`,
  },
];
