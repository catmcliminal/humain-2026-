import type { APIRoute } from 'astro';
import { PRINCIPLES } from '../../data/manifesto';
import { mutateDoc, readDoc, type Doc } from '../../utils/manifestoStore';

export const prerender = false;

const COOKIE = 'hm_vid';
const MAX_POSTS_PER_VISITOR = 40;
const LIMITS = { name: 60, city: 60, note: 600, line: 300, title: 80, body: 500 };
const PRINCIPLE_IDS = new Set(PRINCIPLES.map((p) => 'p' + p.n));

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '';
const author = (v: unknown) => clean(v, LIMITS.name) || 'Anonymous';
const newId = () => crypto.randomUUID().slice(0, 12);

function visitor(cookies: Parameters<APIRoute>[0]['cookies'], secure: boolean) {
  let vid = cookies.get(COOKIE)?.value;
  if (!vid || !/^[0-9a-f-]{36}$/.test(vid)) {
    vid = crypto.randomUUID();
    cookies.set(COOKIE, vid, { path: '/', httpOnly: true, sameSite: 'lax', secure, maxAge: 60 * 60 * 24 * 365 });
  }
  return vid;
}

/** What the browser sees: counts and the visitor's own toggles — never anyone's id. */
function publicState(doc: Doc, vid: string) {
  const count = (k: string) => (doc.stands[k] ?? []).length;
  const mine: string[] = Object.entries(doc.stands)
    .filter(([, v]) => v.includes(vid))
    .map(([k]) => k);
  const mySign = doc.signs.find((s) => s.vid === vid);
  return {
    votes: Object.fromEntries(PRINCIPLES.map((p) => ['p' + p.n, count('p' + p.n)])),
    notes: doc.notes.filter((n) => !n.hidden).map((n) => ({ id: n.id, pid: n.pid, quote: n.quote, text: n.text, by: n.by, n: count('n:' + n.id) })),
    lines: doc.lines.filter((l) => !l.hidden).map((l) => ({ id: l.id, pid: l.pid, text: l.text, by: l.by, n: count('l:' + l.id) })),
    proposals: doc.proposals.filter((x) => !x.hidden).map((x) => ({ id: x.id, title: x.title, body: x.body, by: x.by, n: count('x:' + x.id) })),
    signs: doc.signs.filter((s) => !s.hidden).map((s) => ({ name: s.name, city: s.city, mine: s.vid === vid })),
    mine,
    mySign: mySign ? { name: mySign.name, city: mySign.city } : null,
  };
}

export const GET: APIRoute = async ({ cookies, url }) => {
  const vid = visitor(cookies, url.protocol === 'https:');
  return json(publicState(await readDoc(), vid));
};

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) return json({ error: 'Bad origin' }, 403);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const vid = visitor(cookies, url.protocol === 'https:');
  const action = body.action;

  try {
    const { doc, result } = await mutateDoc((doc): { error?: string } => {
      const posted = doc.posts[vid] ?? 0;
      const countPost = () => {
        doc.posts[vid] = posted + 1;
      };
      const stand = (key: string) => {
        const list = (doc.stands[key] ??= []);
        if (!list.includes(vid)) list.push(vid);
      };

      if (action === 'toggle') {
        const key = clean(body.key, 40);
        const [kind, id] = key.split(':');
        const exists =
          (!id && PRINCIPLE_IDS.has(key)) ||
          (kind === 'n' && doc.notes.some((n) => n.id === id)) ||
          (kind === 'l' && doc.lines.some((l) => l.id === id)) ||
          (kind === 'x' && doc.proposals.some((x) => x.id === id));
        if (!exists) return { error: 'Unknown item' };
        const list = (doc.stands[key] ??= []);
        const at = list.indexOf(vid);
        if (at > -1) list.splice(at, 1);
        else list.push(vid);
        return {};
      }

      if (action === 'sign') {
        const name = clean(body.name, LIMITS.name);
        const city = clean(body.city, LIMITS.city);
        if (!name || !city) return { error: 'Name and city, please.' };
        if (doc.signs.some((s) => s.vid === vid)) return { error: 'You’ve already signed.' };
        doc.signs.push({ id: newId(), name, city, vid, at: Date.now() });
        return {};
      }

      if (posted >= MAX_POSTS_PER_VISITOR) return { error: 'That’s a lot of posting. Try again later.' };

      if (action === 'note') {
        const pid = clean(body.pid, 8);
        const principle = PRINCIPLES.find((p) => 'p' + p.n === pid);
        const quote = typeof body.quote === 'string' ? body.quote.trim() : '';
        const text = clean(body.text, LIMITS.note);
        if (!principle || !text) return { error: 'Write a note first.' };
        // The quoted sentence must really be in the principle, or the highlight can't land.
        if (quote.length < 4 || !principle.body.includes(quote)) return { error: 'Select a sentence from the principle.' };
        doc.notes.push({ id: newId(), pid, quote, text, by: author(body.by), at: Date.now() });
        countPost();
        return {};
      }

      if (action === 'line') {
        const pid = clean(body.pid, 8);
        const text = clean(body.text, LIMITS.line);
        if (!PRINCIPLE_IDS.has(pid) || !text) return { error: 'Write a line first.' };
        const id = newId();
        doc.lines.push({ id, pid, text, by: author(body.by), at: Date.now() });
        stand('l:' + id);
        countPost();
        return {};
      }

      if (action === 'propose') {
        const title = clean(body.title, LIMITS.title);
        const text = clean(body.body, LIMITS.body);
        if (!title || !text) return { error: 'A title and a few sentences, please.' };
        const id = newId();
        doc.proposals.push({ id, title, body: text, by: author(body.by), at: Date.now() });
        stand('x:' + id);
        countPost();
        return {};
      }

      return { error: 'Unknown action' };
    });
    if (result.error) return json({ error: result.error }, 400);
    return json(publicState(doc, vid));
  } catch {
    return json({ error: 'Couldn’t save that. Please try again.' }, 503);
  }
};
