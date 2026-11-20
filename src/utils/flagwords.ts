/**
 * Auto-flag check for visitor submissions (manifesto notes, lines, proposals,
 * quotes and signatures). Anything that matches is rejected before it's saved
 * and never shown. The list lives in `src/data/flagwords.json`; the matching
 * rules follow the "matching" notes in that file. It errs towards flagging.
 */
import list from '../data/flagwords.json';

const leet = list.matching.leet as Record<string, string>;
const plain = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
const norm = (s: string) => [...plain(s)].map((c) => leet[c] ?? c).join('');
const letters = (s: string) => s.replace(/[^a-z]+/g, ' ').trim();

const SUFFIXES = ['', 's', 'es', 'z', 'y', 'ie', 'ies', 'ed', 'ing'];
const allow = list.allowlist.map((a) => letters(plain(a))).filter(Boolean);
const words = new Set(list.words.flatMap((w) => SUFFIXES.map((x) => letters(norm(w)).replace(/ /g, '') + x)));
const phrases = list.phrases.map((p) => ' ' + letters(norm(p)) + ' ');
const compact = list.compact.map((c) => letters(norm(c)).replace(/ /g, '')).filter(Boolean);

const runsTo2 = (s: string) => s.replace(/([a-z])\1{2,}/g, '$1$1'); // niiigger -> niigger
const runsTo1 = (s: string) => s.replace(/([a-z])\1{2,}/g, '$1'); // niiigger -> nigger

function hit(v: string): boolean {
  let t = ' ' + letters(v) + ' ';
  for (const a of allow) t = t.replace(new RegExp(' ' + a + '(?= )', 'g'), ' ');
  if (t.split(' ').some((w) => w && words.has(w))) return true;
  if (phrases.some((p) => t.includes(p))) return true;
  const run = t.replace(/ /g, '');
  return compact.some((c) => run.includes(c));
}

export function isFlagged(text: unknown): boolean {
  const raw = typeof text === 'string' ? text : '';
  if (list.symbols.some((s) => raw.includes(s))) return true;
  const n = norm(raw);
  return hit(n) || hit(runsTo2(n)) || hit(runsTo1(n));
}

/** True if any of the given strings is flagged. */
export const anyFlagged = (...texts: unknown[]) => texts.some(isFlagged);
