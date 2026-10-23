/**
 * Storage for the manifesto's participation data. One JSON document in a
 * Netlify Blobs store — Netlify's own storage, so there is no separate database
 * to hand over. Writes are read-modify-write guarded by the blob's etag, so two
 * people posting at once cannot overwrite each other.
 *
 * Outside Netlify (plain `astro dev` without the platform emulation) it falls
 * back to an in-memory document that resets when the server restarts.
 */
import { getStore } from '@netlify/blobs';

export interface Note { id: string; pid: string; quote: string; text: string; by: string; at: number; hidden?: boolean }
export interface Line { id: string; pid: string; text: string; by: string; at: number; hidden?: boolean }
export interface Proposal { id: string; title: string; body: string; by: string; at: number; hidden?: boolean }
export interface Signature { id: string; name: string; city: string; vid: string; at: number; hidden?: boolean }

export interface Doc {
  /** key → visitor ids. Keys: `p1`…`p11`, `n:<id>`, `l:<id>`, `x:<id>`. */
  stands: Record<string, string[]>;
  notes: Note[];
  lines: Line[];
  proposals: Proposal[];
  signs: Signature[];
  /** Posts per visitor, for a crude cap on abuse. */
  posts: Record<string, number>;
}

export const emptyDoc = (): Doc => ({ stands: {}, notes: [], lines: [], proposals: [], signs: [], posts: {} });

const KEY = 'state-v1';
let memory: Doc | null = null;

function store() {
  try {
    return getStore({ name: 'manifesto', consistency: 'strong' });
  } catch {
    return null;
  }
}

export async function readDoc(): Promise<Doc> {
  const s = store();
  if (!s) return memory ?? emptyDoc();
  const got = await s.get(KEY, { type: 'json' });
  return { ...emptyDoc(), ...((got as Doc | null) ?? {}) };
}

/** Apply `change` to the stored document, retrying if someone else wrote first. */
export async function mutateDoc<T>(change: (doc: Doc) => T): Promise<{ doc: Doc; result: T }> {
  const s = store();
  if (!s) {
    const doc = memory ?? emptyDoc();
    const result = change(doc);
    memory = doc;
    return { doc, result };
  }
  for (let attempt = 0; attempt < 6; attempt++) {
    const current = await s.getWithMetadata(KEY, { type: 'json' });
    const doc: Doc = { ...emptyDoc(), ...((current?.data as Doc | null) ?? {}) };
    const result = change(doc);
    const written = current
      ? await s.setJSON(KEY, doc, { onlyIfMatch: current.etag })
      : await s.setJSON(KEY, doc, { onlyIfNew: true });
    if (written.modified) return { doc, result };
  }
  throw new Error('Could not save — too many simultaneous writes.');
}
