/**
 * The lunchtime round tables on day one, held under the Chatham House Rule.
 *
 * Rendered as their own section on /programme, below the session list. Copy is
 * supplied and approved — edit it here, not in the page. Kept in code
 * alongside `themes.ts` rather than in a content collection: like the themes,
 * these are a fixed set that frames the programme rather than a growing list
 * an editor adds to.
 */
export interface RoundTable {
  /** The subject area, shown as the eyebrow above the question. */
  topic: string;
  /** The provocation the table is built around — its headline. */
  question: string;
  /** What the table digs into. One entry per paragraph. */
  detail: string[];
}

export const ROUND_TABLES: RoundTable[] = [
  {
    topic: 'Bias, Representation & Fairness',
    question: 'Whose version of reality does AI recreate?',
    detail: [
      'How do we identify and reduce bias in AI systems, creative work and marketing decisions? What does responsible AI look like in practice?',
    ],
  },
  {
    topic: 'Copyright, Provenance & Creative Ownership',
    question: 'When everything can be faked, is proof the product?',
    detail: [
      'Who owns AI-assisted work? How do brands manage copyright risk? Will provenance become a competitive advantage as synthetic content becomes ubiquitous?',
    ],
  },
  {
    topic: 'Privacy, Governance & Consumer Trust',
    question: 'Can responsible AI survive contact with commercial pressures?',
    detail: [
      'How should organisations balance innovation with compliance? What governance frameworks are actually working, and how do brands maintain trust in an AI-mediated world?',
    ],
  },
  {
    topic: 'Sustainability and impact',
    question: 'Is sustainable AI possible?',
    detail: [
      'How do we balance the potential for AI to help reduce emissions or create innovation against its enormous energy needs and environmental footprint?',
      'If we try to weigh the environmental cost vs benefit, how might that impact procurement and pitching? Do we even have the right data to make an informed decision, as well as to support Scope 3 reporting and reduction strategies?',
    ],
  },
  {
    topic: 'The Future of Work',
    question: 'Are we training our own replacements?',
    detail: [
      'How are roles changing? Which skills become more valuable? How do organisations build capability, preserve expertise and create meaningful careers in an AI-first workplace?',
    ],
  },
];
