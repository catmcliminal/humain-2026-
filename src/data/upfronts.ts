/**
 * The AI Upfronts on day one — short showcases from companies building AI
 * products, shown as their own block on /programme below the session list.
 *
 * Kept here beside `roundtables.ts` for the same reason: a distinct format that
 * frames the programme rather than a growing list an editor adds to. Copy is
 * supplied and approved — edit it here, not in the page.
 */
export interface Upfront {
  /** The company presenting, shown as the eyebrow above the title. */
  company: string;
  /** The showcase headline. */
  title: string;
  /** Who presents it, with their role. */
  speaker: string;
  /** Optional link to the product. */
  url?: string;
  /** Optional logo, shown on a light chip since the card sits on dark. */
  logo?: string;
  /** The write-up. One entry per paragraph. */
  detail: string[];
}

export const UPFRONTS: Upfront[] = [
  {
    company: 'AdLab',
    title: 'AdLab: How AI is Transforming Audio Production',
    speaker: 'Lauren Joyce, Founder of Gun For Hire',
    logo: '/images/logos/Abes_Audio.png',
    detail: [
      'AdLab (by Abe’s Audio) is transforming commercial audio production by combining the power of AI with human creativity.',
      'This interactive session will show agencies, marketers, and media platforms how they can create commercial scripts and audio demos in minutes; accelerating client approvals, supercharging speed to market, reducing production costs, and unlocking new revenue.',
      'You’ll discover how AdLab\'s audio-first (not tech-first) approach and ethical use of AI keeps Australian creative talent at the centre, while giving businesses a competitive advantage by allowing them to create commercial content, faster.',
    ],
  },
  {
    company: 'Gust PR',
    title: 'Gust PR',
    speaker: 'Marie Dowling, Founder, Gust PR',
    url: 'https://www.gustpr.com',
    detail: [
      'Gust PR is an omniscient AI-native operative system for nimble marketers and modern creatives who want more from their PR. By combining media intelligence, Gust PR helps you engineer attention and build lasting media relations by sending fewer, more targeted and newsworthy pitches and building niche performing campaigns at scale. Users have landed more than 350 stories in the AFR, The Guardian, Sydney Morning Herald, Sky News and more.',
    ],
  },
  {
    company: 'lokol',
    title: 'lokol',
    speaker: 'Neil Ackland, CEO and Co-founder, lokol',
    logo: '/images/logos/lokol.png',
    detail: [
      'We identify authentic product recommendations from trusted creators and publishers, verify and attribute them, then surface them wherever people buy products online, helping retailers increase conversion while ensuring the people behind trusted recommendations share in the value they create.',
      'Commerce has a new front door. As product discovery shifts from search and social to AI assistants, trust becomes the scarce resource. Search indexed pages. Social indexed people. AI will index trust. Lokol is building the infrastructure that makes trusted human recommendations attributable, measurable and valuable in the AI era.',
    ],
  },
];
