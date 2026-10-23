/**
 * The manifesto's eleven principles, exactly as supplied. Copy is fixed — do not
 * edit wording here without Cat's say-so. `quote`/`cite` render as a pull quote
 * after the body .
 */
export interface Principle {
  n: number;
  title: string;
  body: string;
  quote?: string;
  cite?: string;
}

export const PRINCIPLES: Principle[] = [
  { n: 1, title: 'Defend your right to do what you love.', body: 'Automate the sludge, don’t outsource the soul. Define the work that matters to you. Draw your boundaries. Permission to say no is as important as pressure to adopt.' },
  { n: 2, title: 'Refuse the average.', body: 'Plausible is cheap. Make the choice only you can make. Bring your experience, your obsessions, your inconvenient point of view. Give us something worth our time.', quote: '“a lot of creative is just a little bit creative, and AI is getting really good at being a little bit creative”', cite: 'Jeremy Somers' },
  { n: 3, title: 'Cleave to craft.', body: 'Making something is easier. Knowing whether it deserves to exist still demands judgement. Make deliberate choices. Revise. Reject. Know why this version works and the other fifty don’t.', quote: '“A skilled photographer moved a camera an inch to the left, and suddenly that car looks so much better.”', cite: 'Ross Colebatch' },
  { n: 4, title: 'Keep the friction.', body: 'The hard part is where the thinking happens. Before you remove a step, ask what that step made possible. The easy route is always one click away. Choosing the harder one takes courage. Find it.', quote: '“This is difficult” does not mean “this is wrong.”', cite: 'Lucinda Barlow and Ben Cooper' },
  { n: 5, title: 'Invest in the apprenticeship.', body: 'That’s how mastery thrives. Give beginners real work and permission to fail. Protect the practice through which judgement develops. We all learned on someone else’s payroll. Pay it forward.', quote: '“We can’t demand experienced people while removing the experiences that develop them.”', cite: 'Matt Jones' },
  { n: 6, title: 'Novice mindset', body: 'Make room to experiment without having to prove a point. Try something new and be bad at it. Make analogue rituals. Give curiosity time to take you somewhere you hadn’t planned.', quote: '“Creativity is the most vulnerable job in the world.”', cite: 'Hilary Badger' },
  { n: 7, title: 'Get messy. Use your hands.', body: 'Touch grass. Make something you can hold. Get out into the world you’re trying to say something about. Care enough about something to commit to it, even when you don’t know how it ends. Dream or find a dream to follow.', quote: '“AI doesn’t remove the messy part of the creative process. It makes the messy part faster.”', cite: 'Rhys Delios Callanan' },
  { n: 8, title: 'Pay your dues', body: 'Name your influences. Honour contribution. Fight for consent and compensation. Creative work does not become worthless because a machine can absorb and re-generate it.' },
  { n: 9, title: 'Don’t fall into the productivity trap.', body: 'Spend the dividend on purpose. Decide what the time saved is for before someone fills it. A stranger, wilder, bigger idea. A deeper conversation. Time to teach. Time to live. Make the gain worth having.' },
  { n: 10, title: 'Earn belief.', body: 'Put your name to your choices. Be willing to explain them. Listen when people say the work leaves them cold. Trust asks something of us. Give it care, attention and a person who will answer.', quote: '“Dream, or find a dream to follow”', cite: 'Tea Uglow' },
  { n: 11, title: 'Tell your own story.', body: 'Don’t accept a future you weren’t in the room to write. Invite dissent. Speak out. Ask hard questions: who gets the savings, who loses the work, what happens next? It’s when people go quiet that leaders should worry.' },
];

/** Accent cycles pink, orange, yellow, blue, green; one accent per principle. */
export const ACCENTS = ['#F0379A', '#F0531F', '#FFC21A', '#3D72F5', '#19A85B'];
