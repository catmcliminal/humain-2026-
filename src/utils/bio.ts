/**
 * Bio text → paragraphs of safe HTML.
 *
 * Bios are plain-text fields (a multiline textarea in Keystatic), but editors
 * need to link out — to a speaker's site, a podcast, a book. Rather than asking
 * a non-technical editor to write HTML, they write a Markdown link:
 *
 *     ...follow Matt's work at [matt-jones.com.au](https://www.matt-jones.com.au)
 *
 * Everything else is escaped, so a stray `<` or `&` in a bio renders as text
 * instead of breaking the page. Blank lines split paragraphs.
 *
 * The result is HTML and must be rendered with `set:html`.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

// [label](url) — only http(s) and mailto links become anchors. Anything else
// (a javascript: URL, a relative path) falls back to plain text, so a bad
// paste can't inject a link the editor didn't intend.
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_URL = /^(https?:\/\/|mailto:)/i;

/** One paragraph of bio text as HTML: escaped, with Markdown links linked. */
export function bioParagraphToHtml(text: string): string {
  return escapeHtml(text).replace(MARKDOWN_LINK, (whole, label: string, url: string) => {
    // The URL was escaped above; `&amp;` in a query string is valid in href.
    const href = url.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    if (!SAFE_URL.test(href)) return whole;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
}

/** A whole bio, split on blank lines, each paragraph as HTML. */
export function bioParagraphs(bio: string): string[] {
  return bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(bioParagraphToHtml);
}
